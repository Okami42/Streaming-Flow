"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface HLSPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}

export default function VercelHLSPlayer({
  src,
  poster,
  className = "",
  autoPlay = false,
}: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Réinitialiser les états
    setIsLoading(true);
    setError(null);

    const loadVideo = async () => {
      try {
        // Import dynamique de hls.js pour éviter les problèmes de compilation
        const HlsModule = await import('hls.js').catch(err => {
          console.error("Erreur lors de l'importation de hls.js:", err);
          return null;
        });
        
        const Hls = HlsModule?.default;

        if (Hls && Hls.isSupported() && src.includes('.m3u8')) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          });
          
          hls.loadSource(src);
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) {
              video.play().catch(err => {
                console.warn("Lecture automatique échouée:", err);
              });
            }
            setIsLoading(false);
          });
          
          hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
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
            }
          });
          
          return () => {
            hls.destroy();
          };
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
          });
          
          video.addEventListener('error', () => {
            setError("Erreur lors du chargement de la vidéo");
            setIsLoading(false);
          });
        } 
        // Pas de support HLS
        else {
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
  }, [src, autoPlay]);

  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/60 z-10 p-4">
          <div className="text-red-500 font-semibold mb-2">{error}</div>
          <div className="text-white text-sm text-center">
            Si le problème persiste, essayez un autre lecteur ou rafraîchissez la page.
          </div>
        </div>
      )}
      
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