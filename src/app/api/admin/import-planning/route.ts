import { NextRequest, NextResponse } from 'next/server';

const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function getWeekDates(): Record<string, string> {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const dates: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates[DAY_NAMES[i]] = d.toISOString().split('T')[0];
  }
  return dates;
}

/**
 * Extrait l'heure depuis n'importe quel texte/HTML.
 * Stratégies dans l'ordre :
 * 1. Ligne exacte matching "16h45" ou "16:45"
 * 2. Token dans du texte compact : "titre 16h45 saison"
 * 3. Dans du HTML : contenu de <span>16h45</span>
 * 4. Pattern plus large avec séparateurs variés
 */
function extractTime(text: string): string {
  // Stratégie 1 : ligne de texte contenant UNIQUEMENT le pattern XhXX
  const lines = text.split(/[\n\r]+/).map(l => l.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  for (const line of lines) {
    if (/^\d{1,2}h\d{2}$/.test(line)) return line;
    if (/^\d{1,2}:\d{2}$/.test(line)) return line;
  }

  // Stratégie 2 : token heure entouré d'espaces dans le texte brut
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const m2 = /(?:^|\s)(\d{1,2}h\d{2})(?=\s|$)/i.exec(plain);
  if (m2) return m2[1];

  // Stratégie 3 : dans le HTML, cherche un <span> contenant exactement XhXX
  // accepte les spans avec ou sans HTML interne
  const spanRe = /<span[^>]*>([\s\S]*?)<\/span>/gi;
  let sm: RegExpExecArray | null;
  while ((sm = spanRe.exec(text)) !== null) {
    const s = sm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, '').trim();
    if (/^\d{1,2}h\d{2}$/.test(s)) return s;
    if (/^\d{1,2}:\d{2}$/.test(s)) return s;
  }

  return '?';
}


function buildEpisode(
  slug: string,
  title: string,
  langCode: string,
  seasonOrScan: string,
  rawTime: string,
  date: string,
  idx: number
): any {
  const type: 'Anime' | 'Scans' = seasonOrScan.toLowerCase() === 'scan' ? 'Scans' : 'Anime';
  const language: 'VO' | 'VF' = langCode.toLowerCase() === 'vf' ? 'VF' : 'VO';
  const seasonMatch = seasonOrScan.match(/saison(\d+)/i);
  const seasonNumber = seasonMatch ? parseInt(seasonMatch[1]) : 1;

  // Normalisation heure : "16h45" → "16:45", "9h30" → "09:30", "?" → "?"
  let releaseTime = '?';
  if (rawTime && rawTime !== '?' && rawTime.trim() !== '') {
    const normalized = rawTime.replace(/h/i, ':').trim();
    const parts = normalized.split(':');
    if (parts.length === 2) {
      const h = parts[0].padStart(2, '0');
      const m = parts[1].padStart(2, '0');
      releaseTime = `${h}:${m}`;
    }
  }

  let cleanTitle = title.trim();
  if (cleanTitle.length < 2) {
    cleanTitle = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return {
    id: `${slug}-${language.toLowerCase()}-${date}-${idx}`,
    animeId: slug,
    animeTitle: cleanTitle,
    title: type === 'Scans' ? 'Chapitre' : 'Épisode',
    imageUrl: `https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/${slug}.jpg`,
    episodeNumber: 1,
    seasonNumber,
    releaseDate: date,
    releaseTime,
    type,
    language,
    status: 'upcoming' as const,
    genres: [],
  };
}

/**
 * Coupe le contenu AVANT la section "sans date fixe" / "oeuvres en cours"
 * pour éviter que des centaines d'animes sans planning soient inclus.
 */
function truncateAtEndOfWeek(text: string): string {
  const stopPatterns = [
    /oeuvres?\s+en\s+cours/i,
    /animes?\s+en\s+cours/i,
    /sans\s+jours?\s+fix/i,
    /sans\s+date\s+fix/i,
    /hors\s+planning/i,
    /pas\s+de\s+dates?\s+fix/i,
  ];
  
  for (const p of stopPatterns) {
    const m = p.exec(text);
    if (m) return text.slice(0, m.index);
  }
  return text;
}

/**
 * PARSER PRINCIPAL — HTML source de la page (Ctrl+U ou fetch)
 *
 * Structure confirmée par inspection :
 * <h2>Lundi</h2>
 * <a href="/catalogue/slug/saison1/vf/">
 *   <h2>Titre Anime</h2>   ← h2 titre dans le lien (différent du h2 du jour)
 *   <span>16h45</span>     ← heure (ou "?")
 * </a>
 */
function parseHtml(html: string, weekDates: Record<string, string>, today: string): any[] {
  // Trouver les h2 de jours de la semaine
  const dayBoundaries: { name: string; start: number }[] = [];
  for (const dayName of DAY_NAMES) {
    // Le h2 de jour est un h2 directement dans la page (pas dans un <a>)
    // On cherche <h2 (pas dans un lien) contenant exactement le nom du jour
    const re = new RegExp(`<h2[^>]*>\\s*${dayName}\\s*<\\/h2>`, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      // Vérifier que ce h2 n'est pas dans un <a> (titre d'anime)
      // En comptant les <a> non fermés avant ce point
      const before = html.slice(0, m.index);
      const openAs = (before.match(/<a[\s>]/gi) || []).length;
      const closeAs = (before.match(/<\/a>/gi) || []).length;
      if (openAs === closeAs) {
        // Ce h2 est bien au niveau racine, pas dans un lien
        dayBoundaries.push({ name: dayName, start: m.index });
        break;
      }
    }
  }

  dayBoundaries.sort((a, b) => a.start - b.start);

  if (dayBoundaries.length === 0) return [];

  const days: any[] = [];

  for (let di = 0; di < dayBoundaries.length; di++) {
    const { name, start } = dayBoundaries[di];
    const date = weekDates[name] || today;
    const nextStart = di + 1 < dayBoundaries.length ? dayBoundaries[di + 1].start : html.length;
    const section = html.slice(start, nextStart);

    const episodes: any[] = [];
    let idx = 0;

    // Extraire chaque lien /catalogue/ dans cette section
    const linkRe = /<a\s+[^>]*href=["']([^"']*\/catalogue\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let lm: RegExpExecArray | null;

    while ((lm = linkRe.exec(section)) !== null) {
      const href = lm[1];
      const inner = lm[2];

      const parts = href.replace(/^https?:\/\/[^/]+/, '').split('/').filter(Boolean);
      if (parts.length < 3 || parts[0] !== 'catalogue') continue;

      const slug = parts[1];
      const seasonOrScan = parts[2] || '';
      const langCode = parts[3] || 'vostfr';

      // TITRE : chercher dans <h2>...</h2> dans le lien
      const titleMatch = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(inner);
      let title = titleMatch
        ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
        : '';

      // HEURE : extraction robuste multi-stratégie
      const rawTime = extractTime(inner);

      if (!title || title.length < 2 || title.length > 150) continue;

      episodes.push(buildEpisode(slug, title, langCode, seasonOrScan, rawTime, date, idx++));
    }

    episodes.sort((a, b) => {
      if (a.releaseTime === '?') return 1;
      if (b.releaseTime === '?') return -1;
      return a.releaseTime.localeCompare(b.releaseTime);
    });
    days.push({ date, dayName: name, isToday: date === today, episodes });
  }

  return days;
}

/**
 * PARSER MARKDOWN-LIKE — résultat de conversion HTML→Markdown (read_url_content)
 * 
 * Structure dans le markdown converti :
 * ## Lundi
 * [Anime...\nTitre\n...16h45\n...Saison 2](url)
 * ## Titre
 * [Anime...](url)
 * ...
 * ## Mardi
 */
function parseMarkdownLike(text: string, weekDates: Record<string, string>, today: string): any[] {
  const days: any[] = [];

  // Trouver les positions des jours (## Lundi, ## Mardi, etc.)
  // On doit distinguer les "## Jour" des "## TitreAnime"
  // Astuce : les jours de la semaine en français sont des mots précis
  const dayPositions: { name: string; pos: number }[] = [];

  for (const dayName of DAY_NAMES) {
    // Cherche ## Lundi suivi éventuellement d'une date comme 30/03
    const re = new RegExp(`(?:^|\\n)#{1,3}\\s+${dayName}\\s*\\n`, 'im');
    const m = re.exec(text);
    if (m) {
      dayPositions.push({ name: dayName, pos: m.index });
    }
  }

  dayPositions.sort((a, b) => a.pos - b.pos);
  if (dayPositions.length === 0) return [];

  for (let di = 0; di < dayPositions.length; di++) {
    const { name, pos } = dayPositions[di];
    const date = weekDates[name] || today;
    const nextPos = di + 1 < dayPositions.length ? dayPositions[di + 1].pos : text.length;
    const section = text.slice(pos, nextPos);

    const episodes: any[] = [];
    let idx = 0;

    // Format: [Anime\n...\nTitre\n...\n16h45\n...\nSaison N](url)
    const entryRe = /\[(Anime|Scans?|Film)([\s\S]*?)\]\((https?:\/\/[^)]+\/catalogue\/[^)]+)\)/gi;
    let m: RegExpExecArray | null;

    while ((m = entryRe.exec(section)) !== null) {
      const inner = m[2];
      const url = m[3];

      const parts = url.replace(/^https?:\/\/[^/]+/, '').split('/').filter(Boolean);
      if (parts.length < 3 || parts[0] !== 'catalogue') continue;

      const slug = parts[1];
      const seasonOrScan = parts[2] || '';
      const langCode = parts[3] || 'vostfr';

      // HEURE : extraction robuste multi-stratégie
      const rawTime = extractTime(inner);

      // TITRE : la ligne la plus longue qui n'est pas un badge ni une saison ni une heure
      const lines = inner.split('\n').map((l: string) => l.trim()).filter(Boolean);
      const candidateLines = lines.filter((l: string) =>
        l.length > 2 &&
        !/^(Anime|Scans?|Film)$/i.test(l) &&
        !/^Saison\s*\d+/i.test(l) &&
        !/^\d{1,2}h\d{2}$/.test(l) &&
        !/^\d{1,2}:\d{2}$/.test(l) &&
        l !== '?'
      );

      // Prendre la ligne candidate la plus longue (généralement le titre)
      const title = candidateLines.sort((a: string, b: string) => b.length - a.length)[0] || '';

      if (!title || title.length < 2 || title.length > 150) continue;

      episodes.push(buildEpisode(slug, title, langCode, seasonOrScan, rawTime, date, idx++));
    }

    episodes.sort((a, b) => {
      if (a.releaseTime === '?') return 1;
      if (b.releaseTime === '?') return -1;
      return a.releaseTime.localeCompare(b.releaseTime);
    });
    days.push({ date, dayName: name, isToday: date === today, episodes });
  }

  return days;
}

function buildWeekPlanning(days: any[], weekDates: Record<string, string>, today: string) {
  const orderedDays = DAY_NAMES.map(name =>
    days.find(d => d.dayName === name) || {
      date: weekDates[name], dayName: name, isToday: weekDates[name] === today, episodes: [],
    }
  );
  const allDates = Object.values(weekDates).sort();
  return {
    weekStartDate: allDates[0],
    weekEndDate: allDates[6],
    days: orderedDays,
    _importedAt: new Date().toISOString(),
    _source: 'anime-sama',
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url, html: rawInput } = await req.json();
    const weekDates = getWeekDates();
    const today = new Date().toISOString().split('T')[0];

    let input = rawInput as string | undefined;

    // ── Fetch si URL fournie ──────────────────────────────────────────────
    if (!input) {
      const targetUrl = (url || 'https://anime-sama.to/planning/').trim();
      try {
        const response = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9',
          },
          signal: AbortSignal.timeout(15000),
        });
        if (response.ok) {
          input = await response.text();
        } else {
          return NextResponse.json(
            { error: `Site inaccessible (HTTP ${response.status}). La page est rendue côté client — colle le HTML manuellement (Ctrl+U dans le navigateur).`, needsHtml: true },
            { status: 422 }
          );
        }
      } catch (fetchErr: any) {
        return NextResponse.json(
          { error: `Connexion impossible. La page anime-sama nécessite un vrai navigateur. Colle le HTML manuellement (Ctrl+U).`, needsHtml: true },
          { status: 422 }
        );
      }
    }

    // ── Tronquer avant la section "sans date fixe" ────────────────────────
    const truncated = truncateAtEndOfWeek(input);

    // ── Détecter format et parser ─────────────────────────────────────────
    const isHtml = /<[a-z][^>]*>/i.test(truncated);
    const hasMarkdownLinks = /\[(?:Anime|Scans?)\s*\n/.test(truncated);

    let days: any[] = [];

    if (isHtml) {
      days = parseHtml(truncated, weekDates, today);
      // Si le fetch serveur a retourné du HTML vide (CSR), informer l'utilisateur
      if (days.length === 0 || days.every(d => d.episodes.length === 0)) {
        return NextResponse.json({
          error: 'La page anime-sama est rendue côté client (JavaScript). Le fetch serveur ne récupère pas le contenu. Colle le HTML source (Ctrl+U) ou le texte de la page (Ctrl+A Ctrl+C).',
          needsHtml: true,
        }, { status: 422 });
      }
    }
    
    if (!isHtml || days.every(d => d.episodes.length === 0)) {
      days = parseMarkdownLike(truncated, weekDates, today);
    }

    // ── Sécurité : cap par jour ───────────────────────────────────────────
    const MAX_PER_DAY = 40;
    days = days.map(d => ({
      ...d,
      episodes: d.episodes.slice(0, MAX_PER_DAY),
    }));

    const planning = buildWeekPlanning(days, weekDates, today);
    const totalEpisodes = planning.days.reduce((acc: number, d: any) => acc + d.episodes.length, 0);

    if (totalEpisodes === 0) {
      return NextResponse.json({
        error: 'Aucun épisode détecté. Assure-toi de coller le HTML source complet (Ctrl+U → Ctrl+A → Ctrl+C) ou le texte visible de la page (Ctrl+A Ctrl+C).',
        needsHtml: true,
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      planning,
      stats: {
        totalEpisodes,
        format: isHtml ? 'html' : 'markdown',
        days: planning.days.map((d: any) => ({ day: d.dayName, count: d.episodes.length })),
      },
    });
  } catch (err: any) {
    console.error('[import-planning]', err);
    return NextResponse.json(
      { error: err?.message || 'Erreur lors de l\'import' },
      { status: 500 }
    );
  }
}
