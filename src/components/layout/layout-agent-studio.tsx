'use client';

import React, { useMemo } from 'react';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { AgentStudioHeader } from '@/components/agent-studio/agent-studio-header';
import { AgentStudioSidebar } from '@/components/agent-studio/agent-studio-sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface LayoutAgentStudioProps {
  children?: React.ReactNode;
}

export function LayoutAgentStudio({ children }: LayoutAgentStudioProps) {
  const { mounted } = useThemeEditorState();

  // 클래스명 메모이제이션 - 사이드바 항상 열린 상태
  const containerClasses = useMemo(() =>
    'layout-container grid grid-rows-[3rem_1fr] grid-cols-[3rem_1fr] bg-background transition-all duration-300', []
  );

  const scrollAreaClasses = useMemo(() =>
    'h-[calc(100svh-3rem)] w-[calc(100svw-3rem)] transition-all duration-300', []
  );

  // 마운트되지 않은 경우 로딩 화면 표시
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">테마 에디터를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <AgentStudioHeader />
      <AgentStudioSidebar />
      <main className="layout-main">
        <ScrollArea className={scrollAreaClasses}>
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </main>
    </div>
  );
}
