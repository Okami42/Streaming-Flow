"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { getAnimeById } from "@/lib/animeData";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Star, Building, Film, Tag, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomImage from "@/components/ui/custom-image";
import { useFavorites } from "@/context/favorites-context";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

export default function AnimePage({ params }: PageProps) {
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const animeId = unwrappedParams.id;
  const anime = getAnimeById(animeId);

  if (!anime) {
    notFound();
  }

  // État pour gérer la saison sélectionnée
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  
  // Récupérer le hook des favoris
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  // Pour vérifier si l'anime est dans les favoris
  const animeFavoriteId = `anime-${anime.id}`;
  const isAnimeFavorite = isFavorite(animeFavoriteId);

  // Fonction pour ajouter/retirer des favoris
  const handleFavoriteToggle = () => {
    if (isAnimeFavorite) {
      removeFromFavorites(animeFavoriteId);
    } else {
      addToFavorites({
        id: animeFavoriteId,
        title: anime.title,
        imageUrl: anime.imageUrl,
        type: "Anime",
        seriesId: anime.id
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
              src={anime.bannerUrl}
              alt={`Bannière ${anime.title}`}
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
                    src={anime.imageUrl}
                    alt={anime.title}
                    fill={true}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {anime.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genres.map((genre: string) => (
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
                        {anime.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-300">
                        {anime.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-300">
                        {anime.type === "TV" ? "Série" : anime.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-gray-300">
                        {anime.status}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className={`mt-2 ${isAnimeFavorite ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800/50'}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isAnimeFavorite ? 'fill-red-500' : ''}`} />
                    {isAnimeFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de favoris flottant */}
        <button
          onClick={handleFavoriteToggle}
          className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isAnimeFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
          }`}
          aria-label={isAnimeFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`h-6 w-6 ${isAnimeFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Le reste du contenu... */}
      </main>

      <Footer />
    </div>
  );
} 