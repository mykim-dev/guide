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
import { defaultColors, themeColors } from '@/lib/tokens/colors';
import { oklchToHex, hexToOklch } from '@/lib/utils/color-utils';
import { Download, Copy, RotateCcw, Palette, Type, Ruler } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Separator } from '@radix-ui/react-separator';

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
    tokens,
    updateToken,
    updateTokenGroup,
    generateColorScale
  } = useThemeEditor(); // 테마 에디터 기능

  const [progressValue] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [checkboxStates, setCheckboxStates] = useState({
    terms: true,
    marketing: false,
  });
  const [radioValue, setRadioValue] = useState('option-one');
  const [switchStates, setSwitchStates] = useState({
    airplaneMode: true
  });
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [customColor, setCustomColor] = useState('oklch(0.5 0.2 250)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 페이지 언마운트 시 로컬 테마 초기화
  useEffect(() => {
    return () => {
      resetLocalTheme();
    };
  }, [resetLocalTheme]);

  const handleThemeChange = useCallback((themeName: string) => {
    // 기본 테마 선택 시: Primary 색상만 변경하고 Customer 색상은 건드리지 않음
    const newTheme = themeColors[themeName];
    if (newTheme && applyLocalTheme) {
      // Primary 색상만 업데이트
      const updatedColors = { ...colors, primary: newTheme.primary };
      setColors(updatedColors);
      setSelectedTheme(themeName);

      // Primary 색상만 적용 (Customer 색상은 전혀 건드리지 않음)
      applyLocalTheme(updatedColors, 'primary');
    }
  }, [colors, setColors, applyLocalTheme]);

  const resetToDefault = useCallback(() => {
    resetLocalTheme();
    setColors(defaultColors);
    setSelectedTheme('default');

    // Primary 색상만 기본값으로 적용 (Customer 색상은 건드리지 않음)
    applyLocalTheme(defaultColors, 'primary');
  }, [setColors, resetLocalTheme, applyLocalTheme]);

  const handleCustomColorChange = useCallback((color: string) => {
    setCustomColor(color);
    generateColorScale(color);
  }, [generateColorScale]);

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

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 오늘부터 1주일 후
  });

  // 토큰 카테고리별 그룹화
  const tokenCategories = {
    color: Object.entries(tokens).filter(([_, token]) => token.category === 'color'),
    spacing: Object.entries(tokens).filter(([_, token]) => token.category === 'spacing'),
    typography: Object.entries(tokens).filter(([_, token]) => token.category === 'typography'),
    border: Object.entries(tokens).filter(([_, token]) => token.category === 'border'),
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 토큰 편집 패널 */}
        <div className="space-y-4">
          {/* 테마 설정 */}
          <Card>
            <CardHeader className='relative'>
              <CardTitle>테마 설정</CardTitle>
              <CardDescription className="break-words">
                기본 테마와 Customer 색상을 설정하세요.
              </CardDescription>
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
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 기본 테마 선택 */}
              <div>
                <Label className="text-sm font-medium mb-2 block">기본 테마</Label>
                <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="테마를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeColors)
                      .filter(([themeName]) => themeName !== 'customer') // customer 제외
                      .map(([themeName, themeColor]) => {
                        const primary500 = themeColor.primary['500'] as any;
                        return (
                          <SelectItem key={themeName} value={themeName}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: primary500?.value || '#000' }}
                              />
                              <span className="capitalize">{themeName}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer 색상 */}
              <div>
                <Label className="block text-sm font-medium">Customer 색상</Label>
                <small className="block text-xs mb-2">Button, Badge 의 variant="customer" 에 적용됩니다.</small>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={mounted ? oklchToHex(customColor) : '#000'}
                    onChange={(e) => setCustomColor(hexToOklch(e.target.value))}
                    className="w-12 h-8 rounded border cursor-pointer border-none"
                    title="Customer 색상 변경"
                  />
                  <Button variant="outline" size="sm" onClick={() => handleCustomColorChange(customColor)}>
                    색상 변경
                  </Button>
                </div>
              </div>

              {/* 현재 테마 상태 */}
              <div>
                <Label className="block text-sm font-medium">현재 테마</Label>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm">
                    <strong>모드:</strong> {theme === 'system' ? '시스템' : theme === 'light' ? '라이트' : '다크'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    토큰 변경사항이 실시간으로 적용됩니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 색상 토큰 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                색상 토큰
              </CardTitle>
              <CardDescription>
                브랜드 색상과 UI 색상을 편집하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenCategories.color.map(([tokenName, token]) => (
                <div key={tokenName} className="space-y-2">
                  <Label className="text-sm font-medium">{token.name}</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={mounted ? oklchToHex(token.value) : '#000'}
                      onChange={(e) => updateToken(tokenName, hexToOklch(e.target.value))}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(tokenName, e.target.value)}
                      className="flex-1 text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{token.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 간격 토큰 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                간격 토큰
              </CardTitle>
              <CardDescription>
                여백과 간격을 조정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenCategories.spacing.map(([tokenName, token]) => (
                <div key={tokenName} className="space-y-2">
                  <Label className="text-sm font-medium">{token.name}</Label>
                  <Input
                    value={token.value}
                    onChange={(e) => updateToken(tokenName, e.target.value)}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">{token.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 타이포그래피 토큰 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                타이포그래피
              </CardTitle>
              <CardDescription>
                폰트 크기와 두께를 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenCategories.typography.map(([tokenName, token]) => (
                <div key={tokenName} className="space-y-2">
                  <Label className="text-sm font-medium">{token.name}</Label>
                  <Input
                    value={token.value}
                    onChange={(e) => updateToken(tokenName, e.target.value)}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">{token.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 테두리 토큰 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                테두리
              </CardTitle>
              <CardDescription>
                테두리 반지름과 색상을 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenCategories.border.map(([tokenName, token]) => (
                <div key={tokenName} className="space-y-2">
                  <Label className="text-sm font-medium">{token.name}</Label>
                  {tokenName === '--border' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={mounted ? oklchToHex(token.value) : '#000'}
                        onChange={(e) => updateToken(tokenName, hexToOklch(e.target.value))}
                        className="w-12 h-8 rounded border cursor-pointer"
                      />
                      <Input
                        value={token.value}
                        onChange={(e) => updateToken(tokenName, e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  ) : (
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(tokenName, e.target.value)}
                      className="text-sm"
                    />
                  )}
                  <p className="text-xs text-muted-foreground">{token.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 실시간 미리보기 */}
        <div className="lg:col-span-3">
          {/* 컴포넌트 미리보기 */}
          <div className="border border-input rounded-xl p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* typography display */}
              <div>
                <div className="text-xs">display-2xl (fontSize: 4.5rem / fontWeight: 700 / height: 1.1 / letterSpacing: -0.025em)</div>
                <div><h1 className="display-2xl">The quick brown fox jumps over the lazy dog</h1></div>
              </div>
              <div>
                <div className="text-xs">display-xl (fontSize: 4rem / fontWeight: 700 / height: 1.1 / letterSpacing: -0.025em)</div>
                <div><h2 className="display-xl">The quick brown fox jumps over the lazy dog</h2></div>
              </div>
              <div>
                <div className="text-xs">display-lg (fontSize: 3.5rem / fontWeight: 700 / height: 1.2 / letterSpacing: -0.025em)</div>
                <div><h3 className="display-lg">The quick brown fox jumps over the lazy dog</h3></div>
              </div>
              <div>
                <div className="text-xs">display-md (fontSize: 3rem / fontWeight: 700 / height: 1.2 / letterSpacing: -0.025em)</div>
                <div><h4 className="display-md">The quick brown fox jumps over the lazy dog</h4></div>
              </div>
              <div>
                <div className="text-xs">display-sm (fontSize: 2.5rem / fontWeight: 700 / height: 1.3 / letterSpacing: -0.025em)</div>
                <div><h5 className="display-sm">The quick brown fox jumps over the lazy dog</h5></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* typography Heading */}
              <div>
                <div className="text-xs">heading-xl (fontSize: 2rem / fontWeight: 600 / height: 1.3 / letterSpacing: -0.025em)</div>
                <div><h1 className="heading-xl">The quick brown fox jumps over the lazy dog</h1></div>
              </div>
              <div>
                <div className="text-xs">heading-lg (fontSize: 1.75rem / fontWeight: 600 / height: 1.4 / letterSpacing: -0.025em)</div>
                <div><h2 className="heading-lg">The quick brown fox jumps over the lazy dog</h2></div>
              </div>
              <div>
                <div className="text-xs">heading-md (fontSize: 1.5rem / fontWeight: 600 / height: 1.4 / letterSpacing: -0.025em)</div>
                <div><h3 className="heading-md">The quick brown fox jumps over the lazy dog</h3></div>
              </div>
              <div>
                <div className="text-xs">heading-sm (fontSize: 1.25rem / fontWeight: 600 / height: 1.5 / letterSpacing: -0.025em)</div>
                <div><h4 className="heading-sm">The quick brown fox jumps over the lazy dog</h4></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* typography body */}
              <div>
                <div className="text-xs">body-xl (fontSize: 1.25rem / fontWeight: 400 / height: 1.6)</div>
                <div><p className="body-xl">The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs">body-lg (fontSize: 1.125rem / fontWeight: 400 / height: 1.6)</div>
                <div><p className="body-lg">The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs">body-md (fontSize: 1rem / fontWeight: 400 / height: 1.6)</div>
                <div><p className="body-md">The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs">body-sm (fontSize: 0.875rem / fontWeight: 400 / height: 1.6)</div>
                <div><p className="body-sm">The quick brown fox jumps over the lazy dog</p></div>
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
        </div>
      </div>
    </div>
  );
}


