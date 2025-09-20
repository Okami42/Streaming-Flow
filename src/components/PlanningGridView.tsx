"use client";

import React, { useState } from 'react';
import { Filter, Calendar } from 'lucide-react';
import { WeeklyPlanning, PlanningDay, PlanningEpisode } from '@/lib/planning-data';
import Link from 'next/link';
import CustomImage from './ui/custom-image';

interface PlanningGridViewProps {
  weekPlanning: WeeklyPlanning;
  className?: string;
}

type FilterType = 'all' | 'Anime' | 'Scans';
type FilterLanguage = 'all' | 'VO' | 'VF' | 'VF & VO';

export default function PlanningGridView({ weekPlanning, className = "" }: PlanningGridViewProps) {
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

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header professionnel */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">PLANNING</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Les sorties quotidiennes sont listées ici, le jour actuel est en surbrillance et le planning s'actualise tous les lundis soir.
          </p>
        </div>
        
        {/* Notes épurées */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <p className="text-slate-300">
              <span className="font-medium text-white">Note 1 :</span> La saison d'une œuvre est terminée si elle ne figure plus sur le planning.
            </p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <p className="text-slate-300">
              <span className="font-medium text-white">Note 2 :</span> Certaines œuvres sont en cours mais ne sont pas sur le planning car elles n'ont pas de dates fixes.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres professionnels */}
      <div className="mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-white font-medium">Filtrer :</span>
          
          {/* Filtres par type */}
          {(['all', 'Anime', 'Scans'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === type
                  ? type === 'Anime' 
                    ? 'bg-blue-600 text-white' 
                    : type === 'Scans' 
                    ? 'bg-gray-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type === 'all' ? '🎯 ANIMES' : type === 'Anime' ? 'Anime' : 'Scans'}
            </button>
          ))}

          {/* Filtres par langue */}
          {(['VO', 'VF'] as FilterLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setFilterLanguage(filterLanguage === lang ? 'all' : lang)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterLanguage === lang
                  ? lang === 'VO' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-green-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🔊 {lang}
            </button>
          ))}

          <button
            onClick={() => setFilterType(filterType === 'Scans' ? 'all' : 'Scans')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'Scans'
                ? 'bg-gray-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            📚 SCANS
          </button>

          {/* Bouton clear */}
          {(filterType !== 'all' || filterLanguage !== 'all') && (
            <button
              onClick={() => {
                setFilterType('all');
                setFilterLanguage('all');
              }}
              className="px-3 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Planning par jour professionnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {weekPlanning.days.map((day: PlanningDay) => {
          const filteredEpisodes = filterEpisodes(day.episodes);
          
          return (
            <div key={day.date} className="space-y-4">
              {/* En-tête du jour clean */}
              <div className={`text-center py-3 rounded-lg border ${
                day.isToday 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-300'
              }`}>
                <h3 className="font-bold text-lg">{day.dayName.toUpperCase()}</h3>
                {day.isToday && (
                  <div className="text-xs mt-1 text-blue-200">• Aujourd'hui •</div>
                )}
              </div>

              {/* Liste des épisodes clean */}
              <div className="space-y-3">
                {filteredEpisodes.map((episode) => (
                  <Link key={episode.id} href={`/catalogue/${episode.animeId}`}>
                    <div className="group bg-slate-900/80 rounded-lg overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105">
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <CustomImage
                          src={episode.imageUrl}
                          alt={episode.animeTitle}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                        
                        {/* Overlay simple */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          {/* Titre */}
                          <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">
                            {episode.animeTitle}
                          </h4>
                          
                          {/* Heure */}
                          <div className="text-yellow-400 font-bold text-lg mb-1">
                            {episode.releaseTime.slice(0, 5)}
                          </div>
                          
                          {/* Badges simples */}
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              episode.type === 'Anime' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-600 text-white'
                            }`}>
                              {episode.type}
                            </span>
                            
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              episode.language === 'VO' 
                                ? 'bg-red-600 text-white'
                                : episode.language === 'VF'
                                ? 'bg-green-600 text-white' 
                                : 'bg-purple-600 text-white'
                            }`}>
                              {episode.language}
                            </span>
                          </div>
                        </div>
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
