import { NextResponse } from 'next/server';
import https from 'https';

function fetchUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(null));
  });
}

function parseArray(scriptText: string): string[] {
    // Les liens sont souvent dans eps1, eps2, eps3... on prend généralement le lecteur principal (souvent eps1 ou eps3 pour sibnet)
    // L'objectif principal est de récupérer SIBNET en priorité absolue. S'il n'y a pas Sibnet, on essaie Vidmoly, etc.
    
    const arrayRegex = /var\s+eps\d+\s*=\s*\[([\s\S]*?)\];/g;
    let match;
    let bestUrls: string[] = [];
    let foundSibnet = false;
    let foundVidmoly = false;
    
    while ((match = arrayRegex.exec(scriptText)) !== null) {
        try {
            const arrayStr = match[1];
            const urls = [...arrayStr.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
            
            if (urls.length > 0) {
                const hasSibnet = urls.some(u => u.includes('sibnet'));
                const hasVidmoly = urls.some(u => u.includes('vidmoly'));
                
                // Si on a trouvé un Sibnet, c'est le roi, on le prend et on ne le remplace plus
                if (hasSibnet && !foundSibnet) {
                    bestUrls = urls;
                    foundSibnet = true;
                } 
                // Si on a pas encore de Sibnet, et qu'on trouve du Vidmoly, on le prend par défaut
                else if (hasVidmoly && !foundSibnet && !foundVidmoly) {
                    bestUrls = urls;
                    foundVidmoly = true;
                }
                // Si on a ni Sibnet ni Vidmoly pour l'instant, on prend le premier qui vient
                else if (bestUrls.length === 0) {
                    bestUrls = urls;
                }
            }
        } catch(e) {}
    }
    
    return bestUrls;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url || !url.includes('anime-sama.to/catalogue/')) {
      return NextResponse.json({ error: 'URL Anime-Sama invalide' }, { status: 400 });
    }

    let animeUrl = url;
    if (!animeUrl.endsWith('/')) animeUrl += '/';

    const html = await fetchUrl(animeUrl);
    if (!html) {
      return NextResponse.json({ error: 'Impossible de récupérer la page' }, { status: 404 });
    }

    const matches = [...html.matchAll(/panneauAnime\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*\)/g)];
    
    const seasons = [];
    let globalSeasonIndex = 1;

    for (const match of matches) {
      const title = match[1];
      if (title.toLowerCase() === 'nom') continue; // template

      let path = match[2];
      
      let base = path;
      if (base.endsWith('/vostfr') || base.endsWith('/vostfr/')) {
          base = base.replace(/\/vostfr\/?$/, '');
      } else if (base.endsWith('/vf') || base.endsWith('/vf/')) {
          base = base.replace(/\/vf\/?$/, '');
      }

      const vostfrUrl = `${animeUrl}${base}/vostfr/episodes.js`;
      const vfUrl = `${animeUrl}${base}/vf/episodes.js`;

      const [vostfrData, vfData] = await Promise.all([
          fetchUrl(vostfrUrl),
          fetchUrl(vfUrl)
      ]);

      const vostfrEps = vostfrData ? parseArray(vostfrData) : [];
      const vfEps = vfData ? parseArray(vfData) : [];

      const maxEps = Math.max(vostfrEps.length, vfEps.length);
      
      if (maxEps > 0) {
        const episodes = [];
        for (let i = 0; i < maxEps; i++) {
          const ep: any = {
            number: i + 1,
            title: `Épisode ${i + 1}`,
          };
          
          if (vostfrEps[i]) {
             if (vostfrEps[i].includes('sibnet.ru')) {
                 const idMatch = vostfrEps[i].match(/videoid=(\d+)/);
                 ep.sibnetVostfrId = idMatch ? idMatch[1] : vostfrEps[i];
             } else if (vostfrEps[i].includes('vidmoly')) {
                 ep.vidmolyUrl = vostfrEps[i];
             } else if (vostfrEps[i].includes('movearn')) {
                 ep.movearnUrl = vostfrEps[i];
             } else if (vostfrEps[i].includes('sendvid')) {
                 const idMatch = vostfrEps[i].match(/sendvid\.com\/(?:embed\/)?([a-zA-Z0-9]+)/);
                 ep.sendvidId = idMatch ? idMatch[1] : vostfrEps[i];
             } else {
                 // Les lecteurs dingtezuni, lpayer, etc. ne sont pas supportés nativement, on les met en m3u8 pour ne pas les perdre
                 ep.m3u8Url = vostfrEps[i];
             }
          }
          
          if (vfEps[i]) {
             if (vfEps[i].includes('sibnet.ru')) {
                 const idMatch = vfEps[i].match(/videoid=(\d+)/);
                 ep.sibnetVfId = idMatch ? idMatch[1] : vfEps[i];
             } else if (vfEps[i].includes('vidmoly')) {
                 ep.vidmolyVfUrl = vfEps[i];
             } else if (vfEps[i].includes('movearn')) {
                 ep.movearnVfUrl = vfEps[i];
             } else if (vfEps[i].includes('sendvid')) {
                 const idMatch = vfEps[i].match(/sendvid\.com\/(?:embed\/)?([a-zA-Z0-9]+)/);
                 ep.sendvidVfId = idMatch ? idMatch[1] : vfEps[i];
             } else {
                 ep.m3u8VfUrl = vfEps[i];
             }
          }
          
          episodes.push(ep);
        }

        seasons.push({
          seasonNumber: globalSeasonIndex++,
          title: title,
          year: new Date().getFullYear(),
          episodes
        });
      }
    }

    return NextResponse.json({ seasons });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
