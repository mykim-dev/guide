import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const platforms = [
  {
    slug: 'logos',
    title: '로고',
    description: '플랫폼 로고의 사용법을 확인하세요.',
    emoji: '🎨',
    href: '/app-guide/resource/logos',
    features: []
  },
  {
    slug: 'characters',
    title: '캐릭터',
    description: '플랫폼 캐릭터의 사용법을 확인하세요.',
    emoji: '📝',
    href: '/app-guide/resource/characters',
    features: []
  },
  {
    slug: 'loading',
    title: '로딩',
    description: '플랫폼 로딩의 사용법을 확인하세요.',
    emoji: '📝',
    href: '/app-guide/resource/loadings',
    features: []
  },
];

export default function PlatformPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((page) => (
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
