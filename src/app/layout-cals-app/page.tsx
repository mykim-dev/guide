'use client';

import React from 'react';
import Form from '@/components/cals-app/form';

import { Collapsible } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, GitBranch, Loader2Icon, BadgeCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

export default function CalsAppPage() {
  // return <LayoutCalsApp />;
  return (
    <div className="screen-wrap grid grid-cols-2 gap-5 p-5">
      <div className="screen-item">
        {/* typography */}
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

        {/* card */}
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
      <div className="screen-item">
        {/* button */}
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

        {/* badge */}
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

        {/* form */}
        <Form />

        {/* progress */}
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

        {/* slider */}
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
  )
}
