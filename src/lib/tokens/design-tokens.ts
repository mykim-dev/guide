export interface DesignToken {
  name: string;
  description: string;
  usage: string[];
  size?: string;
  category: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'animation';
  examples?: string[];
}

export const designTokens: Record<string, DesignToken> = {
  // 색상 토큰들
  '--background': {
    name: 'Background',
    description: '페이지의 기본 배경색',
    usage: ['body 배경', '레이아웃 컨테이너'],
    category: 'color',
    examples: ['페이지 전체 배경', '메인 컨테이너 배경']
  },
  '--foreground': {
    name: 'Foreground',
    description: '기본 텍스트 색상',
    usage: ['기본 텍스트', '제목', '본문'],
    category: 'color',
    examples: ['페이지 제목', '일반 텍스트', '링크 텍스트']
  },
  '--card': {
    name: 'Card',
    description: '카드 컴포넌트의 배경색',
    usage: ['Card 컴포넌트', '팝오버', '모달'],
    category: 'color',
    examples: ['Card 배경', 'Dialog 배경', 'Popover 배경']
  },
  '--card-foreground': {
    name: 'Card Foreground',
    description: '카드 내부의 텍스트 색상',
    usage: ['Card 내부 텍스트', '팝오버 텍스트'],
    category: 'color',
    examples: ['Card 제목', 'Card 설명 텍스트']
  },
  '--popover': {
    name: 'Popover',
    description: '팝오버 컴포넌트의 배경색',
    usage: ['Popover', 'Tooltip', 'Dropdown'],
    category: 'color',
    examples: ['Dropdown 메뉴', 'Tooltip 배경']
  },
  '--popover-foreground': {
    name: 'Popover Foreground',
    description: '팝오버 내부의 텍스트 색상',
    usage: ['Popover 텍스트', 'Dropdown 텍스트'],
    category: 'color',
    examples: ['Dropdown 메뉴 아이템', 'Tooltip 텍스트']
  },
  '--primary': {
    name: 'Primary',
    description: '주요 브랜드 색상',
    usage: ['주요 버튼', '링크', '강조 요소'],
    category: 'color',
    examples: ['Primary 버튼', '활성 링크', '브랜드 로고']
  },
  '--primary-foreground': {
    name: 'Primary Foreground',
    description: 'Primary 색상 위의 텍스트 색상',
    usage: ['Primary 버튼 텍스트', 'Primary 배경 위 텍스트'],
    category: 'color',
    examples: ['Primary 버튼 텍스트', 'Primary 배지 텍스트']
  },
  '--secondary': {
    name: 'Secondary',
    description: '보조 색상',
    usage: ['보조 버튼', '배경 강조', '구분선'],
    category: 'color',
    examples: ['Secondary 버튼', '배경 강조 영역']
  },
  '--secondary-foreground': {
    name: 'Secondary Foreground',
    description: 'Secondary 색상 위의 텍스트 색상',
    usage: ['Secondary 버튼 텍스트', 'Secondary 배경 위 텍스트'],
    category: 'color',
    examples: ['Secondary 버튼 텍스트']
  },
  '--muted': {
    name: 'Muted',
    description: '비활성/보조 정보를 위한 색상',
    usage: ['비활성 배경', '코드 블록', '구분선'],
    category: 'color',
    examples: ['Avatar fallback', '코드 블록 배경', '비활성 영역']
  },
  '--muted-foreground': {
    name: 'Muted Foreground',
    description: '보조적인 텍스트 색상',
    usage: ['설명 텍스트', '플레이스홀더', '보조 정보'],
    category: 'color',
    examples: ['카드 설명', '입력 필드 플레이스홀더', '보조 아이콘']
  },
  '--accent': {
    name: 'Accent',
    description: '상호작용 요소의 강조 색상',
    usage: ['호버 상태', '선택 상태', '포커스 상태'],
    category: 'color',
    examples: ['버튼 호버', '메뉴 아이템 선택', '토글 활성 상태']
  },
  '--accent-foreground': {
    name: 'Accent Foreground',
    description: 'Accent 색상 위의 텍스트 색상',
    usage: ['Accent 배경 위 텍스트', '선택된 아이템 텍스트'],
    category: 'color',
    examples: ['선택된 메뉴 아이템 텍스트', '호버된 버튼 텍스트']
  },
  '--destructive': {
    name: 'Destructive',
    description: '삭제/위험을 나타내는 색상',
    usage: ['삭제 버튼', '에러 메시지', '경고'],
    category: 'color',
    examples: ['삭제 버튼', '에러 알림', '경고 배지']
  },
  '--destructive-foreground': {
    name: 'Destructive Foreground',
    description: 'Destructive 색상 위의 텍스트 색상',
    usage: ['Destructive 버튼 텍스트', '에러 메시지 텍스트'],
    category: 'color',
    examples: ['삭제 버튼 텍스트', '에러 배지 텍스트']
  },
  '--border': {
    name: 'Border',
    description: '기본 테두리 색상',
    usage: ['컴포넌트 테두리', '구분선', '입력 필드 테두리'],
    category: 'color',
    examples: ['Card 테두리', 'Input 테두리', '구분선']
  },
  '--input': {
    name: 'Input',
    description: '입력 필드의 배경색',
    usage: ['Input 컴포넌트', 'Textarea', 'Select'],
    category: 'color',
    examples: ['Input 배경', 'Textarea 배경', 'Select 배경']
  },
  '--ring': {
    name: 'Ring',
    description: '포커스 링 색상',
    usage: ['포커스 상태', '선택 상태', '활성 상태'],
    category: 'color',
    examples: ['Input 포커스', 'Button 포커스', '링크 포커스']
  },
  '--customer': {
    name: 'Customer',
    description: '고객사 브랜드 색상',
    usage: ['고객사 버튼', '고객사 배지', '브랜드 요소'],
    category: 'color',
    examples: ['Customer 버튼', 'Customer 배지', '브랜드 강조']
  },
  '--customer-foreground': {
    name: 'Customer Foreground',
    description: 'Customer 색상 위의 텍스트 색상',
    usage: ['Customer 버튼 텍스트', 'Customer 배경 위 텍스트'],
    category: 'color',
    examples: ['Customer 버튼 텍스트', 'Customer 배지 텍스트']
  },

  // 사이드바 토큰들
  '--sidebar': {
    name: 'Sidebar',
    description: '사이드바의 배경색',
    usage: ['사이드바 배경', '네비게이션 패널'],
    category: 'color',
    examples: ['사이드바 배경', '네비게이션 메뉴']
  },
  '--sidebar-foreground': {
    name: 'Sidebar Foreground',
    description: '사이드바의 기본 텍스트 색상',
    usage: ['사이드바 텍스트', '네비게이션 링크'],
    category: 'color',
    examples: ['사이드바 메뉴 텍스트', '네비게이션 아이템']
  },
  '--sidebar-primary': {
    name: 'Sidebar Primary',
    description: '사이드바의 주요 색상',
    usage: ['사이드바 활성 링크', '사이드바 강조'],
    category: 'color',
    examples: ['활성 메뉴 아이템', '사이드바 강조 요소']
  },
  '--sidebar-primary-foreground': {
    name: 'Sidebar Primary Foreground',
    description: '사이드바 Primary 색상 위의 텍스트',
    usage: ['사이드바 활성 링크 텍스트'],
    category: 'color',
    examples: ['활성 메뉴 아이템 텍스트']
  },
  '--sidebar-accent': {
    name: 'Sidebar Accent',
    description: '사이드바의 상호작용 색상',
    usage: ['사이드바 호버', '사이드바 포커스'],
    category: 'color',
    examples: ['사이드바 메뉴 호버', '사이드바 포커스 상태']
  },
  '--sidebar-accent-foreground': {
    name: 'Sidebar Accent Foreground',
    description: '사이드바 Accent 색상 위의 텍스트',
    usage: ['사이드바 호버 텍스트'],
    category: 'color',
    examples: ['사이드바 메뉴 호버 텍스트']
  },
  '--sidebar-border': {
    name: 'Sidebar Border',
    description: '사이드바의 테두리 색상',
    usage: ['사이드바 구분선', '사이드바 테두리'],
    category: 'color',
    examples: ['사이드바 구분선', '사이드바 오른쪽 테두리']
  },
  '--sidebar-ring': {
    name: 'Sidebar Ring',
    description: '사이드바의 포커스 링 색상',
    usage: ['사이드바 포커스', '사이드바 선택'],
    category: 'color',
    examples: ['사이드바 포커스 링', '사이드바 선택 상태']
  },

  // 차트 토큰들
  '--chart-1': {
    name: 'Chart 1',
    description: '차트의 첫 번째 색상',
    usage: ['차트 데이터 시리즈', '그래프 색상'],
    category: 'color',
    examples: ['막대 차트 첫 번째 막대', '선 그래프 첫 번째 선']
  },
  '--chart-2': {
    name: 'Chart 2',
    description: '차트의 두 번째 색상',
    usage: ['차트 데이터 시리즈', '그래프 색상'],
    category: 'color',
    examples: ['막대 차트 두 번째 막대', '선 그래프 두 번째 선']
  },
  '--chart-3': {
    name: 'Chart 3',
    description: '차트의 세 번째 색상',
    usage: ['차트 데이터 시리즈', '그래프 색상'],
    category: 'color',
    examples: ['막대 차트 세 번째 막대', '선 그래프 세 번째 선']
  },
  '--chart-4': {
    name: 'Chart 4',
    description: '차트의 네 번째 색상',
    usage: ['차트 데이터 시리즈', '그래프 색상'],
    category: 'color',
    examples: ['막대 차트 네 번째 막대', '선 그래프 네 번째 선']
  },
  '--chart-5': {
    name: 'Chart 5',
    description: '차트의 다섯 번째 색상',
    usage: ['차트 데이터 시리즈', '그래프 색상'],
    category: 'color',
    examples: ['막대 차트 다섯 번째 막대', '선 그래프 다섯 번째 선']
  },

  // 반지름 토큰들
  '--radius': {
    name: 'Border Radius',
    description: '기본 테두리 반지름',
    usage: ['컴포넌트 모서리', '카드 모서리', '버튼 모서리'],
    category: 'border',
    size: '4px',
    examples: ['Card 모서리', 'Button 모서리', 'Input 모서리']
  },
  '--radius-sm': {
    name: 'Small Radius',
    description: '작은 테두리 반지름',
    usage: ['작은 컴포넌트', '배지', '아이콘'],
    category: 'border',
    size: '2px',
    examples: ['Badge 모서리', '작은 아이콘 모서리']
  },
  '--radius-md': {
    name: 'Medium Radius',
    description: '중간 테두리 반지름',
    usage: ['중간 컴포넌트', '카드', '팝오버'],
    category: 'border',
    size: '6px',
    examples: ['Card 모서리', 'Popover 모서리']
  },
  '--radius-lg': {
    name: 'Large Radius',
    description: '큰 테두리 반지름',
    usage: ['큰 컴포넌트', '모달', '드롭다운'],
    category: 'border',
    size: '8px',
    examples: ['Modal 모서리', 'Dropdown 모서리']
  },
  '--radius-xl': {
    name: 'Extra Large Radius',
    description: '매우 큰 테두리 반지름',
    usage: ['매우 큰 컴포넌트', '풀스크린 모달'],
    category: 'border',
    size: '12px',
    examples: ['풀스크린 모달', '대형 카드']
  }
};

export const tokenCategories = {
  color: {
    name: '색상',
    description: 'UI 색상 팔레트',
    tokens: Object.entries(designTokens).filter(([_, token]) => token.category === 'color')
  },
  border: {
    name: '테두리',
    description: '테두리 반지름 설정',
    tokens: Object.entries(designTokens).filter(([_, token]) => token.category === 'border')
  }
};
