'use client';

import React from 'react';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { CalsAppHeader } from '@/components/cals-app/cals-app-header';
import { CalsAppSidebar } from '@/components/cals-app/cals-app-sidebar';
import { CalsAppTagBar } from '@/components/cals-app/cals-app-tag-bar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface LayoutCalsAppProps {
  children?: React.ReactNode;
}

export function LayoutCalsApp({ children }: LayoutCalsAppProps) {
  const {
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
  } = useThemeEditorState();

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
    <div className="layout-container grid grid-cols-[16rem_1fr] grid-rows-[4rem_4rem_1fr] bg-background">
      <CalsAppHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <CalsAppSidebar />
      <CalsAppTagBar />
      {/* <CalsAppMain /> */}
      <main className="layout-main">
        <ScrollArea className="w-[calc(100svw-16rem)] h-[calc(100svh-8rem)]">
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </main>
    </div>
  );
}
