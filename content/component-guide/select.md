---
title: "Select"
description: "셀렉트는 드롭다운 목록에서 옵션을 선택할 수 있는 컴포넌트입니다."
---

## 기본 사용법

```tsx
import { Select } from '@/components/ui/select';

export function MyComponent() {
  return (
    <Select>기본 Select</Select>
  );
}
```

## 기본 사용법

### Basic Select

:::component-example BasicSelectExample
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

<div>
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
</div>
:::

### Small Select

:::component-example SmallSelectExample
```tsx
<Select>
  <SelectTrigger size="sm" className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

<div>
<Select>
  <SelectTrigger size="sm" className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | 선택된 값 |
| `onValueChange` | `(value: string) => void` | `undefined` | 값 변경 핸들러 |
| `defaultValue` | `string` | `undefined` | 기본값 |
| `disabled` | `boolean` | `false` | 셀렉트 비활성화 |

### SelectTrigger Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' | 'default'` | `'default'` | 트리거 크기 |

### SelectContent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'popper' | 'item'` | `'popper'` | 위치 설정 |

## 접근성

Select 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
