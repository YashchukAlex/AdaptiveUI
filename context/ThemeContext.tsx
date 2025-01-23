import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { themes, Theme, ThemeName } from '../constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  theme: Theme;
  currentTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(1);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme) {
        setCurrentTheme(JSON.parse(savedTheme));
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (name: ThemeName) => {
    setCurrentTheme(name);
    await AsyncStorage.setItem('@theme', JSON.stringify(name));
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