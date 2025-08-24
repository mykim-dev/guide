---
title: "Switch"
description: "스위치 컴포넌트 사용 가이드"
---

## 기본 사용법

```tsx
import { Switch } from '@/components/ui/switch';

export function MyComponent() {
  return (
    <Switch>기본 Switch</Switch>
  );
}
```

## 기본 사용법

### Basic Switch

:::component-example BasicSwitchExample
```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

<div>
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | 스위치 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | 스위치 비활성화 |
| `id` | `string` | `undefined` | HTML id 속성 |

## 접근성

Switch 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
