---
title: "RadioGroup"
description: "라디오 그룹 컴포넌트 사용 가이드"
---

## 기본 사용법

```tsx
import { RadioGroup } from '@/components/ui/radio-group';

export function MyComponent() {
  return (
    <RadioGroup>기본 Radio Group</RadioGroup>
  );
}
```

## 기본 사용법

### Basic Radio

:::component-example BasicRadioExample
```tsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

<div>
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | 선택된 값 |
| `onValueChange` | `(value: string) => void` | `undefined` | 값 변경 핸들러 |
| `defaultValue` | `string` | `undefined` | 기본값 |
| `disabled` | `boolean` | `false` | 라디오 그룹 비활성화 |

### RadioGroupItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `required` | 라디오 아이템 값 |
| `disabled` | `boolean` | `false` | 라디오 아이템 비활성화 |
| `id` | `string` | `undefined` | HTML id 속성 |

## 접근성

Radio Group 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
