"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { seriesData } from "@/lib/seriesData";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import { Content, Episode } from "@/lib/types";
import React from "react";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
  episodeId: string;
}

export default function WatchPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const id = unwrappedParams.id;
  const episodeId = unwrappedParams.episodeId;
  
  const seasonParam = searchParams.get('season');
  const seasonNumber = seasonParam ? parseInt(seasonParam) : undefined;
  
  // État pour détecter le mode plein écran
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Clé unique pour forcer le rechargement du lecteur vidéo
  const [playerKey, setPlayerKey] = useState(`${id}-${episodeId}-${seasonNumber || 0}`);
  // Référence aux iframes pour nettoyage
  const iframeRefs = useRef<HTMLIFrameElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Hooks pour l'historique et les favoris
  const { addToWatchHistory } = useHistory();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  // Trouver la série
  const series = seriesData.find((s) => s.id === id);
  if (!series) {
    return <div>Série non trouvée</div>;
  }

  // Vérifier si la série a plusieurs saisons
  const hasMultipleSeasons = series.seasonsList && series.seasonsList.length > 1;

  // Trouver l'épisode en fonction de la saison
  let episode: Episode | undefined;
  if (hasMultipleSeasons && seasonNumber) {
    const season = series.seasonsList?.find(s => s.seasonNumber === seasonNumber);
    episode = season?.episodes.find(ep => ep.id === parseInt(episodeId));
  } else {
    episode = series.episodes.find(ep => ep.id === parseInt(episodeId));
  }
  
  if (!episode) {
    return <div>Épisode non trouvé</div>;
  }

  // Calculer les épisodes précédent et suivant
  const getAdjacentEpisodes = () => {
    let episodes = series.episodes;
    if (hasMultipleSeasons && seasonNumber) {
      const season = series.seasonsList?.find(s => s.seasonNumber === seasonNumber);
      if (season) episodes = season.episodes;
    }
    
    const totalEpisodes = episodes.length;
    const currentIndex = episodes.findIndex(ep => ep.id === parseInt(episodeId));
    
    const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
    const nextEpisode = currentIndex < totalEpisodes - 1 ? episodes[currentIndex + 1] : null;
    
    return { prevEpisode, nextEpisode, totalEpisodes };
  };
  
  const { prevEpisode, nextEpisode, totalEpisodes } = getAdjacentEpisodes();
  
  // Ajouter à l'historique
  useEffect(() => {
    // Utiliser une référence pour éviter des mises à jour en cascade
    const historyItem = {
      id: `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`,
      title: series.title,
      imageUrl: episode.imageUrl || series.imageUrl,
      lastWatchedAt: new Date().toISOString(),
      progress: 0,
      duration: episode.duration || 1800,
      episodeInfo: {
        season: seasonNumber || 1,
        episode: parseInt(episodeId),
        title: episode.title
      },
      type: 'Anime' as const
    };
    
    // Utiliser un timeout pour éviter les mises à jour trop rapides
    const timer = setTimeout(() => {
      addToWatchHistory(historyItem);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [series.id, episodeId, seasonNumber]); // Dépendances réduites

  // Effet pour mettre à jour la clé du lecteur quand on change d'épisode
  useEffect(() => {
    // Créer la clé une seule fois au montage du composant pour cet épisode
    const uniqueKey = `${id}-${episodeId}-${seasonNumber || 0}-${Math.random().toString(36).substring(2, 9)}`;
    setPlayerKey(uniqueKey);
    
    // Nettoyer les iframes précédents
    return () => {
      // Nettoyer toutes les iframes
      iframeRefs.current.forEach(iframe => {
        if (iframe && iframe.contentWindow) {
          try {
            // Arrêter la lecture et vider la source
            const iframeDoc = iframe.contentWindow.document;
            const videoElements = iframeDoc.querySelectorAll('video');
            videoElements.forEach((video: HTMLVideoElement) => {
              video.pause();
              video.src = '';
              video.load();
            });
            
            // Vider l'iframe
            iframe.src = 'about:blank';
          } catch (e) {
            // Ignorer les erreurs de sécurité cross-origin
            console.log("Nettoyage de l'iframe impossible en raison des restrictions cross-origin");
          }
        }
      });
      
      // Nettoyer la vidéo directe si elle existe
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        currentVideoRef.pause();
        currentVideoRef.src = '';
        currentVideoRef.load();
      }
      
      // Réinitialiser les références
      iframeRefs.current = [];
    };
  }, [id, episodeId, seasonNumber]);

  // Ajouter une fonction pour gérer l'ajout/retrait des favoris
  const handleFavoriteToggle = () => {
    const favoriteId = `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
    
    if (isFavorite(favoriteId)) {
      removeFromFavorites(favoriteId);
    } else {
      addToFavorites({
        id: favoriteId,
        title: `${series.title} - ${episode.title}`,
        imageUrl: episode.imageUrl || series.imageUrl,
        type: series.type,
        seriesId: series.id,
        seasonNumber: seasonNumber,
        episodeId: parseInt(episodeId)
      });
    }
  };

  // Pour vérifier si l'épisode est dans les favoris
  const episodeFavoriteId = `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
  const isEpisodeFavorite = isFavorite(episodeFavoriteId);
  
  // Détection du mode plein écran
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement !== null || 
        (document as any).webkitFullscreenElement !== null || 
        (document as any).mozFullScreenElement !== null ||
        (document as any).msFullscreenElement !== null
      );
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  // Fonction pour activer le mode plein écran sur le conteneur vidéo
  const toggleFullScreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if ((videoContainer as any).webkitRequestFullscreen) {
        (videoContainer as any).webkitRequestFullscreen();
      } else if ((videoContainer as any).msRequestFullscreen) {
        (videoContainer as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // Fonction pour ajouter les références d'iframe
  const addIframeRef = (iframe: HTMLIFrameElement | null) => {
    if (iframe && !iframeRefs.current.includes(iframe)) {
      iframeRefs.current.push(iframe);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />
      
      <main className="flex-grow pt-20">
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
          <div className="flex justify-center" id="video-container" style={{ width: '100%' }}>
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden mb-3 sm:mb-6 shadow-2xl">
              {/* Boutons de navigation sur le lecteur - mode normal */}
              {!isFullScreen && (
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 sm:p-4 z-20">
                  <Link href={`/series/${series.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="flex items-center text-white bg-black/50 hover:bg-black/70 transition-colors px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Retourner sur la fiche
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    {/* Bouton Épisode suivant - visible aussi en mode normal */}
                    {nextEpisode && (
                      <Link href={`/series/${series.id}/watch/${nextEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="flex items-center text-white bg-black/50 hover:bg-black/70 transition-colors px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                        Épisode suivant
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
              
              {/* Boutons de navigation en mode plein écran */}
              {isFullScreen && (
                <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-[9999]">
                  <Link href={`/series/${series.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="flex items-center text-white bg-black/70 hover:bg-black/90 transition-colors px-3 py-2 rounded-full text-sm shadow-lg">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Retourner sur la fiche
                  </Link>
                  
                  {nextEpisode && (
                    <Link href={`/series/${series.id}/watch/${nextEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="flex items-center text-white bg-black/70 hover:bg-black/90 transition-colors px-3 py-2 rounded-full text-sm shadow-lg">
                      Épisode suivant
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              )}
              
              <div className="w-full h-full" key={playerKey}>
                {episode.videoUrl.includes('dood.wf') ? (
                  <iframe 
                    ref={addIframeRef}
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts"
                    referrerPolicy="no-referrer"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                ) : episode.videoUrl.includes('filemoon.sx') ? (
                  <iframe 
                    ref={addIframeRef}
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    referrerPolicy="no-referrer"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                ) : episode.videoUrl.includes('iframe.mediadelivery.net') ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#030711]">
                    <iframe 
                      ref={addIframeRef}
                      src={episode.videoUrl}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.includes('beerscloud.com') ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#030711]">
                    <iframe 
                      ref={addIframeRef}
                      src={episode.videoUrl}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : !episode.videoUrl.includes('http') ? (
                  <iframe 
                    ref={addIframeRef}
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
                    ref={addIframeRef}
                    src={episode.videoUrl}
                    className="w-full h-full" 
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    referrerPolicy="no-referrer"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                ) : episode.videoUrl.endsWith('.mp4') || episode.videoUrl.includes('cloudflarestorage') ? (
                  <video 
                    ref={videoRef}
                    src={episode.videoUrl} 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay 
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
            </div>
          </div>
          
          {/* Navigation et actions */}
          <div className="mb-4 sm:mb-6">
            {/* Boutons de navigation centrés */}
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
              {prevEpisode ? (
                <Link href={`/series/${series.id}/watch/${prevEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`}>
                  <button 
                    className={buttonVariants({
                      variant: "outline",
                      className: "border-white/10 hover:border-white/20 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm"
                    })}
                  >
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Précédent
                  </button>
                </Link>
              ) : (
                <button 
                  disabled 
                  className={buttonVariants({
                    variant: "outline",
                    className: "border-white/10 opacity-50 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm"
                  })}
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Précédent
                </button>
              )}
              
              {nextEpisode ? (
                <Link href={`/series/${series.id}/watch/${nextEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`}>
                  <button 
                    className={buttonVariants({
                      variant: "outline",
                      className: "border-white/10 hover:border-white/20 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm"
                    })}
                  >
                    Suivant
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                  </button>
                </Link>
              ) : (
                <button 
                  disabled 
                  className={buttonVariants({
                    variant: "outline",
                    className: "border-white/10 opacity-50 px-2 sm:px-4 py-1 sm:py-2 h-8 sm:h-10 text-xs sm:text-sm"
                  })}
                >
                  Suivant
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* CSS pour optimiser l'affichage en plein écran */}
      <style jsx global>{`
        #video-container:fullscreen {
          width: 100vw !important;
          height: 100vh !important;
          padding: 0;
          margin: 0;
          background: black;
        }
        
        #video-container:fullscreen > div {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
        }
        
        #video-container:fullscreen video,
        #video-container:fullscreen iframe {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
        }
        
        /* Pour Safari */
        #video-container:-webkit-full-screen {
          width: 100vw !important;
          height: 100vh !important;
          padding: 0;
          margin: 0;
          background: black;
        }
        
        #video-container:-webkit-full-screen > div {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
        }
        
        #video-container:-webkit-full-screen video,
        #video-container:-webkit-full-screen iframe {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
        }
        
        /* S'assurer que les boutons sont visibles en plein écran */
        #video-container:fullscreen .absolute,
        #video-container:-webkit-full-screen .absolute {
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  );
} 