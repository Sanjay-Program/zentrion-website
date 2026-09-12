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
  '/tools',
  '/tools/network/dns-lookup',
  '/tools/network/ip-lookup',
  '/tools/network/phone-validator',
  '/tools/network/github-analyzer',
  '/tools/network/username-finder',
  '/faq',
  '/careers',
  '/contact',
  '/book-consultation',
  '/request-demo',
  '/privacy',
  '/terms',
  // Guides & Tutorials
  '/guides',
  '/guides/check-if-website-hacked',
  '/guides/email-leak-check',
  '/guides/find-open-ports',
  '/guides/check-dns-records',
  '/guides/detect-phishing-email',
  '/guides/secure-wifi-home',
  '/guides/check-website-safe',
  '/guides/nmap-scanning-tutorial',
  '/guides/wireshark-packet-analysis',
  '/guides/kali-linux-pentesting-tutorial',
  '/guides/password-cracking-tutorial',
  '/guides/sql-injection-tutorial',
  '/guides/ctf-walkthrough-beginner',
  '/guides/home-lab-cybersecurity',
  '/guides/python-cybersecurity-scripts',
  '/guides/ransomware-incident-response',
  '/guides/home-soc-setup',
  '/guides/phone-intelligence-osint',
  // Resources
  '/resources/cybersecurity-commands',
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
