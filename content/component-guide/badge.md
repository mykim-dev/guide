---
title: "Badge"
description: "배지 컴포넌트 사용 가이드"
---

# Badge 컴포넌트

배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다.

## 기본 사용법

```tsx
import { Badge } from '@/components/ui/badge';

export function MyComponent() {
  return (
    <Badge>New</Badge>
  );
}
```

## Variants

배지는 다양한 스타일 변형을 지원합니다:

### Default
```tsx
<Badge>Default Badge</Badge>
```

### Secondary
```tsx
<Badge variant="secondary">Secondary Badge</Badge>
```

### Destructive
```tsx
<Badge variant="destructive">Error</Badge>
```

### Outline
```tsx
<Badge variant="outline">Outline Badge</Badge>
```

## 사용 예제

### 상태 표시
```tsx
<div className="flex gap-2">
  <Badge>Active</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
  <Badge variant="outline">Draft</Badge>
</div>
```

### 카테고리 표시
```tsx
<div className="flex gap-2">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Next.js</Badge>
  <Badge>Tailwind CSS</Badge>
</div>
```

### 알림 카운터
```tsx
<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="destructive">5</Badge>
</div>
```

### 아이콘과 함께 사용
```tsx
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

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

## 접근성

배지 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 색상 대비
- 스크린 리더 호환성
- 의미있는 텍스트 콘텐츠

## 모범 사례

1. **명확한 의미**: 배지의 텍스트가 명확하고 이해하기 쉽게 작성
2. **일관된 사용**: 동일한 상태나 카테고리는 동일한 스타일 사용
3. **적절한 색상**: 의미에 맞는 색상 선택 (성공=초록, 오류=빨강 등)
4. **간결한 텍스트**: 짧고 명확한 텍스트 사용

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | 배지의 스타일 변형 |
| `className` | `string` | - | 추가 CSS 클래스 |
