export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  label?: string;
  description?: string;
  sidebar?: boolean;
  children?: Record<string, NavigationItem>;
}

export const ROUTES = {
  OVERVIEW: '/app-guide/overview/introduction/',
  BRAND: '/app-guide/brand/logo/',
  PLATFORM: '/app-guide/resource/logos/',
  FOUNDATIONS: '/app-guide/foundations/design-tokens/',
  COMPONENT_GUIDE: '/app-guide/component-guide/',
  PLAYGROUND: '/app-guide/playground/',
  LAYOUTS: '/app-guide/demos/',
} as const;

export const navigation: NavigationItem[] = [
  {
    id: '1',
    name: 'Overview',
    href: ROUTES.OVERVIEW,
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    children: {
      '1-1': { id: '1-1', name: 'Introduction', href: '/app-guide/overview/introduction/', description: '디자인 시스템의 소개 및 핵심 원칙을 확인하세요.' },
    }
  },
  {
    id: '2',
    name: 'Brand',
    href: ROUTES.BRAND,
    description: '브랜드 아이덴티티와 일관된 시각적 표현을 위한 가이드라인을 제공합니다.',
    children: {
      '2-1': { id: '2-1', name: 'Logo', href: '/app-guide/brand/logo/', description: '브랜드 로고의 사용법과 가이드라인을 확인하세요.' }
    }
  },
  {
    id: '3',
    name: 'Resource',
    href: ROUTES.PLATFORM,
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    children: {
      '3-1': { id: '3-1', name: 'Logos', href: '/app-guide/resource/logos/', description: '플랫폼 로고의 사용법과 가이드라인을 확인하세요.' },
      '3-2': { id: '3-2', name: 'Characters', href: '/app-guide/resource/characters/', description: '플랫폼 캐릭터의 사용법과 가이드라인을 확인하세요.' },
      '3-3': { id: '3-3', name: 'Loadings', href: '/app-guide/resource/loadings/', description: '플랫폼 로딩의 사용법과 가이드라인을 확인하세요.' }
    }
  },
  {
    id: '4',
    name: 'Foundations',
    href: ROUTES.FOUNDATIONS,
    description: '디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 제공합니다.',
    children: {
      '4-1': { id: '4-1', name: 'Design Tokens', href: '/app-guide/foundations/design-tokens/', description: '디자인 토큰의 카테고리와 사용법을 확인하세요.' },
      '4-2': { id: '4-2', name: 'Typography', href: '/app-guide/foundations/typography/', description: '타이포그래피 토큰의 크기와 스타일을 확인하세요.' },
      '4-3': { id: '4-3', name: 'Spacing', href: '/app-guide/foundations/spacing/', description: '간격 토큰의 체계와 사용법을 확인하세요.' },
      '4-4': { id: '4-4', name: 'Colors', href: '/app-guide/foundations/palette/', description: '색상 팔레트와 색상 토큰을 확인하세요.' }
    }
  },
  {
    id: '5',
    name: 'Components',
    href: ROUTES.COMPONENT_GUIDE,
    description: '50+ UI 컴포넌트의 사용법과 예제를 제공합니다.',
  },
  { id: '6', name: 'Playground', href: ROUTES.PLAYGROUND, description: '실시간 테스트 환경.' },
  { id: '7', name: 'Demos', href: ROUTES.LAYOUTS, description: '레이아웃 템플릿.' },
];

export const isNavigationItemActive = (item: NavigationItem, pathname: string): boolean => {
  if (pathname === item.href) return true;
  if (item.children && Object.keys(item.children).length > 0) {
    return Object.values(item.children).some(child => pathname.startsWith(child.href) || pathname === child.href);
  }
  return false;
};

export const getActiveMenuInfo = (pathname: string): { parent: NavigationItem | null; child: NavigationItem | null } => {
  for (const item of navigation) {
    if (pathname === item.href) return { parent: item, child: null };
    if (item.children && Object.keys(item.children).length > 0) {
      const activeChild = Object.values(item.children).find(child => pathname.startsWith(child.href) || pathname === child.href);
      if (activeChild) return { parent: item, child: activeChild };
    }
  }
  return { parent: null, child: null };
};


