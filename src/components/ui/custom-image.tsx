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
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
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
    const checkDeviceAndBrowser = () => {
      setIsMobile(window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      
      // Détecter si nous sommes sur Firefox
      setIsFirefox(navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
    };
    
    checkDeviceAndBrowser();
    
    // Optimisation: Utiliser l'API Intersection Observer pour charger les images à la demande
    if (typeof IntersectionObserver !== 'undefined' && !priority && !isMobile) {
      const imgElement = document.querySelector(`img[alt="${alt}"]`);
      if (imgElement) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsLoading(false);
              observer.disconnect();
            }
          });
        }, {
          rootMargin: '200px', // Préchargement avant que l'image soit visible
          threshold: 0.01
        });
        
        observer.observe(imgElement);
        return () => observer.disconnect();
      }
    }
  }, [alt, priority, isMobile]);
  
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
    
    // Préchargement optimisé des images
    if (typeof src === 'string' && src.startsWith('http')) {
      if (priority || isMobile) {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
          console.error(`Erreur de chargement d'image: ${src}`);
          setError(true);
          setImgSrc(fallbackSrc);
        };
      }
    }
  }, [src, isMobile, isFirefox, priority, fallbackSrc]);
  
  // Déterminer si l'image est externe (commence par http ou https)
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Si c'est une image externe ou Firefox, désactiver l'optimisation par défaut sauf indication contraire
  const shouldUnoptimize = unoptimized || (isExternalImage && isFirefox);

  const handleError = () => {
    setError(true);
    setImgSrc(fallbackSrc);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Déterminer les propriétés loading et priority
  const shouldPrioritize = priority !== undefined ? priority : 
    (isMobile || isFirefox || (typeof src === 'string' && src.includes('thumbnail')));
  
  // On ne définit pas loading si priority est true
  const loadingProp = shouldPrioritize 
    ? undefined 
    : (loading !== undefined ? loading : "lazy");

  // Placeholder blurDataURL pour un meilleur LCP
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48L3N2Zz4=';

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
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes={sizes}
        quality={quality}
        {...props}
      />
    </div>
  );
}
