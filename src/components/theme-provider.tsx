
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  storageKey = 'resume-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState(
    () => (typeof window !== 'undefined' && localStorage.getItem(storageKey)) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: string) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
