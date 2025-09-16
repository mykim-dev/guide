'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LayoutsPage() { 
  const layouts = [
    {
      slug: 'CALS APP',
      title: 'CALS',
      description: 'CALS 어플리케이션',
      emoji: '🎨',
      href: '/layout-cals-app/',
      features: []
    },
    {
      slug: 'CALS Agent',
      title: 'CALS Agent',
      description: '플랫폼 캐릭터의 사용법을 확인하세요.',
      emoji: '📝',
      href: '/layout-agent/',
      features: []
    },
    {
      slug: 'CALS Agent Studio',
      title: 'CALS Agent Studio',
      description: '플랫폼 로딩의 사용법을 확인하세요.',
      emoji: '📝',
      href: '/layout-agent-studio/',
      features: []
    },
  ];
  return (
      <div className="flex flex-col gap-24">
        {/* 레이아웃 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts.map((page) => (
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
              <Link href={page.href} target="_blank">
                자세히 보기 →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}