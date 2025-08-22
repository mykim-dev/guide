---
title: Drawer
description: 화면 가장자리에서 슬라이드되는 패널 컴포넌트
---

# Drawer

Drawer 컴포넌트는 화면의 가장자리에서 슬라이드되어 나타나는 패널입니다. 모바일 환경에서 Dialog의 대안으로 사용되거나, 보조 콘텐츠를 표시하는 데 적합합니다.

## 기본 사용법

```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function BasicDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Drawer 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer 제목</DrawerTitle>
          <DrawerDescription>
            이것은 Drawer의 설명입니다. 여기에 추가 정보를 표시할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            Drawer의 메인 콘텐츠가 여기에 표시됩니다.
          </p>
        </div>
        <DrawerFooter>
          <Button>확인</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## 폼이 있는 Drawer

```tsx
import { useState } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DrawerWithForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    console.log("제출:", { name, email, message })
    // 폼 제출 로직
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>문의하기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>문의 양식</DrawerTitle>
          <DrawerDescription>
            궁금한 사항이나 문의사항을 남겨주세요.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              rows={4}
            />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>전송</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## 설정 패널 Drawer

```tsx
import { useState } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"

export default function SettingsDrawer() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [volume, setVolume] = useState([50])
  const [language, setLanguage] = useState("ko")

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>설정</DrawerTitle>
          <DrawerDescription>
            애플리케이션 설정을 변경할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>알림</span>
              <span className="text-sm text-muted-foreground">
                새로운 메시지 알림을 받습니다
              </span>
            </Label>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex flex-col space-y-1">
              <span>다크 모드</span>
              <span className="text-sm text-muted-foreground">
                어두운 테마를 사용합니다
              </span>
            </Label>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          
          <div className="space-y-3">
            <Label>볼륨</Label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              현재 볼륨: {volume[0]}%
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>언어</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="언어를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DrawerFooter>
          <Button>설정 저장</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## 컴포넌트 API

### Drawer
메인 Drawer 컨테이너입니다.

### DrawerTrigger
Drawer를 열기 위한 트리거 버튼입니다.

**Props:**
- `asChild`: 자식 요소를 트리거로 사용할지 여부

### DrawerContent
Drawer의 메인 콘텐츠 영역입니다.

### DrawerHeader
Drawer의 헤더 영역입니다.

### DrawerTitle
Drawer의 제목을 나타냅니다.

### DrawerDescription
Drawer의 설명을 나타냅니다.

### DrawerFooter
Drawer의 푸터 영역입니다.

### DrawerClose
Drawer를 닫기 위한 버튼입니다.

**Props:**
- `asChild`: 자식 요소를 닫기 버튼으로 사용할지 여부

## 접근성

Drawer 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- ESC 키로 닫기
- 포커스 트랩
- ARIA 라벨 및 역할 설정
- 스크린 리더 지원

## 모바일 최적화

```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MobileOptimizedDrawer() {
  const items = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `항목 ${i + 1}`,
    description: `이것은 ${i + 1}번째 항목의 설명입니다.`
  }))

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>목록 보기</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>항목 목록</DrawerTitle>
          <DrawerDescription>
            스크롤하여 모든 항목을 확인하세요.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="p-3 border rounded-lg">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```
