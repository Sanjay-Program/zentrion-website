import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string; // The raw markdown content or parsed HTML
  readTime: string;
}

const researchDirectory = path.join(process.cwd(), 'content/research');

export function getSortedResearchData(): ResearchArticle[] {
  // Check if directory exists
  if (!fs.existsSync(researchDirectory)) {
    return [];
  }

  // Get file names under /content/research
  const fileNames = fs.readdirSync(researchDirectory);
  
  const allResearchData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(researchDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      // Calculate read time roughly (200 words per minute)
      const words = matterResult.content.trim().split(/\s+/).length;
      const readTime = Math.ceil(words / 200) + ' min read';

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || '2026-01-01',
        author: matterResult.data.author || 'Zentrion Security Team',
        excerpt: matterResult.data.excerpt || '',
        category: matterResult.data.category || 'General',
        tags: matterResult.data.tags || [],
        content: matterResult.content,
        readTime,
      };
    });

  // Sort articles by date
  return allResearchData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getResearchData(slug: string): Promise<ResearchArticle | null> {
  const fullPath = path.join(researchDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // Convert markdown into HTML string
  const htmlContent = await marked.parse(matterResult.content);
  
  const words = matterResult.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / 200) + ' min read';

  // Combine the data with the id and htmlContent
  return {
    slug,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || '2026-01-01',
    author: matterResult.data.author || 'Zentrion Security Team',
    excerpt: matterResult.data.excerpt || '',
    category: matterResult.data.category || 'General',
    tags: matterResult.data.tags || [],
    content: htmlContent, // This is now HTML
    readTime,
  };
}
