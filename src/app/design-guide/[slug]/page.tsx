import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
import { getMarkdownFile, getMarkdownFiles } from '@/lib/markdown';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface DesignGuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const guides = getMarkdownFiles('content/design-guide');
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function DesignGuidePage({ params }: DesignGuidePageProps) {
  const { slug } = await params;
  const guide = getMarkdownFile('content/design-guide', slug);
  const allGuides = getMarkdownFiles('content/design-guide');

  if (!guide) {
    notFound();
  }

  return (
    <>
      <Breadcrumb className="flex items-center justify-end mb-2 list-none text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/design-guide">디자인 가이드</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/design-guide/${slug}`}>{guide.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
        {guide.description && (
          <p className="text-muted-foreground">{guide.description}</p>
        )}
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MarkdownRenderer content={guide.content} />
      </div>      
    </>
  );
}
