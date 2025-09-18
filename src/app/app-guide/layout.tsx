'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GuideHeader } from '@/components/guide/header';
import { GuideSidebar } from '@/components/guide/sidebar';
import { ActiveMenuTitle } from '@/components/guide/active-menu-title';
import { usePathname } from 'next/navigation';
import './style.css';

export default function LayoutGuide({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/app-guide' || pathname === '/app-guide/';
  return (
    <ThemeProvider defaultTheme="light">
      <div className="">
        <GuideHeader />
        <div className="container mx-auto flex gap-16">
          {!isHome && <GuideSidebar />}
          <main className="w-full">
            <ActiveMenuTitle />
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider >
  );
}
