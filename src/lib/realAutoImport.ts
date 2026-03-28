import { Anime, AnimeEpisode, AnimeSeason } from './animeData';
import { simpleFetch } from './simple-403-fix';

// Configuration ultra-rapide pour l'auto-import
const SPEED_CONFIG = {
  enableCache: true,
  cacheTimeout: 1800000, // 30 minutes
  requestTimeout: 800, // Encore plus rapide
  batchSize: 1, // Un seul à la fois pour éviter surcharge
  batchDelay: 50, // Délai minimal
  maxRetries: 1, // Une seule tentative
  enableLogs: false // LOGS DÉSACTIVÉS pour la performance
};

// Cache ultra-rapide en mémoire
const ultraCache = new Map<string, { data: string[], timestamp: number }>();

// Cache des animes enrichis pour éviter les rechargements
const enrichedAnimeCache = new Map<string, { anime: Anime, timestamp: number }>();

// Helper function to get base URL
function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // Browser should use relative url
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

/**
 * Parse ultra-rapide des fichiers d'épisodes avec support Sendvid
 * Garde l'ordre d'apparition dans le fichier
 */
function fastParseEpisodeFile(content: string): { episodes: Array<{type: 'sibnet' | 'sendvid', id: string}> } {
  try {
    const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return { episodes: [] };

    const urlMatches = arrayMatch[1].match(/'([^']+)'/g);
    if (!urlMatches) return { episodes: [] };

    const episodes: Array<{type: 'sibnet' | 'sendvid', id: string}> = [];
    
    for (const urlWithQuotes of urlMatches) {
      const url = urlWithQuotes.slice(1, -1);
      
      // Détecter Sibnet
      const sibnetMatch = url.match(/videoid=(\d+)/);
      if (sibnetMatch) {
        episodes.push({ type: 'sibnet', id: sibnetMatch[1] });
        continue;
      }
      
      // Détecter Sendvid
      const sendvidMatch = url.match(/sendvid\.com\/embed\/([a-zA-Z0-9]+)/);
      if (sendvidMatch) {
        episodes.push({ type: 'sendvid', id: sendvidMatch[1] });
        // Log désactivé pour la performance
      }
    }

    return { episodes };
  } catch {
    return { episodes: [] };
  }
}

/**
 * Chargement ultra-rapide des fichiers d'épisodes avec protection 403 et support Sendvid
 */
async function ultraFastLoadEpisode(filePath: string): Promise<{ sibnetIds: string[], sendvidIds: string[], episodes: Array<{type: 'sibnet' | 'sendvid', id: string}> }> {
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  // Cache ultra-rapide (noter que le cache doit maintenant gérer la nouvelle structure)
  if (SPEED_CONFIG.enableCache) {
    const cached = ultraCache.get(filePath);
    if (cached && (Date.now() - cached.timestamp) < SPEED_CONFIG.cacheTimeout) {
      // Pour la compatibilité avec l'ancien cache, traiter les données comme Sibnet uniquement
      if (Array.isArray(cached.data)) {
        return { 
          sibnetIds: cached.data, 
          sendvidIds: [], 
          episodes: cached.data.map(id => ({ type: 'sibnet' as const, id }))
        };
      }
    }
  }
  
  // Si on est côté serveur en local, utiliser le système de fichiers (plus rapide)
  // Sur Vercel, on préfère utiliser l'URL car le dossier public n'est pas toujours accessible via fs de la même façon
  if (typeof window === 'undefined' && !process.env.VERCEL) {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    for (const folder of folders) {
      const fullPath = path.join(process.cwd(), 'public', folder, filePath);
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        const result = fastParseEpisodeFile(content);
        
        // Convertir pour la compatibilité avec l'ancienne interface
        const sibnetIds: string[] = [];
        const sendvidIds: string[] = [];
        
        result.episodes.forEach(episode => {
          if (episode.type === 'sibnet') {
            sibnetIds.push(episode.id);
          } else if (episode.type === 'sendvid') {
            sendvidIds.push(episode.id);
          }
        });
        
        if (result.episodes.length > 0) {
          // Cache ultra-rapide (stocker les IDs Sibnet pour compatibilité)
          if (SPEED_CONFIG.enableCache) {
            ultraCache.set(filePath, { data: sibnetIds, timestamp: Date.now() });
          }
          return { sibnetIds, sendvidIds, episodes: result.episodes };
        }
      } catch (e) {
        // Fichier non trouvé dans ce dossier, on essaie le suivant
        continue;
      }
    }
    
    // Si on arrive ici, le fichier n'a été trouvé dans aucun dossier
    return { sibnetIds: [], sendvidIds: [], episodes: [] };
  }

  // Fallback pour le côté client (avec délai et headers pour éviter le ban)
  const randomDelay = Math.random() * 200 + 100; // 100-300ms
  await new Promise(resolve => setTimeout(resolve, randomDelay));
  
  // Headers simples pour éviter la détection
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.5',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  };
  
    // Requêtes séquentielles pour éviter la surcharge
  const baseUrl = getBaseUrl();
  for (const folder of folders) {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), SPEED_CONFIG.requestTimeout);
      
      const response = await simpleFetch(`${baseUrl}/${folder}/${filePath}`, { 
        signal: controller.signal,
        headers: headers,
        method: 'GET'
      });
      
      if (!response.ok) continue;
      
      const content = await response.text();
      const result = fastParseEpisodeFile(content);
      
      if (result.episodes.length > 0) {
        // Convertir pour la compatibilité avec l'ancienne interface
        const sibnetIds: string[] = [];
        const sendvidIds: string[] = [];
        
        result.episodes.forEach(episode => {
          if (episode.type === 'sibnet') {
            sibnetIds.push(episode.id);
          } else if (episode.type === 'sendvid') {
            sendvidIds.push(episode.id);
          }
        });
        
        // Cache ultra-rapide (stocker les IDs Sibnet pour compatibilité)
        if (SPEED_CONFIG.enableCache) {
          ultraCache.set(filePath, { data: sibnetIds, timestamp: Date.now() });
        }
        
        // Log désactivé pour la performance
        return { 
          sibnetIds, 
          sendvidIds, 
          episodes: result.episodes 
        }; // ARRÊT immédiat - pas besoin de chercher ailleurs
      }
    } catch {
      continue; // Essayer le dossier suivant
    }
    
    // Petit délai entre les tentatives
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return { sibnetIds: [], sendvidIds: [], episodes: [] };
}

/**
 * Chargement ultra-rapide de toutes les saisons
 */
async function ultraFastLoadAllSeasons(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  // Utiliser directement l'ID de l'anime comme nom de dossier (système automatique)
  const actualFolderName = animeId;
  const seasons: AnimeSeason[] = [];
  
  // Patterns optimisés - augmenté pour couvrir plus de saisons (jusqu'à 15 pour One Piece etc.)
  const seasonPatterns = [
    { folder: 'saison1', seasonNumber: 1, title: 'Saison 1' },
    { folder: 'saison2', seasonNumber: 2, title: 'Saison 2' },
    { folder: 'saison3', seasonNumber: 3, title: 'Saison 3' },
    { folder: 'saison4', seasonNumber: 4, title: 'Saison 4' },
    { folder: 'saison5', seasonNumber: 5, title: 'Saison 5' },
    { folder: 'saison6', seasonNumber: 6, title: 'Saison 6' },
    { folder: 'saison7', seasonNumber: 7, title: 'Saison 7' },
    { folder: 'saison8', seasonNumber: 8, title: 'Saison 8' },
    { folder: 'saison9', seasonNumber: 9, title: 'Saison 9' },
    { folder: 'saison10', seasonNumber: 10, title: 'Saison 10' },
    { folder: 'saison11', seasonNumber: 11, title: 'Saison 11' },
    { folder: 'saison12', seasonNumber: 12, title: 'Saison 12' },
    { folder: 'saison13', seasonNumber: 13, title: 'Saison 13' },
    { folder: 'saison14', seasonNumber: 14, title: 'Saison 14' },
    { folder: 'saison15', seasonNumber: 15, title: 'Saison 15' },
    { folder: 'Film', seasonNumber: 'Film', title: 'Film' }
  ];
  
  // Traitement ultra-parallèle
  const patternPromises = seasonPatterns.map(async (pattern) => {
    const vostfrPath = `${actualFolderName}/${pattern.folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${pattern.folder}/episodes_vf.js`;
    
    const [vostfrResult, vfResult] = await Promise.all([
      ultraFastLoadEpisode(vostfrPath),
      ultraFastLoadEpisode(vfPath)
    ]);
    
    if (vostfrResult.episodes.length === 0 && vfResult.episodes.length === 0) return null;
    
    // Utiliser le nombre maximum d'épisodes entre VOSTFR et VF
    const maxEpisodes = Math.max(vostfrResult.episodes.length, vfResult.episodes.length);
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: pattern.seasonNumber === 'Film' ? pattern.title : `Épisode ${i + 1}`,
      };
      
      // VOSTFR - respecter l'ordre d'apparition dans le fichier
      if (vostfrResult.episodes[i]) {
        if (vostfrResult.episodes[i].type === 'sibnet') {
          episode.sibnetVostfrId = vostfrResult.episodes[i].id;
        } else if (vostfrResult.episodes[i].type === 'sendvid') {
          episode.sendvidId = vostfrResult.episodes[i].id;
        }
      }
      
      // VF - respecter l'ordre d'apparition dans le fichier
      if (vfResult.episodes[i]) {
        if (vfResult.episodes[i].type === 'sibnet') {
          episode.sibnetVfId = vfResult.episodes[i].id;
        } else if (vfResult.episodes[i].type === 'sendvid') {
          episode.sendvidVfId = vfResult.episodes[i].id;
        }
      }
      
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
 * Charge un fichier depuis un dossier spécifique (optimisation)
 */
async function loadEpisodeFromSpecificFolder(filePath: string, folder: string): Promise<{ sibnetIds: string[], sendvidIds: string[], episodes: Array<{type: 'sibnet' | 'sendvid', id: string}> }> {
  try {
    // Si on est côté serveur en local, utiliser le système de fichiers pour plus de rapidité et de fiabilité
    if (typeof window === 'undefined' && !process.env.VERCEL) {
      const fs = await import('fs/promises');
      const path = await import('path');
      const fullPath = path.join(process.cwd(), 'public', folder, filePath);
      
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        const result = fastParseEpisodeFile(content);
        
        // Convertir pour la compatibilité avec l'ancienne interface
        const sibnetIds: string[] = [];
        const sendvidIds: string[] = [];
        
        result.episodes.forEach(episode => {
          if (episode.type === 'sibnet') {
            sibnetIds.push(episode.id);
          } else if (episode.type === 'sendvid') {
            sendvidIds.push(episode.id);
          }
        });
        
        return { sibnetIds, sendvidIds, episodes: result.episodes };
      } catch (err) {
        // Fichier non trouvé ou erreur de lecture
        return { sibnetIds: [], sendvidIds: [], episodes: [] };
      }
    }

    // Fallback pour le côté client ou Vercel
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/${folder}/${filePath}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const content = await response.text();
      const result = fastParseEpisodeFile(content);
      
      // Convertir pour la compatibilité avec l'ancienne interface
      const sibnetIds: string[] = [];
      const sendvidIds: string[] = [];
      
      result.episodes.forEach(episode => {
        if (episode.type === 'sibnet') {
          sibnetIds.push(episode.id);
        } else if (episode.type === 'sendvid') {
          sendvidIds.push(episode.id);
        }
      });
      
      if (SPEED_CONFIG.enableLogs && result.episodes.length > 0) {
        // Log désactivé pour la performance
      }
      
      return { sibnetIds, sendvidIds, episodes: result.episodes };
    }
  } catch (error) {
    if (SPEED_CONFIG.enableLogs) {
      // Log d'erreur désactivé pour la performance
    }
  }
  
  return { sibnetIds: [], sendvidIds: [], episodes: [] };
}

/**
 * Chargement séquentiel optimisé des saisons (s'arrête quand plus de saisons trouvées)
 */
async function sequentialLoadSeasons(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  // Utiliser directement l'ID de l'anime comme nom de dossier (système automatique)
  const actualFolderName = animeId;
  const seasons: AnimeSeason[] = [];
  
  if (SPEED_CONFIG.enableLogs) {
    // Log désactivé pour la performance
  }
  
  // Chargement séquentiel des saisons (commence par saison 1, 2, 3...)
  let seasonNumber = 1;
  let foundInFolder: string | null = null; // Tracker dans quel dossier on a trouvé l'anime
  
  while (seasonNumber <= 50) { // Limite à 50 saisons max
    const folder = `saison${seasonNumber}`;
    const vostfrPath = `${actualFolderName}/${folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${folder}/episodes_vf.js`;
    
    if (SPEED_CONFIG.enableLogs) {
      // Log désactivé pour la performance
    }
    
    // Si on a déjà trouvé l'anime dans un dossier, utiliser une version optimisée
    let vostfrResult, vfResult;
    if (foundInFolder) {
      // Charger directement depuis le dossier connu
      vostfrResult = await loadEpisodeFromSpecificFolder(vostfrPath, foundInFolder);
      vfResult = await loadEpisodeFromSpecificFolder(vfPath, foundInFolder);
    } else {
      // Première recherche - tester les dossiers
      [vostfrResult, vfResult] = await Promise.all([
        ultraFastLoadEpisode(vostfrPath),
        ultraFastLoadEpisode(vfPath)
      ]);
      
      // Déterminer dans quel dossier on a trouvé l'anime en testant directement
      if (vostfrResult.episodes.length > 0 || vfResult.episodes.length > 0) {
        
        // Tester quel dossier contient vraiment les fichiers
        try {
          const baseUrl = getBaseUrl();
          const testUrl1 = `${baseUrl}/anime_episodes_js/${vostfrPath}`;
          const testResponse1 = await fetch(testUrl1, { method: 'HEAD' });
          if (testResponse1.ok) {
            foundInFolder = 'anime_episodes_js';
          } else {
            foundInFolder = 'anime_episodes_js_2';
          }
        } catch {
          foundInFolder = 'anime_episodes_js_2';
        }
        
        if (SPEED_CONFIG.enableLogs) {
          // Log désactivé pour la performance
        }
      }
    }
    
    // Si aucun fichier trouvé pour cette saison, ARRÊTER immédiatement
    if (vostfrResult.episodes.length === 0 && vfResult.episodes.length === 0) {
      if (SPEED_CONFIG.enableLogs) {
        // Log désactivé pour la performance
      }
      break; // Arrêter immédiatement la recherche des saisons
    }
    
    // Créer les épisodes dans l'ordre d'apparition
    const maxEpisodes = Math.max(vostfrResult.episodes.length, vfResult.episodes.length);
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: `Épisode ${i + 1}`,
      };
      
      // VOSTFR - respecter l'ordre d'apparition dans le fichier
      if (vostfrResult.episodes[i]) {
        if (vostfrResult.episodes[i].type === 'sibnet') {
          episode.sibnetVostfrId = vostfrResult.episodes[i].id;
        } else if (vostfrResult.episodes[i].type === 'sendvid') {
          episode.sendvidId = vostfrResult.episodes[i].id;
        }
      }
      
      // VF - respecter l'ordre d'apparition dans le fichier
      if (vfResult.episodes[i]) {
        if (vfResult.episodes[i].type === 'sibnet') {
          episode.sibnetVfId = vfResult.episodes[i].id;
        } else if (vfResult.episodes[i].type === 'sendvid') {
          episode.sendvidVfId = vfResult.episodes[i].id;
        }
      }
      
      episodes.push(episode);
    }
    
    if (episodes.length > 0) {
      const seasonYear = animeYear ? animeYear + (seasonNumber - 1) : 2024;
      seasons.push({
        seasonNumber: seasonNumber,
        title: `Saison ${seasonNumber}`,
        year: seasonYear,
        episodes
      });
      
      if (SPEED_CONFIG.enableLogs) {
        // Log désactivé pour la performance
      }
    }
    
    seasonNumber++;
    
    // Petit délai pour éviter de surcharger
    if (seasonNumber % 3 === 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  // Vérifier les films TOUJOURS (même si aucune saison trouvée)
  const filmPath = `${actualFolderName}/Film/episodes_vostfr.js`;
  const filmVfPath = `${actualFolderName}/Film/episodes_vf.js`;
  
  let filmVostfr, filmVf;
  if (foundInFolder) {
    // Utiliser le dossier où on a trouvé l'anime
    filmVostfr = await loadEpisodeFromSpecificFolder(filmPath, foundInFolder);
    filmVf = await loadEpisodeFromSpecificFolder(filmVfPath, foundInFolder);
  } else {
    // Chercher dans tous les dossiers si aucun anime trouvé
    [filmVostfr, filmVf] = await Promise.all([
      ultraFastLoadEpisode(filmPath),
      ultraFastLoadEpisode(filmVfPath)
    ]);
  }
  
  if (filmVostfr.episodes.length > 0 || filmVf.episodes.length > 0) {
    
    const maxFilms = Math.max(filmVostfr.episodes.length, filmVf.episodes.length);
    
    const filmEpisodes: AnimeEpisode[] = [];
    for (let i = 0; i < maxFilms; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: `Film ${i + 1}`,
      };
      
      // VOSTFR - respecter l'ordre d'apparition dans le fichier
      if (filmVostfr.episodes[i]) {
        if (filmVostfr.episodes[i].type === 'sibnet') {
          episode.sibnetVostfrId = filmVostfr.episodes[i].id;
        } else if (filmVostfr.episodes[i].type === 'sendvid') {
          episode.sendvidId = filmVostfr.episodes[i].id;
        }
      }
      
      // VF - respecter l'ordre d'apparition dans le fichier
      if (filmVf.episodes[i]) {
        if (filmVf.episodes[i].type === 'sibnet') {
          episode.sibnetVfId = filmVf.episodes[i].id;
        } else if (filmVf.episodes[i].type === 'sendvid') {
          episode.sendvidVfId = filmVf.episodes[i].id;
        }
      }
      
      filmEpisodes.push(episode);
    }
    
    if (filmEpisodes.length > 0) {
      seasons.push({
        seasonNumber: 'Film',
        title: 'Films',
        year: animeYear || 2024,
        episodes: filmEpisodes
      });
      
      if (SPEED_CONFIG.enableLogs) {
        // Log désactivé pour la performance
      }
    }
  }
  
  if (SPEED_CONFIG.enableLogs) {
    console.log(`🎯 Chargement terminé: ${seasons.length} saison(s) trouvée(s) pour ${animeId}`);
  }
  
  return seasons;
}

/**
 * Version ultra-rapide de l'auto-chargement - utilise maintenant le chargement séquentiel
 */
export async function ultraFastAutoLoad(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  try {
    return await sequentialLoadSeasons(animeId, animeYear);
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
 * Version ultra-rapide pour multiple animes avec protection 403
 */
export async function ultraFastEnrichMultiple(animes: Anime[]): Promise<Anime[]> {
  const enrichedAnimes: Anime[] = [];
  
  const batchSize = SPEED_CONFIG.batchSize;
  for (let i = 0; i < animes.length; i += batchSize) {
    const batch = animes.slice(i, i + batchSize);
    
    const batchPromises = batch.map(anime => ultraFastEnrichAnime(anime));
    const enrichedBatch = await Promise.all(batchPromises);
    
    enrichedAnimes.push(...enrichedBatch);
    
    // Délai important entre les batches pour éviter 403
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
 * Parse le contenu d'un fichier d'épisodes JavaScript et extrait les IDs Sibnet et Sendvid
 */
function parseEpisodeFileContent(content: string): { sibnetIds: string[], sendvidIds: string[] } {
  try {
    // Trouve le tableau dans le fichier JavaScript
    const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) {
      return { sibnetIds: [], sendvidIds: [] };
    }

    const arrayContent = arrayMatch[1];
    
    // Extrait toutes les URLs
    const urlMatches = arrayContent.match(/'([^']+)'/g);
    if (!urlMatches) {
      return { sibnetIds: [], sendvidIds: [] };
    }

    // Extrait les IDs Sibnet et Sendvid de chaque URL
    const sibnetIds: string[] = [];
    const sendvidIds: string[] = [];
    
    urlMatches.forEach(urlWithQuotes => {
      const url = urlWithQuotes.slice(1, -1); // Retire les guillemets
      
      // Détecter Sibnet
      const sibnetMatch = url.match(/videoid=(\d+)/);
      if (sibnetMatch) {
        sibnetIds.push(sibnetMatch[1]);
      }
      
      // Détecter Sendvid
      const sendvidMatch = url.match(/sendvid\.com\/embed\/([a-zA-Z0-9]+)/);
      if (sendvidMatch) {
        sendvidIds.push(sendvidMatch[1]);
        console.log(`🎯 Sendvid détecté: ${sendvidMatch[1]} (URL: ${url})`);
      }
    });

    return { sibnetIds, sendvidIds };
  } catch (error) {
    console.error('Erreur lors du parsing du fichier:', error);
    return { sibnetIds: [], sendvidIds: [] };
  }
}

/**
 * Charge un fichier d'épisodes depuis le serveur web avec support Sendvid
 * Essaie d'abord dans anime_episodes_js, puis dans anime_episodes_js_2
 */
async function loadEpisodeFile(filePath: string): Promise<{ sibnetIds: string[], sendvidIds: string[] }> {
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  if (typeof window === 'undefined' && !process.env.VERCEL) {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    for (const folder of folders) {
      const fullPath = path.join(process.cwd(), 'public', folder, filePath);
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        const result = parseEpisodeFileContent(content);
        if (result.sibnetIds.length > 0 || result.sendvidIds.length > 0) {
          return result;
        }
      } catch (e) {
        continue;
      }
    }
    return { sibnetIds: [], sendvidIds: [] };
  }

  const baseUrl = getBaseUrl();
  for (const folder of folders) {
    try {
      // Construire l'URL pour accéder au fichier depuis le dossier public
      const url = `${baseUrl}/${folder}/${filePath}`;

      
      // Logs désactivés pour la performance
      
      const response = await fetch(url);
      
      if (!response.ok) {
        continue; // Essayer le dossier suivant
      }
      
      const content = await response.text();
      
      const result = parseEpisodeFileContent(content);
      
      return result; // ARRÊT immédiat - pas besoin de chercher ailleurs
    } catch (error) {
      // Logs d'erreur désactivés pour la performance
      continue; // Essayer le dossier suivant
    }
  }
  
  // Si aucun dossier n'a fourni le fichier - log désactivé pour la performance
  return { sibnetIds: [], sendvidIds: [] };
}

/**
 * Charge toutes les saisons disponibles pour un anime
 */
async function loadAllSeasonsForAnime(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  // Utiliser directement l'ID de l'anime comme nom de dossier (système automatique)
  const actualFolderName = animeId;
  
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
    // Films (différentes variantes de noms)
    {
      folder: 'Film',
      seasonNumber: 'Film',
      title: 'Film'
    },
    {
      folder: 'film',
      seasonNumber: 'Film',
      title: 'Film'
    },
    {
      folder: 'movie',
      seasonNumber: 'Film',
      title: 'Film'
    },
    {
      folder: 'Movie',
      seasonNumber: 'Film',
      title: 'Film'
    },
    {
      folder: 'films',
      seasonNumber: 'Film',
      title: 'Film'
    },
    {
      folder: 'Films',
      seasonNumber: 'Film',
      title: 'Film'
    }
  ];
  
  for (const pattern of seasonPatterns) {
    const vostfrPath = `${actualFolderName}/${pattern.folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${pattern.folder}/episodes_vf.js`;
    
    const [vostfrResult, vfResult] = await Promise.all([
      loadEpisodeFile(vostfrPath),
      loadEpisodeFile(vfPath)
    ]);
    
    // Si aucun fichier trouvé pour ce pattern, continuer avec le suivant
    if (vostfrResult.sibnetIds.length === 0 && vostfrResult.sendvidIds.length === 0 && 
        vfResult.sibnetIds.length === 0 && vfResult.sendvidIds.length === 0) {
      continue;
    }
    
    // Créer les épisodes en combinant VOSTFR et VF, Sibnet et Sendvid
    const maxEpisodes = Math.max(
      vostfrResult.sibnetIds.length + vostfrResult.sendvidIds.length,
      vfResult.sibnetIds.length + vfResult.sendvidIds.length
    );
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: pattern.seasonNumber === 'Film' ? pattern.title : `Épisode ${i + 1}`,
      };
      
      // Ajouter les IDs Sibnet
      if (vostfrResult.sibnetIds[i]) {
        episode.sibnetVostfrId = vostfrResult.sibnetIds[i];
      }
      
      if (vfResult.sibnetIds[i]) {
        episode.sibnetVfId = vfResult.sibnetIds[i];
      }
      
      // Ajouter les IDs Sendvid
      if (vostfrResult.sendvidIds[i]) {
        episode.sendvidId = vostfrResult.sendvidIds[i];
      }
      
      if (vfResult.sendvidIds[i]) {
        episode.sendvidVfId = vfResult.sendvidIds[i];
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
  // Logs désactivés pour la performance
  
  try {
    const seasons = await loadAllSeasonsForAnime(animeId, animeYear);
    
    if (seasons.length > 0) {
      return seasons;
    } else {
      return [];
    }
  } catch (error) {
    // Log d'erreur désactivé pour la performance
    return [];
  }
}

/**
 * Enrichit un anime avec les épisodes auto-chargés, en gardant les saisons existantes
 */
export async function enrichAnimeWithRealEpisodes(anime: Anime): Promise<Anime> {
  // Vérifier le cache d'abord
  const cached = enrichedAnimeCache.get(anime.id);
  if (cached && (Date.now() - cached.timestamp) < SPEED_CONFIG.cacheTimeout) {
    return cached.anime;
  }
  
  // Si l'anime a déjà des saisons ET des épisodes, on les garde
  if (anime.seasons && anime.seasons.length > 0 && anime.seasons[0].episodes.length > 0) {
    // Mettre en cache et retourner
    enrichedAnimeCache.set(anime.id, { anime, timestamp: Date.now() });
    return anime;
  }
  
  // Essayer l'auto-chargement avec l'année de l'anime
  const autoSeasons = await autoLoadEpisodes(anime.id, anime.year);
  
  if (autoSeasons.length > 0) {
    const enrichedAnime = {
      ...anime,
      seasons: autoSeasons
    };
    // Mettre en cache
    enrichedAnimeCache.set(anime.id, { anime: enrichedAnime, timestamp: Date.now() });
    return enrichedAnime;
  }
  
  // Si échec, garder la structure existante et mettre en cache
  enrichedAnimeCache.set(anime.id, { anime, timestamp: Date.now() });
  return anime;
}

/**
 * Version batch pour enrichir plusieurs animes
 */
export async function enrichMultipleAnimes(animes: Anime[]): Promise<Anime[]> {
  // Log désactivé pour la performance
  
  const enrichedAnimes: Anime[] = [];
  
  // Traiter par petits groupes pour éviter de surcharger le serveur
  const batchSize = 1; // Réduit pour éviter surcharge
  for (let i = 0; i < animes.length; i += batchSize) {
    const batch = animes.slice(i, i + batchSize);
    
    const batchPromises = batch.map(anime => enrichAnimeWithRealEpisodes(anime));
    const enrichedBatch = await Promise.all(batchPromises);
    
    enrichedAnimes.push(...enrichedBatch);
    
    // Petite pause entre les batches - réduite
    if (i + batchSize < animes.length) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  // Log désactivé pour la performance
  return enrichedAnimes;
}

/**
 * Vérifie si des épisodes sont disponibles pour un anime donné
 * Vérifie dans les deux dossiers : anime_episodes_js et anime_episodes_js_2
 */
export async function checkEpisodesAvailability(animeId: string): Promise<boolean> {
  // Utiliser directement l'ID de l'anime comme nom de dossier (système automatique)
  const actualFolderName = animeId;
  
  // Patterns de dossiers à tester (mêmes que dans loadAllSeasonsForAnime)
  const testPaths = [
    `${actualFolderName}/saison1/episodes_vostfr.js`,
    `${actualFolderName}/saison1hs/episodes_vostfr.js`,
    `${actualFolderName}/Film/episodes_vostfr.js`,
    `${actualFolderName}/film/episodes_vostfr.js`,
    `${actualFolderName}/movie/episodes_vostfr.js`,
    `${actualFolderName}/Movie/episodes_vostfr.js`,
    `${actualFolderName}/films/episodes_vostfr.js`,
    `${actualFolderName}/Films/episodes_vostfr.js`
  ];
  
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  try {
    if (typeof window === 'undefined' && !process.env.VERCEL) {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Tester chaque pattern dans chaque dossier en parallèle (filesystem)
      const results = await Promise.all(
        folders.flatMap(folder =>
          testPaths.map(async (testPath) => {
            const fullPath = path.join(process.cwd(), 'public', folder, testPath);
            try {
              await fs.access(fullPath);
              return true;
            } catch {
              return false;
            }
          })
        )
      );
      return results.some(result => result);
    }

    // Tester chaque pattern dans chaque dossier en parallèle (client ou Vercel)
    const baseUrl = getBaseUrl();
    const results = await Promise.all(
      folders.flatMap(folder =>
        testPaths.map(async (testPath) => {
          const url = `${baseUrl}/${folder}/${testPath}`;
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