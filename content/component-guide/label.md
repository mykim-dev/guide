# Label

폼 요소와 연결되는 라벨 컴포넌트입니다. 접근성을 향상시키고 사용자 경험을 개선합니다.

## 기본 사용법

```tsx
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}
```

## Input과 함께 사용

Label 컴포넌트를 Input과 함께 사용하는 예제입니다.

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelWithInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter your username" />
    </div>
  )
}
```

## 필수 필드 표시

필수 필드를 나타내는 라벨입니다.

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RequiredLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input id="email" type="email" placeholder="Enter your email" required />
    </div>
  )
}
```

## 여러 라벨

여러 입력 필드에 라벨을 적용하는 예제입니다.

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MultipleLabels() {
  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" placeholder="Enter your first name" />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" placeholder="Enter your last name" />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </div>
  )
}
```

## 접근성

- **키보드 네비게이션**: 라벨을 클릭하면 연결된 입력 필드에 포커스
- **스크린 리더**: 적절한 ARIA 속성과 연결 설정
- **시각적 명확성**: 명확한 시각적 연결과 대비

## 모범 사례

1. **명확한 라벨링**: 라벨이 입력 필드의 목적을 명확히 설명하도록 하세요
2. **일관성**: 같은 폼에서 동일한 스타일의 라벨을 사용하세요
3. **접근성**: 모든 입력 필드에 적절한 라벨을 제공하세요
4. **필수 표시**: 필수 필드는 명확히 표시하세요

## API 참조

### Label

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 라벨로 렌더링 |
