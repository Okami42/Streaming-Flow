"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeekPlanning, type WeeklyPlanning } from '@/lib/planning-data';

async function loadPlanning(): Promise<WeeklyPlanning> {
  try {
    // Toujours lire depuis l'API (priorité absolue sur les données statiques)
    const res = await fetch('/api/admin/planning', {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.planning) {
        // Recalculer isToday en live
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
  return getCurrentWeekPlanning();
}

// Version DEV : même comportement que prod mais avec polling plus fréquent
export function usePlanningUpdaterDev() {
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

    // En DEV: poll toutes les 5 secondes pour voir les changements admin en temps réel
    const devInterval = setInterval(updatePlanning, 5000);
    return () => clearInterval(devInterval);
  }, [updatePlanning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) updatePlanning();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [updatePlanning]);

  return {
    weekPlanning,
    lastUpdate,
    refreshPlanning,
    isLoading: weekPlanning === null,
  };
}
