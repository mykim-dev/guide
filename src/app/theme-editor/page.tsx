'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/lib/themes/theme-provider';
import { ThemeEditorProvider, useThemeEditor } from '@/lib/themes/theme-editor-provider';
import { semanticColors, tailwindColors } from '@/lib/tokens/colors';
import { oklchToHex, hexToOklch } from '@/lib/utils/color-utils';
import { Download, Copy, RotateCcw, Palette, GitBranch, Loader2Icon, BadgeCheckIcon, Home, PanelLeft, ChevronDown, CheckIcon, RefreshCwIcon, CircleCheckIcon, RefreshCcwIcon } from 'lucide-react';
import { SidebarProvider, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

// 타입 정의
interface ColorOption {
  name: string;
  label: string;
  value: string;
}

interface TokenInputValues {
  [key: string]: string;
}

interface UserTokens {
  [key: string]: string;
}

// 기본 토큰 값들 (generated-theme-variables.css에서 가져온 값)
const DEFAULT_TOKENS: UserTokens = {
  '--radius': '0.625rem',
  '--background': 'oklch(1 0 0)',
  '--foreground': 'oklch(0.145 0 0)',
  '--card': 'oklch(1 0 0)',
  '--card-foreground': 'oklch(0.145 0 0)',
  '--popover': 'oklch(1 0 0)',
  '--popover-foreground': 'oklch(0.145 0 0)',
  '--primary': 'oklch(0.205 0 0)',
  '--primary-foreground': 'oklch(0.985 0 0)',
  '--secondary': 'oklch(0.97 0 0)',
  '--secondary-foreground': 'oklch(0.205 0 0)',
  '--customer': 'oklch(0.205 0 0)',
  '--customer-foreground': 'oklch(0.985 0 0)',
  '--muted': 'oklch(0.97 0 0)',
  '--muted-foreground': 'oklch(0.556 0 0)',
  '--accent': 'oklch(0.97 0 0)',
  '--accent-foreground': 'oklch(0.205 0 0)',
  '--destructive': 'oklch(0.577 0.245 27.325)',
  '--border': 'oklch(0.922 0 0)',
  '--input': 'oklch(0.922 0 0)',
  '--ring': 'oklch(0.708 0 0)',
  '--chart-1': 'oklch(0.646 0.222 41.116)',
  '--chart-2': 'oklch(0.6 0.118 184.704)',
  '--chart-3': 'oklch(0.398 0.07 227.392)',
  '--chart-4': 'oklch(0.828 0.189 84.429)',
  '--chart-5': 'oklch(0.769 0.188 70.08)',
  '--sidebar': 'oklch(0.985 0 0)',
  '--sidebar-foreground': 'oklch(0.145 0 0)',
  '--sidebar-primary': 'oklch(0.205 0 0)',
  '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
  '--sidebar-accent': 'oklch(0.97 0 0)',
  '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
  '--sidebar-border': 'oklch(0.922 0 0)',
  '--sidebar-ring': 'oklch(0.708 0 0)'
};

// 색상 토큰 키들
const COLOR_TOKEN_KEYS = [
  'background', 'foreground', 'card', 'popover', 'primary', 'secondary',
  'customer', 'muted', 'accent', 'destructive', 'border', 'input',
  'ring', 'chart', 'sidebar'
];

// 테마 에디터 메인 컴포넌트 (Provider는 레이아웃에서 제공됨)
export default function ThemeEditorPage() {
  const { theme } = useTheme();
  const {
    colors,
    setColors,
    applyLocalTheme,
    resetLocalTheme,
    tokens
  } = useThemeEditor();

  // 상태 관리
  const [mounted, setMounted] = useState(false);
  const [inputValues, setInputValues] = useState<TokenInputValues>({});
  const [userTokens, setUserTokens] = useState<UserTokens>(DEFAULT_TOKENS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  // 초기화 useEffect
  useEffect(() => {
    setMounted(true);
    const initialInputValues: TokenInputValues = {};

    Object.entries(userTokens).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        initialInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });

    setInputValues(initialInputValues);
  }, []);

  // 페이지 언마운트 시 로컬 테마 초기화
  useEffect(() => {
    return () => {
      resetLocalTheme();
    };
  }, [resetLocalTheme]);

  // OKLCH 값을 소수점 3째자리까지만 표기하는 함수
  const formatOklchValues = useCallback((obj: unknown): unknown => {
    if (typeof obj === 'string' && obj.includes('oklch(')) {
      return obj.replace(/oklch\(([^)]+)\)/g, (match, values) => {
        const formattedValues = values.split(/\s+/).map((val: string) => {
          const num = parseFloat(val);
          return isNaN(num) ? val : num.toFixed(3);
        }).join(' ');
        return `oklch(${formattedValues})`;
      });
    }

    if (Array.isArray(obj)) {
      return obj.map(formatOklchValues);
    }

    if (obj && typeof obj === 'object') {
      const formatted: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        formatted[key] = formatOklchValues(value);
      }
      return formatted;
    }

    return obj;
  }, []);

  // 토큰 내보내기 기능
  const handleExportTokens = useCallback(async () => {
    try {
      setIsExporting(true);
      const tokensData = {
        colors,
        tokens,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Theme Editor Tokens'
      };

      const formattedTokensData = formatOklchValues(tokensData);
      const blob = new Blob([JSON.stringify(formattedTokensData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theme-tokens-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('토큰이 성공적으로 내보내졌습니다!', {
        description: 'theme-tokens.json 파일이 다운로드되었습니다.'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('토큰 내보내기에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    } finally {
      setIsExporting(false);
    }
  }, [colors, tokens, userTokens, formatOklchValues]);

  // JSON 복사 기능
  const handleCopyTokens = useCallback(async () => {
    try {
      setIsCopying(true);
      const tokensData = {
        colors,
        tokens,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Theme Editor Tokens'
      };

      const formattedTokensData = formatOklchValues(tokensData);
      await navigator.clipboard.writeText(JSON.stringify(formattedTokensData, null, 2));

      toast.success('토큰이 클립보드에 복사되었습니다!', {
        description: 'JSON 형태로 복사되었습니다.'
      });
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('클립보드 복사에 실패했습니다.', {
        description: '브라우저에서 클립보드 접근을 허용해주세요.'
      });
    } finally {
      setIsCopying(false);
    }
  }, [colors, tokens, userTokens, formatOklchValues]);

  // 사용자 토큰 수정 기능
  const handleUserTokenChange = useCallback((tokenKey: string, value: string) => {
    setUserTokens(prev => ({
      ...prev,
      [tokenKey]: value
    }));
  }, []);

  // input 값 변경 (실시간 업데이트 없음)
  const handleInputChange = useCallback((tokenKey: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [tokenKey]: value
    }));
  }, []);

  // Enter 키 또는 blur 이벤트로 토큰 적용
  const handleTokenApply = useCallback((tokenKey: string, value: string) => {
    handleUserTokenChange(tokenKey, hexToOklch(value));
  }, [handleUserTokenChange]);

  // Enter 키 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent, tokenKey: string, value: string) => {
    if (e.key === 'Enter') {
      handleTokenApply(tokenKey, value);
    }
  }, [handleTokenApply]);

  // Blur 핸들러
  const handleBlur = useCallback((tokenKey: string, value: string) => {
    handleTokenApply(tokenKey, value);
  }, [handleTokenApply]);

  // 색상 토큰들을 hex 값으로 변환하는 함수 (useMemo로 최적화)
  const colorTokensAsHex = useMemo(() => {
    return Object.entries(userTokens)
      .filter(([tokenKey]) =>
        COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key))
      )
      .reduce((acc, [tokenKey, tokenValue]) => {
        acc[tokenKey] = mounted ? oklchToHex(tokenValue) : '#000000';
        return acc;
      }, {} as Record<string, string>);
  }, [userTokens, mounted]);

  // 사용자 토큰 저장 기능
  const handleSaveUserTokens = useCallback(() => {
    try {
      // CSS 변수로 적용
      const root = document.documentElement;
      Object.entries(userTokens).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // 로컬 스토리지에 저장
      localStorage.setItem('userTokens', JSON.stringify(userTokens));

      toast.success('토큰이 저장되었습니다!', {
        description: '변경사항이 적용되고 로컬 스토리지에 저장되었습니다.'
      });
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('토큰 저장에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [userTokens]);

  // 사용자 토큰 초기화 기능
  const handleResetUserTokens = useCallback(() => {
    setUserTokens(DEFAULT_TOKENS);
    setInputValues({});
    toast.success('토큰이 초기화되었습니다!', {
      description: '기본값으로 되돌아갔습니다.'
    });
  }, []);

  // 색상 옵션들 (useMemo로 최적화)
  const colorOptions = useMemo((): ColorOption[] => [
    { name: 'default', label: 'Default', value: DEFAULT_TOKENS['--primary'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ], []);

  const customerColorOptions = useMemo((): ColorOption[] => [
    { name: 'default', label: 'Default', value: DEFAULT_TOKENS['--customer'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ], []);

  // 현재 primary 색상에 해당하는 옵션 찾기
  const getCurrentPrimaryOption = useCallback(() => {
    const currentPrimary = userTokens['--primary'];
    const found = colorOptions.find((option: ColorOption) => option.value === currentPrimary);
    return found ? found.name : 'default';
  }, [userTokens, colorOptions]);

  // 현재 customer 색상에 해당하는 옵션 찾기
  const getCurrentCustomerOption = useCallback(() => {
    const currentCustomer = userTokens['--customer'];
    const found = customerColorOptions.find((option: ColorOption) => option.value === currentCustomer);
    return found ? found.name : 'default';
  }, [userTokens, customerColorOptions]);

  // primary 색상 변경 핸들러
  const handlePrimaryColorSelect = useCallback((colorName: string) => {
    const selectedColor = colorOptions.find((option: ColorOption) => option.name === colorName);
    if (selectedColor) {
      handleUserTokenChange('--primary', selectedColor.value);
    }
  }, [colorOptions, handleUserTokenChange]);

  // customer 색상 변경 핸들러
  const handleCustomerColorSelect = useCallback((colorName: string) => {
    const selectedColor = customerColorOptions.find((option: ColorOption) => option.name === colorName);
    if (selectedColor) {
      handleUserTokenChange('--customer', selectedColor.value);
    }
  }, [customerColorOptions, handleUserTokenChange]);

  // 개별 토큰 적용 핸들러
  const handleApplyToken = useCallback((tokenKey: string) => {
    try {
      const root = document.documentElement;
      const tokenValue = userTokens[tokenKey];
      if (tokenValue) {
        root.style.setProperty(tokenKey, tokenValue);
        toast.success('토큰이 적용되었습니다!', {
          description: `${tokenKey} 토큰이 적용되었습니다.`
        });
      }
    } catch (error) {
      console.error('Apply token failed:', error);
      toast.error('토큰 적용에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [userTokens]);

  // 개별 토큰 초기화 핸들러
  const handleResetToken = useCallback((tokenKey: string) => {
    try {
      const root = document.documentElement;
      const defaultValue = DEFAULT_TOKENS[tokenKey];

      if (defaultValue) {
        // 토큰을 기본값으로 되돌리기
        setUserTokens(prev => ({
          ...prev,
          [tokenKey]: defaultValue
        }));

        // input 값도 업데이트
        if (COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key))) {
          setInputValues(prev => ({
            ...prev,
            [tokenKey]: oklchToHex(defaultValue)
          }));
        }

        // CSS 변수 적용
        root.style.setProperty(tokenKey, defaultValue);

        toast.success('토큰이 초기화되었습니다!', {
          description: `${tokenKey} 토큰이 기본값으로 되돌아갔습니다.`
        });
      }
    } catch (error) {
      console.error('Reset token failed:', error);
      toast.error('토큰 초기화에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">테마 에디터</h1>
            <p className="text-muted-foreground">
              디자인 토큰을 실시간으로 편집하고 미리보기하세요.
              <br />
              <strong>변경사항은 이 페이지에서만 미리보기됩니다.</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportTokens}
              variant="outline"
              size="sm"
              disabled={isExporting}
            >
              {isExporting ? (
                <div className="size-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Download className="size-4 mr-2" />
              )}
              {isExporting ? '내보내는 중...' : '토큰 내보내기'}
            </Button>
            <Button
              onClick={handleCopyTokens}
              variant="outline"
              size="sm"
              disabled={isCopying}
            >
              {isCopying ? (
                <div className="size-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Copy className="size-4 mr-2" />
              )}
              {isCopying ? '복사 중...' : 'JSON 복사'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 사용자 색상 토큰 편집 */}
        <div className="flex flex-col gap-2 border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              <Palette className="size-4" />
              사용자 토큰 설정
            </h3>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSaveUserTokens} size="sm">
                적용
              </Button>
              <Button onClick={handleResetUserTokens} variant="outline" size="sm">
                초기화
              </Button>
            </div>
          </div>
          <p className="py-2 text-sm text-muted-foreground">변경사항은 이 페이지에서만 미리보기됩니다.</p>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(colorTokensAsHex)
              .map(([tokenKey, hexValue]) => (
                tokenKey === '--primary' ? (
                  <div key={tokenKey} className="flex flex-col items-center gap-1">
                    <Label htmlFor={tokenKey} className="w-full text-xs">
                      {tokenKey}
                    </Label>
                    <div className="w-full flex gap-2">
                      <Select value={getCurrentPrimaryOption()} onValueChange={handlePrimaryColorSelect}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Primary 색상을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color: ColorOption) => (
                            <SelectItem key={color.name} value={color.name}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full border"
                                  style={{ backgroundColor: oklchToHex(color.value) }}
                                />
                                <span className="capitalize">{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleApplyToken('--primary')}
                        title="Primary 색상 적용"
                      >
                        <CheckIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleResetToken('--primary')}
                        title="Primary 색상 초기화"
                      >
                        <RefreshCcwIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : tokenKey === '--customer' ? (
                  <div key={tokenKey} className="flex flex-col items-center gap-1">
                    <Label htmlFor={tokenKey} className="w-full text-xs">
                      {tokenKey}
                    </Label>
                    <div className="w-full flex gap-2">
                      <Select value={getCurrentCustomerOption()} onValueChange={handleCustomerColorSelect}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Customer 색상을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerColorOptions.map((color: ColorOption) => (
                            <SelectItem key={color.name} value={color.name}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full border"
                                  style={{ backgroundColor: oklchToHex(color.value) }}
                                />
                                <span className="capitalize">{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleApplyToken('--customer')}
                        title="Customer 색상 적용"
                      >
                        <CheckIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleResetToken('--customer')}
                        title="Customer 색상 초기화"
                      >
                        <RefreshCcwIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div key={tokenKey} className="flex flex-col gap-1">
                    <Label htmlFor={tokenKey} className="w-full text-xs">
                      {tokenKey}
                    </Label>
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="color"
                        value={inputValues[tokenKey] || hexValue}
                        onChange={(e) => {
                          handleInputChange(tokenKey, e.target.value);
                          handleTokenApply(tokenKey, e.target.value);
                        }}
                        className="w-8 h-8 p-0 rounded-md cursor-pointer border-none shrink-0"
                      />
                      <Input
                        id={tokenKey}
                        value={inputValues[tokenKey] || hexValue}
                        onChange={(e) => handleInputChange(tokenKey, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, tokenKey, inputValues[tokenKey] || hexValue)}
                        onBlur={() => handleBlur(tokenKey, inputValues[tokenKey] || hexValue)}
                        className="flex-1"
                        placeholder="hex 값"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleApplyToken(tokenKey)}
                        title={`${tokenKey} 토큰 적용`}
                      >
                        <CheckIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleResetToken(tokenKey)}
                        title={`${tokenKey} 토큰 초기화`}
                      >
                        <RefreshCcwIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                )
              ))}
          </div>
        </div>

        {/* 컴포넌트 미리보기 */}
        <div className="lg:col-span-3 border border-border rounded-xl p-6">
          <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <Sidebar>
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
            </Sidebar>
            <div className="flex-1">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-sm transition-all duration-300 ${sidebarOpen ? '' : ''}`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <PanelLeft />
              </Button>

              <div className="screen-wrap">
                <div className="screen-item">
                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Typography</h3>
                      <div className="component-actions">
                        <Button variant="outline" size="sm">Search</Button>
                        <Button variant="default" size="sm">Save</Button>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      {/* typography display */}
                      <div className="space-y-6">
                        <div className="flex gap-2">
                          <div className="p-2 text-xs bg-muted text-muted-foreground rounded-md">Muted</div>
                          <div className="p-2 text-xs bg-accent text-accent-foreground rounded-md">Accent</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-xs text-muted-foreground">text-4xl (fontSize: 2.25rem / fontWeight: 700 / height: calc(2.5 / 2.25) / letterSpacing: -0.025em)</div>
                          <div><h4 className="text-4xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h4></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-3xl (fontSize: 1.875rem / fontWeight: 700 / height: calc(2.25 / 1.875) / letterSpacing: -0.025em)</div>
                          <div><h5 className="text-3xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h5></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-2xl (fontSize: 1.5rem / fontWeight: 600 / height: calc(2 / 1.5))</div>
                          <div><h1 className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</h1></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-xl (fontSize: 1.25rem / fontWeight: 600 / height: calc(1.75 / 1.25))</div>
                          <div><h2 className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</h2></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-lg (fontSize: 1.125rem / fontWeight: 600 / height: calc(1.75 / 1.125))</div>
                          <div><h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-base (fontSize: 1rem / fontWeight: 400 / height: calc(1.5 / 1) / letterSpacing: 0)</div>
                          <div><p className="text-base">The quick brown fox jumps over the lazy dog</p></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-sm (fontSize: 0.875rem / fontWeight: 400 / height: calc(1.25 / 0.875))</div>
                          <div><p className="text-sm">The quick brown fox jumps over the lazy dog</p></div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">text-xs (fontSize: 0.75rem / fontWeight: 400 / height: calc(1 / 0.75))</div>
                          <div><p className="text-xs">The quick brown fox jumps over the lazy dog</p></div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Card</h3>
                      <div className="component-actions"></div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Card Content</p>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="screen-item">
                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Button</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="default" size="sm">Primary</Button>
                        <Button variant="secondary" size="sm">Secondary</Button>
                        <Button variant="customer" size="sm">Customer</Button>
                        <Button variant="destructive" size="sm">Destructive</Button>
                        <Button variant="outline" size="sm">Outline</Button>
                        <Button variant="ghost" size="sm">Ghost</Button>
                        <Button variant="link" size="sm">Link</Button>
                        <Button variant="outline" size="icon">
                          <GitBranch />
                        </Button>
                        <Button disabled size="sm">
                          <Loader2Icon className="animate-spin" />
                          Please wait
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Badge</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="customer">Customer</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge
                          variant="secondary"
                          className="bg-blue-500 text-white dark:bg-blue-600"
                        >
                          <BadgeCheckIcon />
                          Verified
                        </Badge>
                        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                          8
                        </Badge>
                        <Badge
                          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                          variant="destructive"
                        >
                          99
                        </Badge>
                        <Badge
                          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                          variant="outline"
                        >
                          20+
                        </Badge>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Form</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <form>
                        <div className="form-wrap">
                          <div className="form-item">
                            <div className="form-item-title">Checkbox</div>
                            <div className="form-item-content">
                              <Checkbox id="agree" checked={true} />
                            </div>
                          </div>

                          <div className="form-item">
                            <div className="form-item-title">RadioGroup</div>
                            <div className="form-item-content">
                              <RadioGroup id="radio" defaultValue="apple" className="flex gap-4">
                                <div className="flex items-center gap-2"><RadioGroupItem value="apple" id="radio-1" /><Label htmlFor="radio-1">apple</Label></div>
                                <div className="flex items-center gap-2"><RadioGroupItem value="pear" id="radio-2" /><Label htmlFor="radio-2">pear</Label></div>
                                <div className="flex items-center gap-2"><RadioGroupItem value="banana" id="radio-3" disabled={true} /><Label htmlFor="radio-3">banana</Label></div>
                              </RadioGroup>
                            </div>
                          </div>

                          <div className="form-item">
                            <div className="form-item-title">Switch</div>
                            <div className="form-item-content">
                              <Switch id="switch" checked={true} />
                              <Switch id="switch2" checked={true} disabled={true} />
                            </div>
                          </div>

                          <div className="form-item">
                            <div className="form-item-title">Select</div>
                            <div className="form-item-content">
                              <Select defaultValue="apple">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="apple">Apple</SelectItem>
                                  <SelectItem value="pear">Pear</SelectItem>
                                  <SelectItem value="banana">Banana</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="form-item">
                            <div className="form-item-title">Email</div>
                            <div className="form-item-content">
                              <Input type="email" id="email" placeholder="Enter your email" />
                            </div>
                          </div>

                          <div className="form-item">
                            <div className="form-item-title">Message</div>
                            <div className="form-item-content">
                              <Textarea
                                id="message"
                                placeholder="Type your message here."
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Progress</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <Progress value={50} />
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible defaultOpen={true} className="component-wrap">
                    <div className="component-header">
                      <h3 className="component-title">Slider</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronDown />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="component-content">
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

            </div>
          </SidebarProvider>
        </div>
      </div>
    </div >
  );
}


