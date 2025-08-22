# Card

콘텐츠를 카드 형태로 표시하는 컴포넌트입니다. 헤더, 콘텐츠, 푸터를 포함할 수 있습니다.

## 기본 사용법

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}
```

## 간단한 카드

헤더 없이 콘텐츠만 포함하는 간단한 카드입니다.

```tsx
import { Card, CardContent } from "@/components/ui/card"

export function SimpleCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">$1,234</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  )
}
```

## 헤더가 있는 카드

제목과 설명이 포함된 헤더가 있는 카드입니다.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CardWithHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
    </Card>
  )
}
```

## 폼이 포함된 카드

카드 내부에 폼을 포함할 수 있습니다.

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Enter your email below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button>Create account</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## 카드 그리드

여러 카드를 그리드로 배치할 수 있습니다.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Your total revenue this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Active subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>Total sales this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 호버 효과가 있는 카드

호버 시 효과를 추가할 수 있습니다.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HoverCard() {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has hover effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the effects.</p>
      </CardContent>
    </Card>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab 키로 포커스 가능
- **스크린 리더**: 적절한 ARIA 속성과 역할 설정
- **시각적 계층**: 명확한 시각적 구분과 대비

## 모범 사례

1. **일관된 패딩**: 카드 내부 요소들의 간격을 일관되게 유지하세요
2. **적절한 크기**: 콘텐츠에 맞는 적절한 카드 크기를 사용하세요
3. **명확한 계층**: 헤더, 콘텐츠, 푸터의 역할을 명확히 구분하세요
4. **반응형 디자인**: 다양한 화면 크기에 대응할 수 있도록 설계하세요

## API 참조

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 카드로 렌더링 |

### CardHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 헤더로 렌더링 |

### CardTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 제목으로 렌더링 |

### CardDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 설명으로 렌더링 |

### CardContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |

### CardFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 푸터로 렌더링 |
