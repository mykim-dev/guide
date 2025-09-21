'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import { ModeToggle } from '@/components/mode-toggle';
import './style.css';

// 토큰 매니저 컴포넌트 타입 정의
interface TokenManagerProps {
  inputValues: Record<string, string>;
  colorTokensAsHex: Record<string, string>;
  colorOptions: string[];
  customerColorOptions: string[];
  tokenCode: string;
  setTokenCode: (code: string) => void;
  updateToken: (key: string, value: string) => void;
  handleSaveUserTokens: () => void;
  handleResetUserTokens: () => void;
  handleSaveTokenCode: () => void;
  handleResetTokenCode: () => void;
  handleSaveTokenCodeToStorage: () => void;
  handleCopyTokenCode: () => void;
  handleApplyToken: () => void;
  handleResetToken: () => void;
  handleExportTokens: () => void;
}

const TokenManagerWrapper = React.memo(function TokenManagerWrapper() {
  const [TokenManager, setTokenManager] = useState<React.ComponentType<TokenManagerProps> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTokenManager = async () => {
      try {
        const module = await import('@/components/token-manager');
        if (isMounted) {
          setTokenManager(() => module.TokenManager);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load TokenManager:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTokenManager();

    return () => {
      isMounted = false;
    };
  }, []);

  const themeEditorState = useThemeEditorState();

  if (isLoading) {
    return (
      <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground animate-pulse">
        Loading tools…
      </div>
    );
  }

  if (!TokenManager) {
    return (
      <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
        Failed to load tools
      </div>
    );
  }

  return <TokenManager {...themeEditorState} />;
});

// 플로팅 액션 버튼들을 위한 컨테이너 컴포넌트
const FloatingActions = React.memo(function FloatingActions() {
  return (
    <>
      {/* 테마 토글 버튼 */}
      <div className="fixed bottom-16 left-4 z-50">
        <ModeToggle />
      </div>

      {/* 토큰 관리 컴포넌트 */}
      <div className="fixed bottom-4 left-4 z-50">
        <TokenManagerWrapper />
      </div>
    </>
  );
});

FloatingActions.displayName = 'FloatingActions';

export default function DemoAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // /guide/demo-agent/ 경로가 아닐 때만 FloatingActions 표시
  const shouldShowFloatingActions = !pathname.startsWith('/guide/demo-agent/');

  return (
    <ThemeProvider defaultTheme="dark">
      {children}
      {shouldShowFloatingActions && <FloatingActions />}
    </ThemeProvider>
  );
}
