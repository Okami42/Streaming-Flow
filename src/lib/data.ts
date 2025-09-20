import { popularSeries, recentFilms, classicFilms } from "./seriesData";

export const recentEpisodes = [
  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://ext.same-assets.com/2175864690/3344234865.jpeg",
    time: "Il y a 6h",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://ext.same-assets.com/4236370899/4066221021.jpeg",
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
    id: "amagami-san-chi-no-enmusubi-scan",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://ext.same-assets.com/4236370899/4066221021.jpeg",
    time: "Ch. 65",
    type: "Scans",
    language: "VF",
  },
  {
    id: "failure-skill-nut-master-scan",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://ext.same-assets.com/2175864690/3344234865.jpeg",
    time: "Ch. 32",
    type: "Scans",
    language: "VF",
  },
  {
    id: "unnamed-memory-scan",
    title: "Unnamed Memory",
    imageUrl: "https://ext.same-assets.com/3309958097/2676309700.jpeg",
    time: "Ch. 28",
    type: "Scans",
    language: "VF",
  },
  {
    id: "welcome-demon-school-teacher-scan",
    title: "Welcome, Demon-School Teacher!",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    time: "Ch. 102",
    type: "Scans",
    language: "VF",
  },
];

export const tuesdayReleases = [
  {
    id: "the-priest-of-corruption",
    title: "The Priest of Corruption",
    imageUrl: "https://ext.same-assets.com/2961408211/1841763537.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "the-novels-extra",
    title: "The Novel's Extra",
    imageUrl: "https://ext.same-assets.com/290343418/911444686.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "the-extras-academy-survival-guide",
    title: "The Extra's Academy Survival Guide",
    imageUrl: "https://ext.same-assets.com/2043135716/2956086885.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "star-embracing-swordmaster",
    title: "Star-Embracing Swordmaster",
    imageUrl: "https://ext.same-assets.com/4130246396/3743452834.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
];

export const classics = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: "https://ext.same-assets.com/3039906599/884967313.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: "https://ext.same-assets.com/2879165773/327560351.jpeg",
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
    imageUrl: "https://ext.same-assets.com/3410839635/1638134647.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    imageUrl: "https://ext.same-assets.com/4165707166/2193428669.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
];
