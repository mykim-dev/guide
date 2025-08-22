---
title: Scroll Area
description: 커스텀 스크롤바를 가진 스크롤 가능한 영역 컴포넌트
---

# Scroll Area

Scroll Area 컴포넌트는 커스텀 스크롤바를 제공하는 스크롤 가능한 영역입니다. 기본 브라우저 스크롤바를 대체하여 일관된 디자인을 유지할 수 있습니다.

## 기본 사용법

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

export default function BasicScrollArea() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">스크롤 영역</h4>
        <p className="text-sm text-muted-foreground">
          이것은 스크롤 가능한 영역입니다. 콘텐츠가 영역을 초과하면 커스텀 스크롤바가 나타납니다.
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            항목 {i + 1} - 이것은 긴 콘텐츠의 예시입니다.
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

## 긴 목록 스크롤

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  { name: "김철수", email: "kim@example.com", avatar: "/avatars/01.png" },
  { name: "이영희", email: "lee@example.com", avatar: "/avatars/02.png" },
  { name: "박민수", email: "park@example.com", avatar: "/avatars/03.png" },
  { name: "정수진", email: "jung@example.com", avatar: "/avatars/04.png" },
  { name: "최동현", email: "choi@example.com", avatar: "/avatars/05.png" },
  { name: "강미영", email: "kang@example.com", avatar: "/avatars/06.png" },
  { name: "윤태호", email: "yoon@example.com", avatar: "/avatars/07.png" },
  { name: "임지은", email: "lim@example.com", avatar: "/avatars/08.png" },
  { name: "한준호", email: "han@example.com", avatar: "/avatars/09.png" },
  { name: "송하나", email: "song@example.com", avatar: "/avatars/10.png" },
  { name: "조현우", email: "jo@example.com", avatar: "/avatars/11.png" },
  { name: "백서연", email: "baek@example.com", avatar: "/avatars/12.png" },
  { name: "남기준", email: "nam@example.com", avatar: "/avatars/13.png" },
  { name: "오유진", email: "oh@example.com", avatar: "/avatars/14.png" },
  { name: "신동욱", email: "shin@example.com", avatar: "/avatars/15.png" },
]

export default function UserList() {
  return (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">사용자 목록</h4>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
```

## 가로 스크롤

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  { title: "카드 1", content: "첫 번째 카드의 내용입니다." },
  { title: "카드 2", content: "두 번째 카드의 내용입니다." },
  { title: "카드 3", content: "세 번째 카드의 내용입니다." },
  { title: "카드 4", content: "네 번째 카드의 내용입니다." },
  { title: "카드 5", content: "다섯 번째 카드의 내용입니다." },
  { title: "카드 6", content: "여섯 번째 카드의 내용입니다." },
  { title: "카드 7", content: "일곱 번째 카드의 내용입니다." },
  { title: "카드 8", content: "여덟 번째 카드의 내용입니다." },
]

export default function HorizontalScroll() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-[200px]">
            <CardHeader>
              <CardTitle className="text-sm">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## 코드 블록 스크롤

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CodeScrollArea() {
  const longCode = `
import React from 'react'
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
}

export default function UserList({ users, onUserSelect }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [users, searchTerm])

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    onUserSelect(user)
  }

  return (
    <div className="user-list-container">
      <input
        type="text"
        placeholder="사용자 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="users-grid">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className={\`user-card \${selectedUser?.id === user.id ? 'selected' : ''}\`}
            onClick={() => handleUserClick(user)}
          >
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
  `.trim()

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">코드 예시</h4>
        <pre className="text-sm font-mono bg-muted p-4 rounded">
          <code>{longCode}</code>
        </pre>
      </div>
    </ScrollArea>
  )
}
```

## 대화형 채팅 스크롤

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const messages = [
  { id: 1, user: "김철수", message: "안녕하세요!", time: "10:30", isMe: false },
  { id: 2, user: "나", message: "안녕하세요! 오늘 날씨가 좋네요.", time: "10:31", isMe: true },
  { id: 3, user: "김철수", message: "네, 정말 좋은 날씨입니다. 산책하기 딱이에요.", time: "10:32", isMe: false },
  { id: 4, user: "나", message: "맞아요! 어디 가시나요?", time: "10:33", isMe: true },
  { id: 5, user: "김철수", message: "공원에 가려고 해요. 함께 가실래요?", time: "10:34", isMe: false },
  { id: 6, user: "나", message: "좋은 아이디어네요! 몇 시에 만날까요?", time: "10:35", isMe: true },
  { id: 7, user: "김철수", message: "2시는 어떠세요?", time: "10:36", isMe: false },
  { id: 8, user: "나", message: "완벽해요! 2시에 공원 입구에서 만나요.", time: "10:37", isMe: true },
  { id: 9, user: "김철수", message: "네! 그럼 2시에 봐요!", time: "10:38", isMe: false },
  { id: 10, user: "나", message: "좋아요! 기대되네요.", time: "10:39", isMe: true },
]

export default function ChatScrollArea() {
  return (
    <ScrollArea className="h-[400px] w-[400px] rounded-md border">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[80%] ${message.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!message.isMe && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" />
                  <AvatarFallback>{message.user[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg px-3 py-2 ${
                message.isMe 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

## 테이블 스크롤

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "이영희", email: "lee@example.com", role: "사용자", status: "활성" },
  { id: 3, name: "박민수", email: "park@example.com", role: "편집자", status: "비활성" },
  { id: 4, name: "정수진", email: "jung@example.com", role: "사용자", status: "활성" },
  { id: 5, name: "최동현", email: "choi@example.com", role: "관리자", status: "활성" },
  { id: 6, name: "강미영", email: "kang@example.com", role: "사용자", status: "비활성" },
  { id: 7, name: "윤태호", email: "yoon@example.com", role: "편집자", status: "활성" },
  { id: 8, name: "임지은", email: "lim@example.com", role: "사용자", status: "활성" },
  { id: 9, name: "한준호", email: "han@example.com", role: "관리자", status: "활성" },
  { id: 10, name: "송하나", email: "song@example.com", role: "사용자", status: "비활성" },
  { id: 11, name: "조현우", email: "jo@example.com", role: "편집자", status: "활성" },
  { id: 12, name: "백서연", email: "baek@example.com", role: "사용자", status: "활성" },
]

export default function TableScrollArea() {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  row.status === '활성' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
```

## 컴포넌트 API

### ScrollArea
메인 스크롤 영역 컨테이너입니다.

**Props:**
- `className`: 추가 CSS 클래스
- `children`: 스크롤할 콘텐츠

### ScrollBar
커스텀 스크롤바 컴포넌트입니다.

**Props:**
- `orientation`: 스크롤바 방향 ("horizontal" | "vertical")
- `className`: 추가 CSS 클래스

## 스크롤 이벤트 처리

```tsx
import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaWithEvents() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
        
        if (isAtBottom) {
          console.log("스크롤이 맨 아래에 도달했습니다!")
        }
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollArea ref={scrollRef} className="h-[300px] w-[350px] rounded-md border">
      <div className="p-4 space-y-4">
        <h4 className="text-sm font-medium leading-none">스크롤 이벤트 예시</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm p-2 bg-muted rounded">
            항목 {i + 1} - 스크롤하여 맨 아래까지 가보세요!
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

## 접근성

Scroll Area 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 스크롤 위치 안내

## 성능 최적화

```tsx
import { useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function OptimizedScrollArea() {
  const items = useMemo(() => 
    Array.from({ length: 1000 }).map((_, i) => ({
      id: i,
      title: `항목 ${i + 1}`,
      description: `이것은 ${i + 1}번째 항목의 설명입니다.`
    })), []
  )

  return (
    <ScrollArea className="h-[400px] w-[400px] rounded-md border">
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-3 border rounded">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```
