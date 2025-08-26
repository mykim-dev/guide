'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultColors, ColorPalette } from '../tokens/colors';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  colors: ColorPalette;
  setColors: (colors: ColorPalette) => void;
  updateColor: (category: keyof ColorPalette, shade: string, value: string) => void;
  applyLocalTheme?: (colors: ColorPalette, themeType?: 'customer' | 'primary') => void;
  resetLocalTheme?: () => void;
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

  // 전역 CSS 변수 설정 제거 - 테마 에디터에서만 로컬로 적용

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

  // 로컬 테마 적용 함수 (테마 에디터에서만 사용)
  const applyLocalTheme = (localColors: ColorPalette, themeType: 'customer' | 'primary' = 'primary') => {
    const root = window.document.documentElement;
    
    if (themeType === 'customer') {
      // Customer 테마: --customer- 변수 설정
      Object.entries(localColors.primary).forEach(([shade, token]) => {
        if (token && typeof token === 'object' && 'value' in token && 'name' in token) {
          const colorToken = token as { value: string; name: string };
          root.style.setProperty(`--customer-${shade}`, colorToken.value);
        }
      });
      
      // Customer 기본 변수들도 설정
      const primary500 = localColors.primary['500'] as { value: string };
      const primary50 = localColors.primary['50'] as { value: string };
      if (primary500 && primary50) {
        root.style.setProperty('--customer', primary500.value);
        root.style.setProperty('--customer-foreground', primary50.value);
      }
    } else {
      // 일반 테마: --primary- 변수 설정
      Object.entries(localColors.primary).forEach(([shade, token]) => {
        if (token && typeof token === 'object' && 'value' in token && 'name' in token) {
          const colorToken = token as { value: string; name: string };
          root.style.setProperty(`--primary-${shade}`, colorToken.value);
        }
      });
      
      // 기본 primary 변수들도 설정
      const primary500 = localColors.primary['500'] as { value: string };
      const primary50 = localColors.primary['50'] as { value: string };
      if (primary500 && primary50) {
        root.style.setProperty('--primary', primary500.value);
        root.style.setProperty('--primary-foreground', primary50.value);
      }
    }
  };

  // 로컬 테마 초기화 함수
  const resetLocalTheme = () => {
    const root = window.document.documentElement;
    
    // Primary 관련 CSS 변수들 제거
    const primaryShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    primaryShades.forEach(shade => {
      root.style.removeProperty(`--primary-${shade}`);
    });
    root.style.removeProperty('--primary');
    root.style.removeProperty('--primary-foreground');
    
    // Customer 관련 CSS 변수들도 제거
    primaryShades.forEach(shade => {
      root.style.removeProperty(`--customer-${shade}`);
    });
    root.style.removeProperty('--customer');
    root.style.removeProperty('--customer-foreground');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      colors, 
      setColors, 
      updateColor, 
      applyLocalTheme, 
      resetLocalTheme 
    }}>
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
