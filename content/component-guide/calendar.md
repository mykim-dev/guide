# Calendar

날짜 선택을 위한 캘린더 컴포넌트입니다. 단일 날짜나 날짜 범위를 선택할 수 있습니다.

## 기본 사용법

```tsx
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

## 날짜 범위 선택

날짜 범위를 선택할 수 있는 캘린더입니다.

```tsx
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

export function CalendarRange() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 0, 27),
  })

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}
```

## 다중 날짜 선택

여러 날짜를 선택할 수 있는 캘린더입니다.

```tsx
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarMultiple() {
  const [dates, setDates] = useState<Date[] | undefined>([])

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      className="rounded-md border"
    />
  )
}
```

## 접근성

- **키보드 네비게이션**: Arrow keys, Enter, Space 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **날짜 형식**: 적절한 날짜 형식으로 읽힘

## 모범 사례

1. **명확한 선택**: 선택된 날짜가 명확히 표시되도록 하세요
2. **적절한 범위**: 선택 가능한 날짜 범위를 적절히 제한하세요
3. **일관성**: 같은 애플리케이션에서 동일한 날짜 형식을 사용하세요
4. **사용자 경험**: 직관적인 날짜 선택 경험을 제공하세요

## API 참조

### Calendar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "multiple" \| "range"` | `"single"` | 선택 모드 |
| `selected` | `Date \| Date[] \| DateRange` | - | 선택된 날짜 |
| `onSelect` | `(date: Date \| Date[] \| DateRange) => void` | - | 날짜 선택 핸들러 |
| `disabled` | `boolean \| Date[] \| (date: Date) => boolean` | `false` | 비활성화된 날짜 |
| `numberOfMonths` | `number` | `1` | 표시할 월의 수 |
| `initialFocus` | `boolean` | `false` | 초기 포커스 설정 |
