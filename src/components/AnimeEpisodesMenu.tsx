"use client";

import React, { useState, useEffect } from 'react';
import { Play, Film, Languages, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface AnimeEpisodeInfo {
  animeName: string;
  animeId: string;
  folder: string;
  seasons: {
    [season: string]: {
      vf?: string[];
      vostfr?: string[];
    };
  };
}

interface AnimeEpisodesMenuProps {
  animeId: string;
  animeTitle: string;
  className?: string;
}

export default function AnimeEpisodesMenu({ animeId, animeTitle, className = "" }: AnimeEpisodesMenuProps) {
  const [animeData, setAnimeData] = useState<AnimeEpisodeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'vf' | 'vostfr'>('vostfr');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchAnimeData();
  }, [animeId]);

  const fetchAnimeData = async () => {
    try {
      const response = await fetch(`/api/admin/real-episodes?animeId=${animeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setAnimeData(data);
          // Sélectionner la première saison par défaut
          const firstSeason = Object.keys(data.seasons)[0];
          if (firstSeason) {
            setSelectedSeason(firstSeason);
            // Choisir VOSTFR par défaut, ou VF si VOSTFR n'existe pas
            if (data.seasons[firstSeason].vostfr) {
              setSelectedLanguage('vostfr');
            } else if (data.seasons[firstSeason].vf) {
              setSelectedLanguage('vf');
            }
          }
        }
      }
    } catch (error) {
      console.error('Erreur chargement épisodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentEpisodes = (): string[] => {
    if (!animeData || !selectedSeason) return [];
    return animeData.seasons[selectedSeason]?.[selectedLanguage] || [];
  };

  const getTotalEpisodes = (): number => {
    if (!animeData) return 0;
    let total = 0;
    Object.values(animeData.seasons).forEach(season => {
      if (season.vf) total += season.vf.length;
      if (season.vostfr) total += season.vostfr.length;
    });
    return total;
  };

  const getAvailableLanguages = (): Array<'vf' | 'vostfr'> => {
    if (!animeData || !selectedSeason) return [];
    const season = animeData.seasons[selectedSeason];
    const languages: Array<'vf' | 'vostfr'> = [];
    if (season?.vostfr && season.vostfr.length > 0) languages.push('vostfr');
    if (season?.vf && season.vf.length > 0) languages.push('vf');
    return languages;
  };

  const handleWatchEpisode = (url: string, episodeNumber: number) => {
    // Ouvrir dans un nouvel onglet
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className={`bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!animeData || getTotalEpisodes() === 0) {
    return null; // Ne pas afficher si pas d'épisodes
  }

  const availableLanguages = getAvailableLanguages();
  const currentEpisodes = getCurrentEpisodes();

  return (
    <div className={`bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Play className="h-7 w-7 text-blue-400" />
          Épisodes disponibles
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
            {getTotalEpisodes()}
          </span>
        </h2>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-slate-800/50 hover:bg-slate-700/50 text-white p-2 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Sélection saison */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
            <Film className="h-4 w-4" />
            Saison
          </label>
          <select
            value={selectedSeason}
            onChange={(e) => {
              setSelectedSeason(e.target.value);
              // Réinitialiser la langue à VOSTFR ou la première disponible
              const newSeason = animeData.seasons[e.target.value];
              if (newSeason?.vostfr) {
                setSelectedLanguage('vostfr');
              } else if (newSeason?.vf) {
                setSelectedLanguage('vf');
              }
            }}
            className="w-full py-2 px-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {Object.keys(animeData.seasons).map(season => (
              <option key={season} value={season}>
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection langue */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Langue
          </label>
          <div className="flex gap-2">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm font-medium ${
                  selectedLanguage === lang
                    ? lang === 'vostfr' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-green-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des épisodes */}
      {isExpanded && (
        <div className="space-y-3">
          <div className="text-slate-400 text-sm mb-4">
            {currentEpisodes.length} épisode(s) en {selectedLanguage.toUpperCase()} • {selectedSeason}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {currentEpisodes.map((episodeUrl, index) => (
              <button
                key={index}
                onClick={() => handleWatchEpisode(episodeUrl, index + 1)}
                className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/30 hover:border-blue-500/50 transition-all duration-200 group text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    Ép. {index + 1}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    selectedLanguage === 'vostfr' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {selectedLanguage.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Regarder maintenant</span>
                </div>
              </button>
            ))}
          </div>

          {currentEpisodes.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <div className="text-2xl mb-2">📭</div>
              <p className="text-sm">Aucun épisode disponible pour cette configuration</p>
            </div>
          )}
        </div>
      )}

      {/* Résumé replié */}
      {!isExpanded && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="text-white font-medium mb-1">
              {currentEpisodes.length} épisodes disponibles
            </div>
            <div className="text-slate-400 text-sm">
              {selectedSeason} • {selectedLanguage.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

