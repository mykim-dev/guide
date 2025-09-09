'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { semanticColors, ColorToken, spacingTokens, SpacingToken, tailwindColors } from '@/lib/tokens';
import { designTokens, tokenCategories, getTextSizeTokens } from '@/lib/tokens/design-tokens';
import { Download, Copy, Eye, Code, Info } from 'lucide-react';

// rem을 px로 변환하는 함수 (기본 16px = 1rem)
const remToPx = (remValue: string): string => {
  const rem = parseFloat(remValue.replace('rem', ''));
  const px = Math.round(rem * 16);
  return `${remValue} | ${px}px`;
};

// 단위가 있는 값들을 변환하는 함수
const formatValue = (value: string): string => {
  if (value.includes('rem')) {
    return remToPx(value);
  }
  if (value.includes('px')) {
    return value;
  }
  if (value.includes('em')) {
    return value;
  }
  if (value.includes('calc(')) {
    return value;
  }
  // 숫자만 있는 경우 (font-weight, line-height 등)
  return value;
};

// 타이포그래피 토큰 타입 정의
interface TypographyToken {
  name: string;
  description?: string;
  fontSize?: string;
  lineHeight?: string;
}

// 타입 가드 함수들
const isColorToken = (token: unknown): token is ColorToken => {
  return typeof token === 'object' && token !== null && 'value' in token && 'name' in token;
};

const isSpacingToken = (token: unknown): token is SpacingToken => {
  return typeof token === 'object' && token !== null && 'value' in token && 'name' in token;
};

const isTypographyToken = (token: unknown): token is TypographyToken => {
  return typeof token === 'object' && token !== null && 'name' in token;
};

export default function TokensPage() {
  const handleExportTokens = () => {
    const tokensData = {
      colors: semanticColors,
      tailwindColors: tailwindColors,
      typography: getTextSizeTokens(),
      spacing: spacingTokens,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(tokensData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTokens = () => {
    const tokensData = {
      colors: semanticColors,
      tailwindColors: tailwindColors,
      typography: getTextSizeTokens(),
      spacing: spacingTokens,
    };

    navigator.clipboard.writeText(JSON.stringify(tokensData, null, 2));
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">디자인 토큰</h1>
            <p className="text-muted-foreground">
              디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 확인하세요.
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

      <Tabs defaultValue="palette" className="space-y-6">
        <TabsList className="flex w-full">
        <TabsTrigger value="design-tokens" className="flex-auto flex items-center gap-2">
            디자인 토큰
          </TabsTrigger>
          <TabsTrigger value="palette" className="flex-auto flex items-center gap-2">
            색상 팔레트
          </TabsTrigger>          
          <TabsTrigger value="typography" className="flex items-center gap-2">
            타이포그래피
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2">
            간격
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design-tokens" className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  디자인 토큰 가이드
                </CardTitle>
                <CardDescription>
                  각 디자인 토큰의 용도와 사용법을 확인하세요.
                </CardDescription>
              </CardHeader>
            </Card>

            {Object.entries(tokenCategories).map(([categoryKey, category]) => (
              <Card key={categoryKey}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-red-500">
                    {category.tokens.map(([tokenKey, token]) => (
                      <div key={tokenKey} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-bold text-sm">{token.name}</h4>
                              <code className="text-xs text-muted-foreground bg-muted px-1 py-0.5 rounded">
                                {tokenKey}
                              </code>
                            </div>
                            <p className="text-sm text-muted-foreground">{token.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {token.category === 'color' && (
                              <div className="flex items-center gap-1">
                                <div 
                                  className="w-6 h-6 rounded border shadow-sm"
                                  style={{ 
                                    backgroundColor: `var(${tokenKey})`,
                                    borderColor: 'var(--border)'
                                  }}
                                />
                              </div>
                            )}
                            {token.size && (
                              <Badge variant="outline" className="text-xs">
                                {formatValue(token.size)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-muted-foreground">사용처:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {token.usage.map((usage, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {usage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {token.examples && (
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">예시:</span>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                {token.examples.map((example, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="palette" className="space-y-6">
          {/* 기본 색상 팔레트 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">기본 색상 팔레트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {Object.entries(semanticColors).map(([category, scale]) => (
                <Card key={category} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize text-sm">{category}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {Object.keys(scale).length} 색조
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {category} 색상 팔레트
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {Object.entries(scale).map(([shade, token]) => {
                      if (!isColorToken(token)) {
                        return null;
                      }

                      return (
                        <div key={shade} className="flex items-center justify-between p-1">
                          <div className="flex items-center space-x-2 flex-1">
                            <div
                              className="w-4 h-4 rounded border border-border"
                              style={{ backgroundColor: token.value }}
                              title={`${token.name}: ${token.value}`}
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm truncate">{token.name}</span>
                              {/* <span className="text-xs text-muted-foreground font-mono">
                                  {shade}
                                </span> */}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground font-mono">
                            {token.value}
                          </span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tailwind CSS 색상 팔레트 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tailwind CSS 색상 팔레트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {Object.entries(tailwindColors).map(([colorName, colorScale]) => (
                <Card key={colorName} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize text-sm">{colorName}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {Object.keys(colorScale).length} 색조
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Tailwind CSS {colorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {Object.entries(colorScale).map(([shade, hexValue]) => (
                      <div key={shade} className="flex items-center justify-between p-1">
                        <div className="flex items-center space-x-2 flex-1">
                          <div
                            className="w-4 h-4 rounded border border-border"
                            style={{ backgroundColor: hexValue }}
                            title={`${colorName}-${shade}: ${hexValue}`}
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm truncate">{colorName}-{shade}</span>
                            {/* <span className="text-xs text-muted-foreground font-mono">
                                {shade}
                              </span> */}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground font-mono">
                          {hexValue}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>        
        
        <TabsContent value="typography" className="space-y-6">
          <div className="space-y-6">
            {/* Tailwind CSS v4 표준 Typography 클래스들 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tailwind CSS v4 Typography</CardTitle>
                <CardDescription>Tailwind CSS v4의 표준 font-size 클래스들</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.entries(getTextSizeTokens()).map(([key, token]) => {
                  if (!isTypographyToken(token)) {
                    return null;
                  }

                  return (
                    <div key={key} className={`my-4 ${token.name === 'Text Base' ? 'bg-gray-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
                          <Badge variant="outline" className="text-xs font-mono">
                            {key}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {token.fontSize && (
                            <Badge variant="secondary" className="text-xs">
                              font-size: {formatValue(token.fontSize)}
                            </Badge>
                          )}
                          {token.lineHeight && (
                            <Badge variant="outline" className="text-xs">
                              line-height: {formatValue(token.lineHeight)}
                            </Badge>
                          )}
                        </div>
                      </div>                      
                      
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">미리보기:</div>
                        <div className={`border-l-4 border-primary pl-4 ${key}`} style={{ fontSize: token.fontSize, lineHeight: token.lineHeight }}>
                          The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                      
                      <Separator />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(spacingTokens).map(([key, token]) => {
              if (!isSpacingToken(token)) {
                return null;
              }

              return (
                <Card key={key} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-mono">{token.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {formatValue(token.value)}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {token.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Visual representation */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="bg-primary rounded"
                            style={{ width: token.value, height: '1rem' }}
                          />
                          <span className="text-xs text-muted-foreground font-mono">
                            Width: {formatValue(token.value)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="bg-secondary rounded"
                            style={{ width: '1rem', height: token.value }}
                          />
                          <span className="text-xs text-muted-foreground font-mono">
                            Height: {formatValue(token.value)}
                          </span>
                        </div>
                      </div>

                      {/* Usage examples */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">사용 예시:</div>
                        <div className="space-y-1">
                          <div className="text-xs font-mono text-muted-foreground">
                            p-{token.name} → padding: {formatValue(token.value)}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            m-{token.name} → margin: {formatValue(token.value)}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            gap-{token.name} → gap: {formatValue(token.value)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
