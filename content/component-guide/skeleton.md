# Skeleton

로딩 상태를 표시하는 스켈레톤 컴포넌트입니다. 콘텐츠가 로드되는 동안 플레이스홀더를 제공합니다.

## 기본 사용법

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## 카드 스켈레톤

카드 형태의 스켈레톤을 만들 수 있습니다.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## 텍스트 스켈레톤

다양한 크기의 텍스트 스켈레톤을 만들 수 있습니다.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[280px]" />
        <Skeleton className="h-4 w-[260px]" />
      </div>
    </div>
  )
}
```

## 리스트 스켈레톤

리스트 형태의 스켈레톤을 만들 수 있습니다.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonList() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 테이블 스켈레톤

테이블 형태의 스켈레톤을 만들 수 있습니다.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  )
}
```

## 로딩 상태 시뮬레이션

실제 데이터 로딩을 시뮬레이션하는 예제입니다.

```tsx
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: number
  name: string
  email: string
}

export function SkeletonWithData() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
      ])
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 접근성

- **스크린 리더**: 로딩 상태를 적절히 전달
- **시각적 명확성**: 실제 콘텐츠와 구분되는 명확한 스타일
- **적절한 애니메이션**: 부드러운 펄스 애니메이션 제공

## 모범 사례

1. **적절한 크기**: 실제 콘텐츠와 비슷한 크기로 만드세요
2. **일관된 스타일**: 애플리케이션 전체에서 동일한 스켈레톤 스타일을 사용하세요
3. **적절한 지속시간**: 너무 오래 표시되지 않도록 하세요
4. **의미있는 구조**: 실제 콘텐츠의 구조를 반영하세요

## API 참조

### Skeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 스켈레톤으로 렌더링 |
