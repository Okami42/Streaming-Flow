"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Calendar, Search } from 'lucide-react';
import { WeeklyPlanning, PlanningDay, PlanningEpisode } from '@/lib/planning-data';

interface PlanningWeekViewProps {
  weekPlanning: WeeklyPlanning;
  className?: string;
}

type FilterType = 'all' | 'Anime' | 'Scans';
type FilterLanguage = 'all' | 'VO' | 'VF';

export default function PlanningWeekView({ weekPlanning, className = "" }: PlanningWeekViewProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterLanguage, setFilterLanguage] = useState<FilterLanguage>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateCurrentDate = () => setCurrentDate(new Date());
    updateCurrentDate();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      updateCurrentDate();
      const dailyInterval = setInterval(updateCurrentDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  const updatedDays = weekPlanning.days.map(day => ({
    ...day,
    isToday: day.date === currentDate.toISOString().split('T')[0]
  }));

  const filterEpisodes = (episodes: PlanningEpisode[]): PlanningEpisode[] => {
    return episodes.filter(episode => {
      const typeMatch = filterType === 'all' || episode.type === filterType;
      const langMatch = filterLanguage === 'all' || episode.language === filterLanguage ||
        (filterLanguage === 'VF' && episode.language === 'VF & VO');
      const searchMatch = searchQuery === '' ||
        episode.animeTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && langMatch && searchMatch;
    });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  // Composant carte anime - Style anime-sama
  const AnimeCard = ({ episode, isToday, compact = false }: { episode: PlanningEpisode; isToday: boolean; compact?: boolean }) => (
    <Link
      href={`/catalogue/${episode.animeId}`}
      className="block group"
    >
      <div className={`rounded-lg overflow-hidden bg-slate-900/90
                    transition-all duration-200 hover:scale-[1.02]
                    ${isToday ? 'border-l-[2px] border-l-blue-500' : ''}`}>

        {/* Image poster - ratio carré/légèrement vertical */}
        <div className={`relative overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-square'}`}>
          <img
            src={episode.imageUrl}
            alt={episode.animeTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge Type - Top Left */}
          <div className="absolute top-1 left-1">
            <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${compact ? 'text-[7px]' : 'text-[8px]'} ${episode.type === 'Anime'
              ? 'bg-blue-600 text-white'
              : 'bg-purple-600 text-white'
              }`}>
              {episode.type}
            </span>
          </div>

          {/* Badge Langue (drapeau) - Top Right */}
          <div className="absolute top-1 right-1">
            <span className={compact ? "text-xs" : "text-sm"}>
              {episode.language === 'VO' ? '🇯🇵' : episode.language === 'VF' ? '🇫🇷' : '🌍'}
            </span>
          </div>
        </div>

        {/* Contenu texte sous l'image */}
        <div className={compact ? "p-2 space-y-1.5" : "p-3 space-y-2"}>
          {/* Titre */}
          <h4 className={`font-bold text-white leading-tight line-clamp-2 uppercase text-center ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {episode.animeTitle}
          </h4>

          {/* Heure */}
          <div className="flex items-center justify-center gap-1">
            <Clock className={compact ? "h-3 w-3 text-blue-400" : "h-3.5 w-3.5 text-blue-400"} />
            <span className={`font-semibold text-blue-400 ${compact ? 'text-xs' : 'text-sm'}`}>
              {episode.releaseTime.slice(0, 5).replace(':', 'h')}
            </span>
          </div>

          {/* Saison */}
          <div className="flex items-center justify-center gap-1">
            <Calendar className={compact ? "h-3 w-3 text-slate-400" : "h-3.5 w-3.5 text-slate-400"} />
            <span className={`text-slate-400 ${compact ? 'text-[11px]' : 'text-xs'}`}>
              Saison {episode.episodeNumber > 12 ? Math.ceil(episode.episodeNumber / 12) : 1}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Barre de filtres moderne */}
      <div className="flex items-center gap-4 flex-wrap p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
        <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Filtrer :</span>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${filterType === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
              }`}
          >
            ✕ Tous
          </button>

          <button
            onClick={() => setFilterType('Anime')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${filterType === 'Anime'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
              }`}
          >
            📺 Animes
          </button>

          <button
            onClick={() => setFilterType('Scans')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${filterType === 'Scans'
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
              }`}
          >
            📖 Scans
          </button>
        </div>

        {/* Séparateur */}
        <div className="w-px h-8 bg-slate-700/50" />

        {/* Filtres VO/VF */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterLanguage(filterLanguage === 'VO' ? 'all' : 'VO')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${filterLanguage === 'VO'
              ? 'bg-red-600/90 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
              }`}
          >
            🇯🇵 VO
          </button>

          <button
            onClick={() => setFilterLanguage(filterLanguage === 'VF' ? 'all' : 'VF')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${filterLanguage === 'VF'
              ? 'bg-emerald-600/90 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
              }`}
          >
            🇫🇷 VF
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 
                      text-white placeholder-slate-500 text-sm
                      focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                      transition-all duration-300"
          />
        </div>
      </div>

      {/* Grille des 7 jours en colonnes - Desktop */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-4">
        {updatedDays.map((day: PlanningDay) => {
          const filteredEpisodes = filterEpisodes(day.episodes);

          return (
            <div key={day.date} className="flex flex-col">
              {/* Header du jour - Design premium */}
              <div className={`text-center py-4 rounded-2xl mb-4 transition-all duration-300 ${day.isToday
                ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl shadow-blue-500/30 ring-2 ring-blue-400/50'
                : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-300 border border-slate-700/50 hover:border-slate-600/50'
                }`}>
                <div className="font-bold text-base uppercase tracking-widest">
                  {day.dayName}
                </div>
                <div className={`text-sm mt-1 font-medium ${day.isToday ? 'text-blue-200' : 'text-slate-500'}`}>
                  {formatDateShort(day.date)}
                </div>
              </div>

              {/* Liste des animes du jour */}
              <div className="flex flex-col gap-3 min-h-[400px]">
                {filteredEpisodes.map((episode) => (
                  <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} />
                ))}

                {/* Si pas d'épisodes */}
                {filteredEpisodes.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-600 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700/50">
                    <span className="text-3xl mb-2">📭</span>
                    <p className="text-xs font-medium">Aucune sortie</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Version Mobile/Tablet - Scroll horizontal élégant */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {updatedDays.map((day: PlanningDay) => {
            const filteredEpisodes = filterEpisodes(day.episodes);

            return (
              <div key={day.date} className="flex flex-col w-44">
                {/* Header du jour */}
                <div className={`text-center py-3 rounded-xl mb-3 transition-all duration-300 ${day.isToday
                  ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50'
                  : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-300 border border-slate-700/50'
                  }`}>
                  <div className="font-bold text-sm uppercase tracking-wider">
                    {day.dayName}
                  </div>
                  <div className={`text-xs mt-0.5 font-medium ${day.isToday ? 'text-blue-200' : 'text-slate-500'}`}>
                    {formatDateShort(day.date)}
                  </div>
                </div>

                {/* Liste des animes */}
                <div className="flex flex-col gap-2 min-h-[300px]">
                  {filteredEpisodes.map((episode) => (
                    <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} compact={true} />
                  ))}

                  {filteredEpisodes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-600 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700/50">
                      <span className="text-3xl mb-2">📭</span>
                      <p className="text-xs font-medium">Aucune sortie</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
