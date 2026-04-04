import React, { useEffect } from 'react';

interface MovearnPlayerProps {
  src: string;
  className?: string;
}

export default function MovearnPlayer({ src, className = "" }: MovearnPlayerProps) {
  // Effet pour bloquer les redirections vers des sites externes
  useEffect(() => {
    // Sauvegarder la fonction originale window.open
    const originalOpen = window.open;
    
    // Remplacer window.open pour bloquer les popups
    window.open = function(url?: string | URL, target?: string, features?: string) {
      // Si l'URL est définie et ne contient pas okastream.fr, la bloquer
      if (url) {
        const urlString = url.toString();
        if (!urlString.includes('okastream.fr')) {
          console.log('Redirection externe bloquée:', urlString);
          return null;
        }
      }
      
      // Sinon, permettre l'ouverture (cas peu probable mais pour être complet)
      return originalOpen.call(window, url, target, features);
    };
    
    // Fonction pour bloquer les navigations vers des sites externes
    const blockExternalNavigation = (e: BeforeUnloadEvent) => {
      // Annuler l'événement de déchargement
      e.preventDefault();
      // Chrome requiert returnValue pour être défini
      e.returnValue = '';
      return '';
    };
    
    // Ajouter un écouteur pour l'événement beforeunload
    window.addEventListener('beforeunload', blockExternalNavigation);
    
    // Nettoyer au démontage
    return () => {
      window.open = originalOpen;
      window.removeEventListener('beforeunload', blockExternalNavigation);
    };
  }, []);
  
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Iframe pour la vidéo */}
      <iframe 
        src={src}
        width="100%" 
        height="100%" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        className="w-full h-full"
        style={{ border: 'none' }}
      />
      
      {/* Overlay transparent qui bloque les clics sur les bords (zones publicitaires) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Zones de blocage (haut, bas, gauche, droite) */}
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-auto" 
             onClick={(e) => e.preventDefault()}></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-auto" 
             onClick={(e) => e.preventDefault()}></div>
        <div className="absolute top-12 bottom-12 left-0 w-12 pointer-events-auto" 
             onClick={(e) => e.preventDefault()}></div>
        <div className="absolute top-12 bottom-12 right-0 w-12 pointer-events-auto" 
             onClick={(e) => e.preventDefault()}></div>
      </div>
    </div>
  );
} 
