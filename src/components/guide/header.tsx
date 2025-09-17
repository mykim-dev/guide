'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import { navigation, isNavigationItemActive } from '@/components/guide/navigation';

export const GuideHeader = React.memo(() => {
  const pathname = usePathname();
  return (
    <header className="guide-header border-b">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <strong className="logo text-xl font-bold">
          <Link href="/app-guide/">Design System</Link>
        </strong>
        <nav>
          <ul className="flex gap-6">
            {navigation.filter((item) => item.name !== 'Overview').map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex px-3 py-2 text-sm text-sidebar-foreground rounded-md transition-colors hover:bg-accent',
                    isNavigationItemActive(item, pathname)
                      ? 'font-bold text-sidebar-primary-foreground'
                      : ''
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-options">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
});

GuideHeader.displayName = 'GuideHeader';


