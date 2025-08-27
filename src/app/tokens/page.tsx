'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { defaultColors, ColorToken, typographyTokens, spacingTokens, SpacingToken, TypographyToken, tailwindColors } from '@/lib/tokens';
import { designTokens, tokenCategories } from '@/lib/tokens/design-tokens';
import { Download, Copy, Eye, Code, Info } from 'lucide-react';

// 타입 가드 함수들
const isColorToken = (token: unknown): token is ColorToken => {
  return typeof token === 'object' && token !== null && 'value' in token && 'name' in token;
};

const isSpacingToken = (token: unknown): token is SpacingToken => {
  return typeof token === 'object' && token !== null && 'value' in token && 'name' in token;
};

const isTypographyToken = (token: unknown): token is TypographyToken => {
  return typeof token === 'object' && token !== null && 'fontSize' in token && 'name' in token;
};

export default function TokensPage() {
  const handleExportTokens = () => {
    const tokensData = {
      colors: defaultColors,
      tailwindColors: tailwindColors,
      typography: typographyTokens,
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
      colors: defaultColors,
      tailwindColors: tailwindColors,
      typography: typographyTokens,
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
          <TabsTrigger value="palette" className="flex-auto flex items-center gap-2">
            색상 팔레트
          </TabsTrigger>
          <TabsTrigger value="design-tokens" className="flex-auto flex items-center gap-2">
            디자인 토큰
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            타이포그래피
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2">
            간격
          </TabsTrigger>
        </TabsList>

        <TabsContent value="palette" className="space-y-6">
          {/* 기본 색상 팔레트 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">기본 색상 팔레트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {Object.entries(defaultColors).map(([category, scale]) => (
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
                              <h4 className="font-medium text-sm">{token.name}</h4>
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
                                {token.size}
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
        
        <TabsContent value="typography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_25%_30%] gap-6">
            {/* Display Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Display</CardTitle>
                <CardDescription>큰 제목과 헤드라인용 타이포그래피</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(typographyTokens)
                  .filter(([key]) => key.startsWith('display'))
                  .map(([key, token]) => {
                    if (!isTypographyToken(token)) {
                      return null;
                    }

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {token.fontSize}
                          </Badge>
                        </div>
                        <div
                          className="border-l-4 border-primary pl-4"
                          style={{
                            fontSize: token.fontSize,
                            lineHeight: token.lineHeight,
                            fontWeight: token.fontWeight,
                            letterSpacing: token.letterSpacing,
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Weight: {token.fontWeight}</div>
                          <div>Height: {token.lineHeight}</div>
                          {token.letterSpacing && (
                            <div>Spacing: {token.letterSpacing}</div>
                          )}
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Heading Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Heading</CardTitle>
                <CardDescription>섹션 제목용 타이포그래피</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(typographyTokens)
                  .filter(([key]) => key.startsWith('heading'))
                  .map(([key, token]) => {
                    if (!isTypographyToken(token)) {
                      return null;
                    }

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {token.fontSize}
                          </Badge>
                        </div>
                        <div
                          className="border-l-4 border-secondary pl-4"
                          style={{
                            fontSize: token.fontSize,
                            lineHeight: token.lineHeight,
                            fontWeight: token.fontWeight,
                            letterSpacing: token.letterSpacing,
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Weight: {token.fontWeight}</div>
                          <div>Height: {token.lineHeight}</div>
                          {token.letterSpacing && (
                            <div>Spacing: {token.letterSpacing}</div>
                          )}
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Body Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Body</CardTitle>
                <CardDescription>본문 텍스트용 타이포그래피</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(typographyTokens)
                  .filter(([key]) => key.startsWith('body'))
                  .map(([key, token]) => {
                    if (!isTypographyToken(token)) {
                      return null;
                    }

                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-medium text-muted-foreground">{token.name}</strong>
                          <Badge variant="outline" className="text-xs">
                            {token.fontSize}
                          </Badge>
                        </div>
                        <div
                          className="border-l-4 border-muted pl-4"
                          style={{
                            fontSize: token.fontSize,
                            lineHeight: token.lineHeight,
                            fontWeight: token.fontWeight,
                            letterSpacing: token.letterSpacing,
                          }}
                        >
                          <p className="mb-2">
                            The quick brown fox jumps over the lazy dog. This is a sample paragraph to demonstrate how the typography token looks in a real context.
                          </p>
                          <p className="text-muted-foreground">
                            This is a second paragraph to show how multiple lines of text appear with this typography style.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>Weight: {token.fontWeight}</div>
                          <div>Height: {token.lineHeight}</div>
                          {token.letterSpacing && (
                            <div>Spacing: {token.letterSpacing}</div>
                          )}
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
                        {token.value}
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
                            Width: {token.value}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="bg-secondary rounded"
                            style={{ width: '1rem', height: token.value }}
                          />
                          <span className="text-xs text-muted-foreground font-mono">
                            Height: {token.value}
                          </span>
                        </div>
                      </div>

                      {/* Usage examples */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">사용 예시:</div>
                        <div className="space-y-1">
                          <div className="text-xs font-mono text-muted-foreground">
                            p-{token.name} → padding: {token.value}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            m-{token.name} → margin: {token.value}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">
                            gap-{token.name} → gap: {token.value}
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
