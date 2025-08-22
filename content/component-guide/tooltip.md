# Tooltip

요소에 대한 추가 정보를 표시하는 툴팁 컴포넌트입니다. 호버 시 나타나는 작은 팝업입니다.

## 기본 사용법

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Hover me
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## 다양한 방향

툴팁이 나타날 방향을 설정할 수 있습니다.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDirections() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Top
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Right
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Bottom
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Left
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab 키로 포커스 가능
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **지연 표시**: 기본적으로 약간의 지연 후 표시됨

## 모범 사례

1. **명확한 정보**: 툴팁에 유용하고 명확한 정보를 제공하세요
2. **적절한 사용**: 복잡한 정보는 다른 방식으로 표시하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 사용자가 접근할 수 있도록 설계하세요

## API 참조

### TooltipProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayDuration` | `number` | `700` | 툴팁 표시 지연 시간 (ms) |
| `skipDelayDuration` | `number` | `300` | 연속 호버 시 지연 시간 (ms) |

### Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `false` | 기본 열림 상태 |
| `open` | `boolean` | - | 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |

### TooltipTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### TooltipContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | 툴팁 표시 방향 |
| `sideOffset` | `number` | `4` | 트리거로부터의 거리 |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 정렬 방식 |
| `alignOffset` | `number` | `0` | 정렬 오프셋 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
