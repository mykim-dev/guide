export interface ComponentGuideTemplate {
    title: string;
    description: string;
    sections: GuideSection[];
}

export interface GuideSection {
    title: string;
    description?: string;
    examples: ComponentExample[];
}

export interface ComponentExample {
    name: string;
    title: string;
    description?: string;
    code: string;
    componentName: string;
}

// 기본 가이드 템플릿 생성 함수
export function createComponentGuideTemplate(
    componentName: string,
    title: string,
    description: string,
    sections: GuideSection[]
): ComponentGuideTemplate {
    return {
        title,
        description,
        sections,
    };
}

// 마크다운 생성 함수
export function generateComponentGuideMarkdown(template: ComponentGuideTemplate): string {
    let markdown = `---
title: "${template.title}"
description: "${template.description}"
---

# ${template.title} 컴포넌트

${template.description}

## 기본 사용법

\`\`\`tsx
import { ${template.title} } from '@/components/ui/${template.title.toLowerCase()}';

export function MyComponent() {
  return (
    <${template.title}>기본 ${template.title}</${template.title}>
  );
}
\`\`\`

`;

    // 각 섹션 생성
    template.sections.forEach((section) => {
        markdown += `## ${section.title}\n\n`;

        if (section.description) {
            markdown += `${section.description}\n\n`;
        }

        section.examples.forEach((example) => {
            markdown += `### ${example.title}\n\n`;

            if (example.description) {
                markdown += `${example.description}\n\n`;
            }

            markdown += `:::component-example ${example.componentName}\n`;
            markdown += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
            markdown += `<div>\n${example.code}\n</div>\n`;
            markdown += `:::\n\n`;
        });
    });

    // API Reference 섹션 추가
    markdown += `## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`string\` | \`'default'\` | 컴포넌트의 스타일 변형 |
| \`size\` | \`string\` | \`'default'\` | 컴포넌트의 크기 |
| \`disabled\` | \`boolean\` | \`false\` | 컴포넌트 비활성화 |

## 접근성

${template.title} 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 적절한 ARIA 속성
- 포커스 표시

## 모범 사례

1. **명확한 라벨링**: 컴포넌트의 기능을 명확하게 설명하는 텍스트 사용
2. **일관된 스타일**: 동일한 기능의 컴포넌트는 동일한 스타일 사용
3. **적절한 크기**: 터치 디바이스를 고려한 충분한 크기 제공
4. **시각적 피드백**: 호버, 포커스, 활성 상태에 대한 명확한 피드백
`;

    return markdown;
}

// 미리 정의된 컴포넌트 템플릿들
export const componentTemplates: Record<string, ComponentGuideTemplate> = {
    button: createComponentGuideTemplate(
        'Button',
        'Button',
        '버튼은 사용자의 주요 액션을 트리거하는 핵심 UI 요소입니다.',
        [
            {
                title: 'Variants',
                description: '버튼은 다양한 스타일 변형을 지원합니다:',
                examples: [
                    {
                        name: 'Default',
                        title: 'Default',
                        componentName: 'DefaultButtonExample',
                        code: '<Button>Default Button</Button>',
                    },
                    {
                        name: 'Secondary',
                        title: 'Secondary',
                        componentName: 'SecondaryButtonExample',
                        code: '<Button variant="secondary">Secondary Button</Button>',
                    },
                    {
                        name: 'Destructive',
                        title: 'Destructive',
                        componentName: 'DestructiveButtonExample',
                        code: '<Button variant="destructive">Delete</Button>',
                    },
                    {
                        name: 'Outline',
                        title: 'Outline',
                        componentName: 'OutlineButtonExample',
                        code: '<Button variant="outline">Outline Button</Button>',
                    },
                    {
                        name: 'Ghost',
                        title: 'Ghost',
                        componentName: 'GhostButtonExample',
                        code: '<Button variant="ghost">Ghost Button</Button>',
                    },
                    {
                        name: 'Link',
                        title: 'Link',
                        componentName: 'LinkButtonExample',
                        code: '<Button variant="link">Link Button</Button>',
                    },
                ],
            },
            {
                title: 'Sizes',
                description: '버튼은 다양한 크기를 지원합니다:',
                examples: [
                    {
                        name: 'Default Size',
                        title: 'Default Size',
                        componentName: 'DefaultSizeExample',
                        code: '<Button>Default Size</Button>',
                    },
                    {
                        name: 'Small',
                        title: 'Small',
                        componentName: 'SmallButtonExample',
                        code: '<Button size="sm">Small Button</Button>',
                    },
                    {
                        name: 'Large',
                        title: 'Large',
                        componentName: 'LargeButtonExample',
                        code: '<Button size="lg">Large Button</Button>',
                    },
                    {
                        name: 'Icon',
                        title: 'Icon',
                        componentName: 'IconButtonExample',
                        code: '<Button size="icon">\n  <Plus className="h-4 w-4" />\n</Button>',
                    },
                ],
            },
            {
                title: '상태',
                examples: [
                    {
                        name: 'Disabled',
                        title: 'Disabled',
                        componentName: 'DisabledButtonExample',
                        code: '<Button disabled>Disabled Button</Button>',
                    },
                    {
                        name: 'Loading',
                        title: 'Loading',
                        componentName: 'LoadingButtonExample',
                        code: '<Button disabled>\n  <Loader2 className="mr-2 h-4 w-4 animate-spin" />\n  Loading...\n</Button>',
                    },
                ],
            },
            {
                title: '아이콘과 함께 사용',
                examples: [
                    {
                        name: 'Icon Buttons',
                        title: 'Icon Buttons',
                        componentName: 'IconButtonExamples',
                        code: '<div className="flex gap-4 items-center">\n  <Button>\n    <Plus className="mr-2 h-4 w-4" />\n    Add Item\n  </Button>\n  \n  <Button variant="outline">\n    <Download className="mr-2 h-4 w-4" />\n    Download\n  </Button>\n  \n  <Button variant="ghost" size="icon">\n    <Settings className="h-4 w-4" />\n  </Button>\n</div>',
                    },
                ],
            },
            {
                title: '링크로 사용',
                examples: [
                    {
                        name: 'Link Button',
                        title: 'Link Button',
                        componentName: 'LinkButtonExample',
                        code: '<Button asChild>\n  <Link href="/dashboard">Go to Dashboard</Link>\n</Button>',
                    },
                ],
            },
        ]
    ),

    input: createComponentGuideTemplate(
        'Input',
        'Input',
        '입력 필드는 사용자로부터 텍스트 데이터를 수집하는 기본적인 UI 요소입니다.',
        [
            {
                title: '기본 타입',
                description: '다양한 입력 타입을 지원합니다:',
                examples: [
                    {
                        name: 'Text',
                        title: 'Text',
                        componentName: 'TextInputExample',
                        code: '<Input type="text" placeholder="Enter your name" />',
                    },
                    {
                        name: 'Email',
                        title: 'Email',
                        componentName: 'EmailInputExample',
                        code: '<Input type="email" placeholder="Enter your email" />',
                    },
                    {
                        name: 'Password',
                        title: 'Password',
                        componentName: 'PasswordInputExample',
                        code: '<Input type="password" placeholder="Enter your password" />',
                    },
                    {
                        name: 'Number',
                        title: 'Number',
                        componentName: 'NumberInputExample',
                        code: '<Input type="number" placeholder="Enter your age" />',
                    },
                    {
                        name: 'Search',
                        title: 'Search',
                        componentName: 'SearchInputExample',
                        code: '<Input type="search" placeholder="Search..." />',
                    },
                ],
            },
            {
                title: '아이콘과 함께 사용',
                examples: [
                    {
                        name: 'Icon Input',
                        title: 'Icon Input',
                        componentName: 'IconInputExample',
                        code: '<div className="space-y-4">\n  <div className="relative">\n    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />\n    <Input placeholder="Search..." className="pl-10" />\n  </div>\n  <div className="relative">\n    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />\n    <Input type="email" placeholder="Email" className="pl-10" />\n  </div>\n  <div className="relative">\n    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />\n    <Input type="password" placeholder="Password" className="pl-10" />\n  </div>\n</div>',
                    },
                ],
            },
            {
                title: '라벨과 함께 사용',
                examples: [
                    {
                        name: 'Basic Form',
                        title: 'Basic Form',
                        componentName: 'BasicFormExample',
                        code: '<div className="space-y-4">\n  <div className="space-y-2">\n    <Label htmlFor="name">Name</Label>\n    <Input id="name" placeholder="Enter your full name" />\n  </div>\n  <div className="space-y-2">\n    <Label htmlFor="email">Email</Label>\n    <Input id="email" type="email" placeholder="Enter your email" />\n  </div>\n  <div className="space-y-2">\n    <Label htmlFor="password">Password</Label>\n    <Input id="password" type="password" placeholder="Enter your password" />\n  </div>\n</div>',
                    },
                ],
            },
        ]
    ),

    badge: createComponentGuideTemplate(
        'Badge',
        'Badge',
        '배지는 상태, 카테고리, 알림 등을 표시하는 작은 UI 요소입니다.',
        [
            {
                title: 'Variants',
                description: '다양한 스타일 변형을 지원합니다:',
                examples: [
                    {
                        name: 'Default',
                        title: 'Default',
                        componentName: 'DefaultBadgeExample',
                        code: '<Badge>Default Badge</Badge>',
                    },
                    {
                        name: 'Secondary',
                        title: 'Secondary',
                        componentName: 'SecondaryBadgeExample',
                        code: '<Badge variant="secondary">Secondary Badge</Badge>',
                    },
                    {
                        name: 'Destructive',
                        title: 'Destructive',
                        componentName: 'DestructiveBadgeExample',
                        code: '<Badge variant="destructive">Error</Badge>',
                    },
                    {
                        name: 'Outline',
                        title: 'Outline',
                        componentName: 'OutlineBadgeExample',
                        code: '<Badge variant="outline">Outline Badge</Badge>',
                    },
                ],
            },
            {
                title: '사용 사례',
                examples: [
                    {
                        name: 'Status',
                        title: 'Status',
                        componentName: 'StatusBadgeExample',
                        code: '<div className="flex gap-2">\n  <Badge>Active</Badge>\n  <Badge variant="secondary">Pending</Badge>\n  <Badge variant="destructive">Failed</Badge>\n  <Badge variant="outline">Draft</Badge>\n</div>',
                    },
                    {
                        name: 'Category',
                        title: 'Category',
                        componentName: 'CategoryBadgeExample',
                        code: '<div className="flex gap-2">\n  <Badge>React</Badge>\n  <Badge>TypeScript</Badge>\n  <Badge>Next.js</Badge>\n  <Badge>Tailwind CSS</Badge>\n</div>',
                    },
                    {
                        name: 'Notification',
                        title: 'Notification',
                        componentName: 'NotificationBadgeExample',
                        code: '<div className="flex items-center gap-2">\n  <span>Notifications</span>\n  <Badge variant="destructive">5</Badge>\n</div>',
                    },
                    {
                        name: 'Icon Badge',
                        title: 'Icon Badge',
                        componentName: 'IconBadgeExample',
                        code: '<div className="flex gap-2">\n  <Badge className="flex items-center gap-1">\n    <CheckCircle className="h-3 w-3" />\n    Completed\n  </Badge>\n  <Badge variant="secondary" className="flex items-center gap-1">\n    <Clock className="h-3 w-3" />\n    In Progress\n  </Badge>\n  <Badge variant="destructive" className="flex items-center gap-1">\n    <AlertCircle className="h-3 w-3" />\n    Error\n  </Badge>\n</div>',
                    },
                ],
            },
        ]
    ),

    card: createComponentGuideTemplate(
        'Card',
        'Card',
        '카드는 관련된 콘텐츠를 그룹화하고 구조화하는 컨테이너 컴포넌트입니다.',
        [
            {
                title: '기본 사용법',
                examples: [
                    {
                        name: 'Simple Card',
                        title: 'Simple Card',
                        componentName: 'SimpleCardExample',
                        code: '<Card>\n  <CardContent className="pt-6">\n    <div className="text-2xl font-bold">$1,234</div>\n    <p className="text-xs text-muted-foreground">\n      +20.1% from last month\n    </p>\n  </CardContent>\n</Card>',
                    },
                    {
                        name: 'Card with Header',
                        title: 'Card with Header',
                        componentName: 'CardWithHeaderExample',
                        code: '<Card>\n  <CardHeader>\n    <CardTitle>Create project</CardTitle>\n    <CardDescription>\n      Deploy your new project in one-click.\n    </CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>This is the main content of the card.</p>\n  </CardContent>\n</Card>',
                    },
                ],
            },
            {
                title: '폼과 함께 사용',
                examples: [
                    {
                        name: 'Card with Form',
                        title: 'Card with Form',
                        componentName: 'CardWithFormExample',
                        code: '<Card className="w-[350px]">\n  <CardHeader>\n    <CardTitle>Create account</CardTitle>\n    <CardDescription>\n      Enter your email below to create your account.\n    </CardDescription>\n  </CardHeader>\n  <CardContent>\n    <div className="grid w-full items-center gap-4">\n      <div className="flex flex-col space-y-1.5">\n        <Label htmlFor="email">Email</Label>\n        <Input id="email" placeholder="Enter your email" />\n      </div>\n      <div className="flex flex-col space-y-1.5">\n        <Label htmlFor="password">Password</Label>\n        <Input id="password" type="password" />\n      </div>\n      <Button>Create account</Button>\n    </div>\n  </CardContent>\n</Card>',
                    },
                ],
            },
        ]
    ),

    select: createComponentGuideTemplate(
        'Select',
        'Select',
        '셀렉트는 드롭다운 목록에서 옵션을 선택할 수 있는 컴포넌트입니다.',
        [
            {
                title: '기본 사용법',
                examples: [
                    {
                        name: 'Basic Select',
                        title: 'Basic Select',
                        componentName: 'BasicSelectExample',
                        code: '<Select>\n  <SelectTrigger className="w-[180px]">\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n    <SelectItem value="orange">Orange</SelectItem>\n    <SelectItem value="grape">Grape</SelectItem>\n  </SelectContent>\n</Select>',
                    },
                    {
                        name: 'Label Select',
                        title: 'Label Select',
                        componentName: 'LabelSelectExample',
                        code: '<div className="space-y-2">\n  <Label htmlFor="framework">Framework</Label>\n  <Select>\n    <SelectTrigger id="framework">\n      <SelectValue placeholder="Select a framework" />\n    </SelectTrigger>\n    <SelectContent>\n      <SelectItem value="react">React</SelectItem>\n      <SelectItem value="vue">Vue</SelectItem>\n      <SelectItem value="angular">Angular</SelectItem>\n      <SelectItem value="svelte">Svelte</SelectItem>\n    </SelectContent>\n  </Select>\n</div>',
                    },
                    {
                        name: 'Disabled Select',
                        title: 'Disabled Select',
                        componentName: 'DisabledSelectExample',
                        code: '<Select disabled>\n  <SelectTrigger>\n    <SelectValue placeholder="Disabled select" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="option1">Option 1</SelectItem>\n    <SelectItem value="option2">Option 2</SelectItem>\n  </SelectContent>\n</Select>',
                    },
                ],
            },
        ]
    ),
};
