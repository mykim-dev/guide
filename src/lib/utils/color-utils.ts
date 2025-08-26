import { lighten, darken } from 'color2k';
import { ColorScale, ColorToken } from '@/lib/tokens/colors';

export interface UserTheme {
  name: string;
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
  };
  timestamp: number;
}

// Primary 색상 기반으로 50-950 색조 생성
export function generateColorScale(baseColor: string): ColorScale {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorScale: ColorScale = {};
  
  shades.forEach(shade => {
    let color: string;
    
    if (shade === 500) {
      color = baseColor;
    } else if (shade < 500) {
      // 밝은 색조: 기본 색상을 밝게
      const lightness = (500 - shade) * 0.08;
      color = lighten(baseColor, lightness);
    } else {
      // 어두운 색조: 기본 색상을 어둡게
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

// 사용자 테마 저장
export function saveUserTheme(name: string, colors: any): void {
  const userThemes = getUserThemes();
  const newTheme: UserTheme = {
    name,
    colors,
    timestamp: Date.now()
  };
  
  userThemes[name] = newTheme;
  localStorage.setItem('userThemes', JSON.stringify(userThemes));
}

// 사용자 테마 목록 가져오기
export function getUserThemes(): Record<string, UserTheme> {
  const stored = localStorage.getItem('userThemes');
  return stored ? JSON.parse(stored) : {};
}

// 사용자 테마 삭제
export function deleteUserTheme(name: string): void {
  const userThemes = getUserThemes();
  delete userThemes[name];
  localStorage.setItem('userThemes', JSON.stringify(userThemes));
}


