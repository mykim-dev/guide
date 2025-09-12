import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const foundations = [
  {
    slug: 'design-tokens',
    title: '디자인 토큰',
    description: '디자인 시스템의 기본 구성 요소인 토큰들의 용도와 사용법을 확인하세요.',
    emoji: '🎨',
    href: '/foundations/design-tokens',
    features: ['토큰 카테고리', '사용법 가이드', '예시 코드']
  },
  {
    slug: 'typography',
    title: '타이포그래피',
    description: 'Tailwind CSS v4의 표준 타이포그래피 토큰들을 확인하세요.',
    emoji: '📝',
    href: '/foundations/typography',
    features: ['폰트 크기', '줄 높이', '미리보기']
  },
  {
    slug: 'spacing',
    title: '간격',
    description: '디자인 시스템의 간격 토큰들을 확인하고 사용법을 알아보세요.',
    emoji: '📏',
    href: '/foundations/spacing',
    features: ['시각적 표현', '사용 예시', 'Tailwind 클래스']
  },
  {
    slug: 'palette',
    title: '색상 팔레트',
    description: '디자인 시스템의 색상 팔레트를 확인하고 사용법을 알아보세요.',
    emoji: '🎨',
    href: '/foundations/palette',
    features: ['기본 색상', 'Tailwind 색상', '색상 코드']
  }
];

export default function FoundationsPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundations.map((page) => (
          <Card key={page.slug} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{page.emoji}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">
                {page.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {page.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={page.href}>
                자세히 보기 →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
