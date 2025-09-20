import { NextRequest, NextResponse } from 'next/server';
import { GITHUB_CONFIG, encodeBase64, decodeBase64, isGitHubConfigured, getConfigErrors } from '@/lib/github-config';

interface GitHubFileResponse {
  content: string;
  sha: string;
  path: string;
}

// Fonction pour extraire les épisodes d'un fichier JS
function extractEpisodesFromJS(content: string): string[] {
  try {
    const match = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\]/);
    if (match) {
      const arrayContent = match[1];
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
function writeEpisodesToJS(episodes: string[], fileName: string): string {
  const varName = fileName.includes('vf') && !fileName.includes('vostfr') ? 'eps1vf' : 'eps1';
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
  return content;
}

// Fonction pour récupérer un fichier depuis GitHub
async function getGitHubFile(path: string): Promise<GitHubFileResponse | null> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OkaStream-Admin'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Fichier n'existe pas
      }
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      content: decodeBase64(data.content),
      sha: data.sha,
      path: data.path
    };
  } catch (error) {
    console.error('Erreur récupération fichier GitHub:', error);
    return null;
  }
}

// Fonction pour mettre à jour un fichier sur GitHub
async function updateGitHubFile(path: string, content: string, sha?: string): Promise<boolean> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
    
    const payload = {
      message: `🎬 Ajout épisode via panel admin - ${new Date().toISOString()}`,
      content: encodeBase64(content),
      branch: GITHUB_CONFIG.branch,
      ...(sha && { sha }) // Inclure le SHA si le fichier existe
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'OkaStream-Admin'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur GitHub API:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur mise à jour GitHub:', error);
    return false;
  }
}

// POST - Ajouter un épisode directement sur GitHub
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

    // Vérifier la configuration GitHub
    if (!isGitHubConfigured()) {
      const errors = getConfigErrors();
      return NextResponse.json({ 
        error: 'Configuration GitHub incomplète',
        details: errors.join(', '),
        note: 'Vérifiez que toutes les variables GitHub sont configurées',
        config: {
          token: GITHUB_CONFIG.token ? '✅ Configuré' : '❌ Manquant',
          owner: GITHUB_CONFIG.owner || '❌ Manquant',
          repo: GITHUB_CONFIG.repo || '❌ Manquant',
          branch: GITHUB_CONFIG.branch
        }
      }, { status: 500 });
    }

    // Construire le chemin du fichier
    const fileName = language === 'vf' ? 'episodes_vf.js' : 'episodes_vostfr.js';
    const filePath = `public/anime_episodes_js/${animeId}/${season}/${fileName}`;
    
    console.log(`🔍 Récupération fichier GitHub: ${filePath}`);

    // Récupérer le fichier existant depuis GitHub
    const existingFile = await getGitHubFile(filePath);
    
    let existingEpisodes: string[] = [];
    let fileSha: string | undefined;

    if (existingFile) {
      console.log(`📖 Fichier trouvé, extraction des épisodes existants`);
      existingEpisodes = extractEpisodesFromJS(existingFile.content);
      fileSha = existingFile.sha;
    } else {
      console.log(`🆕 Nouveau fichier à créer`);
    }

    // Ajouter le nouvel épisode
    existingEpisodes.push(episodeUrl);
    console.log(`➕ Ajout épisode: ${episodeUrl} (Total: ${existingEpisodes.length})`);

    // Générer le nouveau contenu
    const newContent = writeEpisodesToJS(existingEpisodes, fileName);

    // Mettre à jour sur GitHub
    console.log(`💾 Mise à jour sur GitHub...`);
    const success = await updateGitHubFile(filePath, newContent, fileSha);

    if (success) {
      console.log(`✅ Succès! Fichier mis à jour sur GitHub`);
      return NextResponse.json({ 
        success: true, 
        message: 'Épisode ajouté avec succès sur GitHub!',
        episodeCount: existingEpisodes.length,
        filePath: filePath,
        commitMessage: 'Fichier mis à jour automatiquement via panel admin'
      });
    } else {
      return NextResponse.json({ 
        error: 'Échec de la mise à jour GitHub',
        note: 'Vérifiez les permissions du token et la configuration'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erreur POST GitHub:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// GET - Tester la configuration GitHub
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const test = searchParams.get('test');
    
    if (test === 'config') {
      return NextResponse.json({
        configured: !!GITHUB_CONFIG.token && GITHUB_CONFIG.token !== '',
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        branch: GITHUB_CONFIG.branch,
        tokenStatus: GITHUB_CONFIG.token ? 'Configuré' : 'Manquant'
      });
    }

    return NextResponse.json({ 
      message: 'API GitHub prête',
      endpoints: ['POST /api/admin/github-episodes', 'GET /api/admin/github-episodes?test=config']
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
