import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
import { getMarkdownFile, getMarkdownFiles } from '@/lib/markdown';

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
