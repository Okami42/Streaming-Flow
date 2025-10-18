import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }
    
    // Vérifier que c'est bien un domaine afterdark
    if (!url.includes('afterdark.click')) {
      return NextResponse.json(
        { error: 'Only afterdark.click URLs are allowed' },
        { status: 403 }
      );
    }
    
    // Essayer plusieurs stratégies pour contourner le blocage
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0'
    ];
    
    const referers = [
      'https://proxy.afterdark.click/',
      'https://afterdark.click/',
      'https://www.afterdark.click/',
      'https://stream.afterdark.click/'
    ];
    
    let response: Response | undefined;
    let lastError: Response | Error | undefined;
    
    // Essayer avec différents User-Agents et Referers
    for (let i = 0; i < userAgents.length; i++) {
      try {
        console.log(`Tentative ${i + 1} avec User-Agent: ${userAgents[i].substring(0, 50)}...`);
        
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': userAgents[i],
            'Referer': referers[i % referers.length],
            'Origin': referers[i % referers.length].replace(/\/$/, ''),
            'Accept': '*/*',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            // Ajouter des headers pour masquer l'origine Vercel
            'X-Forwarded-For': '127.0.0.1',
            'X-Real-IP': '127.0.0.1',
            'CF-Connecting-IP': '127.0.0.1'
          },
          signal: AbortSignal.timeout(30000),
          redirect: 'follow'
        });
        
        if (response.ok) {
          console.log(`Succès avec la tentative ${i + 1}`);
          break;
        } else {
          console.log(`Échec tentative ${i + 1}: ${response.status} ${response.statusText}`);
          lastError = response;
        }
      } catch (error) {
        console.log(`Erreur tentative ${i + 1}:`, error);
        lastError = error instanceof Error ? error : new Error('Unknown error');
      }
    }
    
    if (!response || !response.ok) {
      response = lastError as Response;
    }
    
    // Vérifier que response est bien une Response
    if (!response || !(response instanceof Response)) {
      return NextResponse.json(
        { 
          error: 'No valid response received',
          url: url,
          message: 'All proxy attempts failed'
        },
        { status: 502 }
      );
    }
    
    if (!response.ok) {
      console.error(`Afterdark proxy error: ${response.status} ${response.statusText} for URL: ${url}`);
      console.error(`Response headers:`, Object.fromEntries(response.headers.entries()));
      
      // Retourner une réponse plus détaillée pour le debug
      return NextResponse.json(
        { 
          error: `Failed to fetch: ${response.status} ${response.statusText}`,
          url: url,
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }
    
    const contentType = response.headers.get('content-type') || 'application/vnd.apple.mpegurl';
    const data = await response.arrayBuffer();
    
    // Si c'est un fichier m3u8, traiter les URLs
    if (contentType.includes('mpegurl') || url.endsWith('.m3u8')) {
      const content = new TextDecoder().decode(data);
      
      // Déterminer l'URL de base
      const baseUrl = new URL(url);
      const pathParts = baseUrl.pathname.split('/');
      pathParts.pop();
      baseUrl.pathname = pathParts.join('/') + '/';
      
      // Traiter les lignes du fichier m3u8
      const lines = content.split('\n');
      const processedLines = lines.map(line => {
        if (line.trim() === '' || line.startsWith('#')) {
          return line;
        }
        
        // Traiter les segments .ts et sous-playlists .m3u8
        if (line.includes('.ts') || line.includes('.m3u8')) {
          // Si c'est déjà une URL absolue
          if (line.startsWith('http://') || line.startsWith('https://')) {
            return `/api/proxy/afterdark?url=${encodeURIComponent(line)}`;
          }
          
          // Construire l'URL absolue pour les chemins relatifs
          const absoluteUrl = new URL(line, baseUrl).toString();
          return `/api/proxy/afterdark?url=${encodeURIComponent(absoluteUrl)}`;
        }
        
        return line;
      });
      
      const modifiedContent = processedLines.join('\n');
      
      return new NextResponse(modifiedContent, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Cache-Control': 'public, max-age=60'
        }
      });
    }
    
    // Pour les segments .ts
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Afterdark proxy error:', error);
    
    // Gestion spécifique des erreurs de timeout
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - the server took too long to respond' },
        { status: 408 }
      );
    }
    
    // Gestion des erreurs de réseau
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error - unable to connect to the server' },
        { status: 502 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred', 
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    );
  }
}

// Gérer les requêtes OPTIONS pour CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    }
  });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

