'use client';

import { spacingTokens, SpacingToken } from '@/lib/tokens';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Size Unit</h2>
        <p className="text-sm text-muted-foreground mb-6">
        스페이싱의 기본 단위는 4와 8의 배수에 기반한 8가지로 규정하여 사용합니다. 8의 배수는 가장 큰 기본 배수이며 8이 포함하고 있는 2와 4의 배수도 사용 가능합니다.
        </p>
        <div className="flex items-end justify-center gap-8 p-12 bg-muted rounded-md">
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-1 bg-[#66b1e3]"></div>{4*1}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-2 bg-[#66b1e3]"></div>{4*2}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-3 bg-[#66b1e3]"></div>{4*3}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-4 bg-[#66b1e3]"></div>{4*4}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-5 bg-[#66b1e3]"></div>{4*5}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-6 bg-[#66b1e3]"></div>{4*6}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-7 bg-[#66b1e3]"></div>{4*7}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-8 bg-[#66b1e3]"></div>{4*8}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-9 bg-[#66b1e3]"></div>{4*9}</div>
          <div className="flex flex-col items-center justify-end text-xs gap-2"><div className="size-10 bg-[#66b1e3]"></div>{4*10}</div>
        </div>
      </div>
      <div className="relative">
        <ScrollArea className="h-[calc(40px*10)] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 pl-5">토큰</TableHead>
                <TableHead className="w-1/4">값</TableHead>
                <TableHead className="w-1/4">설명</TableHead>
                <TableHead className="w-1/4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {Object.entries(spacingTokens).map(([key, token]) => {
              if (!isSpacingToken(token)) {
                return null;
              }

              return (
                <TableRow key={key}>
                  <TableCell className=" pl-5">
                    <Badge variant="secondary" className="text-xs">{token.name}</Badge>
                  </TableCell>
                  <TableCell>
                    {token.value}
                  </TableCell>
                  <TableCell>
                    <span className={key === '4' || key === '6' ? 'font-semibold' : ''}>                  
                      {token.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    m-{token.name} / p-{token.name} / space-{token.name}
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
