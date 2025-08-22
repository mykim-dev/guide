# Tabs

콘텐츠를 탭으로 구분하여 표시하는 컴포넌트입니다. 관련된 콘텐츠를 그룹화하고 공간을 효율적으로 사용할 수 있습니다.

## 기본 사용법

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here. Click save when you&apos;re done.
      </TabsContent>
      <TabsContent value="password">
        Change your password here. After saving, you&apos;ll be logged out.
      </TabsContent>
    </Tabs>
  )
}
```

## 세로 탭

`orientation="vertical"`을 사용하여 세로 탭을 만들 수 있습니다.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVertical() {
  return (
    <Tabs defaultValue="account" className="w-[400px]" orientation="vertical">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here. Click save when you&apos;re done.
      </TabsContent>
      <TabsContent value="password">
        Change your password here. After saving, you&apos;ll be logged out.
      </TabsContent>
      <TabsContent value="settings">
        Manage your application settings and preferences.
      </TabsContent>
    </Tabs>
  )
}
```

## 제어된 컴포넌트

`value`와 `onValueChange`를 사용하여 탭을 제어할 수 있습니다.

```tsx
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsControlled() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here. Click save when you&apos;re done.
        </TabsContent>
        <TabsContent value="password">
          Change your password here. After saving, you&apos;ll be logged out.
        </TabsContent>
      </Tabs>
      
      <p className="text-sm text-muted-foreground">
        Current tab: {activeTab}
      </p>
    </div>
  )
}
```

## 비활성화된 탭

특정 탭을 비활성화할 수 있습니다.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDisabled() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here. Click save when you&apos;re done.
      </TabsContent>
      <TabsContent value="password">
        This tab is disabled and cannot be accessed.
      </TabsContent>
      <TabsContent value="settings">
        Manage your application settings and preferences.
      </TabsContent>
    </Tabs>
  )
}
```

## 아이콘이 있는 탭

탭 트리거에 아이콘을 추가할 수 있습니다.

```tsx
import { User, Lock, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsWithIcons() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here. Click save when you&apos;re done.
      </TabsContent>
      <TabsContent value="password">
        Change your password here. After saving, you&apos;ll be logged out.
      </TabsContent>
      <TabsContent value="settings">
        Manage your application settings and preferences.
      </TabsContent>
    </Tabs>
  )
}
```

## 폼과 함께 사용

탭 내부에 폼을 포함할 수 있습니다.

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsWithForms() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <Button>Save changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
          <Button>Update password</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
```

## 동적 탭

데이터를 기반으로 동적으로 탭을 생성할 수 있습니다.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabData = [
  {
    id: "overview",
    label: "Overview",
    content: "This is the overview tab content."
  },
  {
    id: "analytics",
    label: "Analytics", 
    content: "This is the analytics tab content."
  },
  {
    id: "reports",
    label: "Reports",
    content: "This is the reports tab content."
  },
  {
    id: "notifications",
    label: "Notifications",
    content: "This is the notifications tab content."
  }
]

export function DynamicTabs() {
  return (
    <Tabs defaultValue={tabData[0].id} className="w-[400px]">
      <TabsList>
        {tabData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Arrow keys, Enter, Space 지원
- **스크린 리더**: ARIA 속성과 역할이 적절히 설정됨
- **포커스 관리**: 활성 탭에 포커스가 올바르게 유지됨

## 모범 사례

1. **명확한 라벨링**: 탭 라벨이 콘텐츠를 정확히 설명하도록 하세요
2. **적절한 사용**: 관련된 콘텐츠를 그룹화할 때 사용하세요
3. **일관성**: 같은 페이지에서 동일한 스타일과 동작을 유지하세요
4. **탭 수 제한**: 너무 많은 탭은 사용자 경험을 저하시킬 수 있습니다

## API 참조

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 현재 활성 탭 (제어된 컴포넌트) |
| `defaultValue` | `string` | - | 기본 활성 탭 |
| `onValueChange` | `(value: string) => void` | - | 값 변경 핸들러 |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | 탭 방향 |

### TabsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 리스트로 렌더링 |

### TabsTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 탭의 고유 값 |
| `disabled` | `boolean` | `false` | 탭 비활성화 |
| `asChild` | `boolean` | `false` | 자식 요소를 트리거로 렌더링 |

### TabsContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | 콘텐츠의 고유 값 |
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |
