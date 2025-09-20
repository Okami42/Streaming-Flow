import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface AnimeEpisodeInfo {
  animeName: string;
  animeId: string;
  folder: string; // 'anime_episodes_js' ou 'anime_episodes_js_2'
  seasons: {
    [season: string]: {
      vf?: string[];
      vostfr?: string[];
    };
  };
}

// Fonction pour scanner tous les animes et leurs épisodes
function scanAllAnimes(): AnimeEpisodeInfo[] {
  const animes: AnimeEpisodeInfo[] = [];
  const basePaths = [
    path.join(process.cwd(), 'public', 'anime_episodes_js'),
    path.join(process.cwd(), 'public', 'anime_episodes_js_2')
  ];

  basePaths.forEach((basePath, index) => {
    const folderName = index === 0 ? 'anime_episodes_js' : 'anime_episodes_js_2';
    
    if (fs.existsSync(basePath)) {
      const animeFolders = fs.readdirSync(basePath);
      
      animeFolders.forEach(animeFolder => {
        const animePath = path.join(basePath, animeFolder);
        if (fs.statSync(animePath).isDirectory()) {
          const animeInfo: AnimeEpisodeInfo = {
            animeName: animeFolder.replace(/-/g, ' '),
            animeId: animeFolder,
            folder: folderName,
            seasons: {}
          };

          // Scanner les saisons
          const seasonFolders = fs.readdirSync(animePath);
          seasonFolders.forEach(seasonFolder => {
            if (fs.statSync(path.join(animePath, seasonFolder)).isDirectory()) {
              const seasonPath = path.join(animePath, seasonFolder);
              const episodeFiles = fs.readdirSync(seasonPath);
              
              animeInfo.seasons[seasonFolder] = {};

              episodeFiles.forEach(file => {
                if (file.endsWith('.js')) {
                  const filePath = path.join(seasonPath, file);
                  try {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const episodes = extractEpisodesFromJS(content);
                    
                    if (file.includes('vf') && !file.includes('vostfr')) {
                      animeInfo.seasons[seasonFolder].vf = episodes;
                    } else if (file.includes('vostfr')) {
                      animeInfo.seasons[seasonFolder].vostfr = episodes;
                    }
                  } catch (error) {
                    console.error(`Erreur lecture ${filePath}:`, error);
                  }
                }
              });
            }
          });

          animes.push(animeInfo);
        }
      });
    }
  });

  return animes;
}

// Fonction pour extraire les épisodes d'un fichier JS
function extractEpisodesFromJS(content: string): string[] {
  try {
    // Extraire le contenu du tableau JavaScript
    const match = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\]/);
    if (match) {
      const arrayContent = match[1];
      // Extraire les URLs entre guillemets
      const urls = arrayContent.match(/'([^']+)'/g);
      if (urls) {
        return urls.map(url => url.replace(/'/g, ''));
      }
    }
    return [];
  } catch (error) {
    console.error('Erreur extraction épisodes:', error);
    return [];
  }
}

// Fonction pour écrire les épisodes dans un fichier JS
function writeEpisodesToJS(episodes: string[], filePath: string): void {
  const varName = path.basename(filePath, '.js').includes('vf') ? 'eps1vf' : 'eps1';
  let content = `var ${varName} = [\n\n`;
  
  episodes.forEach((episode, index) => {
    content += `'${episode}'`;
    if (index < episodes.length - 1) {
      content += ',\n\n';
    } else {
      content += '\n\n';
    }
  });
  
  content += '];';
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

// GET - Récupérer tous les animes avec leurs épisodes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animeId = searchParams.get('animeId');
    
    const allAnimes = scanAllAnimes();
    
    if (animeId) {
      const anime = allAnimes.find(a => a.animeId === animeId);
      return NextResponse.json(anime || null);
    }
    
    return NextResponse.json(allAnimes);
  } catch (error) {
    console.error('Erreur GET:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Ajouter un épisode (stockage local en attendant GitHub)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, season, language, episodeUrl, adminPassword } = body;
    
    // Vérification du mot de passe admin
    if (adminPassword !== 'okami2025') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }
    
    if (!animeId || !season || !language || !episodeUrl) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Pour l'instant, on va stocker dans un fichier local temporaire
    // TODO: Implémenter l'API GitHub pour modifier les vrais fichiers
    
    const tempFile = path.join(process.cwd(), 'data', 'temp-episodes.json');
    
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(tempFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Lire les épisodes temporaires existants
    let tempEpisodes: any = {};
    if (fs.existsSync(tempFile)) {
      const content = fs.readFileSync(tempFile, 'utf-8');
      tempEpisodes = JSON.parse(content);
    }

    // Structure: tempEpisodes[animeId][season][language] = [urls...]
    if (!tempEpisodes[animeId]) tempEpisodes[animeId] = {};
    if (!tempEpisodes[animeId][season]) tempEpisodes[animeId][season] = {};
    if (!tempEpisodes[animeId][season][language]) tempEpisodes[animeId][season][language] = [];

    // Ajouter le nouvel épisode
    tempEpisodes[animeId][season][language].push({
      url: episodeUrl,
      addedAt: new Date().toISOString(),
      addedBy: 'admin'
    });

    // Sauvegarder
    fs.writeFileSync(tempFile, JSON.stringify(tempEpisodes, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Épisode ajouté temporairement (en attente sync GitHub)',
      episodeCount: tempEpisodes[animeId][season][language].length,
      note: 'Les fichiers GitHub ne peuvent pas être modifiés directement depuis le serveur'
    });
  } catch (error) {
    console.error('Erreur POST:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur',
      note: 'Les fichiers d\'épisodes sont sur GitHub et ne peuvent pas être modifiés directement'
    }, { status: 500 });
  }
}

// DELETE - Supprimer un épisode
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, season, language, episodeIndex, adminPassword } = body;
    
    // Vérification du mot de passe admin
    if (adminPassword !== 'okami2025') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }
    
    if (animeId === undefined || !season || !language || episodeIndex === undefined) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Trouver l'anime
    const allAnimes = scanAllAnimes();
    const anime = allAnimes.find(a => a.animeId === animeId);
    
    if (!anime) {
      return NextResponse.json({ error: 'Anime non trouvé' }, { status: 404 });
    }

    // Construire le chemin du fichier
    const fileName = language === 'vf' ? 'episodes_vf.js' : 'episodes_vostfr.js';
    const filePath = path.join(
      process.cwd(), 
      'public', 
      anime.folder, 
      animeId, 
      season, 
      fileName
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 });
    }

    // Lire les épisodes existants
    const content = fs.readFileSync(filePath, 'utf-8');
    const existingEpisodes = extractEpisodesFromJS(content);

    // Supprimer l'épisode
    if (episodeIndex >= 0 && episodeIndex < existingEpisodes.length) {
      existingEpisodes.splice(episodeIndex, 1);
      
      // Écrire le fichier mis à jour
      writeEpisodesToJS(existingEpisodes, filePath);
      
      return NextResponse.json({ 
        success: true, 
        episodeCount: existingEpisodes.length 
      });
    } else {
      return NextResponse.json({ error: 'Index d\'épisode invalide' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur DELETE:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
