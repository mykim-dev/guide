'use client';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TypographyPage() {
  return (
    <div className="screen-wrap grid grid-cols-1 gap-5 p-5">
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Card</h3>
            <div className="component-actions"></div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>      
    </div>
  );
}