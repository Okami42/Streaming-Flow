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
  
  // Mettre à jour imgSrc quand src change
  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setIsLoading(true);
  }, [src]);
  
  // Déterminer si l'image est externe (commence par http ou https)
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Si c'est une image externe, désactiver l'optimisation par défaut sauf indication contraire
  const shouldUnoptimize = true; // Force unoptimized for all images to fix mobile display issues
  
  // Force eager loading for mobile
  const loadingProp = props.loading || 'eager';

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
        loading={loadingProp}
        {...props}
      />
    </div>
  );
}
