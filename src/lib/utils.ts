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

/**
 * Extrait correctement l'ID d'une série à partir d'un ID complet
 * @param fullId L'ID complet (ex: "game-of-thrones-s1e1")
 * @returns L'ID de la série (ex: "game-of-thrones")
 */
export function extractSeriesId(fullId: string): string {
  // Supprimer les patterns d'épisode et de saison (ex: -s1e1, -e5)
  const cleanId = fullId.replace(/-s\d+e\d+$/, '').replace(/-e\d+$/, '');
  
  // Liste des séries et animes connus avec des tirets dans leur ID
  const knownItemsWithHyphens = [
    // Séries
    "game-of-thrones", 
    "breaking-bad", 
    "squid-game", 
    "stranger-things", 
    "the-boys", 
    "blade-runner-2049", 
    "adventure-time",
    "top-gun-maverick",
    "the-batman",
    "south-park",
    // Animes
    "solo-leveling",
    "solo-leveling-2",
    "demon-slayer",
    "jujutsu-kaisen",
    "kuroko-no-basket",
    "akudama-drive"
  ];
  
  // Vérifier d'abord si l'ID correspond à une série/anime connu avec des tirets
  const matchedItem = knownItemsWithHyphens.find(id => cleanId.startsWith(id));
  if (matchedItem) {
    return matchedItem;
  }
  
  // Sinon, utiliser la première partie de l'ID (avant le premier tiret)
  const parts = cleanId.split('-');
  return parts[0];
}
