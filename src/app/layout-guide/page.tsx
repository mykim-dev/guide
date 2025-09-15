import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, BookOpen, Code, Play, Settings, Star, Globe } from 'lucide-react';

const features = [
  {
    title: 'Overview',
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    icon: BookOpen,
    href: '/layout-guide/overview/introduction/',
  },
  {
    title: 'Brand',
    description: '브랜드 아이덴티티와 일관된 시각적 표현을 위한 가이드라인을 제공합니다.',
    icon: Star,
    href: '/layout-guide/brand/logo/',
  },
  {
    title: 'Resource',
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    icon: Globe,
    href: '/layout-guide/resource/',
  },
  {
    title: 'Foundations',
    description: '디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 제공합니다.',
    icon: Palette,
    href: '/layout-guide/foundations/',
  },
  {
    title: '컴포넌트 가이드',
    description: '50+ UI 컴포넌트의 사용법과 예제를 제공합니다.',
    icon: Code,
    href: '/layout-guide/component-guide/',
  },
  {
    title: '플레이그라운드',
    description: '실시간으로 컴포넌트를 테스트하고 미리보기할 수 있는 환경을 제공합니다.',
    icon: Play,
    href: '/layout-guide/playground/',
  },
  {
    title: '테마 에디터',
    description: 'OKLCH 색상 공간 기반의 테마 커스터마이징 도구입니다.',
    icon: Settings,
    href: '/layout-cals-app/',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight mt-16">
          Design System Guide
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          체계적인 디자인 시스템을 구축하고 관리할 수 있는 종합적인 가이드입니다.
          <br />
          디자인 토큰부터 컴포넌트 라이브러리, 그리고 테마 에디터까지 모든 것을 제공합니다.
        </p>

        {/* <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            50+ UI 컴포넌트
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            OKLCH 색상 시스템
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            실시간 테마 에디터
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            TypeScript 지원
          </span>
        </div> */}
      </div>

      {/* Quick Start Section */}
      {/* <div className="bg-muted/50 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-center">빠른 시작</h2>
        <div className="grid gap-4 md:grid-cols-3 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-medium">1. 디자인 토큰 확인</h3>
            <p className="text-sm text-muted-foreground">색상, 타이포그래피, 간격 등 기본 토큰을 살펴보세요</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-2xl">🧩</span>
            </div>
            <h3 className="font-medium">2. 컴포넌트 탐색</h3>
            <p className="text-sm text-muted-foreground">50+ UI 컴포넌트의 사용법과 예제를 확인하세요</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-medium">3. 테마 커스터마이징</h3>
            <p className="text-sm text-muted-foreground">실시간으로 테마를 편집하고 미리보기하세요</p>
          </div>
        </div>
      </div> */}

      {/* Features Grid */}
      <div className="space-y-6">
        {/* <h2 className="text-3xl font-bold text-center">주요 기능</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col justify-between group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link
                    href={feature.href}
                    target={feature.title === '테마 에디터' ? '_blank' : undefined}
                  >
                    자세히 보기
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">50+</div>
          <div className="text-sm text-muted-foreground">UI 컴포넌트</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">100%</div>
          <div className="text-sm text-muted-foreground">TypeScript</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">OKLCH</div>
          <div className="text-sm text-muted-foreground">색상 시스템</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">실시간</div>
          <div className="text-sm text-muted-foreground">테마 에디터</div>
        </div>
      </div> */}

      {/* CTA Section */}
      {/* <div className="text-center space-y-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
        <h2 className="text-2xl font-semibold">지금 시작해보세요</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          디자인 시스템을 통해 일관성 있고 확장 가능한 사용자 인터페이스를 구축하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/layout-guide/overview/introduction/">시작하기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/layout-guide/playground/">플레이그라운드</Link>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
