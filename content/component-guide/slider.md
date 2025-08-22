---
title: "Slider"
description: "슬라이더 컴포넌트 사용 가이드"
---

# Slider 컴포넌트

Slider는 사용자가 범위 내에서 값을 선택할 수 있는 UI 요소입니다.

## 기본 사용법

```tsx
import { Slider } from '@/components/ui/slider';

export function MyComponent() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  );
}
```

## 사용 예제

### 기본 슬라이더
```tsx
<Slider defaultValue={[50]} max={100} step={1} />
```

### 라벨과 함께 사용
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label>Volume</Label>
  <Slider defaultValue={[30]} max={100} step={1} />
</div>
```

### 제어된 컴포넌트
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function ControlledSlider() {
  const [value, setValue] = useState([50]);

  return (
    <div className="space-y-2">
      <Label>Value: {value[0]}</Label>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
      />
    </div>
  );
}
```

### 범위 슬라이더
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function RangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-2">
      <Label>Range: {range[0]} - {range[1]}</Label>
      <Slider
        value={range}
        onValueChange={setRange}
        max={100}
        step={1}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
```

### 다양한 스텝 값
```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <Label>Integer steps (1-10)</Label>
    <Slider defaultValue={[5]} max={10} step={1} />
  </div>
  <div className="space-y-2">
    <Label>Decimal steps (0-1)</Label>
    <Slider defaultValue={[0.5]} max={1} step={0.1} />
  </div>
  <div className="space-y-2">
    <Label>Large steps (0-1000)</Label>
    <Slider defaultValue={[500]} max={1000} step={100} />
  </div>
</div>
```

### 비활성화 상태
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label>Enabled slider</Label>
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>
  <div className="space-y-2">
    <Label className="text-muted-foreground">Disabled slider</Label>
    <Slider defaultValue={[50]} max={100} step={1} disabled />
  </div>
</div>
```

### 아이콘과 함께 사용
```tsx
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { Label } from '@/components/ui/label';

function VolumeSlider() {
  const [volume, setVolume] = useState([50]);

  const getVolumeIcon = (value: number) => {
    if (value === 0) return <VolumeX className="h-4 w-4" />;
    if (value < 50) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="flex items-center space-x-4">
      {getVolumeIcon(volume[0])}
      <div className="flex-1">
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
        />
      </div>
      <span className="text-sm text-muted-foreground w-8">
        {volume[0]}%
      </span>
    </div>
  );
}
```

### 폼과 함께 사용
```tsx
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function SettingsForm() {
  const [settings, setSettings] = useState({
    brightness: [70],
    contrast: [50],
    saturation: [80],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings:', settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Display Settings</h3>
        
        <div className="space-y-2">
          <Label>Brightness: {settings.brightness[0]}%</Label>
          <Slider
            value={settings.brightness}
            onValueChange={(value) => setSettings(prev => ({ ...prev, brightness: value }))}
            max={100}
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Contrast: {settings.contrast[0]}%</Label>
          <Slider
            value={settings.contrast}
            onValueChange={(value) => setSettings(prev => ({ ...prev, contrast: value }))}
            max={100}
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Saturation: {settings.saturation[0]}%</Label>
          <Slider
            value={settings.saturation}
            onValueChange={(value) => setSettings(prev => ({ ...prev, saturation: value }))}
            max={100}
            step={1}
          />
        </div>
      </div>
      
      <Button type="submit">Save Settings</Button>
    </form>
  );
}
```

### 실시간 미리보기
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function PreviewSlider() {
  const [size, setSize] = useState([16]);
  const [color, setColor] = useState([0]);

  const colors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-purple-500',
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Font Size: {size[0]}px</Label>
        <Slider
          value={size}
          onValueChange={setSize}
          min={12}
          max={32}
          step={1}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Color</Label>
        <Slider
          value={color}
          onValueChange={setColor}
          min={0}
          max={colors.length - 1}
          step={1}
        />
      </div>
      
      <div className="p-4 border rounded-lg">
        <p
          className={`${colors[color[0]]}`}
          style={{ fontSize: `${size[0]}px` }}
        >
          This text changes in real-time based on the slider values.
        </p>
      </div>
    </div>
  );
}
```

### 커스텀 스타일링
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-4">
  <div className="space-y-2">
    <Label>Custom styled slider</Label>
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
    />
  </div>
  
  <div className="space-y-2">
    <Label>Large thumb slider</Label>
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6"
    />
  </div>
</div>
```

## 접근성

Slider 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원 (화살표 키, Page Up/Down, Home/End)
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시
- 라벨 연결 지원

## 모범 사례

1. **명확한 라벨링**: 모든 슬라이더에 명확한 라벨 제공
2. **적절한 범위**: 사용자가 예상할 수 있는 값 범위 설정
3. **스텝 값**: 사용 목적에 맞는 적절한 스텝 값 설정
4. **실시간 피드백**: 값 변경 시 즉시 피드백 제공
5. **접근성 고려**: 키보드 사용자를 위한 적절한 지원

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number[]` | - | 슬라이더 값 (제어된 컴포넌트) |
| `onValueChange` | `(value: number[]) => void` | - | 값 변경 핸들러 |
| `defaultValue` | `number[]` | `[0]` | 기본값 |
| `min` | `number` | `0` | 최소값 |
| `max` | `number` | `100` | 최대값 |
| `step` | `number` | `1` | 스텝 값 |
| `disabled` | `boolean` | `false` | 슬라이더 비활성화 |
| `minStepsBetweenThumbs` | `number` | `0` | 범위 슬라이더에서 썸 사이 최소 스텝 |
| `className` | `string` | - | 추가 CSS 클래스 |
