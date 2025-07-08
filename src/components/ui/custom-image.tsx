'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import MobileImage from './mobile-image';
import { isMobileDevice } from '@/lib/utils';

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
  fill,
  ...props
}: CustomImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si l'utilisateur est sur mobile
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);
  
  // Mettre à jour imgSrc quand src change
  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setIsLoading(true);
  }, [src]);
  
  // Toujours désactiver l'optimisation pour les images externes
  const shouldUnoptimize = true;

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${typeof src === 'string' ? src : 'image'}`);
    setError(true);
    setImgSrc(fallbackSrc);
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Sur mobile, utiliser le composant MobileImage
  if (isMobile) {
    return (
      <MobileImage
        src={src}
        alt={alt}
        className={className}
        fallbackSrc={fallbackSrc}
        style={fill ? { position: 'absolute', inset: 0 } : {}}
      />
    );
  }

  // Sur desktop, utiliser NextImage
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
        loading="eager"
        fill={fill}
        {...props}
      />
    </div>
  );
}
