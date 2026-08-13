import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/about',
  '/services',
  '/cybersecurity',
  '/ai',
  '/cloud',
  '/products',
  '/industries',
  '/case-studies',
  '/training',
  '/resources',
  '/faq',
  '/careers',
  '/contact',
  '/book-consultation',
  '/request-demo',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zentriontechnologies.com';
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
