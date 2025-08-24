---
title: "Calendar"
description: "캘린더 컴포넌트"
---

## 기본 사용법

```tsx
import { Calendar } from '@/components/ui/calendar';

export function MyComponent() {
  return (
    <Calendar>기본 Calendar</Calendar>
  );
}
```

## 기본 사용법

### Basic Calendar

:::component-example BasicCalendarExample
```tsx
<Calendar
  mode="single"
  selected={new Date()}
  className="rounded-md border"
/>
```

<div>
<Calendar
  mode="single"
  selected={new Date()}
  className="rounded-md border"
/>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' | 'multiple' | 'range'` | `'single'` | 선택 모드 |
| `selected` | `Date | Date[] | DateRange` | `undefined` | 선택된 날짜 |
| `onSelect` | `(date: Date | Date[] | DateRange) => void` | `undefined` | 날짜 선택 핸들러 |
| `defaultSelected` | `Date | Date[] | DateRange` | `undefined` | 기본 선택 날짜 |
| `disabled` | `boolean | Date[] | (date: Date) => boolean` | `false` | 비활성화된 날짜 |
| `showOutsideDays` | `boolean` | `true` | 다른 월의 날짜 표시 |
| `captionLayout` | `'label' | 'dropdown'` | `'label'` | 캡션 레이아웃 |
| `buttonVariant` | `ButtonVariant` | `'ghost'` | 버튼 스타일 |

## 접근성

Calendar 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
