import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider } from '@/lib/themes/theme-editor-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutHeader } from '@/components/layout/layout-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Design System Guide',
  description: 'A comprehensive design system guide with tokens, components, and playground',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <ThemeEditorProvider>
            <div className="layout-container">
              <header className="layout-header"><LayoutHeader /></header>
              <main className="layout-main">
                <ScrollArea className="h-[calc(100vh-4rem)]">
                  <div className="container mx-auto">
                    {children}
                  </div>
                </ScrollArea>
              </main>
            </div>
            <Toaster />
          </ThemeEditorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
