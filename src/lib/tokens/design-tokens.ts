// 공통 토큰 정의
const COMMON_TOKENS = {
  '--background': { description: '기본 배경색', usage: ['페이지 배경', '카드 배경'] },
  '--foreground': { description: '기본 전경색 (텍스트)', usage: ['기본 텍스트', '제목'] },
  '--card': { description: '카드 배경색', usage: ['카드', '모달', '드롭다운'] },
  '--card-foreground': { description: '카드 내 텍스트 색상', usage: ['카드 텍스트', '모달 텍스트'] },
  '--popover': { description: '팝오버 배경색', usage: ['팝오버', '툴팁', '드롭다운'] },
  '--popover-foreground': { description: '팝오버 텍스트 색상', usage: ['팝오버 텍스트', '툴팁 텍스트'] },
  '--primary': { description: '주요 색상', usage: ['버튼', '링크', '강조 요소'] },
  '--primary-foreground': { description: '주요 색상 위의 텍스트', usage: ['주요 버튼 텍스트', '주요 링크 텍스트'] },
  '--secondary': { description: '보조 색상', usage: ['보조 버튼', '배경 강조'] },
  '--secondary-foreground': { description: '보조 색상 위의 텍스트', usage: ['보조 버튼 텍스트'] },
  '--muted': { description: '음소거된 색상', usage: ['비활성 요소', '배경'] },
  '--muted-foreground': { description: '음소거된 텍스트 색상', usage: ['보조 텍스트', '설명 텍스트'] },
  '--accent': { description: '강조 색상', usage: ['호버 상태', '강조 배경'] },
  '--accent-foreground': { description: '강조 색상 위의 텍스트', usage: ['강조 요소 텍스트'] },
  '--destructive': { description: '파괴적 액션 색상', usage: ['삭제 버튼', '오류 메시지'] },
  '--border': { description: '기본 테두리 색상', usage: ['테두리', '구분선'] },
  '--input': { description: '입력 필드 테두리 색상', usage: ['입력 필드', '텍스트 영역'] },
  '--ring': { description: '포커스 링 색상', usage: ['포커스 상태', '접근성'] }
} as const;

export interface DesignToken {
  readonly description: string;
  readonly usage: readonly string[];
}

export const designTokens: Record<string, DesignToken> = COMMON_TOKENS;

// 라이트 테마 색상 값
const LIGHT_VALUES = {
  '--background': '#fff',
  '--foreground': '#0a0a0a',
  '--card': '#fff',
  '--card-foreground': '#0a0a0a',
  '--popover': '#fff',
  '--popover-foreground': '#0a0a0a',
  '--primary': '#171717',
  '--primary-foreground': '#fafafa',
  '--secondary': '#f5f5f5',
  '--secondary-foreground': '#171717',
  '--muted': '#f5f5f5',
  '--muted-foreground': '#737373',
  '--accent': '#f5f5f5',
  '--accent-foreground': '#171717',
  '--destructive': '#e40014',
  '--border': '#e5e5e5',
  '--input': '#e5e5e5',
  '--ring': '#a1a1a1',
  '--chart-1': '#f05100',
  '--chart-2': '#009588',
  '--chart-3': '#104e64',
  '--chart-4': '#fcbb00',
  '--chart-5': '#f99c00',
  '--sidebar': '#fafafa',
  '--sidebar-foreground': '#0a0a0a',
  '--sidebar-primary': '#171717',
  '--sidebar-primary-foreground': '#c13e2f',
  '--sidebar-accent': '#f5f5f5',
  '--sidebar-accent-foreground': '#171717',
  '--sidebar-border': '#e5e5e5',
  '--sidebar-ring': '#a1a1a1',
  '--customer': '#ed4b9a',
  '--customer-foreground': '#fafafa'
} as const;

// 다크 테마 색상 값
const DARK_VALUES = {
  '--background': '#0a0a0a',
  '--foreground': '#fafafa',
  '--card': '#171717',
  '--card-foreground': '#fafafa',
  '--popover': '#171717',
  '--popover-foreground': '#fafafa',
  '--primary': '#e5e5e5',
  '--primary-foreground': '#171717',
  '--secondary': '#262626',
  '--secondary-foreground': '#fafafa',
  '--muted': '#262626',
  '--muted-foreground': '#a1a1a1',
  '--accent': '#262626',
  '--accent-foreground': '#fafafa',
  '--destructive': '#ff6568',
  '--border': 'rgba(255, 255, 255, .1)',
  '--input': 'rgba(255, 255, 255, .15)',
  '--ring': '#737373',
  '--chart-1': '#1447e6',
  '--chart-2': '#00bb7f',
  '--chart-3': '#f99c00',
  '--chart-4': '#ac4bff',
  '--chart-5': '#ff2357',
  '--sidebar': '#171717',
  '--sidebar-foreground': '#fafafa',
  '--sidebar-primary': '#1447e6',
  '--sidebar-primary-foreground': '#c13e2f',
  '--sidebar-accent': '#262626',
  '--sidebar-accent-foreground': '#fafafa',
  '--sidebar-border': 'rgba(255, 255, 255, .1)',
  '--sidebar-ring': '#737373'
} as const;

export const designTokensLight = LIGHT_VALUES;
export const designTokensDark = DARK_VALUES;