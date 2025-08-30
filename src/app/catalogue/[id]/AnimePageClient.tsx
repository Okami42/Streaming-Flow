"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomImage from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Heart, Info, List, Play, Share2, Star, ChevronDown } from "lucide-react";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { Anime, AnimeEpisode, getAllAnimes } from "@/lib/animeData";
import VideoPlayer from "@/components/ui/video-player";
import HLSPlayer from '@/components/ui/hls-player';
import { getProxiedStreamUrl } from "@/lib/utils";
import { WatchHistoryItem } from "@/lib/history";
import MovearnPlayer from "@/components/ui/movearn-player";
import AnimeEpisodeCard from "@/components/AnimeEpisodeCard";
import { getSeasonTitle, getFilmTitle, getFilmSeasonIndex } from "@/lib/filmTitles";

// Fonction pour déterminer la saison initiale
const getInitialSeason = (anime: Anime | undefined) => {
  if (!anime) return 1;
  
  // Si l'anime est de type "Movie" et n'a pas de seasons, c'est un film
  if (anime.type === "Movie" && (!anime.seasons || anime.seasons.length === 0)) {
    return 'Film';
  }
  
  // Si pas de saisons, utiliser la structure episodes directement
  if (!anime.seasons || anime.seasons.length === 0) return 1;
  
  // Vérifier s'il y a des saisons normales (numérotées)
  const normalSeasons = anime.seasons.filter(s => 
    typeof s.seasonNumber === 'number' || 
    (typeof s.seasonNumber === 'string' && !isNaN(Number(s.seasonNumber)) && String(s.seasonNumber) !== 'Film')
  );
  
  // S'il y a des saisons normales, commencer par la saison 1
  if (normalSeasons.length > 0) {
    return 1;
  }
  
  // Si seulement des saisons film, commencer par Film
  const filmSeasons = anime.seasons.filter(s => String(s.seasonNumber) === 'Film');
  if (filmSeasons.length > 0) {
    return 'Film';
  }
  
  // Vérifier si l'animé n'a qu'une seule saison ET que c'est un film
  if (anime.seasons.length === 1) {
    const onlySeason = anime.seasons[0];
    if (String(onlySeason.seasonNumber) === 'Film' || String(onlySeason.title).toLowerCase().includes('film')) {
      return 'Film';
    }
  }
  
  return 1;
};

export default function AnimePageClient({ anime }: { anime: Anime | undefined }) {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<number | string>(getInitialSeason(anime));
  const [selectedLanguage, setSelectedLanguage] = useState<"vo" | "vf">("vo");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  
  // Récupérer les paramètres d'URL
  const searchParams = useSearchParams();
  
  // Effet pour lire les paramètres d'URL et définir l'épisode et la saison
  useEffect(() => {
    if (!searchParams) return;
    
    // Récupérer les paramètres d'URL
    const seasonParam = searchParams.get('season');
    const episodeParam = searchParams.get('episode');
    
    console.log("Paramètres URL détectés:", { seasonParam, episodeParam });
    
    // Définir la saison si elle est spécifiée dans l'URL
    if (seasonParam) {
      const seasonValue = isNaN(Number(seasonParam)) ? seasonParam : Number(seasonParam);
      console.log("Définition de la saison depuis l'URL:", seasonValue);
      setSelectedSeason(seasonValue);
    }
    
    // Définir l'épisode si il est spécifié dans l'URL
    if (episodeParam && !isNaN(Number(episodeParam))) {
      const episodeNumber = Number(episodeParam);
      console.log("Définition de l'épisode depuis l'URL:", episodeNumber);
      setSelectedEpisode(episodeNumber);
    }
  }, [searchParams]);
  
  // Effet pour mettre à jour la saison sélectionnée quand l'anime change
  useEffect(() => {
    if (!anime) return;
    
    // Ne pas override si une saison a été sélectionnée via l'URL
    if (searchParams?.get('season')) return;
    
    const initialSeason = getInitialSeason(anime);
    if (initialSeason !== selectedSeason) {
      setSelectedSeason(initialSeason);
    }
  }, [anime, searchParams]); // Retiré selectedSeason des dépendances pour éviter la boucle

  // Effet pour forcer la re-sélection de l'épisode quand les données d'auto-import arrivent
  useEffect(() => {
    if (!anime) return;
    
    // Vérifier si l'anime a maintenant des saisons/épisodes (après auto-import)
    const hasEpisodes = anime.seasons && anime.seasons.length > 0 && anime.seasons[0].episodes.length > 0;
    
    if (hasEpisodes) {
      // Vérifier si l'épisode actuellement sélectionné existe dans les nouvelles données
      const currentSeason = anime.seasons?.find(s => String(s.seasonNumber) === String(selectedSeason));
      const currentEpisode = currentSeason?.episodes.find(ep => ep.number === selectedEpisode);
      
      // Si l'épisode n'existe pas (typique après auto-import), forcer la sélection de l'épisode 1
      if (!currentEpisode && currentSeason && currentSeason.episodes.length > 0) {
        console.log("🔄 Auto-import détecté: re-sélection de l'épisode 1");
        setSelectedEpisode(1);
      }
    }
  }, [anime?.seasons, selectedSeason, selectedEpisode]);
  
  // Récupérer les fonctions du hook useHistory
  const { addToWatchHistory, updateWatchProgress, watchHistory } = useHistory();
  
  // Utiliser le hook de favoris au lieu d'un état local
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const animeFavoriteId = anime ? `anime-${anime.id}` : '';
  const isAnimeFavorite = isFavorite(animeFavoriteId);
  
  const [showInfo, setShowInfo] = useState(false);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  
  // Utiliser UNIQUEMENT des refs pour le timing pour éviter les boucles de rendu
  const currentTimeRef = React.useRef(0);
  const lastSavedTimeRef = React.useRef(0);
  const isPlayingRef = React.useRef(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timeDisplayRef = React.useRef("00:00");
  
  // État UI pour forcer le rendu uniquement quand nécessaire
  const [renderKey, setRenderKey] = useState(0);
  const sibnetOverlayRef = React.useRef<HTMLDivElement>(null);
  
  // État pour afficher l'en-tête de section
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Utilisé pour l'URL
  const selectedSeasonNumber = typeof selectedSeason === 'string' 
    ? isNaN(parseInt(selectedSeason, 10)) ? selectedSeason : parseInt(selectedSeason, 10) 
    : selectedSeason;
  
  // Déterminer si nous utilisons la structure de saisons
  const useSeasonsStructure = anime?.seasons && anime.seasons.length > 0;
  
  // Récupérer la saison actuelle si disponible
  const currentSeason = useSeasonsStructure 
    ? anime?.seasons?.find(s => String(s.seasonNumber) === String(selectedSeason))
    : null;
    
  // Fonction pour récupérer les épisodes selon la structure
  const getEpisodes = (seasonNumber: number | string) => {
    if (!anime || !anime.seasons) return [];
    
    const season = anime.seasons.find(s => String(s.seasonNumber) === String(seasonNumber));
    if (!season) return [];
    
    // Filter episodes for VF tab
    if (selectedLanguage === 'vf') {
      // Solo Leveling saison 2 : seulement les 9 premiers épisodes
      if (anime.id === 'solo-leveling-2') {
        return season.episodes.filter(ep => ep.number <= 9);
      }
      // Solo Leveling saison 1 : tous les épisodes (jusqu'à 12)
      if (anime.id === 'solo-leveling' && seasonNumber === 1) {
        return season.episodes.filter(ep => ep.number <= 12);
      }
    }
    
    // VOSTFR ou autres animes: tous les épisodes
    return season.episodes;
  };

  // Fonction pour vérifier si la saison actuelle a des épisodes en VF
  const hasVFEpisodes = () => {
    if (!anime) return false;
    
    const episodes = useSeasonsStructure 
      ? getEpisodes(String(selectedSeason))
      : (anime.episodes || []);
    
    // Vérifier si au moins un épisode a des sources VF
    return episodes.some(episode => 
      episode.sibnetVfId || 
      episode.vidmolyVfId || 
      episode.vidmolyVfUrl || 
      episode.movearnVfUrl ||
      episode.mp4VfUrl ||
      episode.sendvidVfId
    );
  };

  // S'assurer que la langue sélectionnée est valide
  React.useEffect(() => {
    if (!hasVFEpisodes() && selectedLanguage === 'vf') {
      setSelectedLanguage('vo');
    }
  }, [selectedSeason, selectedLanguage]);
    
  // Récupérer l'épisode actuel selon la structure utilisée
  const episode = useSeasonsStructure
    ? anime?.seasons?.find(s => String(s.seasonNumber) === String(selectedSeason))?.episodes.find(ep => ep.number === selectedEpisode)
    : anime?.episodes?.find(ep => ep.number === selectedEpisode);

  // Effet pour forcer le re-render quand la langue change
  React.useEffect(() => {
    // Forcer un re-render pour s'assurer que les changements sont appliqués
    setRenderKey(prev => prev + 1);
  }, [selectedLanguage, episode?.sibnetVfId, episode?.sibnetVostfrId, episode?.vidmolyVfId, episode?.vidmolyId]);

  // Obtenir la liste des épisodes à afficher
  const episodesToShow = useSeasonsStructure
    ? getEpisodes(String(selectedSeason))
    : (anime?.episodes || []);

  // Fonction pour mettre à jour l'affichage du temps sans affecter la logique
  const updateTimeDisplay = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplayRef.current = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    // Forcer un rendu uniquement toutes les 5 secondes
    if (seconds % 5 === 0) {
      setRenderKey(prev => prev + 1);
    }
  };

  // Fonction pour sauvegarder le temps dans l'historique
  const saveTime = (forceUpdate = false) => {
    if (!anime || !episode) return;
    
    const currentTime = currentTimeRef.current;
    const lastSaved = lastSavedTimeRef.current;
    
    // Ne sauvegarder que si le temps a changé significativement ou si forcé
    if (forceUpdate || (currentTime > 0 && Math.abs(currentTime - lastSaved) >= 5)) {
      // Identifiant avec ou sans saison
      const episodeId = useSeasonsStructure
        ? `${anime.id}-s${selectedSeason}e${episode.number}`
        : `${anime.id}-e${episode.number}`;
        
      updateWatchProgress(episodeId, currentTime);
      lastSavedTimeRef.current = currentTime;
      console.log("Temps sauvegardé:", currentTime);
    }
  };
  
  // Fonction pour démarrer/arrêter le timer pour l'iframe
  const startTrackingTime = (playing: boolean) => {
    // Toujours nettoyer l'intervalle existant
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Mettre à jour l'état de lecture
    isPlayingRef.current = playing;
    
    // Si on met en pause, sauvegarder immédiatement
    if (!playing) {
      saveTime(true);
      console.log("Timer arrêté manuellement");
      return;
    }
    
    // Uniquement si on démarre la lecture et que c'est l'épisode 1 en VOSTFR
    if (selectedEpisode === 1 && selectedLanguage === "vo") {
      console.log("Démarrage du timer");
      
      // Variable pour suivre le dernier temps connu
      let lastTrackedTime = currentTimeRef.current;
      let stagnantCount = 0;
      
      // Débuter l'intervalle pour suivre le temps
      intervalRef.current = setInterval(() => {
        // Vérifier que l'on est toujours en lecture
        if (!isPlayingRef.current) {
          console.log("Arrêt du timer car l'état de lecture est faux");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }
        
        // Vérifier si le temps stagne (signe possible que la vidéo est en pause)
        if (lastTrackedTime === currentTimeRef.current) {
          stagnantCount++;
          
          // Si le temps n'a pas changé pendant 3 secondes consécutives alors que nous sommes en lecture
          if (stagnantCount >= 3) {
            console.log("Le timer détecte que le temps stagne, probable pause");
            
            // Mettre à jour l'état
            isPlayingRef.current = false;
            
            // Arrêter l'intervalle
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            
            // Sauvegarder le temps
            saveTime(true);
            return;
          }
        } else {
          // Réinitialiser le compteur si le temps change
          stagnantCount = 0;
          lastTrackedTime = currentTimeRef.current;
        }
        
        // Incrémenter le temps
        currentTimeRef.current += 1;
        
        // Sauvegarder dans l'historique toutes les 15 secondes
        if (currentTimeRef.current % 15 === 0) {
          saveTime(true);
        }
      }, 1000);
    }
    
    // Forcer un rendu pour mettre à jour l'UI
    setRenderKey(prev => prev + 1);
  };
  
  // Nettoyer l'intervalle lorsque l'épisode ou la langue change
  useEffect(() => {
    // Au changement d'épisode/langue, réinitialiser le suivi
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Réinitialiser les compteurs pour le nouvel épisode
    currentTimeRef.current = 0;
    lastSavedTimeRef.current = 0;
    isPlayingRef.current = false;
    timeDisplayRef.current = "00:00";
    setRenderKey(prev => prev + 1);
    
    // Uniquement pour les vidéos Sibnet (iframe)
    if (selectedEpisode === 1 && selectedLanguage === "vo") {
      // Écouteur simplifié pour détecter les interactions qui pourraient indiquer une pause
      const detectPause = () => {
        // Attendre un court instant pour laisser le temps à la vidéo de se mettre en pause
        setTimeout(() => {
          // Si on pense être en lecture, vérifier si le temps progresse correctement
          if (isPlayingRef.current) {
            const lastTime = currentTimeRef.current;
            
            // Vérifier dans 1 seconde si le temps a changé
            setTimeout(() => {
              // Si on est toujours en mode lecture mais que le temps n'a pas changé, c'est que la vidéo est en pause
              if (isPlayingRef.current && lastTime === currentTimeRef.current) {
                console.log("Pause détectée: le temps n'avance plus");
                
                // Arrêter le timer
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
                
                // Mettre à jour l'état de lecture
                isPlayingRef.current = false;
                
                // Sauvegarder le temps actuel
                saveTime(true);
              }
            }, 1000);
          }
        }, 100);
      };
      
      // Fonction pour détecter quand l'utilisateur change d'onglet/fenêtre
      const handleVisibilityChange = () => {
        if (document.hidden && isPlayingRef.current) {
          console.log("Onglet/fenêtre non visible, pause probable");
          
          // On considère que la vidéo est en pause si l'utilisateur change d'onglet
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Mettre à jour l'état de lecture
          isPlayingRef.current = false;
          
          // Sauvegarder le temps actuel
          saveTime(true);
        }
      };
      
      // Fonction pour détecter quand la fenêtre perd le focus
      const handleBlur = () => {
        if (isPlayingRef.current) {
          console.log("Fenêtre a perdu le focus, pause probable");
          
          // On considère que la vidéo est en pause si la fenêtre perd le focus
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Mettre à jour l'état de lecture
          isPlayingRef.current = false;
          
          // Sauvegarder le temps actuel
          saveTime(true);
        }
      };
      
      // Ajouter un écouteur plus agressif qui vérifie régulièrement si le temps avance
      const pauseDetectionInterval = setInterval(() => {
        if (isPlayingRef.current) {
          const currentTime = currentTimeRef.current;
          
          // Vérifier dans 2 secondes si le temps a changé
          setTimeout(() => {
            // Si nous sommes toujours en mode lecture mais que le temps n'a pas changé
            if (isPlayingRef.current && currentTime === currentTimeRef.current) {
              // Probable pause
              console.log("Pause auto-détectée par intervalle de vérification");
              
              // Arrêter le timer
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              
              // Mettre à jour l'état
              isPlayingRef.current = false;
              
              // Sauvegarder le temps
              saveTime(true);
            }
          }, 2000);
        }
      }, 5000);
      
      // Ajouter des écouteurs pour les interactions utilisateur qui pourraient indiquer une pause
      window.addEventListener('click', detectPause);
      window.addEventListener('keydown', detectPause);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      
      return () => {
        // Nettoyer les écouteurs au démontage
        window.removeEventListener('click', detectPause);
        window.removeEventListener('keydown', detectPause);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        clearInterval(pauseDetectionInterval);
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedEpisode, selectedLanguage]);

  // Effet séparé pour ajouter à l'historique - pas de dépendance à startTrackingTime
  useEffect(() => {
    // Ajouter l'entrée à l'historique pour le nouvel épisode sélectionné
    if (anime && episode) {
      const timer = setTimeout(() => {
        // Identifiant avec ou sans saison
        const episodeId = useSeasonsStructure
          ? `${anime.id}-s${selectedSeason}e${episode.number}`
          : `${anime.id}-e${episode.number}`;
          
        // Identifiant de base de l'anime (sans numéro d'épisode)
        const baseAnimeId = anime.id;
        
        // Vérifier si l'entrée existe déjà dans l'historique
        const existingEntry = watchHistory.find(item => item.id === episodeId);
        
        // Vérifier si un autre épisode du même anime existe déjà dans l'historique
        const anyEpisodeOfSameAnime = watchHistory.find(item => {
          const itemBaseId = item.id.split('-s')[0].split('-e')[0]; // Extraire l'ID de base
          return itemBaseId === baseAnimeId;
        });
        
        // Si un épisode du même anime existe déjà dans l'historique mais ce n'est pas celui-ci
        const isReplacingOtherEpisode = anyEpisodeOfSameAnime && anyEpisodeOfSameAnime.id !== episodeId;
        
        // Journalisation pour déboguer
        if (isReplacingOtherEpisode) {
          console.log(`Remplacement de l'épisode ${anyEpisodeOfSameAnime.episodeInfo.episode} par l'épisode ${episode.number} pour ${anime.title}`);
        }
        
        // Mise à jour de l'historique si l'épisode actuel est différent du dernier regardé
        // ou si la progression a changé
        if (!existingEntry || existingEntry.progress !== currentTimeRef.current || isReplacingOtherEpisode) {
          console.log(`Ajout à l'historique: ${episodeId} avec progression ${currentTimeRef.current}`);
          
          // Créer la nouvelle entrée d'historique
          const historyEntry = {
            id: episodeId,
            title: anime.title,
            imageUrl: anime.imageUrl,
            lastWatchedAt: new Date().toISOString(),
            progress: currentTimeRef.current,
            duration: 1440, // Default 24 minutes for anime episodes
            episodeInfo: {
              season: useSeasonsStructure ? (typeof selectedSeason === 'string' ? 1 : selectedSeason) : 1,
              episode: episode.number,
              title: episode.title,
            },
            type: "Anime" as 'Anime'
          };
          
          addToWatchHistory(historyEntry);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [anime, episode, selectedEpisode, selectedSeason, addToWatchHistory, useSeasonsStructure, watchHistory, currentTimeRef]);

  // Nettoyer l'intervalle et sauvegarder au démontage du composant
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      saveTime(true);
    };
  }, []);
  
  // Gestionnaires d'événements pour les éléments vidéo
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!e.target) return;
    
    const videoElement = e.target as HTMLVideoElement;
    const newTime = Math.floor(videoElement.currentTime);
    
    currentTimeRef.current = newTime;
    updateTimeDisplay(newTime);
    
    // Sauvegarder moins fréquemment pour éviter les mises à jour excessives
    if (newTime % 5 === 0) {
      saveTime();
    }
  };

  const handlePause = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!e.target) return;
    
    const videoElement = e.target as HTMLVideoElement;
    const time = Math.floor(videoElement.currentTime);
    
    currentTimeRef.current = time;
    updateTimeDisplay(time);
    isPlayingRef.current = false;
    setRenderKey(prev => prev + 1);
    
    // Toujours sauvegarder lors d'une pause
    saveTime(true);
    
    // S'assurer que l'intervalle est arrêté
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    isPlayingRef.current = true;
    setRenderKey(prev => prev + 1);
  };

  // Fonction pour forcer la mise à jour de la progression
  const forceUpdateProgress = () => {
    saveTime(true);
  };

  // Fonction pour basculer la lecture pour l'iframe
  const togglePlayState = () => {
    const newPlayingState = !isPlayingRef.current;
    
    // Si on passe en pause, s'assurer que l'intervalle est arrêté
    if (!newPlayingState && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      
      // Sauvegarder l'état actuel lors de la mise en pause
      saveTime(true);
      console.log("Mise en pause manuelle : temps arrêté à", currentTimeRef.current);
    }
    
    // Mettre à jour l'état de lecture
    isPlayingRef.current = newPlayingState;
    
    // Si on démarre la lecture, commencer le suivi du temps
    if (newPlayingState) {
      // Démarrer le suivi du temps avec le timer
      startTrackingTime(true);
      console.log("Lecture démarrée par l'utilisateur à", currentTimeRef.current);
      
      try {
        // Pour l'épisode 1, on doit forcer la lecture de l'iframe
        if (selectedEpisode === 1 && selectedLanguage === "vo") {
          console.log("Démarrage de la vidéo");
          
          // Force le focus sur l'iframe pour faciliter l'interaction
          const iframe = document.querySelector('iframe');
          if (iframe) {
            // Au lieu d'utiliser un détecteur de clics qui bloque l'interaction,
            // on va surveiller les événements de l'iframe directement
            
            // Ajouter un écouteur sur la fenêtre pour détecter les clics
            const clickHandler = () => {
              // Après un clic, vérifier si le temps progresse après un court délai
              setTimeout(() => {
                const timeBeforeCheck = currentTimeRef.current;
                
                setTimeout(() => {
                  // Si le temps n'a pas changé mais qu'on est censé être en lecture
                  if (isPlayingRef.current && timeBeforeCheck === currentTimeRef.current) {
                    // Probable pause
                    console.log("Pause détectée après clic");
                    
                    // Arrêter le timer
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                      intervalRef.current = null;
                    }
                    
                    // Mettre à jour l'état
                    isPlayingRef.current = false;
                    
                    // Sauvegarder le temps
                    saveTime(true);
                  }
                }, 2000);
              }, 200);
            };
            
            // Ajouter l'écouteur à la fenêtre
            window.addEventListener('click', clickHandler);
            
            // Nettoyer l'écouteur quand l'iframe est déchargée
            return () => {
              window.removeEventListener('click', clickHandler);
            };
          }
        }
      } catch (error) {
        console.error("Erreur lors de la tentative de démarrage de la vidéo:", error);
      }
    } else {
      // Stopper le suivi du temps
      startTrackingTime(false);
      console.log("Lecture arrêtée par l'utilisateur à", currentTimeRef.current);
    }
    
    // Forcer un rendu pour mettre à jour l'UI
    setRenderKey(prev => prev + 1);
  };

  // Fonction pour obtenir l'avancement d'un épisode
  const getEpisodeProgress = (seasonNumber: number | string, episodeNumber: number) => {
    if (!anime) return null;
    
    // Identifiant avec ou sans saison
    const episodeId = useSeasonsStructure
      ? `${anime.id}-s${seasonNumber}e${episodeNumber}`
      : `${anime.id}-e${episodeNumber}`;
      
    const historyEntry = watchHistory.find(item => item.id === episodeId);
    if (!historyEntry) return null;
    
    return {
      progress: historyEntry.progress,
      duration: historyEntry.duration,
      percentage: (historyEntry.progress / historyEntry.duration) * 100
    };
  };

  // Récupérer les épisodes disponibles
  useEffect(() => {
    if (anime) {
      let episodes: AnimeEpisode[] = [];
      
      if (useSeasonsStructure) {
        episodes = getEpisodes(String(selectedSeason));
      } else {
        // Pour les autres animes sans saisons
        episodes = anime.episodes || [];
      }
      
      if (episodes.length > 0) {
        setTotalEpisodes(episodes.length);
      } else {
        setTotalEpisodes(0);
      }
    }
  }, [anime, selectedSeason, useSeasonsStructure, selectedLanguage]);

  // Déboguer l'ID vidmoly du film Kuroko
  useEffect(() => {
    if (anime?.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' && episode?.vidmolyId) {
      console.log("DEBUG Film Kuroko - ID vidmoly:", episode.vidmolyId);
    }
  }, [anime?.id, selectedSeason, episode?.vidmolyId]);

  // Fonction pour gérer l'ajout/retrait des favoris
  const handleFavoriteToggle = () => {
    if (!anime) return;
    
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

  // Fonction pour aller à l'épisode suivant
  const goToNextEpisode = () => {
    if (selectedEpisode < totalEpisodes) {
      setSelectedEpisode(prev => Math.min(totalEpisodes, prev + 1));
      
      // Faire défiler la page jusqu'au lecteur vidéo
      setTimeout(() => {
        document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  if (!anime) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-white">Anime non trouvé</h1>
            <p className="text-gray-400 mt-4">Cet anime n'existe pas dans notre catalogue.</p>
            <Link href="/catalogue">
              <Button className="mt-8">Retour au catalogue</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const videoId = selectedLanguage === "vo"
    ? episode?.sibnetVostfrId
    : episode?.sibnetVfId;
    
  // Définir des sources mp4 de démonstration
  const mp4Source = selectedLanguage === "vo"
    ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
    : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Banner - Cacher sur mobile, garder sur desktop */}
        <div className="relative hidden md:block h-[300px] w-full overflow-hidden">
          <CustomImage
            src={anime.bannerUrl || "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp"}
            alt={anime.title}
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/70 to-transparent" />
        </div>

        {/* Mobile layout - style Squid Game */}
        <div className="md:hidden">
          {/* Image principale avec overlay */}
          <div className="relative w-full" style={{ height: '60vh' }}>
            <CustomImage
              src={anime.imageUrl}
              alt={anime.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/60 to-transparent"></div>
            
            {/* Informations sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
              <h2 className="text-sm text-gray-400 mb-2">{anime.originalTitle} ({anime.year})</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.slice(0, 4).map((genre) => (
                  <span key={genre} className="inline-block px-2 py-0.5 text-xs bg-blue-600/40 text-blue-200 rounded-sm">
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 flex-wrap mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-400" />
                  <span className="text-sm">{anime.rating}/10</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm">{anime.year}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm">{anime.type}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm">{anime.status}</span>
                </div>
              </div>
              
              <div className="relative mb-4">
                <p className={`text-sm text-gray-300 ${!showInfo ? "line-clamp-3" : ""}`}>
                  {anime.description}
                </p>
                {!showInfo && (
                  <button
                    className="w-full text-center mt-2 py-1 text-sm text-blue-400 bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors"
                    onClick={() => setShowInfo(true)}
                  >
                    Voir plus
                  </button>
                )}
                {showInfo && (
                  <button
                    className="w-full text-center mt-2 py-1 text-sm text-blue-400 bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors"
                    onClick={() => setShowInfo(false)}
                  >
                    Voir moins
                  </button>
                )}
              </div>
              
              <div className="flex gap-2 mb-2">
                <Button
                  className="flex-[2] theme-button"
                  onClick={() => {
                    document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Regarder
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10 bg-transparent hover:bg-white/10"
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isAnimeFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
                  {isAnimeFavorite ? "Favoris ✓" : "Favoris"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:-mt-20 relative z-10">
          {/* Anime info header - desktop only */}
          <div className="hidden md:flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-white/10 shadow-lg" style={{ minHeight: '300px', maxHeight: '300px' }}>
                <CustomImage
                  src={anime.imageUrl}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {anime.title}
              </h1>
              <h2 className="text-sm text-gray-400 mb-4">
                {anime.originalTitle} ({anime.year})
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{anime.rating}/10</span>
                </div>
                <div>{anime.type}</div>
                <div>{anime.status}</div>
              </div>

              <div className="relative">
                <p className={`text-gray-300 text-sm md:text-base ${!showInfo && "line-clamp-3"}`}>
                  {anime.description}
                </p>
                {!showInfo && (
                  <button
                    className="absolute bottom-0 right-0 bg-gradient-to-l from-[#030711] via-[#030711]/90 to-transparent px-2 text-sm text-blue-400"
                    onClick={() => setShowInfo(true)}
                  >
                    Voir plus
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Button
                  className="theme-button"
                  onClick={() => {
                    document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Regarder
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5"
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isAnimeFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
                  {isAnimeFavorite ? "Favoris ✓" : "Favoris"}
                </Button>
              </div>
            </div>
          </div>

          {/* Player section */}
          <div id="player-section" className="mb-12" key={`player-section-${selectedEpisode}-${selectedSeason}-${selectedLanguage}`}>
            {/* Interface style Solo Leveling */}
            <div className="bg-[#0f172a] rounded-xl overflow-hidden">
              {/* Barre supérieure avec sélecteurs - version desktop */}
              <div className="hidden md:flex justify-between items-center px-4 py-3 bg-[#151a2a] border-b border-white/10">
                <div className="flex gap-4 items-center">
                  {/* Sélecteur de saison */}
                  <div className="relative">
                    <button 
                      className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-white bg-[#1a1f35] rounded-md border border-white/10 w-full min-w-[160px]"
                      onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
                    >
                      {(() => {
                        // Si c'est un film (Movie) sans structure seasons
                        if (anime.type === "Movie" && (!anime.seasons || anime.seasons.length === 0)) {
                          return "Film";
                        }
                        
                        // Trouver la saison sélectionnée
                        const currentSeason = anime.seasons?.find(s => String(s.seasonNumber) === String(selectedSeason));

                        if (currentSeason) {
                          const seasonIndex = getFilmSeasonIndex(anime.seasons || [], currentSeason);
                          return getSeasonTitle(anime.id, currentSeason, seasonIndex);
                        }
                        
                        // Si c'est une saison Film mais qu'on ne trouve pas la saison
                        if (String(selectedSeason) === 'Film') {
                          return 'Films';
                        }
                        
                        return `Saison ${selectedSeason}`;
                      })()}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {isSeasonMenuOpen && anime.seasons && anime.seasons.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-[#1a1f35] rounded-md shadow-lg py-1 border border-white/10">
                        {anime.seasons?.map((season) => {
                          return (
                            <button
                              key={season.seasonNumber}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/20"
                              onClick={() => {
                                setSelectedSeason(season.seasonNumber);
                                setIsSeasonMenuOpen(false);
                                setSelectedEpisode(1);
                              }}
                            >
                              {getSeasonTitle(anime.id, season, getFilmSeasonIndex(anime.seasons || [], season))}
                            </button>
                          );
                        }) || (
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/20"
                            onClick={() => {
                              setIsSeasonMenuOpen(false);
                            }}
                          >
                            Saison 1
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Sélecteur d'épisode */}
                  <div className="relative">
                    <button 
                                             className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-white bg-[#1a1f35] rounded-md border border-white/10 w-full min-w-[200px]"
                      onClick={() => document.getElementById("episode-selector-desktop")?.click()}
                    >
                      {episode?.title || `Épisode ${selectedEpisode}`}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <select 
                      id="episode-selector-desktop"
                      value={selectedEpisode}
                      onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                      className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                      style={{ backgroundColor: '#1a1f35', color: 'white' }}
                    >
                      {episodesToShow.map((ep) => (
                        <option key={ep.number} value={ep.number} style={{ backgroundColor: '#1a1f35', color: 'white' }}>
                          {ep.title || `Épisode ${ep.number}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Sélecteur VO/VF */}
                <div className="flex items-center bg-[#1a1f35] rounded-md overflow-hidden border border-white/10">
                  <button 
                    className={`px-6 py-2 text-sm font-medium ${selectedLanguage === 'vo' ? 'bg-[#0f172a] text-white' : 'text-gray-400 hover:text-white'} ${!hasVFEpisodes() ? 'rounded-md' : ''}`}
                    onClick={() => setSelectedLanguage('vo')}
                  >
                    VO
                  </button>
                  {hasVFEpisodes() && (
                    <button 
                      className={`px-6 py-2 text-sm font-medium ${selectedLanguage === 'vf' ? 'bg-[#0f172a] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setSelectedLanguage('vf')}
                    >
                      VF
                    </button>
                  )}
                </div>
              </div>
              
              {/* Barre supérieure avec sélecteurs - version mobile */}
              <div className="md:hidden flex flex-col bg-[#0f172a] gap-2 p-2">
                <div className="flex gap-2">
                  {/* Sélecteur de saison */}
                  <div className="relative flex-1">
                    <button 
                      className="flex items-center justify-between w-full px-4 py-3 text-white bg-[#1e2332] rounded-md border border-white/10"
                      onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
                    >
                      <span>
                        {(() => {
                          // Si c'est un film (Movie) sans structure seasons
                          if (anime.type === "Movie" && (!anime.seasons || anime.seasons.length === 0)) {
                            return "Film";
                          }
                          
                          if (useSeasonsStructure && anime.seasons) {
                            const currentSeason = anime.seasons.find(s => String(s.seasonNumber) === String(selectedSeason));
                            if (currentSeason) {
                              const seasonIndex = getFilmSeasonIndex(anime.seasons || [], currentSeason);
                              return getSeasonTitle(anime.id, currentSeason, seasonIndex);
                            }
                          }
                          
                          // Si c'est une saison Film mais qu'on ne trouve pas la saison
                          if (String(selectedSeason) === 'Film') {
                            return 'Films';
                          }
                          
                          return `Saison ${selectedSeason}`;
                        })()}
                      </span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    
                    {isSeasonMenuOpen && anime.seasons && anime.seasons.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-[#11141f] rounded-md shadow-lg py-1 border border-white/10">
                        {anime.seasons?.map((season) => (
                          <button
                            key={season.seasonNumber}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-600/20"
                            onClick={() => {
                              setSelectedSeason(season.seasonNumber);
                              setIsSeasonMenuOpen(false);
                              setSelectedEpisode(1);
                            }}
                          >
                            {season.title}
                          </button>
                        )) || (
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-600/20"
                            onClick={() => {
                              setIsSeasonMenuOpen(false);
                            }}
                          >
                            Saison 1
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Sélecteur VO/VF */}
                  {hasVFEpisodes() ? (
                    <div className="relative w-20">
                      <button 
                        className="flex items-center justify-between w-full px-3 py-3 text-white bg-[#1e2332] rounded-md border border-white/10"
                        onClick={() => document.getElementById("language-selector")?.click()}
                      >
                        <span>{selectedLanguage.toUpperCase()}</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                      <select
                        id="language-selector"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value as "vo" | "vf")}
                        className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                        style={{ backgroundColor: '#1a1f35', color: 'white' }}
                      >
                        <option value="vo" style={{ backgroundColor: '#1a1f35', color: 'white', padding: '8px' }}>VO</option>
                        <option value="vf" style={{ backgroundColor: '#1a1f35', color: 'white', padding: '8px' }}>VF</option>
                      </select>
                    </div>
                  ) : (
                    <div className="relative w-20">
                      <div className="flex items-center justify-center w-full px-3 py-3 text-white bg-[#1e2332] rounded-md border border-white/10">
                        <span>VO</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sélecteur d'épisode */}
                <div className="relative w-full">
                  <button 
                    className="flex items-center justify-between w-full px-4 py-3 text-white bg-[#1e2332] rounded-md border border-white/10"
                    onClick={() => document.getElementById("episode-selector-mobile")?.click()}
                  >
                    <span className="truncate">{episode?.title || `Épisode ${selectedEpisode}`}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  <select 
                    id="episode-selector-mobile"
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                    style={{ backgroundColor: '#1a1f35', color: 'white' }}
                  >
                    {episodesToShow.map((ep) => (
                      <option key={ep.number} value={ep.number} style={{ backgroundColor: '#1a1f35', color: 'white', padding: '8px' }}>
                        {ep.title || `Épisode ${ep.number}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Lecteur vidéo */}
              <div className="bg-black relative" style={{ width: '100%', height: window.innerWidth <= 768 ? '200px' : '500px' }}>
                {episode && (
                  <>
                    {/* Vidéo */}
                    {selectedLanguage === "vo" && (episode?.vidmolyUrl || episode?.vidmolyId) ? (
                      <iframe
                        src={episode?.vidmolyUrl || `https://vidmoly.net/embed-${episode?.vidmolyId}.html`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                      />
                    ) : selectedLanguage === "vf" && (episode?.vidmolyVfId || episode?.vidmolyVfUrl) ? (
                      <iframe
                        src={episode.vidmolyVfUrl || `https://vidmoly.net/embed-${episode.vidmolyVfId}.html`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                      />
                    ) : episode?.movearnUrl ? (
                      <MovearnPlayer src={episode.movearnUrl} />
                    ) : (
                      <VideoPlayer 
                        sendvidId={selectedLanguage === "vf" ? episode?.sendvidVfId : episode?.sendvidId}
                        sibnetId={
                          selectedLanguage === "vf" 
                            ? (episode?.sendvidVfId ? undefined : episode?.sibnetVfId)
                            : (episode?.sendvidId ? undefined : videoId)
                        }
                        mp4Url={selectedLanguage === "vf" ? episode?.mp4VfUrl : episode?.mp4Url}
                        movearnUrl={selectedLanguage === "vf" ? episode?.movearnVfUrl : episode?.movearnUrl}
                        className="w-full h-full"
                        key={`lecteur1-${selectedLanguage}-${selectedEpisode}-${selectedSeason}`}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations (placeholder) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Jujutsu Kaisen est toujours affiché en premier */}
              <Link 
                href={`/catalogue/jujutsu-kaisen`} 
                key="jujutsu-kaisen"
                className="group transition-transform duration-200 hover:scale-105"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-2">
                  <CustomImage
                    src="https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg"
                    alt="Jujutsu Kaisen"
                    fill
                    className="object-cover group-hover:brightness-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">2020</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-white">8.9</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white line-clamp-2">Jujutsu Kaisen</h3>
              </Link>
              
              {/* Autres recommandations */}
              {getAllAnimes()
                .filter(rec => 
                  rec.id !== anime.id && 
                  rec.id !== "nagatoro" &&
                  rec.id !== "jujutsu-kaisen"
                )
                .slice(0, 5)
                .map((recommended) => (
                  <Link 
                    href={`/catalogue/${recommended.id}`} 
                    key={recommended.id}
                    className="group transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-2">
                      <CustomImage
                        src={recommended.imageUrl}
                        alt={recommended.title}
                        fill
                        className="object-cover group-hover:brightness-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white">{recommended.year}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-white">{recommended.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-white line-clamp-2">{recommended.title}</h3>
                  </Link>
                ))}
            </div>
          </div>

          {/* Message d'avertissement concernant AdBlock pour les vidéos Vidmoly et Movearnpre */}
          {(episode?.vidmolyUrl || episode?.vidmolyId || episode?.vidmolyVfId || episode?.vidmolyVfUrl || episode?.movearnUrl || episode?.movearnVfUrl) && (
            <div className="bg-amber-800/20 border border-amber-600/30 rounded-md p-3 mb-4 text-amber-300 text-sm">
              <strong>⚠️</strong> Si la vidéo ne s'affiche pas, veuillez désactiver votre bloqueur de publicités (AdBlock) pour ce site.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 