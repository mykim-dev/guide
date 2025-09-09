'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import { Download, Copy, RotateCcw, Palette, GitBranch, Loader2Icon, BadgeCheckIcon, Home, PanelLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from '@/components/ui/sidebar';

// 테마 에디터 메인 컴포넌트
export default function ThemeEditorPage() {
  return (
    <ThemeEditorProvider>
      <ThemeEditorContent />
    </ThemeEditorProvider>
  );
}

// 테마 에디터 콘텐츠 컴포넌트
function ThemeEditorContent() {
  const { theme } = useTheme(); // 기본 테마 (라이트/다크/시스템)
  const {
    colors,
    setColors,
    applyLocalTheme,
    resetLocalTheme,
    tokens
  } = useThemeEditor(); // 테마 에디터 기능

  const [mounted, setMounted] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  
  // 기본 토큰 값들 (generated-theme-variables.css에서 가져온 값)
  const defaultTokens = {
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

  const [userTokens, setUserTokens] = useState(defaultTokens);

  useEffect(() => {
    setMounted(true);
    // input 값들을 현재 토큰 값으로 초기화
    const initialInputValues: Record<string, string> = {};
    Object.entries(userTokens).forEach(([tokenKey, tokenValue]) => {
      if (tokenKey.includes('background') || 
          tokenKey.includes('foreground') || 
          tokenKey.includes('card') || 
          tokenKey.includes('popover') || 
          tokenKey.includes('primary') || 
          tokenKey.includes('secondary') || 
          tokenKey.includes('customer') || 
          tokenKey.includes('muted') || 
          tokenKey.includes('accent') || 
          tokenKey.includes('destructive') || 
          tokenKey.includes('border') ||
          tokenKey.includes('input') ||
          tokenKey.includes('ring') ||
          tokenKey.includes('chart') ||
          tokenKey.includes('sidebar')) {
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

  const resetToDefault = useCallback(() => {
    resetLocalTheme();
    setColors(semanticColors);
    setUserTokens(defaultTokens);
  }, [setColors, resetLocalTheme]);

  // OKLCH 값을 소수점 3째자리까지만 표기하는 함수
  const formatOklchValues = (obj: unknown): unknown => {
    if (typeof obj === 'string' && obj.includes('oklch(')) {
      // oklch(0.123456 0.789012 123.456) -> oklch(0.123 0.789 123.456)
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
  };

  // 토큰 내보내기 기능
  const handleExportTokens = () => {
    const tokensData = {
      colors: colors,
      tokens: tokens,
      userTokens: userTokens,
      timestamp: new Date().toISOString(),
    };

    // OKLCH 값을 소수점 3째자리까지만 표기
    const formattedTokensData = formatOklchValues(tokensData);

    const blob = new Blob([JSON.stringify(formattedTokensData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON 복사 기능
  const handleCopyTokens = () => {
    const tokensData = {
      colors: colors,
      tokens: tokens,
      userTokens: userTokens,
    };

    // OKLCH 값을 소수점 3째자리까지만 표기
    const formattedTokensData = formatOklchValues(tokensData);

    navigator.clipboard.writeText(JSON.stringify(formattedTokensData, null, 2));
  };

  // 사용자 토큰 수정 기능
  const handleUserTokenChange = (tokenKey: string, value: string) => {
    setUserTokens(prev => ({
      ...prev,
      [tokenKey]: value
    }));
  };

  // input 값 변경 (실시간 업데이트 없음)
  const handleInputChange = (tokenKey: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [tokenKey]: value
    }));
  };

  // Enter 키 또는 blur 이벤트로 토큰 적용
  const handleTokenApply = (tokenKey: string, value: string) => {
    handleUserTokenChange(tokenKey, hexToOklch(value));
  };

  // Enter 키 핸들러
  const handleKeyDown = (e: React.KeyboardEvent, tokenKey: string, value: string) => {
    if (e.key === 'Enter') {
      handleTokenApply(tokenKey, value);
    }
  };

  // Blur 핸들러
  const handleBlur = (tokenKey: string, value: string) => {
    handleTokenApply(tokenKey, value);
  };

  // 색상 토큰들을 hex 값으로 변환하는 함수
  const getColorTokensAsHex = () => {
    const colorTokens = Object.entries(userTokens)
      .filter(([tokenKey]) => 
        tokenKey.includes('background') || 
        tokenKey.includes('foreground') || 
        tokenKey.includes('card') || 
        tokenKey.includes('popover') || 
        tokenKey.includes('primary') || 
        tokenKey.includes('secondary') || 
        tokenKey.includes('customer') || 
        tokenKey.includes('muted') || 
        tokenKey.includes('accent') || 
        tokenKey.includes('destructive') || 
        tokenKey.includes('border') ||
        tokenKey.includes('input') ||
        tokenKey.includes('ring') ||
        tokenKey.includes('chart') ||
        tokenKey.includes('sidebar')
      )
      .reduce((acc, [tokenKey, tokenValue]) => {
        acc[tokenKey] = mounted ? oklchToHex(tokenValue) : '#000000';
        return acc;
      }, {} as Record<string, string>);
    
    return colorTokens;
  };

  // 사용자 토큰 저장 기능
  const handleSaveUserTokens = () => {
    // CSS 변수로 적용
    const root = document.documentElement;
    Object.entries(userTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // 로컬 스토리지에 저장
    localStorage.setItem('userTokens', JSON.stringify(userTokens));
  };

  // 사용자 토큰 초기화 기능
  const handleResetUserTokens = () => {
    setUserTokens(defaultTokens);
  };

  const exportTheme = useCallback(() => {
    const themeConfig = {
      colors: colors,
      tokens: tokens,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [colors, tokens]);

  const copyThemeCode = useCallback(() => {
    const tailwindConfig = `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      tokens: ${JSON.stringify(tokens, null, 2)}
    }
  }
}`;

    navigator.clipboard.writeText(tailwindConfig);
  }, [colors, tokens]);



  const [sidebarOpen, setSidebarOpen] = useState(false);

  // tailwindColors에서 500 색상을 가져와서 색상 옵션들 정의
  const colorOptions = [
    { name: 'default', label: 'Default', value: defaultTokens['--primary'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ];

  // customer 색상 옵션들 정의
  const customerColorOptions = [
    { name: 'default', label: 'Default', value: defaultTokens['--customer'] },
    ...Object.entries(tailwindColors).map(([colorName, colorScale]) => ({
      name: colorName,
      label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: hexToOklch(colorScale['500'])
    }))
  ];

  // 현재 primary 색상에 해당하는 옵션 찾기
  const getCurrentPrimaryOption = () => {
    const currentPrimary = userTokens['--primary'];
    const found = colorOptions.find(option => option.value === currentPrimary);
    return found ? found.name : 'default';
  };

  // 현재 customer 색상에 해당하는 옵션 찾기
  const getCurrentCustomerOption = () => {
    const currentCustomer = userTokens['--customer'];
    const found = customerColorOptions.find(option => option.value === currentCustomer);
    return found ? found.name : 'default';
  };

  // primary 색상 변경 핸들러
  const handlePrimaryColorSelect = (colorName: string) => {
    const selectedColor = colorOptions.find(option => option.name === colorName);
    if (selectedColor) {
      handleUserTokenChange('--primary', selectedColor.value);
    }
  };

  // customer 색상 변경 핸들러
  const handleCustomerColorSelect = (colorName: string) => {
    const selectedColor = customerColorOptions.find(option => option.name === colorName);
    if (selectedColor) {
      handleUserTokenChange('--customer', selectedColor.value);
    }
  };

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
            <Button onClick={handleExportTokens} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              토큰 내보내기
            </Button>
            <Button onClick={handleCopyTokens} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              JSON 복사
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 토큰 편집 패널 */}
        <div className="space-y-4">
          {/* 사용자 색상 토큰 편집 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                사용자 색상 토큰 편집
              </CardTitle>
              <CardDescription>
                색상 관련 CSS 변수 토큰을 직접 편집하고 저장하세요.
                <div className="flex space-x-2 absolute -top-4 right-2">
                <Button onClick={exportTheme} size="icon" variant="ghost" title="테마 내보내기">
                  <Download className="h-4 w-4" />
                </Button>
                <Button onClick={copyThemeCode} size="icon" variant="ghost" title="Tailwind 설정 복사">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button onClick={resetToDefault} size="icon" variant="ghost" title="기본값으로 되돌리기">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(getColorTokensAsHex())
                    .map(([tokenKey, hexValue]) => (
                      tokenKey === '--primary' ? (
                        <div key={tokenKey} className="flex items-center gap-2">
                          <Label htmlFor={tokenKey} className="w-40 text-xs font-mono shrink-0">
                            {tokenKey}
                          </Label>
                          <Select value={getCurrentPrimaryOption()} onValueChange={handlePrimaryColorSelect}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Primary 색상을 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                              {colorOptions.map((color) => (
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
                        </div>
                      ) : tokenKey === '--customer' ? (
                        <div key={tokenKey} className="flex items-center gap-2">
                          <Label htmlFor={tokenKey} className="w-40 text-xs font-mono shrink-0">
                            {tokenKey}
                          </Label>
                          <Select value={getCurrentCustomerOption()} onValueChange={handleCustomerColorSelect}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Customer 색상을 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                              {customerColorOptions.map((color) => (
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
                        </div>
                      ) : (
                        <div key={tokenKey} className="flex items-center gap-2">
                          <Label htmlFor={tokenKey} className="w-40 text-xs font-mono shrink-0">
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
                              className="w-8 h-8 p-0 rounded-md border cursor-pointer border-none shrink-0"
                            />
                            <Input
                              id={tokenKey}
                              value={inputValues[tokenKey] || hexValue}
                              onChange={(e) => handleInputChange(tokenKey, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, tokenKey, inputValues[tokenKey] || hexValue)}
                              onBlur={() => handleBlur(tokenKey, inputValues[tokenKey] || hexValue)}
                              className="text-xs font-mono flex-1"
                              placeholder="hex 값"
                            />
                          </div>
                        </div>
                      )
                    ))}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button onClick={handleSaveUserTokens} size="sm" className="flex-1">
                    <BadgeCheckIcon className="h-4 w-4 mr-2" />
                    색상 토큰 저장
                  </Button>
                  <Button onClick={handleResetUserTokens} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    초기화
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 실시간 미리보기 */}
        <div className="lg:col-span-3">
          {/* 컴포넌트 미리보기 */}
          <div className="border border-input rounded-xl p-6 shadow-sm relative">
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
                <div className="flex flex-col gap-4">
                  {/* typography display */}
                  <div>
                    <div className="text-xs">text-4xl (fontSize: 2.25rem / fontWeight: 700 / height: calc(2.5 / 2.25) / letterSpacing: -0.025em)</div>
                    <div><h4 className="text-4xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h4></div>
                  </div>
                  <div>
                    <div className="text-xs">text-3xl (fontSize: 1.875rem / fontWeight: 700 / height: calc(2.25 / 1.875) / letterSpacing: -0.025em)</div>
                    <div><h5 className="text-3xl font-bold tracking-tight">The quick brown fox jumps over the lazy dog</h5></div>
                  </div>
                  <div>
                    <div className="text-xs">text-2xl (fontSize: 1.5rem / fontWeight: 600 / height: calc(2 / 1.5))</div>
                    <div><h1 className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</h1></div>
                  </div>
                  <div>
                    <div className="text-xs">text-xl (fontSize: 1.25rem / fontWeight: 600 / height: calc(1.75 / 1.25))</div>
                    <div><h2 className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</h2></div>
                  </div>
                  <div>
                    <div className="text-xs">text-lg (fontSize: 1.125rem / fontWeight: 600 / height: calc(1.75 / 1.125))</div>
                    <div><h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3></div>
                  </div>
                  <div>
                    <div className="text-xs">text-base (fontSize: 1rem / fontWeight: 400 / height: calc(1.5 / 1) / letterSpacing: 0)</div>
                    <div><p className="text-base">The quick brown fox jumps over the lazy dog</p></div>
                  </div>
                  <div>
                    <div className="text-xs">text-sm (fontSize: 0.875rem / fontWeight: 400 / height: calc(1.25 / 0.875))</div>
                    <div><p className="text-sm">The quick brown fox jumps over the lazy dog</p></div>
                  </div>
                  <div>
                    <div className="text-xs">text-xs (fontSize: 0.75rem / fontWeight: 400 / height: calc(1 / 0.75))</div>
                    <div><p className="text-xs">The quick brown fox jumps over the lazy dog</p></div>
                  </div>
                </div>

                <div className="mt-4">
                  <form>
                    <div className="form-wrap">
                      <div className="form-item">
                        {/* Buttons */}
                        <div className="form-item-title">Buttons</div>
                        <div className="form-item-content">
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
                      </div>

                      {/* Badges */}
                      <div className="form-item">
                        <div className="form-item-title">Badges</div>
                        <div className="form-item-content">
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
                      </div>

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
                </div>

                <div className="mt-4">
                  <div className="h-8 flex items-center text-sm font-medium">Progress</div>
                  <Progress value={50} />
                </div>
                <div className="mt-4">
                  <div className="h-8 flex items-center text-sm font-medium">Slider</div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </div>
  );
}


