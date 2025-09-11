export interface DesignToken {
  name: string;
  description: string;
  usage: string[];
  size?: string;
  category: 'color' | 'spacing' | 'typography' | 'border';
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
  },
  '--radius-xs': {
    name: 'Extra Small Radius',
    description: '매우 작은 테두리 반지름',
    usage: ['작은 요소', '세부 컴포넌트'],
    category: 'border',
    size: '0.125rem',
    examples: ['작은 아이콘', '세부 요소']
  },

  // 스페이싱 토큰들
  '--spacing': {
    name: 'Base Spacing',
    description: '기본 간격 단위',
    usage: ['컴포넌트 간격', '패딩', '마진'],
    category: 'spacing',
    size: '0.25rem',
    examples: ['컴포넌트 간격', '기본 패딩']
  },

  // 컨테이너 토큰들
  '--container-xs': {
    name: 'Container Extra Small',
    description: '매우 작은 컨테이너 너비',
    usage: ['작은 모달', '팝오버'],
    category: 'spacing',
    size: '20rem',
    examples: ['작은 모달', '팝오버 컨테이너']
  },
  '--container-sm': {
    name: 'Container Small',
    description: '작은 컨테이너 너비',
    usage: ['작은 모달', '카드'],
    category: 'spacing',
    size: '24rem',
    examples: ['작은 모달', '카드 컨테이너']
  },
  '--container-md': {
    name: 'Container Medium',
    description: '중간 컨테이너 너비',
    usage: ['중간 모달', '폼'],
    category: 'spacing',
    size: '28rem',
    examples: ['중간 모달', '폼 컨테이너']
  },
  '--container-lg': {
    name: 'Container Large',
    description: '큰 컨테이너 너비',
    usage: ['큰 모달', '대시보드'],
    category: 'spacing',
    size: '32rem',
    examples: ['큰 모달', '대시보드 컨테이너']
  },
  '--container-2xl': {
    name: 'Container 2X Large',
    description: '매우 큰 컨테이너 너비',
    usage: ['매우 큰 모달', '풀스크린'],
    category: 'spacing',
    size: '42rem',
    examples: ['매우 큰 모달', '풀스크린 컨테이너']
  },
  '--container-4xl': {
    name: 'Container 4X Large',
    description: '극대형 컨테이너 너비',
    usage: ['극대형 모달', '전체 화면'],
    category: 'spacing',
    size: '56rem',
    examples: ['극대형 모달', '전체 화면 컨테이너']
  },

  // 텍스트 크기 토큰들
  '--text-xs': {
    name: 'Text Extra Small',
    description: '매우 작은 텍스트 크기',
    usage: ['작은 텍스트', '캡션', '라벨'],
    category: 'typography',
    size: '0.75rem',
    examples: ['캡션 텍스트', '작은 라벨']
  },
  '--text-xs--line-height': {
    name: 'Text XS Line Height',
    description: 'XS 텍스트의 줄 높이',
    usage: ['XS 텍스트 줄 간격'],
    category: 'typography',
    size: 'calc(1 / 0.75)',
    examples: ['XS 텍스트 줄 간격']
  },
  '--text-sm': {
    name: 'Text Small',
    description: '작은 텍스트 크기',
    usage: ['작은 텍스트', '보조 정보'],
    category: 'typography',
    size: '0.875rem',
    examples: ['보조 텍스트', '작은 설명']
  },
  '--text-sm--line-height': {
    name: 'Text SM Line Height',
    description: 'SM 텍스트의 줄 높이',
    usage: ['SM 텍스트 줄 간격'],
    category: 'typography',
    size: 'calc(1.25 / 0.875)',
    examples: ['SM 텍스트 줄 간격']
  },
  '--text-base': {
    name: 'Text Base',
    description: '기본 텍스트 크기',
    usage: ['기본 텍스트', '본문'],
    category: 'typography',
    size: '1rem',
    examples: ['본문 텍스트', '기본 텍스트']
  },
  '--text-base--line-height': {
    name: 'Text Base Line Height',
    description: 'Base 텍스트의 줄 높이',
    usage: ['Base 텍스트 줄 간격'],
    category: 'typography',
    size: 'calc(1.5 / 1)',
    examples: ['Base 텍스트 줄 간격']
  },
  '--text-lg': {
    name: 'Text Large',
    description: '큰 텍스트 크기',
    usage: ['큰 텍스트', '부제목'],
    category: 'typography',
    size: '1.125rem',
    examples: ['부제목', '큰 텍스트']
  },
  '--text-lg--line-height': {
    name: 'Text LG Line Height',
    description: 'LG 텍스트의 줄 높이',
    usage: ['LG 텍스트 줄 간격'],
    category: 'typography',
    size: 'calc(1.75 / 1.125)',
    examples: ['LG 텍스트 줄 간격']
  },
  '--text-xl': {
    name: 'Text Extra Large',
    description: '매우 큰 텍스트 크기',
    usage: ['큰 제목', '헤딩'],
    category: 'typography',
    size: '1.25rem',
    examples: ['큰 제목', '헤딩']
  },
  '--text-xl--line-height': {
    name: 'Text XL Line Height',
    description: 'XL 텍스트의 줄 높이',
    usage: ['XL 텍스트 줄 간격'],
    category: 'typography',
    size: 'calc(1.75 / 1.25)',
    examples: ['XL 텍스트 줄 간격']
  },
  '--text-2xl': {
    name: 'Text 2X Large',
    description: '2배 큰 텍스트 크기',
    usage: ['큰 제목', '메인 헤딩'],
    category: 'typography',
    size: '1.5rem',
    examples: ['메인 헤딩', '큰 제목']
  },
  '--text-2xl--line-height': {
    name: 'Text 2XL Line Height',
    description: '2XL 텍스트의 줄 높이',
    usage: ['2XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['2XL 텍스트 줄 간격']
  },
  '--text-3xl': {
    name: 'Text 3X Large',
    description: '3배 큰 텍스트 크기',
    usage: ['매우 큰 제목', '디스플레이 텍스트'],
    category: 'typography',
    size: '1.875rem',
    examples: ['디스플레이 텍스트', '매우 큰 제목']
  },
  '--text-3xl--line-height': {
    name: 'Text 3XL Line Height',
    description: '3XL 텍스트의 줄 높이',
    usage: ['3XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['3XL 텍스트 줄 간격']
  },
  '--text-4xl': {
    name: 'Text 4X Large',
    description: '4배 큰 텍스트 크기',
    usage: ['대형 제목', '히어로 텍스트'],
    category: 'typography',
    size: '2.25rem',
    examples: ['히어로 텍스트', '대형 제목']
  },
  '--text-4xl--line-height': {
    name: 'Text 4XL Line Height',
    description: '4XL 텍스트의 줄 높이',
    usage: ['4XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['4XL 텍스트 줄 간격']
  },
  '--text-5xl': {
    name: 'Text 5X Large',
    description: '5배 큰 텍스트 크기',
    usage: ['매우 큰 제목', '메인 디스플레이'],
    category: 'typography',
    size: '3rem',
    examples: ['메인 디스플레이', '매우 큰 제목']
  },
  '--text-5xl--line-height': {
    name: 'Text 5XL Line Height',
    description: '5XL 텍스트의 줄 높이',
    usage: ['5XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['5XL 텍스트 줄 간격']
  },
  '--text-6xl': {
    name: 'Text 6X Large',
    description: '6배 큰 텍스트 크기',
    usage: ['극대형 제목', '히어로 디스플레이'],
    category: 'typography',
    size: '3.75rem',
    examples: ['히어로 디스플레이', '극대형 제목']
  },
  '--text-6xl--line-height': {
    name: 'Text 6XL Line Height',
    description: '6XL 텍스트의 줄 높이',
    usage: ['6XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['6XL 텍스트 줄 간격']
  },
  '--text-7xl': {
    name: 'Text 7X Large',
    description: '7배 큰 텍스트 크기',
    usage: ['매우 극대형 제목', '스플래시 텍스트'],
    category: 'typography',
    size: '4.5rem',
    examples: ['스플래시 텍스트', '매우 극대형 제목']
  },
  '--text-7xl--line-height': {
    name: 'Text 7XL Line Height',
    description: '7XL 텍스트의 줄 높이',
    usage: ['7XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['7XL 텍스트 줄 간격']
  },
  '--text-8xl': {
    name: 'Text 8X Large',
    description: '8배 큰 텍스트 크기',
    usage: ['극대형 디스플레이', '메가 제목'],
    category: 'typography',
    size: '6rem',
    examples: ['메가 제목', '극대형 디스플레이']
  },
  '--text-8xl--line-height': {
    name: 'Text 8XL Line Height',
    description: '8XL 텍스트의 줄 높이',
    usage: ['8XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['8XL 텍스트 줄 간격']
  },
  '--text-9xl': {
    name: 'Text 9X Large',
    description: '9배 큰 텍스트 크기',
    usage: ['최대형 디스플레이', '울트라 제목'],
    category: 'typography',
    size: '8rem',
    examples: ['울트라 제목', '최대형 디스플레이']
  },
  '--text-9xl--line-height': {
    name: 'Text 9XL Line Height',
    description: '9XL 텍스트의 줄 높이',
    usage: ['9XL 텍스트 줄 간격'],
    category: 'typography',
    size: '1.375',
    examples: ['9XL 텍스트 줄 간격']
  },

  // 폰트 웨이트 토큰들
  '--font-weight-normal': {
    name: 'Font Weight Normal',
    description: '일반 폰트 두께',
    usage: ['기본 텍스트', '본문'],
    category: 'typography',
    size: '400',
    examples: ['본문 텍스트', '기본 텍스트']
  },
  '--font-weight-medium': {
    name: 'Font Weight Medium',
    description: '중간 폰트 두께',
    usage: ['중간 강조 텍스트', '부제목'],
    category: 'typography',
    size: '500',
    examples: ['부제목', '중간 강조 텍스트']
  },
  '--font-weight-semibold': {
    name: 'Font Weight Semibold',
    description: '세미볼드 폰트 두께',
    usage: ['강조 텍스트', '제목'],
    category: 'typography',
    size: '600',
    examples: ['제목', '강조 텍스트']
  },
  '--font-weight-bold': {
    name: 'Font Weight Bold',
    description: '굵은 폰트 두께',
    usage: ['강한 강조 텍스트', '큰 제목'],
    category: 'typography',
    size: '700',
    examples: ['큰 제목', '강한 강조 텍스트']
  },

  // 트래킹 토큰들
  '--tracking-tight': {
    name: 'Letter Spacing Tight',
    description: '좁은 글자 간격',
    usage: ['제목', '큰 텍스트'],
    category: 'typography',
    size: '-0.025em',
    examples: ['제목 텍스트', '큰 텍스트']
  },
  '--tracking-widest': {
    name: 'Letter Spacing Widest',
    description: '넓은 글자 간격',
    usage: ['강조 텍스트', '헤딩'],
    category: 'typography',
    size: '0.1em',
    examples: ['강조 텍스트', '헤딩']
  },

  // 리딩 토큰들
  '--leading-snug': {
    name: 'Line Height Snug',
    description: '좁은 줄 간격',
    usage: ['제목', '헤딩'],
    category: 'typography',
    size: '1.375',
    examples: ['제목 텍스트', '헤딩']
  },
  '--leading-relaxed': {
    name: 'Line Height Relaxed',
    description: '넓은 줄 간격',
    usage: ['본문', '긴 텍스트'],
    category: 'typography',
    size: '1.625',
    examples: ['본문 텍스트', '긴 텍스트']
  }
};

export const tokenCategories = {
  color: {
    name: '색상',
    description: 'UI 색상 팔레트',
    tokens: Object.entries(designTokens).filter(([, token]) => token.category === 'color')
  },
  spacing: {
    name: '간격',
    description: '간격 및 컨테이너 크기 설정',
    tokens: Object.entries(designTokens).filter(([, token]) => token.category === 'spacing')
  },
  typography: {
    name: '타이포그래피',
    description: '텍스트 크기, 폰트 두께, 줄 간격 설정',
    tokens: Object.entries(designTokens).filter(([, token]) => token.category === 'typography')
  },
  border: {
    name: '테두리',
    description: '테두리 반지름 설정',
    tokens: Object.entries(designTokens).filter(([, token]) => token.category === 'border')
  }
};

// 타이포그래피 토큰들을 추출하는 함수들
export const getTypographyTokens = () => {
  return Object.entries(designTokens)
    .filter(([, token]) => token.category === 'typography')
    .reduce((acc, [key, token]) => {
      acc[key] = {
        name: token.name,
        description: token.description,
        fontSize: token.size,
        lineHeight: token.size // line-height 토큰들은 별도로 처리
      };
      return acc;
    }, {} as Record<string, { name: string; description?: string; fontSize?: string; lineHeight?: string }>);
};

// 텍스트 크기 토큰들만 추출 (line-height 제외)
export const getTextSizeTokens = () => {
  return Object.entries(designTokens)
    .filter(([key, token]) => 
      token.category === 'typography' && 
      key.startsWith('--text-') &&
      !key.includes('--line-height') &&
      !key.includes('font-weight') &&
      !key.includes('tracking') &&
      !key.includes('leading')
    )
    .reduce((acc, [key, token]) => {
      const lineHeightKey = `${key}--line-height`;
      const lineHeightToken = designTokens[lineHeightKey];
      
      // CSS 변수명을 클래스명으로 변환 (--text-xs -> text-xs)
      const className = key.replace('--', '');
      
      acc[className] = {
        name: token.name,
        description: token.description,
        fontSize: token.size,
        lineHeight: lineHeightToken?.size || '1'
      };
      return acc;
    }, {} as Record<string, { name: string; description?: string; fontSize?: string; lineHeight?: string }>);
};
