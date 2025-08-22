# Sheet

화면 가장자리에서 슬라이드되어 나타나는 사이드 패널 컴포넌트입니다. 모바일 메뉴, 설정 패널 등에 유용합니다.

## 기본 사용법

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

## 다양한 방향

Sheet가 나타날 방향을 설정할 수 있습니다.

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetSides() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Sheet from Top</SheetTitle>
            <SheetDescription>
              This sheet slides down from the top.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet from Right</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Sheet from Bottom</SheetTitle>
            <SheetDescription>
              This sheet slides up from the bottom.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet from Left</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
```

## 제어된 Sheet

`open`과 `onOpenChange`를 사용하여 Sheet를 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetControlled() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controlled Sheet</SheetTitle>
          <SheetDescription>
            This sheet is controlled by React state.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Escape 키 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: Sheet가 열릴 때 포커스가 올바르게 관리됨

## 모범 사례

1. **명확한 목적**: Sheet의 목적을 명확히 하세요
2. **적절한 사용**: 보조 콘텐츠나 액션에 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 사용자가 접근할 수 있도록 설계하세요

## API 참조

### Sheet

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Sheet 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `modal` | `boolean` | `true` | 모달 모드 여부 |

### SheetTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### SheetContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Sheet 표시 방향 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |

### SheetHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 헤더로 렌더링 |

### SheetTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 제목으로 렌더링 |

### SheetDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 설명으로 렌더링 |

### SheetFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 푸터로 렌더링 |
