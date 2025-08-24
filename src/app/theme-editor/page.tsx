'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/lib/themes/theme-provider';
import { defaultColors, ColorPalette } from '@/lib/tokens/colors';
import { Download, Copy, RotateCcw } from 'lucide-react';

export default function ThemeEditorPage() {
  const { colors, updateColor, setColors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<keyof ColorPalette>('primary');

  const handleColorChange = (category: keyof ColorPalette, shade: string, value: string) => {
    updateColor(category, shade, value);
  };

  const resetToDefault = () => {
    setColors(defaultColors);
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">테마 에디터</h1>
        <p className="text-muted-foreground">
          색상 팔레트를 커스터마이징하고 Tailwind CSS 설정을 생성하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 색상 에디터 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>색상 팔레트</CardTitle>
              <CardDescription>
                각 색상 카테고리의 색조를 조정하여 커스텀 테마를 만들어보세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as keyof ColorPalette)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="primary">Primary</TabsTrigger>
                  <TabsTrigger value="secondary">Secondary</TabsTrigger>
                  <TabsTrigger value="neutral">Neutral</TabsTrigger>
                  <TabsTrigger value="success">Success</TabsTrigger>
                </TabsList>

                {Object.entries(colors).map(([category, scale]) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(scale).map(([shade, token]) => (
                        <div key={shade} className="space-y-2">
                          <Label className="text-xs font-mono">{token.name}</Label>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: token.value }}
                            />
                            <Input
                              value={token.value}
                              onChange={(e) => handleColorChange(category as keyof ColorPalette, shade, e.target.value)}
                              className="text-xs"
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 미리보기 및 액션 */}
        <div className="space-y-6">
          {/* 색상 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle>색상 미리보기</CardTitle>
              <CardDescription>
                현재 설정된 색상들이 어떻게 보이는지 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary</Label>
                <div className="flex space-x-1">
                  {Object.entries(colors.primary).slice(0, 5).map(([shade, token]) => (
                    <div
                      key={shade}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: token.value }}
                      title={token.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Secondary</Label>
                <div className="flex space-x-1">
                  {Object.entries(colors.secondary).slice(0, 5).map(([shade, token]) => (
                    <div
                      key={shade}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: token.value }}
                      title={token.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Neutral</Label>
                <div className="flex space-x-1">
                  {Object.entries(colors.neutral).slice(0, 5).map(([shade, token]) => (
                    <div
                      key={shade}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: token.value }}
                      title={token.name}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 컴포넌트 미리보기 */}
          <Card>
            <CardHeader>
              <CardTitle>컴포넌트 미리보기</CardTitle>
              <CardDescription>
                현재 테마가 컴포넌트에 어떻게 적용되는지 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                  Primary Badge
                </div>
                <div className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                  Secondary Badge
                </div>
              </div>

              <div className="space-y-2">
                <Input placeholder="Input field" />
                <div className="h-2 bg-primary rounded"></div>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <Card>
            <CardHeader>
              <CardTitle>액션</CardTitle>
              <CardDescription>
                테마를 내보내거나 기본값으로 되돌리세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={exportTheme} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                테마 내보내기
              </Button>
              <Button onClick={copyThemeCode} className="w-full" variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Tailwind 설정 복사
              </Button>
              <Button onClick={resetToDefault} className="w-full" variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                기본값으로 되돌리기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
