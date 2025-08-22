---
title: "Switch"
description: "스위치 컴포넌트 사용 가이드"
---

# Switch 컴포넌트

Switch는 사용자가 두 가지 상태(켜짐/꺼짐)를 토글할 수 있는 UI 요소입니다.

## 기본 사용법

```tsx
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function MyComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
```

## 사용 예제

### 기본 스위치
```tsx
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

### 제어된 컴포넌트
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="controlled"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="controlled">
        {enabled ? 'Enabled' : 'Disabled'}
      </Label>
    </div>
  );
}
```

### 여러 스위치
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function MultipleSwitches() {
  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: true,
    autoSave: false,
    sound: true,
  });

  const handleToggle = (key: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Settings</h3>
      {Object.entries(settings).map(([key, enabled]) => (
        <div key={key} className="flex items-center justify-between">
          <Label htmlFor={key} className="capitalize">
            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </Label>
          <Switch
            id={key}
            checked={enabled}
            onCheckedChange={(checked) => handleToggle(key, checked)}
          />
        </div>
      ))}
    </div>
  );
}
```

### 비활성화 상태
```tsx
<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Switch id="enabled" />
    <Label htmlFor="enabled">Enabled switch</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="disabled" disabled />
    <Label htmlFor="disabled" className="text-muted-foreground">Disabled switch</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled checked switch</Label>
  </div>
</div>
```

### 아이콘과 함께 사용
```tsx
import { Bell, Moon, Save, Volume2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label htmlFor="notifications" className="flex items-center gap-2">
      <Bell className="h-4 w-4" />
      Notifications
    </Label>
    <Switch id="notifications" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="dark-mode" className="flex items-center gap-2">
      <Moon className="h-4 w-4" />
      Dark Mode
    </Label>
    <Switch id="dark-mode" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="auto-save" className="flex items-center gap-2">
      <Save className="h-4 w-4" />
      Auto Save
    </Label>
    <Switch id="auto-save" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="sound" className="flex items-center gap-2">
      <Volume2 className="h-4 w-4" />
      Sound
    </Label>
    <Switch id="sound" />
  </div>
</div>
```

### 상태 표시와 함께 사용
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

function StatusSwitch() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <Switch
          id="online-status"
          checked={isOnline}
          onCheckedChange={setIsOnline}
        />
        <div>
          <Label htmlFor="online-status" className="text-base font-medium">
            Online Status
          </Label>
          <p className="text-sm text-muted-foreground">
            {isOnline ? 'You are currently online' : 'You are currently offline'}
          </p>
        </div>
      </div>
      <Badge variant={isOnline ? 'default' : 'secondary'}>
        {isOnline ? 'Online' : 'Offline'}
      </Badge>
    </div>
  );
}
```

### 폼과 함께 사용
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function UserPreferencesForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter your username" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch id="push-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <Switch id="two-factor" />
          </div>
        </div>
      </div>
      
      <Button type="submit">Save Preferences</Button>
    </form>
  );
}
```

### 조건부 렌더링과 함께 사용
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function ConditionalForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="advanced-mode">Advanced Mode</Label>
        <Switch
          id="advanced-mode"
          checked={showAdvanced}
          onCheckedChange={setShowAdvanced}
        />
      </div>
      
      {showAdvanced && (
        <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
          <h4 className="font-medium">Advanced Settings</h4>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" placeholder="Enter your API key" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="Enter webhook URL" />
          </div>
        </div>
      )}
    </div>
  );
}
```

## 접근성

Switch 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원 (Space, Enter)
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시
- 라벨 연결 지원

## 모범 사례

1. **명확한 라벨링**: 모든 스위치에 명확한 라벨 제공
2. **상태 피드백**: 현재 상태를 명확하게 표시
3. **적절한 사용**: 켜짐/꺼짐 상태에만 사용
4. **시각적 구분**: 활성/비활성 상태를 명확히 구분
5. **접근성 고려**: 스크린 리더 사용자를 위한 적절한 설명

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | 스위치 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | - | 상태 변경 핸들러 |
| `defaultChecked` | `boolean` | `false` | 기본 상태 |
| `disabled` | `boolean` | `false` | 스위치 비활성화 |
| `required` | `boolean` | `false` | 필수 필드 표시 |
| `id` | `string` | - | 스위치 ID |
| `className` | `string` | - | 추가 CSS 클래스 |
