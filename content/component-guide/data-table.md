---
title: Data Table
description: 정렬, 필터링, 페이지네이션을 지원하는 데이터 테이블 컴포넌트
---

# Data Table

Data Table은 Table 컴포넌트를 기반으로 한 고급 데이터 테이블입니다. 정렬, 필터링, 페이지네이션, 선택 등의 기능을 제공합니다.

## 기본 사용법

```tsx
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown, Search } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const userData: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "관리자", status: "active" },
  { id: 2, name: "이영희", email: "lee@example.com", role: "사용자", status: "active" },
  { id: 3, name: "박민수", email: "park@example.com", role: "편집자", status: "inactive" },
  { id: 4, name: "정수진", email: "jung@example.com", role: "사용자", status: "active" },
  { id: 5, name: "최동현", email: "choi@example.com", role: "관리자", status: "active" },
]

export default function BasicDataTable() {
  const [data, setData] = useState<User[]>(userData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = data
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const getSortIcon = (field: keyof User) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4" />
        <Input
          placeholder="사용자 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-semibold"
                >
                  이름
                  {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("email")}
                  className="h-auto p-0 font-semibold"
                >
                  이메일
                  {getSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("role")}
                  className="h-auto p-0 font-semibold"
                >
                  역할
                  {getSortIcon("role")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="h-auto p-0 font-semibold"
                >
                  상태
                  {getSortIcon("status")}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        총 {filteredAndSortedData.length}개 항목
      </div>
    </div>
  )
}
```

## 선택 가능한 Data Table

```tsx
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
}

const userData: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "관리자" },
  { id: 2, name: "이영희", email: "lee@example.com", role: "사용자" },
  { id: 3, name: "박민수", email: "park@example.com", role: "편집자" },
  { id: 4, name: "정수진", email: "jung@example.com", role: "사용자" },
  { id: 5, name: "최동현", email: "choi@example.com", role: "관리자" },
]

export default function SelectableDataTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [data, setData] = useState<User[]>(userData)

  const isAllSelected = selectedRows.length === data.length
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map(user => user.id) : [])
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedRows(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(rowId => rowId !== id)
    )
  }

  const handleDeleteSelected = () => {
    setData(prev => prev.filter(user => !selectedRows.includes(user.id)))
    setSelectedRows([])
  }

  return (
    <div className="space-y-4">
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between p-2 bg-muted rounded">
          <span className="text-sm">
            {selectedRows.length}개 항목이 선택됨
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4 mr-1" />
              편집
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-1" />
              삭제
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead className="w-20">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectRow(user.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
```

## 페이지네이션이 있는 Data Table

```tsx
import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const productData: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `제품 ${i + 1}`,
  category: ["전자제품", "의류", "도서", "스포츠"][i % 4],
  price: Math.floor(Math.random() * 100000) + 10000,
  stock: Math.floor(Math.random() * 100)
}))

export default function PaginatedDataTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const totalPages = Math.ceil(productData.length / pageSize)
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return productData.slice(start, end)
  }, [currentPage, pageSize])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)))
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>제품명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>재고</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">페이지당 행 수:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, productData.length)} / {productData.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
```

## 필터링이 있는 Data Table

```tsx
import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: number
  customer: string
  product: string
  amount: number
  status: "pending" | "completed" | "cancelled"
  date: string
}

const orderData: Order[] = [
  { id: 1, customer: "김철수", product: "노트북", amount: 1200000, status: "completed", date: "2024-01-15" },
  { id: 2, customer: "이영희", product: "마우스", amount: 50000, status: "pending", date: "2024-01-16" },
  { id: 3, customer: "박민수", product: "키보드", amount: 120000, status: "cancelled", date: "2024-01-17" },
  { id: 4, customer: "정수진", product: "모니터", amount: 300000, status: "completed", date: "2024-01-18" },
  { id: 5, customer: "최동현", product: "헤드셋", amount: 80000, status: "pending", date: "2024-01-19" },
]

export default function FilteredDataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredData = useMemo(() => {
    return orderData.filter(order => {
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }
    
    const labels = {
      pending: "대기중",
      completed: "완료",
      cancelled: "취소됨"
    }

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="고객명 또는 제품명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="pending">대기중</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
            <SelectItem value="cancelled">취소됨</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문 ID</TableHead>
              <TableHead>고객명</TableHead>
              <TableHead>제품</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>주문일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount.toLocaleString()}원</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {filteredData.length}개 결과 (전체 {orderData.length}개 중)
      </div>
    </div>
  )
}
```

## 컴포넌트 API

Data Table은 기본 Table 컴포넌트를 확장한 것입니다:

### Table
메인 테이블 컨테이너입니다.

### TableHeader
테이블 헤더를 나타냅니다.

### TableBody
테이블 본문을 나타냅니다.

### TableRow
테이블 행을 나타냅니다.

### TableHead
테이블 헤더 셀입니다.

### TableCell
테이블 데이터 셀입니다.

## 고급 기능

### 정렬
- 컬럼 헤더 클릭으로 정렬
- 오름차순/내림차순 토글
- 시각적 정렬 표시

### 필터링
- 텍스트 검색
- 카테고리별 필터
- 다중 필터 조합

### 선택
- 개별 행 선택
- 전체 선택/해제
- 선택된 항목 일괄 작업

### 페이지네이션
- 페이지 크기 조절
- 페이지 네비게이션
- 항목 수 표시

## 접근성

Data Table 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 테이블 구조 안내
- 정렬 상태 안내
