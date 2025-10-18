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
    
    console.log('Tentative de contournement du blocage afterdark...');
    
    // Stratégie 1: Utiliser un proxy externe
    const proxyServices = [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    let response;
    let lastError;
    
    // Essayer avec les services de proxy
    for (let i = 0; i < proxyServices.length; i++) {
      try {
        const proxyUrl = proxyServices[i] + encodeURIComponent(url);
        console.log(`Tentative proxy ${i + 1}: ${proxyServices[i]}`);
        
        response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          signal: AbortSignal.timeout(30000),
          redirect: 'follow'
        });
        
        if (response.ok) {
          console.log(`Succès avec le proxy ${i + 1}`);
          break;
        } else {
          console.log(`Échec proxy ${i + 1}: ${response.status} ${response.statusText}`);
          lastError = response;
        }
      } catch (error) {
        console.log(`Erreur proxy ${i + 1}:`, error);
        lastError = error;
      }
    }
    
    // Si les proxies externes échouent, essayer une requête directe avec des headers différents
    if (!response || !response.ok) {
      console.log('Tentative de requête directe avec headers modifiés...');
      
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0'
          },
          signal: AbortSignal.timeout(30000),
          redirect: 'follow'
        });
        
        if (response.ok) {
          console.log('Succès avec User-Agent Googlebot');
        } else {
          lastError = response;
        }
      } catch (error) {
        console.log('Erreur avec User-Agent Googlebot:', error);
        lastError = error;
      }
    }
    
    if (!response || !response.ok) {
      response = lastError;
    }
    
    if (!response.ok) {
      console.error(`Afterdark bypass error: ${response.status} ${response.statusText} for URL: ${url}`);
      console.error(`Response headers:`, Object.fromEntries(response.headers.entries()));
      
      return NextResponse.json(
        { 
          error: `Failed to fetch: ${response.status} ${response.statusText}`,
          url: url,
          status: response.status,
          statusText: response.statusText,
          message: 'Afterdark servers are blocking requests from Vercel/Cloudflare'
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
            return `/api/proxy/afterdark-bypass?url=${encodeURIComponent(line)}`;
          }
          
          // Construire l'URL absolue pour les chemins relatifs
          const absoluteUrl = new URL(line, baseUrl).toString();
          return `/api/proxy/afterdark-bypass?url=${encodeURIComponent(absoluteUrl)}`;
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
    console.error('Afterdark bypass error:', error);
    
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
