import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, Play, Star } from 'lucide-react';
import { PlanningEpisode } from '@/lib/planning-data';
import CustomImage from './ui/custom-image';

interface PlanningCardProps {
  episode: PlanningEpisode;
  showDate?: boolean;
  className?: string;
}

export default function PlanningCard({ episode, showDate = false, className = "" }: PlanningCardProps) {
  const releaseDateTime = new Date(`${episode.releaseDate}T${episode.releaseTime}`);
  const now = new Date();
  const isReleased = releaseDateTime <= now;
  const timeUntilRelease = releaseDateTime.getTime() - now.getTime();
  
  // Calcul du temps restant
  const getTimeRemaining = () => {
    if (isReleased) return "Disponible maintenant";
    
    const hours = Math.floor(timeUntilRelease / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilRelease % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `Dans ${days}j ${hours % 24}h`;
    } else if (hours > 0) {
      return `Dans ${hours}h ${minutes}min`;
    } else {
      return `Dans ${minutes}min`;
    }
  };

  const formatReleaseTime = () => {
    if (showDate) {
      return releaseDateTime.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return episode.releaseTime;
  };

  return (
    <Link href={`/catalogue/${episode.animeId}`}>
      <div className={`group relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 
                      backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 
                      hover:border-blue-500/50 transition-all duration-300 hover:scale-105 
                      hover:shadow-lg hover:shadow-blue-500/10 ${className}`}>
        
        {/* Badge de statut */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
            isReleased 
              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
              : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
          }`}>
            {isReleased ? 'Disponible' : 'Bientôt'}
          </span>
        </div>

        {/* Badge de type */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
            episode.type === 'Anime'
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
              : 'bg-pink-500/20 text-pink-300 border-pink-500/30'
          }`}>
            {episode.type}
          </span>
        </div>

        {/* Image principale */}
        <div className="relative h-48 overflow-hidden">
          <CustomImage
            src={episode.imageUrl}
            alt={episode.animeTitle}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-600/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <Play className="h-6 w-6 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 space-y-3">
          {/* Titre de l'anime */}
          <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-blue-300 transition-colors">
            {episode.animeTitle}
          </h3>

          {/* Titre de l'épisode */}
          <p className="text-slate-300 text-sm line-clamp-1">
            Ép. {episode.episodeNumber} - {episode.title}
          </p>

          {/* Informations de diffusion */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatReleaseTime()}</span>
            </div>
            
            {episode.duration && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{episode.duration}</span>
              </div>
            )}
          </div>

          {/* Langue et temps restant */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              episode.language === 'VF & VO' 
                ? 'bg-emerald-500/20 text-emerald-300'
                : episode.language === 'VF'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-violet-500/20 text-violet-300'
            }`}>
              {episode.language}
            </span>
            
            <span className="text-xs text-slate-400 font-medium">
              {getTimeRemaining()}
            </span>
          </div>

          {/* Genres */}
          {episode.genres && episode.genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {episode.genres.slice(0, 2).map((genre, index) => (
                <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                  {genre}
                </span>
              ))}
              {episode.genres.length > 2 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                  +{episode.genres.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Barre de progression si l'épisode est sorti */}
          {isReleased && (
            <div className="w-full bg-slate-700/50 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
