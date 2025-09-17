import { designTokens } from "./design-tokens";

export interface TypographyToken {
  name: string;
  description: string[];
  category: 'font-size' | 'font-weight' | 'letter-spacing' | 'line-height';
  value: string;
  class: string[];
}

export interface TypographyScale {
  [key: string]: TypographyToken;
}

export const typographyTokens: TypographyScale = {
  '--text-xs': {
    name: 'Text Extra Small',
    description: ['작은 텍스트', '캡션', '라벨'],
    category: 'font-size',
    value: '0.75rem',
    class: ['text-xs', 'text-xs--line-height']
  },
  '--text-sm': {
    name: 'Text Small',
    description: ['작은 텍스트', '보조 정보'],
    category: 'font-size',
    value: '0.875rem',
    class: ['text-sm', 'text-sm--line-height']
  },
  '--text-base': {
    name: 'Text Base',
    description: ['기본 텍스트', '본문'],
    category: 'font-size',
    value: '1rem',
    class: ['text-base', 'text-base--line-height']
  },
  '--text-lg': {
    name: 'Text Large',
    description: ['큰 텍스트', '부제목'],
    category: 'font-size',
    value: '1.125rem',
    class: ['text-lg', 'text-lg--line-height']
  },
  '--text-xl': {
    name: 'Text Extra Large',
    description: ['큰 제목', '헤딩'],
    category: 'font-size',
    value: '1.25rem',
    class: ['text-xl', 'text-xl--line-height']
  },
  '--text-2xl': {
    name: 'Text 2X Large',
    description: ['큰 제목', '메인 헤딩'],
    category: 'font-size',
    value: '1.5rem',
    class: ['text-2xl', 'text-2xl--line-height']
  },
  '--text-3xl': {
    name: 'Text 3X Large',
    description: ['매우 큰 제목', '디스플레이 텍스트'],
    category: 'font-size',
    value: '1.875rem',
    class: ['text-3xl', 'text-3xl--line-height']
  },
  '--text-4xl': {
    name: 'Text 4X Large',
    description: ['대형 제목', '히어로 텍스트'],
    category: 'font-size',
    value: '2.25rem',
    class: ['text-4xl', 'text-4xl--line-height']
  },
  '--text-5xl': {
    name: 'Text 5X Large',
    description: ['매우 큰 제목', '메인 디스플레이'],
    category: 'font-size',
    value: '3rem',
    class: ['text-5xl', 'text-5xl--line-height']
  },
  '--text-6xl': {
    name: 'Text 6X Large',
    description: ['극대형 제목', '히어로 디스플레이'],
    category: 'font-size',
    value: '3.75rem',
    class: ['text-6xl', 'text-6xl--line-height']
  },
  '--text-7xl': {
    name: 'Text 7X Large',
    description: ['매우 극대형 제목', '스플래시 텍스트'],
    category: 'font-size',
    value: '4.5rem',
    class: ['text-7xl', 'text-7xl--line-height']
  },
  '--text-8xl': {
    name: 'Text 8X Large',
    description: ['극대형 디스플레이', '메가 제목'],
    category: 'font-size',
    value: '6rem',
    class: ['text-8xl', 'text-8xl--line-height']
  },
  '--text-9xl': {
    name: 'Text 9X Large',
    description: ['최대형 디스플레이', '울트라 제목'],
    category: 'font-size',
    value: '8rem',
    class: ['text-9xl', 'text-9xl--line-height']
  },

  // 리딩 토큰들
  '--leading-tight': {
    name: 'Line Height Tight',
    description: ['줄간격'],
    category: 'line-height',
    value: '1.25',
    class: ['leading-tight']
  },
  '--leading-snug': {
    name: 'Line Height Snug',
    description: ['줄간격'],
    category: 'line-height',
    value: '1.375',
    class: ['leading-snug']
  },
  '--leading-relaxed': {
    name: 'Line Height Relaxed',
    description: ['줄간격'],
    category: 'line-height',
    value: '1.625',
    class: ['leading-relaxed']
  },

  // 폰트 웨이트 토큰들
  '--font-weight-normal': {
    name: 'Font Weight Normal',
    description: ['기본 텍스트', '본문'],
    category: 'font-weight',
    value: '400',
    class: ['font-weight-normal']
  },
  '--font-weight-medium': {
    name: 'Font Weight Medium',
    description: ['중간 강조 텍스트', '부제목'],
    category: 'font-weight',
    value: '500',
    class: ['font-weight-medium']
  },
  '--font-weight-semibold': {
    name: 'Font Weight Semibold',
    description: ['강조 텍스트', '제목'],
    category: 'font-weight',
    value: '600',
    class: ['font-weight-semibold']
  },
  '--font-weight-bold': {
    name: 'Font Weight Bold',
    description: ['강한 강조 텍스트', '큰 제목'],
    category: 'font-weight',
    value: '700',
    class: ['font-weight-bold']
  },

  // 트래킹 토큰들
  '--tracking-tight': {
    name: 'Letter Spacing Tight',
    description: ['좁은 자간'],
    category: 'letter-spacing',
    value: '-0.025em',
    class: ['tracking-tight']
  },
  '--tracking-widest': {
    name: 'Letter Spacing Widest',
    description: ['넓은 자간'],
    category: 'letter-spacing',
    value: '0.1em',
    class: ['tracking-widest']
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

// // 타이포그래피 토큰들을 추출하는 함수들
// export const getTypographyTokens = () => {
//   return Object.entries(designTokens)
//     .filter(([, token]) => token.category === 'typography')
//     .reduce((acc, [key, token]) => {
//       acc[key] = {
//         name: token.name,
//         description: token.description,
//         fontSize: token.size,
//         lineHeight: token.size // line-height 토큰들은 별도로 처리
//       };
//       return acc;
//     }, {} as Record<string, { name: string; description?: string; fontSize?: string; lineHeight?: string }>);
// };

// // 텍스트 크기 토큰들만 추출 (line-height 제외)
// export const getTextSizeTokens = () => {
//   return Object.entries(designTokens)
//     .filter(([key, token]) => 
//       token.category === 'typography' && 
//       key.startsWith('--text-') &&
//       !key.includes('--line-height') &&
//       !key.includes('font-weight') &&
//       !key.includes('tracking') &&
//       !key.includes('leading')
//     )
//     .reduce((acc, [key, token]) => {
//       const lineHeightKey = `${key}--line-height`;
//       const lineHeightToken = designTokens[lineHeightKey];
      
//       // CSS 변수명을 클래스명으로 변환 (--text-xs -> text-xs)
//       const className = key.replace('--', '');
      
//       acc[className] = {
//         name: token.name,
//         description: token.description,
//         fontSize: token.size,
//         lineHeight: lineHeightToken?.size || '1'
//       };
//       return acc;
//     }, {} as Record<string, { name: string; description?: string; fontSize?: string; lineHeight?: string }>);
// };