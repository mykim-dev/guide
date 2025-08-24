---
title: "Card"
description: "카드 컴포넌트는 콘텐츠를 그룹화하고 구조화하는 컨테이너입니다."
---

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
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

<div>
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
</div>
:::

### Card with Stats

:::component-example CardWithStatsExample
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

### Card with Action

:::component-example CardWithActionExample
```tsx
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
    <CardAction>
      <Button size="sm">Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>
```

<div>
<Card className="w-[300px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
    <CardAction>
      <Button size="sm">Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>
</div>
:::

## API Reference

### Props

모든 Card 컴포넌트들은 표준 HTML div props를 상속받습니다.

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
