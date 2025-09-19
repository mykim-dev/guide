'use client';

import React from 'react';
import { BellDot, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/themes/theme-provider';

interface CalsAgentHeaderProps {
  className?: string;
}

export default function CalsAgentHeader({ className = "" }: CalsAgentHeaderProps) {
    const { isDark } = useTheme();
    
    return (
        <header className={`h-16 border-b bg-background/24 backdrop-blur-md fixed top-0 left-0 right-0 z-50 ${className}`}>
            <div className="container h-full mx-auto flex justify-around items-center gap-4">
                <div className="flex items-center gap-4">
                    <h1>
                        <img 
                            src={isDark ? "/guide/images/demo-agent/CALSAgentDark.svg" : "/guide/images/demo-agent/CALSAgentLight.svg"} 
                            alt="CALS Agent" 
                            className="h-8 w-auto"
                        />
                    </h1>
                </div>
                <div className="flex-1 flex items-end gap-4">
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="cursor-pointer">
                        로그인
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                        <BellDot className="size-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                        <UserRound className="size-5" />
                    </Button>
                    <Button variant="customer" size="lg" className="rounded-full cursor-pointer border border-cyan-100">
                        무료로 시작하기
                    </Button>
                </div>
            </div>
        </header>
    );
}