---
title: "Collapsible"
description: "접을 수 있는 요소 컴포넌트"
---

## 기본 사용법

```tsx
import { Collapsible } from '@/components/ui/collapsible';

export function MyComponent() {
  return (
    <Collapsible>기본 Collapsible</Collapsible>
  );
}
```

## 기본 사용법

### Basic Collapsible

:::component-example BasicCollapsibleExample
```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      Click to expand
      <ChevronDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4">
      <p>This is the collapsible content.</p>
    </div>
  </CollapsibleContent>
</Collapsible>
```

<div>
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      Click to expand
      <ChevronDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4">
      <p>This is the collapsible content.</p>
    </div>
  </CollapsibleContent>
</Collapsible>
</div>
:::

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | 컴포넌트 내용 |

## 접근성

Collapsible 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
