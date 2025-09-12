'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider } from '@/lib/themes/theme-editor-provider';
import { Toaster } from '@/components/ui/sonner';
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
  children?: Record<string, NavigationItem>;
}

// 레이아웃 타입 정의
type LayoutType = 'main' | 'default' | 'theme-editor';

// 경로 상수 정의
const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview/',
  BRAND: '/brand/',
  PLATFORM: '/platform/',
  FOUNDATIONS: '/foundations/',
  COMPONENT_GUIDE: '/component-guide/',
  PLAYGROUND: '/playground/',
  THEME_EDITOR: '/theme-editor/',
} as const;

// 네비게이션 데이터 (중복 제거 및 최적화)
const navigation: NavigationItem[] = [
  {
    id: '1',
    name: 'Overview',
    href: ROUTES.OVERVIEW,
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    children: {
      '1-1': { 
        id: '1-1', 
        name: 'Introduction', 
        href: '/overview/introduction/',
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
        href: '/brand/logo/',
        description: '브랜드 로고의 사용법과 가이드라인을 확인하세요.'
      }
    }
  },
  {
    id: '3',
    name: 'Platform',
    href: ROUTES.PLATFORM,
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    children: {
      '3-1': { 
        id: '3-1', 
        name: 'Logos', 
        href: '/platform/logos/',
        description: '플랫폼 로고의 사용법과 가이드라인을 확인하세요.'
      },
      '3-2': { 
        id: '3-2', 
        name: 'Characters', 
        href: '/platform/characters/',
        description: '플랫폼 캐릭터의 사용법과 가이드라인을 확인하세요.'
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
        href: '/foundations/design-tokens/',
        description: '디자인 토큰의 카테고리와 사용법을 확인하세요.'
      },
      '4-2': { 
        id: '4-2', 
        name: 'Typography', 
        href: '/foundations/typography/',
        description: '타이포그래피 토큰의 크기와 스타일을 확인하세요.'
      },
      '4-3': { 
        id: '4-3', 
        name: 'Spacing', 
        href: '/foundations/spacing/',
        description: '간격 토큰의 체계와 사용법을 확인하세요.'
      },
      '4-4': { 
        id: '4-4', 
        name: 'Colors', 
        href: '/foundations/palette/',
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
      '5-1': { 
        id: '5-1', 
        name: 'Button', 
        href: '/component-guide/button/',
        description: '다양한 스타일과 크기의 버튼 컴포넌트. 클릭 이벤트와 상태를 지원합니다.'
      },
      '5-2': { 
        id: '5-2', 
        name: 'Badge', 
        href: '/component-guide/badge/',
        description: '상태나 라벨을 표시하는 작은 배지 컴포넌트. 다양한 색상과 스타일을 지원합니다.'
      },
      '5-3': { 
        id: '5-3', 
        name: 'Input', 
        href: '/component-guide/input/',
        description: '텍스트 입력을 위한 기본 인풋 필드. 포커스 상태와 유효성 검사를 지원합니다.'
      },
      '5-4': { 
        id: '5-4', 
        name: 'Textarea', 
        href: '/component-guide/textarea/',
        description: '여러 줄 텍스트 입력을 위한 텍스트 영역. 자동 크기 조절과 스크롤을 지원합니다.'
      },
      '5-5': { 
        id: '5-5', 
        name: 'Select', 
        href: '/component-guide/select/',
        description: '드롭다운 선택 메뉴. 키보드 네비게이션과 검색 기능을 지원합니다.'
      },
      '5-6': { 
        id: '5-6', 
        name: 'Checkbox', 
        href: '/component-guide/checkbox/',
        description: '다중 선택이 가능한 체크박스. 불확정 상태와 키보드 접근성을 지원합니다.'
      },
      '5-7': { 
        id: '5-7', 
        name: 'RadioGroup', 
        href: '/component-guide/radio-group/',
        description: '단일 선택을 위한 라디오 버튼 그룹. 키보드 네비게이션을 지원합니다.'
      },
      '5-8': { 
        id: '5-8', 
        name: 'Switch', 
        href: '/component-guide/switch/',
        description: '온/오프 상태를 전환하는 토글 스위치. 접근성과 애니메이션을 지원합니다.'
      },
      '5-9': { 
        id: '5-9', 
        name: 'Slider', 
        href: '/component-guide/slider/',
        description: '범위 내에서 값을 선택할 수 있는 슬라이더. 키보드와 터치를 지원합니다.'
      },
      '5-10': { 
        id: '5-10', 
        name: 'Progress', 
        href: '/component-guide/progress/',
        description: '작업 진행률을 시각적으로 표시하는 프로그레스 바.'
      },
      '5-11': { 
        id: '5-11', 
        name: 'Separator', 
        href: '/component-guide/separator/',
        description: '콘텐츠 섹션을 시각적으로 구분하는 구분선 컴포넌트.'
      },
      '5-12': { 
        id: '5-12', 
        name: 'Card', 
        href: '/component-guide/card/',
        description: '관련된 콘텐츠를 그룹화하고 구조화하는 카드 컨테이너.'
      },
      '5-13': { 
        id: '5-13', 
        name: 'Accordion', 
        href: '/component-guide/accordion/',
        description: '여러 패널을 접고 펼칠 수 있는 아코디언 컴포넌트.'
      },
      '5-14': { 
        id: '5-14', 
        name: 'Collapsible', 
        href: '/component-guide/collapsible/',
        description: '단일 콘텐츠 영역을 접고 펼칠 수 있는 접이식 컴포넌트.'
      },
      '5-15': { 
        id: '5-15', 
        name: 'Tabs', 
        href: '/component-guide/tabs/',
        description: '여러 콘텐츠 패널 간 전환을 위한 탭 인터페이스.'
      },
      '5-16': { 
        id: '5-16', 
        name: 'Sidebar', 
        href: '/component-guide/sidebar/',
        description: '사이드 네비게이션을 위한 사이드바. 접기/펼치기와 반응형을 지원합니다.'
      },
      '5-17': { 
        id: '5-17', 
        name: 'Drawer', 
        href: '/component-guide/drawer/',
        description: '슬라이딩 패널 형태의 드로어. 모바일에서 우수한 UX를 제공합니다.'
      },
      '5-18': { 
        id: '5-18', 
        name: 'Sheet', 
        href: '/component-guide/sheet/',
        description: '모바일 친화적인 시트 컴포넌트. 다양한 방향에서 슬라이드됩니다.'
      },
      '5-19': { 
        id: '5-19', 
        name: 'Navigation Menu', 
        href: '/component-guide/navigation-menu/',
        description: '복잡한 네비게이션을 위한 드롭다운 메뉴. 키보드 네비게이션을 지원합니다.'
      },
      '5-20': { 
        id: '5-20', 
        name: 'Breadcrumb', 
        href: '/component-guide/breadcrumb/',
        description: '현재 페이지의 계층적 경로를 표시하는 브레드크럼.'
      },
      '5-21': { 
        id: '5-21', 
        name: 'Dialog', 
        href: '/component-guide/dialog/',
        description: '모달 대화상자를 위한 다이얼로그. 포커스 트랩과 접근성을 지원합니다.'
      },
      '5-22': { 
        id: '5-22', 
        name: 'Alert Dialog', 
        href: '/component-guide/alert-dialog/',
        description: '경고나 확인을 위한 알림 다이얼로그. 사용자 확인이 필요한 작업에 사용됩니다.'
      },
      '5-23': { 
        id: '5-23', 
        name: 'Popover', 
        href: '/component-guide/popover/',
        description: '트리거 요소 근처에 콘텐츠를 표시하는 팝오버. 포지셔닝과 화살표를 지원합니다.'
      },
      '5-24': { 
        id: '5-24', 
        name: 'Tooltip', 
        href: '/component-guide/tooltip/',
        description: '호버 시 도움말 정보를 표시하는 툴팁. 지연 시간과 애니메이션을 지원합니다.'
      },
      '5-25': { 
        id: '5-25', 
        name: 'Hover Card', 
        href: '/component-guide/hover-card/',
        description: '호버 시 미리보기 카드를 표시하는 컴포넌트. 지연 시간과 애니메이션을 지원합니다.'
      },
      '5-26': { 
        id: '5-26', 
        name: 'Context Menu', 
        href: '/component-guide/context-menu/',
        description: '우클릭 시 표시되는 컨텍스트 메뉴. 키보드 접근성과 포지셔닝을 지원합니다.'
      },
      '5-27': { 
        id: '5-27', 
        name: 'Command', 
        href: '/component-guide/command/',
        description: '명령어 팔레트와 검색 인터페이스. 키보드 네비게이션과 필터링을 지원합니다.'
      },
      '5-28': { 
        id: '5-28', 
        name: 'Menubar', 
        href: '/component-guide/menubar/',
        description: '데스크톱 스타일의 메뉴바. 키보드 네비게이션과 드롭다운을 지원합니다.'
      },
      '5-29': { 
        id: '5-29', 
        name: 'Table', 
        href: '/component-guide/table/',
        description: '데이터를 행과 열로 표시하는 테이블. 정렬과 선택 기능을 지원합니다.'
      },
      '5-30': { 
        id: '5-30', 
        name: 'Calendar', 
        href: '/component-guide/calendar/',
        description: '날짜 선택을 위한 캘린더. 단일/다중 선택과 범위 선택을 지원합니다.'
      },
      '5-31': { 
        id: '5-31', 
        name: 'Pagination', 
        href: '/component-guide/pagination/',
        description: '페이지 네비게이션을 위한 페이지네이션. 다양한 스타일과 크기를 지원합니다.'
      },
      '5-32': { 
        id: '5-32', 
        name: 'Carousel', 
        href: '/component-guide/carousel/',
        description: '슬라이드 쇼를 위한 캐러셀. 자동 재생과 터치 제스처를 지원합니다.'
      },
      // '5-33': { id: '5-33', name: 'Chart', href: '/component-guide/chart/' },
      '5-34': { 
        id: '5-34', 
        name: 'Data Table', 
        href: '/component-guide/data-table/',
        description: '고급 데이터 테이블 기능을 제공하는 컴포넌트. 정렬, 필터링, 페이지네이션을 지원합니다.'
      },
      // '5-35': { id: '5-35', name: 'Color Picker', href: '/component-guide/color-picker/' },
      '5-36': { 
        id: '5-36', 
        name: 'Input OTP', 
        href: '/component-guide/input-otp/',
        description: 'OTP 코드 입력을 위한 컴포넌트. 자동 포커스와 유효성 검사를 지원합니다.'
      },
      '5-37': { 
        id: '5-37', 
        name: 'Toggle', 
        href: '/component-guide/toggle/',
        description: '토글 버튼을 위한 컴포넌트. 선택 상태와 아이콘을 지원합니다.'
      },
      '5-38': { 
        id: '5-38', 
        name: 'Toggle Group', 
        href: '/component-guide/toggle-group/',
        description: '토글 버튼 그룹을 위한 컴포넌트. 단일/다중 선택과 키보드 네비게이션을 지원합니다.'
      },
      '5-39': { 
        id: '5-39', 
        name: 'Resizable', 
        href: '/component-guide/resizable/',
        description: '크기 조절이 가능한 패널을 위한 컴포넌트. 드래그 핸들과 최소/최대 크기를 지원합니다.'
      },
      '5-40': { 
        id: '5-40', 
        name: 'Scroll Area', 
        href: '/component-guide/scroll-area/',
        description: '스크롤 가능한 영역을 위한 컴포넌트. 커스텀 스크롤바와 휠 이벤트를 지원합니다.'
      },
      '5-41': { 
        id: '5-41', 
        name: 'Skeleton', 
        href: '/component-guide/skeleton/',
        description: '로딩 상태를 표시하는 스켈레톤 컴포넌트. 다양한 크기와 애니메이션을 지원합니다.'
      },
      '5-42': { 
        id: '5-42', 
        name: 'Aspect Ratio', 
        href: '/component-guide/aspect-ratio/',
        description: '종횡비를 유지하는 컨테이너 컴포넌트. 이미지와 비디오에 최적화되어 있습니다.'
      },
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
    name: 'Theme Editor', 
    href: ROUTES.THEME_EDITOR,
    description: 'OKLCH 색상 공간 기반의 테마 커스터마이징 도구입니다.'
  },
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
            {navigation.filter((item) => item.name !== 'Overview').map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target={item.name === 'Theme Editor' ? '_blank' : undefined}
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
  
  // 현재 활성화된 메뉴의 부모 아이템 찾기
  const getActiveAccordionValues = () => {
    const activeValues: string[] = [];
    
    navigation.forEach((item) => {
      // 현재 경로가 해당 아이템의 경로와 일치하거나
      if (pathname === item.href) {
        activeValues.push(item.id);
      }
      // 하위 메뉴 중 현재 경로와 일치하는 것이 있으면
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

  // pathname이 변경될 때마다 아코디언 값 업데이트
  useEffect(() => {
    const activeValues = getActiveAccordionValues();
    setAccordionValue(prev => {
      // 기존에 열려있던 아코디언은 유지하고, 새로 활성화된 아코디언 추가
      const newValues = [...new Set([...prev, ...activeValues])];
      return newValues;
    });
  }, [pathname]);

  return (
    <aside className="guide-aside w-[240px]">
      <ScrollArea className="h-[calc(100svh-10rem)] pr-4">
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
                      target={item.name === 'Theme Editor' ? '_blank' : undefined}
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

  // 현재 페이지 이름 결정 (최적화된 버전)
  const getCurrentPageName = () => {
    // 자식 메뉴가 활성화된 경우 우선 반환
    if (child) {
      return child.name;
    }
    
    // 부모 메뉴가 직접 활성화된 경우
    if (pathname === parent.href) {
      return parent.name;
    }
    
    // 컴포넌트 가이드 페이지 처리 (가장 일반적인 케이스)
    if (pathname.startsWith('/component-guide/')) {
      const componentName = pathname.replace('/component-guide/', '').replace('/', '');
      return componentName
        ? componentName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim()
        : 'Component Guide';
    }
    
    // 경로에서 마지막 세그먼트 추출하여 처리
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
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-muted-foreground">{parent.name}</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
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

// 통합 레이아웃 컴포넌트
const Layout = React.memo(({ children, showSidebar = false }: ConditionalLayoutProps & { showSidebar?: boolean }) => {
  return (
    <div className="guide-container bg-background h-screen overflow-hidden">
      <Header />

      <div className="container mx-auto flex gap-12 py-6">
        {showSidebar && <Sidebar />}
        <main className={cn("guide-main", showSidebar ? "w-[calc(100%-240px)]" : "w-full")}>
          {showSidebar ? (
            <>
              <ActiveMenuTitle />
              <ScrollArea className="h-[72svh]">
                {children}
              </ScrollArea>
            </>
          ) : (
            <>
              {children}
            </>
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
    ROUTES.HOME
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
