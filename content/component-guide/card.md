---
title: "Card"
description: "카드는 관련된 콘텐츠를 그룹화하고 구조화하는 컨테이너 컴포넌트입니다."
---

# Card 컴포넌트

카드는 관련된 콘텐츠를 그룹화하고 구조화하는 컨테이너 컴포넌트입니다.

## 기본 사용법

```tsx
import { Card } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>기본 Card</Card>
  );
}
```

## 기본 사용법

### Simple Card

:::component-example SimpleCardExample
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="text-2xl font-bold">$1,234</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
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

### Card with Header

:::component-example CardWithHeaderExample
```tsx
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

## 폼과 함께 사용

### Card with Form

:::component-example CardWithFormExample
```tsx
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

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | 컴포넌트의 스타일 변형 |
| `size` | `string` | `'default'` | 컴포넌트의 크기 |
| `disabled` | `boolean` | `false` | 컴포넌트 비활성화 |

## 접근성

Card 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
