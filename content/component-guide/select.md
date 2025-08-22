---
title: "Select"
description: "선택 컴포넌트 사용 가이드"
---

# Select 컴포넌트

Select 컴포넌트는 사용자가 옵션 목록에서 하나를 선택할 수 있는 드롭다운 인터페이스를 제공합니다.

## 기본 사용법

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## 사용 예제

### 기본 선택
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>
```

### 제어된 컴포넌트
```tsx
import { useState } from 'react';

function ControlledSelect() {
  const [value, setValue] = useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 라벨과 함께 사용
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### 비활성화 상태
```tsx
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### 그룹화된 옵션
```tsx
<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="frontend">Frontend</SelectItem>
    <SelectItem value="backend">Backend</SelectItem>
    <SelectItem value="database">Database</SelectItem>
    <SelectItem value="devops">DevOps</SelectItem>
    <SelectItem value="mobile">Mobile</SelectItem>
  </SelectContent>
</Select>
```

### 아이콘과 함께 사용
```tsx
import { Globe, Code, Database, Server } from 'lucide-react';

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a technology" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="web">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        Web Development
      </div>
    </SelectItem>
    <SelectItem value="mobile">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4" />
        Mobile Development
      </div>
    </SelectItem>
    <SelectItem value="database">
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4" />
        Database
      </div>
    </SelectItem>
    <SelectItem value="server">
      <div className="flex items-center gap-2">
        <Server className="h-4 w-4" />
        Server
      </div>
    </SelectItem>
  </SelectContent>
</Select>
```

### 폼과 함께 사용
```tsx
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function UserForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="tester">Tester</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### 유효성 검사
```tsx
import { useState } from 'react';

function ValidationExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (!newValue) {
      setError('Please select an option');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className={error ? 'border-red-500' : ''}>
          <SelectValue placeholder="Select an option (required)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

## 접근성

Select 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원 (화살표 키, Enter, Escape)
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 관리
- 라벨 연결 지원

## 모범 사례

1. **명확한 라벨링**: 모든 Select에 명확한 라벨 제공
2. **적절한 플레이스홀더**: 사용자가 무엇을 선택해야 하는지 명확히 안내
3. **논리적 순서**: 옵션들을 논리적이고 일관된 순서로 정렬
4. **적절한 크기**: 옵션 목록이 너무 길지 않도록 그룹화 고려
5. **기본값 설정**: 적절한 경우 기본값 제공

## API Reference

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 선택된 값 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 핸들러 |
| `defaultValue` | `string` | - | 기본값 |
| `disabled` | `boolean` | `false` | Select 비활성화 |
| `required` | `boolean` | `false` | 필수 필드 표시 |

### SelectTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `disabled` | `boolean` | - | 트리거 비활성화 |

### SelectValue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |

### SelectContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'popper' \| 'item'` | `'popper'` | 포지셔닝 모드 |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 표시 위치 |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | 정렬 방식 |

### SelectItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 아이템 값 |
| `disabled` | `boolean` | `false` | 아이템 비활성화 |
