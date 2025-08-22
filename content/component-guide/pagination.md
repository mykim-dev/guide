# Pagination

페이지 네비게이션을 위한 페이지네이션 컴포넌트입니다. 긴 목록이나 테이블 데이터를 페이지별로 나눌 때 사용합니다.

## 기본 사용법

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

## 제어된 페이지네이션

상태를 사용하여 페이지네이션을 제어하는 예제입니다.

```tsx
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationControlled() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <p className="text-sm text-center text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab, Enter 키 지원
- **스크린 리더**: 현재 페이지와 총 페이지 수가 명확히 전달됨
- **시각적 표시**: 현재 페이지가 명확히 강조됨

## 모범 사례

1. **명확한 표시**: 현재 페이지를 명확히 표시하세요
2. **적절한 범위**: 표시할 페이지 번호의 범위를 적절히 설정하세요
3. **일관성**: 같은 애플리케이션에서 동일한 스타일과 동작을 유지하세요
4. **성능**: 페이지 변경 시 효율적인 데이터 로딩을 구현하세요

## API 참조

### Pagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 페이지네이션으로 렌더링 |

### PaginationContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 콘텐츠로 렌더링 |

### PaginationItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 항목으로 렌더링 |

### PaginationLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | `false` | 활성 페이지 여부 |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | 링크 크기 |
| `asChild` | `boolean` | `false` | 자식 요소를 링크로 렌더링 |

### PaginationPrevious

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 이전 버튼으로 렌더링 |

### PaginationNext

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 다음 버튼으로 렌더링 |

### PaginationEllipsis

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 생략 표시로 렌더링 |
