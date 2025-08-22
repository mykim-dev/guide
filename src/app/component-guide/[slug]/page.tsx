import { notFound } from 'next/navigation';
import { Navigation } from '@/components/layout/navigation';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
            {guide.description && (
              <p className="text-muted-foreground">{guide.description}</p>
            )}
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MarkdownRenderer content={guide.content} />
          </div>
        </div>
      </main>
    </div>
  );
}
