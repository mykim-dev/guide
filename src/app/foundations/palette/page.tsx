'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tailwindColors } from '@/lib/tokens';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


export default function PalettePage() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
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
    </>
  );
}
