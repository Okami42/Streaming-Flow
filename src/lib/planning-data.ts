import { animes } from './catalogue-utils';

// Interface pour un épisode en cours de diffusion
export interface PlanningEpisode {
  id: string;
  animeId: string;
  title: string;
  animeTitle: string;
  imageUrl: string;
  bannerUrl?: string;
  episodeNumber: number;
  seasonNumber?: number;
  releaseDate: string; // Format ISO
  releaseTime: string; // Format "HH:MM"
  type: "Anime" | "Scans" | "Film";
  language: "VO" | "VF" | "VF & VO";
  status: "upcoming" | "released" | "delayed";
  genres: string[];
  duration?: string;
  description?: string;
}

// Interface pour un jour du planning
export interface PlanningDay {
  date: string; // Format "YYYY-MM-DD"
  dayName: string; // Lundi, Mardi, etc.
  isToday: boolean;
  episodes: PlanningEpisode[];
}

// Interface pour la semaine complète
export interface WeeklyPlanning {
  weekStartDate: string;
  weekEndDate: string;
  days: PlanningDay[];
}

// Données simulées pour le planning de cette semaine
const generatePlanningData = (): WeeklyPlanning => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const days: PlanningDay[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    
    const dateString = currentDate.toISOString().split('T')[0];
    const isToday = dateString === today.toISOString().split('T')[0];

    days.push({
      date: dateString,
      dayName: dayNames[i],
      isToday,
      episodes: generateEpisodesForDay(i, dateString)
    });
  }

  const weekEndDate = new Date(monday);
  weekEndDate.setDate(monday.getDate() + 6);

  return {
    weekStartDate: monday.toISOString().split('T')[0],
    weekEndDate: weekEndDate.toISOString().split('T')[0],
    days
  };
};

// Base de données des images pour les animes d'anime-sama.fr
const animeSamaImages: Record<string, string> = {
  "summer-pockets": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/summer-pockets.jpg",
  "kijin-gentoushou": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kijin-gentoushou.jpg",
  "sakamoto-days": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/sakamoto-days.jpg",
  "grand-blue": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/grand-blue.jpg",
  "wata-nare": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/watanare.jpg",
  "nyaight-of-the-living-cat": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/nyaight-of-the-living-cat.jpg",
  "rent-a-girlfriend": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/rent-a-girlfriend.jpg",
  "a-couple-of-cuckoos": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/a-couple-of-cuckoos.jpg",
  "mattaku-saikin-no-tantei-to-kitara": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mattaku-saikin-no-tantei-to-kitara.jpg",
  "clevatess": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/clevatess.jpg",
  "the-rising-of-the-shield-hero": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-rising-of-the-shield-hero.jpg",
  "reborn-as-a-vending-machine": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/reborn-as-a-vending-machine.jpg",
  "i-was-reincarnated-as-the-7th-prince": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/i-was-reincarnated-as-the-7th-prince.jpg",
  "mikadono-sanshimai-wa-angai-choroi": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mikadono-sanshimai-wa-angai-choroi.jpg",
  "onmyou-kaiten-rebirth": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/onmyou-kaiten-rebirth.jpg",
  "new-saga": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/new-saga.jpg",
  "muchuu-sa-kimi-ni": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/muchuu-sa-kimi-ni.jpg",
  "dr-stone": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dr-stone.jpg",
  "tsuihousha-shokudou-e-youkoso": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/tsuihousha-shokudou-e-youkoso.jpg",
  "dandadan": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dandadan.jpg",
  "futari-solo-camp": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/futari-solo-camp.jpg",
  "kamitsubakishi-kensetsuchuu": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kamitsubakishi-kensetsuchuu.jpg",
  "the-water-magician": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-water-magician.jpg",
  "oshi-no-ko": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/oshi-no-ko.jpg",
  "orb-on-the-movement-of-the-earth": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/orb-on-the-movement-of-the-earth.jpg",
  "honey-lemon-soda": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/honey-lemon-soda.jpg",
  "mission-yozakura-family": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mission-yozakura-family.jpg",
  "puniru-wa-kawaii-slime": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/puniru-wa-kawaii-slime.jpg",
  "madougushi-dahlia-wa-utsumukanai": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/madougushi-dahlia-wa-utsumukanai.jpg",
  "kinoko-inu": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kinoko-inu.jpg",
  "blue-lock": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/blue-lock.jpg",
  "momentary-lily": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/momentary-lily.jpg",
  "ranma-12": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/ranma.jpg",
  "arifureta": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/arifureta.jpg",
  "365-days-to-the-wedding": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/365-days-to-the-wedding.jpg",
  "sengoku-youko": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/sengoku-youko.jpg",
  "dragon-ball-daima": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dragon-ball-daima.jpg",
  "the-do-over-damsel-conquers-the-dragon-emperor": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-do-over-damsel-conquers-the-dragon-emperor.jpg",
  "one-piece": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/one-piece.jpg",
  "my-hero-academia": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/my-hero-academia.jpg",
  // Variations pour les animes avec VF/VOSTFR
  "dandadan-vf-crunchyroll": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dandadan.jpg",
  "dandadan-vf-netflix": "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dandadan.jpg"
};

// Génère des épisodes pour un jour donné - Données extraites d'anime-sama.fr
const generateEpisodesForDay = (dayIndex: number, date: string): PlanningEpisode[] => {
  const episodes: PlanningEpisode[] = [];
  
  // Données réelles extraites d'anime-sama.fr planning
  const realAnimeSamaSchedule = {
    // Lundi
    0: [
      { name: "Summer Pockets", time: "17:30", type: "VOSTFR", status: "" },
      { name: "Kijin Gentoushou", time: "17:30", type: "VOSTFR", status: "Reporté" },
      { name: "Sakamoto Days", time: "18:30", type: "VOSTFR", status: "" },
      { name: "Sakamoto Days", time: "18:30", type: "VF", status: "" },
      { name: "Grand Blue", time: "19:00", type: "VOSTFR", status: "" },
      { name: "Wata-Nare", time: "?", type: "VOSTFR", status: "" },
      { name: "Nyaight of the Living Cat", time: "?", type: "VF", status: "" }
    ],
    // Mardi  
    1: [
      { name: "Rent a Girlfriend", time: "15:50", type: "VOSTFR", status: "" },
      { name: "A Couple of Cuckoos", time: "16:50", type: "VOSTFR", status: "" },
      { name: "Mattaku Saikin no Tantei to Kitara", time: "17:20", type: "VOSTFR", status: "" }
    ],
    // Mercredi
    2: [
      { name: "Clevatess", time: "14:20", type: "VOSTFR", status: "" },
      { name: "The Rising of the Shield Hero", time: "14:50", type: "VOSTFR", status: "" },
      { name: "Clevatess", time: "15:00", type: "VF", status: "" },
      { name: "Reborn as a Vending Machine", time: "16:50", type: "VOSTFR", status: "" },
      { name: "I Was Reincarnated as the 7th Prince", time: "18:50", type: "VOSTFR", status: "" },
      { name: "Mikadono Sanshimai wa Angai, Choroi", time: "19:20", type: "VOSTFR", status: "" },
      { name: "Onmyou Kaiten Re:Birth", time: "19:50", type: "VOSTFR", status: "" },
      { name: "New Saga", time: "20:20", type: "VOSTFR", status: "" },
      { name: "Rent a Girlfriend", time: "?", type: "VF", status: "" },
      { name: "A Couple of Cuckoos", time: "?", type: "VF", status: "Reporté" }
    ],
    // Jeudi
    3: [
      { name: "Muchuu sa, Kimi ni", time: "15:45", type: "VOSTFR", status: "" },
      { name: "Dr Stone", time: "16:20", type: "VOSTFR", status: "" },
      { name: "Dr Stone", time: "16:45", type: "VF", status: "" },
      { name: "Tsuihousha Shokudou e Youkoso!", time: "16:50", type: "VOSTFR", status: "" },
      { name: "Dandadan", time: "18:20", type: "VOSTFR", status: "" },
      { name: "Dandadan VF Crunchyroll", time: "18:45", type: "VF", status: "" },
      { name: "Dandadan VF Netflix", time: "18:45", type: "VF", status: "" },
      { name: "Futari Solo Camp", time: "18:50", type: "VOSTFR", status: "" },
      { name: "Kamitsubaki-shi Kensetsuchuu", time: "19:50", type: "VOSTFR", status: "" },
      { name: "The Water Magician", time: "21:20", type: "VOSTFR", status: "" }
    ],
    // Vendredi
    4: [
      { name: "Oshi no Ko", time: "17:00", type: "VOSTFR", status: "" },
      { name: "Oshi no Ko", time: "17:00", type: "VF", status: "" },
      { name: "Orb: On the Movement of the Earth", time: "17:30", type: "VOSTFR", status: "" },
      { name: "Honey Lemon Soda", time: "18:50", type: "VOSTFR", status: "" },
      { name: "Mission: Yozakura Family", time: "19:20", type: "VOSTFR", status: "" },
      { name: "Puniru wa Kawaii Slime", time: "19:50", type: "VOSTFR", status: "" },
      { name: "Madougushi Dahlia wa Utsumukanai", time: "20:20", type: "VOSTFR", status: "" },
      { name: "Orb: On the Movement of the Earth", time: "?", type: "VF", status: "" }
    ],
    // Samedi - VRAIS animes d'anime-sama.fr
    5: [
      { name: "Lord of Mysteries", time: "12:00", type: "VF", status: "" },
      { name: "YAIBA", time: "12:20", type: "VOSTFR", status: "" },
      { name: "Detective Conan", time: "12:45", type: "VOSTFR", status: "" },
      { name: "Anne Shirley", time: "15:35", type: "VOSTFR", status: "" },
      { name: "Fermat Kitchen", time: "16:50", type: "VOSTFR", status: "" },
      { name: "Kaiju n°8", time: "16:55", type: "VOSTFR", status: "" },
      { name: "Kaiju n°8", time: "17:20", type: "VF", status: "" },
      { name: "Kizetsu Yuusha to Ansatsu Hime", time: "17:30", type: "VOSTFR", status: "" },
      { name: "Yuusha Party wo Tsuihou sareta Shiromadoushi", time: "18:00", type: "VOSTFR", status: "" },
      { name: "Bad Girl", time: "18:00", type: "VOSTFR", status: "" },
      { name: "Rascal Does Not Dream of Bunny Girl Senpai", time: "18:20", type: "VOSTFR", status: "" },
      { name: "My Dress-Up Darling", time: "18:50", type: "VOSTFR", status: "" },
      { name: "Koujo Denka no Kateikyoushi", time: "19:20", type: "VOSTFR", status: "" },
      { name: "The Summer Hikaru Died", time: "19:30", type: "VOSTFR", status: "" },
      { name: "Ame to Kimi to", time: "20:20", type: "VOSTFR", status: "" }
    ],
    // Dimanche  
    6: [
      { name: "Dragon Ball Daima", time: "12:00", type: "VOSTFR", status: "" },
      { name: "Dragon Ball Daima", time: "12:00", type: "VF", status: "" },
      { name: "The Do-Over Damsel Conquers the Dragon Emperor", time: "16:30", type: "VOSTFR", status: "" },
      { name: "One Piece", time: "17:00", type: "VOSTFR", status: "" },
      { name: "One Piece", time: "17:00", type: "VF", status: "" },
      { name: "My Hero Academia", time: "18:30", type: "VOSTFR", status: "" },
      { name: "My Hero Academia", time: "18:30", type: "VF", status: "" },
      { name: "The Do-Over Damsel Conquers the Dragon Emperor", time: "?", type: "VF", status: "" }
    ]
  };

  const animesForDay = realAnimeSamaSchedule[dayIndex as keyof typeof realAnimeSamaSchedule] || [];
  
  animesForDay.forEach((animeEntry, index) => {
    // Créer un ID simplifié basé sur le nom
    const animeId = animeEntry.name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Chercher dans les animes existants ou utiliser les données par défaut
    const existingAnime = animes.find(a => 
      a.title.toLowerCase().includes(animeEntry.name.toLowerCase().split(' ')[0]) ||
      a.id === animeId
    );
    
    const releaseTime = animeEntry.time === "?" ? "20:00" : animeEntry.time;
    const language = animeEntry.type === "VF" ? "VF" : 
                    animeEntry.type === "VOSTFR" ? "VO" : "VF & VO";
    
    // Utiliser l'image d'anime-sama.fr si disponible, sinon l'image existante
    const animeImage = animeSamaImages[animeId] || existingAnime?.imageUrl || '/picture/ANIMECATEGIMAGE.png';
    
    episodes.push({
      id: `${animeId}-ep-${date}-${index}`,
      animeId: animeId,
      title: `Épisode ${Math.floor(Math.random() * 20) + 1}`,
      animeTitle: animeEntry.name,
      imageUrl: animeImage,
      bannerUrl: animeImage,
      episodeNumber: Math.floor(Math.random() * 20) + 1,
      seasonNumber: 1,
      releaseDate: date,
      releaseTime: releaseTime,
      type: "Anime",
      language: language,
      status: animeEntry.status ? "delayed" : "upcoming",
      genres: existingAnime?.genres || ['Action', 'Animation'],
      duration: "24 min",
      description: animeEntry.status || undefined
    });
  });

  return episodes.sort((a, b) => a.releaseTime.localeCompare(b.releaseTime));
};

// Fonction pour obtenir les épisodes de la semaine actuelle
export const getCurrentWeekPlanning = (): WeeklyPlanning => {
  return generatePlanningData();
};

// Fonction pour obtenir les épisodes du jour
export const getTodayEpisodes = (): PlanningEpisode[] => {
  const weekPlanning = getCurrentWeekPlanning();
  const today = weekPlanning.days.find(day => day.isToday);
  return today?.episodes || [];
};

// Fonction pour obtenir les prochaines sorties (7 prochains jours)
export const getUpcomingEpisodes = (): PlanningEpisode[] => {
  const weekPlanning = getCurrentWeekPlanning();
  const allEpisodes = weekPlanning.days.flatMap(day => day.episodes);
  
  return allEpisodes
    .filter(episode => episode.status === 'upcoming')
    .sort((a, b) => {
      const dateA = new Date(`${a.releaseDate}T${a.releaseTime}`);
      const dateB = new Date(`${b.releaseDate}T${b.releaseTime}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 12); // Limiter à 12 épisodes
};

// Fonction pour filtrer les épisodes par type
export const getEpisodesByType = (type: "Anime" | "Scans" | "Film"): PlanningEpisode[] => {
  const weekPlanning = getCurrentWeekPlanning();
  const allEpisodes = weekPlanning.days.flatMap(day => day.episodes);
  
  return allEpisodes.filter(episode => episode.type === type);
};

// Fonction pour filtrer les épisodes par langue
export const getEpisodesByLanguage = (language: "VO" | "VF" | "VF & VO"): PlanningEpisode[] => {
  const weekPlanning = getCurrentWeekPlanning();
  const allEpisodes = weekPlanning.days.flatMap(day => day.episodes);
  
  return allEpisodes.filter(episode => episode.language === language);
};

// Export des données pour utilisation dans les composants
export const weeklyPlanning = getCurrentWeekPlanning();
export const todayEpisodes = getTodayEpisodes();
export const upcomingEpisodes = getUpcomingEpisodes();
