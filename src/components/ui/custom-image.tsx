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
  
  // Déterminer si l'image est externe (commence par http ou https)
  const isExternalImage = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Si c'est une image externe, désactiver l'optimisation par défaut sauf indication contraire
  const shouldUnoptimize = unoptimized || isExternalImage;
  
  // Pour le débogage
  useEffect(() => {
    if (isExternalImage) {
      console.log(`Image externe chargée: ${src}`);
    }
  }, [src, isExternalImage]);

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${src}`);
    setError(true);
    setImgSrc(fallbackSrc);
  };

  return (
    <NextImage
      alt={alt}
      src={error ? fallbackSrc : imgSrc}
      className={className}
      onError={handleError}
      unoptimized={shouldUnoptimize}
      {...props}
    />
  );
}
