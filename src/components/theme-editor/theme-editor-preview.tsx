'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GitBranch, Loader2Icon, BadgeCheckIcon, Home, PanelLeft, ChevronDown, CheckIcon, RefreshCcwIcon, Download, Copy, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/lib/themes/theme-provider';
import { useThemeEditor } from '@/lib/themes/theme-editor-provider';
import { tailwindColors } from '@/lib/tokens/colors';
import { oklchToHex, hexToOklch, isValidHex, normalizeHex } from '@/lib/utils/color-utils';
import { SidebarProvider, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

// 기본 토큰 값들
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

export function ThemeEditorPreview() {
  const { theme } = useTheme();
  
  // 마운트 상태 관리
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const {
    tokens
  } = useThemeEditor();

  // 상태 관리
  const [inputValues, setInputValues] = useState<TokenInputValues>({});
  const [userTokens, setUserTokens] = useState<UserTokens>(DEFAULT_TOKENS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 초기화 useEffect
  useEffect(() => {
    const initialInputValues: TokenInputValues = {};

    Object.entries(userTokens).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        initialInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });

    setInputValues(initialInputValues);
  }, [userTokens]);

  // 페이지 언마운트 시 로컬 테마 초기화
  useEffect(() => {
    return () => {
      // resetLocalTheme functionality removed
    };
  }, []);

  // 사용자 토큰 수정 기능
  const handleUserTokenChange = useCallback((tokenKey: string, value: string) => {
    setUserTokens(prev => ({
      ...prev,
      [tokenKey]: value
    }));
  }, []);

  // input 값 변경 (실시간 업데이트 없음)
  const handleInputChange = useCallback((tokenKey: string, value: string) => {
    // hex 값 정규화
    const normalizedValue = normalizeHex(value);
    setInputValues(prev => ({
      ...prev,
      [tokenKey]: normalizedValue
    }));
  }, []);

  // Enter 키 또는 blur 이벤트로 토큰 적용
  const handleTokenApply = useCallback((tokenKey: string, value: string) => {
    // hex 값 검증
    if (!isValidHex(value)) {
      toast.error('유효하지 않은 색상 형식입니다.', {
        description: '올바른 hex 색상 형식을 입력해주세요. (예: #ff0000)'
      });
      return;
    }
    
    const normalizedValue = normalizeHex(value);
    handleUserTokenChange(tokenKey, hexToOklch(normalizedValue));
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
        const hexValue = oklchToHex(tokenValue);
        // hex 값이 유효한지 검증하고 정규화
        acc[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
        return acc;
      }, {} as Record<string, string>);
  }, [userTokens]);

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
    try {
      // 1. 사용자 토큰을 기본값으로 초기화
      setUserTokens(DEFAULT_TOKENS);
      
      // 2. 입력 필드들을 기본값으로 초기화
      const resetInputValues: TokenInputValues = {};
      Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          resetInputValues[tokenKey] = oklchToHex(tokenValue);
        }
      });
      setInputValues(resetInputValues);
      
      // 3. 로컬 테마 초기화 (CSS 변수 제거)
      // resetLocalTheme functionality removed
      
      // 4. 기본 토큰들을 CSS에 적용
      const root = document.documentElement;
      Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
        root.style.setProperty(tokenKey, tokenValue);
      });
      
      toast.success('토큰이 초기화되었습니다!', {
        description: '기본값으로 되돌아갔습니다.'
      });
    } catch (error) {
      console.error('Reset user tokens failed:', error);
      toast.error('토큰 초기화에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
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

  // 토큰 내보내기 기능
  const handleExportTokens = useCallback(async () => {
    try {
      const tokensData = {
        tokens,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Theme Editor Tokens - Independent Layout'
      };

      const blob = new Blob([JSON.stringify(tokensData, null, 2)], {
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
        description: '독립 레이아웃에서 토큰이 다운로드되었습니다.'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('토큰 내보내기에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [tokens, userTokens]);

  // JSON 복사 기능
  const handleCopyTokens = useCallback(async () => {
    try {
      const tokensData = {
        tokens,
        userTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Theme Editor Tokens - Independent Layout'
      };

      await navigator.clipboard.writeText(JSON.stringify(tokensData, null, 2));

      toast.success('토큰이 클립보드에 복사되었습니다!', {
        description: '독립 레이아웃의 JSON이 복사되었습니다.'
      });
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('클립보드 복사에 실패했습니다.', {
        description: '브라우저에서 클립보드 접근을 허용해주세요.'
      });
    }
  }, [tokens, userTokens]);

  // 마운트되지 않은 경우 로딩 화면 표시
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">테마 에디터를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="layout-container">
        <header className="layout-header">
          <div className="header-left flex items-center gap-3">
            <h1 className="text-xl font-bold">테마 에디터</h1>
            <p className="text-sm text-muted-foreground">
              독립 레이아웃 - 실시간 토큰 편집 및 미리보기
            </p>
          </div>
          <div className="header-right flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><Settings className="size-4" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              
            </PopoverContent>
          </Popover>
          </div>
        </header>
        <aside className="layout-aside"></aside>
        <main className="layout-main">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 사용자 색상 토큰 편집 */}
            <div className="flex flex-col gap-2 border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2">
                  <span className="text-lg font-semibold">토큰 설정</span>
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
              
              {/* 액션 버튼들 */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button
                  onClick={handleExportTokens}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  토큰 내보내기
                </Button>
                <Button
                  onClick={handleCopyTokens}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  JSON 복사
                </Button>
                <Button
                  onClick={() => {}}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RefreshCcwIcon className="h-4 w-4" />
                  전체 초기화
                </Button>
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
                            className="size-7 p-0"
                            onClick={() => handleApplyToken('--primary')}
                            title="Primary 색상 적용"
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
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
                            className="size-7 p-0"
                            onClick={() => handleApplyToken('--customer')}
                            title="Customer 색상 적용"
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
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
                            value={normalizeHex(inputValues[tokenKey] || hexValue)}
                            onChange={(e) => {
                              const colorValue = e.target.value;
                              handleInputChange(tokenKey, colorValue);
                              handleTokenApply(tokenKey, colorValue);
                            }}
                            className="w-8 h-8 p-0 rounded-md cursor-pointer border-none shrink-0"
                          />
                          <Input
                            id={tokenKey}
                            value={normalizeHex(inputValues[tokenKey] || hexValue)}
                            onChange={(e) => handleInputChange(tokenKey, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, tokenKey, inputValues[tokenKey] || hexValue)}
                            onBlur={() => handleBlur(tokenKey, inputValues[tokenKey] || hexValue)}
                            className="flex-1"
                            placeholder="hex 값"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
                            onClick={() => handleApplyToken(tokenKey)}
                            title={`${tokenKey} 토큰 적용`}
                          >
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0"
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
                              <div className="p-2 text-xs bg-muted text-muted-foreground rounded-md">Muted - 비활성/보조 정보를 위한 색상(비활성 배경, 코드 블록, 구분선)</div>
                              <div className="p-2 text-xs bg-accent text-accent-foreground rounded-md">Accent - 상호작용 요소의 강조 색상(호버 상태, 선택 상태, 포커스 상태)</div>
                            </div>
                            <Separator />
                            <div>
                              <div className="text-xs text-muted-foreground">text-4xl (fontSize: 2.25rem / fontWeight: 700 / height: calc(2.5 / 2.25))</div>
                              <div><h4 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</h4></div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">text-3xl (fontSize: 1.875rem / fontWeight: 700 / height: calc(2.25 / 1.875))</div>
                              <div><h5 className="text-3xl font-bold">The quick brown fox jumps over the lazy dog</h5></div>
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
                          <div className="flex flex-wrap gap-4">
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
                          <div className="flex flex-wrap gap-4">
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
                                  <ScrollArea className="h-9 w-full">
                                    <div className="control-group">
                                      <div className="control-item"><Checkbox id="chk1" checked={false} /><Label htmlFor="chk1">Default</Label></div>
                                      <div className="control-item"><Checkbox id="chk2" checked={true} /><Label htmlFor="chk2">Checked</Label></div>
                                      <div className="control-item"><Checkbox id="chk3" checked={false} disabled={true} /><Label htmlFor="chk3">Disabled</Label></div>
                                      <div className="control-item"><Checkbox id="chk4" checked={true} disabled={true} /><Label htmlFor="chk4">Checked Disabled</Label></div>
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
                                </div>
                              </div>

                              <div className="form-item">
                                <div className="form-item-title">RadioGroup</div>
                                <div className="form-item-content">
                                  <ScrollArea className="h-9 w-full">
                                    <RadioGroup defaultValue="rdo2">                                
                                      <div className="control-group">
                                        <div className="control-item"><RadioGroupItem value="rdo1" id="rdo1" /><Label htmlFor="rdo1">Default</Label></div>
                                        <div className="control-item"><RadioGroupItem value="rdo2" id="rdo2" /><Label htmlFor="rdo2">Checked</Label></div>
                                        <div className="control-item"><RadioGroupItem value="rdo3" id="rdo3" disabled={true} /><Label htmlFor="rdo3">Disabled</Label></div>
                                      </div>                                
                                    </RadioGroup>
                                    <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
                                </div>
                              </div>

                              <div className="form-item">
                                <div className="form-item-title">Switch</div>
                                <div className="form-item-content">
                                  <div className="control-group">
                                    <div className="control-item">
                                      <Switch id="switch" checked={true} />
                                    </div>
                                    <div className="control-item">
                                      <Switch id="switch2" checked={true} disabled={true} />
                                    </div>
                                  </div>
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
        </main>
      </div>
    </>
  );
}

