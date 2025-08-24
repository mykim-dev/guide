---
title: "Input"
description: "입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다. 입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다. 입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다. 입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다. 입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다."
---

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

### Icon Input

:::component-example IconInputExample
```tsx
<div className="relative">
  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>
```

<div>
<div className="relative">
  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | 입력 필드 타입 |
| `placeholder` | `string` | `undefined` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 입력 필드 비활성화 |
| `value` | `string` | `undefined` | 입력 값 |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | `undefined` | 값 변경 핸들러 |

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
