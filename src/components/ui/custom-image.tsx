'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

export interface CustomImageProps extends NextImageProps {
  fallbackSrc?: string;
}

export default function CustomImage({
  alt,
  src,
  className,
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  ...props
}: CustomImageProps) {
  const [error, setError] = useState(false);

  return (
    <NextImage
      alt={alt}
      src={error ? fallbackSrc : src}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
