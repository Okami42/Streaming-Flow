// Types génériques pour tous les contenus
export interface Episode {
  id: number;
  title: string;
  videoUrl: string;
  duration?: number; // Durée en secondes
  imageUrl?: string; // URL de l'image de l'épisode
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  episodes: Episode[];
  status: string;
  year: number;
  studio: string;
  type: string;
  genres: string[];
  rating: number;
  language: string;
  seasons?: number;  // Nombre total de saisons
  seasonsList?: Season[];  // Liste détaillée des saisons
  runtime?: string;  // Uniquement pour les films
}

// Types spécifiques pour les animes
export interface AnimeEpisode {
  number: number;
  title: string;
  duration: number;
  sibnetVostfrId?: string;
  sibnetVfId?: string;
  smoothpreUrl?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  vidmolyVfUrl?: string;
  vidmolyVfId?: string;
  movearnUrl?: string;  // URL pour movearnpre.com
  movearnVfUrl?: string;  // URL VF pour movearnpre.com
  sendvidId?: string;
  m3u8Url?: string;
  m3u8VfUrl?: string;
  mp4Url?: string;     // Lien direct vers le fichier MP4 en VOSTFR
  mp4VfUrl?: string;   // Lien direct vers le fichier MP4 en VF
}

export interface AnimeSeason {
  seasonNumber: number;
  title: string;
  year: number;
  episodes: AnimeEpisode[];
}

export interface Anime {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  type: string;
  status: string;
  aired: string;
  premiered: string;
  studios: string[];
  genres: string[];
  themes: string[];
  demographics: string[];
  duration: string;
  rating: string;
  score: number;
  ranked: number;
  popularity: number;
  members: number;
  favorites: number;
  seasons: AnimeSeason[];
}

export interface FavoriteItem {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  addedAt: string;
  seriesId?: string;
  seasonNumber?: number;
  episodeId?: number;
} 