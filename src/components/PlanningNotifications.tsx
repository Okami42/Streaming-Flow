"use client";

import React, { useState, useEffect } from 'react';
import { Bell, X, Calendar, Clock, Star } from 'lucide-react';
import { PlanningEpisode, getTodayEpisodes, getUpcomingEpisodes } from '@/lib/planning-data';

interface PlanningNotificationsProps {
  className?: string;
}

export default function PlanningNotifications({ className = "" }: PlanningNotificationsProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [notifications, setNotifications] = useState<PlanningEpisode[]>([]);

  useEffect(() => {
    // Simuler la détection de nouvelles sorties
    const todayEpisodes = getTodayEpisodes();
    const upcomingEpisodes = getUpcomingEpisodes().slice(0, 3);
    
    const allNotifications = [...todayEpisodes, ...upcomingEpisodes];
    setNotifications(allNotifications.slice(0, 5)); // Limiter à 5 notifications
    
    // Simuler l'apparition de nouvelles notifications
    const timer = setTimeout(() => {
      setHasNewNotifications(allNotifications.length > 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const formatTimeRemaining = (episode: PlanningEpisode) => {
    const releaseDateTime = new Date(`${episode.releaseDate}T${episode.releaseTime}`);
    const now = new Date();
    const timeUntilRelease = releaseDateTime.getTime() - now.getTime();
    
    if (timeUntilRelease <= 0) return "Disponible maintenant";
    
    const hours = Math.floor(timeUntilRelease / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilRelease % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `Dans ${days}j`;
    } else if (hours > 0) {
      return `Dans ${hours}h`;
    } else {
      return `Dans ${minutes}min`;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bouton de notification */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all"
      >
        <Bell className="h-5 w-5 text-slate-300" />
        
        {hasNewNotifications && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
          </div>
        )}
      </button>

      {/* Panel de notifications */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium text-white">Prochaines Sorties</h3>
            </div>
            <button
              onClick={() => setShowNotifications(false)}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Liste des notifications */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-2 space-y-2">
                {notifications.map((episode) => {
                  const isToday = episode.releaseDate === new Date().toISOString().split('T')[0];
                  
                  return (
                    <div
                      key={episode.id}
                      className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                    >
                      {/* Image miniature */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={episode.imageUrl}
                          alt={episode.animeTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white text-sm line-clamp-1">
                            {episode.animeTitle}
                          </h4>
                          {isToday && (
                            <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-slate-400 text-xs line-clamp-1 mb-1">
                          {episode.type === 'Film' ? episode.title : `Ép. ${episode.episodeNumber} - ${episode.title}`}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span className={`${isToday ? 'text-green-400' : 'text-slate-500'}`}>
                            {formatTimeRemaining(episode)}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500">{episode.language}</span>
                        </div>
                      </div>

                      {/* Badge de type */}
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          episode.type === 'Film' 
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {episode.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Bell className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Aucune notification</p>
                <p className="text-slate-500 text-xs mt-1">Les nouvelles sorties apparaîtront ici</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-slate-700/50">
              <button className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
