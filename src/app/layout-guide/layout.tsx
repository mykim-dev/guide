'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { LayoutGuide } from '@/components/layout/layout-guide';

export default function LayoutGuideLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light">
      <LayoutGuide>
        {children}
      </LayoutGuide>
      <Toaster />
    </ThemeProvider>
  );
}
