'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Columns2, Columns3Cog, Rows2, Square } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// 네비게이션 메뉴 데이터
const navigationMenu = [
  {
    id: 'home',
    label: 'Home',
    href: '/layout-cals-app/',
    icon: Home
  },
  {
    id: 'screen',
    label: 'Screen',
    href: '/layout-cals-app/default/',
    icon: Columns3Cog,
    children: [
      { id: 'default', label: 'Default', href: '/layout-cals-app/default/', icon: Square },
      { id: 'horizontal', label: 'Horizontal', href: '/layout-cals-app/horizontal/', icon: Columns2 },
      { id: 'vertical', label: 'Vertical', href: '/layout-cals-app/vertical/', icon: Rows2 },
    ]
  },
  // {
  //   id: 'component',
  //   label: 'Component',
  //   href: '/layout-cals-app/',
  //   icon: Home,
  //   children: [
  //     { id: 'form', label: 'Form', href: '/layout-cals-app/', icon: Home },
  //     { id: 'list', label: 'List', href: '/layout-cals-app/', icon: Home }
  //   ]
  // }
];

interface CalsAppSidebarProps {
  sidebarOpen: boolean;
}

export function CalsAppSidebar({ sidebarOpen }: CalsAppSidebarProps) {
  return (
    <aside className={`layout-aside row-span-2 border-r transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <ScrollArea className="h-[calc(100svh-4rem)]">
        <nav className="flex flex-col py-2">
          {navigationMenu.map((item) => (
            <Accordion
              key={item.id}
              type="single"
              collapsible
              defaultValue={item.id}
              className="relative group px-4 py-2"
            >
              <AccordionItem value="item-1">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="menu-icon h-8 w-8">
                    <item.icon className="h-4 w-4" />
                  </Button>
                  {sidebarOpen && (
                    <>
                      {item.children ? (
                        <span className="menu-label flex-1 text-sm">
                          {item.label}
                        </span>
                      ) : (
                        <Link href={item.href} className="menu-label flex-1 text-sm">
                          {item.label}
                        </Link>
                      )}
                    </>
                  )}
                  {item.children && sidebarOpen && <AccordionTrigger className="p-0" />}
                </div>

                {item.children && sidebarOpen && (
                  <AccordionContent>
                    <ul className="flex flex-col ml-5 mb-4">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <div className="flex items-center p-2 hover:bg-accent rounded-md">
                            <Link href={child.href} className="menu-label text-sm ml-4">
                              {child.label}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          ))}
        </nav>
      </ScrollArea>
    </aside >
  );
}
