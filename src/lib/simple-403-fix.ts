/**
 * Solution SIMPLE pour éviter les erreurs 403 Forbidden
 */

// Compteur global de requêtes
let requestCount = 0;
let lastRequestTime = 0;

/**
 * Fonction fetch simple avec protection 403
 */
export async function simpleFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // Incrémenter le compteur
  requestCount++;
  
  // Délai simple si trop de requêtes rapides
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < 200 && requestCount > 3) {
    // Attendre un peu si on fait trop de requêtes
    const delay = Math.random() * 300 + 200; // 200-500ms
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  lastRequestTime = Date.now();
  
  // Headers basiques pour éviter la détection
  const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': '*/*',
    'Accept-Language': 'fr-FR,fr;q=0.9',
    ...options.headers
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders
    });
    
    // Si erreur 403, attendre et réessayer une fois
    if (response.status === 403) {
      console.log('⚠️ Erreur 403 détectée, nouvelle tentative...');
      
      // Attendre 2 secondes et réessayer
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
    }
    
    return response;
  } catch (error) {
    console.log('❌ Erreur de requête:', error);
    throw error;
  }
}

/**
 * Reset du compteur (à appeler périodiquement)
 */
export function resetRequestCounter() {
  requestCount = 0;
  lastRequestTime = 0;
}

// Reset automatique toutes les 30 secondes
if (typeof window !== 'undefined') {
  setInterval(resetRequestCounter, 30000);
} 