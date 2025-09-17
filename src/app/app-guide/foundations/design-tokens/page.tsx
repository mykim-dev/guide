'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { designTokensLight, designTokensDark, designTokens } from '@/lib/tokens/design-tokens';
import { typographyTokens } from '@/lib/tokens/typography';
import { spacingTokens } from '@/lib/tokens/spacing';
import { tailwindColors } from '@/lib/tokens/colors';

// 타입 정의
interface TokenData {
  key: string;
  value: string;
  description?: string;
}

interface TokenTableProps {
  title: string;
  tokens: TokenData[];
  isCopied: boolean;
  onCopy: () => void;
}

interface LightDarkComparisonTableProps {
  title: string;
  lightTokens: TokenData[];
  darkTokens: TokenData[];
  lightCopied: boolean;
  darkCopied: boolean;
  onLightCopy: () => void;
  onDarkCopy: () => void;
}

// 색상인지 확인하는 함수
const isColorValue = (value: string): boolean => {
  return /^(#|rgb|hsl|var\(|rgba)/.test(value);
};

// 색상 미리보기 컴포넌트
const ColorPreview = ({ value, tokenKey }: { value: string; tokenKey: string }) => {
  if (!isColorValue(value)) {
    return <span className="text-muted-foreground text-xs">-</span>;
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className="w-8 h-8 rounded border-2 border-border shadow-sm"
        style={{ 
          backgroundColor: value.startsWith('var(') ? `var(${tokenKey})` : value 
        }}
        title={value}
      />
    </div>
  );
};

// 토큰 테이블 컴포넌트
const TokenTable = ({ title, tokens, isCopied, onCopy }: TokenTableProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3"
          onClick={onCopy}
        >
          {isCopied ? (
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          ) : (
            <Clipboard className="h-4 w-4 mr-2" />
          )}
          {isCopied ? '복사됨' : '복사'}
        </Button>
      </div>
      <div className="relative">
        <ScrollArea className="h-96 w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">토큰명</TableHead>
                <TableHead className="w-[80px]">색상</TableHead>
                <TableHead className="w-[300px]">값</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.key}>
                  <TableCell className="font-mono text-sm">
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      {token.key}
                    </code>
                  </TableCell>
                  <TableCell className="text-center">
                    <ColorPreview value={token.value} tokenKey={token.key} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      {token.value}
                    </code>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {token.description || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

// 라이트/다크 비교 테이블 컴포넌트
const LightDarkComparisonTable = ({ 
  title, 
  lightTokens, 
  darkTokens,
  lightCopied,
  darkCopied,
  onLightCopy,
  onDarkCopy
}: LightDarkComparisonTableProps) => {
  // 모든 토큰 키를 수집
  const allKeys = new Set([...lightTokens.map(t => t.key), ...darkTokens.map(t => t.key)]);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3"
            onClick={onLightCopy}
          >
            <div className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-2"></div>
            {lightCopied ? (
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <Clipboard className="h-4 w-4 mr-1" />
            )}
            Light
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3"
            onClick={onDarkCopy}
          >
            <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-600 mr-2"></div>
            {darkCopied ? (
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <Clipboard className="h-4 w-4 mr-1" />
            )}
            Dark
          </Button>
        </div>
      </div>
      <div className="relative">
        <ScrollArea className="h-96 w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">토큰명</TableHead>
                <TableHead className="w-[60px]">Light</TableHead>
                <TableHead className="w-[200px]">Light 값</TableHead>
                <TableHead className="w-[60px]">Dark</TableHead>
                <TableHead className="w-[200px]">Dark 값</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from(allKeys).map((key) => {
                const lightToken = lightTokens.find(t => t.key === key);
                const darkToken = darkTokens.find(t => t.key === key);
                
                return (
                  <TableRow key={key}>
                    <TableCell className="font-mono text-sm">
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {key}
                      </code>
                    </TableCell>
                    
                    {/* Light 색상 */}
                    <TableCell className="text-center">
                      {lightToken ? (
                        <div className="flex items-center justify-center">
                          <div
                            className="w-6 h-6 rounded border border-border shadow-sm"
                            style={{ 
                              backgroundColor: lightToken.value.startsWith('var(') 
                                ? `var(${key})` 
                                : lightToken.value 
                            }}
                            title={lightToken.value}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    
                    {/* Light 값 */}
                    <TableCell className="font-mono text-sm">
                      {lightToken ? (
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {lightToken.value}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    
                    {/* Dark 색상 */}
                    <TableCell className="text-center">
                      {darkToken && isColorValue(darkToken.value) ? (
                        <div className="flex items-center justify-center">
                          <div
                            className="w-6 h-6 rounded border border-border shadow-sm"
                            style={{ 
                              backgroundColor: darkToken.value.startsWith('var(') 
                                ? `var(${key})` 
                                : darkToken.value 
                            }}
                            title={darkToken.value}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    
                    {/* Dark 값 */}
                    <TableCell className="font-mono text-sm">
                      {darkToken ? (
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {darkToken.value}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    
                    {/* 설명 */}
                    <TableCell className="text-sm text-muted-foreground">
                      {lightToken?.description || darkToken?.description || '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

// 토큰 데이터 변환 함수들
const getDesignTokensLightData = (): TokenData[] => {
  return Object.entries(designTokensLight).map(([key, value]) => ({
    key,
    value,
    description: designTokens[key]?.description || ''
  }));
};

const getDesignTokensDarkData = (): TokenData[] => {
  return Object.entries(designTokensDark).map(([key, value]) => ({
    key,
    value,
    description: designTokens[key]?.description || ''
  }));
};

const getTypographyTokensData = (): TokenData[] => {
  return Object.entries(typographyTokens).map(([key, token]) => ({
    key,
    value: token.value,
    description: token.description.join(', ')
  }));
};

const getSpacingTokensData = (): TokenData[] => {
  return Object.entries(spacingTokens).map(([key, token]) => ({
    key,
    value: token.value,
    description: token.description || ''
  }));
};

const getColorsData = (): TokenData[] => {
  return Object.entries(tailwindColors).flatMap(([colorName, colorScale]) =>
    Object.entries(colorScale).map(([shade, hexValue]) => ({
      key: `${colorName}-${shade}`,
      value: hexValue,
      description: `Tailwind ${colorName} ${shade}`
    }))
  );
};

// 코드 생성 함수들
const generateCodeFromTokens = (tokens: Record<string, string>, exportName: string): string => {
  const entries = Object.entries(tokens)
    .map(([key, value]) => `  '${key}': '${value}'`)
    .join(',\n');
  
  return `export const ${exportName} = {\n${entries}\n};`;
};

const generateDesignTokensLightCode = () => generateCodeFromTokens(designTokensLight, 'designTokensLight');
const generateDesignTokensDarkCode = () => generateCodeFromTokens(designTokensDark, 'designTokensDark');

const generateTypographyTokensCode = () => {
  return `export interface TypographyToken {
  name: string;
  description: string[];
  category: 'font-size' | 'font-weight' | 'letter-spacing' | 'line-height';
  value: string;
  class: string[];
}

export const typographyTokens: TypographyScale = {
${Object.entries(typographyTokens).map(([key, token]) => {
  return `  '${key}': {
    name: '${token.name}',
    description: [${token.description.map(d => `'${d}'`).join(', ')}],
    category: '${token.category}',
    value: '${token.value}',
    class: [${token.class.map(c => `'${c}'`).join(', ')}]
  }`;
}).join(',\n')}
};`;
};

const generateSpacingTokensCode = () => {
  return `export interface SpacingToken {
  name: string;
  value: string;
  description?: string;
}

export const spacingTokens: SpacingScale = {
${Object.entries(spacingTokens).map(([key, token]) => {
  return `  '${key}': { 
    name: '${token.name}', 
    value: '${token.value}'${token.description ? `, description: '${token.description}'` : ''} 
  }`;
}).join(',\n')}
};`;
};

const generateColorsCode = () => {
  return `export const tailwindColors = {
${Object.entries(tailwindColors).map(([colorName, colorScale]) => {
  return `  ${colorName}: {
${Object.entries(colorScale).map(([shade, hexValue]) => `    ${shade}: '${hexValue}'`).join(',\n')}
  }`;
}).join(',\n')}
};`;
};

export default function DesignTokensPage() {
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());

  const handleCopyCode = useCallback(async (codeKey: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTokens(prev => new Set(prev).add(codeKey));
      
      toast.success('코드가 복사되었습니다!', {
        description: `${codeKey} 코드를 클립보드에 복사했습니다.`
      });

      // 2초 후 복사 상태 해제
      setTimeout(() => {
        setCopiedTokens(prev => {
          const newSet = new Set(prev);
          newSet.delete(codeKey);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      toast.error('코드 복사에 실패했습니다.');
    }
  }, []);

  return (
    <Tabs defaultValue="design-tokens" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="design-tokens">디자인 토큰</TabsTrigger>
        <TabsTrigger value="typography">타이포그래피</TabsTrigger>
        <TabsTrigger value="spacing">간격</TabsTrigger>
        <TabsTrigger value="colors">색상</TabsTrigger>
      </TabsList>

      <TabsContent value="design-tokens" className="mt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">디자인 토큰</h2>
            <p className="text-muted-foreground">
              CSS 변수로 정의된 디자인 토큰들입니다. 라이트/다크 테마를 한눈에 비교할 수 있습니다.
            </p>
          </div>
          
          <LightDarkComparisonTable
            title="design-tokens.ts"
            lightTokens={getDesignTokensLightData()}
            darkTokens={getDesignTokensDarkData()}
            lightCopied={copiedTokens.has('design-tokens-light')}
            darkCopied={copiedTokens.has('design-tokens-dark')}
            onLightCopy={() => handleCopyCode('design-tokens-light', generateDesignTokensLightCode())}
            onDarkCopy={() => handleCopyCode('design-tokens-dark', generateDesignTokensDarkCode())}
          />
        </div>
      </TabsContent>

      <TabsContent value="typography" className="mt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">타이포그래피 토큰</h2>
            <p className="text-muted-foreground">
              폰트 크기, 두께, 줄 간격, 자간을 정의한 타이포그래피 토큰들입니다.
            </p>
          </div>
          <TokenTable
            title="typography.ts"
            tokens={getTypographyTokensData()}
            isCopied={copiedTokens.has('typography')}
            onCopy={() => handleCopyCode('typography', generateTypographyTokensCode())}
          />
        </div>
      </TabsContent>

      <TabsContent value="spacing" className="mt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">간격 토큰</h2>
            <p className="text-muted-foreground">
              패딩, 마진, 갭 등에 사용되는 간격 토큰들입니다.
            </p>
          </div>
          <TokenTable
            title="spacing.ts"
            tokens={getSpacingTokensData()}
            isCopied={copiedTokens.has('spacing')}
            onCopy={() => handleCopyCode('spacing', generateSpacingTokensCode())}
          />
        </div>
      </TabsContent>

      <TabsContent value="colors" className="mt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">색상 팔레트</h2>
            <p className="text-muted-foreground">
              Tailwind CSS의 공식 색상 팔레트입니다.
            </p>
          </div>
          <TokenTable
            title="colors.ts"
            tokens={getColorsData()}
            isCopied={copiedTokens.has('colors')}
            onCopy={() => handleCopyCode('colors', generateColorsCode())}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
