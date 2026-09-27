import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface GuideMetadata {
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  readingTime: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  relatedGuides?: string[];
  relatedTools?: string[];
  relatedLabs?: string[];
}

export interface ParsedGuide {
  metadata: GuideMetadata;
  content: string;
}

export function getGuideBySlug(category: string, slug: string): ParsedGuide | null {
  try {
    const fullPath = path.join(CONTENT_DIR, 'guides', category, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      metadata: {
        ...data,
        slug,
        category,
      } as GuideMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error parsing guide ${category}/${slug}:`, error);
    return null;
  }
}

export function getAllGuides(): ParsedGuide[] {
  const guidesDir = path.join(CONTENT_DIR, 'guides');
  if (!fs.existsSync(guidesDir)) return [];
  
  const guides: ParsedGuide[] = [];
  const categories = fs.readdirSync(guidesDir);
  
  for (const category of categories) {
    const categoryPath = path.join(guidesDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const slug = file.replace(/\.md$/, '');
      const guide = getGuideBySlug(category, slug);
      if (guide) {
        guides.push(guide);
      }
    }
  }
  
  // Sort by newest first
  return guides.sort((a, b) => 
    new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime()
  );
}

export function getCheatsheetBySlug(slug: string): ParsedGuide | null {
  try {
    const fullPath = path.join(CONTENT_DIR, 'cheatsheets', `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      metadata: {
        ...data,
        slug,
        category: 'cheatsheet',
      } as GuideMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error parsing cheatsheet ${slug}:`, error);
    return null;
  }
}

export function getAllCheatsheets(): ParsedGuide[] {
  const cheatsheetsDir = path.join(CONTENT_DIR, 'cheatsheets');
  if (!fs.existsSync(cheatsheetsDir)) return [];
  
  const cheatsheets: ParsedGuide[] = [];
  const files = fs.readdirSync(cheatsheetsDir);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const slug = file.replace(/\.md$/, '');
    const sheet = getCheatsheetBySlug(slug);
    if (sheet) {
      cheatsheets.push(sheet);
    }
  }
  
  return cheatsheets.sort((a, b) => 
    new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime()
  );
}
