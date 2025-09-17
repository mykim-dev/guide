'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { oklchToHex, hexToOklch, isValidHex, normalizeHex } from '@/lib/utils/color-utils';
import { tailwindColors } from '@/lib/tokens/colors';
import { toast } from 'sonner';

// 타입 정의
interface TokenInputValues {
  [key: string]: string;
}

interface UserTokens {
  [key: string]: string;
}

interface ColorOption {
  name: string;
  label: string;
  value: string;
}

// 기본 토큰 값들
export const DEFAULT_TOKENS: UserTokens = {
  '--radius': '0.625rem',
  '--background': 'oklch(1 0 0)',
  '--foreground': 'oklch(0.145 0 0)',
  '--card': 'oklch(1 0 0)',
  '--card-foreground': 'oklch(0.145 0 0)',
  '--popover': 'oklch(1 0 0)',
  '--popover-foreground': 'oklch(0.145 0 0)',
  '--primary': 'oklch(0.205 0 0)',
  '--primary-foreground': 'oklch(0.985 0 0)',
  '--secondary': 'oklch(0.97 0 0)',
  '--secondary-foreground': 'oklch(0.205 0 0)',
  '--customer': 'oklch(0.205 0 0)',
  '--customer-foreground': 'oklch(0.985 0 0)',
  '--muted': 'oklch(0.97 0 0)',
  '--muted-foreground': 'oklch(0.556 0 0)',
  '--accent': 'oklch(0.97 0 0)',
  '--accent-foreground': 'oklch(0.205 0 0)',
  '--destructive': 'oklch(0.577 0.245 27.325)',
  '--border': 'oklch(0.922 0 0)',
  '--input': 'oklch(0.922 0 0)',
  '--ring': 'oklch(0.708 0 0)',
  '--chart-1': 'oklch(0.646 0.222 41.116)',
  '--chart-2': 'oklch(0.6 0.118 184.704)',
  '--chart-3': 'oklch(0.398 0.07 227.392)',
  '--chart-4': 'oklch(0.828 0.189 84.429)',
  '--chart-5': 'oklch(0.769 0.188 70.08)',
  '--sidebar': 'oklch(0.985 0 0)',
  '--sidebar-foreground': 'oklch(0.145 0 0)',
  '--sidebar-primary': 'oklch(0.205 0 0)',
  '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
  '--sidebar-accent': 'oklch(0.97 0 0)',
  '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
  '--sidebar-border': 'oklch(0.922 0 0)',
  '--sidebar-ring': 'oklch(0.708 0 0)'
};

// 색상 토큰 키들
const COLOR_TOKEN_KEYS = [
  'background', 'foreground', 'card', 'popover', 'primary', 'secondary',
  'customer', 'muted', 'accent', 'destructive', 'border', 'input',
  'ring', 'chart', 'sidebar'
];

export function useThemeEditorState() {
  // 상태 관리
  const [mounted, setMounted] = useState(false);
  const [inputValues, setInputValues] = useState<TokenInputValues>({});
  const [userTokens, setUserTokens] = useState<UserTokens>(DEFAULT_TOKENS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenCode, setTokenCode] = useState<string>("");

  // 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
  }, []);

  // 초기화 useEffect
  useEffect(() => {
    const initialInputValues: TokenInputValues = {};

    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        initialInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });

    setInputValues(initialInputValues);

    // 토큰 코드 초기화
    const savedTokenCode = localStorage.getItem('userTokenCode');
    if (savedTokenCode) {
      setTokenCode(savedTokenCode);
    } else {
      const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          acc[tokenKey] = oklchToHex(tokenValue);
        } else {
          acc[tokenKey] = tokenValue;
        }
        return acc;
      }, {} as UserTokens);
      setTokenCode(JSON.stringify(hexTokens, null, 2));
    }
  }, []);

  // userTokens 변경 시 tokenCode 자동 업데이트
  useEffect(() => {
    const hexTokens = Object.entries(userTokens).reduce((acc, [tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        const hexValue = tokenValue.startsWith('#') ? tokenValue : oklchToHex(tokenValue);
        acc[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
      } else {
        acc[tokenKey] = tokenValue;
      }
      return acc;
    }, {} as UserTokens);

    setTokenCode(JSON.stringify(hexTokens, null, 2));
  }, [userTokens]);

  // 색상 업데이트
  const updateToken = useCallback((tokenKey: string, value: string) => {
    const normalizedValue = normalizeHex(value);
    setInputValues(prev => ({ ...prev, [tokenKey]: normalizedValue }));
    setUserTokens(prev => ({ ...prev, [tokenKey]: normalizedValue }));
  }, []);

  // 색상 토큰들을 hex 값으로 변환
  const colorTokensAsHex = useMemo(() => {
    return Object.entries(userTokens)
      .filter(([tokenKey]) =>
        COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key))
      )
      .reduce((acc, [tokenKey, tokenValue]) => {
        const hexValue = tokenValue.startsWith('#') ? tokenValue : oklchToHex(tokenValue);
        acc[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
        return acc;
      }, {} as Record<string, string>);
  }, [userTokens]);

  // 색상 옵션들
  const colorOptions = useMemo((): ColorOption[] => [
    { name: 'default', label: 'Default', value: DEFAULT_TOKENS['--primary'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ], []);

  const customerColorOptions = useMemo((): ColorOption[] => [
    { name: 'default', label: 'Default', value: DEFAULT_TOKENS['--customer'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ], []);

  // 토큰 저장
  const handleSaveUserTokens = useCallback(() => {
    try {
      const root = document.documentElement;
      Object.entries(userTokens).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      localStorage.setItem('userTokens', JSON.stringify(userTokens));

      toast.success('토큰이 저장되었습니다!', {
        description: '변경사항이 적용되고 로컬 스토리지에 저장되었습니다.'
      });
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('토큰 저장에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [userTokens]);

  // 토큰 초기화
  const handleResetUserTokens = useCallback(() => {
    try {
      setUserTokens(DEFAULT_TOKENS);

      const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          acc[tokenKey] = oklchToHex(tokenValue);
        } else {
          acc[tokenKey] = tokenValue;
        }
        return acc;
      }, {} as UserTokens);
      setTokenCode(JSON.stringify(hexTokens, null, 2));

      const resetInputValues: TokenInputValues = {};
      Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          resetInputValues[tokenKey] = oklchToHex(tokenValue);
        }
      });
      setInputValues(resetInputValues);

      const root = document.documentElement;
      Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
        root.style.setProperty(tokenKey, tokenValue);
      });

      toast.success('토큰이 초기화되었습니다!', {
        description: '기본값으로 되돌아갔습니다.'
      });
    } catch (error) {
      console.error('Reset user tokens failed:', error);
      toast.error('토큰 초기화에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, []);

  // 토큰 코드 저장
  const handleSaveTokenCode = useCallback(() => {
    try {
      const parsedTokens = JSON.parse(tokenCode);
      setUserTokens(parsedTokens);

      const newInputValues: TokenInputValues = {};
      Object.entries(parsedTokens).forEach(([tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          const hexValue = (tokenValue as string).startsWith('#')
            ? tokenValue as string
            : oklchToHex(tokenValue as string);
          newInputValues[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
        }
      });
      setInputValues(newInputValues);

      const root = document.documentElement;
      Object.entries(parsedTokens).forEach(([tokenKey, tokenValue]) => {
        root.style.setProperty(tokenKey, tokenValue as string);
      });

      toast.success('토큰 코드가 저장되었습니다!', {
        description: '변경사항이 적용되었습니다.'
      });
    } catch (error) {
      toast.error('토큰 코드 저장에 실패했습니다.', {
        description: '올바른 JSON 형식인지 확인해주세요.'
      });
    }
  }, [tokenCode]);

  // 토큰 코드 초기화
  const handleResetTokenCode = useCallback(() => {
    setUserTokens(DEFAULT_TOKENS);

    const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        acc[tokenKey] = oklchToHex(tokenValue);
      } else {
        acc[tokenKey] = tokenValue;
      }
      return acc;
    }, {} as UserTokens);
    setTokenCode(JSON.stringify(hexTokens, null, 2));

    const resetInputValues: TokenInputValues = {};
    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        resetInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });
    setInputValues(resetInputValues);

    const root = document.documentElement;
    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      root.style.setProperty(tokenKey, tokenValue);
    });

    toast.success('토큰 코드가 초기화되었습니다!', {
      description: '기본값으로 되돌아갔습니다.'
    });
  }, []);

  // 토큰 코드 저장 (로컬 스토리지)
  const handleSaveTokenCodeToStorage = useCallback(() => {
    try {
      localStorage.setItem('userTokenCode', tokenCode);
      toast.success('토큰 코드가 저장되었습니다!', {
        description: '로컬 스토리지에 저장되었습니다.'
      });
    } catch (error) {
      toast.error('토큰 코드 저장에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [tokenCode]);

  // 토큰 코드 복사
  const handleCopyTokenCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tokenCode);
      toast.success('토큰 코드가 클립보드에 복사되었습니다!', {
        description: 'JSON 코드가 복사되었습니다.'
      });
    } catch (error) {
      console.error('Copy token code failed:', error);
      toast.error('클립보드 복사에 실패했습니다.', {
        description: '브라우저에서 클립보드 접근을 허용해주세요.'
      });
    }
  }, [tokenCode]);

  // 개별 토큰 적용
  const handleApplyToken = useCallback((tokenKey: string) => {
    try {
      const root = document.documentElement;
      const tokenValue = userTokens[tokenKey];
      if (tokenValue) {
        root.style.setProperty(tokenKey, tokenValue);

        toast.success('토큰이 적용되었습니다!', {
          description: `${tokenKey} 토큰이 적용되었습니다.`
        });
      }
    } catch (error) {
      console.error('Apply token failed:', error);
      toast.error('토큰 적용에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [userTokens]);

  // 개별 토큰 초기화
  const handleResetToken = useCallback((tokenKey: string) => {
    try {
      const root = document.documentElement;
      const defaultValue = DEFAULT_TOKENS[tokenKey];

      if (defaultValue) {
        setUserTokens(prev => ({
          ...prev,
          [tokenKey]: defaultValue
        }));

        if (COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key))) {
          setInputValues(prev => ({
            ...prev,
            [tokenKey]: oklchToHex(defaultValue)
          }));
        }

        root.style.setProperty(tokenKey, defaultValue);

        toast.success('토큰이 초기화되었습니다!', {
          description: `${tokenKey} 토큰이 기본값으로 되돌아갔습니다.`
        });
      }
    } catch (error) {
      console.error('Reset token failed:', error);
      toast.error('토큰 초기화에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, []);

  // 토큰 내보내기
  const handleExportTokens = useCallback(async () => {
    try {
      const tokensData = {
        defaultTokens: DEFAULT_TOKENS,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Demos Tokens - Independent Layout'
      };

      const blob = new Blob([JSON.stringify(tokensData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theme-tokens-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('토큰이 성공적으로 내보내졌습니다!', {
        description: '독립 레이아웃에서 토큰이 다운로드되었습니다.'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('토큰 내보내기에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [userTokens]);

  // JSON 복사
  const handleCopyTokens = useCallback(async () => {
    try {
      const tokensData = {
        defaultTokens: DEFAULT_TOKENS,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Demos Tokens - Independent Layout'
      };

      await navigator.clipboard.writeText(JSON.stringify(tokensData, null, 2));

      toast.success('토큰이 클립보드에 복사되었습니다!', {
        description: '독립 레이아웃의 JSON이 복사되었습니다.'
      });
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('클립보드 복사에 실패했습니다.', {
        description: '브라우저에서 클립보드 접근을 허용해주세요.'
      });
    }
  }, [userTokens]);

  return {
    // 상태
    mounted,
    inputValues,
    userTokens,
    sidebarOpen,
    setSidebarOpen,
    tokenCode,
    setTokenCode,
    colorTokensAsHex,
    colorOptions,
    customerColorOptions,
    
    // 액션
    updateToken,
    handleSaveUserTokens,
    handleResetUserTokens,
    handleSaveTokenCode,
    handleResetTokenCode,
    handleSaveTokenCodeToStorage,
    handleCopyTokenCode,
    handleApplyToken,
    handleResetToken,
    handleExportTokens,
    handleCopyTokens,
  };
}
