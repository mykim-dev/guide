'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultColors, ColorPalette } from '../tokens/colors';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  colors: ColorPalette;
  setColors: (colors: ColorPalette) => void;
  updateColor: (category: keyof ColorPalette, shade: string, value: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const [colors, setColors] = useState<ColorPalette>(defaultColors);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // CSS 변수로 색상 적용
    const root = window.document.documentElement;
    Object.entries(colors).forEach(([category, scale]) => {
      Object.entries(scale).forEach(([shade, token]) => {
        root.style.setProperty(`--${token.name}`, token.value);
      });
    });
  }, [colors]);

  const updateColor = (category: keyof ColorPalette, shade: string, value: string) => {
    setColors(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [shade]: {
          ...prev[category][shade],
          value,
        },
      },
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors, setColors, updateColor }}>
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
