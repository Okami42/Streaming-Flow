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

// Génère des épisodes pour un jour donné
const generateEpisodesForDay = (dayIndex: number, date: string): PlanningEpisode[] => {
  const episodes: PlanningEpisode[] = [];
  
  // Configuration basée sur les animes typiques d'Anime-Sama
  const daySchedule = {
    0: ['blue-lock', 'one-piece', 'dandadan'], // Lundi
    1: ['jujutsu-kaisen', 'chainsaw-man', 'demon-slayer'], // Mardi  
    2: ['solo-leveling', 'frieren', 'spy-x-family'], // Mercredi
    3: ['attack-on-titan', 'mob-psycho-100', 'death-note'], // Jeudi
    4: ['my-hero-academia', 'fullmetal-alchemist', 'hunter-x-hunter'], // Vendredi
    5: ['tokyo-ghoul', 'black-clover', 'naruto'], // Samedi
    6: ['dr-stone', 'kaiju-n8', 'kaguya-sama'] // Dimanche
  };

  const animesForDay = daySchedule[dayIndex as keyof typeof daySchedule] || [];
  
  animesForDay.forEach((animeId, index) => {
    // Chercher dans TOUS les animes, pas seulement les 20 premiers
    const anime = animes.find(a => a.id === animeId);
    if (anime) {
      // Heures personnalisées pour chaque anime
      let releaseTime = '09:00';
      
      // Horaires Anime-Sama avec les vraies heures "bizarres"
      if (dayIndex === 0) { // Lundi
        if (animeId === 'blue-lock') releaseTime = '16:30';
        else if (animeId === 'one-piece') releaseTime = '09:30';
        else if (animeId === 'dandadan') releaseTime = '17:00';
      } else if (dayIndex === 1) { // Mardi  
        if (animeId === 'jujutsu-kaisen') releaseTime = '17:30';
        else if (animeId === 'chainsaw-man') releaseTime = '16:00';
        else if (animeId === 'demon-slayer') releaseTime = '23:15';
      } else if (dayIndex === 2) { // Mercredi
        if (animeId === 'solo-leveling') releaseTime = '16:30';
        else if (animeId === 'frieren') releaseTime = '23:00';
        else if (animeId === 'spy-x-family') releaseTime = '17:00';
      } else if (dayIndex === 3) { // Jeudi
        if (animeId === 'attack-on-titan') releaseTime = '16:05';
        else if (animeId === 'mob-psycho-100') releaseTime = '16:00';
        else if (animeId === 'death-note') releaseTime = '17:00';
      } else if (dayIndex === 4) { // Vendredi
        if (animeId === 'my-hero-academia') releaseTime = '17:30';
        else if (animeId === 'fullmetal-alchemist') releaseTime = '17:00';
        else if (animeId === 'hunter-x-hunter') releaseTime = '16:00';
      } else if (dayIndex === 5) { // Samedi
        if (animeId === 'tokyo-ghoul') releaseTime = '23:30';
        else if (animeId === 'black-clover') releaseTime = '19:25';
        else if (animeId === 'naruto') releaseTime = '19:30';
      } else { // Dimanche
        if (animeId === 'dr-stone') releaseTime = '22:00';
        else if (animeId === 'kaiju-n8') releaseTime = '23:00';
        else if (animeId === 'kaguya-sama') releaseTime = '16:30';
      }
      
      episodes.push({
        id: `${animeId}-ep-${date}`,
        animeId: anime.id,
        title: `Épisode ${Math.floor(Math.random() * 20) + 1}`,
        animeTitle: anime.title,
        imageUrl: anime.imageUrl || '/picture/ANIMECATEGIMAGE.png',
        bannerUrl: anime.imageUrl || '/picture/ANIMECATEGIMAGE.png',
        episodeNumber: Math.floor(Math.random() * 20) + 1,
        seasonNumber: 1,
        releaseDate: date,
        releaseTime: releaseTime,
        type: "Anime",
        language: Math.random() > 0.5 ? "VF & VO" : "VO",
        status: "upcoming",
        genres: anime.genres || ['Action', 'Animation'],
        duration: "24 min",
      });
    }
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
