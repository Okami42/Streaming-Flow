"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight, Filter, Clock } from 'lucide-react';
import { WeeklyPlanning, PlanningDay, PlanningEpisode } from '@/lib/planning-data';
import PlanningCard from './PlanningCard';

interface PlanningWeekViewProps {
  weekPlanning: WeeklyPlanning;
  className?: string;
}

type FilterType = 'all' | 'Anime' | 'Scans';
type FilterLanguage = 'all' | 'VO' | 'VF' | 'VF & VO';

export default function PlanningWeekView({ weekPlanning, className = "" }: PlanningWeekViewProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterLanguage, setFilterLanguage] = useState<FilterLanguage>('all');

  // Filtrer les épisodes selon les critères sélectionnés
  const filterEpisodes = (episodes: PlanningEpisode[]): PlanningEpisode[] => {
    return episodes.filter(episode => {
      const typeMatch = filterType === 'all' || episode.type === filterType;
      const langMatch = filterLanguage === 'all' || episode.language === filterLanguage;
      return typeMatch && langMatch;
    });
  };

  // Obtenir les statistiques de la semaine
  const getWeekStats = () => {
    const allEpisodes = weekPlanning.days.flatMap(day => day.episodes);
    const totalEpisodes = allEpisodes.length;
    const animeCount = allEpisodes.filter(ep => ep.type === 'Anime').length;
    const scansCount = allEpisodes.filter(ep => ep.type === 'Scans').length;
    
    return { totalEpisodes, animeCount, scansCount };
  };

  const stats = getWeekStats();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header avec statistiques comme dans la photo */}
      <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Planning Hebdomadaire</h2>
              <p className="text-slate-400 text-sm">
                Du {new Date(weekPlanning.weekStartDate).toLocaleDateString('fr-FR')} au {new Date(weekPlanning.weekEndDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="flex gap-4 text-center">
            <div className="bg-blue-500/20 rounded-lg px-4 py-3 border border-blue-500/30">
              <div className="text-blue-300 font-bold text-2xl">{stats.animeCount}</div>
              <div className="text-blue-400 text-sm font-medium">Animes</div>
            </div>
            <div className="bg-pink-500/20 rounded-lg px-4 py-3 border border-pink-500/30">
              <div className="text-pink-300 font-bold text-2xl">{stats.scansCount}</div>
              <div className="text-pink-400 text-sm font-medium">Scans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres comme dans la photo */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-white font-medium">Filtres:</span>
        </div>
        
        {/* Filtre "Tous" */}
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          Tous
        </button>

        {/* Filtre Anime */}
        <button
          onClick={() => setFilterType('Anime')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterType === 'Anime'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          Anime
        </button>


        {/* Filtre Scans */}
        <button
          onClick={() => setFilterType('Scans')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterType === 'Scans'
              ? 'bg-gray-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          Scans
        </button>

        {/* Badge "Toutes" comme dans la photo */}
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
          Toutes
        </button>

        {/* Filtres langue */}
        <button
          onClick={() => setFilterLanguage(filterLanguage === 'VO' ? 'all' : 'VO')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            filterLanguage === 'VO'
              ? 'bg-red-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          🔊 VO
        </button>

        <button
          onClick={() => setFilterLanguage(filterLanguage === 'VF' ? 'all' : 'VF')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            filterLanguage === 'VF'
              ? 'bg-green-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          🔊 VF
        </button>

        <button
          onClick={() => setFilterLanguage(filterLanguage === 'VF & VO' ? 'all' : 'VF & VO')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            filterLanguage === 'VF & VO'
              ? 'bg-green-600 text-white'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
          }`}
        >
          VF & VO
        </button>
      </div>

      {/* Planning en grille comme anime-sama */}
      <div className="grid grid-cols-7 gap-4">
        {weekPlanning.days.map((day: PlanningDay) => {
          const filteredEpisodes = filterEpisodes(day.episodes);
          
          return (
            <div key={day.date} className="space-y-4">
              {/* En-tête du jour */}
              <div className={`text-center py-3 rounded-lg border-2 ${
                day.isToday 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-300'
              }`}>
                <h3 className="font-bold text-lg">{day.dayName.toUpperCase()}</h3>
              </div>

              {/* Liste des animes */}
              <div className="space-y-3">
                {filteredEpisodes.map((episode) => (
                  <Link 
                    key={episode.id} 
                    href={`/catalogue/${episode.animeId}`}
                    className="block"
                  >
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl overflow-hidden border border-slate-600/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-xl cursor-pointer">
                    {/* Image avec overlay moderne */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={episode.imageUrl}
                        alt={episode.animeTitle}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      
                      {/* Badges en top-left */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm ${
                          episode.type === 'Anime' 
                            ? 'bg-blue-500/90 text-white' 
                            : 'bg-gray-500/90 text-white'
                        }`}>
                          {episode.type}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm ${
                          episode.language === 'VO' 
                            ? 'bg-red-500/90 text-white'
                            : episode.language === 'VF'
                            ? 'bg-green-500/90 text-white' 
                            : 'bg-purple-500/90 text-white'
                        }`}>
                          {episode.language}
                        </span>
                      </div>
                    </div>
                    
                    {/* Section infos en bas */}
                    <div className="p-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                      {/* Titre de l'anime */}
                      <h4 className="font-bold text-white text-sm mb-1 line-clamp-2 leading-tight">
                        {episode.animeTitle.toUpperCase()}
                      </h4>
                      
                      {/* Heure avec format h */}
                      <p className="text-yellow-400 text-xs font-semibold">
                        {episode.releaseTime.slice(0, 5).replace(':', 'h')}
                      </p>
                    </div>
                  </div>
                  </Link>
                ))}
                
                {/* Message si pas d'épisodes */}
                {filteredEpisodes.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-2xl mb-2">📭</div>
                    <p className="text-sm">Aucune sortie</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
