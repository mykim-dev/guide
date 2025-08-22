---
title: Carousel
description: 이미지나 콘텐츠를 슬라이드 형태로 표시하는 컴포넌트
---

# Carousel

Carousel 컴포넌트는 이미지, 카드, 또는 기타 콘텐츠를 슬라이드 형태로 표시할 수 있는 인터랙티브한 컴포넌트입니다.

## 기본 사용법

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export default function BasicCarousel() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## 이미지 Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
]

export default function ImageCarousel() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## 자동 재생 Carousel

```tsx
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

export default function AutoPlayCarousel() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [api, setApi] = useState<any>()

  useEffect(() => {
    if (!api) return

    if (isPlaying) {
      api.scrollNext()
      const interval = setInterval(() => {
        api.scrollNext()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [api, isPlaying])

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "정지" : "재생"}
        </Button>
      </div>
      
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6 border rounded-lg">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
```

## 인디케이터가 있는 Carousel

```tsx
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export default function CarouselWithIndicators() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6 border rounded-lg">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      <div className="flex justify-center space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant={current === index + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => api?.scrollTo(index)}
            className="w-2 h-2 rounded-full p-0"
          />
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {current} / {count}
      </div>
    </div>
  )
}
```

## 터치/드래그 지원

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function TouchCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 border rounded-lg">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## 컴포넌트 API

### Carousel
메인 Carousel 컨테이너입니다.

**Props:**
- `opts`: Carousel 옵션 설정
  - `align`: 슬라이드 정렬 방식 ("start", "center", "end")
  - `loop`: 무한 루프 여부
  - `slidesToScroll`: 한 번에 스크롤할 슬라이드 수
- `setApi`: Carousel API 설정 함수
- `className`: 추가 CSS 클래스

### CarouselContent
슬라이드들을 감싸는 컨테이너입니다.

### CarouselItem
개별 슬라이드 아이템입니다.

**Props:**
- `className`: 추가 CSS 클래스

### CarouselPrevious
이전 슬라이드로 이동하는 버튼입니다.

### CarouselNext
다음 슬라이드로 이동하는 버튼입니다.

## Carousel API 메서드

Carousel API를 통해 프로그래밍적으로 제어할 수 있습니다:

```tsx
// 특정 슬라이드로 이동
api.scrollTo(index)

// 다음 슬라이드로 이동
api.scrollNext()

// 이전 슬라이드로 이동
api.scrollPrev()

// 슬라이드 수 가져오기
const slideCount = api.scrollSnapList().length

// 현재 슬라이드 인덱스 가져오기
const currentIndex = api.selectedScrollSnap()
```

## 이벤트 처리

```tsx
import { useEffect } from "react"

useEffect(() => {
  if (!api) return

  // 슬라이드 변경 이벤트
  api.on("select", () => {
    console.log("슬라이드가 변경되었습니다")
  })

  // 슬라이드 시작 이벤트
  api.on("settle", () => {
    console.log("슬라이드가 완료되었습니다")
  })
}, [api])
```

## 반응형 Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function ResponsiveCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 border rounded-lg">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## 접근성

Carousel 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원 (화살표 키)
- 스크린 리더 지원
- ARIA 라벨 및 역할 설정
- 포커스 관리
