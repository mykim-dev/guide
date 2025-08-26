import { lighten, darken } from 'color2k';

export interface ColorToken {
  name: string;
  value: string;
  description?: string;
}

export interface ColorScale {
  [key: string]: ColorToken;
}

export interface ColorPalette {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
}

export const defaultColors: ColorPalette = {
  primary: {
    50: { name: 'primary-50', value: '#eff6ff', description: 'Primary color 50' },
    100: { name: 'primary-100', value: '#dbeafe', description: 'Primary color 100' },
    200: { name: 'primary-200', value: '#bfdbfe', description: 'Primary color 200' },
    300: { name: 'primary-300', value: '#93c5fd', description: 'Primary color 300' },
    400: { name: 'primary-400', value: '#60a5fa', description: 'Primary color 400' },
    500: { name: 'primary-500', value: '#3b82f6', description: 'Primary color 500' },
    600: { name: 'primary-600', value: '#2563eb', description: 'Primary color 600' },
    700: { name: 'primary-700', value: '#1d4ed8', description: 'Primary color 700' },
    800: { name: 'primary-800', value: '#1e40af', description: 'Primary color 800' },
    900: { name: 'primary-900', value: '#1e3a8a', description: 'Primary color 900' },
    950: { name: 'primary-950', value: '#172554', description: 'Primary color 950' },
  },
  secondary: {
    50: { name: 'secondary-50', value: '#f8fafc', description: 'Secondary color 50' },
    100: { name: 'secondary-100', value: '#f1f5f9', description: 'Secondary color 100' },
    200: { name: 'secondary-200', value: '#e2e8f0', description: 'Secondary color 200' },
    300: { name: 'secondary-300', value: '#cbd5e1', description: 'Secondary color 300' },
    400: { name: 'secondary-400', value: '#94a3b8', description: 'Secondary color 400' },
    500: { name: 'secondary-500', value: '#64748b', description: 'Secondary color 500' },
    600: { name: 'secondary-600', value: '#475569', description: 'Secondary color 600' },
    700: { name: 'secondary-700', value: '#334155', description: 'Secondary color 700' },
    800: { name: 'secondary-800', value: '#1e293b', description: 'Secondary color 800' },
    900: { name: 'secondary-900', value: '#0f172a', description: 'Secondary color 900' },
    950: { name: 'secondary-950', value: '#020617', description: 'Secondary color 950' },
  },
  success: {
    50: { name: 'success-50', value: '#f0fdf4', description: 'Success color 50' },
    100: { name: 'success-100', value: '#dcfce7', description: 'Success color 100' },
    200: { name: 'success-200', value: '#bbf7d0', description: 'Success color 200' },
    300: { name: 'success-300', value: '#86efac', description: 'Success color 300' },
    400: { name: 'success-400', value: '#4ade80', description: 'Success color 400' },
    500: { name: 'success-500', value: '#22c55e', description: 'Success color 500' },
    600: { name: 'success-600', value: '#16a34a', description: 'Success color 600' },
    700: { name: 'success-700', value: '#15803d', description: 'Success color 700' },
    800: { name: 'success-800', value: '#166534', description: 'Success color 800' },
    900: { name: 'success-900', value: '#14532d', description: 'Success color 900' },
    950: { name: 'success-950', value: '#052e16', description: 'Success color 950' },
  },
  warning: {
    50: { name: 'warning-50', value: '#fffbeb', description: 'Warning color 50' },
    100: { name: 'warning-100', value: '#fef3c7', description: 'Warning color 100' },
    200: { name: 'warning-200', value: '#fde68a', description: 'Warning color 200' },
    300: { name: 'warning-300', value: '#fcd34d', description: 'Warning color 300' },
    400: { name: 'warning-400', value: '#fbbf24', description: 'Warning color 400' },
    500: { name: 'warning-500', value: '#f59e0b', description: 'Warning color 500' },
    600: { name: 'warning-600', value: '#d97706', description: 'Warning color 600' },
    700: { name: 'warning-700', value: '#b45309', description: 'Warning color 700' },
    800: { name: 'warning-800', value: '#92400e', description: 'Warning color 800' },
    900: { name: 'warning-900', value: '#78350f', description: 'Warning color 900' },
    950: { name: 'warning-950', value: '#451a03', description: 'Warning color 950' },
  },
  error: {
    50: { name: 'error-50', value: '#fef2f2', description: 'Error color 50' },
    100: { name: 'error-100', value: '#fee2e2', description: 'Error color 100' },
    200: { name: 'error-200', value: '#fecaca', description: 'Error color 200' },
    300: { name: 'error-300', value: '#fca5a5', description: 'Error color 300' },
    400: { name: 'error-400', value: '#f87171', description: 'Error color 400' },
    500: { name: 'error-500', value: '#ef4444', description: 'Error color 500' },
    600: { name: 'error-600', value: '#dc2626', description: 'Error color 600' },
    700: { name: 'error-700', value: '#b91c1c', description: 'Error color 700' },
    800: { name: 'error-800', value: '#991b1b', description: 'Error color 800' },
    900: { name: 'error-900', value: '#7f1d1d', description: 'Error color 900' },
    950: { name: 'error-950', value: '#450a0a', description: 'Error color 950' },
  },
};

export const generateColorTokens = (colors: ColorPalette) => {
  const tokens: Record<string, string> = {};
  
  Object.entries(colors).forEach(([category, scale]) => {
    Object.entries(scale).forEach(([shade, token]) => {
      const colorToken = token as ColorToken;
      tokens[colorToken.name] = colorToken.value;
    });
  });
  
  return tokens;
};

export const generateTailwindConfig = (colors: ColorPalette) => {
  const tailwindColors: Record<string, Record<string, string>> = {};
  
  Object.entries(colors).forEach(([category, scale]) => {
    tailwindColors[category] = {};
    Object.entries(scale).forEach(([shade, token]) => {
      const colorToken = token as ColorToken;
      tailwindColors[category][shade] = colorToken.value;
    });
  });
  
  return tailwindColors;
};

// Tailwind CSS 공식 색상 팔레트
export const tailwindColors = {
  slate: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
    500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
  },
  gray: {
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
    500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712'
  },
  zinc: {
    50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
    500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b'
  },
  neutral: {
    50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3',
    500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a'
  },
  stone: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e',
    500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09'
  },
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
    500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  },
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
    500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407'
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
    500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03'
  },
  yellow: {
    50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
    500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006'
  },
  lime: {
    50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
    500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05'
  },
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
    500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16'
  },
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
    500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
  },
  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
    500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
    500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
  },
  sky: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
    500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
    500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
  },
  indigo: {
    50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
    500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
  },
  violet: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
    500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
    500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  },
  fuchsia: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
    500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e'
  },
  pink: {
    50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
    500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724'
  },
  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
    500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519'
  }
};

// Predefined theme color palettes using Tailwind CSS official colors
export const themeColors: Record<string, ColorPalette> = {
  default: defaultColors,
  slate: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.slate[50], description: 'Slate primary 50' },
      100: { name: 'primary-100', value: tailwindColors.slate[100], description: 'Slate primary 100' },
      200: { name: 'primary-200', value: tailwindColors.slate[200], description: 'Slate primary 200' },
      300: { name: 'primary-300', value: tailwindColors.slate[300], description: 'Slate primary 300' },
      400: { name: 'primary-400', value: tailwindColors.slate[400], description: 'Slate primary 400' },
      500: { name: 'primary-500', value: tailwindColors.slate[500], description: 'Slate primary 500' },
      600: { name: 'primary-600', value: tailwindColors.slate[600], description: 'Slate primary 600' },
      700: { name: 'primary-700', value: tailwindColors.slate[700], description: 'Slate primary 700' },
      800: { name: 'primary-800', value: tailwindColors.slate[800], description: 'Slate primary 800' },
      900: { name: 'primary-900', value: tailwindColors.slate[900], description: 'Slate primary 900' },
      950: { name: 'primary-950', value: tailwindColors.slate[950], description: 'Slate primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  gray: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.gray[50], description: 'Gray primary 50' },
      100: { name: 'primary-100', value: tailwindColors.gray[100], description: 'Gray primary 100' },
      200: { name: 'primary-200', value: tailwindColors.gray[200], description: 'Gray primary 200' },
      300: { name: 'primary-300', value: tailwindColors.gray[300], description: 'Gray primary 300' },
      400: { name: 'primary-400', value: tailwindColors.gray[400], description: 'Gray primary 400' },
      500: { name: 'primary-500', value: tailwindColors.gray[500], description: 'Gray primary 500' },
      600: { name: 'primary-600', value: tailwindColors.gray[600], description: 'Gray primary 600' },
      700: { name: 'primary-700', value: tailwindColors.gray[700], description: 'Gray primary 700' },
      800: { name: 'primary-800', value: tailwindColors.gray[800], description: 'Gray primary 800' },
      900: { name: 'primary-900', value: tailwindColors.gray[900], description: 'Gray primary 900' },
      950: { name: 'primary-950', value: tailwindColors.gray[950], description: 'Gray primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  zinc: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.zinc[50], description: 'Zinc primary 50' },
      100: { name: 'primary-100', value: tailwindColors.zinc[100], description: 'Zinc primary 100' },
      200: { name: 'primary-200', value: tailwindColors.zinc[200], description: 'Zinc primary 200' },
      300: { name: 'primary-300', value: tailwindColors.zinc[300], description: 'Zinc primary 300' },
      400: { name: 'primary-400', value: tailwindColors.zinc[400], description: 'Zinc primary 400' },
      500: { name: 'primary-500', value: tailwindColors.zinc[500], description: 'Zinc primary 500' },
      600: { name: 'primary-600', value: tailwindColors.zinc[600], description: 'Zinc primary 600' },
      700: { name: 'primary-700', value: tailwindColors.zinc[700], description: 'Zinc primary 700' },
      800: { name: 'primary-800', value: tailwindColors.zinc[800], description: 'Zinc primary 800' },
      900: { name: 'primary-900', value: tailwindColors.zinc[900], description: 'Zinc primary 900' },
      950: { name: 'primary-950', value: tailwindColors.zinc[950], description: 'Zinc primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  neutral: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.neutral[50], description: 'Neutral primary 50' },
      100: { name: 'primary-100', value: tailwindColors.neutral[100], description: 'Neutral primary 100' },
      200: { name: 'primary-200', value: tailwindColors.neutral[200], description: 'Neutral primary 200' },
      300: { name: 'primary-300', value: tailwindColors.neutral[300], description: 'Neutral primary 300' },
      400: { name: 'primary-400', value: tailwindColors.neutral[400], description: 'Neutral primary 400' },
      500: { name: 'primary-500', value: tailwindColors.neutral[500], description: 'Neutral primary 500' },
      600: { name: 'primary-600', value: tailwindColors.neutral[600], description: 'Neutral primary 600' },
      700: { name: 'primary-700', value: tailwindColors.neutral[700], description: 'Neutral primary 700' },
      800: { name: 'primary-800', value: tailwindColors.neutral[800], description: 'Neutral primary 800' },
      900: { name: 'primary-900', value: tailwindColors.neutral[900], description: 'Neutral primary 900' },
      950: { name: 'primary-950', value: tailwindColors.neutral[950], description: 'Neutral primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  stone: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.stone[50], description: 'Stone primary 50' },
      100: { name: 'primary-100', value: tailwindColors.stone[100], description: 'Stone primary 100' },
      200: { name: 'primary-200', value: tailwindColors.stone[200], description: 'Stone primary 200' },
      300: { name: 'primary-300', value: tailwindColors.stone[300], description: 'Stone primary 300' },
      400: { name: 'primary-400', value: tailwindColors.stone[400], description: 'Stone primary 400' },
      500: { name: 'primary-500', value: tailwindColors.stone[500], description: 'Stone primary 500' },
      600: { name: 'primary-600', value: tailwindColors.stone[600], description: 'Stone primary 600' },
      700: { name: 'primary-700', value: tailwindColors.stone[700], description: 'Stone primary 700' },
      800: { name: 'primary-800', value: tailwindColors.stone[800], description: 'Stone primary 800' },
      900: { name: 'primary-900', value: tailwindColors.stone[900], description: 'Stone primary 900' },
      950: { name: 'primary-950', value: tailwindColors.stone[950], description: 'Stone primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  red: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.red[50], description: 'Red primary 50' },
      100: { name: 'primary-100', value: tailwindColors.red[100], description: 'Red primary 100' },
      200: { name: 'primary-200', value: tailwindColors.red[200], description: 'Red primary 200' },
      300: { name: 'primary-300', value: tailwindColors.red[300], description: 'Red primary 300' },
      400: { name: 'primary-400', value: tailwindColors.red[400], description: 'Red primary 400' },
      500: { name: 'primary-500', value: tailwindColors.red[500], description: 'Red primary 500' },
      600: { name: 'primary-600', value: tailwindColors.red[600], description: 'Red primary 600' },
      700: { name: 'primary-700', value: tailwindColors.red[700], description: 'Red primary 700' },
      800: { name: 'primary-800', value: tailwindColors.red[800], description: 'Red primary 800' },
      900: { name: 'primary-900', value: tailwindColors.red[900], description: 'Red primary 900' },
      950: { name: 'primary-950', value: tailwindColors.red[950], description: 'Red primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  orange: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.orange[50], description: 'Orange primary 50' },
      100: { name: 'primary-100', value: tailwindColors.orange[100], description: 'Orange primary 100' },
      200: { name: 'primary-200', value: tailwindColors.orange[200], description: 'Orange primary 200' },
      300: { name: 'primary-300', value: tailwindColors.orange[300], description: 'Orange primary 300' },
      400: { name: 'primary-400', value: tailwindColors.orange[400], description: 'Orange primary 400' },
      500: { name: 'primary-500', value: tailwindColors.orange[500], description: 'Orange primary 500' },
      600: { name: 'primary-600', value: tailwindColors.orange[600], description: 'Orange primary 600' },
      700: { name: 'primary-700', value: tailwindColors.orange[700], description: 'Orange primary 700' },
      800: { name: 'primary-800', value: tailwindColors.orange[800], description: 'Orange primary 800' },
      900: { name: 'primary-900', value: tailwindColors.orange[900], description: 'Orange primary 900' },
      950: { name: 'primary-950', value: tailwindColors.orange[950], description: 'Orange primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  amber: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.amber[50], description: 'Amber primary 50' },
      100: { name: 'primary-100', value: tailwindColors.amber[100], description: 'Amber primary 100' },
      200: { name: 'primary-200', value: tailwindColors.amber[200], description: 'Amber primary 200' },
      300: { name: 'primary-300', value: tailwindColors.amber[300], description: 'Amber primary 300' },
      400: { name: 'primary-400', value: tailwindColors.amber[400], description: 'Amber primary 400' },
      500: { name: 'primary-500', value: tailwindColors.amber[500], description: 'Amber primary 500' },
      600: { name: 'primary-600', value: tailwindColors.amber[600], description: 'Amber primary 600' },
      700: { name: 'primary-700', value: tailwindColors.amber[700], description: 'Amber primary 700' },
      800: { name: 'primary-800', value: tailwindColors.amber[800], description: 'Amber primary 800' },
      900: { name: 'primary-900', value: tailwindColors.amber[900], description: 'Amber primary 900' },
      950: { name: 'primary-950', value: tailwindColors.amber[950], description: 'Amber primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  yellow: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.yellow[50], description: 'Yellow primary 50' },
      100: { name: 'primary-100', value: tailwindColors.yellow[100], description: 'Yellow primary 100' },
      200: { name: 'primary-200', value: tailwindColors.yellow[200], description: 'Yellow primary 200' },
      300: { name: 'primary-300', value: tailwindColors.yellow[300], description: 'Yellow primary 300' },
      400: { name: 'primary-400', value: tailwindColors.yellow[400], description: 'Yellow primary 400' },
      500: { name: 'primary-500', value: tailwindColors.yellow[500], description: 'Yellow primary 500' },
      600: { name: 'primary-600', value: tailwindColors.yellow[600], description: 'Yellow primary 600' },
      700: { name: 'primary-700', value: tailwindColors.yellow[700], description: 'Yellow primary 700' },
      800: { name: 'primary-800', value: tailwindColors.yellow[800], description: 'Yellow primary 800' },
      900: { name: 'primary-900', value: tailwindColors.yellow[900], description: 'Yellow primary 900' },
      950: { name: 'primary-950', value: tailwindColors.yellow[950], description: 'Yellow primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  lime: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.lime[50], description: 'Lime primary 50' },
      100: { name: 'primary-100', value: tailwindColors.lime[100], description: 'Lime primary 100' },
      200: { name: 'primary-200', value: tailwindColors.lime[200], description: 'Lime primary 200' },
      300: { name: 'primary-300', value: tailwindColors.lime[300], description: 'Lime primary 300' },
      400: { name: 'primary-400', value: tailwindColors.lime[400], description: 'Lime primary 400' },
      500: { name: 'primary-500', value: tailwindColors.lime[500], description: 'Lime primary 500' },
      600: { name: 'primary-600', value: tailwindColors.lime[600], description: 'Lime primary 600' },
      700: { name: 'primary-700', value: tailwindColors.lime[700], description: 'Lime primary 700' },
      800: { name: 'primary-800', value: tailwindColors.lime[800], description: 'Lime primary 800' },
      900: { name: 'primary-900', value: tailwindColors.lime[900], description: 'Lime primary 900' },
      950: { name: 'primary-950', value: tailwindColors.lime[950], description: 'Lime primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  green: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.green[50], description: 'Green primary 50' },
      100: { name: 'primary-100', value: tailwindColors.green[100], description: 'Green primary 100' },
      200: { name: 'primary-200', value: tailwindColors.green[200], description: 'Green primary 200' },
      300: { name: 'primary-300', value: tailwindColors.green[300], description: 'Green primary 300' },
      400: { name: 'primary-400', value: tailwindColors.green[400], description: 'Green primary 400' },
      500: { name: 'primary-500', value: tailwindColors.green[500], description: 'Green primary 500' },
      600: { name: 'primary-600', value: tailwindColors.green[600], description: 'Green primary 600' },
      700: { name: 'primary-700', value: tailwindColors.green[700], description: 'Green primary 700' },
      800: { name: 'primary-800', value: tailwindColors.green[800], description: 'Green primary 800' },
      900: { name: 'primary-900', value: tailwindColors.green[900], description: 'Green primary 900' },
      950: { name: 'primary-950', value: tailwindColors.green[950], description: 'Green primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  emerald: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.emerald[50], description: 'Emerald primary 50' },
      100: { name: 'primary-100', value: tailwindColors.emerald[100], description: 'Emerald primary 100' },
      200: { name: 'primary-200', value: tailwindColors.emerald[200], description: 'Emerald primary 200' },
      300: { name: 'primary-300', value: tailwindColors.emerald[300], description: 'Emerald primary 300' },
      400: { name: 'primary-400', value: tailwindColors.emerald[400], description: 'Emerald primary 400' },
      500: { name: 'primary-500', value: tailwindColors.emerald[500], description: 'Emerald primary 500' },
      600: { name: 'primary-600', value: tailwindColors.emerald[600], description: 'Emerald primary 600' },
      700: { name: 'primary-700', value: tailwindColors.emerald[700], description: 'Emerald primary 700' },
      800: { name: 'primary-800', value: tailwindColors.emerald[800], description: 'Emerald primary 800' },
      900: { name: 'primary-900', value: tailwindColors.emerald[900], description: 'Emerald primary 900' },
      950: { name: 'primary-950', value: tailwindColors.emerald[950], description: 'Emerald primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  teal: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.teal[50], description: 'Teal primary 50' },
      100: { name: 'primary-100', value: tailwindColors.teal[100], description: 'Teal primary 100' },
      200: { name: 'primary-200', value: tailwindColors.teal[200], description: 'Teal primary 200' },
      300: { name: 'primary-300', value: tailwindColors.teal[300], description: 'Teal primary 300' },
      400: { name: 'primary-400', value: tailwindColors.teal[400], description: 'Teal primary 400' },
      500: { name: 'primary-500', value: tailwindColors.teal[500], description: 'Teal primary 500' },
      600: { name: 'primary-600', value: tailwindColors.teal[600], description: 'Teal primary 600' },
      700: { name: 'primary-700', value: tailwindColors.teal[700], description: 'Teal primary 700' },
      800: { name: 'primary-800', value: tailwindColors.teal[800], description: 'Teal primary 800' },
      900: { name: 'primary-900', value: tailwindColors.teal[900], description: 'Teal primary 900' },
      950: { name: 'primary-950', value: tailwindColors.teal[950], description: 'Teal primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  cyan: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.cyan[50], description: 'Cyan primary 50' },
      100: { name: 'primary-100', value: tailwindColors.cyan[100], description: 'Cyan primary 100' },
      200: { name: 'primary-200', value: tailwindColors.cyan[200], description: 'Cyan primary 200' },
      300: { name: 'primary-300', value: tailwindColors.cyan[300], description: 'Cyan primary 300' },
      400: { name: 'primary-400', value: tailwindColors.cyan[400], description: 'Cyan primary 400' },
      500: { name: 'primary-500', value: tailwindColors.cyan[500], description: 'Cyan primary 500' },
      600: { name: 'primary-600', value: tailwindColors.cyan[600], description: 'Cyan primary 600' },
      700: { name: 'primary-700', value: tailwindColors.cyan[700], description: 'Cyan primary 700' },
      800: { name: 'primary-800', value: tailwindColors.cyan[800], description: 'Cyan primary 800' },
      900: { name: 'primary-900', value: tailwindColors.cyan[900], description: 'Cyan primary 900' },
      950: { name: 'primary-950', value: tailwindColors.cyan[950], description: 'Cyan primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  sky: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.sky[50], description: 'Sky primary 50' },
      100: { name: 'primary-100', value: tailwindColors.sky[100], description: 'Sky primary 100' },
      200: { name: 'primary-200', value: tailwindColors.sky[200], description: 'Sky primary 200' },
      300: { name: 'primary-300', value: tailwindColors.sky[300], description: 'Sky primary 300' },
      400: { name: 'primary-400', value: tailwindColors.sky[400], description: 'Sky primary 400' },
      500: { name: 'primary-500', value: tailwindColors.sky[500], description: 'Sky primary 500' },
      600: { name: 'primary-600', value: tailwindColors.sky[600], description: 'Sky primary 600' },
      700: { name: 'primary-700', value: tailwindColors.sky[700], description: 'Sky primary 700' },
      800: { name: 'primary-800', value: tailwindColors.sky[800], description: 'Sky primary 800' },
      900: { name: 'primary-900', value: tailwindColors.sky[900], description: 'Sky primary 900' },
      950: { name: 'primary-950', value: tailwindColors.sky[950], description: 'Sky primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  blue: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.blue[50], description: 'Blue primary 50' },
      100: { name: 'primary-100', value: tailwindColors.blue[100], description: 'Blue primary 100' },
      200: { name: 'primary-200', value: tailwindColors.blue[200], description: 'Blue primary 200' },
      300: { name: 'primary-300', value: tailwindColors.blue[300], description: 'Blue primary 300' },
      400: { name: 'primary-400', value: tailwindColors.blue[400], description: 'Blue primary 400' },
      500: { name: 'primary-500', value: tailwindColors.blue[500], description: 'Blue primary 500' },
      600: { name: 'primary-600', value: tailwindColors.blue[600], description: 'Blue primary 600' },
      700: { name: 'primary-700', value: tailwindColors.blue[700], description: 'Blue primary 700' },
      800: { name: 'primary-800', value: tailwindColors.blue[800], description: 'Blue primary 800' },
      900: { name: 'primary-900', value: tailwindColors.blue[900], description: 'Blue primary 900' },
      950: { name: 'primary-950', value: tailwindColors.blue[950], description: 'Blue primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  indigo: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.indigo[50], description: 'Indigo primary 50' },
      100: { name: 'primary-100', value: tailwindColors.indigo[100], description: 'Indigo primary 100' },
      200: { name: 'primary-200', value: tailwindColors.indigo[200], description: 'Indigo primary 200' },
      300: { name: 'primary-300', value: tailwindColors.indigo[300], description: 'Indigo primary 300' },
      400: { name: 'primary-400', value: tailwindColors.indigo[400], description: 'Indigo primary 400' },
      500: { name: 'primary-500', value: tailwindColors.indigo[500], description: 'Indigo primary 500' },
      600: { name: 'primary-600', value: tailwindColors.indigo[600], description: 'Indigo primary 600' },
      700: { name: 'primary-700', value: tailwindColors.indigo[700], description: 'Indigo primary 700' },
      800: { name: 'primary-800', value: tailwindColors.indigo[800], description: 'Indigo primary 800' },
      900: { name: 'primary-900', value: tailwindColors.indigo[900], description: 'Indigo primary 900' },
      950: { name: 'primary-950', value: tailwindColors.indigo[950], description: 'Indigo primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  violet: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.violet[50], description: 'Violet primary 50' },
      100: { name: 'primary-100', value: tailwindColors.violet[100], description: 'Violet primary 100' },
      200: { name: 'primary-200', value: tailwindColors.violet[200], description: 'Violet primary 200' },
      300: { name: 'primary-300', value: tailwindColors.violet[300], description: 'Violet primary 300' },
      400: { name: 'primary-400', value: tailwindColors.violet[400], description: 'Violet primary 400' },
      500: { name: 'primary-500', value: tailwindColors.violet[500], description: 'Violet primary 500' },
      600: { name: 'primary-600', value: tailwindColors.violet[600], description: 'Violet primary 600' },
      700: { name: 'primary-700', value: tailwindColors.violet[700], description: 'Violet primary 700' },
      800: { name: 'primary-800', value: tailwindColors.violet[800], description: 'Violet primary 800' },
      900: { name: 'primary-900', value: tailwindColors.violet[900], description: 'Violet primary 900' },
      950: { name: 'primary-950', value: tailwindColors.violet[950], description: 'Violet primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  purple: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.purple[50], description: 'Purple primary 50' },
      100: { name: 'primary-100', value: tailwindColors.purple[100], description: 'Purple primary 100' },
      200: { name: 'primary-200', value: tailwindColors.purple[200], description: 'Purple primary 200' },
      300: { name: 'primary-300', value: tailwindColors.purple[300], description: 'Purple primary 300' },
      400: { name: 'primary-400', value: tailwindColors.purple[400], description: 'Purple primary 400' },
      500: { name: 'primary-500', value: tailwindColors.purple[500], description: 'Purple primary 500' },
      600: { name: 'primary-600', value: tailwindColors.purple[600], description: 'Purple primary 600' },
      700: { name: 'primary-700', value: tailwindColors.purple[700], description: 'Purple primary 700' },
      800: { name: 'primary-800', value: tailwindColors.purple[800], description: 'Purple primary 800' },
      900: { name: 'primary-900', value: tailwindColors.purple[900], description: 'Purple primary 900' },
      950: { name: 'primary-950', value: tailwindColors.purple[950], description: 'Purple primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  fuchsia: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.fuchsia[50], description: 'Fuchsia primary 50' },
      100: { name: 'primary-100', value: tailwindColors.fuchsia[100], description: 'Fuchsia primary 100' },
      200: { name: 'primary-200', value: tailwindColors.fuchsia[200], description: 'Fuchsia primary 200' },
      300: { name: 'primary-300', value: tailwindColors.fuchsia[300], description: 'Fuchsia primary 300' },
      400: { name: 'primary-400', value: tailwindColors.fuchsia[400], description: 'Fuchsia primary 400' },
      500: { name: 'primary-500', value: tailwindColors.fuchsia[500], description: 'Fuchsia primary 500' },
      600: { name: 'primary-600', value: tailwindColors.fuchsia[600], description: 'Fuchsia primary 600' },
      700: { name: 'primary-700', value: tailwindColors.fuchsia[700], description: 'Fuchsia primary 700' },
      800: { name: 'primary-800', value: tailwindColors.fuchsia[800], description: 'Fuchsia primary 800' },
      900: { name: 'primary-900', value: tailwindColors.fuchsia[900], description: 'Fuchsia primary 900' },
      950: { name: 'primary-950', value: tailwindColors.fuchsia[950], description: 'Fuchsia primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  pink: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.pink[50], description: 'Pink primary 50' },
      100: { name: 'primary-100', value: tailwindColors.pink[100], description: 'Pink primary 100' },
      200: { name: 'primary-200', value: tailwindColors.pink[200], description: 'Pink primary 200' },
      300: { name: 'primary-300', value: tailwindColors.pink[300], description: 'Pink primary 300' },
      400: { name: 'primary-400', value: tailwindColors.pink[400], description: 'Pink primary 400' },
      500: { name: 'primary-500', value: tailwindColors.pink[500], description: 'Pink primary 500' },
      600: { name: 'primary-600', value: tailwindColors.pink[600], description: 'Pink primary 600' },
      700: { name: 'primary-700', value: tailwindColors.pink[700], description: 'Pink primary 700' },
      800: { name: 'primary-800', value: tailwindColors.pink[800], description: 'Pink primary 800' },
      900: { name: 'primary-900', value: tailwindColors.pink[900], description: 'Pink primary 900' },
      950: { name: 'primary-950', value: tailwindColors.pink[950], description: 'Pink primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  },
  rose: {
    primary: {
      50: { name: 'primary-50', value: tailwindColors.rose[50], description: 'Rose primary 50' },
      100: { name: 'primary-100', value: tailwindColors.rose[100], description: 'Rose primary 100' },
      200: { name: 'primary-200', value: tailwindColors.rose[200], description: 'Rose primary 200' },
      300: { name: 'primary-300', value: tailwindColors.rose[300], description: 'Rose primary 300' },
      400: { name: 'primary-400', value: tailwindColors.rose[400], description: 'Rose primary 400' },
      500: { name: 'primary-500', value: tailwindColors.rose[500], description: 'Rose primary 500' },
      600: { name: 'primary-600', value: tailwindColors.rose[600], description: 'Rose primary 600' },
      700: { name: 'primary-700', value: tailwindColors.rose[700], description: 'Rose primary 700' },
      800: { name: 'primary-800', value: tailwindColors.rose[800], description: 'Rose primary 800' },
      900: { name: 'primary-900', value: tailwindColors.rose[900], description: 'Rose primary 900' },
      950: { name: 'primary-950', value: tailwindColors.rose[950], description: 'Rose primary 950' },
    },
    secondary: defaultColors.secondary,
    success: defaultColors.success,
    warning: defaultColors.warning,
    error: defaultColors.error,
  }
};
