'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/lib/themes/theme-provider';
// import { LayoutAgent } from '@/components/agent/layout';
import { useThemeEditorState } from '@/hooks/use-theme-editor';
import './style.css';

const TokenManagerWrapper = React.memo(function TokenManagerWrapper() {
  const [TokenManager, setTokenManager] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let isMounted = true;
    import('@/components/token-manager').then((m) => {
      if (isMounted) setTokenManager(() => m.TokenManager);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const {
    inputValues,
    colorTokensAsHex,
    colorOptions,
    customerColorOptions,
    tokenCode,
    setTokenCode,
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
  } = useThemeEditorState();

  if (!TokenManager) {
    return <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">Loading tools…</div>;
  }

  const TM = TokenManager;
  return <TM
    inputValues={inputValues}
    colorTokensAsHex={colorTokensAsHex}
    colorOptions={colorOptions}
    customerColorOptions={customerColorOptions}
    tokenCode={tokenCode}
    setTokenCode={setTokenCode}
    updateToken={updateToken}
    handleSaveUserTokens={handleSaveUserTokens}
    handleResetUserTokens={handleResetUserTokens}
    handleSaveTokenCode={handleSaveTokenCode}
    handleResetTokenCode={handleResetTokenCode}
    handleSaveTokenCodeToStorage={handleSaveTokenCodeToStorage}
    handleCopyTokenCode={handleCopyTokenCode}
    handleApplyToken={handleApplyToken}
    handleResetToken={handleResetToken}
    handleExportTokens={handleExportTokens}
  />;
});

export default function DemoAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        {/* <LayoutAgent> */}
          {children}
        {/* </LayoutAgent> */}
      </ThemeProvider>

      {/* 토큰 관리 컴포넌트를 전역으로 배치 */}
      <div className="fixed bottom-4 left-4 z-50">
        <TokenManagerWrapper />
      </div>
    </>
  );
}
