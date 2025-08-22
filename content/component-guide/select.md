---
title: "Select"
description: "선택 컴포넌트 사용 가이드"
---

# Select 컴포넌트

Select 컴포넌트는 사용자가 옵션 목록에서 하나를 선택할 수 있는 드롭다운 인터페이스를 제공합니다.

## 기본 사용법

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## 사용 예제

### 기본 선택

:::component-example BasicSelectExample
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>
```

<div>
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>
</div>
:::

### 라벨과 함께 사용

:::component-example LabelSelectExample
```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</div>
```

<div className="space-y-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</div>
:::

### 비활성화 상태

:::component-example DisabledSelectExample
```tsx
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

<div>
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
</div>
:::

## 접근성

Select 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 관리

## 모범 사례

1. **명확한 라벨링**: 선택 필드의 목적을 명확하게 설명하는 라벨 사용
2. **적절한 플레이스홀더**: 사용자가 무엇을 선택해야 하는지 안내하는 텍스트 제공
3. **일관된 스타일**: 동일한 선택 필드는 동일한 스타일 사용
4. **오류 처리**: 선택이 필요한 경우 명확한 오류 메시지 제공

## API Reference

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 선택된 값 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 시 호출되는 함수 |
| `defaultValue` | `string` | - | 기본 선택 값 |
| `disabled` | `boolean` | `false` | 선택 필드 비활성화 |
| `children` | `ReactNode` | - | Select 컴포넌트 내용 |

### SelectTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 트리거 내용 |

### SelectValue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `children` | `ReactNode` | - | 표시될 값 |

### SelectContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `ReactNode` | - | 드롭다운 내용 |

### SelectItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 아이템의 값 |
| `disabled` | `boolean` | `false` | 아이템 비활성화 |
| `children` | `ReactNode` | - | 아이템 내용 |
