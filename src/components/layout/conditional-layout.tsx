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

// 네비게이션 타입 정의
interface NavigationItem {
  id: string;
  name: string;
  href: string;
  children?: Record<string, NavigationItem>;
}

// 레이아웃 타입 정의
type LayoutType = 'main' | 'default' | 'theme-editor';

// 경로 상수 정의
const ROUTES = {
  HOME: '/',
  DESIGN_GUIDE: '/design-guide/',
  TOKENS: '/tokens/',
  COMPONENT_GUIDE: '/component-guide/',
  PLAYGROUND: '/playground/',
  THEME_EDITOR: '/theme-editor/',
} as const;

// 네비게이션 데이터 (중복 제거 및 최적화)
const navigation: NavigationItem[] = [
  {
    id: '1',
    name: '디자인 가이드',
    href: ROUTES.DESIGN_GUIDE,
    children: {
      '1-1': { id: '1-1', name: '시작하기', href: '/design-guide/1_getting-started' },
      '1-2': { id: '1-2', name: '로고', href: '/design-guide/2_logo' },
      '1-3': { id: '1-3', name: '캐릭터', href: '/design-guide/3_character' }
    }
  },
  {
    id: '2',
    name: '디자인 토큰',
    href: ROUTES.TOKENS,
    children: {
      '2-1': { id: '2-1', name: '디자인 토큰', href: '/tokens/design-tokens/' },
      '2-2': { id: '2-2', name: '타이포그래피', href: '/tokens/typography/' },
      '2-3': { id: '2-3', name: '간격', href: '/tokens/spacing/' },
      '2-4': { id: '2-4', name: '색상 팔레트', href: '/tokens/palette/' }
    }
  },
  {
    id: '3',
    name: '컴포넌트 가이드',
    href: ROUTES.COMPONENT_GUIDE,
    children: {
      '3-1': { id: '3-1', name: 'Button', href: '/component-guide/button/' },
      '3-2': { id: '3-2', name: 'Badge', href: '/component-guide/badge/' },
      '3-3': { id: '3-3', name: 'Input', href: '/component-guide/input/' },
      '3-4': { id: '3-4', name: 'Textarea', href: '/component-guide/textarea/' },
      '3-5': { id: '3-5', name: 'Select', href: '/component-guide/select/' },
      '3-6': { id: '3-6', name: 'Checkbox', href: '/component-guide/checkbox/' },
      '3-7': { id: '3-7', name: 'RadioGroup', href: '/component-guide/radio-group/' },
      '3-8': { id: '3-8', name: 'Switch', href: '/component-guide/switch/' },
      '3-9': { id: '3-9', name: 'Slider', href: '/component-guide/slider/' },
      '3-10': { id: '3-10', name: 'Progress', href: '/component-guide/progress/' },
      '3-11': { id: '3-11', name: 'Separator', href: '/component-guide/separator/' },
      '3-12': { id: '3-12', name: 'Card', href: '/component-guide/card/' },
      '3-13': { id: '3-13', name: 'Accordion', href: '/component-guide/accordion/' },
      '3-14': { id: '3-14', name: 'Collapsible', href: '/component-guide/collapsible/' },
      '3-15': { id: '3-15', name: 'Tabs', href: '/component-guide/tabs/' },
      '3-16': { id: '3-16', name: 'Sidebar', href: '/component-guide/sidebar/' },
      '3-17': { id: '3-17', name: 'Drawer', href: '/component-guide/drawer/' },
      '3-18': { id: '3-18', name: 'Sheet', href: '/component-guide/sheet/' },
      '3-19': { id: '3-19', name: 'Navigation Menu', href: '/component-guide/navigation-menu/' },
      '3-20': { id: '3-20', name: 'Breadcrumb', href: '/component-guide/breadcrumb/' },
      '3-21': { id: '3-21', name: 'Dialog', href: '/component-guide/dialog/' },
      '3-22': { id: '3-22', name: 'Alert Dialog', href: '/component-guide/alert-dialog/' },
      '3-23': { id: '3-23', name: 'Popover', href: '/component-guide/popover/' },
      '3-24': { id: '3-24', name: 'Tooltip', href: '/component-guide/tooltip/' },
      '3-25': { id: '3-25', name: 'Hover Card', href: '/component-guide/hover-card/' },
      '3-26': { id: '3-26', name: 'Context Menu', href: '/component-guide/context-menu/' },
      '3-27': { id: '3-27', name: 'Command', href: '/component-guide/command/' },
      '3-28': { id: '3-28', name: 'Menubar', href: '/component-guide/menubar/' },
      '3-29': { id: '3-29', name: 'Table', href: '/component-guide/table/' },
      '3-30': { id: '3-30', name: 'Calendar', href: '/component-guide/calendar/' },
      '3-31': { id: '3-31', name: 'Pagination', href: '/component-guide/pagination/' },
      '3-32': { id: '3-32', name: 'Carousel', href: '/component-guide/carousel/' },
      '3-33': { id: '3-33', name: 'Chart', href: '/component-guide/chart/' },
      '3-34': { id: '3-34', name: 'Data Table', href: '/component-guide/data-table/' },
      '3-35': { id: '3-35', name: 'Color Picker', href: '/component-guide/color-picker/' },
      '3-36': { id: '3-36', name: 'Input OTP', href: '/component-guide/input-otp/' },
      '3-37': { id: '3-37', name: 'Toggle', href: '/component-guide/toggle/' },
      '3-38': { id: '3-38', name: 'Toggle Group', href: '/component-guide/toggle-group/' },
      '3-39': { id: '3-39', name: 'Resizable', href: '/component-guide/resizable/' },
      '3-40': { id: '3-40', name: 'Scroll Area', href: '/component-guide/scroll-area/' },
      '3-41': { id: '3-41', name: 'Skeleton', href: '/component-guide/skeleton/' },
      '3-42': { id: '3-42', name: 'Aspect Ratio', href: '/component-guide/aspect-ratio/' },
    }
  },
  { id: '4', name: '플레이그라운드', href: ROUTES.PLAYGROUND },
  { id: '5', name: '테마 에디터', href: ROUTES.THEME_EDITOR },
];

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// 네비게이션 아이템이 활성화되어야 하는지 확인하는 함수
const isNavigationItemActive = (item: NavigationItem, pathname: string): boolean => {
  // 정확한 경로 매칭
  if (pathname === item.href) {
    return true;
  }

  // 하위 경로 매칭 (children이 있는 경우)
  if (item.children && Object.keys(item.children).length > 0) {
    return Object.values(item.children).some(child =>
      pathname.startsWith(child.href) || pathname === child.href
    );
  }

  return false;
};

// 현재 활성화된 메뉴 정보를 찾는 함수
const getActiveMenuInfo = (pathname: string): { parent: NavigationItem | null; child: NavigationItem | null } => {
  for (const item of navigation) {
    // 정확한 경로 매칭
    if (pathname === item.href) {
      return { parent: item, child: null };
    }

    // 하위 경로 매칭
    if (item.children && Object.keys(item.children).length > 0) {
      const activeChild = Object.values(item.children).find(child =>
        pathname.startsWith(child.href) || pathname === child.href
      );

      if (activeChild) {
        return { parent: item, child: activeChild };
      }
    }
  }

  return { parent: null, child: null };
};

// 공통 헤더 컴포넌트
const Header = React.memo(() => {
  const pathname = usePathname();

  return (
    <header className="guide-header">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <strong className="logo text-xl font-bold">
          <Link href={ROUTES.HOME}>Design System</Link>
        </strong>
        <nav>
          <ul className="flex gap-6">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isNavigationItemActive(item, pathname)
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
  );
});

Header.displayName = 'Header';

// 사이드바 컴포넌트
const Sidebar = React.memo(() => {
  const pathname = usePathname();

  return (
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
                      <li key={child.id}>
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
  );
});

Sidebar.displayName = 'Sidebar';

// 활성화된 메뉴 제목 컴포넌트
const ActiveMenuTitle = React.memo(() => {
  const pathname = usePathname();
  const { parent, child } = getActiveMenuInfo(pathname);

  if (!parent) return null;

  return (
    <>
      <strong className="block mb-6 text-3xl border border-red-500">{parent.name}</strong>
    </>
  );
});

ActiveMenuTitle.displayName = 'ActiveMenuTitle';

// 통합 레이아웃 컴포넌트
const Layout = React.memo(({ children, showSidebar = false }: ConditionalLayoutProps & { showSidebar?: boolean }) => {
  return (
    <div className="guide-container bg-background h-screen overflow-hidden">
      <Header />

      <div className="container mx-auto flex gap-6 py-4">
        {showSidebar && <Sidebar />}
        <main className={cn("guide-main", showSidebar ? "w-[calc(100%-200px)]" : "w-full")}>
          {showSidebar ? (
            <div className="">
              <ActiveMenuTitle />
              <ScrollArea className="h-[calc(100vh-6rem)]">
                {children}
              </ScrollArea>
            </div>
          ) : (
            <div className="">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

// 테마 에디터 레이아웃 컴포넌트
const ThemeEditorLayout = React.memo(({ children }: ConditionalLayoutProps) => (
  <>
    {children}
  </>
));

ThemeEditorLayout.displayName = 'ThemeEditorLayout';

// 레이아웃 타입 결정 함수
const getLayoutType = (pathname: string): LayoutType => {
  if (pathname === ROUTES.THEME_EDITOR) {
    return 'theme-editor';
  }

  const mainLayoutRoutes: readonly string[] = [
    ROUTES.HOME,
    ROUTES.DESIGN_GUIDE,
    ROUTES.TOKENS,
    ROUTES.COMPONENT_GUIDE,
    ROUTES.PLAYGROUND
  ];

  if (mainLayoutRoutes.includes(pathname)) {
    return 'main';
  }

  return 'default';
};

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // 레이아웃 설정 (메모이제이션으로 최적화)
  const layoutConfig = useMemo(() => {
    const layoutType = getLayoutType(pathname);
    const isThemeEditor = layoutType === 'theme-editor';
    const showSidebar = layoutType === 'default';

    return {
      layoutType,
      isThemeEditor,
      showSidebar,
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
        </ThemeEditorProvider>
      </ThemeProvider>
    );
  }

  // 통합 레이아웃 (사이드바 표시 여부에 따라)
  return (
    <ThemeProvider defaultTheme={layoutConfig.theme}>
      <Layout showSidebar={layoutConfig.showSidebar}>
        {children}
      </Layout>
      {layoutConfig.showToaster && <Toaster />}
    </ThemeProvider>
  );
}
