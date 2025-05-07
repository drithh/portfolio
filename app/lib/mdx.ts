import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

export type WorkFrontmatter = {
  title: string;
  company: string;
  date: string;
  icon: 'code' | 'graduation';
  sortnum: number;
};

export type Work = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
};

export async function getWorkContent(): Promise<Work[]> {
  try {
    const workDir = path.join(process.cwd(), 'content/work');
    const files = await fs.readdir(workDir);
    
    const works = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(workDir, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          return {
            slug: file.replace('.mdx', ''),
            frontmatter: data as WorkFrontmatter,
            content: md.render(content)
          };
        })
    );

    // Sort by sortnum in descending order
    return works.sort((a, b) => 
      (b.frontmatter.sortnum || 0) - (a.frontmatter.sortnum || 0)
    );
  } catch (error) {
    console.error('Error loading work content:', error);
    return [];
  }
}
