---
title: "Accordion"
description: "아코디언 컴포넌트"
---

## 기본 사용법

```tsx
import { Accordion } from '@/components/ui/accordion';

export function MyComponent() {
  return (
    <Accordion>기본 Accordion</Accordion>
  );
}
```

## 기본 사용법

### Basic Accordion

:::component-example BasicAccordionExample
```tsx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components&apos; aesthetic.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

<div>
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components&apos; aesthetic.
    </AccordionContent>
  </AccordionItem>
</Accordion>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' | 'multiple'` | `required` | 아코디언 타입 |
| `value` | `string | string[]` | `undefined` | 열린 아이템 값 |
| `onValueChange` | `(value: string | string[]) => void` | `undefined` | 값 변경 핸들러 |
| `defaultValue` | `string | string[]` | `undefined` | 기본값 |
| `collapsible` | `boolean` | `false` | 모든 아이템 닫기 허용 (single 타입만) |

### AccordionItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `required` | 아이템 값 |
| `disabled` | `boolean` | `false` | 아이템 비활성화 |

## 접근성

Accordion 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
