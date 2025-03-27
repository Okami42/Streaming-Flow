"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  sibnetId?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({
  sibnetId,
  vidmolyUrl,
  vidmolyId,
  poster,
  className = "",
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const sibnetIframeRef = useRef<HTMLIFrameElement>(null);
  const vidmolyIframeRef = useRef<HTMLIFrameElement>(null);
  
  // Construction directe de l'URL Vidmoly - format standard
  const finalVidmolyUrl = vidmolyId 
    ? `https://vidmoly.to/embed-${vidmolyId}.html`
    : vidmolyUrl;
  
  // Log pour déboguer
  useEffect(() => {
    if (vidmolyId || vidmolyUrl) {
      console.log("URL Vidmoly chargée:", finalVidmolyUrl);
    }
  }, [vidmolyId, vidmolyUrl, finalVidmolyUrl]);
  
  // Pour éviter les problèmes, rechargement manuel de l'iframe
  const forceIframeReload = (iframe: HTMLIFrameElement, src: string) => {
    iframe.src = "about:blank";
    setTimeout(() => {
      iframe.src = src;
    }, 50);
  };
  
  // Reset chargement lors d'un changement d'URL
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Chargement initial des iframes
    if (sibnetIframeRef.current && sibnetId) {
      forceIframeReload(
        sibnetIframeRef.current, 
        `https://video.sibnet.ru/shell.php?videoid=${sibnetId}`
      );
    }
    
    if (vidmolyIframeRef.current && finalVidmolyUrl) {
      // Avec Vidmoly, on laisse un petit délai avant de charger
      setTimeout(() => {
        if (vidmolyIframeRef.current) {
          forceIframeReload(vidmolyIframeRef.current, finalVidmolyUrl);
        }
      }, 300);
    }
  }, [sibnetId, vidmolyId, vidmolyUrl, finalVidmolyUrl]);
  
  // Gestion des événements
  const handleIframeLoad = () => {
    // Délai pour s'assurer que le contenu est chargé
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
    console.error("Erreur lors du chargement de la vidéo:", finalVidmolyUrl || sibnetId);
  };
  
  // Fonction pour recharger la vidéo
  const retryLoading = () => {
    setIsLoading(true);
    setHasError(false);
    
    // Forcer un rechargement complet
    if (vidmolyIframeRef.current && finalVidmolyUrl) {
      // Ajouter timestamp pour éviter le cache
      const timestamp = Date.now();
      const urlWithTimestamp = `${finalVidmolyUrl}?t=${timestamp}`;
      forceIframeReload(vidmolyIframeRef.current, urlWithTimestamp);
    } else if (sibnetIframeRef.current && sibnetId) {
      const timestamp = Date.now();
      const urlWithTimestamp = `https://video.sibnet.ru/shell.php?videoid=${sibnetId}&t=${timestamp}`;
      forceIframeReload(sibnetIframeRef.current, urlWithTimestamp);
    }
  };
  
  return (
    <div className={`w-full h-full relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-4" />
            <p className="text-white text-sm">Chargement de la vidéo...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
          <p className="text-white mb-2">Erreur de chargement de la vidéo</p>
          <button 
            onClick={retryLoading}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Réessayer
          </button>
        </div>
      )}
      
      {sibnetId && (
        <iframe 
          ref={sibnetIframeRef}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
      
      {(vidmolyUrl || vidmolyId) && !sibnetId && (
        <iframe 
          ref={vidmolyIframeRef}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="eager"
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
    </div>
  );
}