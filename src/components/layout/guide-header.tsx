'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function GuideHeader() {

    return (
        <div className="container">
            <div className="guide-header">
                <h1 className="logo">
                    <Link href="/">Design System</Link>
                </h1>
                
                <div className="header-options">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
