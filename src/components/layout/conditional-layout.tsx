'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider } from '@/lib/themes/theme-editor-provider';
import { Toaster } from '@/components/ui/sonner';
import { GuideHeader } from './guide-header';

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

    return {
      isThemeEditor,
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

  // 기본 레이아웃
  return (
    <ThemeProvider defaultTheme={layoutConfig.theme}>
      <DefaultLayout>{children}</DefaultLayout>
      {layoutConfig.showToaster && <Toaster />}
    </ThemeProvider>
  );
}
