'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function AgentStudioHeader() {
  return (
    <header className="layout-header col-span-2 flex justify-around items-center gap-4 px-2 h-12 border-b">
      <div className="header-left flex items-center gap-4">
        <h1 className="logo text-xl font-bold">Agent Studio</h1>
      </div>
      <div className="header-center flex-1 flex items-end gap-4"></div>
      
      <div className="header-right flex items-center gap-4">
        {/* 토큰 관리 기능은 layout.tsx에서 전역으로 관리됩니다 */}
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
          <User />
        </Button>
      </div>
    </header>
  );
}
