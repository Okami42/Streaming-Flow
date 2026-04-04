"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";

interface FavoriteButtonProps {
  animeId: string;
  title: string;
  imageUrl: string;
  floating?: boolean;
}

export default function FavoriteButton({ animeId, title, imageUrl, floating = false }: FavoriteButtonProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const animeFavoriteId = `anime-${animeId}`;
  const isAnimeFavorite = isFavorite(animeFavoriteId);

  const handleFavoriteToggle = () => {
    if (isAnimeFavorite) {
      removeFromFavorites(animeFavoriteId);
    } else {
      addToFavorites({
        id: animeFavoriteId,
        title: title,
        imageUrl: imageUrl,
        type: "Anime",
        seriesId: animeId
      });
    }
  };

  if (floating) {
    return (
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
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleFavoriteToggle}
      className={`h-9 px-4 ${isAnimeFavorite ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800/50'}`}
    >
      <Heart className={`h-4 w-4 mr-2 ${isAnimeFavorite ? 'fill-red-500' : ''}`} />
      {isAnimeFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    </Button>
  );
}