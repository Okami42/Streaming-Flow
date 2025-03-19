"use client";

import { useHistory } from "@/context/history-context";
import { calculateProgress, formatTime, getRelativeTime } from "@/lib/history";
import { Trash2 } from "lucide-react";
import CustomImage from "./ui/custom-image";
import { Progress } from "./ui/progress";
import { useMemo, useCallback } from "react";

export default function HistoryList() {
  const { history, removeFromHistory } = useHistory();

  // Limiter strictement à 5 éléments les plus récents
  const limitedHistory = useMemo(() => {
    return history.slice(0, 5);
  }, [history]);

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
      {limitedHistory.map((item) => (
        <div key={item.id} className="history-item p-4 flex flex-col sm:flex-row gap-4">
          {/* Image */}
          <div className="relative aspect-video sm:aspect-square w-full sm:w-32 h-auto rounded-md overflow-hidden">
            <CustomImage
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-white">{item.title}</h3>
              <button
                onClick={(e) => handleRemoveItem(item.id, e)}
                className="text-gray-400 hover:text-pink-500 transition-colors p-1"
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

            <div className="mt-auto pt-4">
              {'progress' in item ? (
                <>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>S{item.episodeInfo.season} E{item.episodeInfo.episode} {item.episodeInfo.title ? `- ${item.episodeInfo.title}` : ''}</span>
                    <span>{formatTime(item.progress)} / {formatTime(item.duration)}</span>
                  </div>
                  <Progress value={calculateProgress(item.progress, item.duration)} className="h-1" />
                </>
              ) : (
                <>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Chapitre {item.chapter}</span>
                    <span>Page {item.page} / {item.totalPages}</span>
                  </div>
                  <Progress value={calculateProgress(item.page, item.totalPages)} className="h-1" />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
