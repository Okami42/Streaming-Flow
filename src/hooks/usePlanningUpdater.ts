"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeekPlanning, type WeeklyPlanning } from '@/lib/planning-data';

async function loadPlanning(): Promise<WeeklyPlanning> {
  try {
    // Priorité 1 : lire le fichier sauvegardé par l'admin via l'API
    const res = await fetch('/api/admin/planning', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.planning) {
        // Recalculer isToday (les dates sauvegardées peuvent être décalées si la semaine a changé)
        const today = new Date().toISOString().split('T')[0];
        data.planning.days = data.planning.days.map((d: any) => ({
          ...d,
          isToday: d.date === today,
        }));
        return data.planning as WeeklyPlanning;
      }
    }
  } catch {
    // Silencieux — fallback sur données statiques
  }
  // Priorité 2 : données statiques de planning-data.ts
  return getCurrentWeekPlanning();
}

export function usePlanningUpdater() {
  const [weekPlanning, setWeekPlanning] = useState<WeeklyPlanning | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const updatePlanning = useCallback(async () => {
    const planning = await loadPlanning();
    setWeekPlanning(planning);
    setLastUpdate(new Date());
  }, []);

  const refreshPlanning = useCallback(() => {
    updatePlanning();
  }, [updatePlanning]);

  useEffect(() => {
    updatePlanning();

    const setupMidnightTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();

      const midnightTimer = setTimeout(() => {
        updatePlanning();
        const dailyInterval = setInterval(updatePlanning, 24 * 60 * 60 * 1000);
        return () => clearInterval(dailyInterval);
      }, timeUntilMidnight);

      return midnightTimer;
    };

    const timer = setupMidnightTimer();
    return () => clearTimeout(timer);
  }, [updatePlanning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdate) {
        const now = new Date();
        const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
        if (timeSinceLastUpdate > 5 * 60 * 1000) {
          updatePlanning();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastUpdate, updatePlanning]);

  return {
    weekPlanning,
    lastUpdate,
    refreshPlanning,
    isLoading: weekPlanning === null,
  };
}
