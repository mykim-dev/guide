---
title: "Input"
description: "입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다."
---

# Input 컴포넌트

입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다.

## 기본 사용법

```tsx
import { Input } from '@/components/ui/input';

export function MyComponent() {
  return (
    <Input>기본 Input</Input>
  );
}
```

## 기본 타입

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

## 아이콘과 함께 사용

### Icon Input

:::component-example IconInputExample
```tsx
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

<div>
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
</div>
:::

## 라벨과 함께 사용

### Basic Form

:::component-example BasicFormExample
```tsx
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

<div>
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
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | 컴포넌트의 스타일 변형 |
| `size` | `string` | `'default'` | 컴포넌트의 크기 |
| `disabled` | `boolean` | `false` | 컴포넌트 비활성화 |

## 접근성

Input 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
