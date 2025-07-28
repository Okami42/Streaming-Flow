"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { getHlsConfig } from "@/lib/hls-config";

interface EnhancedHLSPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  onError?: (error: any) => void;
  onReady?: () => void;
}

export default function EnhancedHLSPlayer({
  src,
  poster,
  className = "",
  autoPlay = false,
  onError,
  onReady,
}: EnhancedHLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // États
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncIssueDetected, setSyncIssueDetected] = useState(false);
  const [rebufferingCount, setRebufferingCount] = useState(0);
  const [lastSyncCheck, setLastSyncCheck] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Références pour les intervalles et timeouts
  const syncCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const rebufferingTimeout = useRef<NodeJS.Timeout | null>(null);
  const stallDetectionTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastPlaybackRate = useRef<number>(1);
  const syncErrorsCount = useRef<number>(0);
  
  // Fonction pour détecter et corriger les problèmes de synchronisation audio/vidéo
  const checkAndFixAudioVideoSync = useCallback(() => {
    const video = videoRef.current;
    if (!video || !hlsRef.current) return;

    // Ne vérifier que toutes les 5 secondes pour éviter une surcharge
    const now = Date.now();
    if (now - lastSyncCheck < 5000) return;
    setLastSyncCheck(now);

    try {
      // Obtenir les informations de synchronisation depuis HLS.js si disponible
      if (hlsRef.current.audioTrack && hlsRef.current.videoTrack) {
        const audioDelay = hlsRef.current.audioTrack.delay || 0;
        const videoDelay = hlsRef.current.videoTrack.delay || 0;
        
        // Si la différence de synchronisation est trop importante (plus de 100ms)
        if (Math.abs(audioDelay - videoDelay) > 0.1) {
          console.warn(`Désynchronisation A/V détectée: audio=${audioDelay}s, video=${videoDelay}s`);
          setSyncIssueDetected(true);
          syncErrorsCount.current += 1;
          
          // Appliquer une correction de synchronisation
          if (hlsRef.current.config) {
            // Stratégie 1: Ajuster le délai de synchronisation
            const newLiveSync = hlsRef.current.config.liveSyncDuration + 0.5;
            hlsRef.current.config.liveSyncDuration = Math.min(newLiveSync, 5); // Maximum 5 secondes
            
            // Stratégie 2: Si plusieurs erreurs de sync, essayer de recharger le niveau actuel
            if (syncErrorsCount.current > 3) {
              // Forcer un rechargement du segment actuel pour appliquer les nouveaux paramètres
              const currentLevel = hlsRef.current.currentLevel;
              hlsRef.current.currentLevel = -1;
              setTimeout(() => {
                if (hlsRef.current) {
                  hlsRef.current.currentLevel = currentLevel;
                }
              }, 100);
              
              syncErrorsCount.current = 0;
            }
          }
          
          // Stratégie 3: Ajuster légèrement la vitesse de lecture pour compenser
          if (video.playbackRate === 1) {
            // Si audio en avance sur vidéo, ralentir légèrement
            if (audioDelay > videoDelay) {
              video.playbackRate = 0.95;
              lastPlaybackRate.current = 0.95;
            } 
            // Si vidéo en avance sur audio, accélérer légèrement
            else {
              video.playbackRate = 1.05;
              lastPlaybackRate.current = 1.05;
            }
            
            // Restaurer la vitesse normale après 3 secondes
            setTimeout(() => {
              if (video) {
                video.playbackRate = 1;
                lastPlaybackRate.current = 1;
              }
            }, 3000);
          }
        } else {
          // Synchronisation correcte
          setSyncIssueDetected(false);
        }
      }
    } catch (err) {
      console.warn("Erreur lors de la vérification de la synchronisation A/V:", err);
    }
  }, [lastSyncCheck]);
  
  // Gérer les problèmes de mise en mémoire tampon
  const handleBufferingIssues = useCallback(() => {
    const video = videoRef.current;
    if (!video || !hlsRef.current) return;
    
    // Si la vidéo est en pause de mise en mémoire tampon (stalled)
    if (video.readyState < 3) {
      setRebufferingCount(prev => prev + 1);
      
      // Si trop de rebuffering, essayer de récupérer
      if (rebufferingCount > 3) {
        console.log("Problèmes de mise en mémoire tampon fréquents, tentative de récupération...");
        
        // Stratégie 1: Essayer de recharger le segment actuel
        const currentTime = video.currentTime;
        if (hlsRef.current) {
          hlsRef.current.startLoad();
          
          // Restaurer la position après le rechargement
          setTimeout(() => {
            if (video && !video.paused) {
              video.currentTime = currentTime;
            }
          }, 1000);
        }
        
        // Réinitialiser le compteur
        setRebufferingCount(0);
      }
    }
  }, [rebufferingCount]);
  
  // Fonction pour forcer un rechargement du lecteur en cas de problème grave
  const forceReload = useCallback(() => {
    if (!hlsRef.current || !videoRef.current) return;
    
    const currentTime = videoRef.current.currentTime;
    const wasPlaying = !videoRef.current.paused;
    
    // Détruire et recréer l'instance HLS
    hlsRef.current.destroy();
    
    // Réinitialiser les états
    setIsLoading(true);
    setError(null);
    setSyncIssueDetected(false);
    setRebufferingCount(0);
    
    // Recréer l'instance HLS après un court délai
    setTimeout(async () => {
      try {
        const Hls = (await import('hls.js')).default;
        if (Hls.isSupported() && videoRef.current) {
          const hlsConfig = getHlsConfig();
          const hls = new Hls(hlsConfig);
          
          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(videoRef.current);
          
          // Restaurer la position et l'état de lecture
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (videoRef.current) {
              videoRef.current.currentTime = currentTime;
              if (wasPlaying) {
                videoRef.current.play().catch(console.error);
              }
              setIsLoading(false);
            }
          });
          
          // Configurer les écouteurs d'événements
          setupHlsEventListeners(hls, Hls);
        }
      } catch (err) {
        console.error("Erreur lors du rechargement du lecteur:", err);
        setError("Erreur lors du rechargement du lecteur");
        setIsLoading(false);
        if (onError) onError(err);
      }
    }, 500);
  }, [src, onError]);
  
  // Configurer les écouteurs d'événements pour HLS
  const setupHlsEventListeners = useCallback((hls: any, Hls: any) => {
    // Événements de base
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (videoRef.current && autoPlay) {
        videoRef.current.play().catch(err => {
          console.warn("Lecture automatique échouée:", err);
        });
      }
      setIsLoading(false);
      if (onReady) onReady();
    });
    
    // Écouter les erreurs de synchronisation
    hls.on(Hls.Events.BUFFER_APPENDING, () => {
      if (syncCheckInterval.current === null) {
        syncCheckInterval.current = setInterval(checkAndFixAudioVideoSync, 5000);
      }
    });
    
    // Gérer les erreurs
    hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
      // Vérifier si c'est une erreur de chargement de fragment
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR && 
          data.details && 
          (data.details.indexOf('frag') !== -1 || 
           data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR || 
           data.details === Hls.ErrorDetails.FRAG_LOAD_TIMEOUT)) {
        console.warn("Erreur de chargement de fragment:", data);
        // Ne pas afficher d'erreur, laisser HLS.js récupérer
      }
      
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error("Erreur réseau");
            setError("Erreur de chargement: vérifiez votre connexion");
            hls.startLoad(); // Essayer de recharger
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error("Erreur média");
            setError("Erreur de lecture vidéo");
            hls.recoverMediaError(); // Essayer de récupérer
            break;
          default:
            console.error("Erreur non récupérable");
            setError("Erreur de lecture");
            hls.destroy();
            break;
        }
        
        if (onError) onError(data);
      }
    });
    
  }, [autoPlay, checkAndFixAudioVideoSync, onError, onReady]);
  
  // Initialiser le lecteur
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Nettoyer le lecteur précédent si besoin
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Réinitialiser les états
    setIsLoading(true);
    setError(null);
    setSyncIssueDetected(false);
    setRebufferingCount(0);
    syncErrorsCount.current = 0;

    const loadVideo = async () => {
      try {
        // Import dynamique de hls.js
        const Hls = (await import('hls.js')).default;
        
        // Si HLS.js est supporté
        if (Hls.isSupported() && src.includes('.m3u8')) {
          // Utiliser la configuration optimisée
          const hlsConfig = getHlsConfig();
          const hls = new Hls(hlsConfig);
          
          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(video);
          
          // Configurer les écouteurs d'événements
          setupHlsEventListeners(hls, Hls);
        } 
        // Support natif HLS pour Safari
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          video.addEventListener('loadedmetadata', () => {
            if (autoPlay) {
              video.play().catch(err => {
                console.warn("Lecture automatique échouée:", err);
              });
            }
            setIsLoading(false);
            if (onReady) onReady();
          });
          
          video.addEventListener('error', (e) => {
            setError("Erreur lors du chargement de la vidéo");
            setIsLoading(false);
            if (onError) onError(e);
          });
        } 
        // Pas de support HLS
        else {
          setError("Votre navigateur ne prend pas en charge la lecture HLS");
          setIsLoading(false);
          if (onError) onError(new Error("HLS non supporté"));
        }
      } catch (err) {
        console.error("Erreur d'initialisation du lecteur:", err);
        setError("Erreur d'initialisation du lecteur");
        setIsLoading(false);
        if (onError) onError(err);
      }
    };

    loadVideo();
    
    // Gérer les événements de mise à jour du temps et de l'état
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };
    
    const handlePlayPause = () => {
      setIsPlaying(!video.paused);
    };
    
    const handleStalled = () => {
      // Détecter les blocages de lecture
      if (stallDetectionTimeout.current) {
        clearTimeout(stallDetectionTimeout.current);
      }
      
      stallDetectionTimeout.current = setTimeout(() => {
        if (video.readyState < 3 && !video.paused) {
          handleBufferingIssues();
        }
      }, 2000);
    };
    
    const handleWaiting = () => {
      // Si la vidéo est en attente (buffering)
      if (rebufferingTimeout.current) {
        clearTimeout(rebufferingTimeout.current);
      }
      
      rebufferingTimeout.current = setTimeout(() => {
        if (video.readyState < 3 && !video.paused) {
          handleBufferingIssues();
        }
      }, 3000);
    };
    
    // Ajouter les écouteurs d'événements
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));
    video.addEventListener('play', handlePlayPause);
    video.addEventListener('pause', handlePlayPause);
    video.addEventListener('ended', handlePlayPause);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);
    
    // Nettoyage
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlayPause);
      video.removeEventListener('pause', handlePlayPause);
      video.removeEventListener('ended', handlePlayPause);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      
      if (syncCheckInterval.current) {
        clearInterval(syncCheckInterval.current);
        syncCheckInterval.current = null;
      }
      
      if (rebufferingTimeout.current) {
        clearTimeout(rebufferingTimeout.current);
        rebufferingTimeout.current = null;
      }
      
      if (stallDetectionTimeout.current) {
        clearTimeout(stallDetectionTimeout.current);
        stallDetectionTimeout.current = null;
      }
      
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, setupHlsEventListeners, handleBufferingIssues, onError, onReady]);

  return (
    <div 
      className={`relative w-full h-full ${className}`} 
      ref={containerRef}
    >
      {/* Canvas caché pour la capture d'image */}
      <canvas ref={canvasRef} className="hidden absolute" />
      
      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        </div>
      )}
      
      {/* Affichage des erreurs */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-4">
          <p className="text-white text-center mb-2">{error}</p>
          <button 
            onClick={forceReload}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            Réessayer
          </button>
        </div>
      )}
      
      {/* Indicateur de problème de synchronisation */}
      {syncIssueDetected && !error && !isLoading && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs z-20 opacity-80">
          Correction de synchronisation en cours...
        </div>
      )}
      
      {/* Vidéo principale */}
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        controls
        playsInline
        preload="auto"
      />
    </div>
  );
} 