"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import HLSPlayer from "../../../hls-player";

// Script pour remplacer vidmoly.to par vidmoly.net dans les iframes
const vidmolyScript = `
;(function() {
  // 1. Remplace toutes les occurrences de vidmoly.to par vidmoly.net  
  function replaceVidmoly(url) {
    return url.replace(/vidmoly\\.to/g, 'vidmoly.net');
  }

  // 2. On surcharge le setter de la propriété \`src\` pour tous les <iframe>
  const proto = HTMLIFrameElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(proto, 'src');
  Object.defineProperty(proto, 'src', {
    get: descriptor.get,
    set: function(value) {
      // on ajuste l'URL avant de passer au setter d'origine
      const newVal = (typeof value === 'string')
        ? replaceVidmoly(value)
        : value;
      return descriptor.set.call(this, newVal);
    }
  });

  // 3. À l'initialisation du DOM, on corrige les attributs déjà présents
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.getAttribute('src') || '';
    if (src.includes('vidmoly.to')) {
      iframe.setAttribute('src', replaceVidmoly(src));
    }
  });
})();
`;

interface VideoPlayerProps {
  sibnetId?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  sendvidId?: string;
  beerscloudId?: string;
  mp4Url?: string;     // Nouveau: URL MP4 directe pour VOSTFR
  mp4VfUrl?: string;   // Nouveau: URL MP4 directe pour VF
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
  mp4Url,           // Nouveau paramètre
  mp4VfUrl,         // Nouveau paramètre
  poster,
  className = "",
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const objectRef = useRef<HTMLObjectElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Génération d'une clé unique pour forcer le rechargement du composant
  const uniqueKey = sibnetId || vidmolyId || sendvidId || beerscloudId || mp4Url || mp4VfUrl || Math.random().toString();
  
  // Construction directe de l'URL Vidmoly - format standard
  const finalVidmolyUrl = vidmolyId 
    ? `https://vidmoly.net/embed-${vidmolyId}.html`
    : vidmolyUrl;
  
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

  // Injecter le script pour remplacer vidmoly.to par vidmoly.net
  useEffect(() => {
    if (vidmolyId || vidmolyUrl) {
      const script = document.createElement('script');
      script.innerHTML = vidmolyScript;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [vidmolyId, vidmolyUrl]);

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoading(true);
  }, [sibnetId, vidmolyId, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);

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
  }, [sibnetId, vidmolyId, sendvidId, beerscloudId, mp4Url, mp4VfUrl]);
  
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
        <video
          ref={videoRef}
          src={mp4UrlToUse}
          className="w-full h-full"
          controls
          autoPlay
          poster={poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          key={`mp4-${mp4UrlToUse}`}
          style={{ 
            display: isLoading ? 'none' : 'block',
            width: '100%',
            height: '100%'
          }}
        />
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
      
      {/* Lecteur Vidmoly (iframe officiel) - solution radicale */}
      {finalVidmolyUrl && !sibnetId && (
        <div className="relative w-full h-full overflow-hidden">
        <iframe 
          ref={iframeRef}
          src={finalVidmolyUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock; accelerometer; gyroscope; clipboard-write; web-share"
          className="w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          key={vidmolyId}
          style={{ 
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: 1
          }}
            referrerPolicy="origin"
        />
        </div>
      )}
      
      {/* Lecteur Sendvid (natif) avec support plein écran et bloqueurs de popup (sauf bas droit) */}
      {sendvidId && !sibnetId && !finalVidmolyUrl && (
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
      {beerscloudUrl && !sibnetId && !finalVidmolyUrl && !sendvidId && (
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