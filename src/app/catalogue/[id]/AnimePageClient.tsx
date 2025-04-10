"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomImage from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Heart, Info, List, Play, Share2, Star } from "lucide-react";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Anime, AnimeEpisode, getAllAnimes } from "@/lib/animeData";
import VideoPlayer from "@/components/ui/video-player";
import HLSPlayer from '@/components/ui/hls-player';
import { getProxiedStreamUrl } from "@/lib/utils";

export default function AnimePageClient({ anime }: { anime: Anime | undefined }) {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<number | string>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"vostfr" | "vf">("vostfr");
  const [isFollowing, setIsFollowing] = useState(false);
  
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
    
  // Récupérer l'épisode actuel selon la structure utilisée
  const episode = useSeasonsStructure
    ? anime?.seasons?.find(s => String(s.seasonNumber) === String(selectedSeason))?.episodes.find(ep => ep.number === selectedEpisode)
    : anime?.episodes?.find(ep => ep.number === selectedEpisode);

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
    if (selectedEpisode === 1 && selectedLanguage === "vostfr") {
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
    if (selectedEpisode === 1 && selectedLanguage === "vostfr") {
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
          
        addToWatchHistory({
          id: episodeId,
          title: anime.title,
          imageUrl: anime.imageUrl,
          lastWatchedAt: new Date().toISOString(),
          progress: currentTimeRef.current,
          duration: episode.duration,
          episodeInfo: {
            season: useSeasonsStructure ? (typeof selectedSeason === 'string' ? 1 : selectedSeason) : 1,
            episode: episode.number,
            title: episode.title,
          },
          type: "Anime"
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [anime, episode, selectedEpisode, selectedSeason, addToWatchHistory, useSeasonsStructure]);

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
        if (selectedEpisode === 1 && selectedLanguage === "vostfr") {
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

  const videoId = selectedLanguage === "vostfr"
    ? episode?.sibnetVostfrId
    : episode?.sibnetVfId;
    
  // Définir des sources mp4 de démonstration
  const mp4Source = selectedLanguage === "vostfr"
    ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
    : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <CustomImage
            src={anime.bannerUrl || "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp"}
            alt={anime.title}
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          {/* Anime info header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-lg border-2 border-white/10 shadow-lg">
                <CustomImage
                  src={anime.imageUrl}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 hover:bg-white/5"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isFollowing ? "Suivi ✓" : "Suivre"}
                </Button>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center border-white/10 hover:bg-white/5"
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`h-4 w-4 ${isAnimeFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
                </Button>
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
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>

          {/* Player section */}
          <div id="player-section" className="mb-12">
            <Tabs
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as "vostfr" | "vf")}
              className="mb-4"
            >

              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' 
                      ? "Kuroko's Basket Last Game (Film)" 
                      : (useSeasonsStructure ? `${currentSeason?.title} - ` : "") + `Épisode ${selectedEpisode}: ${episode?.title}`}
                  </h2>
                  
                  {/* Sélecteur de saison pour les animes avec plusieurs saisons */}
                  {useSeasonsStructure && anime?.seasons && anime.seasons.length > 1 && (
                    <div className="flex items-center mt-2 gap-2">
                      <span className="text-sm text-gray-400">Saison:</span>
                      <select 
                        value={String(selectedSeason)}
                        onChange={(e) => {
                          setSelectedSeason(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value));
                          setSelectedEpisode(1);
                        }}
                        className="bg-[#151a2a] text-white border border-white/10 rounded-md px-2 py-1"
                      >
                        {anime.seasons.map((season) => (
                          <option key={season.seasonNumber} value={season.seasonNumber}>
                            {String(season.seasonNumber) === "Film" ? "Film" : `Saison ${season.seasonNumber}`} ({season.year})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <TabsList className="bg-[#151a2a] border border-white/10">
                  <TabsTrigger
                    value="vostfr"
                    className="data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    VOSTFR
                  </TabsTrigger>
                  {/* Ne pas afficher l'option VF pour Akudama Drive */}
                  {anime?.id !== "akudama-drive" && (
                    <TabsTrigger
                      value="vf"
                      className="data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                    >
                      VF
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <TabsContent value="vostfr" className="mt-2">
                {/* Tabs pour choisir le lecteur */}
                <div className="mb-4">
                  <Tabs defaultValue="lecteur1" className="w-full">
                    <TabsList className={`grid w-full ${anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' ? 'grid-cols-2' : 'grid-cols-3'} bg-[#151a2a] mb-2 rounded-t-md border border-white/10 border-b-0`}>
                      <TabsTrigger value="lecteur1" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner">Lecteur 1</TabsTrigger>
                      <TabsTrigger value="lecteur2" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner">Lecteur 2</TabsTrigger>
                      {!(anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film') && (
                        <TabsTrigger 
                          value="lecteur3" 
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner"
                          disabled={!episode?.m3u8VfUrl}
                        >
                          Lecteur 3 (Teste de qualité)
                        </TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="lecteur1" className="mt-0">
                      {/* Lecteur spécifique pour Kuroko no Basket - Film */}
                      {anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' ? (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <HLSPlayer 
                            src={getProxiedStreamUrl("https://streaming23.animedigitalnetwork.fr/1744239835727-1046246-b5b12c6e209c9af33b8b9f56cc55e07b/video1_1080p/playlist.m3u8")}
                            className="w-full h-full"
                            poster={anime.bannerUrl || anime.imageUrl}
                          />
                        </div>
                      ) : (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <VideoPlayer 
                            sendvidId={episode?.sendvidId}
                            sibnetId={episode?.sendvidId ? undefined : videoId}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="lecteur2" className="mt-0">
                      {/* Lecteur 2 inversé : Sibnet pour Kuroko, Vidmoly pour les autres */}
                      {anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' ? (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <VideoPlayer 
                            sibnetId={videoId}
                            className="w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <VideoPlayer 
                            vidmolyId={episode?.vidmolyId}
                            sibnetId={!episode?.vidmolyId ? videoId : undefined}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="lecteur3" className="mt-0">
                      {/* Lecteur HLS pour les flux m3u8 */}
                      <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                        {episode?.m3u8Url ? (
                          <HLSPlayer 
                            src={getProxiedStreamUrl(episode.m3u8Url)}
                            className="w-full h-full"
                            poster={anime.bannerUrl || anime.imageUrl}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white/70">
                            Aucun flux HLS disponible pour cet épisode
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="vf" className="mt-2">
                {/* Tabs pour choisir le lecteur */}
                <div className="mb-4">
                  <Tabs defaultValue="lecteur1" className="w-full">
                    <TabsList className={`grid w-full ${anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' ? 'grid-cols-2' : 'grid-cols-3'} bg-[#151a2a] mb-2 rounded-t-md border border-white/10 border-b-0`}>
                      <TabsTrigger value="lecteur1" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner">Lecteur 1</TabsTrigger>
                      <TabsTrigger value="lecteur2" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner">Lecteur 2</TabsTrigger>
                      {!(anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film') && (
                        <TabsTrigger 
                          value="lecteur3" 
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/50 data-[state=active]:to-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-inner"
                          disabled={!episode?.m3u8VfUrl}
                        >
                          Lecteur 3 (Teste de qualité)
                        </TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="lecteur1" className="mt-0">
                      {/* Lecteur style anime-sama.fr */}
                      {anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' ? (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <HLSPlayer 
                            src={getProxiedStreamUrl("https://streaming23.animedigitalnetwork.fr/1744239835727-1046246-b5b12c6e209c9af33b8b9f56cc55e07b/video1_1080p/playlist.m3u8")}
                            className="w-full h-full"
                            poster={anime.bannerUrl || anime.imageUrl}
                          />
                          {/* Message explicatif si le lecteur ne se charge pas */}
                          <noscript>
                            <p className="text-white p-4">Activez JavaScript pour voir cette vidéo.</p>
                          </noscript>
                        </div>
                      ) : (
                        <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                          <VideoPlayer 
                            sibnetId={videoId}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="lecteur2" className="mt-0">
                      {/* Lecteur style anime-sama.fr */}
                      <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                        <VideoPlayer 
                          vidmolyId={episode?.vidmolyVfId}
                          className="w-full h-full"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="lecteur3" className="mt-0">
                      {/* Lecteur HLS pour les flux m3u8 en VF */}
                      <div className="bg-black" style={{ width: '100%', height: '650px' }}>
                        {episode?.m3u8VfUrl ? (
                          <HLSPlayer 
                            src={getProxiedStreamUrl(episode.m3u8VfUrl)}
                            className="w-full h-full"
                            poster={anime.bannerUrl || anime.imageUrl}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white/70">
                            Aucun flux HLS disponible pour cet épisode en VF
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                disabled={selectedEpisode <= 1}
                onClick={() => setSelectedEpisode(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Épisode précédent
              </Button>

              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#151a2a] rounded-md text-white">
                  {selectedEpisode} / {totalEpisodes}
                </div>
              </div>

              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                disabled={selectedEpisode >= (totalEpisodes || 1)}
                onClick={goToNextEpisode}
              >
                Épisode suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Episodes list */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                <List className="inline-block mr-2 h-5 w-5" />
                Liste des épisodes
              </h2>
                
              {/* Sélecteur de saison dans la liste des épisodes */}
              {useSeasonsStructure && anime?.seasons && anime.seasons.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Saison:</span>
                  <select 
                    value={String(selectedSeason)}
                    onChange={(e) => {
                      setSelectedSeason(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value));
                      setSelectedEpisode(1);
                    }}
                    className="bg-[#151a2a] text-white border border-white/10 rounded-md px-2 py-1"
                  >
                    {anime.seasons.map((season) => (
                      <option key={season.seasonNumber} value={season.seasonNumber}>
                        {String(season.seasonNumber) === "Film" ? "Film" : `Saison ${season.seasonNumber}`} ({season.year})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {episodesToShow.map((ep) => {
                const progress = getEpisodeProgress(
                  typeof selectedSeason === 'string' ? selectedSeason : selectedSeason, 
                  ep.number
                );
                
                return (
                  <button
                    key={ep.number}
                    className={`p-4 rounded-md border text-left transition-all ${
                      selectedEpisode === ep.number
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-white/10 bg-[#151a2a] hover:bg-[#1a1f35]"
                    }`}
                    onClick={() => setSelectedEpisode(ep.number)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-white">Épisode {ep.number}</div>
                      <div className="text-xs text-gray-400">{Math.floor(ep.duration / 60)}:{(ep.duration % 60).toString().padStart(2, '0')}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-300 truncate">{ep.title}</div>
                    
                    {/* Barre de progression */}
                    {progress && (
                      <div className="mt-2">
                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-pink-500" 
                            style={{ width: `${progress.percentage}%` }} 
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {Math.floor(progress.progress / 60)}:{(progress.progress % 60).toString().padStart(2, '0')} / 
                          {Math.floor(progress.duration / 60)}:{(progress.duration % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
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

          {/* Message d'avertissement concernant AdBlock pour Kuroko film */}
          {anime.id === 'kuroko-no-basket' && String(selectedSeason) === 'Film' && (
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