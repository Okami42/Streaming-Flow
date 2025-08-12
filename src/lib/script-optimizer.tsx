
'use client';

import { useEffect } from 'react';

interface NonCriticalScript {
  src: string;
  async?: boolean;
}

export function ScriptOptimizer() {
  useEffect(() => {
    // Fonction pour charger les scripts de manière différée
    const loadDeferredScripts = () => {
      // Attendre que la page soit complètement chargée et inactive
      if (document.readyState === 'complete') {
        setTimeout(() => {
          // Ici, vous pouvez ajouter des scripts non critiques
          // qui seront chargés après que la page soit entièrement rendue
          
          // Exemple: Analytics, outils de chat, etc.
          const nonCriticalScripts: NonCriticalScript[] = [
            // Ajoutez ici les URLs de vos scripts non critiques
            // { src: 'https://example.com/analytics.js', async: true },
          ];
          
          nonCriticalScripts.forEach(script => {
            const scriptEl = document.createElement('script');
            scriptEl.src = script.src;
            if (script.async) scriptEl.async = true;
            document.body.appendChild(scriptEl);
          });
        }, 1000); // Délai de 1 seconde après le chargement complet
      }
    };
    
    // Écouter l'événement de chargement complet
    if (document.readyState === 'complete') {
      loadDeferredScripts();
    } else {
      window.addEventListener('load', loadDeferredScripts);
      return () => {
        window.removeEventListener('load', loadDeferredScripts);
      };
    }
    
    // Optimisation pour les ressources tierces
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Détecter les ressources lentes
        if (entry.duration > 500 && 
            'initiatorType' in entry && 
            (entry as PerformanceResourceTiming).initiatorType === 'script') {
          console.warn('Ressource lente détectée:', entry.name, 'Durée:', entry.duration);
        }
      });
    });
    
    // Observer les performances de chargement des ressources
    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('PerformanceObserver non supporté');
    }
    
    return () => {
      try {
        observer.disconnect();
      } catch (e) {
        // Ignorer les erreurs
      }
    };
  }, []);
  
  return null;
}

export default ScriptOptimizer; 