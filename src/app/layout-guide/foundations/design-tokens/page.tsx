'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tokenCategories, type DesignToken } from '@/lib/tokens/design-tokens';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TokenCardProps {
  tokenKey: string;
  token: DesignToken;
  isCopied: boolean;
  onCopy: (tokenKey: string, tokenValue: string) => void;
}

function TokenCard({ tokenKey, token, isCopied, onCopy }: TokenCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
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
            <div
              className="w-6 h-6 rounded border shadow-sm"
              style={{
                backgroundColor: `var(${tokenKey})`,
                borderColor: 'var(--border)'
              }}
            />
          )}
          {token.size && (
            <Badge variant="outline" className="text-xs">
              {token.size}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onCopy(tokenKey, token.size || '')}
          >
            {isCopied ? (
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
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DesignTokensPage() {
  const [copiedTokens, setCopiedTokens] = useState<Set<string>>(new Set());

  const handleCopyToken = useCallback(async (tokenKey: string, tokenValue: string) => {
    try {
      const valueToCopy = tokenValue || getComputedStyle(document.documentElement).getPropertyValue(tokenKey).trim();
      await navigator.clipboard.writeText(valueToCopy);

      setCopiedTokens(prev => new Set(prev).add(tokenKey));
      toast.success('토큰이 복사되었습니다!', {
        description: `${tokenKey}: ${valueToCopy}`
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
      toast.error('토큰 복사에 실패했습니다.');
    }
  }, []);

  return (
    <>
      <Tabs defaultValue="color">
        <TabsList className="w-full">
          <TabsTrigger value="color">색상</TabsTrigger>
          <TabsTrigger value="spacing">간격</TabsTrigger>
          <TabsTrigger value="typography">타이포그래피</TabsTrigger>
          <TabsTrigger value="border">테두리</TabsTrigger>
        </TabsList>
        {Object.entries(tokenCategories).map(([categoryKey, category]) => (
          <TabsContent key={categoryKey} value={categoryKey}>
            <h2 className="text-xl font-bold mt-4">{category.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

            <ScrollArea className="h-[56svh] pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.tokens.map(([tokenKey, token]) => (
                  <TokenCard
                    key={tokenKey}
                    tokenKey={tokenKey}
                    token={token}
                    isCopied={copiedTokens.has(tokenKey)}
                    onCopy={handleCopyToken}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
