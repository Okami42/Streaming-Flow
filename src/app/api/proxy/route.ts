import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'URL à proxifier depuis les paramètres de requête
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }
    
    // Vérification de l'URL (pour la sécurité)
    try {
      const parsedUrl = new URL(url);
      // Autoriser uniquement les domaines approuvés
      const allowedDomains = [
        'animedigitalnetwork.fr',
        'streaming23.animedigitalnetwork.fr',
        'streaming22.animedigitalnetwork.fr',
        'streaming21.animedigitalnetwork.fr',
        'streaming20.animedigitalnetwork.fr',
        'streaming19.animedigitalnetwork.fr',
        'test-streams.mux.dev',
        'bitdash-a.akamaihd.net'
      ];
      
      if (!allowedDomains.some(domain => parsedUrl.hostname.endsWith(domain))) {
        return NextResponse.json(
          { error: 'Domain not allowed' },
          { status: 403 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }
    
    // Récupérer le contenu depuis l'URL cible
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://animedigitalnetwork.fr/',
        'Origin': 'https://animedigitalnetwork.fr'
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Obtenir le type de contenu
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Récupérer le contenu brut
    const data = await response.arrayBuffer();
    
    // Si c'est un fichier m3u8, nous devons le traiter pour corriger les URLs relatives
    if (contentType.includes('application/vnd.apple.mpegurl') || contentType.includes('application/x-mpegurl') || url.endsWith('.m3u8')) {
      const content = new TextDecoder().decode(data);
      
      // Déterminer l'URL de base pour les chemins relatifs
      const baseUrl = new URL(url);
      const pathParts = baseUrl.pathname.split('/');
      pathParts.pop(); // Enlever le dernier segment (nom du fichier)
      baseUrl.pathname = pathParts.join('/') + '/';
      
      // Traiter chaque ligne du fichier m3u8
      const lines = content.split('\n');
      const processedLines = lines.map(line => {
        // Ignorer les lignes de commentaires ou vides
        if (line.trim() === '' || line.startsWith('#')) {
          return line;
        }
        
        // Traiter seulement les lignes avec des noms de fichiers (segments .ts ou sous-playlists .m3u8)
        if (line.includes('.ts') || line.includes('.m3u8')) {
          // Si c'est déjà une URL absolue, ne pas la modifier
          if (line.startsWith('http://') || line.startsWith('https://')) {
            return `/api/proxy?url=${encodeURIComponent(line)}`;
          }
          
          // Construire l'URL absolue pour les chemins relatifs
          const absoluteUrl = new URL(line, baseUrl).toString();
          return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
        }
        
        return line;
      });
      
      // Reconstruire le contenu
      const modifiedContent = processedLines.join('\n');
      
      // Retourner le contenu modifié
      return new NextResponse(modifiedContent, {
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60'
        }
      });
    }
    
    // Pour les autres types de fichiers (segments .ts, etc.), retourner tel quel
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 