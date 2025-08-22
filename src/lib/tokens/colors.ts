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
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
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
  neutral: {
    50: { name: 'neutral-50', value: '#fafafa', description: 'Neutral color 50' },
    100: { name: 'neutral-100', value: '#f5f5f5', description: 'Neutral color 100' },
    200: { name: 'neutral-200', value: '#e5e5e5', description: 'Neutral color 200' },
    300: { name: 'neutral-300', value: '#d4d4d4', description: 'Neutral color 300' },
    400: { name: 'neutral-400', value: '#a3a3a3', description: 'Neutral color 400' },
    500: { name: 'neutral-500', value: '#737373', description: 'Neutral color 500' },
    600: { name: 'neutral-600', value: '#525252', description: 'Neutral color 600' },
    700: { name: 'neutral-700', value: '#404040', description: 'Neutral color 700' },
    800: { name: 'neutral-800', value: '#262626', description: 'Neutral color 800' },
    900: { name: 'neutral-900', value: '#171717', description: 'Neutral color 900' },
    950: { name: 'neutral-950', value: '#0a0a0a', description: 'Neutral color 950' },
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
  info: {
    50: { name: 'info-50', value: '#f0f9ff', description: 'Info color 50' },
    100: { name: 'info-100', value: '#e0f2fe', description: 'Info color 100' },
    200: { name: 'info-200', value: '#bae6fd', description: 'Info color 200' },
    300: { name: 'info-300', value: '#7dd3fc', description: 'Info color 300' },
    400: { name: 'info-400', value: '#38bdf8', description: 'Info color 400' },
    500: { name: 'info-500', value: '#0ea5e9', description: 'Info color 500' },
    600: { name: 'info-600', value: '#0284c7', description: 'Info color 600' },
    700: { name: 'info-700', value: '#0369a1', description: 'Info color 700' },
    800: { name: 'info-800', value: '#075985', description: 'Info color 800' },
    900: { name: 'info-900', value: '#0c4a6e', description: 'Info color 900' },
    950: { name: 'info-950', value: '#082f49', description: 'Info color 950' },
  },
};

export const generateColorTokens = (colors: ColorPalette) => {
  const tokens: Record<string, string> = {};
  
  Object.entries(colors).forEach(([category, scale]) => {
    Object.entries(scale).forEach(([shade, token]) => {
      tokens[token.name] = token.value;
    });
  });
  
  return tokens;
};

export const generateTailwindConfig = (colors: ColorPalette) => {
  const tailwindColors: Record<string, Record<string, string>> = {};
  
  Object.entries(colors).forEach(([category, scale]) => {
    tailwindColors[category] = {};
    Object.entries(scale).forEach(([shade, token]) => {
      tailwindColors[category][shade] = token.value;
    });
  });
  
  return tailwindColors;
};
