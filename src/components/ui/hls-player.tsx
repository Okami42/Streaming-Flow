"use client";

import { useEffect, useRef, useState } from "react";
// Import de type uniquement pour TypeScript, pas de dépendance runtime
import type Hls from "hls.js";
import { Loader2 } from "lucide-react";
import Image from 'next/image';

interface HLSPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  key?: string;
}

export default function HLSPlayer({
  src,
  poster,
  className = "",
  autoPlay = true,
}: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hlsRef = useRef<any | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const previewControlsActive = useRef(false);
  const [isPaused, setIsPaused] = useState(true);
  const [hlsSupported, setHlsSupported] = useState<boolean | null>(null);
  // Clé unique pour forcer le rechargement du lecteur
  const playerKey = `hls-${src}-${Date.now()}`;

  // Formater le temps en MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Capture une image de la vidéo à un moment spécifique
  const captureVideoFrame = (seekTime: number) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.duration) return null;
    
    // Utilisons une méthode non-intrusive qui ne modifie pas la lecture actuelle
    try {
      // Si la position actuelle est proche de celle demandée, on peut capturer directement
      if (Math.abs(video.currentTime - seekTime) < 0.5) {
        const context = canvas.getContext('2d');
        if (!context) return null;
        
        // Ajuste la taille du canvas pour correspondre à la vidéo
        canvas.width = 120; // Largeur fixe pour la vignette
        canvas.height = (video.videoHeight / video.videoWidth) * canvas.width;
        
        // Dessine l'image actuelle de la vidéo sur le canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convertit le canvas en URL de données
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPreviewImage(dataUrl);
        return;
      }
      
      // Pour les positions éloignées, on stocke simplement le temps pour l'affichage du minutage
      // mais on ne tente pas de capturer l'image car cela perturberait la lecture
      // On évite toute manipulation de currentTime sur la vidéo principale
      setPreviewImage(null);
    } catch (err) {
      console.error("Erreur lors de la capture d'image:", err);
      setPreviewImage(null);
    }
  };

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

    const loadVideo = async () => {
      try {
        // Import dynamique de hls.js
        const HlsModule = await import('hls.js').catch(err => {
          console.error("Erreur lors de l'importation de hls.js:", err);
          return null;
        });
        
        if (!HlsModule) {
          setError("Impossible de charger le module HLS");
          setIsLoading(false);
          return;
        }
        
        const Hls = HlsModule.default;

        // Si HLS.js est supporté
        if (Hls.isSupported() && src.includes('.m3u8')) {
          setHlsSupported(true);
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
            // Configuration pour les requêtes XHR
            xhrSetup: function(xhr, url) {
              // Ajouter des en-têtes spécifiques pour les requêtes
              if (url.includes('animedigitalnetwork.fr')) {
                xhr.setRequestHeader('Referer', 'https://animedigitalnetwork.fr/');
                xhr.setRequestHeader('Origin', 'https://animedigitalnetwork.fr');
              }
            },
            // Optimisations pour la qualité audio
            maxBufferLength: 60, // Augmenter le buffer pour une lecture plus fluide
            maxMaxBufferLength: 120, // Buffer maximum pour éviter les coupures
            manifestLoadingMaxRetry: 5, // Plus de tentatives pour charger le manifeste
            levelLoadingMaxRetry: 5, // Plus de tentatives pour charger les niveaux
          });
          
          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // Sélectionner la meilleure qualité audio disponible
            const audioTracks = hls.audioTracks;
            if (audioTracks && audioTracks.length > 0) {
              // Trouver la piste avec le meilleur bitrate
              let bestAudioTrackId = 0;
              let highestBitrate = 0;
              
              for (let i = 0; i < audioTracks.length; i++) {
                if (audioTracks[i].bitrate > highestBitrate) {
                  highestBitrate = audioTracks[i].bitrate;
                  bestAudioTrackId = i;
                }
              }
              
              // Sélectionner la meilleure piste audio
              hls.audioTrack = bestAudioTrackId;
            }
            
            if (autoPlay) {
              video.play().catch(err => {
                console.warn("Lecture automatique échouée:", err);
              });
            }
            setIsLoading(false);
          });
          
          hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
            console.error("HLS error:", data);
            
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.error("Erreur réseau:", data.details);
                  setError("Erreur de chargement: vérifiez votre connexion");
                  hls.startLoad(); // Essayer de recharger
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.error("Erreur média:", data.details);
                  setError("Erreur de lecture vidéo");
                  hls.recoverMediaError(); // Essayer de récupérer
                  break;
                default:
                  console.error("Erreur non récupérable:", data.details);
                  setError("Erreur de lecture");
                  hls.destroy();
                  break;
              }
            }
          });
        } 
        // Support natif HLS pour Safari
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          setHlsSupported(true);
          video.src = src;
          video.addEventListener('loadedmetadata', () => {
            if (autoPlay) {
              video.play().catch(err => {
                console.warn("Lecture automatique échouée:", err);
              });
            }
            setIsLoading(false);
          });
          
          video.addEventListener('error', () => {
            setError("Erreur lors du chargement de la vidéo");
            setIsLoading(false);
          });
        } 
        // Pas de support HLS
        else {
          setHlsSupported(false);
          setError("Votre navigateur ne prend pas en charge la lecture HLS");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Erreur d'initialisation du lecteur:", err);
        setError("Erreur d'initialisation du lecteur");
        setIsLoading(false);
      }
    };

    loadVideo();

    // Gérer les événements de mise à jour du temps
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    // Surveiller l'état de pause/lecture
    const handlePlayPause = () => {
      setIsPaused(video.paused);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', () => {
      setDuration(video.duration);
    });
    
    // Ajouter les écouteurs d'événements pour pause/play
    video.addEventListener('play', handlePlayPause);
    video.addEventListener('pause', handlePlayPause);
    video.addEventListener('ended', handlePlayPause);

    // Gérer l'aperçu au survol
    const container = videoContainerRef.current;
    if (container) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!video.duration) return;
        
        const rect = container.getBoundingClientRect();
        const isBottomArea = e.clientY > rect.top + rect.height * 0.8;
        
        // Ne montrer l'aperçu que dans la zone inférieure et si les contrôles vidéo ne sont pas activement utilisés
        if (isBottomArea && !previewControlsActive.current) {
          const posX = (e.clientX - rect.left);
          const percent = Math.max(0, Math.min(1, posX / rect.width));
          const previewTimeValue = percent * video.duration;
          
          setPreviewTime(previewTimeValue);
          setPreviewPosition(posX);
          setShowPreview(true);
          
          // On capture l'image seulement si on est proche de la position actuelle
          // sinon on affiche seulement le timestamp
          if (Math.abs(previewTimeValue - video.currentTime) < 0.5) {
            captureVideoFrame(previewTimeValue);
          } else {
            setPreviewImage(null);
          }
        } else {
          setShowPreview(false);
        }
      };
      
      const handleMouseLeave = () => {
        setShowPreview(false);
      };
      
      // Détecter quand l'utilisateur interagit avec les contrôles vidéo
      const handleMouseDown = () => {
        previewControlsActive.current = true;
      };
      
      const handleMouseUp = () => {
        setTimeout(() => {
          previewControlsActive.current = false;
        }, 100);
      };
      
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlayPause);
        video.removeEventListener('pause', handlePlayPause);
        video.removeEventListener('ended', handlePlayPause);
        
        // Nettoyer le lecteur HLS
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        
        // Arrêter et nettoyer la vidéo
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      };
    }

    return () => {
      // Nettoyer le lecteur HLS
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      
      // Arrêter et nettoyer la vidéo
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [src, autoPlay]);

  // Style personnalisé pour le lecteur vidéo
  const videoStyle = `
    .custom-video-player::-webkit-media-controls-play-button {
      opacity: ${isPaused ? 1 : 0};
      transition: opacity 0.2s ease;
    }
    .custom-video-player:hover::-webkit-media-controls-play-button {
      opacity: 1;
    }
  `;

  return (
    <div 
      className={`relative w-full h-full ${className}`} 
      ref={videoContainerRef}
      key={playerKey}
    >
      {/* Styles CSS personnalisés */}
      <style jsx>{videoStyle}</style>
      
      {/* Canvas caché pour la capture d'image */}
      <canvas ref={canvasRef} className="hidden absolute" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 p-4">
          <p className="text-white text-center mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Réessayer
          </button>
        </div>
      )}
      
      {/* Vidéo principale */}
      <video
        ref={videoRef}
        className="w-full h-full custom-video-player"
        poster={poster}
        controls
        playsInline
        preload="metadata"
      />
      
      {/* Aperçu au survol - S'affiche au-dessus de la vidéo */}
      {showPreview && (
        <div 
          ref={previewRef}
          className="absolute bottom-20 bg-white rounded shadow-lg transform -translate-x-1/2 pointer-events-none overflow-hidden z-30"
          style={{ left: `${previewPosition}px`, width: "120px" }}
        >
          {/* Vignette d'aperçu */}
          <div className="relative aspect-video w-full bg-[#6abeec] flex items-center justify-center">
            {previewImage ? (
              <Image 
                src={previewImage} 
                alt="Aperçu" 
                className="w-full h-full object-cover"
                width={120}
                height={68}
                unoptimized // Nécessaire car l'image est générée dynamiquement
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-md font-semibold drop-shadow-md">
                  {formatTime(previewTime)}
                </span>
              </div>
            )}
          </div>
          
          {/* Timestamp en bas */}
          <div className="w-full text-center py-1 bg-white text-black text-xs font-medium">
            {formatTime(previewTime)}
          </div>
        </div>
      )}
    </div>
  );
} 