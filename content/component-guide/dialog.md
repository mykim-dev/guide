# Dialog

모달 다이얼로그 컴포넌트입니다. 사용자의 주의를 끌고 중요한 작업이나 정보를 표시할 때 사용합니다.

## 기본 사용법

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
```

## 제어된 다이얼로그

`open`과 `onOpenChange`를 사용하여 다이얼로그를 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogControlled() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            This dialog is controlled by React state.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Escape 키 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 다이얼로그가 열릴 때 포커스가 올바르게 관리됨

## 모범 사례

1. **명확한 목적**: 다이얼로그의 목적을 명확히 하세요
2. **적절한 사용**: 중요한 작업이나 정보에만 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 사용자가 접근할 수 있도록 설계하세요

## API 참조

### Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | 다이얼로그 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `modal` | `boolean` | `true` | 모달 모드 여부 |

### DialogTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |

### DialogHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 헤더로 렌더링 |

### DialogTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 제목으로 렌더링 |

### DialogDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 설명으로 렌더링 |

### DialogFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 푸터로 렌더링 |
