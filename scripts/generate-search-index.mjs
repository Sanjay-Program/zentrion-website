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

// Scan Guides
scanDirectory(path.join(APP_DIR, 'guides'), 'Guide', '/guides');

// Scan Tools
scanDirectory(path.join(APP_DIR, 'tools'), 'Tool', '/tools');

// Additional static pages can be added here

// Ensure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));
console.log(`Search index generated with ${searchIndex.length} entries at ${OUTPUT_FILE}`);
