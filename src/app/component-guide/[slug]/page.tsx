import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
import { getMarkdownFile, getMarkdownSlugs } from '@/lib/markdown';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface ComponentGuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getMarkdownSlugs('content/component-guide');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ComponentGuidePage({ params }: ComponentGuidePageProps) {
  const { slug } = await params;
  const guide = getMarkdownFile('content/component-guide', slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <Breadcrumb className="flex items-center justify-end mb-2 list-none text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/component-guide">컴포넌트 가이드</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/component-guide/${slug}`}>{guide.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
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
