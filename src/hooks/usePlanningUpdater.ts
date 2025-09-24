"use client";

import { useState, useEffect } from 'react';
import { getCurrentWeekPlanning, type WeeklyPlanning } from '@/lib/planning-data';

export function usePlanningUpdater() {
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

    // Calculer le temps jusqu'à minuit
    const setupMidnightTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      // Timer pour la première mise à jour à minuit
      const midnightTimer = setTimeout(() => {
        updatePlanning();
        
        // Puis mettre à jour toutes les 24 heures
        const dailyInterval = setInterval(updatePlanning, 24 * 60 * 60 * 1000);
        
        // Nettoyer l'interval précédent et configurer le prochain
        return () => {
          clearInterval(dailyInterval);
          setupMidnightTimer(); // Re-configurer pour le prochain cycle
        };
      }, timeUntilMidnight);

      return midnightTimer;
    };

    const timer = setupMidnightTimer();

    return () => {
      clearTimeout(timer);
    };
  }, []); // Pas de dépendances pour éviter la boucle infinie

  // Effet séparé pour le listener de visibilité
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdate) {
        const now = new Date();
        const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
        // Si plus de 5 minutes se sont écoulées, mettre à jour
        if (timeSinceLastUpdate > 5 * 60 * 1000) {
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
