"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Play } from "lucide-react";
import HLSPlayer from "../../../hls-player";
import MovearnPlayer from "./movearn-player";

interface VideoPlayerProps {
  sibnetId?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  vidmolyVfUrl?: string;
  vidmolyVfId?: string;
  movearnUrl?: string;
  movearnVfUrl?: string;
  sendvidId?: string;
  beerscloudId?: string;
  mp4Url?: string;     // URL MP4 directe pour VOSTFR
  mp4VfUrl?: string;   // URL MP4 directe pour VF
  poster?: string;
  className?: string;
  key?: string;
}

export default function VideoPlayer({
  sibnetId,
  vidmolyUrl,
  vidmolyId,
  vidmolyVfUrl,
  vidmolyVfId,
  movearnUrl,
  movearnVfUrl,
  sendvidId,
  beerscloudId,
  mp4Url,
  mp4VfUrl,
  poster,
  className = "",
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const objectRef = useRef<HTMLObjectElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Génération d'une clé unique pour forcer le rechargement du composant
  const uniqueKey = sibnetId || vidmolyId || vidmolyVfId || movearnUrl || movearnVfUrl || sendvidId || beerscloudId || mp4Url || mp4VfUrl || Math.random().toString();
  
  // Construction URL Vidmoly - format complet
  let finalVidmolyUrl = "";
  if (vidmolyUrl) {
    // Utiliser l'URL complète fournie, en remplaçant le domaine par vidmoly.net
    finalVidmolyUrl = vidmolyUrl.replace('vidmoly.to', 'vidmoly.net');
  } else if (vidmolyId) {
    // Construire l'URL à partir de l'ID
    finalVidmolyUrl = `https://vidmoly.net/embed-${vidmolyId}.html`;
  }

  // Construction URL Vidmoly VF - format complet
  let finalVidmolyVfUrl = "";
  if (vidmolyVfUrl) {
    // Utiliser l'URL complète fournie, en remplaçant le domaine par vidmoly.net
    finalVidmolyVfUrl = vidmolyVfUrl.replace('vidmoly.to', 'vidmoly.net');
  } else if (vidmolyVfId) {
    // Construire l'URL à partir de l'ID
    finalVidmolyVfUrl = `https://vidmoly.net/embed-${vidmolyVfId}.html`;
  }
  
  // Construction de l'URL Beerscloud
  const beerscloudUrl = beerscloudId
    ? `https://beerscloud.com/iframe/${beerscloudId}`
    : null;
  
  // Vérifier si sibnetId est un lien m3u8
  const isM3U8Link = sibnetId?.includes('.m3u8');
  
  // Sélectionner l'URL MP4 à utiliser (VF ou VOSTFR)
  const mp4UrlToUse = mp4VfUrl || mp4Url;
  
  // Gérer le chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Gérer les erreurs de chargement
  const handleIframeError = () => {
    setIsLoading(false);
  };

  // Gérer le chargement de la vidéo MP4
  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  // Gérer les erreurs de chargement de la vidéo MP4
  const handleVideoError = () => {
    setIsLoading(false);
    console.error("Erreur de chargement de la vidéo MP4");
  };

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoading(true);
  }, [sibnetId, vidmolyId, vidmolyUrl, vidmolyVfId, vidmolyVfUrl, movearnUrl, movearnVfUrl, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);

  // Nettoyer l'iframe et la vidéo lors du démontage du composant
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
      
      // Nettoyer la vidéo MP4
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [sibnetId, vidmolyId, vidmolyUrl, vidmolyVfId, vidmolyVfUrl, movearnUrl, movearnVfUrl, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);
  
  return (
    <div className={`w-full h-full relative ${className}`} style={{ overflow: 'hidden' }} key={uniqueKey}>      
      {/* Afficher un loader pendant le chargement */}
      {isLoading && !isM3U8Link && !mp4UrlToUse && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
        </div>
      )}
      
      {/* Lecteur MP4 natif */}
      {mp4UrlToUse && (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={mp4UrlToUse}
            className="w-full h-full"
            controls
            poster={poster}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            key={`mp4-${mp4UrlToUse}`}
            style={{ 
              display: isLoading ? 'none' : 'block',
              width: '100%',
              height: '100%'
            }}
            preload="metadata"
          />
          {/* Grand bouton play au centre */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: isLoading ? 0 : 1 }}
          >
            <div className="bg-blue-600/70 rounded-full p-5 shadow-lg">
              <Play className="h-10 w-10 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}
      
      {/* Lecteur HLS pour les liens m3u8 */}
      {sibnetId && isM3U8Link && (
        <HLSPlayer
          src={sibnetId}
          poster={poster}
          className="w-full h-full"
          autoPlay={true}
          key={sibnetId}
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
          key={sibnetId}
          style={{ 
            display: isLoading ? 'none' : 'block',
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 1
          }}
        />
      )}
      
      {/* Lecteur Vidmoly (iframe direct) */}
      {finalVidmolyUrl && !sibnetId && !movearnUrl && !movearnVfUrl && (
        <div className="relative w-full h-full">
          <iframe 
            ref={iframeRef}
            src={finalVidmolyUrl}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen 
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            key={finalVidmolyUrl}
            style={{ border: 'none' }}
          />
          {/* Bloqueurs de popup (sauf centre pour laisser le bouton play) */}
          <div className="absolute top-0 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-1/2 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
          <div className="absolute top-1/2 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
        </div>
      )}

      {/* Lecteur Vidmoly VF (iframe direct) */}
      {finalVidmolyVfUrl && !sibnetId && !movearnUrl && !movearnVfUrl && (
        <div className="relative w-full h-full">
          <iframe 
            ref={iframeRef}
            src={finalVidmolyVfUrl}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen 
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            className="absolute inset-0 w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            key={finalVidmolyVfUrl}
            style={{ border: 'none' }}
          />
          {/* Bloqueurs de popup (sauf centre pour laisser le bouton play) */}
          <div className="absolute top-0 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-1/2 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
          <div className="absolute top-1/2 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
        </div>
      )}
      
      {/* Lecteur Movearnpre (iframe direct) */}
      {movearnUrl && !sibnetId && (
        <MovearnPlayer src={movearnUrl} />
      )}

      {/* Lecteur Movearnpre VF (iframe direct) */}
      {movearnVfUrl && !sibnetId && (
        <MovearnPlayer src={movearnVfUrl} />
      )}
      
      {/* Lecteur Sendvid (natif) avec support plein écran et bloqueurs de popup (sauf bas droit) */}
      {sendvidId && !sibnetId && !finalVidmolyUrl && !finalVidmolyVfUrl && !movearnUrl && !movearnVfUrl && (
        <div className="relative w-full h-full">
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
          key={sendvidId}
          style={{ 
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            left: '0',
            width: '100%',
            height: '100%'
          }}
          allow="fullscreen; autoplay; picture-in-picture; screen-wake-lock; accelerometer; gyroscope; clipboard-write; web-share"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
          {/* Bloqueurs de popup (sauf bas droit pour laisser le bouton plein écran) */}
          <div className="absolute top-0 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto' }} />
          <div className="absolute top-1/2 right-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
          <div className="absolute top-1/2 left-0 w-20 h-20 z-20" style={{ background: 'transparent', pointerEvents: 'auto', transform: 'translateY(-50%)' }} />
        </div>
      )}
      
      {/* Lecteur Beerscloud */}
      {beerscloudUrl && !sibnetId && !finalVidmolyUrl && !finalVidmolyVfUrl && !movearnUrl && !movearnVfUrl && !sendvidId && (
        <iframe 
          ref={iframeRef}
          src={beerscloudUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; screen-wake-lock; clipboard-write; web-share"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          key={beerscloudId}
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