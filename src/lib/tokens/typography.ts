export interface TypographyToken {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
  description?: string;
}

export interface TypographyScale {
  [key: string]: TypographyToken;
}

export const typographyTokens: TypographyScale = {
  'display-2xl': {
    name: 'display-2xl',
    fontSize: '4.5rem',
    lineHeight: '1.1',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    description: 'Display 2XL - 가장 큰 제목용',
  },
  'display-xl': {
    name: 'display-xl',
    fontSize: '3.75rem',
    lineHeight: '1.1',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    description: 'Display XL - 큰 제목용',
  },
  'display-lg': {
    name: 'display-lg',
    fontSize: '3rem',
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    description: 'Display LG - 중간 제목용',
  },
  'display-md': {
    name: 'display-md',
    fontSize: '2.25rem',
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    description: 'Display MD - 작은 제목용',
  },
  'display-sm': {
    name: 'display-sm',
    fontSize: '1.875rem',
    lineHeight: '1.3',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    description: 'Display SM - 작은 제목용',
  },
  'heading-xl': {
    name: 'heading-xl',
    fontSize: '1.5rem',
    lineHeight: '1.3',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    description: 'Heading XL - 섹션 제목용',
  },
  'heading-lg': {
    name: 'heading-lg',
    fontSize: '1.25rem',
    lineHeight: '1.4',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    description: 'Heading LG - 서브 섹션 제목용',
  },
  'heading-md': {
    name: 'heading-md',
    fontSize: '1.125rem',
    lineHeight: '1.4',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    description: 'Heading MD - 작은 제목용',
  },
  'heading-sm': {
    name: 'heading-sm',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    description: 'Heading SM - 가장 작은 제목용',
  },
  'body-xl': {
    name: 'body-xl',
    fontSize: '1.125rem',
    lineHeight: '1.6',
    fontWeight: '400',
    description: 'Body XL - 큰 본문용',
  },
  'body-lg': {
    name: 'body-lg',
    fontSize: '1rem',
    lineHeight: '1.6',
    fontWeight: '400',
    description: 'Body LG - 기본 본문용',
  },
  'body-md': {
    name: 'body-md',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    fontWeight: '400',
    description: 'Body MD - 작은 본문용',
  },
  'body-sm': {
    name: 'body-sm',
    fontSize: '0.75rem',
    lineHeight: '1.6',
    fontWeight: '400',
    description: 'Body SM - 가장 작은 본문용',
  },
  'label-lg': {
    name: 'label-lg',
    fontSize: '0.875rem',
    lineHeight: '1.4',
    fontWeight: '500',
    description: 'Label LG - 큰 라벨용',
  },
  'label-md': {
    name: 'label-md',
    fontSize: '0.75rem',
    lineHeight: '1.4',
    fontWeight: '500',
    description: 'Label MD - 기본 라벨용',
  },
  'label-sm': {
    name: 'label-sm',
    fontSize: '0.625rem',
    lineHeight: '1.4',
    fontWeight: '500',
    description: 'Label SM - 작은 라벨용',
  },
};

export const generateTypographyTokens = () => {
  const tokens: Record<string, any> = {};
  
  Object.entries(typographyTokens).forEach(([key, token]) => {
    tokens[key] = {
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      fontWeight: token.fontWeight,
      ...(token.letterSpacing && { letterSpacing: token.letterSpacing }),
    };
  });
  
  return tokens;
};

export const generateTailwindTypographyConfig = () => {
  const config: Record<string, any> = {};
  
  Object.entries(typographyTokens).forEach(([key, token]) => {
    config[key] = [
      token.fontSize,
      {
        lineHeight: token.lineHeight,
        fontWeight: token.fontWeight,
        ...(token.letterSpacing && { letterSpacing: token.letterSpacing }),
      },
    ];
  });
  
  return config;
};
