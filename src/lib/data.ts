import { popularSeries, recentFilms, classicFilms } from "./seriesData";
import { getAnimeImage } from "./catalogue-utils";

export const recentEpisodes = [
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: getAnimeImage("amagami-san-chi-no-enmusubi"),
    time: "Il y a 1j",
    type: "Anime",
    language: "VOSTFR",
  },
];

// Ajout des derniers épisodes de séries
export const recentSeriesEpisodes = popularSeries.map(series => {
  if (!series) return null;
  return {
    id: series.id,
    title: series.title,
    imageUrl: series.imageUrl,
    time: "Récent",
    type: "Série",
    language: "VF",
  };
}).filter(Boolean);

// Ajout des derniers films
export const latestFilms = recentFilms.map(film => {
  if (!film) return null;
  return {
    id: film.id,
    title: film.title,
    imageUrl: film.imageUrl,
    time: film.runtime || "2h+",
    type: "Film",
    language: "VF",
  };
}).filter(Boolean);

export const recentScans = [
  {
    id: "one-piece",
    title: "One Piece",
    imageUrl: getAnimeImage("one-piece"),
    time: "Ch. 65",
    type: "Scans",
    language: "VF",
  }
];

export const tuesdayReleases = [
  {
    id: "one-piece",
    title: "One Piece",
    imageUrl: getAnimeImage("one-piece"),
    type: "Anime",
    language: "VOSTFR",
  },
];

export const classics = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    imageUrl: getAnimeImage("solo-leveling"),
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: getAnimeImage("demon-slayer"),
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: getAnimeImage("jujutsu-kaisen"),
    type: "Anime",
    language: "VOSTFR",
  },
];

// Films classiques
export const classicMovies = classicFilms.map(film => {
  if (!film) return null;
  return {
    id: film.id,
    title: film.title,
    imageUrl: film.imageUrl,
    type: "Film",
    language: "VF/VOSTFR",
  };
}).filter(Boolean);

export const hidden = [
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    imageUrl: getAnimeImage("akudama-drive"),
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    imageUrl: getAnimeImage("vinland-saga"),
    type: "Anime",
    language: "VOSTFR",
  },
];
