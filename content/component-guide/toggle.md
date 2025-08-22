# Toggle

눌림 상태를 가지는 토글 버튼 컴포넌트입니다. 온/오프 상태를 표시하는 버튼입니다.

## 기본 사용법

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return <Toggle>Toggle</Toggle>
}
```

## 아이콘 토글

아이콘을 포함한 토글 버튼입니다.

```tsx
import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleWithIcon() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
```

## 텍스트와 아이콘

텍스트와 아이콘을 함께 사용하는 토글입니다.

```tsx
import { Italic } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  )
}
```

## 크기 변형

다양한 크기의 토글을 사용할 수 있습니다.

```tsx
import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div className="flex items-center space-x-2">
      <Toggle size="sm" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
```

## 제어된 토글

`pressed`와 `onPressedChange`를 사용하여 토글을 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleControlled() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="space-y-4">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <p className="text-sm text-muted-foreground">
        Bold is {pressed ? "enabled" : "disabled"}
      </p>
    </div>
  )
}
```

## 비활성화된 토글

토글을 비활성화할 수 있습니다.

```tsx
import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <Toggle disabled aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Enter, Space 키 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **상태 표시**: 눌림 상태가 명확히 전달됨

## 모범 사례

1. **명확한 라벨**: 토글의 목적을 명확히 하세요
2. **적절한 사용**: 온/오프 상태를 나타낼 때 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **시각적 피드백**: 상태 변화를 명확히 표시하세요

## API 참조

### Toggle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressed` | `boolean` | - | 눌림 상태 (제어된 컴포넌트) |
| `defaultPressed` | `boolean` | `false` | 기본 눌림 상태 |
| `onPressedChange` | `(pressed: boolean) => void` | - | 눌림 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | 토글 비활성화 |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | 토글 크기 |
| `variant` | `"default" \| "outline"` | `"default"` | 토글 스타일 변형 |
| `asChild` | `boolean` | `false` | 자식 요소를 토글로 렌더링 |
