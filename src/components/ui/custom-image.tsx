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
  priority,
  loading,
  ...props
}: CustomImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  
  // Détecter si nous sommes sur mobile ou Firefox
  const [isMobile, setIsMobile] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  
  useEffect(() => {
    // Détecter si nous sommes sur mobile
    setIsMobile(window.innerWidth < 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    // Détecter si nous sommes sur Firefox
    setIsFirefox(navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
      
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
      // Précharger l'image manuellement pour Firefox
      if (isFirefox) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setIsLoading(false);
        };
        img.onerror = () => {
          console.error(`Erreur de chargement d'image Firefox: ${src}`);
          setError(true);
          setImgSrc(fallbackSrc);
        };
      } else {
        checkImageCache(src);
      }
    }
  }, [src, fallbackSrc]);
  
  // Mettre à jour imgSrc quand src change
  useEffect(() => {
    setImgSrc(src);
    setError(false);
    
    // Sur mobile ou Firefox, ne pas montrer l'état de chargement si l'image est déjà dans le DOM
    // Cela évite le clignotement lors de l'actualisation
    if ((isMobile || isFirefox) && document.querySelector(`img[src="${src}"]`)) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [src, isMobile, isFirefox]);
  
  // Déterminer si l'image est externe (commence par http ou https)
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Si c'est une image externe ou Firefox, désactiver l'optimisation par défaut sauf indication contraire
  const shouldUnoptimize = unoptimized || isExternalImage || isFirefox;

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${src}`);
    setError(true);
    setImgSrc(fallbackSrc);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Déterminer les propriétés loading et priority
  // Si priority est fourni explicitement, on l'utilise
  // Sinon, on utilise notre logique mobile/Firefox
  const shouldPrioritize = priority !== undefined ? priority : (isMobile || isFirefox);
  
  // On ne définit pas loading si priority est true
  // car ces propriétés sont mutuellement exclusives
  const loadingProp = shouldPrioritize 
    ? undefined 
    : (loading !== undefined ? loading : (isMobile || isFirefox ? "eager" : "lazy"));

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
        priority={shouldPrioritize}
        loading={loadingProp}
        {...props}
      />
    </div>
  );
}
