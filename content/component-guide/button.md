---
title: "Button"
description: "버튼은 사용자의 주요 액션을 트리거하는 핵심 UI 요소입니다."
---

# Button 컴포넌트

버튼은 사용자의 주요 액션을 트리거하는 핵심 UI 요소입니다.

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

### Default Size

:::component-example DefaultSizeExample
```tsx
<Button>Default Size</Button>
```

<div>
<Button>Default Size</Button>
</div>
:::

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

## 상태

### Disabled

:::component-example DisabledButtonExample
```tsx
<Button disabled>Disabled Button</Button>
```

<div>
<Button disabled>Disabled Button</Button>
</div>
:::

### Loading

:::component-example LoadingButtonExample
```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

<div>
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
</div>
:::

## 아이콘과 함께 사용

### Icon Buttons

:::component-example IconButtonExamples
```tsx
<div className="flex gap-4 items-center">
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add Item
  </Button>
  
  <Button variant="outline">
    <Download className="mr-2 h-4 w-4" />
    Download
  </Button>
  
  <Button variant="ghost" size="icon">
    <Settings className="h-4 w-4" />
  </Button>
</div>
```

<div>
<div className="flex gap-4 items-center">
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add Item
  </Button>
  
  <Button variant="outline">
    <Download className="mr-2 h-4 w-4" />
    Download
  </Button>
  
  <Button variant="ghost" size="icon">
    <Settings className="h-4 w-4" />
  </Button>
</div>
</div>
:::

## 링크로 사용

### Link Button

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
| `variant` | `string` | `'default'` | 컴포넌트의 스타일 변형 |
| `size` | `string` | `'default'` | 컴포넌트의 크기 |
| `disabled` | `boolean` | `false` | 컴포넌트 비활성화 |

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
