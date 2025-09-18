'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { navigation, isNavigationItemActive } from '@/components/guide/navigation';

// 네비게이션 아이템 컴포넌트
const NavigationItem = React.memo(function NavigationItem({
  item,
  pathname
}: {
  item: typeof navigation[0];
  pathname: string;
}) {
  const isActive = isNavigationItemActive(item, pathname);

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          'flex px-3 py-2 text-sm text-sidebar-foreground rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isActive && 'font-bold text-sidebar-primary-foreground bg-accent'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.name}
      </Link>
    </li>
  );
});

NavigationItem.displayName = 'NavigationItem';

// 네비게이션 컴포넌트
const Navigation = React.memo(function Navigation({ pathname }: { pathname: string }) {
  const filteredNavigation = useMemo(
    () => navigation.filter((item) => item.name !== 'Overview'),
    []
  );

  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-6">
        {filteredNavigation.map((item) => (
          <NavigationItem key={item.id} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export const GuideHeader = React.memo(function GuideHeader() {
  const pathname = usePathname();

  return (
    <header className="guide-header border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <strong className="logo text-xl font-bold">
          <Link
            href="/app-guide/"
            className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Design System
          </Link>
        </strong>

        <Navigation pathname={pathname} />

        <div className="header-options">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
});

GuideHeader.displayName = 'GuideHeader';


