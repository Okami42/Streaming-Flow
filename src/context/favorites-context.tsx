'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FavoriteItem } from '@/lib/types';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('animeFavorites');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('animeFavorites', JSON.stringify(favorites));
    }
  }, [mounted, favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    
    setFavorites(prev => {
      // Vérifier si déjà dans les favoris
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      return [newItem, ...prev];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 