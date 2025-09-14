'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { GitBranch, Loader2Icon, BadgeCheckIcon, Home, PanelLeft, ChevronDown, CheckIcon, RefreshCcwIcon, Copy, Settings, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useThemeEditor } from '@/lib/themes/theme-editor-provider';
import { tailwindColors } from '@/lib/tokens/colors';
import { oklchToHex, hexToOklch, isValidHex, normalizeHex } from '@/lib/utils/color-utils';
import { SidebarProvider, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

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
  const [tokenCode, setTokenCode] = useState<string>("");

  // 태그 버튼 데이터
  const tagButtons = [
    { id: 'form', label: 'Form', href: '/component-guide/form' },
    { id: 'list', label: 'List', href: '/component-guide/list' },
    { id: 'card', label: 'Card', href: '/component-guide/card' },
    { id: 'table', label: 'Table', href: '/component-guide/table' },
    { id: 'chart', label: 'Chart', href: '/component-guide/chart' },
    { id: 'media', label: 'Media', href: '/component-guide/media' }
  ];

  // 네비게이션 메뉴 데이터
  const navigationMenu = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home
    },
    {
      id: 'screen',
      label: 'Screen',
      href: '/',
      icon: Home,
      children: [
        { id: 'screen-default', label: 'Screen-Default', href: '/', icon: Home },
        { id: 'screen-horizontal', label: 'Screen-Horizontal', href: '/', icon: Home },
        { id: 'screen-vertical', label: 'Screen-Vertical', href: '/', icon: Home },
        { id: 'screen-horizontal2', label: 'Screen-Horizontal2', href: '/', icon: Home },
        { id: 'screen-vertical2', label: 'Screen-Vertical2', href: '/', icon: Home }
      ]
    },
    {
      id: 'component',
      label: 'Component',
      href: '/',
      icon: Home
    }
  ];

  // 컴포넌트 메뉴 데이터
  const componentMenu = [
    { id: 'form', label: 'Form', href: '/', icon: Home },
    { id: 'list', label: 'List', href: '/', icon: Home }
  ];

  // 초기화 useEffect (컴포넌트 마운트 시에만 실행)
  useEffect(() => {
    const initialInputValues: TokenInputValues = {};

    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        // OKLCH를 hex로 변환하여 기본값 설정
        initialInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });

    setInputValues(initialInputValues);

    // 토큰 코드 초기화 (저장된 코드가 있으면 불러오기, 없으면 hex 형식 기본값)
    const savedTokenCode = localStorage.getItem('userTokenCode');
    if (savedTokenCode) {
      setTokenCode(savedTokenCode);
    } else {
      // hex 형식으로 기본 토큰 코드 생성
      const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          acc[tokenKey] = oklchToHex(tokenValue);
        } else {
          acc[tokenKey] = tokenValue;
        }
        return acc;
      }, {} as UserTokens);
      setTokenCode(JSON.stringify(hexTokens, null, 2));
    }
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

  // 페이지 언마운트 시 로컬 테마 초기화
  useEffect(() => {
    return () => {
      // resetLocalTheme functionality removed
    };
  }, []);

  // userTokens 변경 시 tokenCode 자동 업데이트 (hex 형식으로)
  useEffect(() => {
    const hexTokens = Object.entries(userTokens).reduce((acc, [tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        // OKLCH를 hex로 변환
        const hexValue = tokenValue.startsWith('#') ? tokenValue : oklchToHex(tokenValue);
        acc[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
      } else {
        acc[tokenKey] = tokenValue;
      }
      return acc;
    }, {} as UserTokens);

    setTokenCode(JSON.stringify(hexTokens, null, 2));
  }, [userTokens]);

  // hex를 기본으로 하는 색상 업데이트
  const updateToken = useCallback((tokenKey: string, value: string) => {
    const normalizedValue = normalizeHex(value);
    setInputValues(prev => ({ ...prev, [tokenKey]: normalizedValue }));
    // CSS에 직접 hex 값 적용 (OKLCH 변환 없이)
    setUserTokens(prev => ({ ...prev, [tokenKey]: normalizedValue }));
  }, []);



  // 색상 토큰들을 hex 값으로 변환하는 함수 (hex 기본)
  const colorTokensAsHex = useMemo(() => {
    return Object.entries(userTokens)
      .filter(([tokenKey]) =>
        COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key))
      )
      .reduce((acc, [tokenKey, tokenValue]) => {
        // 이미 hex 값이면 그대로 사용, OKLCH면 변환
        const hexValue = tokenValue.startsWith('#') ? tokenValue : oklchToHex(tokenValue);
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

      // 2. 토큰 코드도 hex 형식으로 기본값 초기화
      const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          acc[tokenKey] = oklchToHex(tokenValue);
        } else {
          acc[tokenKey] = tokenValue;
        }
        return acc;
      }, {} as UserTokens);
      setTokenCode(JSON.stringify(hexTokens, null, 2));

      // 3. 입력 필드들을 기본값으로 초기화
      const resetInputValues: TokenInputValues = {};
      Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          // OKLCH를 hex로 변환하여 리셋
          resetInputValues[tokenKey] = oklchToHex(tokenValue);
        }
      });
      setInputValues(resetInputValues);

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

  // 토큰 코드 저장 핸들러
  const handleSaveTokenCode = useCallback(() => {
    try {
      const parsedTokens = JSON.parse(tokenCode);
      setUserTokens(parsedTokens);

      // 입력 필드들도 업데이트 (hex 값으로)
      const newInputValues: TokenInputValues = {};
      Object.entries(parsedTokens).forEach(([tokenKey, tokenValue]) => {
        const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
        if (isColorToken) {
          // 이미 hex 값이면 그대로 사용, OKLCH면 변환
          const hexValue = (tokenValue as string).startsWith('#')
            ? tokenValue as string
            : oklchToHex(tokenValue as string);
          newInputValues[tokenKey] = isValidHex(hexValue) ? normalizeHex(hexValue) : '#000000';
        }
      });
      setInputValues(newInputValues);

      // CSS 변수에 적용
      const root = document.documentElement;
      Object.entries(parsedTokens).forEach(([tokenKey, tokenValue]) => {
        root.style.setProperty(tokenKey, tokenValue as string);
      });

      toast.success('토큰 코드가 저장되었습니다!', {
        description: '변경사항이 적용되었습니다.'
      });
    } catch (error) {
      toast.error('토큰 코드 저장에 실패했습니다.', {
        description: '올바른 JSON 형식인지 확인해주세요.'
      });
    }
  }, [tokenCode]);

  // 토큰 코드 초기화 핸들러
  const handleResetTokenCode = useCallback(() => {
    setUserTokens(DEFAULT_TOKENS);

    // hex 형식으로 토큰 코드 생성
    const hexTokens = Object.entries(DEFAULT_TOKENS).reduce((acc, [tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        acc[tokenKey] = oklchToHex(tokenValue);
      } else {
        acc[tokenKey] = tokenValue;
      }
      return acc;
    }, {} as UserTokens);
    setTokenCode(JSON.stringify(hexTokens, null, 2));

    // 입력 필드들도 기본값으로 초기화
    const resetInputValues: TokenInputValues = {};
    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      const isColorToken = COLOR_TOKEN_KEYS.some(key => tokenKey.includes(key));
      if (isColorToken) {
        resetInputValues[tokenKey] = oklchToHex(tokenValue);
      }
    });
    setInputValues(resetInputValues);

    // CSS 변수에 기본값 적용
    const root = document.documentElement;
    Object.entries(DEFAULT_TOKENS).forEach(([tokenKey, tokenValue]) => {
      root.style.setProperty(tokenKey, tokenValue);
    });

    toast.success('토큰 코드가 초기화되었습니다!', {
      description: '기본값으로 되돌아갔습니다.'
    });
  }, []);

  // 토큰 코드 저장 핸들러 (로컬 스토리지에 저장)
  const handleSaveTokenCodeToStorage = useCallback(() => {
    try {
      localStorage.setItem('userTokenCode', tokenCode);
      toast.success('토큰 코드가 저장되었습니다!', {
        description: '로컬 스토리지에 저장되었습니다.'
      });
    } catch (error) {
      toast.error('토큰 코드 저장에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  }, [tokenCode]);

  // 토큰 코드 복사 핸들러
  const handleCopyTokenCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tokenCode);
      toast.success('토큰 코드가 클립보드에 복사되었습니다!', {
        description: 'JSON 코드가 복사되었습니다.'
      });
    } catch (error) {
      console.error('Copy token code failed:', error);
      toast.error('클립보드 복사에 실패했습니다.', {
        description: '브라우저에서 클립보드 접근을 허용해주세요.'
      });
    }
  }, [tokenCode]);

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
      updateToken('--primary', oklchToHex(selectedColor.value));
    }
  }, [colorOptions, updateToken]);

  // customer 색상 변경 핸들러
  const handleCustomerColorSelect = useCallback((colorName: string) => {
    const selectedColor = customerColorOptions.find((option: ColorOption) => option.name === colorName);
    if (selectedColor) {
      updateToken('--customer', oklchToHex(selectedColor.value));
    }
  }, [customerColorOptions, updateToken]);

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

        // input 값도 hex로 업데이트
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
          <div className="header-left">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-sm transition-all duration-300 ${sidebarOpen ? '' : ''}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <PanelLeft />
            </Button>
            <h1 className="logo">테마 에디터</h1>
          </div>
          <div className="header-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="header-right">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon"><Settings /></Button>
              </SheetTrigger>
              <SheetContent className="gap-0">
                <SheetHeader>
                  <SheetTitle>토큰 관리</SheetTitle>
                  <SheetDescription>변경사항은 이 페이지에서만 미리보기됩니다.</SheetDescription>
                </SheetHeader>
                <Tabs defaultValue="settings" className="w-full px-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="settings">설정</TabsTrigger>
                    <TabsTrigger value="edit">편집</TabsTrigger>
                  </TabsList>

                  <TabsContent value="settings" className="space-y-4">
                    {/* 액션 버튼들 */}
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={handleSaveUserTokens} size="sm">
                        <CheckIcon /> 적용
                      </Button>
                      <Button onClick={handleResetUserTokens} variant="outline" size="sm">
                        <RefreshCcwIcon /> 초기화
                      </Button>
                    </div>
                    <ScrollArea className="h-[calc(100svh-250px)]">
                      <div className="flex flex-col gap-4 pr-4">
                        {Object.entries(colorTokensAsHex)
                          .map(([tokenKey, hexValue]) => (
                            tokenKey === '--primary' ? (
                              <div key={tokenKey} className="flex flex-col items-center gap-1">
                                <Label htmlFor={tokenKey} className="w-full text-xs">
                                  {tokenKey}
                                </Label>
                                <div className="w-full flex gap-2">
                                  <ColorPicker
                                    value={inputValues['--primary'] || oklchToHex(DEFAULT_TOKENS['--primary'])}
                                    onChange={(color) => updateToken('--primary', color)}
                                    size="small"
                                    predefine={colorOptions.map(color => oklchToHex(color.value))}
                                    className="flex-1"
                                  />
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
                                  <ColorPicker
                                    value={inputValues['--customer'] || oklchToHex(DEFAULT_TOKENS['--customer'])}
                                    onChange={(color) => updateToken('--customer', color)}
                                    size="small"
                                    predefine={customerColorOptions.map(color => oklchToHex(color.value))}
                                    className="flex-1"
                                  />
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
                                  <ColorPicker
                                    value={normalizeHex(inputValues[tokenKey] || hexValue)}
                                    onChange={(color) => updateToken(tokenKey, color)}
                                    size="small"
                                    className="flex-1"
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
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="edit" className="space-y-4">
                    {/* 액션 버튼들 */}
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={handleSaveTokenCode} size="sm">
                        <CheckIcon /> 적용
                      </Button>
                      <Button onClick={handleExportTokens} variant="outline" size="sm">
                        <Save /> 다운로드
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCopyTokenCode}>
                        <Copy /> Copy
                      </Button>
                      <Button onClick={handleResetTokenCode} variant="outline" size="sm">
                        <RefreshCcwIcon /> 초기화
                      </Button>
                    </div>
                    <Textarea
                      value={tokenCode}
                      onChange={(e) => setTokenCode(e.target.value)}
                      placeholder="토큰 JSON 코드를 입력하세요..."
                      className="h-[calc(100svh-350px)] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      JSON 형식으로 토큰을 직접 편집할 수 있습니다.
                      <br />• <strong>적용</strong>: 변경사항을 즉시 미리보기에 반영합니다.
                      <br />• <strong>다운로드</strong>: 토큰을 JSON 파일로 다운로드합니다.
                      <br />• <strong>Copy</strong>: 토큰 코드를 클립보드에 복사합니다.
                      <br />• <strong>초기화</strong>: 기본값으로 되돌립니다.
                    </p>
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <aside className="layout-aside">
          <ScrollArea className="h-[calc(100svh-4rem)]">
            <nav>
              <ul>
                {navigationMenu.map((item) => (
                  <li key={item.id}>
                    <Button variant="outline" size="icon" className="menu-icon">
                      <item.icon />
                    </Button>
                    <Link href={item.href} className="menu-link">
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Button variant="outline" size="icon" className="menu-icon">
                              <child.icon />
                            </Button>
                            <Link href={child.href} className="menu-link">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <ul>
                  {componentMenu.map((item) => (
                    <li key={item.id}>
                      <Button variant="outline" size="icon" className="menu-icon">
                        <item.icon />
                      </Button>
                      <Link href={item.href} className="menu-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ul>
            </nav>
          </ScrollArea>
        </aside>
        <div className="layout-tag">
          <ScrollArea className="h-[calc(100svh-4rem)]">
            <ul>
              {tagButtons.map((button) => (
                <li key={button.id}>
                  <Link href={button.href}>
                    <Button variant="outline" size="sm">
                      {button.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <main className="layout-main">
          <ScrollArea className="w-[calc(100svw-4rem)] h-[calc(100svh-8rem)]">
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
                        <div className="text-xs text-muted-foreground">text-4xl (fontSize: 2.25rem / fontWeight: 700 / lineHeight: 1.375)</div>
                        <div><h4 className="text-4xl font-bold leading-snug">The quick brown fox jumps over the lazy dog</h4></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-3xl (fontSize: 1.875rem / fontWeight: 700 / lineHeight: 1.375)</div>
                        <div><h5 className="text-3xl font-bold leading-snug">The quick brown fox jumps over the lazy dog</h5></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-2xl (fontSize: 1.5rem / fontWeight: 600 / lineHeight: 1.375)</div>
                        <div><h1 className="text-2xl font-semibold leading-snug">The quick brown fox jumps over the lazy dog</h1></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-xl (fontSize: 1.25rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.25))</div>
                        <div><h2 className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</h2></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-lg (fontSize: 1.125rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.125))</div>
                        <div><h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-base (fontSize: 1rem / fontWeight: 400 / lineHeight: calc(1.5 / 1) / letterSpacing: 0)</div>
                        <div><p className="text-base">The quick brown fox jumps over the lazy dog</p></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-sm (fontSize: 0.875rem / fontWeight: 400 / lineHeight: calc(1.25 / 0.875))</div>
                        <div><p className="text-sm">The quick brown fox jumps over the lazy dog</p></div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">text-xs (fontSize: 0.75rem / fontWeight: 400 / lineHeight: calc(1 / 0.75))</div>
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
                      <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                        8
                      </Badge>
                      <Badge
                        className="h-5 min-w-5 rounded-full px-1 tabular-nums"
                        variant="destructive"
                      >
                        99
                      </Badge>
                      <Badge
                        className="h-5 min-w-5 rounded-full px-1 tabular-nums"
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
                            <ScrollArea className="h-9 w-full pr-2">
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
                            <ScrollArea className="h-9 w-full pr-2">
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
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>
      </div>
    </>
  );
}

