'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { LayoutCalsApp } from '@/components/layout/layout-cals-app';
import { CalsAppTokenManager } from '@/components/cals-app/cals-app-token-manager';
import { useThemeEditorState } from '@/hooks/use-theme-editor';

function TokenManagerWrapper() {
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

  return (
    <CalsAppTokenManager
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
    />
  );
}

export default function CalsAppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <LayoutCalsApp>{children}</LayoutCalsApp>
      </ThemeProvider>

      {/* 토큰 관리 컴포넌트를 전역으로 배치 */}
      <div className="fixed bottom-4 left-4 z-50">
        <TokenManagerWrapper />
      </div>
    </>
  );
}
