/**
 * Mapping des IDs d'animés vers les vrais noms des films
 * Ce fichier permet d'afficher les vrais titres des films au lieu de juste "Film"
 */

export const filmTitles: Record<string, Record<string, string>> = {
  // ID de l'animé -> { seasonNumber/episodeNumber: "Vrai nom du film" }
  
  // Demon Slayer - Kimetsu no Yaiba
  "demon-slayer": {
    "Film_1": "Le Train de l'Infini",
    "Film": "Le Train de l'Infini"
  },
  
  // Akira
  "akira": {
    "1": "Akira",
    "Film_1": "Akira"
  },
  
  // Your Name
  "your-name": {
    "1": "Your Name",
    "Film_1": "Your Name"
  },

  "re-zero": {
    "Film_1": "Memory Snow",
    "Film_2": "The Frozen Bond"
  },
  
  // My Hero Academia
  "my-hero-academia": {
    "Film_1": "Two Heroes",
    "Film_2": "Heroes Rising", 
    "Film_3": "World Heroes' Mission"
  },

  "le-voyage-de-chihiro": {
    "1": "Le Voyage de Chihiro",
    "Film_1": "Le Voyage de Chihiro"
  },
  
  // Dragon Ball
  "dragon-ball": {
    "Film_1": "Dragon Ball Z: La Bataille de Gods",
    "Film_2": "Dragon Ball Z: La Résurrection de F",
    "Film_3": "Dragon Ball Super: Broly"
  },
  
  // One Piece
  "one-piece": {
    "Film_1": "One Piece: Strong World",
    "Film_2": "One Piece: Z",
    "Film_3": "One Piece: Gold",
    "Film_4": "One Piece: Stampede",
    "Film_5": "One Piece: Red"
  },
  
  // ========== EXEMPLE POUR PLUSIEURS FILMS ==========
  
  // Exemple d'animé avec plusieurs films dans des saisons séparées
  "attack-on-titan": {
    "Film_1": "L'Attaque des Titans: Partie 1",
    "Film_2": "L'Attaque des Titans: Partie 2",
    "Film_3": "L'Attaque des Titans: Finale"
  },
  
  // Exemple d'animé avec plusieurs films dans la même saison Film
  "evangelion": {
    "Film_1": "Evangelion: 1.0 You Are (Not) Alone",
    "Film_2": "Evangelion: 2.0 You Can (Not) Advance", 
    "Film_3": "Evangelion: 3.0 You Can (Not) Redo",
    "Film_4": "Evangelion: 3.0+1.0 Thrice Upon a Time"
  },
  
  // Ajoutez ici d'autres films avec leurs vrais noms
  // Format: "anime-id": { "episode-key": "Vrai Titre du Film" }
};

/**
 * Obtient le vrai titre d'un film
 * @param animeId - L'ID de l'animé
 * @param seasonNumber - Le numéro de saison (ou "Film")
 * @param episodeNumber - Le numéro d'épisode
 * @param seasonIndex - Index de la saison film (pour plusieurs saisons film)
 * @returns Le vrai titre du film ou "Film" par défaut
 */
export function getFilmTitle(animeId: string, seasonNumber: string | number, episodeNumber?: number, seasonIndex?: number): string {
  const animeFilms = filmTitles[animeId];
  if (!animeFilms) return "Film";
  
  // Essayer plusieurs clés possibles dans l'ordre de priorité
  const possibleKeys = [
    // Utiliser l'index de saison si fourni (pour plusieurs saisons film)
    seasonIndex ? `Film_${seasonIndex}` : null,
    // Clé avec saison et épisode
    `${seasonNumber}_${episodeNumber}`,
    // Clé "Film" avec numéro d'épisode
    `Film_${episodeNumber}`,
    // Juste le numéro d'épisode
    episodeNumber ? `${episodeNumber}` : null,
    // Le seasonNumber tel quel
    seasonNumber.toString(),
    // Fallback "Film" seul
    "Film"
  ].filter(Boolean) as string[];
  
  for (const key of possibleKeys) {
    if (animeFilms[key]) {
      return animeFilms[key];
    }
  }
  
  return "Film";
}

/**
 * Vérifie si un titre est générique (juste "Film")
 * @param title - Le titre à vérifier
 * @returns true si le titre est générique
 */
export function isGenericFilmTitle(title: string): boolean {
  return title.toLowerCase() === "film" || title.toLowerCase() === "films";
}

/**
 * Obtient le titre d'une saison, en utilisant le vrai nom si c'est un film
 * @param animeId - L'ID de l'animé
 * @param season - L'objet saison
 * @param seasonIndex - Index de la saison dans le tableau (pour différencier plusieurs saisons film)
 * @returns Le titre approprié pour la saison
 */
export function getSeasonTitle(animeId: string, season: any, seasonIndex?: number): string {
  if (!season) return "Saison 1";
  
  // Si c'est une saison film et qu'elle a un titre générique
  if (String(season.seasonNumber) === "Film" && isGenericFilmTitle(season.title)) {
    // Si la saison n'a qu'un épisode, utiliser le titre du film
    if (season.episodes && season.episodes.length === 1) {
      const filmTitle = getFilmTitle(animeId, season.seasonNumber, 1, seasonIndex);
      if (!isGenericFilmTitle(filmTitle)) {
        return filmTitle;
      }
    }
    
    // Si plusieurs épisodes dans une saison film, essayer de trouver un titre général
    if (season.episodes && season.episodes.length > 1) {
      // Chercher s'il y a un titre pour cette saison film spécifique
      const seasonFilmTitle = getFilmTitle(animeId, "Film", undefined, seasonIndex);
      if (!isGenericFilmTitle(seasonFilmTitle)) {
        return seasonFilmTitle;
      }
    }
    
    return "Films";
  }
  
  // Si c'est un titre générique, améliorer l'affichage
  if (isGenericFilmTitle(season.title)) {
    if (String(season.seasonNumber) === "Film") {
      return "Films";
    }
    return `Saison ${season.seasonNumber}`;
  }
  
  return season.title;
}

/**
 * Obtient l'index d'une saison film parmi toutes les saisons film de l'animé
 * @param animeSeasons - Toutes les saisons de l'animé
 * @param targetSeason - La saison dont on veut l'index
 * @returns L'index de la saison film (commence à 1)
 */
export function getFilmSeasonIndex(animeSeasons: any[], targetSeason: any): number {
  const filmSeasons = animeSeasons.filter(s => String(s.seasonNumber) === "Film");
  const index = filmSeasons.findIndex(s => s === targetSeason);
  return index >= 0 ? index + 1 : 1;
}
