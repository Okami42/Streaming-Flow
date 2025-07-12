"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import HLSPlayer from "../../../hls-player";

interface VideoPlayerProps {
  sibnetId?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  sendvidId?: string;
  beerscloudId?: string;
  poster?: string;
  className?: string;
  key?: string;
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Suppression de la clé dynamique qui causait le rechargement constant
  
  // Construction directe de l'URL Vidmoly - format standard
  const finalVidmolyUrl = vidmolyId 
    ? `https://vidmoly.to/embed-${vidmolyId}.html`
    : vidmolyUrl;
  
  // Construction de l'URL Beerscloud
  const beerscloudUrl = beerscloudId
    ? `https://beerscloud.com/iframe/${beerscloudId}`
    : null;
  
  // Vérifier si sibnetId est un lien m3u8
  const isM3U8Link = sibnetId?.includes('.m3u8');
  
  // Gérer le chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Gérer les erreurs de chargement
  const handleIframeError = () => {
    setIsLoading(false);
  };

  // Nettoyer l'iframe lors du démontage du composant
  useEffect(() => {
    return () => {
      // Nettoyer l'iframe à la sortie
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          // Essayer d'arrêter toute lecture en cours
          const iframe = iframeRef.current;
          iframe.src = 'about:blank';
        } catch (e) {
          // Ignorer les erreurs de sécurité cross-origin
          console.log("Nettoyage de l'iframe impossible en raison des restrictions cross-origin");
        }
      }
    };
  }, [sibnetId, vidmolyId, sendvidId, beerscloudId]);
  
  return (
    <div className={`w-full h-full relative ${className}`} style={{ overflow: 'hidden' }}>      
      {/* Afficher un loader pendant le chargement */}
      {isLoading && !isM3U8Link && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
        </div>
      )}
      
      {/* Lecteur HLS pour les liens m3u8 */}
      {sibnetId && isM3U8Link && (
        <HLSPlayer
          src={sibnetId}
          poster={poster}
          className="w-full h-full"
          autoPlay={true}
        />
      )}
      
      {/* Lecteur Sibnet (natif) pour les ID Sibnet */}
      {sibnetId && !isM3U8Link && (
        <iframe 
          ref={iframeRef}
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
          ref={iframeRef}
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
          ref={iframeRef}
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
          ref={iframeRef}
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