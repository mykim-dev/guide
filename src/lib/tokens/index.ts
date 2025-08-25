export * from './colors';
export * from './typography';
export * from './spacing';

import { defaultColors, generateColorTokens, generateTailwindConfig as generateTailwindColorConfig } from './colors';
import { generateTypographyTokens, generateTailwindTypographyConfig } from './typography';
import { generateSpacingTokens, generateTailwindSpacingConfig } from './spacing';

export interface DesignTokens {
  colors: ReturnType<typeof generateColorTokens>;
  typography: ReturnType<typeof generateTypographyTokens>;
  spacing: ReturnType<typeof generateSpacingTokens>;
}

export interface TailwindConfig {
  colors: ReturnType<typeof generateTailwindColorConfig>;
  fontSize: ReturnType<typeof generateTailwindTypographyConfig>;
  spacing: ReturnType<typeof generateTailwindSpacingConfig>;
}

export const generateDesignTokens = (colors = defaultColors): DesignTokens => {
  return {
    colors: generateColorTokens(colors),
    typography: generateTypographyTokens(),
    spacing: generateSpacingTokens(),
  };
};

export const generateTailwindConfig = (colors = defaultColors): TailwindConfig => {
  return {
    colors: generateTailwindColorConfig(colors),
    fontSize: generateTailwindTypographyConfig(),
    spacing: generateTailwindSpacingConfig(),
  };
};

export const defaultDesignTokens = generateDesignTokens();
export const defaultTailwindConfig = generateTailwindConfig();
