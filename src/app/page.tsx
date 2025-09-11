import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, BookOpen, Code, Play, Settings } from 'lucide-react';

const features = [
  {
    title: '디자인 가이드',
    description: 'Markdown으로 작성 가능한 디자인 가이드',
    icon: BookOpen,
    href: '/design-guide',
  },
  {
    title: '디자인 토큰',
    description: '색상, 타이포그래피, 간격 등 디자인 토큰을 체계적으로 관리',
    icon: Palette,
    href: '/tokens',
  },
  {
    title: '테마 에디터',
    description: 'Tailwind CSS 기반의 테마 커스터마이징 도구',
    icon: Settings,
    href: '/theme-editor',
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
                  <Link href={feature.href}>자세히 보기</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
