# Popover

요소를 클릭했을 때 나타나는 팝오버 컴포넌트입니다. 추가 콘텐츠나 액션을 표시할 때 사용합니다.

## 기본 사용법

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width">Width</label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth">Max. width</label>
              <input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height">Height</label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight">Max. height</label>
              <input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

## 제어된 팝오버

`open`과 `onOpenChange`를 사용하여 팝오버를 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverControlled() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Controlled Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Controlled Popover</h4>
          <p className="text-sm text-muted-foreground">
            This popover is controlled by React state.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Escape 키 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 팝오버가 열릴 때 포커스가 올바르게 관리됨

## 모범 사례

1. **명확한 목적**: 팝오버의 목적을 명확히 하세요
2. **적절한 사용**: 추가 정보나 액션에만 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 사용자가 접근할 수 있도록 설계하세요

## API 참조

### Popover

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | 팝오버 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `modal` | `boolean` | `false` | 모달 모드 여부 |

### PopoverTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### PopoverContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | 팝오버 표시 방향 |
| `sideOffset` | `number` | `4` | 트리거로부터의 거리 |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 정렬 방식 |
| `alignOffset` | `number` | `0` | 정렬 오프셋 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
