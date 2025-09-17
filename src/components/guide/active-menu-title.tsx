'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getActiveMenuInfo } from '@/components/guide/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const ActiveMenuTitle = React.memo(() => {
  const pathname = usePathname();
  const { parent, child } = getActiveMenuInfo(pathname);
  if (!parent) return null;

  const getCurrentPageName = () => {
    if (child) return child.name;
    if (pathname === parent.href) return parent.name;
    if (pathname.startsWith('/app-guide/component-guide/')) {
      const componentName = pathname.replace('/app-guide/component-guide/', '').replace('/', '');
      return componentName
        ? componentName.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase()).trim()
        : 'Component Guide';
    }
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment ? lastSegment.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase()).trim() : parent.name;
  };

  const currentPageName = getCurrentPageName();

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <span className="font-semibold text-muted-foreground">{parent.name}</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app-guide/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={parent.href}>{parent.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {child && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{currentPageName}</h1>
        {child && child.description && (
          <p className="mt-2 text-sm text-muted-foreground">{child.description}</p>
        )}
      </div>
    </>
  );
});

ActiveMenuTitle.displayName = 'ActiveMenuTitle';


