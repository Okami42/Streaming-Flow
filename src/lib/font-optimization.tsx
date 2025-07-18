'use client';

import { useEffect } from 'react';

export function FontOptimizer() {
  useEffect(() => {
    // Fonction pour précharger les polices
    const preloadFonts = () => {
      const fontUrls = [
        // Ajoutez ici les URLs de vos polices principales
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      ];

      // Préchargement des polices
      fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'preload';
        link.as = 'style';
        link.onload = () => { link.onload = null; link.rel = 'stylesheet'; };
        document.head.appendChild(link);
      });
    };

    // Optimisation du chargement des polices
    if ('fonts' in document) {
      // Utiliser l'API Font Loading si disponible
      Promise.all([
        document.fonts.load('1em Inter'),
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      }).catch(err => {
        console.warn('Font loading failed', err);
      });
    }

    // Précharger les polices
    preloadFonts();

    // Ajouter une classe pour indiquer que le JS est chargé
    document.documentElement.classList.add('js-loaded');

    // Optimisation pour les polices personnalisées
    const style = document.createElement('style');
    style.textContent = `
      @font-display: swap;
      
      /* Optimisation pour éviter le FOIT (Flash of Invisible Text) */
      .fonts-loaded body {
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
      }
    `;
    document.head.appendChild(style);

  }, []);

  return null;
}

export default FontOptimizer; 