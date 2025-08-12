import { Anime, AnimeEpisode, AnimeSeason } from './animeData';

// Configuration ultra-rapide pour l'auto-import
const SPEED_CONFIG = {
  enableCache: true,
  cacheTimeout: 1800000, // 30 minutes
  requestTimeout: 1500, // Réduit à 1.5 secondes
  batchSize: 25, // Augmenté pour plus de rapidité
  batchDelay: 10, // Réduit à 10ms
  maxRetries: 1, // Une seule tentative
  enableLogs: false
};

// Cache ultra-rapide en mémoire
const ultraCache = new Map<string, { data: string[], timestamp: number }>();

/**
 * Parse ultra-rapide des fichiers d'épisodes
 */
function fastParseEpisodeFile(content: string): string[] {
  try {
    const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return [];

    const urlMatches = arrayMatch[1].match(/'([^']+)'/g);
    if (!urlMatches) return [];

    const sibnetIds: string[] = [];
    for (const urlWithQuotes of urlMatches) {
      const url = urlWithQuotes.slice(1, -1);
      const match = url.match(/videoid=(\d+)/);
      if (match) sibnetIds.push(match[1]);
    }

    return sibnetIds;
  } catch {
    return [];
  }
}

/**
 * Chargement ultra-rapide des fichiers d'épisodes
 */
async function ultraFastLoadEpisode(filePath: string): Promise<string[]> {
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  // Cache ultra-rapide
  if (SPEED_CONFIG.enableCache) {
    const cached = ultraCache.get(filePath);
    if (cached && (Date.now() - cached.timestamp) < SPEED_CONFIG.cacheTimeout) {
      return cached.data;
    }
  }
  
  // Requêtes parallèles ultra-rapides
  const promises = folders.map(async (folder) => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), SPEED_CONFIG.requestTimeout);
      
      const response = await fetch(`/${folder}/${filePath}`, { 
        signal: controller.signal,
        cache: 'force-cache',
        headers: { 'Cache-Control': 'max-age=3600' }
      });
      
      if (!response.ok) return null;
      
      const content = await response.text();
      const ids = fastParseEpisodeFile(content);
      
      return { ids, folder };
    } catch {
      return null;
    }
  });
  
  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value && result.value.ids.length > 0) {
      const { ids } = result.value;
      
      // Cache ultra-rapide
      if (SPEED_CONFIG.enableCache) {
        ultraCache.set(filePath, { data: ids, timestamp: Date.now() });
      }
      
      return ids;
    }
  }
  
  return [];
}

/**
 * Chargement ultra-rapide de toutes les saisons
 */
async function ultraFastLoadAllSeasons(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  const folderMapping: Record<string, string> = {
    'attack-on-titan': 'shingeki-no-kyojin',
    'classroom-of-the-elite': 'classroom-of-the-elite',
    'violet-evergarden': 'violet-evergarden',
    'yuyu-hakusho': 'yuyu-hakusho',
    '86-eighty-six': '86-eighty-six',
    'akame-ga-kill': 'akame-ga-kill',
    'jujutsu-kaisen': 'jujutsu-kaisen',
    'demon-slayer': 'demon-slayer',
    'solo-leveling': 'solo-leveling',
    'frieren': 'frieren'
  };
  
  const actualFolderName = folderMapping[animeId] || animeId;
  const seasons: AnimeSeason[] = [];
  
  // Patterns optimisés (seulement les plus communs)
  const seasonPatterns = [
    { folder: 'saison1', seasonNumber: 1, title: 'Saison 1' },
    { folder: 'saison2', seasonNumber: 2, title: 'Saison 2' },
    { folder: 'saison3', seasonNumber: 3, title: 'Saison 3' },
    { folder: 'Film', seasonNumber: 'Film', title: 'Film' }
  ];
  
  // Traitement ultra-parallèle
  const patternPromises = seasonPatterns.map(async (pattern) => {
    const vostfrPath = `${actualFolderName}/${pattern.folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${pattern.folder}/episodes_vf.js`;
    
    const [vostfrIds, vfIds] = await Promise.all([
      ultraFastLoadEpisode(vostfrPath),
      ultraFastLoadEpisode(vfPath)
    ]);
    
    if (vostfrIds.length === 0 && vfIds.length === 0) return null;
    
    const maxEpisodes = Math.max(vostfrIds.length, vfIds.length);
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: pattern.seasonNumber === 'Film' ? pattern.title : `Épisode ${i + 1}`,
      };
      
      if (vostfrIds[i]) episode.sibnetVostfrId = vostfrIds[i];
      if (vfIds[i]) episode.sibnetVfId = vfIds[i];
      
      episodes.push(episode);
    }
    
    if (episodes.length > 0) {
      let seasonYear = animeYear || new Date().getFullYear();
      if (typeof pattern.seasonNumber === 'number' && pattern.seasonNumber > 1 && animeYear) {
        seasonYear = animeYear + (pattern.seasonNumber - 1);
      }
      
      return {
        seasonNumber: pattern.seasonNumber,
        title: pattern.title,
        year: seasonYear,
        episodes
      };
    }
    
    return null;
  });
  
  const results = await Promise.allSettled(patternPromises);
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      seasons.push(result.value);
    }
  }
  
  return seasons;
}

/**
 * Version ultra-rapide de l'auto-chargement
 */
export async function ultraFastAutoLoad(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  try {
    return await ultraFastLoadAllSeasons(animeId, animeYear);
  } catch {
    return [];
  }
}

/**
 * Version ultra-rapide de l'enrichissement
 */
export async function ultraFastEnrichAnime(anime: Anime): Promise<Anime> {
  if (anime.seasons && anime.seasons.length > 0 && anime.seasons[0].episodes.length > 0) {
    return anime;
  }
  
  const autoSeasons = await ultraFastAutoLoad(anime.id, anime.year);
  
  if (autoSeasons.length > 0) {
    return { ...anime, seasons: autoSeasons };
  }
  
  return anime;
}

/**
 * Version ultra-rapide pour multiple animes
 */
export async function ultraFastEnrichMultiple(animes: Anime[]): Promise<Anime[]> {
  const enrichedAnimes: Anime[] = [];
  
  const batchSize = SPEED_CONFIG.batchSize;
  for (let i = 0; i < animes.length; i += batchSize) {
    const batch = animes.slice(i, i + batchSize);
    
    const batchPromises = batch.map(anime => ultraFastEnrichAnime(anime));
    const enrichedBatch = await Promise.all(batchPromises);
    
    enrichedAnimes.push(...enrichedBatch);
    
    if (i + batchSize < animes.length) {
      await new Promise(resolve => setTimeout(resolve, SPEED_CONFIG.batchDelay));
    }
  }
  
  return enrichedAnimes;
}

/**
 * Utilitaires pour le cache ultra-rapide
 */
export function clearUltraCache(): void {
  ultraCache.clear();
}

export function getUltraCacheStats(): { entries: number; size: string } {
  const entries = ultraCache.size;
  const size = `${Math.round(JSON.stringify([...ultraCache.entries()]).length / 1024)}KB`;
  return { entries, size };
}

/**
 * Parse le contenu d'un fichier d'épisodes JavaScript et extrait les IDs Sibnet
 */
function parseEpisodeFileContent(content: string): string[] {
  try {
    // Trouve le tableau dans le fichier JavaScript
    const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) {
      return [];
    }

    const arrayContent = arrayMatch[1];
    
    // Extrait toutes les URLs
    const urlMatches = arrayContent.match(/'([^']+)'/g);
    if (!urlMatches) {
      return [];
    }

    // Extrait les IDs Sibnet de chaque URL
    const sibnetIds: string[] = [];
    urlMatches.forEach(urlWithQuotes => {
      const url = urlWithQuotes.slice(1, -1); // Retire les guillemets
      const match = url.match(/videoid=(\d+)/);
      if (match) {
        sibnetIds.push(match[1]);
      }
    });

    return sibnetIds;
  } catch (error) {
    console.error('Erreur lors du parsing du fichier:', error);
    return [];
  }
}

/**
 * Charge un fichier d'épisodes depuis le serveur web
 * Essaie d'abord dans anime_episodes_js, puis dans anime_episodes_js_2
 */
async function loadEpisodeFile(filePath: string): Promise<string[]> {
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  for (const folder of folders) {
    try {
      // Construire l'URL pour accéder au fichier depuis le dossier public
      const url = `/${folder}/${filePath}`;
      
      console.log(`🔍 Tentative de chargement: ${url}`);
      
      const response = await fetch(url);
      console.log(`📡 Réponse HTTP: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        console.log(`❌ Fichier non trouvé: ${url} (Status: ${response.status})`);
        continue; // Essayer le dossier suivant
      }
      
      const content = await response.text();
      console.log(`📄 Contenu reçu de ${folder} (${content.length} caractères): ${content.substring(0, 100)}...`);
      
      const ids = parseEpisodeFileContent(content);
      console.log(`🎯 IDs extraits de ${folder}: ${ids.length} épisodes [${ids.slice(0, 3).join(', ')}...]`);
      
      return ids; // Retourner dès qu'on trouve un fichier valide
    } catch (error) {
      console.error(`❌ Erreur lors du chargement de ${filePath} depuis ${folder}:`, error);
      continue; // Essayer le dossier suivant
    }
  }
  
  // Si aucun dossier n'a fourni le fichier
  console.log(`❌ Fichier ${filePath} introuvable dans tous les dossiers d'épisodes`);
  return [];
}

/**
 * Charge toutes les saisons disponibles pour un anime
 */
async function loadAllSeasonsForAnime(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  // Mapping des IDs d'anime vers les vrais noms de dossiers
  const folderMapping: Record<string, string> = {
    'attack-on-titan': 'shingeki-no-kyojin',
    'classroom-of-the-elite': 'classroom-of-the-elite',
    'violet-evergarden': 'violet-evergarden',
    'yuyu-hakusho': 'yuyu-hakusho',
    '86-eighty-six': '86-eighty-six',
    'akame-ga-kill': 'akame-ga-kill',
    'aldnoah-zero': 'aldnoah-zero',
    'a-certain-magical-index': 'a-certain-magical-index',
    'a-certain-scientific-railgun': 'a-certain-scientific-railgun',
    'accel-world': 'accel-world',
    'ajin': 'ajin',
    'alice-in-borderlands': 'alice-in-borderlands',
    'air-gear': 'air-gear',
    'aharen-san-wa-hakarenai': 'aharen-san-wa-hakarenai',
    'aho-girl': 'aho-girl',
    'akatsuki-no-yona': 'akatsuki-no-yona',
    '91-days': '91-days',
    'absolute-duo': 'absolute-duo',
    'a-couple-of-cuckoos': 'a-couple-of-cuckoos',
    // Ajoutez d'autres mappings selon vos besoins
  };
  
  // Utiliser le mapping ou l'ID original si pas de mapping
  const actualFolderName = folderMapping[animeId] || animeId;
  
  const seasons: AnimeSeason[] = [];
  
  // Liste des patterns de dossiers à tester
  const seasonPatterns = [
    // Saisons normales (1-5)
    ...Array.from({length: 5}, (_, i) => ({
      folder: `saison${i + 1}`,
      seasonNumber: i + 1,
      title: `Saison ${i + 1}`
    })),
    // Saisons hors-série
    ...Array.from({length: 5}, (_, i) => ({
      folder: `saison${i + 1}hs`,
      seasonNumber: `${i + 1}hs`,
      title: `Saison ${i + 1} - Hors-série`
    })),
    // Film
    {
      folder: 'Film',
      seasonNumber: 'Film',
      title: 'Film'
    }
  ];
  
  for (const pattern of seasonPatterns) {
    const vostfrPath = `${actualFolderName}/${pattern.folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${pattern.folder}/episodes_vf.js`;
    
    const [vostfrIds, vfIds] = await Promise.all([
      loadEpisodeFile(vostfrPath),
      loadEpisodeFile(vfPath)
    ]);
    
    // Si aucun fichier trouvé pour ce pattern, continuer avec le suivant
    if (vostfrIds.length === 0 && vfIds.length === 0) {
      continue;
    }
    
    // Créer les épisodes en combinant VOSTFR et VF
    const maxEpisodes = Math.max(vostfrIds.length, vfIds.length);
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: pattern.seasonNumber === 'Film' ? pattern.title : `Épisode ${i + 1}`,
      };
      
      if (vostfrIds[i]) {
        episode.sibnetVostfrId = vostfrIds[i];
      }
      
      if (vfIds[i]) {
        episode.sibnetVfId = vfIds[i];
      }
      
      episodes.push(episode);
    }
    
    if (episodes.length > 0) {
      let seasonYear = animeYear || new Date().getFullYear();
      if (typeof pattern.seasonNumber === 'number' && pattern.seasonNumber > 1 && animeYear) {
        seasonYear = animeYear + (pattern.seasonNumber - 1); // Approximation for subsequent seasons
      }
      
      seasons.push({
        seasonNumber: pattern.seasonNumber,
        title: pattern.title,
        year: seasonYear,
        episodes
      });
      
      console.log(`✅ ${pattern.title} chargée: ${episodes.length} épisodes (${seasonYear})`);
    }
  }
  
  return seasons;
}

/**
 * Fonction principale pour charger automatiquement les épisodes
 */
export async function autoLoadEpisodes(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  console.log(`🔍 Auto-chargement des épisodes pour: ${animeId} (${animeYear || 'année inconnue'})`);
  
  try {
    const seasons = await loadAllSeasonsForAnime(animeId, animeYear);
    
    if (seasons.length > 0) {
      console.log(`🎯 ${seasons.length} saison(s) chargée(s) pour ${animeId}`);
      
      // Log détaillé pour debug
      seasons.forEach(season => {
        console.log(`  📺 ${season.title}: ${season.episodes.length} épisodes`);
      });
      
      return seasons;
    } else {
      console.log(`⚠️ Aucun épisode trouvé pour ${animeId}`);
      return [];
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'auto-chargement pour ${animeId}:`, error);
    return [];
  }
}

/**
 * Enrichit un anime avec les épisodes auto-chargés, en gardant les saisons existantes
 */
export async function enrichAnimeWithRealEpisodes(anime: Anime): Promise<Anime> {
  // Si l'anime a déjà des saisons ET des épisodes, on les garde
  if (anime.seasons && anime.seasons.length > 0 && anime.seasons[0].episodes.length > 0) {
    console.log(`📚 ${anime.title} a déjà des épisodes définis manuellement`);
    return anime;
  }
  
  // Essayer l'auto-chargement avec l'année de l'anime
  const autoSeasons = await autoLoadEpisodes(anime.id, anime.year);
  
  if (autoSeasons.length > 0) {
    console.log(`🎯 Auto-chargement réussi pour ${anime.title}`);
    return {
      ...anime,
      seasons: autoSeasons
    };
  }
  
  // Si échec, garder la structure existante
  console.log(`⚠️ Auto-chargement échoué pour ${anime.title}, conservation des données manuelles`);
  return anime;
}

/**
 * Version batch pour enrichir plusieurs animes
 */
export async function enrichMultipleAnimes(animes: Anime[]): Promise<Anime[]> {
  console.log(`🔄 Enrichissement de ${animes.length} animes...`);
  
  const enrichedAnimes: Anime[] = [];
  
  // Traiter par petits groupes pour éviter de surcharger le serveur
  const batchSize = 5;
  for (let i = 0; i < animes.length; i += batchSize) {
    const batch = animes.slice(i, i + batchSize);
    
    const batchPromises = batch.map(anime => enrichAnimeWithRealEpisodes(anime));
    const enrichedBatch = await Promise.all(batchPromises);
    
    enrichedAnimes.push(...enrichedBatch);
    
    // Petite pause entre les batches
    if (i + batchSize < animes.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`✅ Enrichissement terminé`);
  return enrichedAnimes;
}

/**
 * Vérifie si des épisodes sont disponibles pour un anime donné
 * Vérifie dans les deux dossiers : anime_episodes_js et anime_episodes_js_2
 */
export async function checkEpisodesAvailability(animeId: string): Promise<boolean> {
  // Même mapping que dans loadAllSeasonsForAnime
  const folderMapping: Record<string, string> = {
    'attack-on-titan': 'shingeki-no-kyojin',
    'classroom-of-the-elite': 'classroom-of-the-elite',
    'violet-evergarden': 'violet-evergarden',
    // Ajoutez d'autres mappings selon vos besoins
  };
  
  const actualFolderName = folderMapping[animeId] || animeId;
  
  // Patterns de dossiers à tester (mêmes que dans loadAllSeasonsForAnime)
  const testPaths = [
    `${actualFolderName}/saison1/episodes_vostfr.js`,
    `${actualFolderName}/saison1hs/episodes_vostfr.js`,
    `${actualFolderName}/Film/episodes_vostfr.js`
  ];
  
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  try {
    // Tester chaque pattern dans chaque dossier en parallèle
    const results = await Promise.all(
      folders.flatMap(folder =>
        testPaths.map(async (testPath) => {
          const url = `/${folder}/${testPath}`;
          try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
          } catch {
            return false;
          }
        })
      )
    );
    
    // Retourner true si au moins un pattern fonctionne dans n'importe quel dossier
    return results.some(result => result);
  } catch {
    return false;
  }
}

/**
 * Utilitaire pour débugger un anime spécifique
 */
export async function debugAnimeEpisodes(animeId: string): Promise<void> {
  console.log(`\n🔧 DEBUG: ${animeId}`);
  
  const available = await checkEpisodesAvailability(animeId);
  console.log(`📁 Dossier disponible: ${available ? '✅' : '❌'}`);
  
  if (available) {
    const seasons = await autoLoadEpisodes(animeId);
    
    seasons.forEach(season => {
      console.log(`\n📺 ${season.title}:`);
      season.episodes.slice(0, 3).forEach(ep => {
        const vostfr = ep.sibnetVostfrId ? ` VOSTFR:${ep.sibnetVostfrId}` : '';
        const vf = ep.sibnetVfId ? ` VF:${ep.sibnetVfId}` : '';
        console.log(`  ${ep.number}. ${ep.title}${vostfr}${vf}`);
      });
      if (season.episodes.length > 3) {
        console.log(`  ... et ${season.episodes.length - 3} autres`);
      }
    });
  }
} 