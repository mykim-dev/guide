---
title: "Progress"
description: "진행률 컴포넌트 사용 가이드"
---

## 기본 사용법

```tsx
import { Progress } from '@/components/ui/progress';

export function MyComponent() {
  return (
    <Progress>기본 Progress</Progress>
  );
}
```

## 기본 사용법

### Basic Progress

:::component-example BasicProgressExample
```tsx
<div className="w-full max-w-sm space-y-2">
  <Progress value={33} />
  <div className="text-sm text-muted-foreground">33% Complete</div>
</div>
```

<div>
<div className="w-full max-w-sm space-y-2">
  <Progress value={33} />
  <div className="text-sm text-muted-foreground">33% Complete</div>
</div>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `undefined` | 진행률 값 (0-100) |
| `max` | `number` | `100` | 최댓값 |

## 접근성

Progress 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
