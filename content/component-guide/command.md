# Command

검색 가능한 명령 팔레트 컴포넌트입니다. 키보드 단축키로 빠르게 액션을 실행할 수 있습니다.

## 기본 사용법

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

## 다이얼로그와 함께 사용

Command를 다이얼로그 내부에서 사용할 수 있습니다.

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Command Palette</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Command Palette</DialogTitle>
          <DialogDescription>
            Search for commands and actions.
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                New File
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Open File
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Save File
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                Go to Dashboard
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Go to Settings
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Go to Profile
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
```

## 아이콘이 있는 명령

명령 항목에 아이콘을 추가할 수 있습니다.

```tsx
import { FileText, Settings, User, Calendar } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandWithIcons() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>New Document</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

## 접근성

- **키보드 네비게이션**: Arrow keys, Enter, Escape 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **검색 기능**: 실시간 검색으로 접근성 향상

## 모범 사례

1. **명확한 명령**: 각 명령의 목적을 명확히 하세요
2. **그룹화**: 관련된 명령들을 그룹으로 묶으세요
3. **키보드 단축키**: 자주 사용하는 명령에 단축키를 제공하세요
4. **빠른 검색**: 효율적인 검색 알고리즘을 사용하세요

## API 참조

### Command

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 현재 선택된 값 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 핸들러 |
| `filter` | `(value: string, search: string) => number` | - | 커스텀 필터 함수 |
| `shouldFilter` | `boolean` | `true` | 자동 필터링 여부 |

### CommandInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 입력 값 |
| `onValueChange` | `(value: string) => void` | - | 입력 값 변경 핸들러 |

### CommandList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 리스트로 렌더링 |

### CommandEmpty

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 빈 상태로 렌더링 |

### CommandGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | - | 그룹 제목 |
| `asChild` | `boolean` | `false` | 자식 요소를 그룹으로 렌더링 |

### CommandItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 항목의 값 |
| `onSelect` | `(value: string) => void` | - | 선택 핸들러 |
| `disabled` | `boolean` | `false` | 항목 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 항목으로 렌더링 |
