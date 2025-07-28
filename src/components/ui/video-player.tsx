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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const objectRef = useRef<HTMLObjectElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Génération d'une clé unique pour forcer le rechargement du composant
  const uniqueKey = useRef(`player-${Math.random().toString()}`).current;
  
  // Clé persistante pour Sibnet
  const sibnetKey = useRef(`sibnet-${sibnetId || Math.random().toString()}`).current;
  
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

  // Gérer le début de la lecture de la vidéo MP4
  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  // Gérer la pause de la vidéo MP4
  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
  }, [sibnetId, vidmolyId, vidmolyUrl, vidmolyVfId, vidmolyVfUrl, movearnUrl, movearnVfUrl, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);

  // Gestion spéciale pour Sibnet - empêcher le rechargement
  useEffect(() => {
    if (!sibnetId || isM3U8Link) return;

    let isInFullscreen = false;
    let originalSrc = '';

    const handleFullScreenChange = () => {
      const wasInFullscreen = isInFullscreen;
      isInFullscreen = document.fullscreenElement !== null || 
        (document as any).webkitFullscreenElement !== null || 
        (document as any).mozFullScreenElement !== null ||
        (document as any).msFullscreenElement !== null;
      
      setIsFullScreen(isInFullscreen);
      
      // Si on entre en plein écran, sauvegarder la source
      if (isInFullscreen && !wasInFullscreen && iframeRef.current) {
        originalSrc = iframeRef.current.src;
      }
    };

    const handleOrientationChange = () => {
      const newIsLandscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(newIsLandscape);
      
      // Si on est en plein écran et qu'on change d'orientation
      if (isInFullscreen && iframeRef.current) {
        // Empêcher le rechargement en forçant la même source
        if (originalSrc && iframeRef.current.src !== originalSrc) {
          iframeRef.current.src = originalSrc;
        }
        
        // Forcer l'iframe à rester visible
        iframeRef.current.style.display = 'block';
        iframeRef.current.style.visibility = 'visible';
        iframeRef.current.style.opacity = '1';
        iframeRef.current.style.zIndex = '9999';
      }
    };
    
    // Écouteurs d'événements
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Initialiser l'état d'orientation
    setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [sibnetId, isM3U8Link]);
  
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
  }, [vidmolyId, vidmolyUrl, vidmolyVfId, vidmolyVfUrl, movearnUrl, movearnVfUrl, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);
  
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
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          key={`mp4-${mp4UrlToUse}`}
          style={{ 
            display: isLoading ? 'none' : 'block',
            width: '100%',
            height: '100%'
          }}
            preload="metadata"
          />
          {/* Grand bouton play au centre - masqué quand la vidéo joue */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: isLoading ? 0 : 1 }}
            >
              <div className="bg-blue-600/70 rounded-full p-5 shadow-lg">
                <Play className="h-10 w-10 text-white" fill="white" />
              </div>
            </div>
          )}
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
        <div className="relative w-full h-0 md:pb-[40%] pb-[56.25%]">
          <iframe 
            ref={iframeRef}
            src={`https://video.sibnet.ru/shell.php?videoid=${sibnetId}&skin=4&share=1&autoplay=1&controls=1`}
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen 
            className="absolute inset-0 w-full h-full"
            allow="fullscreen; autoplay; picture-in-picture"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            data-sibnet-id={sibnetId}
            key={sibnetKey}
            style={{
              transition: 'none',
              transform: 'none',
              animation: 'none',
              willChange: 'auto',
              contain: 'none',
              visibility: 'visible',
              opacity: '1',
              display: 'block',
              zIndex: isFullScreen ? 9999 : 5
            }}
          />
        </div>
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