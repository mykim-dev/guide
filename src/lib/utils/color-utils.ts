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

/**
 * oklch 색상 값을 hex로 변환하는 함수
 * @param oklchValue oklch 색상 값 (예: "oklch(0.9 0 0)")
 * @returns hex 색상 값 (예: "#e5e5e5")
 */
export function oklchToHex(oklchValue: string): string {
  // SSR 환경에서는 기본값 반환
  if (typeof window === 'undefined') {
    return '#000000';
  }

  try {
    // 임시 요소를 생성하여 색상 변환
    const tempElement = document.createElement('div');
    tempElement.style.color = oklchValue;
    document.body.appendChild(tempElement);
    
    // computed style에서 rgb 값을 가져옴
    const computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    
    // rgb(r, g, b) 형식을 hex로 변환
    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    return '#000000'; // 기본값
  } catch (error) {
    console.warn('색상 변환 실패:', error);
    return '#000000'; // 기본값
  }
}

/**
 * hex 색상 값을 oklch로 변환하는 함수 (간단한 변환)
 * @param hexValue hex 색상 값 (예: "#e5e5e5")
 * @returns oklch 색상 값 (예: "oklch(0.9 0 0)")
 */
export function hexToOklch(hexValue: string): string {
  // SSR 환경에서는 기본값 반환
  if (typeof window === 'undefined') {
    return 'oklch(0.5 0 0)';
  }

  try {
    // 임시 요소를 생성하여 색상 변환
    const tempElement = document.createElement('div');
    tempElement.style.color = hexValue;
    document.body.appendChild(tempElement);
    
    // computed style에서 oklch 값을 가져옴 (브라우저 지원에 따라 다를 수 있음)
    const computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    
    // 만약 브라우저가 oklch를 지원한다면 그대로 반환, 아니면 rgb를 oklch로 변환
    if (computedColor.includes('oklch')) {
      return computedColor;
    }
    
    // rgb를 oklch로 변환하는 간단한 로직 (실제로는 더 복잡한 변환이 필요)
    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]) / 255;
      const g = parseInt(rgbMatch[2]) / 255;
      const b = parseInt(rgbMatch[3]) / 255;
      
      // 간단한 변환 (실제로는 더 정확한 변환이 필요)
      const l = (r + g + b) / 3;
      return `oklch(${l.toFixed(3)} 0 0)`;
    }
    
    return 'oklch(0.5 0 0)'; // 기본값
  } catch (error) {
    console.warn('색상 변환 실패:', error);
    return 'oklch(0.5 0 0)'; // 기본값
  }
}


