---
title: "Checkbox"
description: "체크박스 컴포넌트 사용 가이드"
---

## 기본 사용법

```tsx
import { Checkbox } from '@/components/ui/checkbox';

export function MyComponent() {
  return (
    <Checkbox>기본 Checkbox</Checkbox>
  );
}
```

## 기본 사용법

### Basic Checkbox

:::component-example BasicCheckboxExample
```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
```

<div>
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
</div>
:::

### Checkbox Group

:::component-example CheckboxGroupExample
```tsx
<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="react" />
    <label htmlFor="react">React</label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="vue" />
    <label htmlFor="vue">Vue</label>
  </div>
</div>
```

<div>
<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="react" />
    <label htmlFor="react">React</label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="vue" />
    <label htmlFor="vue">Vue</label>
  </div>
</div>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | 체크 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | 체크 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | 체크박스 비활성화 |
| `id` | `string` | `undefined` | HTML id 속성 |

## 접근성

Checkbox 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
