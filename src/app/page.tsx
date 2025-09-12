import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, BookOpen, Code, Play, Settings, Star, Globe } from 'lucide-react';

const features = [
  {
    title: 'Overview',
    description: '이 디자인 시스템은 일관성 있고 확장 가능한 사용자 인터페이스를 구축하기 위한 가이드라인을 제공합니다.',
    icon: BookOpen,
    href: '/overview/introduction/',
  },
  {
    title: 'Brand',
    description: '브랜드 아이덴티티와 일관된 시각적 표현을 위한 가이드라인을 제공합니다.',
    icon: Star,
    href: '/brand/',
  },
  {
    title: 'Platform',
    description: '플랫폼별 로고 및 캐릭터 가이드를 제공합니다.',
    icon: Globe,
    href: '/platform/',
  },
  {
    title: 'Foundations',
    description: '디자인 시스템의 기본 구성 요소인 색상, 타이포그래피, 간격 토큰들을 제공합니다.',
    icon: Palette,
    href: '/foundations/',
  },  
  {
    title: '컴포넌트 가이드',
    description: '50+ UI 컴포넌트의 사용법과 예제를 제공합니다.',
    icon: Code,
    href: '/component-guide/',
  },
  {
    title: '플레이그라운드',
    description: '실시간으로 컴포넌트를 테스트하고 미리보기할 수 있는 환경을 제공합니다.',
    icon: Play,
    href: '/playground/',
  },  
  {
    title: '테마 에디터',
    description: 'OKLCH 색상 공간 기반의 테마 커스터마이징 도구입니다.',
    icon: Settings,
    href: '/theme-editor/',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-4xl font-bold tracking-tight leading-relaxed">
        Design System Guide
      </h1>

      <p className="text-xl text-muted-foreground text-center leading-normal">
        체계적인 디자인 시스템을 구축하고 관리할 수 있는 종합적인 가이드입니다.
        <br />
        디자인 토큰부터 컴포넌트 라이브러리, 그리고 테마 에디터까지 모든 것을 제공합니다.
      </p>

      {/* Features Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
        {
          features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link 
                    href={feature.href}
                    target={feature.title === '테마 에디터' ? '_blank' : undefined}
                  >
                    자세히 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
