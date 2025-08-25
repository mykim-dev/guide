'use client';

import React, { useState, useEffect } from 'react';
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
import { useTheme } from '@/lib/themes/theme-provider';
import { defaultColors, ColorPalette, themeColors } from '@/lib/tokens/colors';
import { Download, Copy, RotateCcw, Palette } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { ColorPicker } from '@/components/ui/color-picker';
import { generateColorScale, saveUserTheme, getUserThemes, deleteUserTheme, UserTheme } from '@/lib/utils/color-utils';

export default function ThemeEditorPage() {
  const { colors, updateColor, setColors } = useTheme();
  const [progressValue, setProgressValue] = useState(33);
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
  const [userThemes, setUserThemes] = useState<Record<string, UserTheme>>({});
  const [showColorPicker, setShowColorPicker] = useState(false);

  // 초기 테마 설정
  React.useEffect(() => {
    document.documentElement.classList.add(`theme-${selectedTheme}`);
  }, []);

  // 사용자 테마 로드
  useEffect(() => {
    const savedUserThemes = getUserThemes();
    setUserThemes(savedUserThemes);
  }, []);

  const handleThemeChange = (themeName: string) => {
    const newTheme = themeColors[themeName];
    if (newTheme) {
      // Primary 색상만 변경
      const updatedColors = { ...colors, primary: newTheme.primary };
      setColors(updatedColors);
      setSelectedTheme(themeName);
      
      // CSS 클래스로 테마 적용
      document.documentElement.className = document.documentElement.className
        .replace(/theme-\w+/g, '')
        .trim();
      document.documentElement.classList.add(`theme-${themeName}`);
    }
  };

  const resetToDefault = () => {
    setColors(defaultColors);
    setSelectedTheme('default');
    
    // CSS 클래스로 테마 초기화
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.documentElement.classList.add('theme-default');
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    const colorScale = generateColorScale(color);
    const customTheme = { ...colors, primary: colorScale };
    
    // CSS 변수 적용 (사용자 색상만)
    const primaryColors = colorScale;
    Object.entries(primaryColors).forEach(([shade, token]) => {
      const colorToken = token as { value: string };
      document.documentElement.style.setProperty(`--primary-${shade}`, colorToken.value);
    });
    document.documentElement.style.setProperty('--primary', primaryColors['500'].value);
    document.documentElement.style.setProperty('--primary-foreground', primaryColors['50'].value);
    
    setColors(customTheme);
    setSelectedTheme('custom');
  };

  const handleSaveCustomTheme = (name: string) => {
    const colorScale = generateColorScale(customColor);
    const customTheme = { ...colors, primary: colorScale };
    saveUserTheme(name, customTheme);
    
    // 사용자 테마 목록 업데이트
    const updatedUserThemes = getUserThemes();
    setUserThemes(updatedUserThemes);
  };

  const handleUserThemeChange = (themeName: string) => {
    const userTheme = userThemes[themeName];
    if (userTheme) {
      setColors(userTheme.colors);
      setSelectedTheme(`user-${themeName}`);
      
      // CSS 변수 적용 (사용자 테마만)
      const primaryColors = userTheme.colors.primary;
      Object.entries(primaryColors).forEach(([shade, token]) => {
        const colorToken = token as { value: string };
        document.documentElement.style.setProperty(`--primary-${shade}`, colorToken.value);
      });
      document.documentElement.style.setProperty('--primary', primaryColors['500'].value);
      document.documentElement.style.setProperty('--primary-foreground', primaryColors['50'].value);
    }
  };

  const handleDeleteUserTheme = (themeName: string) => {
    deleteUserTheme(themeName);
    const updatedUserThemes = getUserThemes();
    setUserThemes(updatedUserThemes);
  };

  const exportTheme = () => {
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
  };

  const copyThemeCode = () => {
    const tailwindConfig = `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)}
    }
  }
}`;

    navigator.clipboard.writeText(tailwindConfig);
  };

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 오늘부터 1주일 후
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">테마 에디터</h1>
        <p className="text-muted-foreground">
          색상 팔레트를 커스터마이징하고 Tailwind CSS 설정을 생성하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 transition-colors duration-300">
        <div className="lg:col-span-3">
          {/* 테마 선택 */}
          <Card>
            <CardHeader className='relative'>
              <CardTitle>테마 선택</CardTitle>
              <CardDescription>
                Primary 색상을 빠르게 변경할 수 있는 미리 정의된 테마를 선택하세요.                
              </CardDescription>
              <div className="flex space-x-2 absolute -top-4 right-2">
                <Button onClick={exportTheme} variant="secondary">
                  <Download className="h-4 w-4" />
                  테마 내보내기
                </Button>
                <Button onClick={copyThemeCode} variant="secondary">
                  <Copy className="h-4 w-4" />
                  Tailwind 설정 복사
                </Button>
                <Button onClick={resetToDefault} variant="secondary">
                  <RotateCcw className="h-4 w-4" />
                  기본값으로 되돌리기
                </Button>
                <Button 
                  onClick={() => setShowColorPicker(!showColorPicker)} 
                  variant="secondary"
                >
                  <Palette className="h-4 w-4" />
                  사용자 색상
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* 사용자 색상 선택기 */}
              {showColorPicker && (
                <div className="mb-6">
                  <ColorPicker
                    color={customColor}
                    onChange={handleCustomColorChange}
                    onSave={handleSaveCustomTheme}
                    title="사용자 색상 선택"
                    showSaveButton={true}
                  />
                </div>
              )}

              {/* 사용자 테마 목록 */}
              {Object.keys(userThemes).length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">사용자 테마</Label>
                  <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                    {Object.entries(userThemes).map(([themeName, userTheme]) => {
                      const primary500 = userTheme.colors.primary['500'] as { value: string };
                      const isSelected = selectedTheme === `user-${themeName}`;
                      return (
                        <div key={themeName} className="relative group">
                          <button
                            onClick={() => handleUserThemeChange(themeName)}
                            className={`flex gap-x-1 p-1 pr-2 rounded border transition-colors ${
                              isSelected 
                                ? 'border-2 bg-primary/10' 
                                : 'border hover:bg-accent'
                            }`}
                            style={isSelected ? { borderColor: 'var(--primary)' } : {}}
                          >
                            <div
                              className="w-2 h-2 rounded-full border"
                              style={{ backgroundColor: primary500.value }}
                            />
                            <span className="text-sm font-medium">{themeName}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteUserTheme(themeName)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 기본 테마 목록 */}
              <div>
                <Label className="text-sm font-medium mb-2 block">기본 테마</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {Object.entries(themeColors).map(([themeName, themeColor]) => {
                    const primary500 = themeColor.primary['500'] as { value: string };
                    const isSelected = selectedTheme === themeName;
                    return (
                      <button
                        key={themeName}
                        onClick={() => handleThemeChange(themeName)}
                        className={`flex gap-x-1 p-1 pr-2 rounded border transition-colors ${
                          isSelected 
                            ? 'border-2 bg-primary/10' 
                            : 'border hover:bg-accent'
                        }`}
                        style={isSelected ? { borderColor: 'var(--primary)' } : {}}
                      >
                        <div
                          className="w-2 h-2 rounded-full border"
                          style={{ backgroundColor: primary500.value }}
                        />
                        <span className="text-sm font-medium capitalize">{themeName}</span>
                      </button>
                    );
                   })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {/* 컴포넌트 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle>컴포넌트 미리보기</CardTitle>
              <CardDescription>
                현재 테마가 컴포넌트에 어떻게 적용되는지 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
                {/* Buttons */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Buttons</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Primary Badge</Badge>
                    <Badge variant="secondary">Secondary Badge</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

              <div className="space-y-6">
                {/* Checkbox */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Checkbox</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={checkboxStates.terms}
                        onCheckedChange={(checked) => 
                          setCheckboxStates(prev => ({ ...prev, terms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="marketing" 
                        checked={checkboxStates.marketing}
                        onCheckedChange={(checked) => 
                          setCheckboxStates(prev => ({ ...prev, marketing: checked as boolean }))
                        }
                      />
                      <Label htmlFor="marketing" className="text-sm">Send me marketing emails</Label>
                    </div>
                  </div>
                </div>

                {/* Radio Group */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Radio Group</Label>
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Switch</Label>
                  <div className="space-y-2">
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
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Progress</Label>
                  <div className="space-y-2">
                    <Progress 
                      value={progressValue} 
                      className="w-full"
                    />                 
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Slider</Label>
                  <div className="space-y-2">
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
                </div>    
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here."
                  />
                </div>

                {/* Calendar */}
                <div className="space-y-2">
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
            </CardContent>
          </Card>          
        </div>
        <div>
          {/* 색상 팔레트 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle>색상 팔레트 미리보기</CardTitle>
              <CardDescription>
                모든 색상 카테고리의 50~950 색조를 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Primary */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Primary</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.primary).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Secondary */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Secondary</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.secondary).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Neutral */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Neutral</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.neutral).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Success */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Success</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.success).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Warning */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Warning</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.warning).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Error</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.error).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Info</Label>
                <div className="grid grid-cols-11 gap-x-1">
                  {Object.entries(colors.info).map(([shade, token]) => {
                    const colorToken = token as { value: string; name: string };
                    return (
                      <div
                        key={shade}
                        className="flex flex-col items-center w-full"
                      >
                        <div
                          className="w-full h-4 rounded border"
                          style={{ backgroundColor: colorToken.value }}
                          title={colorToken.name}
                        />
                        <span className="w-full text-xs text-center">{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
