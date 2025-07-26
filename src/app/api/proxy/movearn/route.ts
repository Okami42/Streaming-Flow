import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'URL du paramètre de requête
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    
    if (!url) {
      return new NextResponse('URL parameter is required', { status: 400 });
    }
    
    // Récupérer le contenu de movearnpre
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://movearnpre.com/',
      },
    });
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch content', { status: response.status });
    }
    
    // Récupérer le contenu HTML
    let html = await response.text();
    
    // Extraire le lien de la vidéo (si présent)
    let videoSrc = '';
    const videoMatch = html.match(/<video[^>]*src=["']([^"']+)["'][^>]*>/i) || 
                      html.match(/source[^>]*src=["']([^"']+)["'][^>]*>/i);
    
    if (videoMatch && videoMatch[1]) {
      videoSrc = videoMatch[1];
      if (!videoSrc.startsWith('http')) {
        // Construire l'URL complète si c'est une URL relative
        const baseUrl = new URL(url);
        videoSrc = new URL(videoSrc, baseUrl.origin).toString();
      }
    }
    
    // Créer une page HTML sécurisée qui affiche uniquement la vidéo
    const safeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lecteur Vidéo Sécurisé</title>
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: black; }
          .video-container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
          video { max-width: 100%; max-height: 100%; }
          .play-button { 
            position: absolute; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
            width: 80px; 
            height: 80px; 
            background-color: rgba(0, 0, 255, 0.7); 
            border-radius: 50%; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            cursor: pointer;
          }
          .play-icon {
            width: 0;
            height: 0;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 30px solid white;
            margin-left: 8px;
          }
          .hidden { display: none; }
        </style>
      </head>
      <body>
        <div class="video-container">
          ${videoSrc ? 
            `<video id="video" controls>
               <source src="${videoSrc}" type="video/mp4">
               Votre navigateur ne supporte pas la lecture de vidéos.
             </video>
             <div id="playButton" class="play-button">
               <div class="play-icon"></div>
             </div>` 
            : 
            `<div style="color: white; text-align: center;">
               Impossible de trouver la vidéo. Veuillez réessayer.
             </div>`
          }
        </div>
        
        <script>
          // Script simple pour gérer la lecture
          document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('video');
            const playButton = document.getElementById('playButton');
            
            if (video && playButton) {
              // Afficher le bouton play au départ
              playButton.classList.remove('hidden');
              
              // Gérer le clic sur le bouton play
              playButton.addEventListener('click', function() {
                video.play();
                playButton.classList.add('hidden');
              });
              
              // Afficher le bouton play quand la vidéo est en pause
              video.addEventListener('pause', function() {
                playButton.classList.remove('hidden');
              });
              
              // Cacher le bouton play quand la vidéo joue
              video.addEventListener('play', function() {
                playButton.classList.add('hidden');
              });
            }
            
            // Bloquer toute tentative de navigation
            window.open = function() { return null; };
            history.pushState = function() {};
            history.replaceState = function() {};
            window.onbeforeunload = function() { return false; };
          });
        </script>
      </body>
      </html>
    `;
    
    // Retourner la page HTML sécurisée
    return new NextResponse(safeHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src * data:; media-src *; connect-src *;",
      },
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 