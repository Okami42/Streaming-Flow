import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Episode {
  id: string;
  number: number;
  title: string;
  url: string;
  season: number;
  dateAdded: string;
}

interface AnimeEpisodes {
  [animeId: string]: Episode[];
}

const EPISODES_FILE = path.join(process.cwd(), 'data', 'episodes.json');

// Fonction pour lire les épisodes
function readEpisodes(): AnimeEpisodes {
  try {
    if (fs.existsSync(EPISODES_FILE)) {
      const data = fs.readFileSync(EPISODES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Erreur lecture épisodes:', error);
    return {};
  }
}

// Fonction pour écrire les épisodes
function writeEpisodes(episodes: AnimeEpisodes): void {
  try {
    const dataDir = path.dirname(EPISODES_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(EPISODES_FILE, JSON.stringify(episodes, null, 2));
  } catch (error) {
    console.error('Erreur écriture épisodes:', error);
  }
}

// GET - Récupérer les épisodes d'un anime
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animeId = searchParams.get('animeId');
    
    const episodes = readEpisodes();
    
    if (animeId) {
      return NextResponse.json(episodes[animeId] || []);
    }
    
    return NextResponse.json(episodes);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Ajouter un épisode
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, episode, adminPassword } = body;
    
    // Vérification du mot de passe admin
    if (adminPassword !== 'okami2025') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }
    
    if (!animeId || !episode) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }
    
    const episodes = readEpisodes();
    
    if (!episodes[animeId]) {
      episodes[animeId] = [];
    }
    
    // Ajouter la date d'ajout
    const newEpisode: Episode = {
      ...episode,
      dateAdded: new Date().toISOString()
    };
    
    episodes[animeId].push(newEpisode);
    episodes[animeId].sort((a, b) => a.number - b.number);
    
    writeEpisodes(episodes);
    
    return NextResponse.json({ success: true, episode: newEpisode });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un épisode
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, episodeId, adminPassword } = body;
    
    // Vérification du mot de passe admin
    if (adminPassword !== 'okami2025') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }
    
    if (!animeId || !episodeId) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }
    
    const episodes = readEpisodes();
    
    if (episodes[animeId]) {
      episodes[animeId] = episodes[animeId].filter(ep => ep.id !== episodeId);
      writeEpisodes(episodes);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT - Modifier un épisode
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, episodeId, updatedEpisode, adminPassword } = body;
    
    // Vérification du mot de passe admin
    if (adminPassword !== 'okami2025') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }
    
    if (!animeId || !episodeId || !updatedEpisode) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }
    
    const episodes = readEpisodes();
    
    if (episodes[animeId]) {
      const episodeIndex = episodes[animeId].findIndex(ep => ep.id === episodeId);
      if (episodeIndex !== -1) {
        episodes[animeId][episodeIndex] = {
          ...updatedEpisode,
          dateAdded: episodes[animeId][episodeIndex].dateAdded // Garder la date originale
        };
        episodes[animeId].sort((a, b) => a.number - b.number);
        writeEpisodes(episodes);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
