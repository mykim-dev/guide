'use client';

import React, { useMemo, useState } from 'react';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { CalsAppHeader } from '@/components/cals-app/header';
import { CalsAppSidebar } from '@/components/cals-app/sidebar';
import { CalsAppTagBar } from '@/components/cals-app/tag-bar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface LayoutCalsAppProps {
  children?: React.ReactNode;
}

export function LayoutCalsApp({ children }: LayoutCalsAppProps) {
  const { mounted } = useThemeEditorState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const containerClasses = useMemo(
    () =>
      `layout-container grid grid-rows-[4rem_4rem_1fr] bg-background transition-all duration-300 ${
        sidebarOpen ? 'grid-cols-[16rem_1fr]' : 'grid-cols-[4rem_1fr]'
      }`,
    [sidebarOpen]
  );

  const scrollAreaClasses = useMemo(
    () =>
      `h-[calc(100svh-8rem)] transition-all duration-300 ${
        sidebarOpen ? 'w-[calc(100svw-16rem)]' : 'w-[calc(100svw-4rem)]'
      }`,
    [sidebarOpen]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">UI 템플릿를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <CalsAppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <CalsAppSidebar sidebarOpen={sidebarOpen} />
      <CalsAppTagBar />
      <main className="layout-main">
        <ScrollArea className={scrollAreaClasses}>
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </main>
    </div>
  );
}

export default LayoutCalsApp;


