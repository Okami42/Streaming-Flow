'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HistoryItem, WatchHistoryItem, ReadHistoryItem } from '@/lib/history';
import { mockWatchHistory, mockReadHistory } from '@/lib/mock-history';
import { useAuth } from '@/context/auth-context';

interface HistoryContextType {
  history: HistoryItem[];
  watchHistory: WatchHistoryItem[];
  readHistory: ReadHistoryItem[];
  addToWatchHistory: (item: WatchHistoryItem) => void;
  addToReadHistory: (item: ReadHistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => Promise<void>;
  updateWatchProgress: (id: string, progress: number) => void;
  updateReadProgress: (id: string, page: number) => void;
  getWatchHistoryItem: (id: string) => WatchHistoryItem | undefined;
  ensureMovieInHistory: (movieItem: WatchHistoryItem) => void;
  syncHistory: () => Promise<void>;
  loadUserHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [readHistory, setReadHistory] = useState<ReadHistoryItem[]>([]);
  const { isAuthenticated, user } = useAuth();

  // Charger l'historique de l'utilisateur depuis le serveur
  const loadUserHistory = useCallback(async () => {
    // Protection renforcée : vérifier TOUS les critères
    if (!isAuthenticated || !user) {
      console.log('loadUserHistory: Utilisateur non connecté, pas d\'appel DB');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.log('loadUserHistory: Pas de token, pas d\'appel DB');
        return;
      }

      console.log('loadUserHistory: Appel DB autorisé pour utilisateur connecté');
      const response = await fetch('/api/history/sync', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWatchHistory(data.data.watchHistory || []);
          setReadHistory(data.data.readHistory || []);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    }
  }, [isAuthenticated, user]);

  // Synchroniser l'historique avec le serveur
  const syncHistory = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      await fetch('/api/history/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          watchHistory,
          readHistory,
        }),
      });
    } catch (error) {
      console.error('Erreur lors de la synchronisation de l\'historique:', error);
    }
  }, [isAuthenticated, user, watchHistory, readHistory]);

  // Combine both histories, sorted by most recent
  const history: HistoryItem[] = React.useMemo(() => {
    // Créer une copie pour ne pas modifier les tableaux originaux
    const combinedHistory = [...watchHistory, ...readHistory];
    
    // Trier par date de visionnage/lecture (la plus récente en premier)
    return combinedHistory.sort((a, b) => {
      const dateA = new Date('lastWatchedAt' in a ? a.lastWatchedAt : a.lastReadAt);
      const dateB = new Date('lastWatchedAt' in b ? b.lastWatchedAt : b.lastReadAt);
      return dateB.getTime() - dateA.getTime(); // Sort by most recent
    });
  }, [watchHistory, readHistory]);

  useEffect(() => {
    console.log('History useEffect déclenché:', { isAuthenticated, user: !!user, mounted });
    
    if (isAuthenticated && user) {
      // Si l'utilisateur est connecté, charger son historique depuis le serveur
      console.log('Chargement historique depuis serveur pour utilisateur connecté');
      loadUserHistory();
    } else {
      // Si pas connecté, charger depuis localStorage
      console.log('Chargement historique depuis localStorage (pas d\'appel DB)');
      const savedWatchHistory = localStorage.getItem('animeWatchHistory');
      const savedReadHistory = localStorage.getItem('animeReadHistory');

      if (savedWatchHistory) {
        setWatchHistory(JSON.parse(savedWatchHistory));
      } else {
        setWatchHistory([]);
      }

      if (savedReadHistory) {
        setReadHistory(JSON.parse(savedReadHistory));
      } else {
        setReadHistory([]);
      }
    }

    setMounted(true);
  }, [isAuthenticated, user, loadUserHistory]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      // Si pas connecté, sauvegarder en local uniquement
      localStorage.setItem('animeWatchHistory', JSON.stringify(watchHistory));
      localStorage.setItem('animeReadHistory', JSON.stringify(readHistory));
    }
  }, [mounted, watchHistory, readHistory, isAuthenticated]);

  // Effet séparé pour la synchronisation avec le serveur
  useEffect(() => {
    if (mounted && isAuthenticated && user && (watchHistory.length > 0 || readHistory.length > 0)) {
      // Synchroniser avec le serveur seulement si connecté et qu'il y a des données
      const timeoutId = setTimeout(() => {
        syncHistory();
      }, 1000); // Délai pour éviter les appels trop fréquents

      return () => clearTimeout(timeoutId);
    }
  }, [mounted, watchHistory, readHistory, isAuthenticated, user, syncHistory]);

  const addToWatchHistory = (item: WatchHistoryItem) => {
    setWatchHistory(prev => {
      // Obtenir l'ID de base de l'anime (sans numéro d'épisode/saison)
      const getBaseAnimeId = (id: string) => {
        return id.split('-s')[0].split('-e')[0];
      };
      
      // ID de base de l'anime pour l'élément actuel
      const baseAnimeId = getBaseAnimeId(item.id);
      
      // Filtrer les entrées du même anime
      const filteredHistory = prev.filter(i => {
        const itemBaseId = getBaseAnimeId(i.id);
        return itemBaseId !== baseAnimeId; // Garder uniquement les entrées d'autres animes
      });
      
      // Log pour déboguer
      console.log(`Mise à jour de l'historique: ${item.id} remplace les anciens épisodes de ${baseAnimeId}`);
      
      // Ajouter le nouvel élément au début
      return [item, ...filteredHistory];
    });
  };

  const addToReadHistory = (item: ReadHistoryItem) => {
    setReadHistory(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      return [item, ...filtered];
    });
  };

  const removeFromHistory = (id: string) => {
    setWatchHistory(prev => prev.filter(item => item.id !== id));
    setReadHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = async () => {
    if (isAuthenticated && user) {
      // Si connecté, supprimer de la base de données
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await fetch('/api/history/sync', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            // Supprimer aussi localement
            setWatchHistory([]);
            setReadHistory([]);
          } else {
            console.error('Erreur lors de la suppression de l\'historique');
          }
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'historique:', error);
      }
    } else {
      // Si pas connecté, supprimer seulement en local
      setWatchHistory([]);
      setReadHistory([]);
    }
  };

  const updateWatchProgress = (id: string, progress: number) => {
    setWatchHistory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, progress, lastWatchedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const updateReadProgress = (id: string, page: number) => {
    setReadHistory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, page, lastReadAt: new Date().toISOString() }
          : item
      )
    );
  };

  // Nouvelle fonction pour récupérer un élément spécifique de l'historique
  const getWatchHistoryItem = (id: string): WatchHistoryItem | undefined => {
    return watchHistory.find(item => item.id === id);
  };

  // Nouvelle fonction spécifique pour les films qui garantit qu'un film est toujours
  // présent dans l'historique avant de commencer la lecture
  const ensureMovieInHistory = (movieItem: WatchHistoryItem): void => {
    // Vérifier si l'élément existe déjà dans l'historique
    const existingItem = watchHistory.find(item => item.id === movieItem.id);
    
    if (!existingItem) {
      // Si l'élément n'existe pas, l'ajouter à l'historique
      // avec une progression minimale pour éviter la remise à zéro
      setWatchHistory(prev => [movieItem, ...prev]);
      
      // Sauvegarder immédiatement dans localStorage pour éviter les problèmes
      // lors des rafraîchissements de page
      if (mounted) {
        const updatedHistory = [movieItem, ...watchHistory.filter(i => i.id !== movieItem.id)];
        localStorage.setItem('animeWatchHistory', JSON.stringify(updatedHistory));
      }
    }
  };

  const value = {
    history,
    watchHistory,
    readHistory,
    addToWatchHistory,
    addToReadHistory,
    removeFromHistory,
    clearHistory,
    updateWatchProgress,
    updateReadProgress,
    getWatchHistoryItem,
    ensureMovieInHistory,
    syncHistory,
    loadUserHistory,
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
