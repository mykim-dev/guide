---
title: "Tabs"
description: "탭 컴포넌트"
---

## 기본 사용법

```tsx
import { Tabs } from '@/components/ui/tabs';

export function MyComponent() {
  return (
    <Tabs>기본 Tabs</Tabs>
  );
}
```

## 기본 사용법

### Basic Tabs

:::component-example BasicTabsExample
```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content.</p>
  </TabsContent>
</Tabs>
```

<div>
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content.</p>
  </TabsContent>
</Tabs>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | 활성 탭 값 |
| `onValueChange` | `(value: string) => void` | `undefined` | 탭 변경 핸들러 |
| `defaultValue` | `string` | `undefined` | 기본 활성 탭 |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | 탭 방향 |

### TabsTrigger Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `required` | 탭 값 |
| `disabled` | `boolean` | `false` | 탭 비활성화 |

## 접근성

Tabs 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
