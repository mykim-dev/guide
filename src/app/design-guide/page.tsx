import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getMarkdownFiles } from '@/lib/markdown';

export default function DesignGuidePage() {
  const guides = getMarkdownFiles('content/design-guide');

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">디자인 가이드</h1>
        <p className="text-muted-foreground">
          디자인 시스템의 원칙과 가이드라인을 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.slug} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Link
                href={`/design-guide/${guide.slug}`}
                className="text-primary hover:underline"
              >
                자세히 보기 →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
