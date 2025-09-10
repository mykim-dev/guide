'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TokenNavigation } from '@/components/layout/token-navigation';
import { tokenCategories } from '@/lib/tokens/design-tokens';
import { CheckCircle, Clipboard, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DesignTokensPage() {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">디자인 토큰</h1>
        <p className="text-muted-foreground">
          디자인 시스템의 기본 구성 요소인 토큰들의 용도와 사용법을 확인하세요.
        </p>
      </div>

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
                            {token.size}
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

      <TokenNavigation currentPage="design-tokens" />
    </>
  );
}
