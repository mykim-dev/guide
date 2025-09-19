import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, BookOpen, Code, Play, Settings, Star, Globe } from 'lucide-react';

const features = [
  {
    title: 'Overview',
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    icon: BookOpen,
    href: '/app-guide/overview/introduction/',
  },
  {
    title: 'Brand',
    description: '브랜드 아이덴티티와 일관된 시각적 표현을 위한 가이드라인을 제공합니다.',
    icon: Star,
    href: '/app-guide/brand/logo/',
  },
  {
    title: 'Resource',
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    icon: Globe,
    href: '/app-guide/resource/logos',
  },
  {
    title: 'Foundations',
    description: '디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 제공합니다.',
    icon: Palette,
    href: '/app-guide/foundations/design-tokens',
  },
  {
    title: '컴포넌트 가이드',
    description: '50+ UI 컴포넌트의 사용법과 예제를 제공합니다.',
    icon: Code,
    href: '/app-guide/component-guide/',
  },
  {
    title: '플레이그라운드',
    description: '실시간으로 컴포넌트를 테스트하고 미리보기할 수 있는 환경을 제공합니다.',
    icon: Play,
    href: '/app-guide/playground/',
  },
  {
    title: 'UI 템플릿',
    description: 'OKLCH 색상 공간 기반의 테마 커스터마이징 도구입니다.',
    icon: Settings,
    href: '/app-guide/demos/',
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
          디자인 토큰부터 컴포넌트 라이브러리, 그리고 UI 템플릿까지 모든 것을 제공합니다.
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
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
                    target={feature.title === 'UI 템플릿' ? '_blank' : undefined}
                  >
                    자세히 보기
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
