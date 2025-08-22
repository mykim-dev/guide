---
title: Context Menu
description: 우클릭으로 나타나는 컨텍스트 메뉴 컴포넌트
---

# Context Menu

Context Menu 컴포넌트는 우클릭(또는 롱 프레스)으로 나타나는 컨텍스트 메뉴입니다. 특정 요소에 대한 작업 옵션을 제공하는 데 사용됩니다.

## 기본 사용법

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BasicContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>컨텍스트 메뉴 예시</CardTitle>
            <CardDescription>
              이 카드를 우클릭하여 컨텍스트 메뉴를 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              우클릭하면 메뉴가 나타납니다.
            </p>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>복사</ContextMenuItem>
        <ContextMenuItem>붙여넣기</ContextMenuItem>
        <ContextMenuItem>삭제</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## 아이콘과 단축키가 있는 Context Menu

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Paste, Trash2, Edit, Share, Download } from "lucide-react"

export default function ContextMenuWithIcons() {
  const handleAction = (action: string) => {
    console.log(`실행된 작업: ${action}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>파일 관리</CardTitle>
            <CardDescription>
              우클릭하여 파일 작업을 수행하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                📄
              </div>
              <div>
                <p className="text-sm font-medium">문서.pdf</p>
                <p className="text-xs text-muted-foreground">2.5 MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => handleAction("열기")}>
          <Edit className="mr-2 h-4 w-4" />
          열기
          <ContextMenuShortcut>Ctrl+O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("복사")}>
          <Copy className="mr-2 h-4 w-4" />
          복사
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("붙여넣기")}>
          <Paste className="mr-2 h-4 w-4" />
          붙여넣기
          <ContextMenuShortcut>Ctrl+V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => handleAction("공유")}>
          <Share className="mr-2 h-4 w-4" />
          공유
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("다운로드")}>
          <Download className="mr-2 h-4 w-4" />
          다운로드
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem 
          onClick={() => handleAction("삭제")}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## 서브메뉴가 있는 Context Menu

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Sun, Moon, Monitor, ChevronRight } from "lucide-react"

export default function ContextMenuWithSubmenus() {
  const handleThemeChange = (theme: string) => {
    console.log(`테마 변경: ${theme}`)
  }

  const handleLanguageChange = (language: string) => {
    console.log(`언어 변경: ${language}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>설정 패널</CardTitle>
            <CardDescription>
              우클릭하여 설정 옵션을 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              서브메뉴가 포함된 컨텍스트 메뉴 예시입니다.
            </p>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            테마
            <ChevronRight className="ml-auto h-4 w-4" />
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={() => handleThemeChange("light")}>
              <Sun className="mr-2 h-4 w-4" />
              라이트
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleThemeChange("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              다크
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleThemeChange("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              시스템
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            언어
            <ChevronRight className="ml-auto h-4 w-4" />
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={() => handleLanguageChange("ko")}>
              한국어
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleLanguageChange("en")}>
              English
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleLanguageChange("ja")}>
              日本語
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleLanguageChange("zh")}>
              中文
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        <ContextMenuItem>설정 초기화</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## 이미지 갤러리 Context Menu

```tsx
import { useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { Download, Share, Trash2, Heart, RotateCw, ZoomIn } from "lucide-react"

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop", alt: "자연 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop", alt: "자연 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop", alt: "자연 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop", alt: "자연 4" },
]

export default function ImageGalleryContextMenu() {
  const [favorites, setFavorites] = useState<number[]>([])

  const handleAction = (action: string, imageId: number) => {
    console.log(`이미지 ${imageId}에 대한 작업: ${action}`)
    
    if (action === "favorite") {
      setFavorites(prev => 
        prev.includes(imageId) 
          ? prev.filter(id => id !== imageId)
          : [...prev, imageId]
      )
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      {images.map((image) => (
        <ContextMenu key={image.id}>
          <ContextMenuTrigger>
            <div className="relative group cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-lg"
              />
              {favorites.includes(image.id) && (
                <Heart className="absolute top-2 right-2 h-4 w-4 text-red-500 fill-current" />
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => handleAction("view", image.id)}>
              <ZoomIn className="mr-2 h-4 w-4" />
              크게 보기
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction("favorite", image.id)}>
              <Heart className={`mr-2 h-4 w-4 ${favorites.includes(image.id) ? 'text-red-500 fill-current' : ''}`} />
              {favorites.includes(image.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => handleAction("rotate", image.id)}>
              <RotateCw className="mr-2 h-4 w-4" />
              회전
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction("download", image.id)}>
              <Download className="mr-2 h-4 w-4" />
              다운로드
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction("share", image.id)}>
              <Share className="mr-2 h-4 w-4" />
              공유
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onClick={() => handleAction("delete", image.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
}
```

## 컴포넌트 API

### ContextMenu
메인 컨텍스트 메뉴 컨테이너입니다.

### ContextMenuTrigger
컨텍스트 메뉴를 트리거하는 요소입니다.

### ContextMenuContent
컨텍스트 메뉴의 콘텐츠 영역입니다.

### ContextMenuItem
개별 메뉴 아이템입니다.

**Props:**
- `onClick`: 클릭 이벤트 핸들러
- `disabled`: 비활성화 여부
- `className`: 추가 CSS 클래스

### ContextMenuSeparator
메뉴 아이템 간 구분선입니다.

### ContextMenuSub
서브메뉴 컨테이너입니다.

### ContextMenuSubTrigger
서브메뉴를 트리거하는 아이템입니다.

### ContextMenuSubContent
서브메뉴의 콘텐츠 영역입니다.

### ContextMenuShortcut
키보드 단축키를 표시합니다.

## 접근성

Context Menu 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 단축키 지원

## 동적 메뉴 생성

```tsx
import { useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: number
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}

export default function DynamicContextMenu() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "UI 디자인 완성", status: "todo", priority: "high" },
    { id: 2, title: "API 연동", status: "in-progress", priority: "medium" },
    { id: 3, title: "테스트 작성", status: "done", priority: "low" },
  ])

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const updateTaskPriority = (taskId: number, newPriority: Task["priority"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, priority: newPriority } : task
    ))
  }

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const getStatusBadge = (status: Task["status"]) => {
    const variants = {
      todo: "bg-gray-100 text-gray-800",
      "in-progress": "bg-blue-100 text-blue-800",
      done: "bg-green-100 text-green-800"
    }
    
    const labels = {
      todo: "할 일",
      "in-progress": "진행중",
      done: "완료"
    }

    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const getPriorityBadge = (priority: Task["priority"]) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800"
    }
    
    const labels = {
      low: "낮음",
      medium: "보통",
      high: "높음"
    }

    return <Badge className={variants[priority]}>{labels[priority]}</Badge>
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <ContextMenu key={task.id}>
          <ContextMenuTrigger>
            <Card className="cursor-pointer hover:bg-accent/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex gap-2">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => updateTaskStatus(task.id, "todo")}>
              할 일로 변경
            </ContextMenuItem>
            <ContextMenuItem onClick={() => updateTaskStatus(task.id, "in-progress")}>
              진행중으로 변경
            </ContextMenuItem>
            <ContextMenuItem onClick={() => updateTaskStatus(task.id, "done")}>
              완료로 변경
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => updateTaskPriority(task.id, "low")}>
              우선순위: 낮음
            </ContextMenuItem>
            <ContextMenuItem onClick={() => updateTaskPriority(task.id, "medium")}>
              우선순위: 보통
            </ContextMenuItem>
            <ContextMenuItem onClick={() => updateTaskPriority(task.id, "high")}>
              우선순위: 높음
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onClick={() => deleteTask(task.id)}
              className="text-red-600 focus:text-red-600"
            >
              작업 삭제
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
}
```
