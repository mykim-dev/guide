import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/guide/markdown-renderer';
import { getMarkdownFile, getMarkdownSlugs } from '@/lib/markdown';

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
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MarkdownRenderer content={guide.content} />
      </div>
    </>
  );
}
