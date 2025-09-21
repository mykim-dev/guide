'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fontSizeTokens, lineHeightTokens, fontWeightTokens, letterSpacingTokens } from '@/lib/tokens/typography';

// TypographyToken 타입 정의
type TypographyToken = {
  name: string;
  description: string[];
  category: 'font-size' | 'line-height' | 'font-weight' | 'letter-spacing';
  value: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontWeight?: string;
  class: string[];
};

// 카테고리별 토큰을 그룹화하는 함수
const groupTokensByCategory = () => {
  const grouped: Record<string, [string, TypographyToken][]> = {
    'font-size': [],
    'line-height': [],
    'font-weight': [],
    'letter-spacing': []
  };

  // 모든 토큰 객체를 통합
  const allTokens = {
    ...fontSizeTokens,
    ...lineHeightTokens,
    ...fontWeightTokens,
    ...letterSpacingTokens
  };

  Object.entries(allTokens).forEach(([key, token]) => {
    if (grouped[token.category]) {
      grouped[token.category].push([key, token as TypographyToken]);
    }
  });

  return grouped;
};

// 토큰 카드 컴포넌트
const TokenCard = ({
  tokenKey,
  token
}: {
  tokenKey: string;
  token: TypographyToken;
}) => {

  const getPreviewText = () => {
    switch (token.category) {
      case 'font-size':
        return 'The quick brown fox jumps over the lazy dog';
      case 'line-height':
        return 'Line Height Sample\nMulti-line text example\nTo demonstrate spacing';
      case 'font-weight':
        return 'Font Weight Sample';
      case 'letter-spacing':
        return 'Letter Spacing Sample';
      default:
        return 'Sample Text';
    }
  };

  return (
    <>
      <div className="grid grid-cols-[4fr_1fr] gap-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{token.name}</span>
            <Badge variant="secondary" className="text-xs">
              {tokenKey}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">미리보기:</div>
            <div className={`border-l-4 border-primary pl-4 ${token.class.join(' ')} bg-muted whitespace-pre-line`}>
              {getPreviewText()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start w-full bg-secondary text-sm p-2 rounded-md space-y-1">
            <div className="font-mono text-xs">
              {token.category}: {token.value}
            </div>
            {token.lineHeight && (
              <div className="font-mono text-xs">
                line-height: {token.lineHeight}
              </div>
            )}
            {token.fontWeight && (
              <div className="font-mono text-xs">
                font-weight: {token.fontWeight}
              </div>
            )}
            {token.letterSpacing && (
              <div className="font-mono text-xs">
                letter-spacing: {token.letterSpacing}
              </div>
            )}
          </div>
        </div>

        {token.description && (
          <div className="text-xs text-muted-foreground">
            <strong>용도:</strong> {token.description.join(', ')}
          </div>
        )}
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default function TypographyPage() {
  const groupedTokens = groupTokensByCategory();

  const categoryLabels = {
    'font-size': '폰트 크기',
    'line-height': '줄 간격',
    'font-weight': '폰트 두께',
    'letter-spacing': '자간'
  };

  return (
    <Tabs defaultValue="font-size" className="w-full">
      <TabsList className="w-full mb-4">
        {Object.entries(categoryLabels).map(([category, label]) => (
          <TabsTrigger key={category} value={category}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(categoryLabels).map(([category, label]) => (
        <TabsContent key={category} value={category}>
          <ScrollArea className="h-[calc(100svh-320px)]">
            {groupedTokens[category as keyof typeof groupedTokens].map(([tokenKey, token]) => (
              <TokenCard
                key={tokenKey}
                tokenKey={tokenKey}
                token={token}
              />
            ))}
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
