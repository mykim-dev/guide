'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getTextSizeTokens } from '@/lib/tokens/design-tokens';
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

// 타이포그래피 토큰 타입 정의
interface TypographyToken {
  name: string;
  description?: string;
  fontSize?: string;
  lineHeight?: string;
}

// 타입 가드 함수
const isTypographyToken = (token: unknown): token is TypographyToken => {
  return typeof token === 'object' && token !== null && 'name' in token;
};

export default function TypographyPage() {
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
      <div className="flex flex-col gap-6">
        {Object.entries(getTextSizeTokens()).map(([key, token]) => {
          if (!isTypographyToken(token)) {
            return null;
          }

          return (
            <div key={key} className={`${token.name === 'Text Base' ? 'bg-gray-50' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
                  <Badge variant="outline" className="text-xs">
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
      </div>
    </>
  );
}
