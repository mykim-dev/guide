# ToggleGroup

여러 토글 버튼을 그룹으로 묶은 컴포넌트입니다. 단일 선택 또는 다중 선택이 가능합니다.

## 기본 사용법

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  )
}
```

## 단일 선택

`type="single"`을 사용하여 하나만 선택할 수 있습니다.

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSingle() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  )
}
```

## 아이콘 토글 그룹

아이콘을 포함한 토글 그룹입니다.

```tsx
import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupWithIcons() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

## 제어된 토글 그룹

`value`와 `onValueChange`를 사용하여 토글 그룹을 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupControlled() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <p className="text-sm text-muted-foreground">
        Selected: {value.length > 0 ? value.join(", ") : "none"}
      </p>
    </div>
  )
}
```

## 크기 변형

다양한 크기의 토글 그룹을 사용할 수 있습니다.

```tsx
import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSizes() {
  return (
    <div className="space-y-4">
      <ToggleGroup type="multiple" size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <ToggleGroup type="multiple" size="default">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <ToggleGroup type="multiple" size="lg">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Arrow keys, Enter, Space 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **그룹 관리**: 관련된 토글들이 적절히 그룹화됨

## 모범 사례

1. **명확한 라벨**: 각 토글의 목적을 명확히 하세요
2. **적절한 그룹화**: 관련된 토글들을 함께 그룹화하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **시각적 피드백**: 상태 변화를 명확히 표시하세요

## API 참조

### ToggleGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | `"single"` | 선택 타입 |
| `value` | `string \| string[]` | - | 현재 선택된 값 (제어된 컴포넌트) |
| `defaultValue` | `string \| string[]` | - | 기본 선택된 값 |
| `onValueChange` | `(value: string \| string[]) => void` | - | 값 변경 핸들러 |
| `disabled` | `boolean` | `false` | 전체 그룹 비활성화 |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | 토글 크기 |
| `variant` | `"default" \| "outline"` | `"default"` | 토글 스타일 변형 |

### ToggleGroupItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 토글 항목의 값 |
| `disabled` | `boolean` | `false` | 토글 항목 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 토글 항목으로 렌더링 |
