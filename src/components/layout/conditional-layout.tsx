'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider } from '@/lib/themes/theme-editor-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

const navigation = [
  { id: '1', name: '디자인 가이드', href: '/design-guide/', children: [
    { id: '1-1', name: '시작하기', href: '/design-guide/1_getting-started', children: {} },
    { id: '1-2', name: '로고', href: '/design-guide/2_logo', children: {} },
    { id: '1-3', name: '캐릭터', href: '/design-guide/3_character', children: {} }
  ]},
  { id: '2', name: '디자인 토큰', href: '/tokens/', children: [
    { id: '2-1', name: '디자인 토큰', href: '/tokens/design-tokens/', children: {} },
    { id: '2-2', name: '타이포그래피', href: '/tokens/typography/', children: {} },
    { id: '2-3', name: '간격', href: '/tokens/spacing/', children: {} },
    { id: '2-4', name: '색상 팔레트', href: '/tokens/palette/', children: {} }
  ]},  
  { id: '3', name: '컴포넌트 가이드', href: '/component-guide/', children: [
    { id: '3-1', name: 'Button', href: '/component-guide/button/', children: {} },
    { id: '3-2', name: 'Badge', href: '/component-guide/badge/', children: {} },
    { id: '3-3', name: 'Input', href: '/component-guide/input/', children: {} },
    { id: '3-4', name: 'Textarea', href: '/component-guide/textarea/', children: {} },
    { id: '3-5', name: 'Select', href: '/component-guide/select/', children: {} },
    { id: '3-6', name: 'Checkbox', href: '/component-guide/checkbox/', children: {} },
    { id: '3-7', name: 'Radio', href: '/component-guide/radio/', children: {} },
    { id: '3-8', name: 'Switch', href: '/component-guide/switch/', children: {} },
    { id: '3-9', name: 'Slider', href: '/component-guide/slider/', children: {} },
    { id: '3-10', name: 'Progress', href: '/component-guide/progress/', children: {} },
    { id: '3-11', name: 'Separator', href: '/component-guide/separator/', children: {} },
    { id: '3-12', name: 'Card', href: '/component-guide/card/', children: {} },
    { id: '3-13', name: 'Accordion', href: '/component-guide/accordion/', children: {} },
    { id: '3-14', name: 'Collapsible', href: '/component-guide/collapsible/', children: {} },
    { id: '3-15', name: 'Tabs', href: '/component-guide/tabs/', children: {} },
    { id: '3-16', name: 'Sidebar', href: '/component-guide/sidebar/', children: {} },
    { id: '3-17', name: 'Drawer', href: '/component-guide/drawer/', children: {} },
    { id: '3-18', name: 'Sheet', href: '/component-guide/sheet/', children: {} },
    { id: '3-19', name: 'Navigation Menu', href: '/component-guide/navigation-menu/', children: {} },
    { id: '3-20', name: 'Breadcrumb', href: '/component-guide/breadcrumb/', children: {} },
    { id: '3-21', name: 'Dialog', href: '/component-guide/dialog/', children: {} },
    { id: '3-22', name: 'Alert Dialog', href: '/component-guide/alert-dialog/', children: {} },
    { id: '3-23', name: 'Popover', href: '/component-guide/popover/', children: {} },
    { id: '3-24', name: 'Tooltip', href: '/component-guide/tooltip/', children: {} },
    { id: '3-25', name: 'Hover Card', href: '/component-guide/hover-card/', children: {} },
    { id: '3-26', name: 'Context Menu', href: '/component-guide/context-menu/', children: {} },
    { id: '3-27', name: 'Command', href: '/component-guide/command/', children: {} },
    { id: '3-28', name: 'Menubar', href: '/component-guide/menubar/', children: {} },
    { id: '3-29', name: 'Table', href: '/component-guide/table/', children: {} },
    { id: '3-30', name: 'Calendar', href: '/component-guide/calendar/', children: {} },
    { id: '3-31', name: 'Pagination', href: '/component-guide/pagination/', children: {} },
    { id: '3-32', name: 'Carousel', href: '/component-guide/carousel/', children: {} },
    { id: '3-33', name: 'Chart', href: '/component-guide/chart/', children: {} },
    { id: '3-34', name: 'Data Table', href: '/component-guide/data-table/', children: {} },
    { id: '3-35', name: 'Color Picker', href: '/component-guide/color-picker/', children: {} },
    { id: '3-36', name: 'Input OTP', href: '/component-guide/input-otp/', children: {} },
    { id: '3-37', name: 'Toggle', href: '/component-guide/toggle/', children: {} },
    { id: '3-38', name: 'Toggle Group', href: '/component-guide/toggle-group/', children: {} },
    { id: '3-39', name: 'Resizable', href: '/component-guide/resizable/', children: {} },
    { id: '3-40', name: 'Scroll Area', href: '/component-guide/scroll-area/', children: {} },
    { id: '3-41', name: 'Skeleton', href: '/component-guide/skeleton/', children: {} },
    { id: '3-42', name: 'Aspect Ratio', href: '/component-guide/aspect-ratio/', children: {} },
    { id: '3-43', name: 'Calendar', href: '/component-guide/calendar/', children: {} },
    { id: '3-44', name: 'Pagination', href: '/component-guide/pagination/', children: {} },
  ]},
  { id: '4', name: '플레이그라운드', href: '/playground/', children: []},
  { id: '5', name: '테마 에디터', href: '/theme-editor/', children: []},
];

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// 기본 레이아웃 컴포넌트 (사이드바 포함)
const DefaultLayout = React.memo(({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="guide-container bg-background h-screen overflow-hidden">
      <header className="guide-header">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <strong className="logo text-xl font-bold">
            <Link href="/">Design System</Link>
          </strong>
          <nav>
            <ul className="flex gap-6">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-options">
            <ModeToggle />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto flex gap-6 py-4">
        <aside className="guide-aside w-[200px]">
          <ScrollArea className="h-[calc(100vh-6rem)]">
            <nav>
              <ul className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <li key={item.id}>
                    {item.children && Object.keys(item.children).length > 0 ? (
                      <span className="px-3 py-2 text-sm font-medium rounded-md transition-colors">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-flex px-2 text-sm font-medium rounded-md transition-colors',
                          pathname === item.href
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                    
                    {item.children && Object.keys(item.children).length > 0 && (
                      <ul className="pl-4">
                        {Object.values(item.children).map((child) => (
                          <li key={child.id} className="">
                            <Link
                              href={child.href}
                              className={cn(
                                'inline-flex px-2 text-sm font-medium rounded-md transition-colors',
                                pathname === child.href
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground'
                              )}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </aside>
        <main className="guide-main w-[calc(100%-200px)]">          
          <ScrollArea className="h-[calc(100vh-6rem)]">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
});

DefaultLayout.displayName = 'DefaultLayout';

// 메인 레이아웃 컴포넌트
const MainLayout = React.memo(({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="guide-container bg-background h-screen overflow-hidden">
      <header className="guide-header">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <strong className="logo text-xl font-bold">
            <Link href="/">Design System</Link>
          </strong>
          <nav>
            <ul className="flex gap-6">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-options">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <main className="guide-main">
          {children}
        </main>
      </div>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

// 테마 에디터 레이아웃 컴포넌트 (메모이제이션으로 최적화)
const ThemeEditorLayout = React.memo(({ children }: ConditionalLayoutProps) => (
  <>
    {children}
  </>
));

ThemeEditorLayout.displayName = 'ThemeEditorLayout';

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  console.log('test',pathname);

  // 경로 기반 레이아웃 결정 (메모이제이션으로 최적화)
  const layoutConfig = useMemo(() => {
    const isThemeEditor = pathname == '/theme-editor/';
    // const useDefaultLayout = pathname === '/design-guide/1_getting-started';
    const useMainLayout = 
    pathname == '/' || 
    pathname == '/design-guide/' ||                          
    pathname == '/tokens/' ||
    pathname == '/component-guide/' || 
    pathname == '/playground/';

    return {
      isThemeEditor,
      useMainLayout,
      // useDefaultLayout,
      theme: (isThemeEditor ? 'dark' : 'light') as 'light' | 'dark',
      showToaster: !isThemeEditor
    };
  }, [pathname]);

  // 테마 에디터 레이아웃
  if (layoutConfig.isThemeEditor) {
    return (
      <ThemeProvider defaultTheme={layoutConfig.theme}>
        <ThemeEditorProvider>
          <ThemeEditorLayout>{children}</ThemeEditorLayout>
          {/* {layoutConfig.showToaster && <Toaster />} */}
        </ThemeEditorProvider>
      </ThemeProvider>
    );
  }

  // 메인 레이아웃
  if (layoutConfig.useMainLayout) {
    return (
      <ThemeProvider defaultTheme={layoutConfig.theme}>
        <MainLayout>{children}</MainLayout>
        {layoutConfig.showToaster && <Toaster />}
      </ThemeProvider>
    );
  }

  // 기본 레이아웃 (사이드바 포함)
  if (!layoutConfig.isThemeEditor && !layoutConfig.useMainLayout) {
    return (
      <ThemeProvider defaultTheme={layoutConfig.theme}>
        <DefaultLayout>{children}</DefaultLayout>
        {layoutConfig.showToaster && <Toaster />}
      </ThemeProvider>
    );
  }
}
