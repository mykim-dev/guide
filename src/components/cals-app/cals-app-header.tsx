'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PanelLeft, User } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Avatar } from '@/components/ui/avatar';

interface CalsAppHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function CalsAppHeader({
  sidebarOpen,
  setSidebarOpen,
}: CalsAppHeaderProps) {
  return (
    <header className="layout-header col-span-2 flex justify-around items-center gap-4 px-4 h-16 border-b">
      <div className="header-left flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-sm transition-all duration-300 cursor-pointer ${sidebarOpen ? '' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <PanelLeft />
        </Button>
        <h1 className="logo text-xl font-bold">CALS APP</h1>
      </div>
      <div className="header-center flex-1 flex items-end gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="header-right flex items-center gap-4">
        {/* 토큰 관리 기능은 layout.tsx에서 전역으로 관리됩니다 */}
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
          <User />
        </Button>
      </div>
    </header>
  );
}
