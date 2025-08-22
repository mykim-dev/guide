# Alert

사용자에게 중요한 정보를 전달하는 알림 컴포넌트입니다. 성공, 오류, 경고, 정보 등의 상태를 표시할 수 있습니다.

## 기본 사용법

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}
```

## 성공 알림

성공 상태를 나타내는 알림입니다.

```tsx
import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertSuccess() {
  return (
    <Alert className="border-green-500 bg-green-50 text-green-900">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  )
}
```

## 오류 알림

오류 상태를 나타내는 알림입니다.

```tsx
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
```

## 경고 알림

경고 상태를 나타내는 알림입니다.

```tsx
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertWarning() {
  return (
    <Alert className="border-yellow-500 bg-yellow-50 text-yellow-900">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning!</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  )
}
```

## 정보 알림

정보를 제공하는 알림입니다.

```tsx
import { Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertInfo() {
  return (
    <Alert className="border-blue-500 bg-blue-50 text-blue-900">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        New features are available. Check out what's new in the latest update.
      </AlertDescription>
    </Alert>
  )
}
```

## 닫기 버튼이 있는 알림

사용자가 알림을 닫을 수 있는 버튼을 추가할 수 있습니다.

```tsx
import { useState } from "react"
import { X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertDismissible() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <Alert className="relative">
      <AlertTitle>Dismissible Alert</AlertTitle>
      <AlertDescription>
        This alert can be dismissed by clicking the X button.
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab 키로 포커스 가능
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **시각적 명확성**: 충분한 대비와 명확한 색상 구분

## 모범 사례

1. **적절한 사용**: 중요한 정보나 상태 변화에만 사용하세요
2. **명확한 메시지**: 사용자가 이해하기 쉬운 명확한 메시지를 작성하세요
3. **적절한 타이밍**: 관련 작업 직후에 표시하세요
4. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요

## API 참조

### Alert

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive"` | `"default"` | 알림 스타일 변형 |
| `asChild` | `boolean` | `false` | 자식 요소를 알림으로 렌더링 |

### AlertTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 제목으로 렌더링 |

### AlertDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 설명으로 렌더링 |
