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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const sibnetIframeRef = useRef<HTMLIFrameElement>(null);
  const vidmolyIframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    }, 10); // Réduit à 10ms pour un chargement plus rapide
  };
  
  // Reset chargement lors d'un changement d'URL
  useEffect(() => {
    setIsLoading(false); // Définir directement à false pour cacher l'indicateur de chargement
    setHasError(false);
    
    // Chargement initial des iframes
    if (sibnetIframeRef.current && sibnetId) {
      forceIframeReload(
        sibnetIframeRef.current, 
        sibnetId.includes('http') ? sibnetId : `https://video.sibnet.ru/shell.php?videoid=${sibnetId}`
      );
    }
    
    if (vidmolyIframeRef.current && finalVidmolyUrl) {
      // Chargement immédiat sans délai
      if (vidmolyIframeRef.current) {
        forceIframeReload(vidmolyIframeRef.current, finalVidmolyUrl);
      }
    }
  }, [sibnetId, vidmolyId, vidmolyUrl, finalVidmolyUrl]);
  
  // Empêcher les redirections depuis l'iframe
  useEffect(() => {
    // Fonction pour intercepter les tentatives de redirection
    const preventRedirects = (e: MessageEvent) => {
      // Bloquer les messages qui pourraient venir des iframes
      if (e.data && typeof e.data === 'string' && e.data.includes('location')) {
        e.stopPropagation();
        console.log('Tentative de redirection bloquée');
      }
    };

    // Fonction pour surveiller les clics sur les iframes et bloquer les redirections
    const handleFrameClick = (e: MouseEvent) => {
      // Si le clic est sur ou dans un iframe, on vérifie s'il s'agit d'un lien
      const frameDoc = vidmolyIframeRef.current?.contentDocument || sibnetIframeRef.current?.contentDocument;
      if (frameDoc) {
        const links = frameDoc.querySelectorAll('a');
        links.forEach(link => {
          // Empêcher les liens de s'ouvrir
          link.target = '_self';
          link.onclick = (e) => {
            e.preventDefault();
            return false;
          };
        });
      }
    };

    // Installer sur window pour intercepter au niveau global
    window.addEventListener('message', preventRedirects);
    if (containerRef.current) {
      containerRef.current.addEventListener('click', handleFrameClick as EventListener);
    }

    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('message', preventRedirects);
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleFrameClick as EventListener);
      }
    };
  }, []);
  
  // Installer des bloqueurs de redirection sur l'iframe au chargement
  const onIframeMount = (iframe: HTMLIFrameElement | null) => {
    if (!iframe) return;
    
    try {
      // Essayer de modifier le comportement du document iframe après chargement
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Annuler tous les événements de clic qui pourraient causer des redirections
            const links = iframeDoc.querySelectorAll('a');
            links.forEach(link => {
              link.target = '_self';
              link.onclick = (e) => { 
                e.preventDefault(); 
                return false; 
              };
            });
          }
        } catch (error) {
          console.log("Impossible d'accéder au contenu de l'iframe en raison des restrictions de sécurité CORS");
        }
      };
    } catch (e) {
      console.error("Erreur lors de la modification de l'iframe:", e);
    }
  };
  
  // Gestion des événements
  const handleIframeLoad = () => {
    // Pas de délai, afficher la vidéo immédiatement
    setIsLoading(false);
      
    // Appliquer la protection anti-redirection sur l'iframe chargé
    if (vidmolyIframeRef.current) {
      onIframeMount(vidmolyIframeRef.current);
    }
    if (sibnetIframeRef.current) {
      onIframeMount(sibnetIframeRef.current);
    }
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
    <div ref={containerRef} className={`w-full h-full relative ${className}`} style={{ overflow: 'hidden' }}>
      {/* L'indicateur de chargement est supprimé */}
      
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
      
      {/* Conteneur de protection contre les redirections */}
      <div className="w-full h-full relative">
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
            className="w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>
    </div>
  );
}