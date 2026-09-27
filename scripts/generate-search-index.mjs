import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'search-index.json');

const searchIndex = [];

function parseFile(filePath, type, urlPrefix) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Very basic extraction for Phase 1 - looking for <title> or h1
    let title = '';
    let description = '';

    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    if (titleMatch) title = titleMatch[1];
    
    if (!title) {
      const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (h1Match) title = h1Match[1].trim();
    }

    const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
    if (descMatch) description = descMatch[1];

    if (!title) return; // Skip if no title found

    const dirName = path.dirname(filePath).split(path.sep).pop();
    const url = `${urlPrefix}/${dirName}`;

    searchIndex.push({
      title,
      description,
      url,
      type,
    });
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
  }
}

function scanDirectory(dirPath, type, urlPrefix) {
  if (!fs.existsSync(dirPath)) return;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDirPath = path.join(dirPath, entry.name);
      const pagePath = path.join(subDirPath, 'page.tsx');
      
      if (fs.existsSync(pagePath)) {
        parseFile(pagePath, type, urlPrefix);
      }
    }
  }
}

console.log('Generating search index...');

// Scan hardcoded Guides
scanDirectory(path.join(APP_DIR, 'guides'), 'Guide', '/guides');

// Scan dynamic markdown Guides
const CONTENT_DIR = path.join(process.cwd(), 'content');
const GUIDES_DIR = path.join(CONTENT_DIR, 'guides');
if (fs.existsSync(GUIDES_DIR)) {
  const categories = fs.readdirSync(GUIDES_DIR, { withFileTypes: true });
  for (const category of categories) {
    if (category.isDirectory()) {
      const categoryPath = path.join(GUIDES_DIR, category.name);
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(categoryPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          let title = '';
          let description = '';
          
          const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
          if (titleMatch) title = titleMatch[1];
          
          const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
          if (descMatch) description = descMatch[1];
          
          if (title) {
            searchIndex.push({
              title,
              description,
              url: `/guides/${category.name}/${file.replace('.md', '')}`,
              type: 'Guide',
            });
          }
        }
      }
    }
  }
}

// Scan Tools
scanDirectory(path.join(APP_DIR, 'tools'), 'Tool', '/tools');

// Scan Cheatsheets
const CHEATSHEETS_DIR = path.join(CONTENT_DIR, 'cheatsheets');
if (fs.existsSync(CHEATSHEETS_DIR)) {
  const files = fs.readdirSync(CHEATSHEETS_DIR);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(CHEATSHEETS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      let title = '';
      let description = '';
      const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
      if (titleMatch) title = titleMatch[1];
      const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
      if (descMatch) description = descMatch[1];
      if (title) {
        searchIndex.push({
          title,
          description,
          url: `/cheatsheets/${file.replace('.md', '')}`,
          type: 'Cheatsheet',
        });
      }
    }
  }
}

// Add Encyclopedia
searchIndex.push({
  title: 'Cybersecurity Encyclopedia',
  description: 'A comprehensive dictionary of cybersecurity terms, concepts, and frameworks.',
  url: '/encyclopedia',
  type: 'Reference',
});

// Additional static pages can be added here

// Ensure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));
console.log(`Search index generated with ${searchIndex.length} entries at ${OUTPUT_FILE}`);
