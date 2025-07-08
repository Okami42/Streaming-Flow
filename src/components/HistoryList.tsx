"use client";

import { useHistory } from "@/context/history-context";
import { calculateProgress, formatTime, getRelativeTime } from "@/lib/history";
import { extractSeriesId } from "@/lib/utils";
import { Trash2, Play } from "lucide-react";
import CustomImage from "./ui/custom-image";
import Link from "next/link";
import { useMemo, useCallback } from "react";

export default function HistoryList({ limit = 5 }: { limit?: number }) {
  const { history, removeFromHistory } = useHistory();

  // Limiter les éléments les plus récents
  const limitedHistory = useMemo(() => {
    return history.slice(0, limit);
  }, [history, limit]);

  // Créer une fonction stable pour la suppression
  const handleRemoveItem = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromHistory(id);
  }, [removeFromHistory]);

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Votre historique est vide.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {limitedHistory.map((item) => {
        // Déterminer l'URL de redirection
        let watchUrl = '#';
        let progressPercentage = 0;
        
        if ('progress' in item) {
          // C'est un élément de type vidéo
          progressPercentage = calculateProgress(item.progress, item.duration);
          
          // Utiliser la fonction utilitaire pour extraire l'ID de la série
          const seriesId = extractSeriesId(item.id);
          
          // Utiliser les informations d'épisode stockées dans l'item
          const episodeId = item.episodeInfo.episode;
          const seasonNumber = item.episodeInfo.season;
          const seasonParam = `?season=${seasonNumber}`;
          
          // Construire l'URL complète
          watchUrl = `/series/${seriesId}/watch/${episodeId}${seasonParam}`;
          
          // Debug pour vérifier la construction de l'URL
          console.log(`URL construite pour ${item.id}: SeriesID=${seriesId}, Season=${seasonNumber}, Episode=${episodeId}, URL=${watchUrl}`);
        }
        
        return (
          <Link href={watchUrl} key={item.id} className="block">
            <div className="history-item bg-[#0F1729] rounded-lg border border-gray-800 overflow-hidden hover:bg-[#151e2f] transition-all duration-300 group">
              <div className="p-4 flex flex-col sm:flex-row gap-4">
                {/* Image avec overlay de lecture */}
                <div className="relative aspect-video w-full sm:w-48 h-auto rounded-md overflow-hidden">
                  <CustomImage
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Bouton play au survol */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" fill="white" />
                    </div>
                  </div>
                  
                  {/* Temps de visionnage en bas à droite */}
                  {'progress' in item && (
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-white bg-black/70 px-2 py-1 rounded">
                      {formatTime(item.progress)} / {formatTime(item.duration)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    <button
                      onClick={(e) => handleRemoveItem(item.id, e)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-1 text-xs text-gray-400">
                    {'lastWatchedAt' in item ? (
                      <span>{getRelativeTime(item.lastWatchedAt)}</span>
                    ) : (
                      <span>{getRelativeTime(item.lastReadAt)}</span>
                    )}
                  </div>

                  {'progress' in item && (
                    <div className="mt-auto pt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>S{item.episodeInfo.season} E{item.episodeInfo.episode} {item.episodeInfo.title ? `- ${item.episodeInfo.title}` : ''}</span>
                      </div>
                      
                      {/* Barre de progression style cinepulse */}
                      <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {'page' in item && (
                    <div className="mt-auto pt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Chapitre {item.chapter}</span>
                        <span>Page {item.page} / {item.totalPages}</span>
                      </div>
                      
                      {/* Barre de progression style cinepulse */}
                      <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${(item.page / item.totalPages) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
