import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type ContentType = 
  | 'guides' 
  | 'cheatsheets' 
  | 'knowledge' 
  | 'labs' 
  | 'ctf' 
  | 'tools' 
  | 'courses' 
  | 'roadmaps'
  | 'projects';

export interface BaseMetadata {
  title: string;
  slug: string;
  description: string;
  category: string; // The subfolder or main category
  subcategory?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  author?: string;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  // Relationships for the Knowledge Graph
  relatedGuides?: string[];
  relatedTools?: string[];
  relatedLabs?: string[];
  relatedKnowledge?: string[];
  relatedChallenges?: string[];
  relatedRoadmaps?: string[];
  // Interactive action block at the end of the guide (Knowledge Graph)
  actionComponent?: {
    type: 'lab' | 'tool' | 'ctf' | 'quiz' | 'external';
    targetId: string;
    label: string;
  };
}

export interface GuideMetadata extends BaseMetadata {
  readingTime: string;
}

export interface LabMetadata extends BaseMetadata {
  estimatedTime: string;
  isBrowserNative?: boolean;
}

export interface CTFMetadata extends BaseMetadata {
  points: number;
  flagFormat?: string;
}

export interface ParsedContent<T extends BaseMetadata = BaseMetadata> {
  metadata: T;
  content: string;
}

/**
 * Generic parser for any content type. 
 * Supports flat directories (e.g. content/knowledge/slug.md) 
 * and nested categories (e.g. content/guides/networking/slug.md)
 */
export function getContentBySlug<T extends BaseMetadata>(
  type: ContentType,
  slug: string,
  category?: string
): ParsedContent<T> | null {
  try {
    const fullPath = category 
      ? path.join(CONTENT_DIR, type, category, `${slug}.md`)
      : path.join(CONTENT_DIR, type, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      metadata: {
        ...data,
        slug,
        category: category || data.category || type,
      } as T,
      content,
    };
  } catch (error) {
    console.error(`Error parsing ${type} ${category ? category + '/' : ''}${slug}:`, error);
    return null;
  }
}

/**
 * Gets all content for a specific type. 
 * Can handle both flat and nested directories.
 */
export function getAllContent<T extends BaseMetadata>(type: ContentType): ParsedContent<T>[] {
  const typeDir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(typeDir)) return [];
  
  const results: ParsedContent<T>[] = [];
  const entries = fs.readdirSync(typeDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // It's a category folder (like in guides/)
      const category = entry.name;
      const categoryPath = path.join(typeDir, category);
      const files = fs.readdirSync(categoryPath);
      
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const slug = file.replace(/\.md$/, '');
        const parsed = getContentBySlug<T>(type, slug, category);
        if (parsed) results.push(parsed);
      }
    } else if (entry.name.endsWith('.md')) {
      // It's a flat file (like in cheatsheets/)
      const slug = entry.name.replace(/\.md$/, '');
      const parsed = getContentBySlug<T>(type, slug);
      if (parsed) results.push(parsed);
    }
  }
  
  // Sort by newest first
  return results.sort((a, b) => 
    new Date(b.metadata.publishedDate || 0).getTime() - new Date(a.metadata.publishedDate || 0).getTime()
  );
}

// Backward compatibility wrappers for existing code
export function getGuideBySlug(category: string, slug: string) {
  return getContentBySlug<GuideMetadata>('guides', slug, category);
}

export function getAllGuides() {
  return getAllContent<GuideMetadata>('guides');
}

export function getCheatsheetBySlug(slug: string) {
  return getContentBySlug<BaseMetadata>('cheatsheets', slug);
}

export function getAllCheatsheets() {
  return getAllContent<BaseMetadata>('cheatsheets');
}

