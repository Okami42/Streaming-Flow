"use client";

import React, { useState, useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { getAnimeById } from "@/lib/animeData";
import { getEnrichedAnimeById } from "@/lib/enhancedAnimeData";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AnimeEpisodeCard from "@/components/AnimeEpisodeCard";
import { Loader2 } from "lucide-react";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: any;
}

export default function AnimeEpisodesPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  
  const [anime, setAnime] = useState<any>(null);
  const [animeId, setAnimeId] = useState<string>("");
  
  // État pour gérer la saison sélectionnée
  const [selectedSeason, setSelectedSeason] = useState<number | string>(
    seasonParam ? (isNaN(Number(seasonParam)) ? seasonParam : Number(seasonParam)) : 1
  );
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const unwrappedParams = await params;
        const id = unwrappedParams.id;
        setAnimeId(id);
        
        // Essayer d'abord avec l'auto-import
        const enrichedAnime = await getEnrichedAnimeById(id);
        if (enrichedAnime) {
          setAnime(enrichedAnime);
        } else {
          // Fallback vers la version basique
          const basicAnime = getAnimeById(id);
          setAnime(basicAnime);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'anime:", error);
        const unwrappedParams = await params;
        const basicAnime = getAnimeById(unwrappedParams.id);
        setAnime(basicAnime);
      }
    };

    loadAnime();
  }, [params]);

  if (!anime) {
    return (
      <div className="flex flex-col min-h-screen bg-[#030711] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Déterminer si l'anime a plusieurs saisons
  const hasMultipleSeasons = anime.seasons && anime.seasons.length > 1;
  
  // Obtenir les épisodes à afficher
  const getEpisodesToDisplay = () => {
    if (hasMultipleSeasons && anime.seasons) {
      const season = anime.seasons.find((s: any) => String(s.seasonNumber) === String(selectedSeason));
      return season ? season.episodes : [];
    }
    
    // Si pas de saisons, utiliser les épisodes directement
    return anime.episodes || [];
  };

  // Obtenir le titre de la saison sélectionnée
  const getSelectedSeasonTitle = () => {
    if (hasMultipleSeasons && anime.seasons) {
      const season = anime.seasons.find((s: any) => String(s.seasonNumber) === String(selectedSeason));
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
              <a href={`/catalogue/${animeId}`} className="hover:text-blue-400">Anime</a>
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
                        {anime.seasons.map((season: any) => (
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
              {getEpisodesToDisplay().map((episode: any) => {
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
                    key={`${animeId}-${selectedSeason}-${episode.number}`}
                    id={episode.number}
                    title={title}
                    description={description}
                    imageUrl={anime.imageUrl}
                    date="17 sept. 2021"
                    seasonNumber={hasMultipleSeasons ? selectedSeason : undefined}
                    animeId={animeId}
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