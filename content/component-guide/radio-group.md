# RadioGroup

라디오 버튼 그룹 컴포넌트입니다. 여러 옵션 중 하나를 선택할 때 사용합니다.

## 기본 사용법

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}
```

## 제어된 컴포넌트

`value`와 `onValueChange`를 사용하여 라디오 그룹을 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioGroupControlled() {
  const [value, setValue] = useState("option-one")

  return (
    <div className="space-y-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three">Option Three</Label>
        </div>
      </RadioGroup>
      
      <p className="text-sm text-muted-foreground">
        Selected: {value}
      </p>
    </div>
  )
}
```

## 비활성화된 옵션

특정 옵션을 비활성화할 수 있습니다.

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" disabled />
        <Label htmlFor="option-two" className="text-muted-foreground">Option Two (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Arrow keys, Enter, Space 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 선택된 옵션에 포커스가 올바르게 유지됨

## 모범 사례

1. **명확한 라벨링**: 각 옵션의 라벨이 명확하고 이해하기 쉽도록 하세요
2. **적절한 사용**: 상호 배타적인 선택에만 사용하세요
3. **일관성**: 같은 폼에서 동일한 스타일과 동작을 유지하세요
4. **접근성**: 모든 옵션에 적절한 라벨을 제공하세요

## API 참조

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 현재 선택된 값 (제어된 컴포넌트) |
| `defaultValue` | `string` | - | 기본 선택된 값 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 핸들러 |
| `disabled` | `boolean` | `false` | 전체 그룹 비활성화 |

### RadioGroupItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 라디오 버튼의 값 |
| `disabled` | `boolean` | `false` | 라디오 버튼 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 라디오 버튼으로 렌더링 |
