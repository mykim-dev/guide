import fs from 'fs';
import path from 'path';
import { componentTemplates, generateComponentGuideMarkdown } from '../src/lib/component-guide-templates.js';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'component-guide');

// 디렉토리가 없으면 생성
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// 모든 컴포넌트 가이드 생성
Object.entries(componentTemplates).forEach(([componentName, template]) => {
    const markdown = generateComponentGuideMarkdown(template);
    const filePath = path.join(CONTENT_DIR, `${componentName}.md`);

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Generated: ${componentName}.md`);
});

console.log('\n🎉 All component guides generated successfully!');
