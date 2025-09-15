'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// 태그 버튼 데이터
const tagButtons = [
  { id: 'Typography', label: 'Typography', href: '/layout-cals-app/typography' },
  { id: 'Card', label: 'Card', href: '/layout-cals-app/card' },
  { id: 'Form', label: 'Form', href: '/layout-cals-app/form' },
  { id: 'Etc', label: 'Etc', href: '/layout-cals-app/etc' },
];

export function CalsAppTagBar() {
  return (
    <div className="layout-tag w-full h-16 border-b">
      <ScrollArea className="h-[calc(100svh-4rem)]">
        <ul className="flex items-center gap-4 p-4">
          {tagButtons.map((button) => (
            <li key={button.id}>
              <Link href={button.href}>
                <Button variant="outline" size="sm">
                  {button.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
