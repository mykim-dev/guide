import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Box, BookOpen, Code, Play, Settings } from 'lucide-react';

const features = [
  {
    title: '디자인 토큰',
    description: '색상, 타이포그래피, 간격 등 디자인 토큰을 체계적으로 관리',
    icon: Palette,
    href: '/tokens',
  },
  {
    title: '컴포넌트 라이브러리',
    description: 'shadcn/ui 기반의 재사용 가능한 컴포넌트 모음',
    icon: Box,
    href: '/components',
  },
  {
    title: '디자인 가이드',
    description: 'Markdown으로 작성 가능한 디자인 가이드',
    icon: BookOpen,
    href: '/design-guide',
  },
  {
    title: '컴포넌트 가이드',
    description: '각 컴포넌트의 사용법과 예제를 제공',
    icon: Code,
    href: '/component-guide',
  },
  {
    title: '플레이그라운드',
    description: '실시간으로 컴포넌트를 테스트하고 미리보기',
    icon: Play,
    href: '/playground',
  },
  {
    title: '테마 에디터',
    description: 'Tailwind CSS 기반의 테마 커스터마이징 도구',
    icon: Settings,
    href: '/theme-editor',
  },
];

export default function HomePage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="text-center mb-16" >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Design System Guide
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          체계적인 디자인 시스템을 구축하고 관리할 수 있는 종합적인 가이드입니다.
          디자인 토큰부터 컴포넌트 라이브러리, 그리고 테마 에디터까지 모든 것을 제공합니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tokens">시작하기</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/playground">플레이그라운드</Link>
          </Button>
        </div>
      </div >

      {/* Features Grid */}
      < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
        {
          features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.href}>자세히 보기</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        }
      </div >

      {/* Quick Start Section */}
      < div className="mt-16 p-8 bg-muted/50 rounded-lg" >
        <h2 className="text-2xl font-bold mb-4">빠른 시작</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">1. 디자인 토큰 확인</h3>
            <p className="text-sm text-muted-foreground">
              색상, 타이포그래피, 간격 등의 기본 토큰을 확인하고 필요에 따라 수정하세요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. 컴포넌트 탐색</h3>
            <p className="text-sm text-muted-foreground">
              제공되는 컴포넌트들을 살펴보고 사용법을 익히세요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. 플레이그라운드에서 테스트</h3>
            <p className="text-sm text-muted-foreground">
              실시간으로 컴포넌트를 테스트하고 다양한 설정을 시도해보세요.
            </p>
          </div>
        </div>
      </div >
    </div>
  );
}
