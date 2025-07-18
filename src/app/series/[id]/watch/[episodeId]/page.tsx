"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import SeriesFooter from "@/components/SeriesFooter";
import { Button, buttonVariants } from "@/components/ui/button";
import { seriesData } from "@/lib/seriesData";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import { Content, Episode, Season } from "@/lib/types";
import { formatTimeExtended } from "@/lib/history";
import { extractSeriesId } from "@/lib/utils";
import { WatchHistoryItem } from "@/lib/history";
import CustomImage from "@/components/ui/custom-image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEpisodeDescription } from "@/lib/episodeDescriptions";
import { getProxiedStreamUrl } from "@/lib/utils";
import Script from 'next/script';

// Déclaration de type pour window.Hls
declare global {
  interface Window {
    Hls: any;
  }
}

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
  episodeId: string;
}

export default function SeriesWatchPage({ params, searchParams: queryParams }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeParam = searchParams.get('time') ? parseInt(searchParams.get('time') || '0') : 0;
  
  // Utiliser React.use() pour accéder aux paramètres
  const unwrappedParams = React.use(params) as RouteParams;
  const rawId = unwrappedParams.id;
  const episodeId = unwrappedParams.episodeId;
  
  // Rechercher directement la série par ID sans utiliser extractSeriesId
  const series = seriesData.find((item) => 
    item.id === rawId || 
    // Essayer aussi avec l'ID complet si la recherche directe échoue
    rawId.startsWith(item.id + "-")
  );

  if (!series) {
    notFound();
  }
  
  const seasonParam = searchParams.get('season');
  const seasonNumber = seasonParam ? parseInt(seasonParam) : undefined;
  
  // État pour détecter le mode plein écran
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Clé unique pour forcer le rechargement du lecteur vidéo
  const [playerKey, setPlayerKey] = useState(`${rawId}-${episodeId}-${seasonNumber || 0}`);
  // Référence aux iframes pour nettoyage
  const iframeRefs = useRef<HTMLIFrameElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Hooks pour l'historique et les favoris
  const { addToWatchHistory, watchHistory, updateWatchProgress } = useHistory();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  // État pour suivre le temps de lecture actuel
  const [currentTime, setCurrentTime] = useState(timeParam);
  const [duration, setDuration] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  // Supprimer les flags qui causent des problèmes
  
  // Vérifier si la série a plusieurs saisons
  const hasMultipleSeasons = series.seasonsList && series.seasonsList.length > 1;

  // Trouver l'épisode en fonction de la saison
  let episode: Episode | undefined;
  if (hasMultipleSeasons && seasonNumber) {
    const season = series.seasonsList?.find(s => s.seasonNumber === seasonNumber);
    episode = season?.episodes.find(ep => ep.id === parseInt(episodeId));
  } else {
    // Si episodes est vide mais qu'il y a des saisons, utiliser la première saison
    if (series.episodes.length === 0 && series.seasonsList && series.seasonsList.length > 0) {
      const firstSeason = series.seasonsList[0];
      episode = firstSeason.episodes.find(ep => ep.id === parseInt(episodeId));
    } else {
      episode = series.episodes.find(ep => ep.id === parseInt(episodeId));
    }
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
    } else if (series.episodes.length === 0 && series.seasonsList && series.seasonsList.length > 0) {
      // Si episodes est vide mais qu'il y a des saisons, utiliser la première saison
      episodes = series.seasonsList[0].episodes;
    }
    
    const totalEpisodes = episodes.length;
    const currentIndex = episodes.findIndex(ep => ep.id === parseInt(episodeId));
    
    const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
    const nextEpisode = currentIndex < totalEpisodes - 1 ? episodes[currentIndex + 1] : null;
    
    return { prevEpisode, nextEpisode, totalEpisodes };
  };
  
  const { prevEpisode, nextEpisode, totalEpisodes } = getAdjacentEpisodes();

  // Fonction pour sauvegarder directement dans le localStorage pour les films
  const saveFilmProgressToLocalStorage = (progress: number) => {
    if (series.type === "Film") {
      try {
        // Clé unique pour ce film
        const storageKey = `film_progress_${series.id}_${episodeId}${seasonNumber ? `_s${seasonNumber}` : ''}`;
        
        // Créer un objet de progression
        const progressData = {
          id: `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`,
          progress: progress,
          duration: duration || episode.duration || 1800,
          lastUpdated: new Date().toISOString()
        };
        
        // Sauvegarder dans le localStorage
        localStorage.setItem(storageKey, JSON.stringify(progressData));
        
        // Également mettre à jour l'historique normal
        const historyItemId = `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
        
        // Récupérer l'historique actuel
        const savedWatchHistory = localStorage.getItem('animeWatchHistory');
        if (savedWatchHistory) {
          const historyArray = JSON.parse(savedWatchHistory) as WatchHistoryItem[];
          
          // Trouver si l'élément existe déjà
          const existingItemIndex = historyArray.findIndex(item => item.id === historyItemId);
          
          if (existingItemIndex !== -1) {
            // Mettre à jour l'élément existant
            historyArray[existingItemIndex] = {
              ...historyArray[existingItemIndex],
              progress: progress,
              lastWatchedAt: new Date().toISOString()
            };
          } else {
            // Ajouter un nouvel élément
            historyArray.unshift({
              id: historyItemId,
              title: series.title,
              imageUrl: episode.imageUrl || series.imageUrl,
              lastWatchedAt: new Date().toISOString(),
              progress: progress,
              duration: duration || episode.duration || 1800,
              episodeInfo: {
                season: seasonNumber || 1,
                episode: parseInt(episodeId),
                title: episode.title
              },
              type: 'Anime' as const
            });
          }
          
          // Sauvegarder l'historique mis à jour
          localStorage.setItem('animeWatchHistory', JSON.stringify(historyArray));
        }
      } catch (e) {
        console.error("Erreur lors de la sauvegarde de la progression du film:", e);
      }
    }
  };
  
  // Fonction pour charger la progression du film depuis le localStorage
  const loadFilmProgressFromLocalStorage = () => {
    if (series.type === "Film") {
      try {
        // Clé unique pour ce film
        const storageKey = `film_progress_${series.id}_${episodeId}${seasonNumber ? `_s${seasonNumber}` : ''}`;
        
        // Récupérer les données de progression
        const savedProgress = localStorage.getItem(storageKey);
        
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress);
          
          // Mettre à jour l'état avec la progression sauvegardée
          if (progressData.progress > 0) {
            setCurrentTime(progressData.progress);
            setDuration(progressData.duration);
            setProgressPercentage((progressData.progress / progressData.duration) * 100);
            
            return progressData.progress;
          }
        }
      } catch (e) {
        console.error("Erreur lors du chargement de la progression du film:", e);
      }
      
      return 0;
    }
    
    return 0;
  };
  
  // Charger la progression du film au montage du composant
  useEffect(() => {
    // Si le temps est déjà défini dans l'URL, l'utiliser en priorité
    if (timeParam > 0) {
      setCurrentTime(timeParam);
      
      // Pour les films, sauvegarder immédiatement ce temps dans le localStorage
      if (series.type === "Film") {
        saveFilmProgressToLocalStorage(timeParam);
      }
      return;
    }
    
    // Sinon, pour les films, charger depuis le localStorage
    if (series.type === "Film") {
      loadFilmProgressFromLocalStorage();
    }
  }, [series.type, timeParam]);
  
  // Récupérer les informations de progression depuis l'historique
  useEffect(() => {
    // Pour les films, on a déjà chargé la progression depuis le localStorage
    if (series.type === "Film") {
      return;
    }
    
    const historyItemId = `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
    const historyItem = watchHistory.find(item => item.id === historyItemId);
    
    if (historyItem) {
      setCurrentTime(historyItem.progress);
      setDuration(historyItem.duration);
      setProgressPercentage((historyItem.progress / historyItem.duration) * 100);
      // Ne pas définir directement le currentTime ici, on le fera dans onLoadedMetadata
    }
  }, [series.id, episodeId, seasonNumber, watchHistory, series.type]);
  
  // Mettre à jour la progression toutes les 5 secondes
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        const newTime = Math.floor(videoRef.current.currentTime);
        const videoDuration = Math.floor(videoRef.current.duration) || duration;
        
        // Mise à jour simple des états
        setCurrentTime(newTime);
        setDuration(videoDuration);
        setProgressPercentage((newTime / videoDuration) * 100);
        
        // Pour les films, sauvegarder directement dans le localStorage
        if (series.type === "Film") {
          saveFilmProgressToLocalStorage(newTime);
        } else {
          // Mettre à jour dans l'historique normal pour les séries
          const historyItemId = `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`;
          updateWatchProgress(historyItemId, newTime);
        }
      }
    }, 5000); // Intervalle plus long pour éviter les mises à jour trop fréquentes
    
    return () => clearInterval(updateInterval);
  }, [series.id, episodeId, seasonNumber, duration, updateWatchProgress, series.type]);
  
  // Gérer les événements de la vidéo - simplifier pour éviter les boucles
  const handleVideoTimeUpdate = () => {
    // Ne pas mettre à jour trop souvent pour éviter les boucles
    if (videoRef.current) {
      // Mise à jour occasionnelle pour l'affichage uniquement
      const newTime = Math.floor(videoRef.current.currentTime);
      const videoDuration = Math.floor(videoRef.current.duration);
      
      // Seulement si le changement est significatif (revenir à la version originale)
      if (Math.abs(newTime - currentTime) > 5) {
        setCurrentTime(newTime);
        setDuration(videoDuration);
        setProgressPercentage((newTime / videoDuration) * 100);
        
        // Pour les films, sauvegarder lors de changements significatifs
        if (series.type === "Film" && newTime > 0) {
          saveFilmProgressToLocalStorage(newTime);
        }
      }
    }
  };
  
  // Effet pour mettre à jour la clé du lecteur quand on change d'épisode
  useEffect(() => {
    // Créer la clé une seule fois au montage du composant pour cet épisode
    const uniqueKey = `${rawId}-${episodeId}-${seasonNumber || 0}-${Math.random().toString(36).substring(2, 9)}`;
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
        // Pause et nettoyage de la vidéo
        currentVideoRef.pause();
        currentVideoRef.src = '';
        currentVideoRef.load();
      }
      
      // Réinitialiser les références
      iframeRefs.current = [];
    };
  }, [rawId, episodeId, seasonNumber]);

  // Ajouter un gestionnaire pour les messages des iframes
  useEffect(() => {
    // Fonction pour gérer les messages des iframes
    const handleIframeMessage = (event: MessageEvent) => {
      // Vérifier si le message vient d'un lecteur vidéo
      if (event.data && event.data.event === 'videoReady') {
        // Si la vidéo est prête et qu'on a un temps sauvegardé, on essaie de positionner la vidéo
        if (currentTime > 0) {
          try {
            event.source?.postMessage({ action: 'seek', time: currentTime }, '*' as any);
          } catch (e) {
            console.log("Impossible d'envoyer le message au lecteur vidéo", e);
          }
        }
      }
    };

    // Ajouter l'écouteur d'événements
    window.addEventListener('message', handleIframeMessage);

    // Nettoyer l'écouteur d'événements
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [currentTime]);

  // Ajouter à l'historique
  useEffect(() => {
    // Ne pas créer d'entrée d'historique à zéro pour les films
    // car cela est déjà géré par l'effet ensureMovieInHistory
    if (series.type === "Film" && currentTime === 0) {
      return;
    }
    
    // Utiliser une référence pour éviter des mises à jour en cascade
    const historyItem = {
      id: `${series.id}-${episodeId}${seasonNumber ? `-s${seasonNumber}` : ''}`,
      title: series.title,
      imageUrl: episode.imageUrl || series.imageUrl,
      lastWatchedAt: new Date().toISOString(),
      progress: currentTime || 0,
      duration: duration || episode.duration || 1800,
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
  }, [series.id, episodeId, seasonNumber, currentTime, duration, addToWatchHistory, series.type]);
  
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

    // Rechercher d'abord l'élément vidéo ou iframe à l'intérieur du conteneur
    // iOS nécessite que l'élément vidéo/iframe soit directement mis en plein écran
    const videoElement = videoContainer.querySelector('video') as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitSupportsFullscreen?: boolean;
      webkitDisplayingFullscreen?: boolean;
    };
    const iframeElement = videoContainer.querySelector('iframe');
    const targetElement = videoElement || iframeElement || videoContainer;

    try {
      // Vérifier si on est sur iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      // Solution spécifique pour Safari sur iOS
      if (isIOS || isSafari) {
        if (videoElement) {
          // Vérifier si la vidéo est déjà en plein écran (Safari)
          const isVideoFullscreen = videoElement.webkitDisplayingFullscreen;
          
          if (!isVideoFullscreen) {
            // Activer le plein écran sur l'élément vidéo
            if (videoElement.webkitEnterFullscreen) {
              videoElement.webkitEnterFullscreen();
              return;
            } else if (videoElement.webkitSupportsFullscreen) {
              // Alternative pour certaines versions
              videoElement.play().then(() => {
                setTimeout(() => {
                  if (videoElement.webkitEnterFullscreen) {
                    videoElement.webkitEnterFullscreen();
                  }
                }, 100);
              }).catch(err => {
                console.error("Erreur lors de la lecture vidéo pour plein écran:", err);
              });
              return;
            }
          }
        }
        
        // Solution pour les iframes sur iOS
        if (iframeElement) {
          // S'assurer que l'iframe a les bons attributs
          iframeElement.setAttribute('allowFullscreen', 'true');
          iframeElement.setAttribute('allow', 'fullscreen; autoplay');
          
          // Tenter de mettre l'iframe en plein écran
          try {
            if (iframeElement.requestFullscreen) {
              iframeElement.requestFullscreen();
              return;
            }
          } catch (e) {
            console.log("Erreur lors de la tentative de plein écran sur l'iframe:", e);
            
            // Si l'iframe contient une URL, essayer de l'ouvrir directement
            // Cela peut déclencher le plein écran natif du navigateur sur iOS
            const iframeSrc = iframeElement.getAttribute('src');
            if (iframeSrc) {
              // Stocker l'état actuel pour pouvoir revenir
              localStorage.setItem('lastWatchPosition', JSON.stringify({
                series: series.id,
                episode: episodeId,
                season: seasonNumber,
                time: currentTime
              }));
              
              // Ouvrir l'URL dans un nouvel onglet
              window.open(iframeSrc, '_blank');
              return;
            }
          }
        }
      }
      
      // Approche standard pour les autres navigateurs
      if (!document.fullscreenElement && 
          !(document as any).webkitFullscreenElement && 
          !(document as any).mozFullScreenElement &&
          !(document as any).msFullscreenElement) {
        
        // Méthodes standard pour les autres navigateurs
        if (targetElement.requestFullscreen) {
          targetElement.requestFullscreen();
        } else if ((targetElement as any).webkitRequestFullscreen) {
          (targetElement as any).webkitRequestFullscreen();
        } else if ((targetElement as any).mozRequestFullScreen) {
          (targetElement as any).mozRequestFullScreen();
        } else if ((targetElement as any).msRequestFullscreen) {
          (targetElement as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Erreur lors du passage en plein écran:", error);
      
      // Fallback pour iOS - tenter d'utiliser l'API de l'élément vidéo directement
      if (videoElement && videoElement.webkitEnterFullscreen) {
        try {
          videoElement.webkitEnterFullscreen();
        } catch (e) {
          console.error("Échec du fallback pour le plein écran:", e);
        }
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
            {series.title} - {seasonNumber ? `Saison ${seasonNumber}` : ''} {series.type === "Film" ? '' : `Épisode ${episode.id}: `}{episode.title}
          </h1>
          
          <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">
            {series.type === "Film" ? (
              <span>{series.runtime || "2h02"}</span>
            ) : (
              <span>Épisode {episode.id} / {totalEpisodes}</span>
            )}
            
            {/* Le temps de visionnage n'est plus affiché visuellement mais le système continue de fonctionner */}
          </div>
          
          {/* Lecteur vidéo */}
          <div className="flex justify-center" id="video-container" style={{ width: '100%' }}>
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden mb-3 sm:mb-6 shadow-2xl">
              {/* Boutons de navigation sur le lecteur - mode normal */}
              {!isFullScreen && (
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 sm:p-4 z-20">
                  <div>
                    {/* Bouton Plein écran - en haut à gauche - visible uniquement sur mobile */}
                    <button 
                      onClick={toggleFullScreen}
                      className="md:hidden flex items-center text-white bg-black/50 hover:bg-black/70 transition-colors px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm"
                    >
                      <Maximize className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Plein écran
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Bouton Épisode suivant - visible aussi en mode normal */}
                    {nextEpisode && series.type !== "Film" && (
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
                  <div>
                    {/* Bouton Plein écran - en haut à gauche en mode plein écran - visible uniquement sur mobile */}
                    <button 
                      onClick={toggleFullScreen}
                      className="md:hidden flex items-center text-white bg-black/70 hover:bg-black/90 transition-colors px-3 py-2 rounded-full text-sm shadow-lg"
                    >
                      <Maximize className="h-4 w-4 mr-1" />
                      Quitter
                    </button>
                  </div>
                  
                  {nextEpisode && series.type !== "Film" && (
                    <Link href={`/series/${series.id}/watch/${nextEpisode.id}${seasonNumber ? `?season=${seasonNumber}` : ''}`} className="flex items-center text-white bg-black/70 hover:bg-black/90 transition-colors px-3 py-2 rounded-full text-sm shadow-lg">
                      Épisode suivant
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              )}
              
              <div className="w-full h-full" key={playerKey}>
                {episode.videoUrl.includes('dood.wf') ? (
                  <div className="relative w-full h-full">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`${episode.videoUrl}${episode.videoUrl.includes('?') ? '&' : '?'}currentTime=${currentTime}&autoplay=0`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="fullscreen; autoplay; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.includes('filemoon.sx') ? (
                  <div className="relative w-full h-full">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`${episode.videoUrl}${episode.videoUrl.includes('?') ? '&' : '?'}currentTime=${currentTime}&autoplay=0`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="fullscreen; autoplay; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.includes('iframe.mediadelivery.net') ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#030711]">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`${episode.videoUrl}${episode.videoUrl.includes('?') ? '&' : '?'}currentTime=${currentTime}&autoplay=0`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.includes('beerscloud.com') ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#030711]">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`${episode.videoUrl}${episode.videoUrl.includes('?') ? '&' : '?'}currentTime=${currentTime}&autoplay=0`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : !episode.videoUrl.includes('http') ? (
                  <div className="relative w-full h-full">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`https://video.sibnet.ru/shell.php?videoid=${episode.videoUrl}&skin=4&share=1${currentTime > 0 ? `&start=${currentTime}` : ''}&autoplay=0`}
                      className="absolute inset-0"
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="fullscreen; autoplay; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        zIndex: 1
                      }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.includes('vidmoly.to') ? (
                  <div className="relative w-full h-full">
                    {/* Suppression du message de reprise */}
                    <iframe 
                      ref={addIframeRef}
                      src={`${episode.videoUrl}${episode.videoUrl.includes('?') ? '&' : '?'}currentTime=${currentTime}&autoplay=0`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                      referrerPolicy="no-referrer"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.endsWith('.m3u8') || episode.videoUrl.includes('master.m3u8') ? (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/80 loading-overlay transition-opacity duration-500">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-white text-lg font-medium">Chargement de la source...</p>
                        <p className="text-gray-400 text-sm mt-2">Veuillez patienter pendant que la vidéo se charge</p>
                        <p className="text-blue-400 text-sm mt-3">Cela prend entre 5 à 10 secondes</p>
                      </div>
                    </div>
                    <iframe 
                      src={`https://www.hlsplayer.org/play?url=${encodeURIComponent(episode.videoUrl)}`}
                      className="w-full h-full" 
                      frameBorder="0" 
                      scrolling="no" 
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      onLoad={() => {
                        // Masquer le message de chargement quand l'iframe est chargée
                        const loadingEl = document.querySelector('.loading-overlay');
                        if (loadingEl) {
                          loadingEl.classList.add('opacity-0');
                          setTimeout(() => {
                            if (loadingEl instanceof HTMLElement) {
                              loadingEl.classList.add('hidden');
                            }
                          }, 500);
                        }
                      }}
                    ></iframe>
                  </div>
                ) : episode.videoUrl.endsWith('.mp4') || episode.videoUrl.includes('cloudflarestorage') || episode.videoUrl.includes('cineburger.xyz') ? (
                  <video 
                    ref={videoRef}
                    src={episode.videoUrl} 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay={true} 
                    playsInline
                    webkit-playsinline="true"
                    x-webkit-airplay="allow"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={(e) => {
                      // Définir la position de lecture au chargement de la vidéo
                      // mais seulement une fois que la vidéo est chargée
                      const video = e.currentTarget;
                      
                      // Pour les films, essayer de charger la progression depuis le localStorage ou l'URL
                      if (series.type === "Film") {
                        // Si le temps est défini dans l'URL, l'utiliser en priorité
                        if (timeParam > 0) {
                          video.currentTime = timeParam;
                        } else {
                          // Sinon, essayer de charger depuis le localStorage
                          const savedProgress = loadFilmProgressFromLocalStorage();
                          if (savedProgress > 0) {
                            video.currentTime = savedProgress;
                          }
                        }
                      } else if (currentTime > 0) {
                        // Pour les séries, utiliser le système d'historique normal
                        video.currentTime = currentTime;
                      }
                      
                      // Suppression de la notification "Reprise à"
                    }}
                    onPlay={() => {
                      // Pour les films, sauvegarder l'état de lecture au démarrage
                      if (series.type === "Film" && videoRef.current) {
                        const newTime = Math.floor(videoRef.current.currentTime);
                        if (newTime > 0) {
                          saveFilmProgressToLocalStorage(newTime);
                        }
                      }
                    }}
                    onPause={() => {
                      // Pour les films, sauvegarder l'état de lecture à la pause
                      if (series.type === "Film" && videoRef.current) {
                        const newTime = Math.floor(videoRef.current.currentTime);
                        if (newTime > 0) {
                          saveFilmProgressToLocalStorage(newTime);
                        }
                      }
                    }}
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

      <SeriesFooter />
      
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