'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 레이아웃 타입 정의
export type LayoutType = 'default' | 'centered' | 'fullscreen' | 'minimal' | 'dashboard';

// 레이아웃 설정 인터페이스
interface LayoutConfig {
  type: LayoutType;
  showHeader: boolean;
  showSidebar: boolean;
  showBreadcrumb: boolean;
  maxWidth?: string;
}

// 기본 레이아웃 설정들
export const LAYOUT_PRESETS: Record<LayoutType, LayoutConfig> = {
  default: {
    type: 'default',
    showHeader: true,
    showSidebar: true,
    showBreadcrumb: true,
  },
  centered: {
    type: 'centered',
    showHeader: true,
    showSidebar: false,
    showBreadcrumb: false,
    maxWidth: '4xl',
  },
  fullscreen: {
    type: 'fullscreen',
    showHeader: true,
    showSidebar: false,
    showBreadcrumb: false,
  },
  minimal: {
    type: 'minimal',
    showHeader: false,
    showSidebar: false,
    showBreadcrumb: false,
  },
  dashboard: {
    type: 'dashboard',
    showHeader: true,
    showSidebar: true,
    showBreadcrumb: true,
  },
};

// 컨텍스트 타입
interface LayoutContextType {
  layoutConfig: LayoutConfig;
  setLayoutType: (type: LayoutType) => void;
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void;
  resetToDefault: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

// 컨텍스트 생성
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// 프로바이더 컴포넌트
interface LayoutProviderProps {
  children: ReactNode;
  defaultLayout?: LayoutType;
}

export function LayoutProvider({ children, defaultLayout = 'default' }: LayoutProviderProps) {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(() => {
    // 클라이언트 사이드에서만 로컬 스토리지 접근
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('layout-config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // 파싱 실패 시 기본값 사용
        }
      }
    }
    return LAYOUT_PRESETS[defaultLayout];
  });

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    // 클라이언트 사이드에서만 로컬 스토리지 접근
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-open');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return true; // 기본값: 열림
  });

  // 레이아웃 타입 변경
  const setLayoutType = (type: LayoutType) => {
    const newConfig = LAYOUT_PRESETS[type];
    setLayoutConfig(newConfig);

    // 로컬 스토리지에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('layout-config', JSON.stringify(newConfig));
    }
  };

  // 레이아웃 설정 부분 업데이트
  const updateLayoutConfig = (config: Partial<LayoutConfig>) => {
    const newConfig = { ...layoutConfig, ...config };
    setLayoutConfig(newConfig);

    // 로컬 스토리지에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('layout-config', JSON.stringify(newConfig));
    }
  };

  // 기본값으로 리셋
  const resetToDefault = () => {
    setLayoutType(defaultLayout);
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);

    // 로컬 스토리지에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-open', JSON.stringify(newState));
    }
  };

  // 사이드바 상태 설정
  const setSidebarOpenState = (open: boolean) => {
    setSidebarOpen(open);

    // 로컬 스토리지에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-open', JSON.stringify(open));
    }
  };

  // 하이드레이션 후 로컬 스토리지에서 설정 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('layout-config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLayoutConfig(parsed);
        } catch {
          // 파싱 실패 시 무시
        }
      }

      const sidebarSaved = localStorage.getItem('sidebar-open');
      if (sidebarSaved !== null) {
        try {
          const parsed = JSON.parse(sidebarSaved);
          setSidebarOpen(parsed);
        } catch {
          // 파싱 실패 시 무시
        }
      }
    }
  }, []);

  const value: LayoutContextType = {
    layoutConfig,
    setLayoutType,
    updateLayoutConfig,
    resetToDefault,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen: setSidebarOpenState,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

// 훅
export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
