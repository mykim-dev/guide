'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';

const navigation = [
    { name: '디자인 토큰', href: '/tokens' },
    { name: '디자인 가이드', href: '/design-guide' },
    { name: '컴포넌트', href: '/components' },
    { name: '컴포넌트 가이드', href: '/component-guide' },
    { name: '플레이그라운드', href: '/playground' },
    { name: '테마 에디터', href: '/theme-editor' },
];

export function LayoutHeader() {
    const pathname = usePathname();

    return (
        <div className="container">
            <h1 className="logo">
                <Link href="/">Design System</Link>
            </h1>
            <nav className="header-nav">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            pathname === item.href
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="header-options">
                <ModeToggle />
            </div>
        </div>
    );
}
