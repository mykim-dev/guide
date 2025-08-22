---
title: "Input"
description: "입력 필드 컴포넌트 사용 가이드"
---

# Input 컴포넌트

입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다.

## 기본 사용법

```tsx
import { Input } from '@/components/ui/input';

export function MyComponent() {
  return (
    <Input placeholder="Enter your text here" />
  );
}
```

## Input Types

다양한 입력 타입을 지원합니다:

### Text

:::component-example TextInputExample
```tsx
<Input type="text" placeholder="Enter your name" />
```

<div>
<Input type="text" placeholder="Enter your name" />
</div>
:::

### Email

:::component-example EmailInputExample
```tsx
<Input type="email" placeholder="Enter your email" />
```

<div>
<Input type="email" placeholder="Enter your email" />
</div>
:::

### Password

:::component-example PasswordInputExample
```tsx
<Input type="password" placeholder="Enter your password" />
```

<div>
<Input type="password" placeholder="Enter your password" />
</div>
:::

### Number

:::component-example NumberInputExample
```tsx
<Input type="number" placeholder="Enter your age" />
```

<div>
<Input type="number" placeholder="Enter your age" />
</div>
:::

### Search

:::component-example SearchInputExample
```tsx
<Input type="search" placeholder="Search..." />
```

<div>
<Input type="search" placeholder="Search..." />
</div>
:::

### URL

:::component-example UrlInputExample
```tsx
<Input type="url" placeholder="Enter website URL" />
```

<div>
<Input type="url" placeholder="Enter website URL" />
</div>
:::

### Tel

:::component-example TelInputExample
```tsx
<Input type="tel" placeholder="Enter phone number" />
```

<div>
<Input type="tel" placeholder="Enter phone number" />
</div>
:::

## 사용 예제

### 기본 폼

:::component-example BasicFormExample
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your full name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" placeholder="Enter your password" />
  </div>
</div>
```

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your full name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" placeholder="Enter your password" />
  </div>
</div>
:::

### 아이콘과 함께 사용

:::component-example IconInputExample
```tsx
import { Search, Mail, Lock } from 'lucide-react';

<div className="space-y-4">
  <div className="relative">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input placeholder="Search..." className="pl-10" />
  </div>
  <div className="relative">
    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input type="email" placeholder="Email" className="pl-10" />
  </div>
  <div className="relative">
    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input type="password" placeholder="Password" className="pl-10" />
  </div>
</div>
```

<div className="space-y-4">
  <div className="relative">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input placeholder="Search..." className="pl-10" />
  </div>
  <div className="relative">
    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input type="email" placeholder="Email" className="pl-10" />
  </div>
  <div className="relative">
    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input type="password" placeholder="Password" className="pl-10" />
  </div>
</div>
:::

## 접근성

Input 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 입력 필드의 목적을 명확하게 설명하는 라벨 사용
2. **적절한 플레이스홀더**: 사용자가 입력해야 할 내용을 안내하는 텍스트 제공
3. **입력 검증**: 적절한 입력 타입과 패턴을 사용하여 데이터 검증
4. **오류 처리**: 사용자에게 명확한 오류 메시지 제공

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | 입력 필드의 타입 |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 입력 필드 비활성화 |
| `readOnly` | `boolean` | `false` | 읽기 전용 모드 |
| `required` | `boolean` | `false` | 필수 입력 필드 |
| `value` | `string` | - | 입력 필드의 값 |
| `onChange` | `function` | - | 값 변경 시 호출되는 함수 |
