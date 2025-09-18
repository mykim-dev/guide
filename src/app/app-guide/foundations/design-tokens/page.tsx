'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { designTokensLight, designTokensDark, designTokens } from '@/lib/tokens/design-tokens';

// 타입 정의
interface TokenData {
  key: string;
  value: string;
  description?: string;
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
        <h3 className="text-lg font-semibold"></h3>
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
        <ScrollArea className="h-[calc(100svh-360px)] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-3/12">토큰명</TableHead>
                <TableHead className="w-2/12"></TableHead>
                <TableHead className="w-1/12 text-center">Light</TableHead>                
                <TableHead className="w-1/12 text-center">Dark</TableHead>
                <TableHead className="w-2/12"></TableHead>
                <TableHead className="w-3/12">설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from(allKeys).map((key) => {
                const lightToken = lightTokens.find(t => t.key === key);
                const darkToken = darkTokens.find(t => t.key === key);

                return (
                  <TableRow key={key}>
                    <TableCell className="text-sm">
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {key}
                      </code>
                    </TableCell>

                    {/* Light 값 */}
                    <TableCell className="text-sm text-right">
                      {lightToken ? (
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {lightToken.value}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
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
                    <TableCell className="text-sm">
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

// 코드 생성 함수들
const generateCodeFromTokens = (tokens: Record<string, string>, exportName: string): string => {
  const entries = Object.entries(tokens)
    .map(([key, value]) => `  '${key}': '${value}'`)
    .join(',\n');

  return `export const ${exportName} = {\n${entries}\n};`;
};

const generateDesignTokensLightCode = () => generateCodeFromTokens(designTokensLight, 'designTokensLight');
const generateDesignTokensDarkCode = () => generateCodeFromTokens(designTokensDark, 'designTokensDark');

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
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Design Tokens</h2>
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
  );
}
