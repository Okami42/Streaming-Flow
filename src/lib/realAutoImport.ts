import { Anime, AnimeEpisode, AnimeSeason } from './animeData';
import { simpleFetch } from './simple-403-fix';

// Configuration ultra-rapide pour l'auto-import
const SPEED_CONFIG = {
  enableCache: true,
  cacheTimeout: 1800000, // 30 minutes
  requestTimeout: 1500, // Réduit à 1.5 secondes
  batchSize: 3, // Réduit pour éviter la détection
  batchDelay: 300, // Délai entre batches
  maxRetries: 1, // Une seule tentative
  enableLogs: false
};

// Cache ultra-rapide en mémoire
const ultraCache = new Map<string, { data: string[], timestamp: number }>();

/**
 * Parse ultra-rapide des fichiers d'épisodes avec support Sendvid
 */
function fastParseEpisodeFile(content: string): { sibnetIds: string[], sendvidIds: string[] } {
  try {
    const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return { sibnetIds: [], sendvidIds: [] };

    const urlMatches = arrayMatch[1].match(/'([^']+)'/g);
    if (!urlMatches) return { sibnetIds: [], sendvidIds: [] };

    const sibnetIds: string[] = [];
    const sendvidIds: string[] = [];
    
    for (const urlWithQuotes of urlMatches) {
      const url = urlWithQuotes.slice(1, -1);
      
      // Détecter Sibnet
      const sibnetMatch = url.match(/videoid=(\d+)/);
      if (sibnetMatch) {
        sibnetIds.push(sibnetMatch[1]);
      }
      
      // Détecter Sendvid (format: https://sendvid.com/embed/XXXXXXXX)
      const sendvidMatch = url.match(/sendvid\.com\/embed\/([a-zA-Z0-9]+)/);
      if (sendvidMatch) {
        sendvidIds.push(sendvidMatch[1]);
        console.log(`🎯 Sendvid détecté: ${sendvidMatch[1]} (URL: ${url})`);
      }
    }

    return { sibnetIds, sendvidIds };
  } catch {
    return { sibnetIds: [], sendvidIds: [] };
  }
}

/**
 * Chargement ultra-rapide des fichiers d'épisodes avec protection 403 et support Sendvid
 */
async function ultraFastLoadEpisode(filePath: string): Promise<{ sibnetIds: string[], sendvidIds: string[] }> {
  const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
  
  // Cache ultra-rapide (noter que le cache doit maintenant gérer la nouvelle structure)
  if (SPEED_CONFIG.enableCache) {
    const cached = ultraCache.get(filePath);
    if (cached && (Date.now() - cached.timestamp) < SPEED_CONFIG.cacheTimeout) {
      // Pour la compatibilité avec l'ancien cache, traiter les données comme Sibnet uniquement
      if (Array.isArray(cached.data)) {
        return { sibnetIds: cached.data, sendvidIds: [] };
      }
    }
  }
  
  // Délai aléatoire simple pour éviter la détection
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
  for (const folder of folders) {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), SPEED_CONFIG.requestTimeout);
      
      const response = await simpleFetch(`/${folder}/${filePath}`, { 
        signal: controller.signal,
        headers: headers,
        method: 'GET'
      });
      
      if (!response.ok) continue;
      
      const content = await response.text();
      const result = fastParseEpisodeFile(content);
      
      if (result.sibnetIds.length > 0 || result.sendvidIds.length > 0) {
        // Cache ultra-rapide (stocker les IDs Sibnet pour compatibilité)
        if (SPEED_CONFIG.enableCache) {
          ultraCache.set(filePath, { data: result.sibnetIds, timestamp: Date.now() });
        }
        
        console.log(`✅ Trouvé dans ${folder} - arrêt de la recherche dans les autres dossiers`);
        return result; // ARRÊT immédiat - pas besoin de chercher ailleurs
      }
    } catch {
      continue; // Essayer le dossier suivant
    }
    
    // Petit délai entre les tentatives
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return { sibnetIds: [], sendvidIds: [] };
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
    
    if (vostfrResult.sibnetIds.length === 0 && vostfrResult.sendvidIds.length === 0 && 
        vfResult.sibnetIds.length === 0 && vfResult.sendvidIds.length === 0) return null;
    
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
      if (vostfrResult.sibnetIds[i]) episode.sibnetVostfrId = vostfrResult.sibnetIds[i];
      if (vfResult.sibnetIds[i]) episode.sibnetVfId = vfResult.sibnetIds[i];
      
      // Ajouter les IDs Sendvid
      if (vostfrResult.sendvidIds[i]) episode.sendvidId = vostfrResult.sendvidIds[i];
      if (vfResult.sendvidIds[i]) episode.sendvidVfId = vfResult.sendvidIds[i];
      
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
async function loadEpisodeFromSpecificFolder(filePath: string, folder: string): Promise<{ sibnetIds: string[], sendvidIds: string[] }> {
  try {
    const url = `/${folder}/${filePath}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const content = await response.text();
      const result = fastParseEpisodeFile(content);
      if (SPEED_CONFIG.enableLogs && (result.sibnetIds.length > 0 || result.sendvidIds.length > 0)) {
        console.log(`✅ Chargé depuis ${folder}: ${result.sibnetIds.length} Sibnet + ${result.sendvidIds.length} Sendvid`);
      }
      return result;
    }
  } catch (error) {
    if (SPEED_CONFIG.enableLogs) {
      console.log(`❌ Échec de chargement depuis ${folder}:`, error);
    }
  }
  
  return { sibnetIds: [], sendvidIds: [] };
}

/**
 * Chargement séquentiel optimisé des saisons (s'arrête quand plus de saisons trouvées)
 */
async function sequentialLoadSeasons(animeId: string, animeYear?: number): Promise<AnimeSeason[]> {
  // Utiliser directement l'ID de l'anime comme nom de dossier (système automatique)
  const actualFolderName = animeId;
  const seasons: AnimeSeason[] = [];
  
  if (SPEED_CONFIG.enableLogs) {
    console.log(`🔍 Chargement séquentiel pour ${animeId}...`);
  }
  
  // Chargement séquentiel des saisons (commence par saison 1, 2, 3...)
  let seasonNumber = 1;
  let foundInFolder: string | null = null; // Tracker dans quel dossier on a trouvé l'anime
  
  while (seasonNumber <= 50) { // Limite à 50 saisons max
    const folder = `saison${seasonNumber}`;
    const vostfrPath = `${actualFolderName}/${folder}/episodes_vostfr.js`;
    const vfPath = `${actualFolderName}/${folder}/episodes_vf.js`;
    
    if (SPEED_CONFIG.enableLogs) {
      console.log(`🔍 Test saison ${seasonNumber}...`);
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
      if (vostfrResult.sibnetIds.length > 0 || vostfrResult.sendvidIds.length > 0 ||
          vfResult.sibnetIds.length > 0 || vfResult.sendvidIds.length > 0) {
        
        // Tester quel dossier contient vraiment les fichiers
        try {
          const testUrl1 = `/anime_episodes_js/${vostfrPath}`;
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
          console.log(`📁 Anime trouvé dans ${foundInFolder} - les prochaines saisons seront cherchées uniquement ici`);
        }
      }
    }
    
    // Si aucun fichier trouvé pour cette saison, ARRÊTER immédiatement
    if (vostfrResult.sibnetIds.length === 0 && vostfrResult.sendvidIds.length === 0 && 
        vfResult.sibnetIds.length === 0 && vfResult.sendvidIds.length === 0) {
      if (SPEED_CONFIG.enableLogs) {
        console.log(`❌ Saison ${seasonNumber} non trouvée - ARRÊT de la recherche des saisons`);
      }
      break; // Arrêter immédiatement la recherche des saisons
    }
    
    // Créer les épisodes
    const maxEpisodes = Math.max(
      vostfrResult.sibnetIds.length + vostfrResult.sendvidIds.length,
      vfResult.sibnetIds.length + vfResult.sendvidIds.length
    );
    const episodes: AnimeEpisode[] = [];
    
    for (let i = 0; i < maxEpisodes; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: `Épisode ${i + 1}`,
      };
      
      if (vostfrResult.sibnetIds[i]) episode.sibnetVostfrId = vostfrResult.sibnetIds[i];
      if (vfResult.sibnetIds[i]) episode.sibnetVfId = vfResult.sibnetIds[i];
      if (vostfrResult.sendvidIds[i]) episode.sendvidId = vostfrResult.sendvidIds[i];
      if (vfResult.sendvidIds[i]) episode.sendvidVfId = vfResult.sendvidIds[i];
      
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
        console.log(`✅ Saison ${seasonNumber}: ${episodes.length} épisodes`);
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
  
  if (filmVostfr.sibnetIds.length > 0 || filmVostfr.sendvidIds.length > 0 || 
      filmVf.sibnetIds.length > 0 || filmVf.sendvidIds.length > 0) {
    
    const maxFilms = Math.max(
      filmVostfr.sibnetIds.length + filmVostfr.sendvidIds.length,
      filmVf.sibnetIds.length + filmVf.sendvidIds.length
    );
    
    const filmEpisodes: AnimeEpisode[] = [];
    for (let i = 0; i < maxFilms; i++) {
      const episode: AnimeEpisode = {
        number: i + 1,
        title: `Film ${i + 1}`,
      };
      
      if (filmVostfr.sibnetIds[i]) episode.sibnetVostfrId = filmVostfr.sibnetIds[i];
      if (filmVf.sibnetIds[i]) episode.sibnetVfId = filmVf.sibnetIds[i];
      if (filmVostfr.sendvidIds[i]) episode.sendvidId = filmVostfr.sendvidIds[i];
      if (filmVf.sendvidIds[i]) episode.sendvidVfId = filmVf.sendvidIds[i];
      
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
        console.log(`🎬 Films: ${filmEpisodes.length} film(s)`);
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
      
      const result = parseEpisodeFileContent(content);
      console.log(`🎯 IDs extraits de ${folder}: ${result.sibnetIds.length} Sibnet + ${result.sendvidIds.length} Sendvid`);
      console.log(`✅ Fichier trouvé dans ${folder} - arrêt de la recherche dans les autres dossiers`);
      
      return result; // ARRÊT immédiat - pas besoin de chercher ailleurs
    } catch (error) {
      console.error(`❌ Erreur lors du chargement de ${filePath} depuis ${folder}:`, error);
      continue; // Essayer le dossier suivant
    }
  }
  
  // Si aucun dossier n'a fourni le fichier
  console.log(`❌ Fichier ${filePath} introuvable dans tous les dossiers d'épisodes`);
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