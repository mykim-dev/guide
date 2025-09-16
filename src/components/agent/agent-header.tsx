'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function AgentHeader() {
  return (
    <header className="layout-header h-16 border-b">
      <div className="container h-full mx-auto flex justify-around items-center gap-4">
        <div className="header-left flex items-center gap-4">
          <h1 className="logo text-xl font-bold">CALS Agent</h1>
        </div>
        <div className="header-center flex-1 flex items-end gap-4">
        </div>
        <div className="header-right flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
            <User />
          </Button>
        </div>
      </div>
    </header>
  );
}
