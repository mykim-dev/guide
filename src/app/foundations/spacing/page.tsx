'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { spacingTokens, SpacingToken } from '@/lib/tokens';
import { CheckCircle, Clipboard } from 'lucide-react';
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

// 타입 가드 함수
const isSpacingToken = (token: unknown): token is SpacingToken => {
  return typeof token === 'object' && token !== null && 'value' in token && 'name' in token;
};

export default function SpacingPage() {
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(spacingTokens).map(([key, token]) => {
          if (!isSpacingToken(token)) {
            return null;
          }

          return (
            <Card key={key} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{token.name}</CardTitle>
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
                    <div className="flex flex-wrap items-center">
                      <div
                        className="bg-primary rounded"
                        style={{ width: token.value, height: '1rem' }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Width: {formatValue(token.value)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="bg-secondary rounded"
                        style={{ width: '1rem', height: token.value }}
                      />
                      <span className="text-xs text-muted-foreground">
                        Height: {formatValue(token.value)}
                      </span>
                    </div>
                  </div>

                  {/* Usage examples */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">사용 예시:</div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        p-{token.name} → padding: {formatValue(token.value)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        m-{token.name} → margin: {formatValue(token.value)}
                      </div>
                      <div className="text-xs text-muted-foreground">
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
    </>
  );
}
