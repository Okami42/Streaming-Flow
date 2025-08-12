import { getAnimeById } from "./animeData";
import { getSeriesById } from "./seriesData";
import { Content } from "./types";
import { Anime } from "./animeData";

// Cette fonction récupère le contenu (anime ou film/série) par son ID pour la route /catalogue/[id]
export function getCatalogueItemById(id: string): Anime | Content | undefined {
  // D'abord, essayer de récupérer depuis animeData
  const animeItem = getAnimeById(id);
  if (animeItem) {
    return animeItem;
  }
  
  // Si ce n'est pas un anime, essayer de récupérer depuis seriesData
  const seriesItem = getSeriesById(id);
  if (seriesItem) {
    return seriesItem;
  }
  
  // Si aucun élément n'est trouvé, retourner undefined
  return undefined;
} 
