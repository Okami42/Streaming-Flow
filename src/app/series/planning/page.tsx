import React from 'react';
import Header from "@/components/Header";
import SeriesFooter from "@/components/SeriesFooter";
import PlanningWeekView from "@/components/PlanningWeekView";
import PlanningCard from "@/components/PlanningCard";
import { PlanningEpisode } from "@/lib/planning-data";
import { CalendarDays, TrendingUp, Clock, Star, Film, Tv } from "lucide-react";
import { popularSeries, recentFilms, classicFilms } from "@/lib/seriesData";

export default function SeriesPlanningPage() {
  const breakingBadImageUrl = "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg";

  // Conversion des données de séries en format planning
  const convertToPlanning = (): any => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    
    const seriesData = [
      ...popularSeries.map(serie => ({
        id: serie?.id || '',
        title: serie?.title || '',
        imageUrl: serie?.id === 'breaking-bad' ? breakingBadImageUrl : (serie?.imageUrl || ''),
        time: `${serie?.seasons || ''} saisons`,
        type: "Série" as const,
        language: "VF" as const
      }))
    ];

    const daySchedule = {
      0: seriesData.slice(0, 2), // Lundi
      1: seriesData.slice(2, 4), // Mardi
      2: recentFilms.map(film => ({
        id: film?.id || '',
        title: film?.title || '',
        imageUrl: film?.imageUrl || '',
        time: film?.runtime || '',
        type: "Film" as const,
        language: "VF" as const
      })), // Mercredi
      3: seriesData.slice(0, 3), // Jeudi
      4: seriesData.slice(1, 4), // Vendredi
      5: classicFilms.map(film => ({
        id: film?.id || '',
        title: film?.title || '',
        imageUrl: film?.imageUrl || '',
        time: film?.runtime || '',
        type: "Film" as const,
        language: "VF" as const
      })), // Samedi
      6: popularSeries.slice(0, 2).map(serie => ({
        id: serie?.id || '',
        title: serie?.title || '',
        imageUrl: serie?.id === 'breaking-bad' ? breakingBadImageUrl : (serie?.imageUrl || ''),
        time: `${serie?.seasons || ''} saisons`,
        type: "Série" as const,
        language: "VF" as const
      })), // Dimanche
    };

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      const isToday = dateString === today.toISOString().split('T')[0];
      
      const dayContent = daySchedule[i as keyof typeof daySchedule] || [];
      
      const episodes: PlanningEpisode[] = dayContent.map((item, index) => ({
        id: `${item.id}-series-${dateString}`,
        animeId: item.id,
        title: item.type === 'Film' ? 'Film Complet' : `Épisode ${index + 1}`,
        animeTitle: item.title,
        imageUrl: item.imageUrl,
        episodeNumber: index + 1,
        releaseDate: dateString,
        releaseTime: ['09:00', '14:30', '18:00', '21:00'][index % 4],
        type: item.type === 'Film' ? 'Film' : 'Anime',
        language: 'VF',
        status: 'upcoming' as const,
        genres: ['Drame', 'Action'],
        duration: item.type === 'Film' ? item.time : '45 min',
        description: `${item.type === 'Film' ? 'Un film' : 'Un épisode'} captivant à ne pas manquer!`
      }));

      days.push({
        date: dateString,
        dayName: dayNames[i],
        isToday,
        episodes
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

  const weekPlanning = convertToPlanning();
  const todayEpisodes = weekPlanning.days.find((day: any) => day.isToday)?.episodes || [];
  const upcomingEpisodes = weekPlanning.days.flatMap((day: any) => day.episodes).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#030711] via-[#0c1222] to-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header avec titre et description */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Tv className="h-8 w-8 text-purple-400" />
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Planning Séries & Films
              </h1>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Découvrez le planning complet des séries et films. Des classiques intemporels 
              aux nouveautés les plus attendues.
            </p>
          </div>

          {/* Section "Aujourd'hui" si il y a des épisodes */}
          {todayEpisodes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400" />
                  Aujourd'hui
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {todayEpisodes.slice(0, 4).map((episode: PlanningEpisode) => (
                  <PlanningCard key={episode.id} episode={episode} />
                ))}
              </div>
            </div>
          )}

          {/* Section "Prochaines sorties" */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Cette Semaine</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingEpisodes.map((episode: PlanningEpisode) => (
                <PlanningCard key={episode.id} episode={episode} showDate={true} />
              ))}
            </div>
          </div>

          {/* Planning hebdomadaire complet */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Planning Détaillé</h2>
            </div>
            
            <PlanningWeekView weekPlanning={weekPlanning} />
          </div>

          {/* Section informative */}
          <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-xl p-8 border border-purple-500/20 text-center">
            <h3 className="text-xl font-bold text-white mb-4">🎬 Qualité Premium</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Profitez de séries et films en haute définition avec doublage français professionnel. 
              Une expérience cinématographique optimale vous attend.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-purple-500/20 rounded-lg px-4 py-2 border border-purple-500/30">
                <div className="text-purple-300 font-bold">4K</div>
                <div className="text-purple-400 text-sm">Ultra HD</div>
              </div>
              <div className="bg-pink-500/20 rounded-lg px-4 py-2 border border-pink-500/30">
                <div className="text-pink-300 font-bold">VF</div>
                <div className="text-pink-400 text-sm">Doublage FR</div>
              </div>
              <div className="bg-indigo-500/20 rounded-lg px-4 py-2 border border-indigo-500/30">
                <div className="text-indigo-300 font-bold">∞</div>
                <div className="text-indigo-400 text-sm">Illimité</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SeriesFooter />
    </div>
  );
} 
