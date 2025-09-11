export * from './colors';
export * from './spacing';
export * from './design-tokens';

import { generateSpacingTokens, generateTailwindSpacingConfig } from './spacing';
import { getTypographyTokens } from './design-tokens';

export interface DesignTokens {
  typography: ReturnType<typeof getTypographyTokens>;
  spacing: ReturnType<typeof generateSpacingTokens>;
}

export interface TailwindConfig {
  fontSize: ReturnType<typeof getTypographyTokens>;
  spacing: ReturnType<typeof generateTailwindSpacingConfig>;
}

export const generateDesignTokens = (): DesignTokens => {
  return {
    typography: getTypographyTokens(),
    spacing: generateSpacingTokens(),
  };
};

export const generateTailwindConfig = (): TailwindConfig => {
  return {
    fontSize: getTypographyTokens(),
    spacing: generateTailwindSpacingConfig(),
  };
};

export const defaultDesignTokens = generateDesignTokens();
export const defaultTailwindConfig = generateTailwindConfig();
