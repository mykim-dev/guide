# Separator

콘텐츠를 시각적으로 구분하는 구분선 컴포넌트입니다. 수평 또는 수직 방향으로 사용할 수 있습니다.

## 기본 사용법

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
```

## 수평 구분선

기본적으로 수평 방향의 구분선을 표시합니다.

```tsx
import { Separator } from "@/components/ui/separator"

export function HorizontalSeparator() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section 1</h3>
        <p className="text-muted-foreground">This is the first section content.</p>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold">Section 2</h3>
        <p className="text-muted-foreground">This is the second section content.</p>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold">Section 3</h3>
        <p className="text-muted-foreground">This is the third section content.</p>
      </div>
    </div>
  )
}
```

## 수직 구분선

`orientation="vertical"`을 사용하여 수직 구분선을 만들 수 있습니다.

```tsx
import { Separator } from "@/components/ui/separator"

export function VerticalSeparator() {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm">Home</div>
      <Separator orientation="vertical" className="h-4" />
      <div className="text-sm">Products</div>
      <Separator orientation="vertical" className="h-4" />
      <div className="text-sm">About</div>
      <Separator orientation="vertical" className="h-4" />
      <div className="text-sm">Contact</div>
    </div>
  )
}
```

## 커스텀 스타일링

Tailwind CSS 클래스를 사용하여 구분선의 스타일을 커스터마이징할 수 있습니다.

```tsx
import { Separator } from "@/components/ui/separator"

export function CustomSeparator() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Default Separator</h3>
        <p className="text-muted-foreground">Standard separator styling.</p>
      </div>
      
      <Separator className="bg-blue-500" />
      
      <div>
        <h3 className="text-lg font-semibold">Thick Separator</h3>
        <p className="text-muted-foreground">Separator with increased thickness.</p>
      </div>
      
      <Separator className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      
      <div>
        <h3 className="text-lg font-semibold">Dashed Separator</h3>
        <p className="text-muted-foreground">Separator with dashed border style.</p>
      </div>
      
      <Separator className="border-dashed" />
    </div>
  )
}
```

## 리스트 구분선

리스트 아이템 사이에 구분선을 추가할 수 있습니다.

```tsx
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Help", href: "/help" },
  { name: "Logout", href: "/logout" }
]

export function ListSeparator() {
  return (
    <div className="w-64 border rounded-lg p-4">
      {menuItems.map((item, index) => (
        <div key={item.name}>
          <a
            href={item.href}
            className="block py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
          >
            {item.name}
          </a>
          {index < menuItems.length - 1 && <Separator className="my-1" />}
        </div>
      ))}
    </div>
  )
}
```

## 카드 내부 구분선

카드 컴포넌트 내부에서 콘텐츠를 구분할 때 사용할 수 있습니다.

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function CardSeparator() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Name</span>
          <span className="text-sm font-medium">John Doe</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Email</span>
          <span className="text-sm font-medium">john@example.com</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Role</span>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </CardContent>
    </Card>
  )
}
```

## 접근성

- **스크린 리더**: `role="separator"` 속성이 자동으로 설정됨
- **시각적 명확성**: 충분한 대비를 제공하여 구분선이 명확히 보임
- **의미적 분리**: 콘텐츠의 논리적 구분을 시각적으로 표현

## 모범 사례

1. **적절한 사용**: 콘텐츠를 논리적으로 구분할 때만 사용하세요
2. **일관성**: 같은 페이지에서 동일한 스타일의 구분선을 사용하세요
3. **접근성**: 색상만으로 구분하지 말고 충분한 대비를 제공하세요
4. **과도한 사용**: 너무 많은 구분선은 시각적 혼란을 야기할 수 있습니다

## API 참조

### Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | 구분선 방향 |
| `decorative` | `boolean` | `true` | 장식용 구분선 여부 |
| `asChild` | `boolean` | `false` | 자식 요소를 구분선으로 렌더링 |
