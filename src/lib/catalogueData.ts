import { getAnimeById } from "./animeData";
import { Anime } from "./animeData";

// Cette fonction récupère le contenu anime par son ID pour la route /catalogue/[id]
export function getCatalogueItemById(id: string): Anime | undefined {
  // Récupérer depuis animeData
  const animeItem = getAnimeById(id);
  if (animeItem) {
    return animeItem;
  }
  
  // Si aucun élément n'est trouvé, retourner undefined
  return undefined;
}
