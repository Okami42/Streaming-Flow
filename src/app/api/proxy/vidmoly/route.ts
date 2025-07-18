import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }

  try {
    // Utiliser un User-Agent de navigateur pour éviter d'être détecté comme un bot
    const response = await fetch(`https://vidmoly.to/embed-${id}.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Referer': 'https://vidmoly.to/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Extraire l'URL de la source vidéo directe si possible
    let videoSource = '';
    const sourceMatch = html.match(/sources:\s*\[\s*{\s*file:\s*"([^"]+)"/);
    if (sourceMatch && sourceMatch[1]) {
      videoSource = sourceMatch[1];
    }
    
    // Si nous avons trouvé l'URL de la source vidéo, créer un lecteur HTML5 personnalisé
    if (videoSource) {
      const customPlayer = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lecteur vidéo OkAnime</title>
          <style>
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; }
            .video-container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
            video { width: 100%; height: 100%; }
            .error-message { color: white; text-align: center; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div class="video-container">
            <video controls autoplay playsinline>
              <source src="${videoSource}" type="video/mp4">
              <p class="error-message">Votre navigateur ne prend pas en charge la lecture vidéo HTML5.</p>
            </video>
          </div>
        </body>
        </html>
      `;
      
      return new NextResponse(customPlayer, {
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    // Si nous n'avons pas pu extraire l'URL de la source vidéo, retourner une page d'erreur
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Erreur de lecture</title>
        <style>
          body { background-color: #000; color: white; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .error-container { text-align: center; }
          .error-message { margin-bottom: 20px; }
          .retry-button { background-color: #e91e63; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
          .retry-button:hover { background-color: #c2185b; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-message">Impossible de charger la vidéo. Le serveur Vidmoly a peut-être bloqué la requête.</div>
          <button class="retry-button" onclick="window.location.reload()">Réessayer</button>
        </div>
      </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error: unknown) {
    console.error('Error proxying Vidmoly content:', error);
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Erreur de lecture</title>
        <style>
          body { background-color: #000; color: white; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .error-container { text-align: center; }
          .error-message { margin-bottom: 20px; }
          .retry-button { background-color: #e91e63; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
          .retry-button:hover { background-color: #c2185b; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-message">Erreur lors du chargement de la vidéo</div>
          <button class="retry-button" onclick="window.location.reload()">Réessayer</button>
        </div>
      </body>
      </html>
    `, { status: 500, headers: { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' } });
  }
}
