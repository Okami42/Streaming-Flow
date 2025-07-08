'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState, useEffect } from 'react';

export interface CustomImageProps extends NextImageProps {
  fallbackSrc?: string;
  unoptimized?: boolean;
}

export default function CustomImage({
  alt,
  src,
  className,
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  unoptimized = false,
  ...props
}: CustomImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  
  // Détecter si nous sommes sur mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Détecter si nous sommes sur mobile
    setIsMobile(window.innerWidth < 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      
    // Fonction pour vérifier si l'image est en cache
    const checkImageCache = async (url: string) => {
      if (typeof url !== 'string' || !url.startsWith('http')) return;
      
      try {
        // Vérifier si l'image est dans le cache
        const cache = await caches.open('image-cache');
        const cachedResponse = await cache.match(url);
        
        if (!cachedResponse) {
          // Si l'image n'est pas en cache, la précharger et l'ajouter au cache
          const response = await fetch(url, { mode: 'no-cors' });
          await cache.put(url, response);
        }
      } catch (err) {
        console.log('Cache non disponible:', err);
      }
    };
    
    // Précharger l'image si c'est une URL
    if (typeof src === 'string' && src.startsWith('http')) {
      checkImageCache(src);
    }
  }, [src]);
  
  // Mettre à jour imgSrc quand src change
  useEffect(() => {
    setImgSrc(src);
    setError(false);
    
    // Sur mobile, ne pas montrer l'état de chargement si l'image est déjà dans le DOM
    // Cela évite le clignotement lors de l'actualisation
    if (isMobile && document.querySelector(`img[src="${src}"]`)) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [src, isMobile]);
  
  // Déterminer si l'image est externe (commence par http ou https)
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Si c'est une image externe, désactiver l'optimisation par défaut sauf indication contraire
  const shouldUnoptimize = unoptimized || isExternalImage;

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${src}`);
    setError(true);
    setImgSrc(fallbackSrc);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <NextImage
        alt={alt}
        src={error ? fallbackSrc : imgSrc}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={shouldUnoptimize}
        priority={isMobile} // Donner la priorité aux images sur mobile
        loading={isMobile ? "eager" : props.loading || "lazy"} // Forcer le chargement eager sur mobile
        {...props}
      />
    </div>
  );
}
