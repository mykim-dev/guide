---
title: "Card"
description: "카드 컴포넌트 사용 가이드"
---

# Card 컴포넌트

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

:::component-example SimpleCardExample
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

<div>
<Card>
  <CardContent className="pt-6">
    <div className="text-2xl font-bold">$1,234</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
</div>
:::

## 헤더가 있는 카드

제목과 설명이 포함된 헤더가 있는 카드입니다.

:::component-example CardWithHeaderExample
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

<div>
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
</div>
:::

## 폼이 포함된 카드

카드 내부에 폼을 포함할 수 있습니다.

:::component-example CardWithFormExample
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

<div>
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
</div>
:::

## 접근성

Card 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 시맨틱 HTML 구조
- 스크린 리더 호환성
- 키보드 네비게이션 지원
- 적절한 ARIA 속성

## 모범 사례

1. **명확한 구조**: 헤더, 콘텐츠, 푸터를 명확히 구분
2. **일관된 스타일**: 동일한 카드 타입은 일관된 스타일 사용
3. **적절한 크기**: 콘텐츠에 맞는 적절한 크기 설정
4. **반응형 디자인**: 다양한 화면 크기에 대응

## API Reference

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 카드 내용 |

### CardHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 헤더 내용 |

### CardTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 제목 내용 |

### CardDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 설명 내용 |

### CardContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 콘텐츠 내용 |

### CardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 푸터 내용 |
