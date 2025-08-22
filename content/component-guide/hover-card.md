# HoverCard

호버 시 나타나는 카드 컴포넌트입니다. 추가 정보나 미리보기를 제공할 때 사용합니다.

## 기본 사용법

```tsx
import { CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## 사용자 프로필 카드

사용자 정보를 보여주는 호버 카드입니다.

```tsx
import { MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function UserProfileHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal">
          John Doe
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/john.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-sm text-muted-foreground">
              Senior Frontend Developer at Acme Corp
            </p>
            <div className="flex items-center pt-2">
              <MapPin className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                San Francisco, CA
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined January 2020
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab 키로 포커스 가능
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **지연 표시**: 호버 후 약간의 지연 시간 제공

## 모범 사례

1. **유용한 정보**: 호버 카드에 유용한 추가 정보를 제공하세요
2. **적절한 크기**: 콘텐츠에 맞는 적절한 크기로 설정하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **성능**: 불필요한 데이터 로딩을 피하세요

## API 참조

### HoverCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | 호버 카드 열림 상태 (제어된 컴포넌트) |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 핸들러 |
| `openDelay` | `number` | `700` | 열림 지연 시간 (ms) |
| `closeDelay` | `number` | `300` | 닫힘 지연 시간 (ms) |

### HoverCardTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### HoverCardContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | 호버 카드 표시 방향 |
| `sideOffset` | `number` | `4` | 트리거로부터의 거리 |
| `align` | `"start" \| "center" \| "end"` | `"center"` | 정렬 방식 |
| `alignOffset` | `number` | `0` | 정렬 오프셋 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
