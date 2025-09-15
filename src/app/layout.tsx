import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Design System Guide',
  description: 'A comprehensive design system guide with tokens, components, and playground',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKR.className}>
        {children}
      </body>
    </html>
  );
}
