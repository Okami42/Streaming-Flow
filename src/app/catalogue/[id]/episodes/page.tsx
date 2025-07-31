"use client";

import React, { useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { getAnimeById } from "@/lib/animeData";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AnimeEpisodeCard from "@/components/AnimeEpisodeCard";
import { extractSeriesId } from "@/lib/utils";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

export default function AnimeEpisodesPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const rawAnimeId = unwrappedParams.id;
  
  // Utiliser extractSeriesId pour s'assurer que l'ID est correctement extrait
  const animeId = extractSeriesId(rawAnimeId);
  const anime = getAnimeById(animeId);

  if (!anime) {
    notFound();
  }

  // Déterminer si l'anime a plusieurs saisons
  const hasMultipleSeasons = anime.seasons && anime.seasons.length > 1;
  
  // État pour gérer la saison sélectionnée - initialiser avec le paramètre de l'URL ou 1 par défaut
  const [selectedSeason, setSelectedSeason] = useState<number | string>(
    seasonParam ? (isNaN(Number(seasonParam)) ? seasonParam : Number(seasonParam)) : 1
  );
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  
  // Obtenir les épisodes à afficher
  const getEpisodesToDisplay = () => {
    if (hasMultipleSeasons && anime.seasons) {
      const season = anime.seasons.find(s => String(s.seasonNumber) === String(selectedSeason));
      return season ? season.episodes : [];
    }
    
    // Si pas de saisons, utiliser les épisodes directement
    return anime.episodes || [];
  };

  // Obtenir le titre de la saison sélectionnée
  const getSelectedSeasonTitle = () => {
    if (hasMultipleSeasons && anime.seasons) {
      const season = anime.seasons.find(s => String(s.seasonNumber) === String(selectedSeason));
      return season ? season.title : `Saison ${selectedSeason}`;
    }
    return "Saison 1";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* En-tête avec titre de l'anime et navigation */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {anime.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <a href={`/catalogue/${anime.id}`} className="hover:text-blue-400">Anime</a>
              <span>&gt;</span>
              <span>{getSelectedSeasonTitle()}</span>
            </div>
          </div>

          {/* Liste des épisodes */}
          <div className="bg-[#0f172a] rounded-xl p-4 sm:p-6 border border-white/5">
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {getSelectedSeasonTitle()}
                </h2>
                
                {/* Sélecteur de saisons */}
                {hasMultipleSeasons && (
                  <div className="relative">
                    <button 
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
                    >
                      Changer de saison
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    
                    {isSeasonMenuOpen && anime.seasons && (
                      <div className="absolute z-10 mt-1 w-40 sm:w-48 bg-[#151a2a] rounded-md shadow-lg py-1 border border-white/10">
                        {anime.seasons.map((season) => (
                          <button
                            key={season.seasonNumber}
                            className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-200 hover:bg-blue-600/20"
                            onClick={() => {
                              setSelectedSeason(season.seasonNumber);
                              setIsSeasonMenuOpen(false);
                            }}
                          >
                            {season.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Grille d'épisodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {getEpisodesToDisplay().map((episode) => {
                // Déterminer le titre à afficher
                let title;
                let description;
                
                if (hasMultipleSeasons && anime.type === "Anime") {
                  title = `${episode.title}`;
                  description = `Découvrez l'épisode ${episode.number}${hasMultipleSeasons ? ` de la saison ${selectedSeason}` : ''} de ${anime.title}. Une nouvelle aventure vous attend dans cet épisode captivant qui vous tiendra en haleine du début à la fin.`;
                } else {
                  title = episode.title;
                  description = `Épisode ${episode.number}${hasMultipleSeasons ? ` Saison ${selectedSeason}` : ''}`;
                }
                
                return (
                  <AnimeEpisodeCard
                    key={`${anime.id}-${selectedSeason}-${episode.number}`}
                    id={episode.number}
                    title={title}
                    description={description}
                    imageUrl={anime.imageUrl}
                    date="17 sept. 2021"
                    seasonNumber={hasMultipleSeasons ? selectedSeason : undefined}
                    animeId={anime.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 