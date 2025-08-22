'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/ui/copy-button';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose prose-gray dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji, remarkBreaks]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold mb-3 mt-6" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-bold mb-2 mt-4" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-lg font-bold mb-2 mt-4" {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="ml-4" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => {
            // Check if this is a code block with tsx language
            const codeElement = children as React.ReactElement;
            const isTsxCode = codeElement?.props?.className?.includes('language-tsx');
            
            // Extract the actual text content from the code block
            const extractTextContent = (element: React.ReactElement): string => {
              if (typeof element.props.children === 'string') {
                return element.props.children;
              }
              if (Array.isArray(element.props.children)) {
                return element.props.children
                  .map((child: any) => {
                    if (typeof child === 'string') {
                      return child;
                    }
                    if (typeof child === 'object' && child.props) {
                      return extractTextContent(child);
                    }
                    return '';
                  })
                  .join('');
              }
              return '';
            };
            
            const codeContent = isTsxCode ? extractTextContent(codeElement) : '';
            
            return (
              <div className="relative group">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props}>
                  {children}
                </pre>
                {isTsxCode && codeContent && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton 
                      text={codeContent} 
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                    />
                  </div>
                )}
              </div>
            );
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-border" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-primary hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg my-4"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
