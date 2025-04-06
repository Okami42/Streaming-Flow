"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Share, Heart, MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { seriesData } from "@/lib/seriesData";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import { Content, Episode } from "@/lib/types";

export default function WatchPage({ params }: { params: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unwrappedParams = use(params) as { id: string; episodeId: string };
  const seasonParam = searchParams.get('season');
  const seasonNumber = seasonParam ? parseInt(seasonParam) : undefined;
  
  // Trouver la série
  const series = seriesData.find((s) => s.id === unwrappedParams.id);
  if (!series) return <div>Série non trouvée</div>;

  // Vérifier si la série a plusieurs saisons
  const hasMultipleSeasons = series.seasonsList && series.seasonsList.length > 1;

  // Trouver l'épisode en fonction de la saison
  let episode: Episode | undefined;
  if (hasMultipleSeasons && seasonNumber) {
    const season = series.seasonsList?.find(s => s.seasonNumber === seasonNumber);
    episode = season?.episodes.find(ep => ep.id === parseInt(unwrappedParams.episodeId));
  } else {
    episode = series.episodes.find(ep => ep.id === parseInt(unwrappedParams.episodeId));
  }
  if (!episode) return <div>Épisode non trouvé</div>;

  // Calculer les épisodes précédent et suivant
  const getAdjacentEpisodes = () => {
    let episodes = series.episodes;
    if (hasMultipleSeasons && seasonNumber) {
      const season = series.seasonsList?.find(s => s.seasonNumber === seasonNumber);
      if (season) episodes = season.episodes;
    }
    
    const totalEpisodes = episodes.length;
    const currentIndex = episodes.findIndex(ep => ep.id === parseInt(unwrappedParams.episodeId));
    
    const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
    const nextEpisode = currentIndex < totalEpisodes - 1 ? episodes[currentIndex + 1] : null;
    
    return { prevEpisode, nextEpisode, totalEpisodes };
  };
  
  const { prevEpisode, nextEpisode, totalEpisodes } = getAdjacentEpisodes();
  
  // Ajouter à l'historique
  const { addToWatchHistory } = useHistory();
  useEffect(() => {
    addToWatchHistory({
      id: `${series.id}-${unwrappedParams.episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`,
      title: series.title,
      imageUrl: series.imageUrl,
      lastWatchedAt: new Date().toISOString(),
      progress: 0,
      duration: 1800, // 30 minutes en secondes par défaut
      episodeInfo: {
        season: seasonNumber || 1,
        episode: parseInt(unwrappedParams.episodeId),
        title: episode.title
      },
      type: 'Anime'
    });
  }, [series.id, unwrappedParams.episodeId, seasonNumber]);

  // Ajouter le hook useFavorites
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Ajouter une fonction pour gérer l'ajout/retrait des favoris
  const handleFavoriteToggle = () => {
    const favoriteId = `${series.id}-${unwrappedParams.episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
    
    if (isFavorite(favoriteId)) {
      removeFromFavorites(favoriteId);
    } else {
      addToFavorites({
        id: favoriteId,
        title: `${series.title} - ${episode.title}`,
        imageUrl: series.imageUrl,
        type: series.type,
        seriesId: series.id,
        seasonNumber: seasonNumber,
        episodeId: parseInt(unwrappedParams.episodeId)
      });
    }
  };

  // Pour vérifier si l'épisode est dans les favoris
  const episodeFavoriteId = `${series.id}-${unwrappedParams.episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
  const isEpisodeFavorite = isFavorite(episodeFavoriteId);

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="mb-2 sm:mb-4">
            <Link href={`/series/${series.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Retour à {series.title}
            </Link>
          </div>
          
          <h1 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
            {series.title} - {seasonNumber ? `Saison ${seasonNumber}` : ''} Épisode {episode.id}: {episode.title}
          </h1>
          
          <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">
            Épisode {episode.id} / {totalEpisodes}
          </div>
          
          {/* Lecteur vidéo */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden mb-3 sm:mb-6 shadow-2xl">
              <div className="w-full h-full">
                {episode.videoUrl.includes('dood.wf') ? (
                  <iframe 
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts"
                    referrerPolicy="no-referrer"
                  ></iframe>
                ) : episode.videoUrl.includes('filemoon.sx') ? (
                  <iframe 
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    referrerPolicy="no-referrer"
                  ></iframe>
                ) : episode.videoUrl.includes('iframe.mediadelivery.net') ? (
                  <div className="relative flex items-center justify-center w-full h-full bg-[#030711]">
                    <iframe 
                      src={episode.videoUrl}
                      className="w-[90%] h-[90%] max-w-[1280px]" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="no-referrer"
                    ></iframe>
                  </div>
                ) : !episode.videoUrl.includes('http') ? (
                  <iframe 
                    src={`https://video.sibnet.ru/shell.php?videoid=${episode.videoUrl}&skin=4&share=1`}
                    className="absolute inset-0"
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    allow="fullscreen; autoplay"
                    referrerPolicy="no-referrer"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      zIndex: 1
                    }}
                  ></iframe>
                ) : episode.videoUrl.includes('vidmoly.to') ? (
                  <iframe 
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    referrerPolicy="no-referrer"
                  ></iframe>
                ) : episode.videoUrl.endsWith('.mp4') || episode.videoUrl.includes('cloudflarestorage') ? (
                  <video 
                    src={episode.videoUrl} 
                    className="w-full h-full" 
                    controls 
                    autoPlay 
                    playsInline
                  ></video>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <div className="mb-4 text-sm sm:text-base">Lecteur vidéo simulé</div>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2">URL de la vidéo:</p>
                      <code className="bg-gray-800 px-2 py-1 rounded text-[10px] sm:text-xs">
                        {episode.videoUrl}
                      </code>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Étiquette du lecteur */}
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm font-bold rounded-bl">
                {episode.videoUrl.includes('filemoon.sx') ? 'FILEMOON VOSTFR' : 
                 episode.videoUrl.includes('dood.wf') ? 'DOODSTREAM' : 
                 episode.videoUrl.includes('iframe.mediadelivery.net') ? 'CLOUDFLARE' :
                 !episode.videoUrl.includes('http') ? 'SIBNET VF' :
                 episode.videoUrl.includes('vidmoly.to') ? 'VIDMOLY VF' :
                 episode.videoUrl.endsWith('.mp4') || episode.videoUrl.includes('cloudflarestorage') ? 'MP4' :
                 'LECTEUR'}
              </div>
            </div>
          </div>
          
          {/* Navigation et actions */}
          <div className="mb-4 sm:mb-6">
            {/* Boutons de navigation centrés */}
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
              {prevEpisode ? (
                <Link href={`/series/${series.id}/watch/${prevEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`}>
                  <Button variant="outline" className="border-white/10 hover:border-white/20 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Précédent
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="border-white/10 opacity-50 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Précédent
                </Button>
              )}
              
              {nextEpisode ? (
                <Link href={`/series/${series.id}/watch/${nextEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`}>
                  <Button variant="outline" className="border-white/10 hover:border-white/20 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm">
                    Suivant
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="border-white/10 opacity-50 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm">
                  Suivant
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                </Button>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <Button 
                variant="ghost" 
                className={`${isEpisodeFavorite ? 'text-red-500 hover:text-red-400' : 'text-white/70 hover:text-white'} p-1 sm:p-2 h-auto text-xs sm:text-sm`}
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${isEpisodeFavorite ? 'fill-red-500' : ''}`} />
                {isEpisodeFavorite ? 'Aimé' : 'Aimer'}
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white p-1 sm:p-2 h-auto text-xs sm:text-sm">
                <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Partager
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white p-1 sm:p-2 h-auto text-xs sm:text-sm">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Commenter
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 