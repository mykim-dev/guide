---
title: "Button"
description: "버튼은 사용자의 주요 액션을 트리거하는 핵심 UI 요소입니다."
---

## 기본 사용법

```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <Button>기본 Button</Button>
  );
}
```

## Variants

버튼은 다양한 스타일 변형을 지원합니다:

### Default

:::component-example DefaultButtonExample
```tsx
<Button>Default Button</Button>
```

<div>
<Button>Default Button</Button>
</div>
:::

### Secondary

:::component-example SecondaryButtonExample
```tsx
<Button variant="secondary">Secondary Button</Button>
```

<div>
<Button variant="secondary">Secondary Button</Button>
</div>
:::

### Destructive

:::component-example DestructiveButtonExample
```tsx
<Button variant="destructive">Delete</Button>
```

<div>
<Button variant="destructive">Delete</Button>
</div>
:::

### Outline

:::component-example OutlineButtonExample
```tsx
<Button variant="outline">Outline Button</Button>
```

<div>
<Button variant="outline">Outline Button</Button>
</div>
:::

### Ghost

:::component-example GhostButtonExample
```tsx
<Button variant="ghost">Ghost Button</Button>
```

<div>
<Button variant="ghost">Ghost Button</Button>
</div>
:::

### Link

:::component-example LinkButtonExample
```tsx
<Button variant="link">Link Button</Button>
```

<div>
<Button variant="link">Link Button</Button>
</div>
:::

## Sizes

버튼은 다양한 크기를 지원합니다:

### Small

:::component-example SmallButtonExample
```tsx
<Button size="sm">Small Button</Button>
```

<div>
<Button size="sm">Small Button</Button>
</div>
:::

### Large

:::component-example LargeButtonExample
```tsx
<Button size="lg">Large Button</Button>
```

<div>
<Button size="lg">Large Button</Button>
</div>
:::

### Icon

:::component-example IconButtonExample
```tsx
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

<div>
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>
</div>
:::

## Advanced

고급 기능들:

### As Child

:::component-example LinkButtonExample
```tsx
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

<div>
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'` | `'default'` | 버튼의 스타일 변형 |
| `size` | `'default' | 'sm' | 'lg' | 'icon'` | `'default'` | 버튼의 크기 |
| `asChild` | `boolean` | `false` | 자식 요소를 버튼으로 렌더링 |
| `disabled` | `boolean` | `false` | 버튼 비활성화 |

## 접근성

Button 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
