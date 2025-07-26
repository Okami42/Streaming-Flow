'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
  className?: string;
}

export default function LazyLoadWrapper({
  children,
  threshold = 0.1,
  rootMargin = '200px 0px',
  placeholder,
  className = '',
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si window n'est pas défini (SSR) ou IntersectionObserver n'est pas supporté
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Créer un observer pour détecter quand l'élément est visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          
          // Marquer comme chargé après une courte période pour permettre le rendu
          setTimeout(() => {
            setHasLoaded(true);
          }, 100);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Observer l'élément actuel
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Nettoyer l'observer quand le composant est démonté
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div 
      ref={ref} 
      className={`transition-opacity duration-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {isVisible ? children : placeholder || <div className="w-full h-full bg-gray-800 animate-pulse" />}
    </div>
  );
} 