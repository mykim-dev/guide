'use client';

import React, { useMemo } from 'react';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { AgentHeader } from '@/components/agent/agent-header';

interface LayoutAgentProps {
  children?: React.ReactNode;
}

export function LayoutAgent({ children }: LayoutAgentProps) {
  const { mounted } = useThemeEditorState();

  // 클래스명 메모이제이션 - 사이드바 닫힌 상태로 고정
  const containerClasses = useMemo(() =>
    'layout-container bg-background', []
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
      <AgentHeader />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
