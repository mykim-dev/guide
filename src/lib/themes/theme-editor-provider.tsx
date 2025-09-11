/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

// 디자인 토큰 타입 정의
interface DesignToken {
  name: string;
  description: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'animation';
  usage?: string[];
  examples?: string[];
}

interface DesignTokens {
  [key: string]: DesignToken;
}

// 기본 디자인 토큰 정의
const defaultTokens: DesignTokens = {
  '--primary': {
    name: 'Primary',
    description: '주요 브랜드 색상',
    value: 'oklch(0.5 0.2 250)',
    category: 'color',
    usage: ['버튼', '링크', '강조 요소'],
    examples: ['Primary 버튼', '활성 링크', '포커스 링']
  },
  '--primary-foreground': {
    name: 'Primary Foreground',
    description: 'Primary 색상 위의 텍스트 색상',
    value: 'oklch(0.98 0 0)',
    category: 'color',
    usage: ['Primary 배경 위 텍스트'],
    examples: ['Primary 버튼 텍스트']
  },
  '--secondary': {
    name: 'Secondary',
    description: '보조 브랜드 색상',
    value: 'oklch(0.9 0.05 250)',
    category: 'color',
    usage: ['보조 버튼', '배경', '구분선'],
    examples: ['Secondary 버튼', '카드 배경']
  },
  '--secondary-foreground': {
    name: 'Secondary Foreground',
    description: 'Secondary 색상 위의 텍스트 색상',
    value: 'oklch(0.2 0 0)',
    category: 'color',
    usage: ['Secondary 배경 위 텍스트'],
    examples: ['Secondary 버튼 텍스트']
  },
  '--accent': {
    name: 'Accent',
    description: '상호작용 요소의 강조 색상',
    value: 'oklch(0.97 0 0)',
    category: 'color',
    usage: ['호버 상태', '선택 상태', '포커스 상태'],
    examples: ['버튼 호버', '메뉴 아이템 선택']
  },
  '--accent-foreground': {
    name: 'Accent Foreground',
    description: 'Accent 색상 위의 텍스트 색상',
    value: 'oklch(0.205 0 0)',
    category: 'color',
    usage: ['Accent 배경 위 텍스트'],
    examples: ['호버된 버튼 텍스트']
  },
  '--muted': {
    name: 'Muted',
    description: '비활성/보조 정보를 위한 색상',
    value: 'oklch(0.97 0 0)',
    category: 'color',
    usage: ['비활성 배경', '코드 블록', '구분선'],
    examples: ['Avatar fallback', '코드 블록 배경']
  },
  '--muted-foreground': {
    name: 'Muted Foreground',
    description: 'Muted 색상 위의 텍스트 색상',
    value: 'oklch(0.556 0 0)',
    category: 'color',
    usage: ['보조 텍스트', '플레이스홀더'],
    examples: ['설명 텍스트', '입력 플레이스홀더']
  },
  '--border': {
    name: 'Border',
    description: '테두리 색상',
    value: 'oklch(0.9 0 0)',
    category: 'border',
    usage: ['컴포넌트 테두리', '구분선'],
    examples: ['카드 테두리', '입력 필드 테두리']
  },
  '--input': {
    name: 'Input',
    description: '입력 필드 배경 색상',
    value: 'oklch(1 0 0)',
    category: 'color',
    usage: ['입력 필드', '텍스트 영역'],
    examples: ['Input 컴포넌트', 'Textarea']
  },
  '--ring': {
    name: 'Ring',
    description: '포커스 링 색상',
    value: 'oklch(0.5 0.2 250)',
    category: 'color',
    usage: ['포커스 표시', '선택 표시'],
    examples: ['입력 필드 포커스', '버튼 포커스']
  },
  '--radius': {
    name: 'Border Radius',
    description: '기본 테두리 반지름',
    value: '0.5rem',
    category: 'border',
    usage: ['컴포넌트 모서리 둥글기'],
    examples: ['버튼', '카드', '입력 필드']
  },
  '--spacing-1': {
    name: 'Spacing 1',
    description: '가장 작은 간격',
    value: '0.25rem',
    category: 'spacing',
    usage: ['작은 여백', '내부 패딩'],
    examples: ['버튼 내부 패딩', '아이콘 간격']
  },
  '--spacing-2': {
    name: 'Spacing 2',
    description: '작은 간격',
    value: '0.5rem',
    category: 'spacing',
    usage: ['기본 여백', '컴포넌트 간격'],
    examples: ['카드 패딩', '섹션 간격']
  },
  '--spacing-4': {
    name: 'Spacing 4',
    description: '중간 간격',
    value: '1rem',
    category: 'spacing',
    usage: ['섹션 여백', '레이아웃 간격'],
    examples: ['페이지 여백', '그리드 간격']
  },
  '--spacing-8': {
    name: 'Spacing 8',
    description: '큰 간격',
    value: '2rem',
    category: 'spacing',
    usage: ['페이지 여백', '주요 섹션 간격'],
    examples: ['헤더와 콘텐츠 간격', '섹션 간격']
  },
  '--font-size-sm': {
    name: 'Font Size Small',
    description: '작은 텍스트 크기',
    value: '0.875rem',
    category: 'typography',
    usage: ['보조 텍스트', '캡션'],
    examples: ['설명 텍스트', '작은 라벨']
  },
  '--font-size-base': {
    name: 'Font Size Base',
    description: '기본 텍스트 크기',
    value: '1rem',
    category: 'typography',
    usage: ['본문 텍스트', '기본 콘텐츠'],
    examples: ['문단 텍스트', '입력 필드']
  },
  '--font-size-lg': {
    name: 'Font Size Large',
    description: '큰 텍스트 크기',
    value: '1.125rem',
    category: 'typography',
    usage: ['제목', '강조 텍스트'],
    examples: ['섹션 제목', '중요한 텍스트']
  },
  '--font-size-xl': {
    name: 'Font Size Extra Large',
    description: '매우 큰 텍스트 크기',
    value: '1.25rem',
    category: 'typography',
    usage: ['페이지 제목', '헤더'],
    examples: ['페이지 제목', '주요 헤더']
  },
  '--font-weight-normal': {
    name: 'Font Weight Normal',
    description: '기본 폰트 두께',
    value: '400',
    category: 'typography',
    usage: ['본문 텍스트', '기본 콘텐츠'],
    examples: ['문단 텍스트', '일반 텍스트']
  },
  '--font-weight-medium': {
    name: 'Font Weight Medium',
    description: '중간 폰트 두께',
    value: '500',
    category: 'typography',
    usage: ['라벨', '중요한 텍스트'],
    examples: ['폼 라벨', '네비게이션']
  },
  '--font-weight-semibold': {
    name: 'Font Weight Semibold',
    description: '반굵은 폰트 두께',
    value: '600',
    category: 'typography',
    usage: ['제목', '강조 텍스트'],
    examples: ['섹션 제목', '버튼 텍스트']
  },
  '--font-weight-bold': {
    name: 'Font Weight Bold',
    description: '굵은 폰트 두께',
    value: '700',
    category: 'typography',
    usage: ['주요 제목', '매우 중요한 텍스트'],
    examples: ['페이지 제목', '강조된 텍스트']
  }
};

interface ThemeEditorContextType {
  tokens: DesignTokens;
  updateToken: (tokenName: string, value: string) => void;
  updateTokenGroup: (category: string, tokens: Record<string, string>) => void;
}

const ThemeEditorContext = createContext<ThemeEditorContextType | undefined>(undefined);

export function ThemeEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setMounted(true);
  }, []);


  const updateToken = useCallback((tokenName: string, value: string) => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.style.setProperty(tokenName, value);
    
    // 토큰 상태도 업데이트
    setTokens(prev => ({
      ...prev,
      [tokenName]: { ...prev[tokenName], value }
    }));
  }, [mounted]);

  const updateTokenGroup = useCallback((category: string, tokenUpdates: Record<string, string>) => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    Object.entries(tokenUpdates).forEach(([tokenName, value]) => {
      root.style.setProperty(tokenName, value);
    });
    
    // 토큰 상태 업데이트
    setTokens(prev => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(tokenUpdates).map(([tokenName, value]) => [
          tokenName,
          { ...prev[tokenName], value }
        ])
      )
    }));
  }, [mounted]);


  const value = {
    tokens,
    updateToken,
    updateTokenGroup,
  };

  return (
    <ThemeEditorContext.Provider value={value}>
      {children}
    </ThemeEditorContext.Provider>
  );
}

export function useThemeEditor() {
  const context = useContext(ThemeEditorContext);
  if (context === undefined) {
    // SSR이나 초기 렌더링 중에는 기본값 반환
    if (typeof window === 'undefined') {
      return {
        tokens: defaultTokens,
        updateToken: () => {},
        updateTokenGroup: () => {},
      };
    }
    
    // 클라이언트 사이드에서도 컨텍스트가 준비되지 않은 경우 기본값 반환
    // 이는 hydration 과정에서 발생할 수 있음
    console.warn('useThemeEditor: ThemeEditorProvider context not available, using default values');
    return {
      tokens: defaultTokens,
      updateToken: () => {},
      updateTokenGroup: () => {},
    };
  }
  return context;
}
