# Collapsible

접을 수 있는 콘텐츠 영역 컴포넌트입니다. Accordion과 비슷하지만 단일 항목에 대해 더 간단한 구조를 제공합니다.

## 기본 사용법

```tsx
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## 간단한 접기/펼치기

간단한 텍스트 접기/펼치기 기능입니다.

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function SimpleCollapsible() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="justify-start p-0">
          {isOpen ? "Hide" : "Show"} details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        <p className="text-sm text-muted-foreground">
          This is the collapsible content. It can contain any type of content
          including text, images, forms, or other components.
        </p>
        <p className="text-sm text-muted-foreground">
          The content is hidden by default and can be toggled by clicking
          the trigger button above.
        </p>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Enter, Space 키 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **상태 표시**: 열림/닫힘 상태가 명확히 전달됨

## 모범 사례

1. **명확한 트리거**: 트리거 버튼의 목적을 명확히 하세요
2. **적절한 사용**: 선택적 콘텐츠나 추가 정보에 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **시각적 피드백**: 상태 변화를 명확히 표시하세요

## API 참조

### Collapsible

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | 열림 상태 (제어된 컴포넌트) |
| `defaultOpen` | `boolean` | `false` | 기본 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | 컴포넌트 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 Collapsible로 렌더링 |

### CollapsibleTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### CollapsibleContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
