'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { typographyTokens, TypographyToken } from '@/lib/tokens/typography';
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

// 카테고리별 토큰을 그룹화하는 함수
const groupTokensByCategory = () => {
  const grouped = {
    'font-size': [] as [string, TypographyToken][],
    'font-weight': [] as [string, TypographyToken][],
    'line-height': [] as [string, TypographyToken][],
    'letter-spacing': [] as [string, TypographyToken][]
  };

  Object.entries(typographyTokens).forEach(([key, token]) => {
    grouped[token.category].push([key, token]);
  });

  return grouped;
};

// 토큰 카드 컴포넌트
const TokenCard = ({ 
  tokenKey, 
  token, 
  copiedTokens, 
  onCopyToken 
}: { 
  tokenKey: string; 
  token: TypographyToken; 
  copiedTokens: Set<string>; 
  onCopyToken: (key: string, value: string) => void;
}) => {
  const getPreviewStyle = () => {
    switch (token.category) {
      case 'font-size':
        return { fontSize: token.value };
      case 'font-weight':
        return { fontWeight: token.value };
      case 'line-height':
        return { lineHeight: token.value };
      case 'letter-spacing':
        return { letterSpacing: token.value };
      default:
        return {};
    }
  };

  const getPreviewText = () => {
    switch (token.category) {
      case 'font-size':
        return 'The quick brown fox jumps over the lazy dog';
      case 'font-weight':
        return 'Font Weight Sample';
      case 'line-height':
        return 'Line Height Sample\nMulti-line text example';
      case 'letter-spacing':
        return 'Letter Spacing Sample';
      default:
        return 'Sample Text';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
          <Badge variant="outline" className="text-xs">
            {tokenKey}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {token.category}: {formatValue(token.value)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onCopyToken(tokenKey, token.value)}
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
        <div className="text-xs font-medium text-muted-foreground">미리보기:</div>
        <div 
          className="border-l-4 border-primary pl-4" 
          style={getPreviewStyle()}
        >
          {getPreviewText()}
        </div>
      </div>

      {token.description && (
        <div className="text-xs text-muted-foreground">
          <strong>용도:</strong> {token.description.join(', ')}
        </div>
      )}

      <Separator />
    </div>
  );
};

export default function TypographyPage() {
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());
  const groupedTokens = groupTokensByCategory();

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

  const categoryLabels = {
    'font-size': '폰트 크기',
    'font-weight': '폰트 두께',
    'line-height': '줄 간격',
    'letter-spacing': '자간'
  };

  return (
    <Tabs defaultValue="font-size" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {Object.entries(categoryLabels).map(([category, label]) => (
          <TabsTrigger key={category} value={category}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(categoryLabels).map(([category, label]) => (
        <TabsContent key={category} value={category} className="mt-6">
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">
              {label} 관련 타이포그래피 토큰들
            </div>
            {groupedTokens[category as keyof typeof groupedTokens].map(([tokenKey, token]) => (
              <TokenCard
                key={tokenKey}
                tokenKey={tokenKey}
                token={token}
                copiedTokens={copiedTokens}
                onCopyToken={handleCopyToken}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
