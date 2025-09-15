'use client';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function TypographyPage() {
  return (
    <div className="screen-wrap grid grid-cols-1 gap-5 p-5">
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Typography</h3>
            <div className="component-actions">
              <Button variant="outline" size="sm">Search</Button>
              <Button variant="default" size="sm">Save</Button>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            {/* typography display */}
            <div className="space-y-6">
              <div className="flex gap-2">
                <div className="p-2 text-xs bg-muted text-muted-foreground rounded-md">Muted - 비활성/보조 정보를 위한 색상(비활성 배경, 코드 블록, 구분선)</div>
                <div className="p-2 text-xs bg-accent text-accent-foreground rounded-md">Accent - 상호작용 요소의 강조 색상(호버 상태, 선택 상태, 포커스 상태)</div>
              </div>
              <Separator />
              <div>
                <div className="text-xs text-muted-foreground">text-4xl (fontSize: 2.25rem / fontWeight: 700 / lineHeight: 1.375)</div>
                <div><h4 className="text-4xl font-bold leading-snug">The quick brown fox jumps over the lazy dog</h4></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-3xl (fontSize: 1.875rem / fontWeight: 700 / lineHeight: 1.375)</div>
                <div><h5 className="text-3xl font-bold leading-snug">The quick brown fox jumps over the lazy dog</h5></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-2xl (fontSize: 1.5rem / fontWeight: 600 / lineHeight: 1.375)</div>
                <div><h1 className="text-2xl font-semibold leading-snug">The quick brown fox jumps over the lazy dog</h1></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-xl (fontSize: 1.25rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.25))</div>
                <div><h2 className="text-xl font-semibold">The quick brown fox jumps over the lazy dog</h2></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-lg (fontSize: 1.125rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.125))</div>
                <div><h3 className="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-base (fontSize: 1rem / fontWeight: 400 / lineHeight: calc(1.5 / 1) / letterSpacing: 0)</div>
                <div><p className="text-base">The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-sm (fontSize: 0.875rem / fontWeight: 400 / lineHeight: calc(1.25 / 0.875))</div>
                <div><p className="text-sm">The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-xs (fontSize: 0.75rem / fontWeight: 400 / lineHeight: calc(1 / 0.75))</div>
                <div><p className="text-xs">The quick brown fox jumps over the lazy dog</p></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>      
    </div>
  );
}