'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { semanticColors, ColorToken, spacingTokens, SpacingToken, tailwindColors, defaultDesignTokens } from '@/lib/tokens';
import { useThemeEditor } from '@/lib/themes/theme-editor-provider';
import { designTokens, tokenCategories, getTextSizeTokens } from '@/lib/tokens/design-tokens';
import { Download, Copy, Eye, Code, Info, RotateCcw, CheckCircle, AlertCircle, Clipboard } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());

  // 테마 에디터 훅 사용
  const { resetLocalTheme, updateTokenGroup } = useThemeEditor();

  const handleExportTokens = async () => {
    try {
      setIsExporting(true);
      const tokensData = {
        colors: semanticColors,
        tailwindColors: tailwindColors,
        typography: getTextSizeTokens(),
        spacing: spacingTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Design System Tokens'
      };

      const blob = new Blob([JSON.stringify(tokensData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-tokens-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('토큰이 성공적으로 내보내졌습니다!', {
        description: 'design-tokens.json 파일이 다운로드되었습니다.'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('토큰 내보내기에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyTokens = async () => {
    try {
      setIsCopying(true);
      const tokensData = {
        colors: semanticColors,
        tailwindColors: tailwindColors,
        typography: getTextSizeTokens(),
        spacing: spacingTokens,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        description: 'Design System Tokens'
      };

      await navigator.clipboard.writeText(JSON.stringify(tokensData, null, 2));
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
  };

  const handleApplyTokens = async () => {
    try {
      setIsApplying(true);
      // 토큰을 CSS 변수로 적용하는 로직
      const root = document.documentElement;

      // 색상 토큰 적용
      Object.entries(semanticColors).forEach(([category, scale]) => {
        Object.entries(scale).forEach(([shade, token]) => {
          if (isColorToken(token)) {
            const cssVarName = `--${category}-${shade}`;
            root.style.setProperty(cssVarName, token.value);
          }
        });
      });

      // 스페이싱 토큰 적용
      Object.entries(spacingTokens).forEach(([key, token]) => {
        if (isSpacingToken(token)) {
          root.style.setProperty(key, token.value);
        }
      });

      toast.success('토큰이 적용되었습니다!', {
        description: '페이지가 새로운 토큰으로 업데이트되었습니다.'
      });
    } catch (error) {
      console.error('Apply failed:', error);
      toast.error('토큰 적용에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleResetTokens = async () => {
    try {
      setIsResetting(true);
      const root = document.documentElement;

      // 1. 테마 에디터의 로컬 테마 리셋 (사용자 커스텀 색상 제거)
      resetLocalTheme();

      // 2. 모든 커스텀 CSS 변수 제거
      const style = getComputedStyle(root);
      const cssVars = Array.from(style).filter(prop => prop.startsWith('--'));

      cssVars.forEach(cssVar => {
        root.style.removeProperty(cssVar);
      });

      // 3. 잠시 대기 후 defaultDesignTokens로 초기화
      await new Promise(resolve => setTimeout(resolve, 100));

      // 4. defaultDesignTokens의 색상 토큰 적용
      Object.entries(defaultDesignTokens.colors).forEach(([tokenName, tokenValue]) => {
        const cssVarName = `--${tokenName}`;
        root.style.setProperty(cssVarName, tokenValue);
      });

      // 5. defaultDesignTokens의 스페이싱 토큰 적용
      Object.entries(defaultDesignTokens.spacing).forEach(([tokenName, tokenValue]) => {
        const cssVarName = `--spacing-${tokenName}`;
        root.style.setProperty(cssVarName, tokenValue);
      });

      // 6. defaultDesignTokens의 타이포그래피 토큰 적용
      Object.entries(defaultDesignTokens.typography).forEach(([tokenName, tokenValue]) => {
        if (typeof tokenValue === 'object' && tokenValue.fontSize) {
          const cssVarName = `--text-${tokenName}`;
          root.style.setProperty(cssVarName, tokenValue.fontSize);
        }
      });

      // 7. 테마 에디터의 토큰 그룹도 초기화
      const defaultTokenGroup = {
        ...defaultDesignTokens.colors,
        ...Object.fromEntries(
          Object.entries(defaultDesignTokens.spacing).map(([key, value]) => [`--spacing-${key}`, value])
        ),
        ...Object.fromEntries(
          Object.entries(defaultDesignTokens.typography).map(([key, value]) => [
            `--text-${key}`,
            typeof value === 'object' && value.fontSize ? value.fontSize : value
          ])
        )
      };

      updateTokenGroup('all', defaultTokenGroup);

      toast.success('토큰이 defaultTokens로 완전 초기화되었습니다!', {
        description: '기본 디자인 토큰과 사용자 설정이 모두 초기화되었습니다.'
      });
    } catch (error) {
      console.error('Reset failed:', error);
      toast.error('토큰 초기화에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleCopyToken = async (tokenKey: string, tokenValue: string) => {
    try {
      await navigator.clipboard.writeText(tokenValue);
      setCopiedTokens(prev => new Set(prev).add(tokenKey));

      toast.success('토큰이 복사되었습니다!', {
        description: `${tokenKey}: ${tokenValue}`
      });

      // 2초 후 복사 상태 해제
      setTimeout(() => {
        setCopiedTokens(prev => {
          const newSet = new Set(prev);
          newSet.delete(tokenKey);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Token copy failed:', error);
      toast.error('토큰 복사에 실패했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
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
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleExportTokens}
              variant="outline"
              size="sm"
              disabled={isExporting}
            >
              {isExporting ? (
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
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
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {isCopying ? '복사 중...' : 'JSON 복사'}
            </Button>
            <Button
              onClick={handleApplyTokens}
              variant="default"
              size="sm"
              disabled={isApplying}
            >
              {isApplying ? (
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              {isApplying ? '적용 중...' : '토큰 적용'}
            </Button>
            <Button
              onClick={handleResetTokens}
              variant="destructive"
              size="sm"
              disabled={isResetting}
            >
              {isResetting ? (
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <RotateCcw className="h-4 w-4 mr-2" />
              )}
              {isResetting ? '초기화 중...' : 'Default Reset'}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleCopyToken(tokenKey, token.size || '')}
                            >
                              {copiedTokens.has(tokenKey) ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Clipboard className="h-3 w-3" />
                              )}
                            </Button>
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
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground font-mono">
                              {token.value}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleCopyToken(`${category}-${shade}`, token.value)}
                            >
                              {copiedTokens.has(`${category}-${shade}`) ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Clipboard className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground font-mono">
                            {hexValue}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleCopyToken(`${colorName}-${shade}`, hexValue)}
                          >
                            {copiedTokens.has(`${colorName}-${shade}`) ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clipboard className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleCopyToken(key, `${token.fontSize} / ${token.lineHeight}`)}
                          >
                            {copiedTokens.has(key) ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clipboard className="h-3 w-3" />
                            )}
                          </Button>
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
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {formatValue(token.value)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyToken(key, token.value)}
                        >
                          {copiedTokens.has(key) ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Clipboard className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
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
