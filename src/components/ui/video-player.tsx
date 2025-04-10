"use client";

import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  sibnetId?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  sendvidId?: string;
  beerscloudId?: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({
  sibnetId,
  vidmolyUrl,
  vidmolyId,
  sendvidId,
  beerscloudId,
  poster,
  className = "",
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Construction directe de l'URL Vidmoly - format standard
  const finalVidmolyUrl = vidmolyId 
    ? `https://vidmoly.to/embed-${vidmolyId}.html`
    : vidmolyUrl;
  
  // Construction de l'URL Beerscloud
  const beerscloudUrl = beerscloudId
    ? `https://beerscloud.com/iframe/${beerscloudId}`
    : null;
  
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
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
        </div>
      )}
      
      {/* Lecteur Sibnet (natif) */}
      {sibnetId && (
        <iframe 
          src={`https://video.sibnet.ru/shell.php?videoid=${sibnetId}&skin=4&share=1`}
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          className="absolute inset-0"
          allow="fullscreen; autoplay"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ 
            display: isLoading ? 'none' : 'block',
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 1
          }}
        />
      )}
      
      {/* Lecteur Vidmoly (natif) */}
      {finalVidmolyUrl && !sibnetId && (
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
          style={{ 
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            left: '-1.5%',
            width: '103%',
            height: '100%'
          }}
        />
      )}
      
      {/* Lecteur Sendvid (natif) */}
      {sendvidId && !sibnetId && !finalVidmolyUrl && !beerscloudUrl && (
        <iframe 
          src={`https://sendvid.com/embed/${sendvidId}`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ 
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            left: '-1.5%',
            width: '103%',
            height: '100%'
          }}
        />
      )}
      
      {/* Lecteur Beerscloud */}
      {beerscloudUrl && !sibnetId && !finalVidmolyUrl && !sendvidId && (
        <iframe 
          src={beerscloudUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ 
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            left: '0',
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
}