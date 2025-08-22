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
```tsx
<Input type="text" placeholder="Enter your name" />
```

### Email
```tsx
<Input type="email" placeholder="Enter your email" />
```

### Password
```tsx
<Input type="password" placeholder="Enter your password" />
```

### Number
```tsx
<Input type="number" placeholder="Enter your age" />
```

### Search
```tsx
<Input type="search" placeholder="Search..." />
```

### URL
```tsx
<Input type="url" placeholder="Enter website URL" />
```

### Tel
```tsx
<Input type="tel" placeholder="Enter phone number" />
```

## 사용 예제

### 기본 폼
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

### 아이콘과 함께 사용
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

### 상태별 스타일
```tsx
<div className="space-y-4">
  <Input placeholder="Default input" />
  <Input placeholder="Disabled input" disabled />
  <Input placeholder="Read-only input" readOnly />
  <Input placeholder="Required input" required />
</div>
```

### 크기 변형
```tsx
<div className="space-y-4">
  <Input placeholder="Default size" />
  <Input placeholder="Large input" className="h-12 text-lg" />
  <Input placeholder="Small input" className="h-8 text-sm" />
</div>
```

### 유효성 검사
```tsx
import { useState } from 'react';

function ValidationExample() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(value === '' || validateEmail(value));
  };

  return (
    <div className="space-y-2">
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
        className={!isValid ? 'border-red-500' : ''}
      />
      {!isValid && (
        <p className="text-sm text-red-500">Please enter a valid email address</p>
      )}
    </div>
  );
}
```

## 접근성

입력 필드 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 라벨 연결 (`htmlFor` 속성)
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 포커스 표시
- 필수 필드 표시 (`required` 속성)

## 모범 사례

1. **명확한 라벨링**: 모든 입력 필드에 명확한 라벨 제공
2. **적절한 플레이스홀더**: 사용자가 무엇을 입력해야 하는지 명확히 안내
3. **유효성 검사**: 실시간 피드백 제공
4. **에러 메시지**: 명확하고 도움이 되는 에러 메시지 표시
5. **적절한 타입**: 입력 데이터에 맞는 HTML input 타입 사용

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'url' \| 'tel'` | `'text'` | 입력 필드의 타입 |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 입력 필드 비활성화 |
| `readOnly` | `boolean` | `false` | 읽기 전용 모드 |
| `required` | `boolean` | `false` | 필수 필드 표시 |
| `value` | `string` | - | 제어된 컴포넌트의 값 |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | - | 값 변경 핸들러 |
| `className` | `string` | - | 추가 CSS 클래스 |
