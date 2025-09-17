'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { navigation } from '@/components/guide/navigation';

export const GuideSidebar = React.memo(() => {
  const pathname = usePathname();

  const getActiveAccordionValues = () => {
    const activeValues: string[] = [];
    navigation.forEach((item) => {
      if (pathname === item.href) activeValues.push(item.id);
      else if (item.children && Object.keys(item.children).length > 0) {
        const hasActiveChild = Object.values(item.children).some(child => pathname === child.href || pathname.startsWith(child.href));
        if (hasActiveChild) activeValues.push(item.id);
      }
    });
    return activeValues;
  };

  const [accordionValue, setAccordionValue] = React.useState<string[]>(() => getActiveAccordionValues());

  React.useEffect(() => {
    const activeValues = getActiveAccordionValues();
    setAccordionValue(prev => [...new Set([...prev, ...activeValues])]);
  }, [pathname]);

  return (
    <aside className="guide-aside w-[240px] border-r">
      <ScrollArea className="h-[calc(100svh-65px)] py-4 pr-2">
        <nav>
          <Accordion type="multiple" className="w-full space-y-5" value={accordionValue} onValueChange={setAccordionValue}>
            {navigation.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                {item.children && Object.keys(item.children).length > 0 ? (
                  <AccordionTrigger className="flex items-center justify-between w-full rounded-md">
                    <span className="flex py-2 text-base font-medium rounded-md transition-colors">{item.name}</span>
                    <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                ) : (
                  <AccordionTrigger className="flex items-center justify-between w-full rounded-md">
                    <Link href={item.href} className={cn('flex py-2 text-base font-medium rounded-md transition-colors', pathname === item.href ? 'text-sidebar-foreground' : '')}>
                      {item.name}
                    </Link>
                  </AccordionTrigger>
                )}
                <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out">
                  {item.children && Object.keys(item.children).length > 0 && (
                    <ul className="space-y-1">
                      {Object.values(item.children).map((child) => (
                        <li key={child.id}>
                          <Link href={child.href} className={
                            cn('inline-flex px-3 py-1 text-sm transition-all duration-200 ease-in-out text-sidebar-foreground hover:bg-accent rounded-md', 
                            pathname === child.href ? 'font-bold text-sidebar-primary-foreground' : '')}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
      </ScrollArea>
    </aside>
  );
});

GuideSidebar.displayName = 'GuideSidebar';


