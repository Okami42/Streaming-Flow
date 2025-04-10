'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeColor, ThemeOption, themes, defaultTheme } from '@/lib/theme';

interface ThemeContextType {
  currentTheme: ThemeOption;
  setTheme: (themeColor: ThemeColor) => void;
  availableThemes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [themeColor, setThemeColor] = useState<ThemeColor>(defaultTheme);

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('animeTheme') as ThemeColor;
    if (savedTheme && themes[savedTheme]) {
      setThemeColor(savedTheme);
    }
    setMounted(true);
  }, []);

  const setTheme = (color: ThemeColor) => {
    setThemeColor(color);
    localStorage.setItem('animeTheme', color);

    // Apply theme colors to CSS variables
    const theme = themes[color];
    document.documentElement.style.setProperty('--theme-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondaryColor);
    document.documentElement.style.setProperty('--theme-bg-from', theme.bgGradientFrom);
    document.documentElement.style.setProperty('--theme-bg-to', theme.bgGradientTo);
    document.documentElement.style.setProperty('--theme-button-from', theme.buttonGradientFrom);
    document.documentElement.style.setProperty('--theme-button-to', theme.buttonGradientTo);
  };

  useEffect(() => {
    if (mounted) {
      setTheme(themeColor);
    }
  }, [mounted, themeColor]);

  const value = {
    currentTheme: themes[themeColor],
    setTheme,
    availableThemes: Object.values(themes),
  };

  // Avoid rendering with undefined theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
