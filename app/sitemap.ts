import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { quizzesData } from '@/lib/quizzes-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zentriontechnologies.com';
  const appDir = path.join(process.cwd(), 'app');
  
  const routes: MetadataRoute.Sitemap = [];
  
  // Exclude some directories that are not public routes or have special handling
  const excludeDirs = ['api', 'quizzes/[id]', '(auth)'];

  function walkDir(currentPath: string) {
    if (!fs.existsSync(currentPath)) return;
    
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Skip hidden directories like .next, or directories starting with _
        if (!entry.name.startsWith('.') && !entry.name.startsWith('_')) {
          const nextPath = path.join(currentPath, entry.name);
          // Check if this path should be excluded
          const isExcluded = excludeDirs.some(ex => nextPath.replace(/\\/g, '/').includes(ex));
          if (!isExcluded) {
            walkDir(nextPath);
          }
        }
      } else if (entry.name === 'page.tsx') {
        let route = currentPath.replace(appDir, '').replace(/\\/g, '/');
        // Handle route groups like (main)
        route = route.replace(/\/\([^)]+\)/g, '');
        
        // Remove trailing slash if exists
        if (route.endsWith('/')) {
          route = route.slice(0, -1);
        }
        
        routes.push({
          url: `${base}${route}`,
          lastModified: new Date(),
          changeFrequency: route === '' ? 'weekly' : 'monthly',
          priority: route === '' ? 1.0 : 0.7,
        });
      }
    }
  }

  walkDir(appDir);

  // Add dynamic quizzes
  for (const quiz of quizzesData) {
    routes.push({
      url: `${base}/quizzes/${quiz.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Sort routes alphabetically for better readability in sitemap.xml
  routes.sort((a, b) => a.url.localeCompare(b.url));

  return routes;
}
