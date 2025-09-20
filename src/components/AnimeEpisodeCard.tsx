import * as React from "react";
import Link from "next/link";
import CustomImage from "./ui/custom-image";
import { cn } from "@/lib/utils";

interface AnimeEpisodeCardProps {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  date?: string;
  seasonNumber?: number | string;
  animeId: string;
  className?: string;
}

// Fonction pour générer une image d'épisode si aucune n'est fournie
function getAnimeEpisodeImage(animeId: string, episodeId: number, seasonNumber?: number | string, customImage?: string): string {
  // Si une URL d'image personnalisée est fournie, l'utiliser en priorité
  if (customImage) {
    return customImage.includes('?') ? `${customImage}&v=2` : `${customImage}?v=2`;
  }
  
  // Fallback sur des images génériques par défaut
  return `https://via.placeholder.com/640x360.png?text=Anime+Episode+${episodeId}`;
}

export default function AnimeEpisodeCard({
  id,
  title,
  description,
  imageUrl,
  date,
  seasonNumber,
  animeId,
  className,
}: AnimeEpisodeCardProps) {
  
  const watchUrl = `/catalogue/${animeId}?season=${seasonNumber || 1}&episode=${id}`;
  
  // Utiliser l'image fournie si elle existe
  let episodeImage = imageUrl;
  
  // Si aucune image n'est fournie, utiliser la fonction getAnimeEpisodeImage comme fallback
  if (!episodeImage) {
    episodeImage = getAnimeEpisodeImage(animeId, id, seasonNumber);
  }
  
  // Créer une clé stable pour l'image
  const imageKey = `anime-episode-image-${animeId}-${id}-${seasonNumber || 0}`;

  return (
    <div className={cn("block", className)}>
      <Link href={watchUrl}>
        <div className="relative aspect-video w-full overflow-hidden rounded-md mb-2">
          <CustomImage
            src={episodeImage}
            alt={title}
            fill={true}
            className="object-cover transition-transform duration-500 hover:scale-105"
            key={imageKey}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80"></div>
          
          {/* Numéro d'épisode en bas à gauche */}
          <div className="absolute bottom-2 left-2 text-base font-bold text-white">
            Épisode {id}
          </div>
        </div>
      </Link>
      
      {/* Titre et description en dehors du lien pour un meilleur style */}
      <h3 className="font-bold text-white text-base mb-2">{title}</h3>
      {description && (
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
      )}
    </div>
  );
} 
