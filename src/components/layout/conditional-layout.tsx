'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider } from '@/lib/themes/theme-editor-provider';
import { Toaster } from '@/components/ui/sonner';
import { GuideHeader } from './guide-header';
import { GuideAside } from './guide-aside';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// 기본 레이아웃 컴포넌트 (메모이제이션으로 최적화)
const DefaultLayout = React.memo(({ children }: ConditionalLayoutProps) => (
  <div className="guide-container">
    <header className="guide-header">
      <GuideHeader />
    </header>
    <main className="guide-main">
      <div className="container mx-auto">
        {children}
      </div>
    </main>
  </div>
));

DefaultLayout.displayName = 'DefaultLayout';

// 메인 레이아웃 컴포넌트 (사이드바 포함)
const MainLayout = React.memo(({ children }: ConditionalLayoutProps) => (
  <div className="guide-container">
    <header className="guide-header">
      <GuideHeader />
    </header>
    <aside className="guide-aside">
      <GuideAside />
    </aside>
    <main className="guide-main">
      <div className="container mx-auto">
        {children}
      </div>
    </main>
  </div>
));

MainLayout.displayName = 'MainLayout';

// 테마 에디터 레이아웃 컴포넌트 (메모이제이션으로 최적화)
const ThemeEditorLayout = React.memo(({ children }: ConditionalLayoutProps) => (
  <div className="min-h-screen bg-background">
    {children}
  </div>
));

ThemeEditorLayout.displayName = 'ThemeEditorLayout';

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // 경로 기반 레이아웃 결정 (메모이제이션으로 최적화)
  const layoutConfig = useMemo(() => {
    const isThemeEditor = pathname === '/theme-editor';
    const useMainLayout = pathname.startsWith('/design-guide') || 
                         pathname.startsWith('/component-guide') || 
                         pathname.startsWith('/tokens');

    return {
      isThemeEditor,
      useMainLayout,
      theme: (isThemeEditor ? 'dark' : 'light') as 'light' | 'dark',
      showToaster: !isThemeEditor
    };
  }, [pathname]);

  // 테마 에디터 레이아웃
  if (layoutConfig.isThemeEditor) {
    return (
      <ThemeProvider defaultTheme={layoutConfig.theme}>
        <ThemeEditorProvider>
          <ThemeEditorLayout>{children}</ThemeEditorLayout>
          {/* {layoutConfig.showToaster && <Toaster />} */}
        </ThemeEditorProvider>
      </ThemeProvider>
    );
  }

  // 메인 레이아웃 (사이드바 포함)
  if (layoutConfig.useMainLayout) {
    return (
      <ThemeProvider defaultTheme={layoutConfig.theme}>
        <MainLayout>{children}</MainLayout>
        {layoutConfig.showToaster && <Toaster />}
      </ThemeProvider>
    );
  }

  // 기본 레이아웃
  return (
    <ThemeProvider defaultTheme={layoutConfig.theme}>
      <DefaultLayout>{children}</DefaultLayout>
      {layoutConfig.showToaster && <Toaster />}
    </ThemeProvider>
  );
}
