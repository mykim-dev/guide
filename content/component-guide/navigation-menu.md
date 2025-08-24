---
title: "Navigation Menu"
description: "복잡한 네비게이션 구조를 위한 드롭다운 메뉴 컴포넌트"
---

## 기본 사용법

```tsx
import { Navigation Menu } from '@/components/ui/navigation menu';

export function MyComponent() {
  return (
    <Navigation Menu>기본 Navigation Menu</Navigation Menu>
  );
}
```

## 기본 사용법

### Basic Navigation Menu

:::component-example BasicNavigationMenuExample
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink asChild>
          <a
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href="/"
          >
            <div className="text-sm font-medium leading-none">Introduction</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Build high-quality, accessible design systems and web apps.
            </p>
          </a>
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

<div>
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink asChild>
          <a
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href="/"
          >
            <div className="text-sm font-medium leading-none">Introduction</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Build high-quality, accessible design systems and web apps.
            </p>
          </a>
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | 컴포넌트 내용 |

## 접근성

Navigation Menu 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
