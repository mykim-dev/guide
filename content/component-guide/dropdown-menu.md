# DropdownMenu

드롭다운 메뉴 컴포넌트입니다. 클릭 시 나타나는 메뉴 목록을 표시합니다.

## 기본 사용법

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 체크박스가 있는 메뉴

체크박스가 포함된 드롭다운 메뉴입니다.

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Show Toolbar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Show Statusbar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Show Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 라디오 그룹이 있는 메뉴

라디오 그룹이 포함된 드롭다운 메뉴입니다.

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuRadioGroup() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="bottom">
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Arrow keys, Enter, Escape 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 메뉴가 열릴 때 포커스가 올바르게 관리됨

## 모범 사례

1. **명확한 라벨링**: 메뉴 항목의 라벨이 명확하고 이해하기 쉽도록 하세요
2. **적절한 사용**: 관련된 액션들을 그룹화할 때 사용하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 사용자가 접근할 수 있도록 설계하세요

## API 참조

### DropdownMenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | 메뉴 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `modal` | `boolean` | `false` | 모달 모드 여부 |

### DropdownMenuTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### DropdownMenuContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | 메뉴 표시 방향 |
| `sideOffset` | `number` | `4` | 트리거로부터의 거리 |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 정렬 방식 |
| `alignOffset` | `number` | `0` | 정렬 오프셋 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |

### DropdownMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | 메뉴 항목 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 메뉴 항목으로 렌더링 |

### DropdownMenuCheckboxItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | 체크박스 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | - | 체크박스 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | 체크박스 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 체크박스 항목으로 렌더링 |

### DropdownMenuRadioItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 라디오 항목의 값 |
| `disabled` | `boolean` | `false` | 라디오 항목 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 라디오 항목으로 렌더링 |

### DropdownMenuRadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 현재 선택된 값 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 핸들러 |

### DropdownMenuLabel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 라벨로 렌더링 |

### DropdownMenuSeparator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 구분선으로 렌더링 |
