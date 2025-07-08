'use client';

import { useState, useEffect } from 'react';
import type { StaticImageData } from 'next/image';

// Type pour les sources d'images
type ImageSource = string | StaticImageData | { src: string; height?: number; width?: number };

interface MobileImageProps {
  src: ImageSource;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
}

export default function MobileImage({
  src,
  alt,
  className = '',
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  style = {},
}: MobileImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Convertir la source en chaîne
  const getStringSource = (source: ImageSource): string => {
    if (typeof source === 'string') {
      return source;
    } else if ('src' in source) {
      return source.src;
    } else {
      return '';
    }
  };

  // Mettre à jour imgSrc quand src change
  useEffect(() => {
    setImgSrc(getStringSource(src));
    setError(false);
    setIsLoading(true);
  }, [src]);

  // Ajouter un paramètre anti-cache pour les images externes
  useEffect(() => {
    const currentSrc = getStringSource(src);
    if (currentSrc && (currentSrc.startsWith('http://') || currentSrc.startsWith('https://'))) {
      const cacheBuster = `${currentSrc}${currentSrc.includes('?') ? '&' : '?'}v=${new Date().getTime()}`;
      setImgSrc(cacheBuster);
    }
  }, [src]);

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${getStringSource(src)}`);
    setError(true);
    setImgSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full" style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'} w-full h-full object-cover`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
} 