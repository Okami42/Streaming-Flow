import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const url = searchParams.get('url');
  
  if (!id && !url) {
    return new NextResponse('ID or URL is required', { status: 400 });
  }

  try {
    // Construire l'URL à utiliser
    let videoUrl;
    if (url) {
      // Utiliser l'URL complète fournie
      videoUrl = url;
    } else {
      // Construire l'URL à partir de l'ID
      videoUrl = `https://vidmoly.to/embed-${id}.html`;
    }

    // S'assurer que l'URL utilise le domaine vidmoly.to pour la requête
    videoUrl = videoUrl.replace('vidmoly.net', 'vidmoly.to');
    
    // Utiliser un User-Agent de navigateur pour éviter d'être détecté comme un bot
    const response = await fetch(videoUrl, {
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
    
    // Récupérer le HTML de la page Vidmoly
    let html = await response.text();
    
    // Remplacer toutes les occurrences de vidmoly.net par vidmoly.to
    html = html.replace(/vidmoly\.net/g, 'vidmoly.to');
    
    // Remplacer les URLs absolues par des URLs relatives pour éviter les problèmes CORS
    html = html.replace(/(src|href)="\/([^"]+)"/g, '$1="https://vidmoly.to/$2"');
    
    // Ajouter des en-têtes pour permettre l'intégration dans une iframe
    const modifiedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' *;">
        ${html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || ''}
      </head>
      <body style="margin:0;padding:0;overflow:hidden;">
        ${html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] || html}
      </body>
      </html>
    `;
    
    return new NextResponse(modifiedHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors 'self' *",
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
