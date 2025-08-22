# Table

데이터를 테이블 형태로 표시하는 컴포넌트입니다. 정렬, 필터링, 페이지네이션 등의 기능과 함께 사용할 수 있습니다.

## 기본 사용법

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
]

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## 스트라이프 테이블

교대로 배경색이 다른 테이블을 만들 수 있습니다.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
]

export function StripedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## 정렬 가능한 테이블

컬럼 헤더를 클릭하여 정렬할 수 있는 테이블입니다.

```tsx
import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const data = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 35, email: "bob@example.com" },
]

export function SortableTable() {
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("name")}>
              Name
              {sortField === "name" && (
                sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("age")}>
              Age
              {sortField === "age" && (
                sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## 접근성

- **키보드 네비게이션**: Tab 키로 셀 간 이동 가능
- **스크린 리더**: 적절한 테이블 구조와 헤더 설정
- **시각적 명확성**: 명확한 행과 열 구분

## 모범 사례

1. **명확한 헤더**: 각 컬럼의 목적을 명확히 하세요
2. **일관된 데이터**: 같은 컬럼의 데이터 형식을 일관되게 유지하세요
3. **적절한 정렬**: 숫자는 우측 정렬, 텍스트는 좌측 정렬하세요
4. **반응형 디자인**: 작은 화면에서도 사용할 수 있도록 설계하세요

## API 참조

### Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 테이블로 렌더링 |

### TableHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 헤더로 렌더링 |

### TableBody

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 바디로 렌더링 |

### TableRow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 행으로 렌더링 |

### TableHead

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 헤더 셀로 렌더링 |

### TableCell

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 셀로 렌더링 |

### TableCaption

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | 자식 요소를 캡션으로 렌더링 |
