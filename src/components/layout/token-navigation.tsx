import Link from 'next/link';

interface TokenNavigationProps {
  currentPage: string;
}

const tokenPages = [
  { slug: 'design-tokens', title: '디자인 토큰' },
  { slug: 'typography', title: '타이포그래피' },
  { slug: 'spacing', title: '간격' },
  { slug: 'palette', title: '색상 팔레트' },
];

export function TokenNavigation({ currentPage }: TokenNavigationProps) {
  return (
    <nav className="fixed top-28 right-12 bg-background border border-border rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">토큰 가이드</h3>
      <ul className="space-y-2">
        {tokenPages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/tokens/${page.slug}`}
              className={`text-sm block px-2 py-1 rounded transition-colors ${
                currentPage === page.slug
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent text-foreground'
              }`}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
