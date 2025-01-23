import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes, Theme, ThemeName } from '../constants/themes';

type ThemeContextType = {
  theme: Theme;
  currentTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(1);

  const setTheme = (name: ThemeName) => {
    setCurrentTheme(name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};