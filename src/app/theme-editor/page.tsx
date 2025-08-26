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
import { defaultColors, ColorPalette, themeColors, ColorToken } from '@/lib/tokens/colors';
import { Download, Copy, RotateCcw } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { generateColorScale } from '@/lib/utils/color-utils';

export default function ThemeEditorPage() {
  const { colors, setColors, applyLocalTheme, resetLocalTheme } = useTheme();
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
  const [customColor, setCustomColor] = useState('#3b82f6');

  // 페이지 언마운트 시 로컬 테마 초기화
  useEffect(() => {
    return () => {
      if (resetLocalTheme) {
        resetLocalTheme();
      }
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
    if (resetLocalTheme) {
      resetLocalTheme();
    }
    setColors(defaultColors);
    setSelectedTheme('default');

    // Primary 색상만 기본값으로 적용 (Customer 색상은 건드리지 않음)
    if (applyLocalTheme) {
      applyLocalTheme(defaultColors, 'primary');
    }
  }, [setColors, resetLocalTheme, applyLocalTheme]);

  const handleCustomColorChange = useCallback((color: string) => {
    setCustomColor(color);
    const colorScale = generateColorScale(color);

    // Customer 색상만 독립적으로 관리 (전역 colors 상태 변경하지 않음)
    const customerTheme = {
      primary: colorScale,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      error: colors.error
    };

    if (applyLocalTheme) {
      // 로컬 테마 적용 (Customer 색상 사용)
      applyLocalTheme(customerTheme, 'customer');
    }
  }, [colors, applyLocalTheme]);

  const exportTheme = useCallback(() => {
    const themeConfig = {
      colors: colors,
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
  }, [colors]);

  const copyThemeCode = useCallback(() => {
    const tailwindConfig = `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)}
    }
  }
}`;

    navigator.clipboard.writeText(tailwindConfig);
  }, [colors]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 오늘부터 1주일 후
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">테마 에디터</h1>
        <p className="text-muted-foreground">
          색상 팔레트를 커스터마이징하고 Tailwind CSS 설정을 생성하세요.
          <br />
          <strong>변경사항은 이 페이지에서만 미리보기됩니다.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 transition-colors duration-300">
        <div>
          {/* 테마 선택 */}
          <Card>
            <CardHeader className='relative'>
              <CardTitle>테마 선택</CardTitle>
              <CardDescription className="break-words">
                Primary 색상을 빠르게 변경할 수 있는 미리 정의된 테마를 선택하세요.
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
            <CardContent>
              {/* 기본 테마 선택 (customer 제외) */}
              <div className="mb-8">
                <Label className="text-sm font-medium mb-2 block">기본 테마</Label>
                <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="테마를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeColors)
                      .filter(([themeName]) => themeName !== 'customer') // customer 제외
                      .map(([themeName, themeColor]) => {
                        const primary500 = themeColor.primary['500'] as ColorToken;
                        return (
                          <SelectItem key={themeName} value={themeName}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: primary500.value }}
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
              <div className="mb-8">
                <Label className="text-sm font-medium mb-2 block">Customer 색상</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-9 rounded border cursor-pointer border-none"
                    title="Customer 색상 변경"
                  />
                  <Button size="sm" onClick={() => handleCustomColorChange(customColor)}>색상 변경</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          {/* 컴포넌트 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle>컴포넌트 미리보기</CardTitle>
              <CardDescription>
                현재 테마가 컴포넌트에 어떻게 적용되는지 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 첫 번째 행: 기본 컴포넌트들 */}
              <div className="grid gap-6">
                {/* Buttons */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Buttons</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="customer">Customer</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Badges</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="customer">Customer</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Form</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Input */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    {/* Textarea */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here."
                        rows={3}
                      />
                    </div>
                    {/* Checkbox */}
                    <div className="space-y-2">
                      <Label>Checkbox</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={checkboxStates.terms}
                          onCheckedChange={(checked) =>
                            setCheckboxStates(prev => ({ ...prev, terms: checked as boolean }))
                          }
                        />
                        <Label htmlFor="terms" className="text-sm">Accept terms</Label>
                      </div>
                    </div>
                    {/* Radio Group */}
                    <div className="space-y-2">
                      <Label>Radio Group</Label>
                      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one" className="text-sm">Option One</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two" className="text-sm">Option Two</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    {/* Switch */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airplane-mode"
                        checked={switchStates.airplaneMode}
                        onCheckedChange={(checked) =>
                          setSwitchStates(prev => ({ ...prev, airplaneMode: checked as boolean }))
                        }
                      />
                      <Label htmlFor="airplane-mode" className="text-sm">Airplane Mode</Label>
                    </div>
                  </div>
                  {/* Progress & Slider */}
                  <div className="space-y-3">
                    <Label className="text-xs">Progress Bar</Label>
                    <Progress
                      value={progressValue}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs">Slider</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground">
                      Value: {sliderValue[0]}
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Calendar</Label>
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow-sm"
                      captionLayout="dropdown"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
