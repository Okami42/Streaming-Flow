import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ajoute un proxy aux URLs m3u8 qui nécessitent un contournement CORS
 * @param url L'URL du flux m3u8
 * @returns L'URL proxifiée ou l'URL originale si elle n'a pas besoin de proxy
 */
export function getProxiedStreamUrl(url: string): string {
  // Liste des domaines qui nécessitent un proxy pour contourner les restrictions CORS
  const domainsNeedingProxy = [
    'animedigitalnetwork.fr', 
    'streaming23.animedigitalnetwork.fr',
    'streaming22.animedigitalnetwork.fr', 
    'streaming21.animedigitalnetwork.fr',
    'streaming20.animedigitalnetwork.fr',
    'streaming19.animedigitalnetwork.fr'
  ];
  
  // Vérifier si l'URL contient l'un des domaines nécessitant un proxy
  const needsProxy = domainsNeedingProxy.some(domain => url.includes(domain));
  
  // Si l'URL a besoin d'un proxy et est un fichier m3u8, ajouter le proxy
  if (needsProxy && url.includes('.m3u8')) {
    // Utiliser le proxy edge pour de meilleures performances
    return `/api/proxy/edge?url=${encodeURIComponent(url)}`;
  }
  
  // Sinon, retourner l'URL originale
  return url;
}
