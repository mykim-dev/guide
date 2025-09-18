export const fontSizeTokens = {
  '--text-xs': {
    name: 'Text Extra Small',
    description: ['작은 텍스트', '캡션', '라벨'],
    category: 'font-size',
    value: '0.75rem',
    class: ['text-xs']
  },
  '--text-sm': {
    name: 'Text Small',
    description: ['작은 텍스트', '보조 정보'],
    category: 'font-size',
    value: '0.875rem',
    class: ['text-sm']
  },
  '--text-base': {
    name: 'Text Base',
    description: ['기본 텍스트', '본문'],
    category: 'font-size',
    value: '1rem',
    class: ['text-base']
  },
  '--text-lg': {
    name: 'Text Large',
    description: ['큰 텍스트', '부제목'],
    category: 'font-size',
    value: '1.125rem',
    class: ['text-lg']
  },
  '--text-xl': {
    name: 'Text Extra Large',
    description: ['큰 제목', '헤딩'],
    category: 'font-size',
    value: '1.25rem',
    class: ['text-xl']
  },
  '--text-2xl': {
    name: 'Text 2X Large',
    description: ['큰 제목', '메인 헤딩'],
    category: 'font-size',
    value: '1.5rem',
    class: ['text-2xl']
  },
  '--text-3xl': {
    name: 'Text 3X Large',
    description: ['매우 큰 제목', '디스플레이 텍스트'],
    category: 'font-size',
    value: '1.875rem',
    class: ['text-3xl']
  },
  '--text-4xl': {
    name: 'Text 4X Large',
    description: ['대형 제목', '히어로 텍스트'],
    category: 'font-size',
    value: '2.25rem',
    class: ['text-4xl']
  },
  '--text-5xl': {
    name: 'Text 5X Large',
    description: ['매우 큰 제목', '메인 디스플레이'],
    category: 'font-size',
    value: '3rem',
    class: ['text-5xl']
  },
  '--text-6xl': {
    name: 'Text 6X Large',
    description: ['극대형 제목', '히어로 디스플레이'],
    category: 'font-size',
    value: '3.75rem',
    class: ['text-6xl']
  },
  '--text-7xl': {
    name: 'Text 7X Large',
    description: ['매우 극대형 제목', '스플래시 텍스트'],
    category: 'font-size',
    value: '4.5rem',
    class: ['text-7xl']
  },
  '--text-8xl': {
    name: 'Text 8X Large',
    description: ['극대형 디스플레이', '메가 제목'],
    category: 'font-size',
    value: '6rem',
    class: ['text-8xl']
  },
  '--text-9xl': {
    name: 'Text 9X Large',
    description: ['최대형 디스플레이', '울트라 제목'],
    category: 'font-size',
    value: '8rem',
    class: ['text-9xl']
  },
}

export const lineHeightTokens = {
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
  }
}

export const fontWeightTokens = {
  // 폰트 웨이트 토큰들
  '--font-weight-normal': {
    name: 'Font Weight Normal',
    description: ['기본 텍스트', '본문'],
    category: 'font-weight',
    value: '400',
    class: ['font-normal']
  },
  '--font-weight-medium': {
    name: 'Font Weight Medium',
    description: ['중간 강조 텍스트', '부제목'],
    category: 'font-weight',
    value: '500',
    class: ['font-medium']
  },
  '--font-weight-semibold': {
    name: 'Font Weight Semibold',
    description: ['강조 텍스트', '제목'],
    category: 'font-weight',
    value: '600',
    class: ['font-semibold']
  },
  '--font-weight-bold': {
    name: 'Font Weight Bold',
    description: ['강한 강조 텍스트', '큰 제목'],
    category: 'font-weight',
    value: '700',
    class: ['font-bold']
  }
}

export const letterSpacingTokens = {
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

export const typographyTokens = {
  '--typography-xs': {
    name: 'Typography Extra Small',
    description: ['작은 텍스트', '캡션', '라벨'],
    category: 'typography',
    value: '0.75rem | 12px',
    lineHeight: 'calc(0.75rem * 1.25) | 15px',
    letterSpacing: '0',
    fontWeight: '400',
    class: ['typography-xs']
  },
  '--typography-sm': {
    name: 'Typography Small',
    description: ['작은 텍스트', '보조 정보'],
    category: 'typography',
    value: '0.875rem | 14px',
    lineHeight: 'calc(0.875rem * 1.25) | 17.5px',
    letterSpacing: '-0.025em',
    fontWeight: '400',
    class: ['typography-sm']
  },
  '--typography-base': {
    name: 'Typography Base',
    description: ['기본 텍스트', '본문'],
    category: 'typography',
    value: '1rem | 16px',
    lineHeight: 'calc(1rem * 1.5) | 24px',
    letterSpacing: '0',
    fontWeight: '400',
    class: ['typography-base']
  },
  '--typography-lg': {
    name: 'Typography Large',
    description: ['큰 텍스트', '부제목'],
    category: 'typography',
    value: '1.125rem | 18px',
    lineHeight: 'calc(1.125rem * 1.25) | 22.5px',
    letterSpacing: '0',
    fontWeight: '500',
    class: ['typography-lg']
  },
  '--typography-xl': {
    name: 'Typography Extra Large',
    description: ['큰 제목', '헤딩'],
    category: 'typography',
    value: '1.25rem | 20px',
    lineHeight: 'calc(1.25rem * 1.25) | 25px',
    letterSpacing: '0',
    fontWeight: '500',
    class: ['typography-xl']
  },
  '--typography-2xl': {
    name: 'Typography 2X Large',
    description: ['큰 제목', '메인 헤딩'],
    category: 'typography',
    value: '1.5rem | 24px',
    lineHeight: 'calc(1.5rem * 1.25) | 30px',
    letterSpacing: '0',
    fontWeight: '500',
    class: ['typography-2xl']
  },
  '--typography-3xl': {
    name: 'Typography 3X Large',
    description: ['매우 큰 제목', '디스플레이 텍스트'],
    category: 'typography',
    value: '1.875rem | 30px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '600',
    class: ['typography-3xl']
  },
  '--typography-4xl': {
    name: 'Typography 4X Large',
    description: ['대형 제목', '히어로 텍스트'],
    category: 'typography',
    value: '2.25rem | 36px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '600',
    class: ['typography-4xl']
  },
  '--typography-5xl': {
    name: 'Typography 5X Large',
    description: ['매우 큰 제목', '메인 디스플레이'],
    category: 'typography',
    value: '3rem | 48px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '600',
    class: ['typography-5xl']
  },
  '--typography-6xl': {
    name: 'Typography 6X Large',
    description: ['극대형 제목', '히어로 디스플레이'],
    category: 'typography',
    value: '3.75rem | 60px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '600',
    class: ['typography-6xl']
  },
  '--typography-7xl': {
    name: 'Typography 7X Large',
    description: ['매우 극대형 제목', '스플래시 텍스트'],
    category: 'typography',
    value: '4.5rem | 72px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '700',
    class: ['typography-7xl']
  },
  '--typography-8xl': {
    name: 'Typography 8X Large',
    description: ['극대형 디스플레이', '메가 제목'],
    category: 'typography',
    value: '6rem | 96px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '700',
    class: ['typography-8xl']
  },
  '--typography-9xl': {
    name: 'Typography 9X Large',
    description: ['최대형 디스플레이', '울트라 제목'],
    category: 'typography',
    value: '8rem | 128px',
    lineHeight: '1.375 | 22px',
    letterSpacing: '-0.025em',
    fontWeight: '700',
    class: ['typography-9xl']
  },
  // 개별 토큰들 추가
  ...fontSizeTokens,
  ...lineHeightTokens,
  ...fontWeightTokens,
  ...letterSpacingTokens
}