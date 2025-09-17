---
title: "Badge"
description: "배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다."
---

# Badge 컴포넌트

배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다.

## 기본 사용법

```tsx
import { Badge } from '@/components/ui/badge';

export function MyComponent() {
  return (
    <Badge>기본 Badge</Badge>
  );
}
```

## Variants

다양한 스타일 변형을 지원합니다:

### Default

:::component-example DefaultBadgeExample
```tsx
<Badge>Default Badge</Badge>
```

<div>
<Badge>Default Badge</Badge>
</div>
:::

### Secondary

:::component-example SecondaryBadgeExample
```tsx
<Badge variant="secondary">Secondary Badge</Badge>
```

<div>
<Badge variant="secondary">Secondary Badge</Badge>
</div>
:::

### Destructive

:::component-example DestructiveBadgeExample
```tsx
<Badge variant="destructive">Error</Badge>
```

<div>
<Badge variant="destructive">Error</Badge>
</div>
:::

### Outline

:::component-example OutlineBadgeExample
```tsx
<Badge variant="outline">Outline Badge</Badge>
```

<div>
<Badge variant="outline">Outline Badge</Badge>
</div>
:::

## 사용 사례

### Status

:::component-example StatusBadgeExample
```tsx
<div className="flex gap-2">
  <Badge>Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
  <Badge variant="outline">Draft</Badge>
</div>
```

<div>
<div className="flex gap-2">
  <Badge>Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
  <Badge variant="outline">Draft</Badge>
</div>
</div>
:::

### Category

:::component-example CategoryBadgeExample
```tsx
<div className="flex gap-2">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Next.js</Badge>
  <Badge>Tailwind CSS</Badge>
</div>
```

<div>
<div className="flex gap-2">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Next.js</Badge>
  <Badge>Tailwind CSS</Badge>
</div>
</div>
:::

### Notification

:::component-example NotificationBadgeExample
```tsx
<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="destructive">5</Badge>
</div>
```

<div>
<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="destructive">5</Badge>
</div>
</div>
:::

### Icon Badge

:::component-example IconBadgeExample
```tsx
<div className="flex gap-2">
  <Badge className="flex items-center gap-1">
    <CheckCircle className="h-3 w-3" />
    Completed
  </Badge>
  <Badge variant="secondary" className="flex items-center gap-1">
    <Clock className="h-3 w-3" />
    In Progress
  </Badge>
  <Badge variant="destructive" className="flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    Error
  </Badge>
</div>
```

<div>
<div className="flex gap-2">
  <Badge className="flex items-center gap-1">
    <CheckCircle className="h-3 w-3" />
    Completed
  </Badge>
  <Badge variant="secondary" className="flex items-center gap-1">
    <Clock className="h-3 w-3" />
    In Progress
  </Badge>
  <Badge variant="destructive" className="flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    Error
  </Badge>
</div>
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

Badge 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
