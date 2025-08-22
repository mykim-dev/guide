---
title: Breadcrumb
description: 네비게이션 계층 구조를 표시하는 컴포넌트
---

# Breadcrumb

Breadcrumb 컴포넌트는 사용자가 현재 위치를 파악하고 상위 페이지로 쉽게 이동할 수 있도록 도와주는 네비게이션 요소입니다.

## 기본 사용법

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">문서</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>컴포넌트</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

## 아이콘과 함께 사용

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home, ChevronRight } from "lucide-react"

export default function BreadcrumbWithIcons() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            홈
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">제품</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>전자제품</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

## 동적 Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// 사용 예시
const breadcrumbItems = [
  { label: "홈", href: "/" },
  { label: "제품", href: "/products" },
  { label: "전자제품", href: "/products/electronics" },
  { label: "스마트폰" }
]
```

## 컴포넌트 API

### Breadcrumb
메인 컨테이너 컴포넌트입니다.

### BreadcrumbList
Breadcrumb 아이템들을 감싸는 리스트 컨테이너입니다.

### BreadcrumbItem
개별 Breadcrumb 아이템을 나타냅니다.

### BreadcrumbLink
클릭 가능한 링크를 나타냅니다.

**Props:**
- `href`: 링크 URL
- `className`: 추가 CSS 클래스

### BreadcrumbPage
현재 페이지를 나타내는 비활성화된 아이템입니다.

### BreadcrumbSeparator
아이템 간 구분자를 나타냅니다.

## 접근성

Breadcrumb 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- `nav` 요소와 `aria-label`을 사용하여 네비게이션 역할을 명시
- 현재 페이지는 `aria-current="page"` 속성으로 표시
- 키보드 네비게이션 지원

## 스타일링

Breadcrumb는 Tailwind CSS 클래스를 사용하여 커스터마이징할 수 있습니다:

```tsx
<Breadcrumb className="text-sm">
  <BreadcrumbList className="flex items-center space-x-2">
    <BreadcrumbItem>
      <BreadcrumbLink 
        href="/" 
        className="hover:text-primary transition-colors"
      >
        홈
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator className="text-muted-foreground" />
    <BreadcrumbItem>
      <BreadcrumbPage className="text-foreground font-medium">
        현재 페이지
      </BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 모바일 대응

모바일 환경에서는 긴 Breadcrumb를 축약하여 표시할 수 있습니다:

```tsx
import { useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronLeft, MoreHorizontal } from "lucide-react"

export default function ResponsiveBreadcrumb() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const items = [
    { label: "홈", href: "/" },
    { label: "제품", href: "/products" },
    { label: "전자제품", href: "/products/electronics" },
    { label: "스마트폰", href: "/products/electronics/smartphones" },
    { label: "애플", href: "/products/electronics/smartphones/apple" },
    { label: "iPhone 15" }
  ]

  const visibleItems = isExpanded ? items : [items[0], ...items.slice(-2)]

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center">
        {!isExpanded && items.length > 3 && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={items[0].href}>
                {items[0].label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center p-1 hover:bg-muted rounded"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < visibleItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```
