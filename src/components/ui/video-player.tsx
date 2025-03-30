"use client";

import React, { useState, useRef } from "react";
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
  
  // Construction directe de l'URL Vidmoly - format standard
  const finalVidmolyUrl = vidmolyId 
    ? `https://vidmoly.to/embed-${vidmolyId}.html`
    : vidmolyUrl;
  
  // Gérer le chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Gérer les erreurs de chargement
  const handleIframeError = () => {
    setIsLoading(false);
  };
  
  return (
    <div className={`w-full h-full relative ${className}`} style={{ overflow: 'hidden' }}>      
      {/* Afficher un loader pendant le chargement */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}
      
      {/* Lecteur Sibnet (natif) */}
      {sibnetId && (
        <iframe 
          src={`https://video.sibnet.ru/shell.php?videoid=${sibnetId}`}
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
      
      {/* Lecteur Vidmoly (natif) */}
      {(vidmolyUrl || vidmolyId) && !sibnetId && (
        <iframe 
          src={finalVidmolyUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          allow="autoplay; encrypted-media"
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
    </div>
  );
}