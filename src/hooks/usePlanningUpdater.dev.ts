"use client";

import { useState, useEffect } from 'react';
import { getCurrentWeekPlanning, type WeeklyPlanning } from '@/lib/planning-data';

// Version de développement avec mise à jour plus fréquente pour les tests
export function usePlanningUpdaterDev() {
  const [weekPlanning, setWeekPlanning] = useState<WeeklyPlanning | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Fonction pour mettre à jour le planning
  const updatePlanning = () => {
    const newPlanning = getCurrentWeekPlanning();
    setWeekPlanning(newPlanning);
    setLastUpdate(new Date());
  };

  // Fonction pour forcer une mise à jour manuelle
  const refreshPlanning = () => {
    updatePlanning();
  };

  useEffect(() => {
    // Initialiser le planning au chargement
    updatePlanning();

    // DÉVELOPPEMENT: Mettre à jour toutes les 30 secondes pour les tests
    const devInterval = setInterval(() => {
      updatePlanning();
    }, 30 * 1000); // 30 secondes

    return () => {
      clearInterval(devInterval);
    };
  }, []); // Pas de dépendances pour éviter la boucle infinie

  // Effet séparé pour le listener de visibilité
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdate) {
        const now = new Date();
        const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
        // Si plus de 10 secondes se sont écoulées en mode dev
        if (timeSinceLastUpdate > 10 * 1000) {
          updatePlanning();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [lastUpdate]); // Seulement pour le listener de visibilité

  return {
    weekPlanning,
    lastUpdate,
    refreshPlanning,
    isLoading: weekPlanning === null
  };
}
