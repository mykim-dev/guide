import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownFile {
  slug: string;
  title: string;
  description?: string;
  content: string;
  frontMatter: Record<string, any>;
}

export function getMarkdownFiles(directory: string): MarkdownFile[] {
  const fullPath = path.join(process.cwd(), directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  return markdownFiles.map(file => {
    const filePath = path.join(fullPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.md$/, '');

    return {
      slug,
      title: data.title || slug,
      description: data.description,
      content,
      frontMatter: data,
    };
  });
}

export function getMarkdownFile(directory: string, slug: string): MarkdownFile | null {
  const fullPath = path.join(process.cwd(), directory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description,
    content,
    frontMatter: data,
  };
}

export function getMarkdownSlugs(directory: string): string[] {
  const fullPath = path.join(process.cwd(), directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}
