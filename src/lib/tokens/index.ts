export * from './colors';
export * from './spacing';
export * from './design-tokens';

import { semanticColors, generateColorTokens, generateTailwindConfig as generateTailwindColorConfig } from './colors';
import { generateSpacingTokens, generateTailwindSpacingConfig } from './spacing';
import { getTypographyTokens } from './design-tokens';

export interface DesignTokens {
  colors: ReturnType<typeof generateColorTokens>;
  typography: ReturnType<typeof getTypographyTokens>;
  spacing: ReturnType<typeof generateSpacingTokens>;
}

export interface TailwindConfig {
  colors: ReturnType<typeof generateTailwindColorConfig>;
  fontSize: ReturnType<typeof getTypographyTokens>;
  spacing: ReturnType<typeof generateTailwindSpacingConfig>;
}

export const generateDesignTokens = (colors = semanticColors): DesignTokens => {
  return {
    colors: generateColorTokens(colors),
    typography: getTypographyTokens(),
    spacing: generateSpacingTokens(),
  };
};

export const generateTailwindConfig = (colors = semanticColors): TailwindConfig => {
  return {
    colors: generateTailwindColorConfig(colors),
    fontSize: getTypographyTokens(),
    spacing: generateTailwindSpacingConfig(),
  };
};

export const defaultDesignTokens = generateDesignTokens();
export const defaultTailwindConfig = generateTailwindConfig();
