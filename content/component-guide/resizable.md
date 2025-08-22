---
title: Resizable
description: 사용자가 크기를 조절할 수 있는 패널 컴포넌트
---

# Resizable

Resizable 컴포넌트는 사용자가 드래그하여 패널의 크기를 조절할 수 있는 인터랙티브한 컴포넌트입니다. 대시보드, 코드 에디터, 또는 레이아웃 빌더에서 유용합니다.

## 기본 사용법

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function BasicResizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">왼쪽 패널</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">오른쪽 패널</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 세로 방향 Resizable

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function VerticalResizable() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">상단 패널</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">하단 패널</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 3개 패널 Resizable

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ThreePanelResizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">사이드바</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">메인 콘텐츠</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">패널</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 코드 에디터 레이아웃

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CodeEditorLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={20}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">파일 탐색기</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">📁 src/</div>
              <div className="text-sm text-muted-foreground ml-4">📄 App.tsx</div>
              <div className="text-sm text-muted-foreground ml-4">📄 index.tsx</div>
              <div className="text-sm text-muted-foreground">📁 components/</div>
              <div className="text-sm text-muted-foreground ml-4">📄 Button.tsx</div>
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">코드 에디터</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="bg-muted p-4 rounded text-sm font-mono">
              <div className="text-muted-foreground">1 | import React from 'react'</div>
              <div className="text-muted-foreground">2 |</div>
              <div className="text-muted-foreground">3 | function App() {'{'}</div>
              <div className="text-muted-foreground">4 |   return (</div>
              <div className="text-muted-foreground">5 |     &lt;div&gt;Hello World&lt;/div&gt;</div>
              <div className="text-muted-foreground">6 |   )</div>
              <div className="text-muted-foreground">7 | }</div>
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={20}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">문제</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="text-xs text-green-600">✓ 컴파일 성공</div>
              <div className="text-xs text-yellow-600">⚠ 경고: 사용하지 않는 변수</div>
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 대시보드 레이아웃

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, DollarSign, Activity } from "lucide-react"

export default function DashboardLayout() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[500px] w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  매출 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted rounded flex items-center justify-center">
                  차트 영역
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  사용자 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted rounded flex items-center justify-center">
                  차트 영역
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  수익
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">이번 달</p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <Card className="h-full rounded-none border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">오늘 방문자</p>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 동적 패널 관리

```tsx
import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface Panel {
  id: string
  title: string
  size: number
}

export default function DynamicPanels() {
  const [panels, setPanels] = useState<Panel[]>([
    { id: "1", title: "패널 1", size: 50 },
    { id: "2", title: "패널 2", size: 50 }
  ])

  const addPanel = () => {
    const newPanel: Panel = {
      id: Date.now().toString(),
      title: `패널 ${panels.length + 1}`,
      size: 100 / (panels.length + 1)
    }
    setPanels([...panels, newPanel])
  }

  const removePanel = (id: string) => {
    if (panels.length > 1) {
      setPanels(panels.filter(panel => panel.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={addPanel} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          패널 추가
        </Button>
      </div>
      
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] w-full rounded-lg border"
      >
        {panels.map((panel, index) => (
          <div key={panel.id} className="flex">
            <ResizablePanel defaultSize={panel.size}>
              <div className="flex h-full items-center justify-center p-6 relative">
                <span className="font-semibold">{panel.title}</span>
                {panels.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => removePanel(panel.id)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </ResizablePanel>
            {index < panels.length - 1 && <ResizableHandle />}
          </div>
        ))}
      </ResizablePanelGroup>
    </div>
  )
}
```

## 최소/최대 크기 제한

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ConstrainedResizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel 
        defaultSize={30} 
        minSize={20} 
        maxSize={50}
      >
        <div className="flex h-full items-center justify-center p-6">
          <div className="text-center">
            <span className="font-semibold">사이드바</span>
            <p className="text-sm text-muted-foreground mt-2">
              최소 20%, 최대 50%
            </p>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel 
        defaultSize={70} 
        minSize={30}
      >
        <div className="flex h-full items-center justify-center p-6">
          <div className="text-center">
            <span className="font-semibold">메인 콘텐츠</span>
            <p className="text-sm text-muted-foreground mt-2">
              최소 30%
            </p>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## 컴포넌트 API

### ResizablePanelGroup
Resizable 패널들을 감싸는 컨테이너입니다.

**Props:**
- `direction`: 패널 배치 방향 ("horizontal" | "vertical")
- `className`: 추가 CSS 클래스

### ResizablePanel
개별 Resizable 패널입니다.

**Props:**
- `defaultSize`: 기본 크기 (퍼센트)
- `minSize`: 최소 크기 (퍼센트)
- `maxSize`: 최대 크기 (퍼센트)
- `className`: 추가 CSS 클래스

### ResizableHandle
패널 간 크기 조절 핸들입니다.

## 이벤트 처리

```tsx
import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ResizableWithEvents() {
  const [sizes, setSizes] = useState({ left: 50, right: 50 })

  const handleResize = (sizes: number[]) => {
    setSizes({ left: sizes[0], right: sizes[1] })
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        왼쪽: {sizes.left.toFixed(1)}% | 오른쪽: {sizes.right.toFixed(1)}%
      </div>
      
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border"
        onLayout={handleResize}
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">왼쪽 패널</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">오른쪽 패널</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
```

## 접근성

Resizable 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
- 드래그 앤 드롭 접근성

## 성능 최적화

```tsx
import { useMemo } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function OptimizedResizable() {
  const panels = useMemo(() => [
    { id: "1", title: "패널 1", content: "복잡한 콘텐츠 1" },
    { id: "2", title: "패널 2", content: "복잡한 콘텐츠 2" },
    { id: "3", title: "패널 3", content: "복잡한 콘텐츠 3" }
  ], [])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] w-full rounded-lg border"
    >
      {panels.map((panel, index) => (
        <div key={panel.id} className="flex">
          <ResizablePanel defaultSize={100 / panels.length}>
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <span className="font-semibold">{panel.title}</span>
                <p className="text-sm text-muted-foreground mt-2">
                  {panel.content}
                </p>
              </div>
            </div>
          </ResizablePanel>
          {index < panels.length - 1 && <ResizableHandle />}
        </div>
      ))}
    </ResizablePanelGroup>
  )
}
```
