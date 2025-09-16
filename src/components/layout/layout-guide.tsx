'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

// 네비게이션 타입 정의
interface NavigationItem {
  id: string;
  name: string;
  href: string;
  label?: string;
  description?: string;
  sidebar?: boolean;
  children?: Record<string, NavigationItem>;
}

// 경로 상수 정의
const ROUTES = {
  // HOME: '/layout-guide',
  OVERVIEW: '/layout-guide/overview/introduction/',
  BRAND: '/layout-guide/brand/logo/',
  PLATFORM: '/layout-guide/resource/logos/',
  FOUNDATIONS: '/layout-guide/foundations/design-tokens/',
  COMPONENT_GUIDE: '/layout-guide/component-guide/',
  PLAYGROUND: '/layout-guide/playground/',
  LAYOUTS: '/layout-guide/layouts/',
} as const;

// 네비게이션 데이터
const navigation: NavigationItem[] = [
  // {
  //   id: '0',
  //   name: 'Home',
  //   href: ROUTES.HOME,
  //   description: '디자인 시스템 메인 페이지',
  //   sidebar: false
  // },
  {
    id: '1',
    name: 'Overview',
    href: ROUTES.OVERVIEW,
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    children: {
      '1-1': {
        id: '1-1',
        name: 'Introduction',
        href: '/layout-guide/overview/introduction/',
        description: '디자인 시스템의 소개 및 핵심 원칙을 확인하세요.'
      },
    }
  },
  {
    id: '2',
    name: 'Brand',
    href: ROUTES.BRAND,
    description: '브랜드 아이덴티티와 일관된 시각적 표현을 위한 가이드라인을 제공합니다.',
    children: {
      '2-1': {
        id: '2-1',
        name: 'Logo',
        href: '/layout-guide/brand/logo/',
        description: '브랜드 로고의 사용법과 가이드라인을 확인하세요.'
      }
    }
  },
  {
    id: '3',
    name: 'Resource',
    href: ROUTES.PLATFORM,
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    children: {
      '3-1': {
        id: '3-1',
        name: 'Logos',
        href: '/layout-guide/resource/logos/',
        description: '플랫폼 로고의 사용법과 가이드라인을 확인하세요.'
      },
      '3-2': {
        id: '3-2',
        name: 'Characters',
        href: '/layout-guide/resource/characters/',
        description: '플랫폼 캐릭터의 사용법과 가이드라인을 확인하세요.'
      },
      '3-3': {
        id: '3-3',
        name: 'Loadings',
        href: '/layout-guide/resource/loadings/',
        description: '플랫폼 로딩의 사용법과 가이드라인을 확인하세요.'
      }
    }
  },
  {
    id: '4',
    name: 'Foundations',
    href: ROUTES.FOUNDATIONS,
    description: '디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 제공합니다.',
    children: {
      '4-1': {
        id: '4-1',
        name: 'Design Tokens',
        href: '/layout-guide/foundations/design-tokens/',
        description: '디자인 토큰의 카테고리와 사용법을 확인하세요.'
      },
      '4-2': {
        id: '4-2',
        name: 'Typography',
        href: '/layout-guide/foundations/typography/',
        description: '타이포그래피 토큰의 크기와 스타일을 확인하세요.'
      },
      '4-3': {
        id: '4-3',
        name: 'Spacing',
        href: '/layout-guide/foundations/spacing/',
        description: '간격 토큰의 체계와 사용법을 확인하세요.'
      },
      '4-4': {
        id: '4-4',
        name: 'Colors',
        href: '/layout-guide/foundations/palette/',
        description: '색상 팔레트와 색상 토큰을 확인하세요.'
      }
    }
  },
  {
    id: '5',
    name: 'Components',
    href: ROUTES.COMPONENT_GUIDE,
    description: '50+ UI 컴포넌트의 사용법과 예제를 제공합니다.',
    children: {
      '5-1': { id: '5-1', name: 'Button', href: '/layout-guide/component-guide/button/', description: '다양한 스타일과 크기의 버튼 컴포넌트. 클릭 이벤트와 상태를 지원합니다.' },
      '5-2': { id: '5-2', name: 'Badge', href: '/layout-guide/component-guide/badge/', description: '상태나 라벨을 표시하는 작은 배지 컴포넌트. 다양한 색상과 스타일을 지원합니다.' },
      '5-3': { id: '5-3', name: 'Input', href: '/layout-guide/component-guide/input/', description: '텍스트 입력을 위한 기본 인풋 필드. 포커스 상태와 유효성 검사를 지원합니다.' },
      '5-4': { id: '5-4', name: 'Textarea', href: '/layout-guide/component-guide/textarea/', description: '여러 줄 텍스트 입력을 위한 텍스트 영역. 자동 크기 조절과 스크롤을 지원합니다.' },
      '5-5': { id: '5-5', name: 'Select', href: '/layout-guide/component-guide/select/', description: '드롭다운 선택 메뉴. 키보드 네비게이션과 검색 기능을 지원합니다.' },
      '5-6': { id: '5-6', name: 'Checkbox', href: '/layout-guide/component-guide/checkbox/', description: '다중 선택이 가능한 체크박스. 불확정 상태와 키보드 접근성을 지원합니다.' },
      '5-7': { id: '5-7', name: 'RadioGroup', href: '/layout-guide/component-guide/radio-group/', description: '단일 선택을 위한 라디오 버튼 그룹. 키보드 네비게이션을 지원합니다.' },
      '5-8': { id: '5-8', name: 'Switch', href: '/layout-guide/component-guide/switch/', description: '온/오프 상태를 전환하는 토글 스위치. 접근성과 애니메이션을 지원합니다.' },
      '5-9': { id: '5-9', name: 'Slider', href: '/layout-guide/component-guide/slider/', description: '범위 내에서 값을 선택할 수 있는 슬라이더. 키보드와 터치를 지원합니다.' },
      '5-10': { id: '5-10', name: 'Progress', href: '/layout-guide/component-guide/progress/', description: '작업 진행률을 시각적으로 표시하는 프로그레스 바.' },
      '5-11': { id: '5-11', name: 'Separator', href: '/layout-guide/component-guide/separator/', description: '콘텐츠 섹션을 시각적으로 구분하는 구분선 컴포넌트.' },
      '5-12': { id: '5-12', name: 'Card', href: '/layout-guide/component-guide/card/', description: '관련된 콘텐츠를 그룹화하고 구조화하는 카드 컨테이너.' },
      '5-13': { id: '5-13', name: 'Accordion', href: '/layout-guide/component-guide/accordion/', description: '여러 패널을 접고 펼칠 수 있는 아코디언 컴포넌트.' },
      '5-14': { id: '5-14', name: 'Collapsible', href: '/layout-guide/component-guide/collapsible/', description: '단일 콘텐츠 영역을 접고 펼칠 수 있는 접이식 컴포넌트.' },
      '5-15': { id: '5-15', name: 'Tabs', href: '/layout-guide/component-guide/tabs/', description: '여러 콘텐츠 패널 간 전환을 위한 탭 인터페이스.' },
      '5-16': { id: '5-16', name: 'Sidebar', href: '/layout-guide/component-guide/sidebar/', description: '사이드 네비게이션을 위한 사이드바. 접기/펼치기와 반응형을 지원합니다.' },
      '5-17': { id: '5-17', name: 'Drawer', href: '/layout-guide/component-guide/drawer/', description: '슬라이딩 패널 형태의 드로어. 모바일에서 우수한 UX를 제공합니다.' },
      '5-18': { id: '5-18', name: 'Sheet', href: '/layout-guide/component-guide/sheet/', description: '모바일 친화적인 시트 컴포넌트. 다양한 방향에서 슬라이드됩니다.' },
      '5-19': { id: '5-19', name: 'Navigation Menu', href: '/layout-guide/component-guide/navigation-menu/', description: '복잡한 네비게이션을 위한 드롭다운 메뉴. 키보드 네비게이션을 지원합니다.' },
      '5-20': { id: '5-20', name: 'Breadcrumb', href: '/layout-guide/component-guide/breadcrumb/', description: '현재 페이지의 계층적 경로를 표시하는 브레드크럼.' },
      '5-21': { id: '5-21', name: 'Dialog', href: '/layout-guide/component-guide/dialog/', description: '모달 대화상자를 위한 다이얼로그. 포커스 트랩과 접근성을 지원합니다.' },
      '5-22': { id: '5-22', name: 'Alert Dialog', href: '/layout-guide/component-guide/alert-dialog/', description: '경고나 확인을 위한 알림 다이얼로그. 사용자 확인이 필요한 작업에 사용됩니다.' },
      '5-23': { id: '5-23', name: 'Popover', href: '/layout-guide/component-guide/popover/', description: '트리거 요소 근처에 콘텐츠를 표시하는 팝오버. 포지셔닝과 화살표를 지원합니다.' },
      '5-24': { id: '5-24', name: 'Tooltip', href: '/layout-guide/component-guide/tooltip/', description: '호버 시 도움말 정보를 표시하는 툴팁. 지연 시간과 애니메이션을 지원합니다.' },
      '5-25': { id: '5-25', name: 'Hover Card', href: '/layout-guide/component-guide/hover-card/', description: '호버 시 미리보기 카드를 표시하는 컴포넌트. 지연 시간과 애니메이션을 지원합니다.' },
      '5-26': { id: '5-26', name: 'Context Menu', href: '/layout-guide/component-guide/context-menu/', description: '우클릭 시 표시되는 컨텍스트 메뉴. 키보드 접근성과 포지셔닝을 지원합니다.' },
      '5-27': { id: '5-27', name: 'Command', href: '/layout-guide/component-guide/command/', description: '명령어 팔레트와 검색 인터페이스. 키보드 네비게이션과 필터링을 지원합니다.' },
      '5-28': { id: '5-28', name: 'Menubar', href: '/layout-guide/component-guide/menubar/', description: '데스크톱 스타일의 메뉴바. 키보드 네비게이션과 드롭다운을 지원합니다.' },
      '5-29': { id: '5-29', name: 'Table', href: '/layout-guide/component-guide/table/', description: '데이터를 행과 열로 표시하는 테이블. 정렬과 선택 기능을 지원합니다.' },
      '5-30': { id: '5-30', name: 'Calendar', href: '/layout-guide/component-guide/calendar/', description: '날짜 선택을 위한 캘린더. 단일/다중 선택과 범위 선택을 지원합니다.' },
      '5-31': { id: '5-31', name: 'Pagination', href: '/layout-guide/component-guide/pagination/', description: '페이지 네비게이션을 위한 페이지네이션. 다양한 스타일과 크기를 지원합니다.' },
      '5-32': { id: '5-32', name: 'Carousel', href: '/layout-guide/component-guide/carousel/', description: '슬라이드 쇼를 위한 캐러셀. 자동 재생과 터치 제스처를 지원합니다.' },
      '5-34': { id: '5-34', name: 'Data Table', href: '/layout-guide/component-guide/data-table/', description: '고급 데이터 테이블 기능을 제공하는 컴포넌트. 정렬, 필터링, 페이지네이션을 지원합니다.' },
      '5-36': { id: '5-36', name: 'Input OTP', href: '/layout-guide/component-guide/input-otp/', description: 'OTP 코드 입력을 위한 컴포넌트. 자동 포커스와 유효성 검사를 지원합니다.' },
      '5-37': { id: '5-37', name: 'Toggle', href: '/layout-guide/component-guide/toggle/', description: '토글 버튼을 위한 컴포넌트. 선택 상태와 아이콘을 지원합니다.' },
      '5-38': { id: '5-38', name: 'Toggle Group', href: '/layout-guide/component-guide/toggle-group/', description: '토글 버튼 그룹을 위한 컴포넌트. 단일/다중 선택과 키보드 네비게이션을 지원합니다.' },
      '5-39': { id: '5-39', name: 'Resizable', href: '/layout-guide/component-guide/resizable/', description: '크기 조절이 가능한 패널을 위한 컴포넌트. 드래그 핸들과 최소/최대 크기를 지원합니다.' },
      '5-40': { id: '5-40', name: 'Scroll Area', href: '/layout-guide/component-guide/scroll-area/', description: '스크롤 가능한 영역을 위한 컴포넌트. 커스텀 스크롤바와 휠 이벤트를 지원합니다.' },
      '5-41': { id: '5-41', name: 'Skeleton', href: '/layout-guide/component-guide/skeleton/', description: '로딩 상태를 표시하는 스켈레톤 컴포넌트. 다양한 크기와 애니메이션을 지원합니다.' },
      '5-42': { id: '5-42', name: 'Aspect Ratio', href: '/layout-guide/component-guide/aspect-ratio/', description: '종횡비를 유지하는 컨테이너 컴포넌트. 이미지와 비디오에 최적화되어 있습니다.' },
    }
  },
  {
    id: '6',
    name: 'Playground',
    href: ROUTES.PLAYGROUND,
    description: '실시간으로 컴포넌트를 테스트하고 미리보기할 수 있는 환경을 제공합니다.'
  },
  {
    id: '7',
    name: 'Layout',
    href: ROUTES.LAYOUTS,
    description: 'OKLCH 색상 공간 기반의 테마 커스터마이징 도구입니다.'
  },
];

interface LayoutGuideProps {
  children: React.ReactNode;
}

// 네비게이션 아이템이 활성화되어야 하는지 확인하는 함수
const isNavigationItemActive = (item: NavigationItem, pathname: string): boolean => {
  if (pathname === item.href) {
    return true;
  }

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
    if (pathname === item.href) {
      return { parent: item, child: null };
    }

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
    <header className="guide-header border-b">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <strong className="logo text-xl font-bold">
          <Link href="/layout-guide/">Design System</Link>
        </strong>
        <nav>
          <ul className="flex gap-6">
            {navigation.filter((item) => item.name !== 'Overview').map((item) => (
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

  const getActiveAccordionValues = () => {
    const activeValues: string[] = [];

    navigation.forEach((item) => {
      if (pathname === item.href) {
        activeValues.push(item.id);
      }
      else if (item.children && Object.keys(item.children).length > 0) {
        const hasActiveChild = Object.values(item.children).some(child =>
          pathname === child.href || pathname.startsWith(child.href)
        );
        if (hasActiveChild) {
          activeValues.push(item.id);
        }
      }
    });

    return activeValues;
  };

  const [accordionValue, setAccordionValue] = useState<string[]>(() => getActiveAccordionValues());

  useEffect(() => {
    const activeValues = getActiveAccordionValues();
    setAccordionValue(prev => {
      const newValues = [...new Set([...prev, ...activeValues])];
      return newValues;
    });
  }, [pathname]);

  return (
    <aside className="guide-aside w-[240px] border-r">
      <ScrollArea className="h-[calc(100svh-64px)] py-4 pr-2">
        <nav>
          <Accordion
            type="multiple"
            className="w-full space-y-5"
            value={accordionValue}
            onValueChange={setAccordionValue}>
            {navigation.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                {item.children && Object.keys(item.children).length > 0 ? (
                  <AccordionTrigger className="flex items-center justify-between w-full rounded-md">
                    <span className="flex py-2 text-base font-medium rounded-md transition-colors">
                      {item.name}
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                ) : (
                  <AccordionTrigger className="flex items-center justify-between w-full rounded-md">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex py-2 text-base font-medium rounded-md transition-colors',
                        pathname === item.href
                          ? 'text-sidebar-foreground'
                          : ''
                      )}
                    >
                      {item.name}
                    </Link>
                  </AccordionTrigger>
                )}
                <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
                  {item.children && Object.keys(item.children).length > 0 && (
                    <ul className="space-y-1">
                      {Object.values(item.children).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className={cn(
                              'inline-flex px-3 py-1 text-sm transition-all duration-200 ease-in-out text-muted-foreground hover:text-foreground hover:bg-accent rounded-md',
                              pathname === child.href
                                ? 'font-bold text-[#C33D2E] bg-accent hover:text-[#C33D2E]'
                                : ''
                            )}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

  const getCurrentPageName = () => {
    if (child) {
      return child.name;
    }

    if (pathname === parent.href) {
      return parent.name;
    }

    if (pathname.startsWith('/layout-guide/component-guide/')) {
      const componentName = pathname.replace('/layout-guide/component-guide/', '').replace('/', '');
      return componentName
        ? componentName
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
        : 'Component Guide';
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    return lastSegment
      ? lastSegment
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
      : parent.name;
  };

  const currentPageName = getCurrentPageName();

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <span className="font-semibold text-muted-foreground">{parent.name}</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/layout-guide/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={parent.href}>{parent.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {child && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{currentPageName}</h1>
        {child && (
          <>
            {child.description && (
              <p className="mt-2 text-sm text-muted-foreground">{child.description}</p>
            )}
          </>
        )}
        {!child && parent.description && (
          <p className="mt-2 text-sm text-muted-foreground">{parent.description}</p>
        )}
      </div>
    </>
  );
});

ActiveMenuTitle.displayName = 'ActiveMenuTitle';

export function LayoutGuide({ children }: LayoutGuideProps) {
  const pathname = usePathname();

  // 현재 경로에 해당하는 네비게이션 아이템 찾기
  const findNavigationItem = (items: NavigationItem[], currentPath: string): NavigationItem | null => {
    for (const item of items) {
      // 정확한 매칭 또는 슬래시 제거 후 매칭
      if (item.href === currentPath ||
        item.href === currentPath.replace(/\/$/, '') ||
        item.href.replace(/\/$/, '') === currentPath) {
        return item;
      }
      if (item.children) {
        for (const child of Object.values(item.children)) {
          if (child.href === currentPath ||
            child.href === currentPath.replace(/\/$/, '') ||
            child.href.replace(/\/$/, '') === currentPath) {
            return child;
          }
        }
      }
    }
    return null;
  };

  const currentItem = findNavigationItem(navigation, pathname);
  const showSidebar = currentItem?.sidebar !== false; // sidebar가 false가 아닌 경우

  return (
    <div className="guide-container bg-background h-screen overflow-hidden">
      <Header />
      <div className="container mx-auto flex gap-16">
        {showSidebar && <Sidebar />}
        <main className={cn(
          "guide-main",
          showSidebar ? "w-[calc(100%-240px)]" : "w-full"
        )}>
          <ActiveMenuTitle />
          <ScrollArea className={cn(
            "pr-2",
            showSidebar ? "h-[72svh]" : "h-[calc(100svh-64px)]"
          )}>
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
