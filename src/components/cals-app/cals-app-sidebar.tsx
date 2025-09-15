'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home } from 'lucide-react';

// 네비게이션 메뉴 데이터
const navigationMenu = [
  {
    id: 'home',
    label: 'Home',
    href: '/guide/layout-guide',
    icon: Home
  },
  {
    id: 'screen',
    label: 'Screen',
    href: '/guide/layout-guide',
    icon: Home,
    children: [
      { id: 'screen-default', label: 'Screen-Default', href: '/', icon: Home },
      { id: 'screen-horizontal', label: 'Screen-Horizontal', href: '/', icon: Home },
      { id: 'screen-vertical', label: 'Screen-Vertical', href: '/', icon: Home },
      { id: 'screen-horizontal2', label: 'Screen-Horizontal2', href: '/', icon: Home },
      { id: 'screen-vertical2', label: 'Screen-Vertical2', href: '/', icon: Home }
    ]
  },
  {
    id: 'component',
    label: 'Component',
    href: '/',
    icon: Home
  }
];

// 컴포넌트 메뉴 데이터
const componentMenu = [
  { id: 'form', label: 'Form', href: '/', icon: Home },
  { id: 'list', label: 'List', href: '/', icon: Home }
];

export function CalsAppSidebar() {
  return (
    <aside className="layout-aside row-span-2 w-64 border-r">
      <ScrollArea className="h-[calc(100svh-4rem)]">
        <nav>
          <ul className="flex flex-col">
            {navigationMenu.map((item) => (
              <li key={item.id}>
                <Button variant="ghost" size="icon" className="menu-icon">
                  <item.icon />
                </Button>
                <Link href={item.href} className="menu-link text-sm">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="flex flex-col ml-5 mb-4">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Button variant="ghost" size="icon" className="menu-icon">
                          <child.icon />
                        </Button>
                        <Link href={child.href} className="menu-link text-sm">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <ul className="flex flex-col">
              {componentMenu.map((item) => (
                <li key={item.id}>
                  <Button variant="ghost" size="icon" className="menu-icon">
                    <item.icon />
                  </Button>
                  <Link href={item.href} className="menu-link text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
}
