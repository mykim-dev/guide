---
title: Navigation Menu
description: 복잡한 네비게이션 구조를 위한 드롭다운 메뉴 컴포넌트
---

# Navigation Menu

Navigation Menu 컴포넌트는 복잡한 네비게이션 구조를 위한 드롭다운 메뉴 시스템입니다. 메인 네비게이션, 메가 메뉴, 또는 계층적 메뉴 구조에 적합합니다.

## 기본 사용법

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function BasicNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>제품</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      제품 개요
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      모든 제품을 한눈에 확인하세요.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="문서">
                제품 사용법과 가이드를 확인하세요.
              </ListItem>
              <ListItem href="/components" title="컴포넌트">
                재사용 가능한 UI 컴포넌트들.
              </ListItem>
              <ListItem href="/themes" title="테마">
                다양한 디자인 테마를 선택하세요.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>솔루션</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/enterprise" title="엔터프라이즈">
                대규모 조직을 위한 솔루션.
              </ListItem>
              <ListItem href="/startup" title="스타트업">
                빠른 성장을 위한 솔루션.
              </ListItem>
              <ListItem href="/individual" title="개인">
                개인 사용자를 위한 솔루션.
              </ListItem>
              <ListItem href="/education" title="교육">
                교육 기관을 위한 솔루션.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            가격
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            문의하기
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
```

## 간단한 드롭다운 메뉴

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export default function SimpleDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>메뉴</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/item1"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">메뉴 항목 1</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      첫 번째 메뉴 항목입니다.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/item2"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">메뉴 항목 2</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      두 번째 메뉴 항목입니다.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## 메가 메뉴

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>서비스</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[800px] grid-cols-3 gap-4 p-6">
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>웹 개발</CardTitle>
                    <CardDescription>
                      현대적인 웹 애플리케이션 개발
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="/web/react" className="text-sm hover:text-primary">
                          React 개발
                        </a>
                      </li>
                      <li>
                        <a href="/web/nextjs" className="text-sm hover:text-primary">
                          Next.js 개발
                        </a>
                      </li>
                      <li>
                        <a href="/web/vue" className="text-sm hover:text-primary">
                          Vue.js 개발
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>모바일 개발</CardTitle>
                    <CardDescription>
                      크로스 플랫폼 모바일 앱
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="/mobile/react-native" className="text-sm hover:text-primary">
                          React Native
                        </a>
                      </li>
                      <li>
                        <a href="/mobile/flutter" className="text-sm hover:text-primary">
                          Flutter
                        </a>
                      </li>
                      <li>
                        <a href="/mobile/ios" className="text-sm hover:text-primary">
                          iOS 개발
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>클라우드 서비스</CardTitle>
                    <CardDescription>
                      확장 가능한 클라우드 솔루션
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="/cloud/aws" className="text-sm hover:text-primary">
                          AWS
                        </a>
                      </li>
                      <li>
                        <a href="/cloud/azure" className="text-sm hover:text-primary">
                          Azure
                        </a>
                      </li>
                      <li>
                        <a href="/cloud/gcp" className="text-sm hover:text-primary">
                          Google Cloud
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## 계층적 메뉴

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export default function HierarchicalMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>카테고리</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-4 p-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">전자제품</h3>
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/electronics/smartphones"
                        className="block text-sm hover:text-primary"
                      >
                        스마트폰
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/electronics/laptops"
                        className="block text-sm hover:text-primary"
                      >
                        노트북
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/electronics/tablets"
                        className="block text-sm hover:text-primary"
                      >
                        태블릿
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">의류</h3>
                <ul className="space-y-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/clothing/men"
                        className="block text-sm hover:text-primary"
                      >
                        남성복
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/clothing/women"
                        className="block text-sm hover:text-primary"
                      >
                        여성복
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/clothing/kids"
                        className="block text-sm hover:text-primary"
                      >
                        아동복
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## 동적 메뉴 생성

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

interface MenuItem {
  id: string
  title: string
  href?: string
  children?: MenuItem[]
}

interface DynamicMenuProps {
  items: MenuItem[]
}

export default function DynamicMenu({ items }: DynamicMenuProps) {
  const renderMenuItem = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.children.map((child) => (
                <li key={child.id}>
                  <NavigationMenuLink asChild>
                    <a
                      href={child.href || "#"}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {child.title}
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink asChild>
          <a
            href={item.href || "#"}
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            {item.title}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map(renderMenuItem)}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// 사용 예시
const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "제품",
    children: [
      { id: "1-1", title: "신제품", href: "/products/new" },
      { id: "1-2", title: "인기 제품", href: "/products/popular" },
      { id: "1-3", title: "할인 제품", href: "/products/sale" },
    ]
  },
  {
    id: "2",
    title: "서비스",
    children: [
      { id: "2-1", title: "고객 지원", href: "/services/support" },
      { id: "2-2", title: "배송", href: "/services/shipping" },
      { id: "2-3", title: "반품", href: "/services/returns" },
    ]
  },
  { id: "3", title: "회사 소개", href: "/about" },
  { id: "4", title: "연락처", href: "/contact" }
]
```

## 컴포넌트 API

### NavigationMenu
메인 네비게이션 메뉴 컨테이너입니다.

### NavigationMenuList
네비게이션 메뉴 아이템들을 감싸는 리스트 컨테이너입니다.

### NavigationMenuItem
개별 네비게이션 메뉴 아이템입니다.

### NavigationMenuTrigger
드롭다운 메뉴를 트리거하는 버튼입니다.

### NavigationMenuContent
드롭다운 메뉴의 콘텐츠 영역입니다.

### NavigationMenuLink
네비게이션 링크를 나타냅니다.

**Props:**
- `asChild`: 자식 요소를 렌더링할지 여부
- `className`: 추가 CSS 클래스

## 접근성

Navigation Menu 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 마우스와 키보드 상호작용

## 스타일링

Navigation Menu는 Tailwind CSS 클래스를 사용하여 커스터마이징할 수 있습니다:

```tsx
<NavigationMenu className="max-w-none">
  <NavigationMenuList className="space-x-4">
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
        커스텀 스타일
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-background border shadow-lg">
        {/* 메뉴 콘텐츠 */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## 반응형 메뉴

```tsx
import { useState } from "react"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function ResponsiveNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* 데스크톱 메뉴 */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>제품</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="/products" className="block p-3 hover:bg-accent rounded-md">
                        모든 제품
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/about" className="block px-4 py-2 hover:bg-accent rounded-md">
                  회사 소개
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg md:hidden">
          <div className="p-4 space-y-2">
            <a href="/products" className="block p-2 hover:bg-accent rounded-md">
              제품
            </a>
            <a href="/about" className="block p-2 hover:bg-accent rounded-md">
              회사 소개
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
```
