'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// 태그 버튼 데이터
const tagButtons = [
  { id: 'home', label: 'Home', href: '/demo-cals-app/' },
  { id: 'default', label: 'Default', href: '/demo-cals-app/default' },
  { id: 'horizontal', label: 'Horizontal', href: '/demo-cals-app/horizontal' },
  { id: 'vertical', label: 'Vertical', href: '/demo-cals-app/vertical' },
];

export function CalsAppTagBar() {
  return (
    <div className="layout-tag w-full h-16 border-b">
      <ScrollArea className="h-[calc(100svh-4rem)]">
        <ul className="flex items-center gap-4 p-4">
          {tagButtons.map((button) => {
            return (
              <li key={button.id}>
                <Link href={button.href}>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    {button.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
