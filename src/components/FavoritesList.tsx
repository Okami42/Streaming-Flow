'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/context/favorites-context';
import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import CustomImage from './ui/custom-image';

export default function FavoritesList() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Vous n'avez pas encore ajouté de favoris.</p>
        <p className="text-gray-500 text-sm mt-2">Ajoutez des séries ou épisodes à vos favoris en cliquant sur le cœur.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((item) => (
        <div 
          key={item.id} 
          className="bg-[#151a2a] border border-gray-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:bg-[#1a1f35] transition-colors"
        >
          <div className="relative h-28 sm:h-32 sm:w-24 w-full rounded-md overflow-hidden flex-shrink-0">
            <CustomImage
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.type}
                  {item.seasonNumber && ` • Saison ${item.seasonNumber}`}
                  {item.episodeId && ` • Épisode ${item.episodeId}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ajouté le {new Date(item.addedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-transparent"
                  onClick={() => removeFromFavorites(item.id)}
                  title="Supprimer des favoris"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              {item.seriesId && (
                <Link 
                  href={item.episodeId 
                    ? `/${item.type === 'Anime' ? 'catalogue' : 'series'}/${item.seriesId}/watch/${item.episodeId}${item.seasonNumber ? `?season=${item.seasonNumber}` : ''}`
                    : `/${item.type === 'Anime' ? 'catalogue' : 'series'}/${item.seriesId}${item.seasonNumber ? `?season=${item.seasonNumber}` : ''}`
                  }
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs bg-transparent border-gray-700 hover:bg-gray-800/50"
                  >
                    {item.episodeId ? 'Regarder l\'épisode' : (item.type === 'Anime' ? 'Voir l\'animé' : 'Voir la série')}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
