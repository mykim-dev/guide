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
import { Button } from '@/components/ui/button';
import { Plus, Download, Settings, Loader2, Search, Mail, Lock, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// 동적 컴포넌트 예제 생성 함수
const createComponentExample = (componentName: string) => {
  const buttonVariants = {
    'Default': { variant: 'default' as const },
    'Secondary': { variant: 'secondary' as const },
    'Destructive': { variant: 'destructive' as const },
    'Outline': { variant: 'outline' as const },
    'Ghost': { variant: 'ghost' as const },
    'Link': { variant: 'link' as const },
  };

  const buttonSizes = {
    'Default': {},
    'Small': { size: 'sm' as const },
    'Large': { size: 'lg' as const },
    'Icon': { size: 'icon' as const },
  };

  const buttonStates = {
    'Disabled': { disabled: true },
    'Loading': { disabled: true },
  };

  // Input 컴포넌트 예제
  const inputExamples = {
    'TextInputExample': () => <Input type="text" placeholder="Enter your name" />,
    'EmailInputExample': () => <Input type="email" placeholder="Enter your email" />,
    'PasswordInputExample': () => <Input type="password" placeholder="Enter your password" />,
    'NumberInputExample': () => <Input type="number" placeholder="Enter your age" />,
    'SearchInputExample': () => <Input type="search" placeholder="Search..." />,
    'UrlInputExample': () => <Input type="url" placeholder="Enter website URL" />,
    'TelInputExample': () => <Input type="tel" placeholder="Enter phone number" />,
    'BasicFormExample': () => (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
      </div>
    ),
    'IconInputExample': () => (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="email" placeholder="Email" className="pl-10" />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="password" placeholder="Password" className="pl-10" />
        </div>
      </div>
    ),
  };

  // Badge 컴포넌트 예제
  const badgeExamples = {
    'DefaultBadgeExample': () => <Badge>Default Badge</Badge>,
    'SecondaryBadgeExample': () => <Badge variant="secondary">Secondary Badge</Badge>,
    'DestructiveBadgeExample': () => <Badge variant="destructive">Error</Badge>,
    'OutlineBadgeExample': () => <Badge variant="outline">Outline Badge</Badge>,
    'StatusBadgeExample': () => (
      <div className="flex gap-2">
        <Badge>Active</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    ),
    'CategoryBadgeExample': () => (
      <div className="flex gap-2">
        <Badge>React</Badge>
        <Badge>TypeScript</Badge>
        <Badge>Next.js</Badge>
        <Badge>Tailwind CSS</Badge>
      </div>
    ),
    'NotificationBadgeExample': () => (
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="destructive">5</Badge>
      </div>
    ),
    'IconBadgeExample': () => (
      <div className="flex gap-2">
        <Badge className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          In Progress
        </Badge>
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Error
        </Badge>
      </div>
    ),
  };

  // Card 컴포넌트 예제
  const cardExamples = {
    'SimpleCardExample': () => (
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">$1,234</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    ),
    'CardWithHeaderExample': () => (
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
      </Card>
    ),
    'CardWithFormExample': () => (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Enter your email below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button>Create account</Button>
          </div>
        </CardContent>
      </Card>
    ),
  };

  // Select 컴포넌트 예제
  const selectExamples = {
    'BasicSelectExample': () => (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
    ),
    'LabelSelectExample': () => (
      <div className="space-y-2">
        <Label htmlFor="framework">Framework</Label>
        <Select>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    'DisabledSelectExample': () => (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    ),
  };

  // 버튼 variant 예제
  for (const [variant, props] of Object.entries(buttonVariants)) {
    if (componentName.includes(variant) && componentName.includes('Button')) {
      return () => (
        <Button {...props}>
          {variant === 'Destructive' ? 'Delete' : `${variant} Button`}
        </Button>
      );
    }
  }

  // 버튼 size 예제
  for (const [size, props] of Object.entries(buttonSizes)) {
    if (componentName.includes(size) && componentName.includes('Size')) {
      return () => (
        <Button {...props}>
          {size === 'Icon' ? <Plus className="h-4 w-4" /> : `${size} Button`}
        </Button>
      );
    }
  }

  // 버튼 상태 예제
  for (const [state, props] of Object.entries(buttonStates)) {
    if (componentName.includes(state)) {
      if (state === 'Loading') {
        return () => (
          <Button {...props}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        );
      }
      return () => (
        <Button {...props}>Disabled Button</Button>
      );
    }
  }

  // 특별한 예제들
  const specialExamples: Record<string, React.ComponentType<any>> = {
    'IconButtonExamples': () => (
      <div className="flex gap-4 items-center">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    ),
    'LinkButtonExample': () => (
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    ),
    ...inputExamples,
    ...badgeExamples,
    ...cardExamples,
    ...selectExamples,
  };

  return specialExamples[componentName] || (() => <div>Component not found: {componentName}</div>);
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // 컴포넌트 예제 블록을 처리하는 함수
  const processComponentExamples = (content: string): string => {
    const componentBlockRegex = /:::component-example\s+(\w+)\s*\n([\s\S]*?):::/g;
    
    return content.replace(componentBlockRegex, (match, componentName, blockContent) => {
      // 코드 블록과 컴포넌트를 분리
      const codeMatch = blockContent.match(/```tsx\s*\n([\s\S]*?)\n```/);
      const codeText = codeMatch ? codeMatch[1].trim() : '';
      
      // 코드 블록 이후의 내용을 컴포넌트로 추출
      const componentMatch = blockContent.replace(/```tsx\s*\n[\s\S]*?\n```\s*\n/, '');
      const componentText = componentMatch.trim();
      
      return `\n<div class="component-example" data-code="${encodeURIComponent(codeText)}" data-component="${componentName}">\n${componentText}\n</div>\n`;
    });
  };

  const processedContent = processComponentExamples(content);

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
              if (typeof element.props?.children === 'string') {
                return element.props.children;
              }
              if (Array.isArray(element.props?.children)) {
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
          div: ({ children, className, ...props }: any) => {
            // 컴포넌트 예제 블록 처리
            if (className === 'component-example') {
              const codeText = decodeURIComponent(props['data-code'] || '');
              const componentName = props['data-component'];
              const ComponentExample = createComponentExample(componentName);
              
              return (
                <div className="border rounded-lg my-6">
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="p-6">
                      <div className="component-preview">
                        <ComponentExample />
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="p-0">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-b-lg overflow-x-auto text-sm">
                          <code className="language-tsx">{codeText}</code>
                        </pre>
                        <div className="absolute top-2 right-2">
                          <CopyButton 
                            text={codeText} 
                            className="bg-background/80 backdrop-blur-sm hover:bg-background"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              );
            }
            
            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
