"use client";

import React, { useState, useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { seriesData } from "@/lib/seriesData";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Star, Building, Film, Tag, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomImage from "@/components/ui/custom-image";
import { Content, Episode, Season } from "@/lib/types";
import { useFavorites } from "@/context/favorites-context";
import EpisodeCard from "@/components/EpisodeCard";
import episodeDescriptions, { getEpisodeDescription } from "@/lib/episodeDescriptions";
import { extractSeriesId } from "@/lib/utils";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

export default function SeriesPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const rawSeriesId = unwrappedParams.id;
  
  // Utiliser la fonction extractSeriesId pour s'assurer que l'ID est correctement extrait
  const seriesId = extractSeriesId(rawSeriesId);
  const series = seriesData.find((item) => item.id === seriesId);

  if (!series) {
    notFound();
  }

  // Déterminer si la série a plusieurs saisons
  const hasMultipleSeasons = series.seasonsList && series.seasonsList.length > 1;
  
  // État pour gérer la saison sélectionnée - initialiser avec le paramètre de l'URL ou 1 par défaut
  const [selectedSeason, setSelectedSeason] = useState<number>(
    seasonParam ? parseInt(seasonParam) : 1
  );
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  
  // Obtenir les épisodes à afficher
  const getEpisodesToDisplay = () => {
    if (hasMultipleSeasons) {
      const season = series.seasonsList?.find(s => s.seasonNumber === selectedSeason);
      return season ? season.episodes : [];
    }
    
    // Si episodes est vide mais qu'il y a une saison 1, utiliser les épisodes de la saison 1
    if (series.episodes.length === 0 && series.seasonsList && series.seasonsList.length > 0) {
      const firstSeason = series.seasonsList.find(s => s.seasonNumber === 1);
      return firstSeason ? firstSeason.episodes : [];
    }
    
    return series.episodes;
  };

  // Obtenir le titre de la saison sélectionnée
  const getSelectedSeasonTitle = () => {
    if (hasMultipleSeasons) {
      const season = series.seasonsList?.find(s => s.seasonNumber === selectedSeason);
      return season ? season.title : `Saison ${selectedSeason}`;
    }
    return "Épisodes";
  };

  // Ajouter le hook useFavorites
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  // Pour vérifier si la série est dans les favoris
  const seriesFavoriteId = `series-${series.id}`;
  const isSeriesFavorite = isFavorite(seriesFavoriteId);

  // Ajouter une fonction pour gérer l'ajout/retrait des favoris
  const handleFavoriteToggle = () => {
    if (isSeriesFavorite) {
      removeFromFavorites(seriesFavoriteId);
    } else {
      addToFavorites({
        id: seriesFavoriteId,
        title: series.title,
        imageUrl: series.imageUrl,
        type: series.type,
        seriesId: series.id
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        {/* Bannière */}
        <div className="relative h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <CustomImage
              src={series.bannerUrl}
              alt={`Bannière ${series.title}`}
              fill={true}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/80 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-4 pb-12 md:px-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="relative w-[180px] h-[240px] shrink-0 rounded-lg overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10">
                  <CustomImage
                    src={series.imageUrl}
                    alt={series.title}
                    fill={true}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {series.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {series.genres.map((genre: string) => (
                      <span
                        key={genre}
                        className="inline-block px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-md"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">
                        {series.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-300">{series.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-300">
                        {series.studio}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-gray-300">
                        {series.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Synopsis déplacé ici */}
                  <div className="mb-4">
                    <p className="text-gray-300">{series.description}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className={`mt-2 ${isSeriesFavorite ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800/50'}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSeriesFavorite ? 'fill-red-500' : ''}`} />
                    {isSeriesFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Liste des épisodes */}
          <div className="bg-[#0f172a] rounded-xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              {series.type === "Série" ? (
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-white">
                    {getSelectedSeasonTitle()}
                  </h2>
                  
                  {/* Sélecteur de saisons */}
                  {hasMultipleSeasons && (
                    <div className="relative">
                      <button 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
                      >
                        Changer de saison
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {isSeasonMenuOpen && (
                        <div className="absolute z-10 mt-1 w-48 bg-[#151a2a] rounded-md shadow-lg py-1 border border-white/10">
                          {series.seasonsList?.map((season) => (
                            <button
                              key={season.seasonNumber}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/20"
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
              ) : (
                <h2 className="text-xl font-bold text-white">Regarder</h2>
              )}
              
              {/* Bouton pour voir tous les épisodes */}
              {series.type === "Série" && (
                <Link href={`/series/${series.id}/episodes${hasMultipleSeasons ? `?season=${selectedSeason}` : ''}`}>
                  <Button 
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  >
                    Voir tous les épisodes
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Nouvelle grille d'épisodes avec le composant EpisodeCard */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getEpisodesToDisplay().map((episode: Episode) => {
                // Utiliser la durée de l'épisode directement depuis les données
                const duration = episode.duration || "55 min"; // Fallback uniquement si pas de durée
                
                // Description de l'épisode depuis notre nouveau fichier avec gestion des saisons
                const description = getEpisodeDescription(series.id, episode.id, selectedSeason);
                
                // S'assurer que l'image est bien passée au composant
                console.log(`Episode ${episode.id}, image: ${episode.imageUrl}`);
                
                return (
                  <EpisodeCard
                    key={`${series.id}-${selectedSeason}-${episode.id}`}
                    id={episode.id}
                    title={episode.title}
                    description={description}
                    imageUrl={episode.imageUrl}
                    duration={duration}
                    date="17 sept. 2021"
                    seasonNumber={hasMultipleSeasons ? selectedSeason : undefined}
                    seriesId={series.id}
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