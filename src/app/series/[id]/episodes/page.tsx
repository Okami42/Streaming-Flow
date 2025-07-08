"use client";

import React, { useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { seriesData } from "@/lib/seriesData";
import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import SeriesFooter from "@/components/SeriesFooter";
import { Button } from "@/components/ui/button";
import { Content, Episode, Season } from "@/lib/types";
import EpisodeCard from "@/components/EpisodeCard";
import { extractSeriesId } from "@/lib/utils";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

export default function SeriesEpisodesPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const rawSeriesId = unwrappedParams.id;
  
  // Utiliser extractSeriesId pour s'assurer que l'ID est correctement extrait
  const seriesId = extractSeriesId(rawSeriesId);
  const series = seriesData.find((item) => item.id === seriesId);
  
  if (!series) {
    notFound();
  }

  // Déterminer si la série a plusieurs saisons
  const hasMultipleSeasons = series.seasonsList && series.seasonsList.length > 1;
  
  // État pour gérer la saison sélectionnée
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
    return series.episodes;
  };

  // Obtenir le titre de la saison sélectionnée
  const getSelectedSeasonTitle = () => {
    if (hasMultipleSeasons) {
      const season = series.seasonsList?.find(s => s.seasonNumber === selectedSeason);
      return season ? season.title : `Saison ${selectedSeason}`;
    }
    return "Tous les épisodes";
  };
  
  // Données de description d'épisodes (simulées pour la démo)
  const episodeDescriptions: { [key: number]: string } = {
    1: "Ruiné et prêt à tout, Gi-hun accepte de participer à un jeu mystérieux. Mais dès la première épreuve, la promesse d'argent facile fait place à l'horreur.",
    2: "Le groupe organise un vote pour décider s'il continue ou abandonne l'aventure. Mais la réalité du monde extérieur peut s'avérer aussi impitoyable que le jeu.",
    3: "Plusieurs joueurs passent à l'épreuve suivante, aussi délicieuse que mortelle. Certains sont plus avantagés que les autres. Jun-ho réussit quant à lui à s'infiltrer.",
    4: "Les joueurs forment des alliances. La nuit tombée, personne n'est à l'abri au dortoir. Pour la troisième épreuve, l'équipe de Gi-hun doit penser de façon stratégique.",
    5: "Gi-hun et son équipe se relaient pour monter la garde toute la nuit. Les hommes masqués rencontrent des ennuis dans leur propre camp de conspirateurs.",
    6: "Les joueurs se mettent par deux pour la quatrième épreuve. Gi-hun est aux prises avec un dilemme moral. Tandis que Sang-woo choisit de se préserver, Sae-byeok se livre.",
    7: "Les invités VIP sont accueillis avec les honneurs aux premières loges du spectacle. La pression du cinquième match est tellement forte que certains joueurs craquent.",
    8: "Avant la dernière épreuve, la méfiance et le dégoût règnent parmi les finalistes. Jun-ho s'enfuit, bien décidé à révéler les sombres dessous de la compétition.",
    9: "La finale du jeu approche. Le Front Man accueille de prestigieux invités VIP pour assister au spectacle final. Jun-ho continue son enquête en se faisant passer pour un garde.",
  };

  // Titres d'épisodes pour Squid Game (pour la démo)
  const squidGameTitles: { [key: number]: string } = {
    1: "Un, deux, trois, soleil",
    2: "Enfer",
    3: "L'homme au parapluie",
    4: "L'équipe avant tout",
    5: "Un monde juste",
    6: "Gganbu",
    7: "VIP",
    8: "Leader",
    9: "Finale"
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* En-tête avec lien retour et titre */}
          <div className="mb-8">
            <Link href={`/series/${series.id}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour à {series.title}
            </Link>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {series.title} - {getSelectedSeasonTitle()}
            </h1>
            
            {/* Sélecteur de saison */}
            {hasMultipleSeasons && (
              <div className="mt-4">
                <div className="relative inline-block">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
                  >
                    {getSelectedSeasonTitle()}
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
              </div>
            )}
          </div>
          
          {/* Grille des épisodes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getEpisodesToDisplay().map((episode: Episode, index) => {
              // Déterminer la durée à afficher (simulé pour la démo)
              let duration = "55 min";
              
              // Varier les durées par saison et épisode
              if (selectedSeason === 1 || !hasMultipleSeasons) {
                if (episode.id === 1) duration = "1h01";
                if (episode.id === 2) duration = "1h02";
                if (episode.id === 3) duration = "55 min";
                if (episode.id === 4) duration = "55 min";
                if (episode.id === 5) duration = "52 min";
                if (episode.id === 6) duration = "1h02";
                if (episode.id === 7) duration = "58 min";
                if (episode.id === 8) duration = "33 min";
                if (episode.id === 9) duration = "56 min";
              } else if (selectedSeason === 2) {
                duration = "45 min";
                if (episode.id % 3 === 0) duration = "52 min";
                if (episode.id % 2 === 0) duration = "48 min";
              } else {
                duration = "50 min";
                if (episode.id === 1) duration = "1h10";
                if (episode.id === 7) duration = "1h32";
              }
              
              // Utiliser des données simulées spécifiques pour Squid Game
              let title = episode.title;
              const description = episodeDescriptions[episode.id] || "Dans cet épisode, l'intrigue se poursuit avec de nombreux rebondissements et des moments de suspense qui captiveront l'audience.";
              
              // Si c'est Squid Game, utiliser les titres spécifiques
              if (series.id === "squid-game") {
                title = squidGameTitles[episode.id] || title;
              }
              
              return (
                <EpisodeCard
                  key={`${series.id}-${selectedSeason}-${episode.id}`}
                  id={episode.id}
                  title={title}
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
      </main>
      
      <SeriesFooter />
    </div>
  );
} 