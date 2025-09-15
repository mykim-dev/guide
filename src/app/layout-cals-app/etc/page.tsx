'use client';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { GitBranch } from 'lucide-react';
import { Loader2Icon } from 'lucide-react';
import { BadgeCheckIcon } from 'lucide-react';

export default function TypographyPage() {
  return (
    <div className="screen-wrap grid grid-cols-2 gap-5 p-5">
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Button</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="customer" size="sm">Customer</Button>
              <Button variant="destructive" size="sm">Destructive</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="link" size="sm">Link</Button>
              <Button variant="outline" size="icon">
                <GitBranch />
              </Button>
              <Button disabled size="sm">
                <Loader2Icon className="animate-spin" />
                Please wait
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Badge</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="customer">Customer</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                Verified
              </Badge>
              <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                8
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 tabular-nums"
                variant="destructive"
              >
                99
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 tabular-nums"
                variant="outline"
              >
                20+
              </Badge>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Progress</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <Progress value={50} />
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="screen-item">
        <Collapsible defaultOpen={true} className="component-wrap">
          <div className="component-header">
            <h3 className="component-title">Slider</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="component-content">
            <Slider defaultValue={[50]} max={100} step={1} />
          </CollapsibleContent>
        </Collapsible>
      </div>      
    </div>
  );
}