import { converter } from 'culori';

export interface UserTheme {
  name: string;
  timestamp: number;
}


// 사용자 테마 저장
export function saveUserTheme(name: string): void {
  const userThemes = getUserThemes();
  const newTheme: UserTheme = {
    name,
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
  try {
    const toHex = converter('rgb');
    const rgbValue = toHex(oklchValue);
    if (rgbValue && typeof rgbValue === 'object' && 'r' in rgbValue && 'g' in rgbValue && 'b' in rgbValue) {
      const r = Math.round(rgbValue.r * 255);
      const g = Math.round(rgbValue.g * 255);
      const b = Math.round(rgbValue.b * 255);
      const hexValue = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      
      // 반환된 hex 값이 유효한지 검증
      return isValidHex(hexValue) ? hexValue : '#000000';
    }
    return '#000000';
  } catch (error) {
    console.warn('OKLCH to HEX 변환 실패:', error);
    return '#000000';
  }
}

/**
 * hex 색상 값이 유효한지 검증하는 함수
 * @param hexValue hex 색상 값 (예: "#e5e5e5")
 * @returns 유효한 hex 색상인지 여부
 */
export function isValidHex(hexValue: string): boolean {
  // #으로 시작하고 6자리 hex 값인지 확인
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(hexValue);
}

/**
 * hex 색상 값을 정규화하는 함수 (잘못된 형식 수정)
 * @param hexValue hex 색상 값
 * @returns 정규화된 hex 색상 값
 */
export function normalizeHex(hexValue: string): string {
  if (!hexValue) return '#000000';
  
  // # 제거
  let cleanHex = hexValue.replace('#', '');
  
  // 잘못된 문자 제거 (하이픈, 공백 등)
  cleanHex = cleanHex.replace(/[^A-Fa-f0-9]/g, '');
  
  // 3자리 hex를 6자리로 확장 (예: f93 -> ff9933)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  // 6자리가 아니면 기본값 반환
  if (cleanHex.length !== 6) {
    return '#000000';
  }
  
  // 유효한 hex 문자인지 확인
  if (!/^[A-Fa-f0-9]{6}$/.test(cleanHex)) {
    return '#000000';
  }
  
  return `#${cleanHex.toLowerCase()}`;
}

/**
 * hex 색상 값을 oklch로 변환하는 함수 (간단한 변환)
 * @param hexValue hex 색상 값 (예: "#e5e5e5")
 * @returns oklch 색상 값 (예: "oklch(0.9 0 0)")
 */
export function hexToOklch(hexValue: string): string {
  try {
    // hex 값 정규화
    const normalizedHex = normalizeHex(hexValue);
    
    const toOklch = converter('oklch');
    const oklchValue = toOklch(normalizedHex);
    if (oklchValue && typeof oklchValue === 'object' && 'l' in oklchValue && 'c' in oklchValue) {
      // 무채색 색상의 경우 h 값이 undefined일 수 있으므로 0으로 설정
      const h = oklchValue.h !== undefined ? oklchValue.h : 0;
      // 소수점 3째자리까지만 표현
      const l = Math.round(oklchValue.l * 1000) / 1000;
      const c = Math.round(oklchValue.c * 1000) / 1000;
      const hRounded = Math.round(h * 1000) / 1000;
      return `oklch(${l} ${c} ${hRounded})`;
    }
    return 'oklch(0.5 0 0)';
  } catch (error) {
    console.warn('HEX to OKLCH 변환 실패:', error);
    return 'oklch(0.5 0 0)';
  }
}


