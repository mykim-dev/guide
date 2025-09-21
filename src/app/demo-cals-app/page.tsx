'use client';

import React, { useState } from 'react';
import Form from '@/components/cals-app/form';

import { Collapsible } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, GitBranch, Loader2Icon, BadgeCheckIcon, Type, Bold, Italic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// 텍스트 스타일 인터페이스
interface TextStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: 'normal' | 'italic';
}

// 텍스트 설정 컴포넌트
interface TextSettingsProps {
  selectedText: HTMLElement | null;
  onStyleChange: (style: Partial<TextStyle>) => void;
  onClose: () => void;
}

function TextSettings({ selectedText, onStyleChange, onClose }: TextSettingsProps) {
  const [fontSize, setFontSize] = useState('1rem');
  const [fontWeight, setFontWeight] = useState('400');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');

  const fontSizeOptions = [
    { value: '0.75rem', label: '12px' },
    { value: '0.875rem', label: '14px' },
    { value: '1rem', label: '16px' },
    { value: '1.125rem', label: '18px' },
    { value: '1.25rem', label: '20px' },
    { value: '1.5rem', label: '24px' },
    { value: '1.875rem', label: '30px' },
    { value: '2.25rem', label: '36px' },
  ];

  const fontWeightOptions = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
  ];

  const applyChanges = () => {
    onStyleChange({ fontSize, fontWeight, fontStyle });
    onClose();
  };

  return (
    <Card className="w-80 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">텍스트 설정</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="fontSize">폰트 크기</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fontWeight">폰트 굵기</Label>
            <Select value={fontWeight} onValueChange={setFontWeight}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeightOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>폰트 스타일</Label>
            <div className="flex gap-2">
              <Button
                variant={fontStyle === 'normal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontStyle('normal')}
                className="flex-1"
              >
                <Type className="w-4 h-4 mr-2" />
                일반
              </Button>
              <Button
                variant={fontStyle === 'italic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontStyle('italic')}
                className="flex-1"
              >
                <Italic className="w-4 h-4 mr-2" />
                기울임
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={applyChanges} className="flex-1">적용</Button>
          <Button variant="outline" onClick={onClose} className="flex-1">취소</Button>
        </div>
      </div>
    </Card>
  );
}

export default function CalsAppPage() {
  const [selectedText, setSelectedText] = useState<HTMLElement | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [textStyles, setTextStyles] = useState<Record<string, TextStyle>>({});

  const handleTextClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const target = event.currentTarget;

    // 이전 선택 해제
    document.querySelectorAll('.el-text').forEach(el => {
      el.classList.remove('ring-1', 'ring-blue-500', 'ring-offset-1');
    });

    // 새 요소 선택
    target.classList.add('ring-1', 'ring-blue-500', 'ring-offset-1');
    setSelectedText(target);
    setShowSettings(true);
  };

  const handleStyleChange = (style: Partial<TextStyle>) => {
    if (!selectedText) return;

    const textId = selectedText.getAttribute('data-text-id') || Math.random().toString();
    selectedText.setAttribute('data-text-id', textId);

    // 스타일 적용
    if (style.fontSize) {
      selectedText.style.fontSize = style.fontSize;
    }
    if (style.fontWeight) {
      selectedText.style.fontWeight = style.fontWeight;
    }
    if (style.fontStyle) {
      selectedText.style.fontStyle = style.fontStyle;
    }

    // 상태 업데이트
    setTextStyles(prev => ({
      ...prev,
      [textId]: { ...prev[textId], ...style }
    }));
  };

  const closeSettings = () => {
    setShowSettings(false);
    if (selectedText) {
      selectedText.classList.remove('ring-1', 'ring-blue-500', 'ring-offset-1');
    }
    setSelectedText(null);
  };

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
              {/* <div>
                <div className="text-xs text-muted-foreground">text-4xl (fontSize: 2.25rem / fontWeight: 700 / lineHeight: 1.375)</div>
                <div><h4 className="text-4xl font-bold leading-snug">The quick brown fox jumps over the lazy dog</h4></div>
              </div> */}
              <div>
                <div className="text-xs text-muted-foreground">text-3xl (fontSize: 1.875rem / fontWeight: 700 / lineHeight: 1.375)</div>
                <div><h5 className="el-text text-3xl font-bold leading-snug cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</h5></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-2xl (fontSize: 1.5rem / fontWeight: 600 / lineHeight: 1.375)</div>
                <div><h1 className="el-text text-2xl font-semibold leading-snug cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</h1></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-xl (fontSize: 1.25rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.25))</div>
                <div><h2 className="el-text text-xl font-semibold cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</h2></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-lg (fontSize: 1.125rem / fontWeight: 600 / lineHeight: calc(1.75 / 1.125))</div>
                <div><h3 className="el-text text-lg font-semibold cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</h3></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-base (fontSize: 1rem / fontWeight: 400 / lineHeight: calc(1.5 / 1) / letterSpacing: 0)</div>
                <div><p className="el-text text-base cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-sm (fontSize: 0.875rem / fontWeight: 400 / lineHeight: calc(1.25 / 0.875))</div>
                <div><p className="el-text text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</p></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">text-xs (fontSize: 0.75rem / fontWeight: 400 / lineHeight: calc(1 / 0.75))</div>
                <div><p className="el-text text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded p-1 transition-colors" onClick={handleTextClick}>The quick brown fox jumps over the lazy dog</p></div>
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

      {/* 텍스트 설정창 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="relative">
            <TextSettings
              selectedText={selectedText}
              onStyleChange={handleStyleChange}
              onClose={closeSettings}
            />
          </div>
        </div>
      )}
    </div>
  )
}
