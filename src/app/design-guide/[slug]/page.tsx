import { notFound } from 'next/navigation';
import Link from 'next/link';
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
        <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
        {guide.description && (
          <p className="text-muted-foreground">{guide.description}</p>
        )}
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MarkdownRenderer content={guide.content} />
      </div>

      <nav className="fixed top-28 right-12 bg-background border border-border rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">디자인 가이드</h3>
        <ul className="space-y-2">
          {allGuides.map((guideItem) => (
            <li key={guideItem.slug}>
              <Link 
                href={`/design-guide/${guideItem.slug}`}
                className={`text-sm block px-2 py-1 rounded hover:bg-accent transition-colors ${
                  slug === guideItem.slug ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
              >
                {guideItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
