---
title: "Badge"
description: "배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다."
---

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

### Status

:::component-example StatusBadgeExample
```tsx
<div className="flex gap-2">
  <Badge>Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>
```

<div>
<div className="flex gap-2">
  <Badge>Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' | 'secondary' | 'destructive' | 'outline'` | `'default'` | 배지의 스타일 변형 |
| `asChild` | `boolean` | `false` | 자식 요소를 배지로 렌더링 |

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
