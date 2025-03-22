"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomImage from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Heart, Info, List, Play, Share2, Star } from "lucide-react";
import { useHistory } from "@/context/history-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Anime, AnimeEpisode } from "@/lib/animeData";
import VideoPlayer from "@/components/ui/video-player";

export default function AnimePageClient({ anime }: { anime: Anime | undefined }) {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"vostfr" | "vf">("vostfr");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Utiliser UNIQUEMENT des refs pour le timing pour éviter les boucles de rendu
  const currentTimeRef = React.useRef(0);
  const lastSavedTimeRef = React.useRef(0);
  const isPlayingRef = React.useRef(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timeDisplayRef = React.useRef("00:00");
  
  // État UI pour forcer le rendu uniquement quand nécessaire
  const [renderKey, setRenderKey] = useState(0);
  const sibnetOverlayRef = React.useRef<HTMLDivElement>(null);

  const { addToWatchHistory, updateWatchProgress, watchHistory } = useHistory();
  const pathname = usePathname();

  // Déterminer si on utilise la nouvelle structure (saisons) ou l'ancienne (episodes)
  // Pour éviter les changements de dépendances dans useEffect, cette valeur ne doit pas changer
  const useSeasonsStructure = React.useMemo(() => {
    return !!anime?.seasons && anime.seasons.length > 0;
  }, [anime]);
  
  // Récupérer la saison actuelle si disponible
  const currentSeason = useSeasonsStructure 
    ? anime?.seasons?.find(s => s.seasonNumber === selectedSeason)
    : null;
    
  // Récupérer l'épisode actuel selon la structure utilisée
  const episode = useSeasonsStructure
    ? currentSeason?.episodes?.find(ep => ep.number === selectedEpisode)
    : anime?.episodes?.find(ep => ep.number === selectedEpisode);

  // Récupérer le nombre total d'épisodes selon la structure utilisée  
  const totalEpisodes = useSeasonsStructure
    ? currentSeason?.episodes?.length
    : anime?.episodes?.length;

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
              
              // Mettre à jour l'état de lecture
              isPlayingRef.current = false;
              
              // Sauvegarder le temps actuel
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
            season: useSeasonsStructure ? selectedSeason : 1,
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

  // Fonction pour récupérer la progression d'un épisode
  const getEpisodeProgress = (seasonNumber: number, episodeNumber: number) => {
    if (!anime) return null;
    
    // Identifiant avec ou sans saison
    const episodeId = useSeasonsStructure
      ? `${anime.id}-s${seasonNumber}e${episodeNumber}`
      : `${anime.id}-e${episodeNumber}`;
    
    const historyItem = watchHistory.find(item => item.id === episodeId);
    
    if (!historyItem) return null;
    
    // Trouver l'épisode selon la structure utilisée
    let foundEpisode: AnimeEpisode | undefined;
    
    if (useSeasonsStructure) {
      const season = anime.seasons?.find(s => s.seasonNumber === seasonNumber);
      if (!season) return null;
      foundEpisode = season.episodes.find(ep => ep.number === episodeNumber);
    } else {
      foundEpisode = anime.episodes?.find(ep => ep.number === episodeNumber);
    }
    
    if (!foundEpisode) return null;
    
    return {
      progress: historyItem.progress,
      duration: foundEpisode.duration,
      percentage: Math.min(100, Math.round((historyItem.progress / foundEpisode.duration) * 100))
    };
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
    
  // Définir des sources mp4 fictives pour l'exemple
  const mp4Source = selectedLanguage === "vostfr"
    ? useSeasonsStructure
      ? `https://storage-anime.com/${anime?.id}/s${selectedSeason}e${selectedEpisode}-vostfr.mp4`
      : `https://storage-anime.com/${anime?.id}/e${selectedEpisode}-vostfr.mp4`
    : useSeasonsStructure
      ? `https://storage-anime.com/${anime?.id}/s${selectedSeason}e${selectedEpisode}-vf.mp4`
      : `https://storage-anime.com/${anime?.id}/e${selectedEpisode}-vf.mp4`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <CustomImage
            src={anime.bannerUrl}
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
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
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
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Info className="mr-2 h-4 w-4" />
                  Infos
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
                    {useSeasonsStructure ? `${currentSeason?.title} - ` : ""}
                    Épisode {selectedEpisode}: {episode?.title}
                  </h2>
                  
                  {/* Sélecteur de saison pour les animes avec plusieurs saisons */}
                  {useSeasonsStructure && anime?.seasons && anime.seasons.length > 1 && (
                    <div className="flex items-center mt-2 gap-2">
                      <span className="text-sm text-gray-400">Saison:</span>
                      <div className="flex space-x-1">
                        {anime.seasons.map((season) => (
                          <button
                            key={season.seasonNumber}
                            onClick={() => {
                              setSelectedSeason(season.seasonNumber);
                              setSelectedEpisode(1); // Réinitialiser l'épisode quand on change de saison
                            }}
                            className={`px-3 py-1 text-sm rounded ${
                              selectedSeason === season.seasonNumber
                                ? "bg-pink-600 text-white"
                                : "bg-[#151a2a] text-gray-300 hover:bg-[#1a1f35]"
                            }`}
                          >
                            {season.seasonNumber}
                          </button>
                        ))}
                      </div>
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
                  <TabsTrigger
                    value="vf"
                    className="data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    VF
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="vostfr" className="mt-2">
                {/* Tabs pour choisir le lecteur */}
                <div className="mb-4">
                  <Tabs defaultValue="lecteur1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#151a2a] mb-2">
                      <TabsTrigger value="lecteur1" className="data-[state=active]:bg-[#1a1f35]">Lecteur 1</TabsTrigger>
                      <TabsTrigger value="lecteur2" className="data-[state=active]:bg-[#1a1f35]">Lecteur 2</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="lecteur1" className="mt-0">
                      {/* Lecteur personnalisé avec prévisualisation */}
                      <VideoPlayer 
                        sibnetId={videoId}
                        poster={anime.bannerUrl}
                        onTimeUpdate={(time) => {
                          currentTimeRef.current = time;
                          updateTimeDisplay(time);
                          if (Math.floor(time) % 5 === 0) {
                            saveTime();
                          }
                        }}
                        onPlay={() => {
                          isPlayingRef.current = true;
                          startTrackingTime(true);
                        }}
                        onPause={() => {
                          isPlayingRef.current = false;
                          saveTime(true);
                          if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                          }
                        }}
                        initialTime={currentTimeRef.current}
                        onNextEpisode={() => {
                          if (currentSeason && selectedEpisode < currentSeason.episodes.length) {
                            setSelectedEpisode(prev => Math.min(currentSeason.episodes.length, prev + 1));
                          }
                        }}
                        onPreviousEpisode={() => {
                          if (selectedEpisode > 1) {
                            setSelectedEpisode(prev => Math.max(1, prev - 1));
                          }
                        }}
                        hasNextEpisode={currentSeason ? selectedEpisode < currentSeason.episodes.length : false}
                        hasPreviousEpisode={selectedEpisode > 1}
                      />
                    </TabsContent>
                    
                    <TabsContent value="lecteur2" className="mt-0">
                      {/* Lecteur Sibnet standard (ancien lecteur) */}
                      <div className="bg-black rounded-md overflow-hidden aspect-video w-full">
                        <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                          {videoId ? (
                            <div className="absolute inset-0 w-full h-full">
                              <iframe 
                                src={`https://video.sibnet.ru/shell.php?videoid=${videoId}`}
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                allow="autoplay; fullscreen" 
                                allowFullScreen 
                                className="w-full h-full"
                                onLoad={() => {
                                  console.log("Iframe chargée");
                                  
                                  // Démarrer automatiquement le suivi quand l'iframe est chargée
                                  isPlayingRef.current = true;
                                  startTrackingTime(true);
                                  setRenderKey(prev => prev + 1);
                                }}
                              ></iframe>
                            </div>
                          ) : (
                            <video 
                              src={mp4Source} 
                              controls 
                              className="absolute inset-0 w-full h-full"
                              poster={anime.bannerUrl}
                              onTimeUpdate={handleTimeUpdate}
                              onPlay={handlePlay}
                              onPause={handlePause}
                              onEnded={handlePause}
                            ></video>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="vf" className="mt-2">
                <div className="bg-black rounded-md overflow-hidden aspect-video w-full">
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    {videoId ? (
                      <div className="absolute inset-0 w-full h-full">
                        <iframe 
                          src={`https://video.sibnet.ru/shell.php?videoid=${videoId}`}
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          scrolling="no" 
                          allow="autoplay; fullscreen" 
                          allowFullScreen 
                          className="w-full h-full"
                          onLoad={() => {
                            console.log("Iframe chargée");
                            // Démarrer automatiquement le suivi quand l'iframe est chargée
                            isPlayingRef.current = true;
                            startTrackingTime(true);
                            setRenderKey(prev => prev + 1);
                          }}
                        ></iframe>
                      </div>
                    ) : (
                      <video 
                        src={mp4Source} 
                        controls 
                        className="absolute inset-0 w-full h-full"
                        poster={anime.bannerUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onEnded={handlePause}
                      ></video>
                    )}
                  </div>
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
                onClick={() => {
                  if (totalEpisodes) {
                    setSelectedEpisode(prev => Math.min(totalEpisodes, prev + 1));
                  }
                }}
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
                    value={selectedSeason}
                    onChange={(e) => {
                      setSelectedSeason(Number(e.target.value));
                      setSelectedEpisode(1);
                    }}
                    className="bg-[#151a2a] text-white border border-white/10 rounded-md px-2 py-1"
                  >
                    {anime.seasons.map((season) => (
                      <option key={season.seasonNumber} value={season.seasonNumber}>
                        {season.title} ({season.year})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {useSeasonsStructure 
                ? (currentSeason?.episodes || []).map((ep) => {
                    const progress = getEpisodeProgress(selectedSeason, ep.number);
                    
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
                  })
                : (anime?.episodes || []).map((ep) => {
                    const progress = getEpisodeProgress(1, ep.number);
                    
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
                  })
              }
            </div>
          </div>

          {/* Recommendations (placeholder) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#151a2a] rounded-md mb-2"></div>
                  <div className="h-4 bg-[#151a2a] rounded mb-1"></div>
                  <div className="h-3 bg-[#151a2a] rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 