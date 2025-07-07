'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HistoryItem, WatchHistoryItem, ReadHistoryItem } from '@/lib/history';
import { mockWatchHistory, mockReadHistory } from '@/lib/mock-history';

interface HistoryContextType {
  history: HistoryItem[];
  watchHistory: WatchHistoryItem[];
  readHistory: ReadHistoryItem[];
  addToWatchHistory: (item: WatchHistoryItem) => void;
  addToReadHistory: (item: ReadHistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  updateWatchProgress: (id: string, progress: number) => void;
  updateReadProgress: (id: string, page: number) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [readHistory, setReadHistory] = useState<ReadHistoryItem[]>([]);

  // Combine both histories, sorted by most recent
  const history: HistoryItem[] = React.useMemo(() => {
    return [...watchHistory, ...readHistory].sort((a, b) => {
      const dateA = new Date('lastWatchedAt' in a ? a.lastWatchedAt : a.lastReadAt);
      const dateB = new Date('lastWatchedAt' in b ? b.lastWatchedAt : b.lastReadAt);
      return dateB.getTime() - dateA.getTime(); // Sort by most recent
    });
  }, [watchHistory, readHistory]);

  useEffect(() => {
    // For demo purposes, use mock data first time
    const savedWatchHistory = localStorage.getItem('animeWatchHistory');
    const savedReadHistory = localStorage.getItem('animeReadHistory');

    if (savedWatchHistory) {
      setWatchHistory(JSON.parse(savedWatchHistory));
    } else {
      // Ne pas charger les données fictives par défaut
      setWatchHistory([]);
    }

    if (savedReadHistory) {
      setReadHistory(JSON.parse(savedReadHistory));
    } else {
      // Ne pas charger les données fictives par défaut
      setReadHistory([]);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('animeWatchHistory', JSON.stringify(watchHistory));
      localStorage.setItem('animeReadHistory', JSON.stringify(readHistory));
    }
  }, [mounted, watchHistory, readHistory]);

  const addToWatchHistory = (item: WatchHistoryItem) => {
    setWatchHistory(prev => {
      // Remove if exists already (to update it)
      const filtered = prev.filter(i => i.id !== item.id);
      return [item, ...filtered];
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

  const clearHistory = () => {
    setWatchHistory([]);
    setReadHistory([]);
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
