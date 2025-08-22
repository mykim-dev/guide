---
title: "Checkbox"
description: "체크박스 컴포넌트 사용 가이드"
---

# Checkbox 컴포넌트

체크박스는 사용자가 하나 이상의 옵션을 선택할 수 있게 해주는 UI 요소입니다.

## 기본 사용법

```tsx
import { Checkbox } from '@/components/ui/checkbox';

export function MyComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
}
```

## 사용 예제

### 기본 체크박스
```tsx
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### 제어된 컴포넌트
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="controlled"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Label htmlFor="controlled">Controlled checkbox</Label>
    </div>
  );
}
```

### 여러 체크박스
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function MultipleCheckboxes() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const items = [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'svelte', label: 'Svelte' },
  ];

  const handleCheckedChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter(id => id !== itemId));
    }
  };

  return (
    <div className="space-y-2">
      <Label>Select your favorite frameworks:</Label>
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={item.id}
            checked={checkedItems.includes(item.id)}
            onCheckedChange={(checked) => handleCheckedChange(item.id, checked as boolean)}
          />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </div>
  );
}
```

### 비활성화 상태
```tsx
<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="enabled" />
    <Label htmlFor="enabled">Enabled checkbox</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled" disabled />
    <Label htmlFor="disabled" className="text-muted-foreground">Disabled checkbox</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled checked checkbox</Label>
  </div>
</div>
```

### 필수 체크박스
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function RequiredCheckbox() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      setError('You must accept the terms to continue');
    } else {
      setError('');
      // 폼 제출 로직
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={(checked) => {
              setAccepted(checked as boolean);
              if (checked) setError('');
            }}
            required
          />
          <Label htmlFor="terms">I accept the terms and conditions</Label>
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
      <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">
        Continue
      </button>
    </form>
  );
}
```

### 아이콘과 함께 사용
```tsx
import { Check, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="feature1" />
    <Label htmlFor="feature1" className="flex items-center gap-2">
      <Check className="h-4 w-4 text-green-500" />
      Feature 1
    </Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="feature2" />
    <Label htmlFor="feature2" className="flex items-center gap-2">
      <X className="h-4 w-4 text-red-500" />
      Feature 2
    </Label>
  </div>
</div>
```

### 폼과 함께 사용
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function RegistrationForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
}
```

### 중간 상태 (Indeterminate)
```tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function IndeterminateCheckbox() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    item1: false,
    item2: false,
    item3: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);
  const someChecked = Object.values(checkedItems).some(Boolean);

  const handleSelectAll = (checked: boolean) => {
    const newState = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = checked;
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(newState);
  };

  const handleItemChange = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={allChecked}
          ref={(el) => {
            if (el) {
              el.indeterminate = someChecked && !allChecked;
            }
          }}
          onCheckedChange={handleSelectAll}
        />
        <Label htmlFor="select-all">Select All</Label>
      </div>
      {Object.entries(checkedItems).map(([itemId, checked]) => (
        <div key={itemId} className="flex items-center space-x-2 ml-4">
          <Checkbox
            id={itemId}
            checked={checked}
            onCheckedChange={(isChecked) => handleItemChange(itemId, isChecked as boolean)}
          />
          <Label htmlFor={itemId}>{itemId}</Label>
        </div>
      ))}
    </div>
  );
}
```

## 접근성

체크박스 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원 (Space, Enter)
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시
- 라벨 연결 지원

## 모범 사례

1. **명확한 라벨링**: 모든 체크박스에 명확한 라벨 제공
2. **적절한 그룹화**: 관련된 체크박스들을 논리적으로 그룹화
3. **기본값 설정**: 적절한 경우 기본값 제공
4. **유효성 검사**: 필수 체크박스에 대한 명확한 피드백
5. **접근성 고려**: 스크린 리더 사용자를 위한 적절한 설명

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | 체크박스 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | - | 상태 변경 핸들러 |
| `defaultChecked` | `boolean` | `false` | 기본 체크 상태 |
| `disabled` | `boolean` | `false` | 체크박스 비활성화 |
| `required` | `boolean` | `false` | 필수 필드 표시 |
| `id` | `string` | - | 체크박스 ID |
| `className` | `string` | - | 추가 CSS 클래스 |
