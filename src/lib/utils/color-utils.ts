import { lighten, darken } from 'color2k';
import { ColorPalette, ColorToken } from '@/lib/tokens/colors';

export function generateColorScale(baseColor: string): ColorPalette['primary'] {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorScale: any = {};
  
  shades.forEach(shade => {
    let color: string;
    
    if (shade === 500) {
      color = baseColor;
    } else if (shade < 500) {
      const lightness = (500 - shade) * 0.08;
      color = lighten(baseColor, lightness);
    } else {
      const darkness = (shade - 500) * 0.08;
      color = darken(baseColor, darkness);
    }
    
    colorScale[shade] = {
      name: `primary-${shade}`,
      value: color,
      description: `Primary color ${shade}`
    };
  });
  
  return colorScale;
}

export interface UserTheme {
  name: string;
  colors: ColorPalette;
  isCustom: boolean;
  createdAt: string;
}

export function saveUserTheme(name: string, colors: ColorPalette): void {
  const userThemes = getUserThemes();
  const newTheme: UserTheme = {
    name,
    colors,
    isCustom: true,
    createdAt: new Date().toISOString()
  };
  
  const updated = { ...userThemes, [name]: newTheme };
  localStorage.setItem('userThemes', JSON.stringify(updated));
}

export function getUserThemes(): Record<string, UserTheme> {
  const saved = localStorage.getItem('userThemes');
  return saved ? JSON.parse(saved) : {};
}

export function deleteUserTheme(name: string): void {
  const userThemes = getUserThemes();
  delete userThemes[name];
  localStorage.setItem('userThemes', JSON.stringify(userThemes));
}


