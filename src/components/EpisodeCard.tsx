import * as React from "react";
import Link from "next/link";
import CustomImage from "./ui/custom-image";
import { cn } from "@/lib/utils";
import { formatTimeExtended } from "@/lib/history";

interface EpisodeCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;  // Optionnel
  duration: string | number; // Peut être une chaîne ou un nombre en secondes
  date?: string;
  seasonNumber?: number;
  seriesId: string;
  className?: string;
}

// Fonction pour générer une image d'épisode si aucune n'est fournie
function getEpisodeImage(seriesId: string, episodeId: number, seasonNumber?: number, customImage?: string): string {
  // Si une URL d'image personnalisée est fournie, l'utiliser en priorité
  if (customImage) {
    // Ajouter un paramètre de version pour éviter le cache du navigateur
    return customImage.includes('?') ? `${customImage}&v=2` : `${customImage}?v=2`;
  }
  
  // Fallback sur des images génériques par défaut
  if (seriesId === "squid-game") {
    // Utiliser des images différentes selon la saison
    if (seasonNumber === 2) {
      // Image spécifique pour la saison 2
      return `https://media.themoviedb.org/t/p/w500_and_h282_face/tWwP30pufZhWDSxN4qxER7gMbLR.jpg?v=2`;
    } else {
      // Image pour la saison 1
      return `https://image.tmdb.org/t/p/original/vMFJS9LIUUAmQ1thq4vJ7iHKwRz.jpg?v=1`;
    }
  } else if (seriesId === "breaking-bad") {
    return `https://via.placeholder.com/640x360.png?text=Breaking+Bad+Episode+${episodeId}`;
  } else if (seriesId === "game-of-thrones") {
    return `https://via.placeholder.com/640x360.png?text=Game+of+Thrones+Episode+${episodeId}`;
  } else if (seriesId === "stranger-things") {
    return `https://via.placeholder.com/640x360.png?text=Stranger+Things+Episode+${episodeId}`;
  } else if (seriesId === "the-boys") {
    return `https://via.placeholder.com/640x360.png?text=The+Boys+Episode+${episodeId}`;
  } else {
    // Image par défaut pour les autres séries
    return `https://via.placeholder.com/640x360.png?text=Episode+${episodeId}`;
  }
}

// Fonction pour formatter la durée
function formatDuration(duration: string | number): string {
  // Si la durée est un nombre (en secondes)
  if (typeof duration === 'number') {
    const minutes = Math.floor(duration / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    // Format plus lisible: 1h01 ou 58 min
    if (hours > 0) {
      return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
    } else {
      return `${minutes} min`;
    }
  }
  
  // Si la durée est au format "XXh" ou "XXhXX"
  if (typeof duration === 'string' && duration.includes('h')) {
    return duration;
  }
  
  // Si la durée est une chaîne avec un nombre (minutes)
  if (typeof duration === 'string') {
    const minutes = parseInt(duration.replace(/\D/g, ''));
    if (minutes) {
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
      }
      return `${minutes} min`;
    }
  }
  
  return String(duration);
}

export default function EpisodeCard({
  id,
  title,
  description,
  imageUrl,
  duration,
  date,
  seasonNumber,
  seriesId,
  className,
}: EpisodeCardProps) {
  // Construire l'URL de visionnage
  const watchUrl = `/series/${seriesId}/watch/${id}${seasonNumber ? `?season=${seasonNumber}` : ''}`;
  
  // Utiliser l'image fournie si elle existe
  let episodeImage = imageUrl;
  
  // Si aucune image n'est fournie, utiliser la fonction getEpisodeImage comme fallback
  if (!episodeImage) {
    episodeImage = getEpisodeImage(seriesId, id, seasonNumber);
  }
  
  // Créer une clé stable pour l'image (sans Date.now())
  const imageKey = `episode-image-${seriesId}-${id}-${seasonNumber || 0}`;
  
  // Formatter la durée pour l'affichage
  const formattedDuration = formatDuration(duration);

  return (
    <Link href={watchUrl} className={cn("block", className)}>
      <div className="relative rounded-md overflow-hidden bg-[#0f172a] hover:bg-[#151e2f] transition-all duration-300 h-full border border-white/5 hover:border-blue-500/30">
        {/* Image avec superposition d'ombre */}
        <div className="relative aspect-video w-full overflow-hidden">
          <CustomImage
            src={episodeImage}
            alt={title}
            fill={true}
            className="object-cover transition-transform duration-500 hover:scale-105"
            key={imageKey}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80"></div>
          
          {/* Durée en bas de l'image - style cinepulse.to */}
          <div className="absolute bottom-2 right-2 text-base font-bold text-white bg-black/70 px-3 py-1 rounded">
            {formattedDuration}
          </div>
          
          {/* Numéro d'épisode en bas à gauche */}
          <div className="absolute bottom-2 left-2 text-base font-bold text-white">
            Épisode {id}
          </div>
        </div>
        
        {/* Contenu textuel */}
        <div className="p-2 sm:p-4">
          <h3 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">{title}</h3>
          {/* Mobile: truncated description, Desktop: full description */}
          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 md:line-clamp-none" style={{ minHeight: '30px', maxHeight: '80px' }}>{description}</p>
        </div>
      </div>
    </Link>
  );
} 