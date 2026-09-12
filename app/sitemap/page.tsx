import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Navigate Zentrion Technologies. Find our cybersecurity services, free tools, guides, and corporate information.',
};

const SITEMAP_SECTIONS = [
  {
    title: 'Services',
    links: [
      { href: '/cybersecurity', label: 'Cybersecurity Services' },
      { href: '/ai', label: 'AI & Automation' },
      { href: '/cloud', label: 'Cloud Consulting' },
      { href: '/services', label: 'All Services & Software Development' },
    ],
  },
  {
    title: 'Free Tools & Resources',
    links: [
      { href: '/tools', label: 'Free Security Tools Dashboard (30+ Tools)' },
      { href: '/guides', label: 'Security Guides & Tutorials' },
      { href: '/resources/cybersecurity-commands', label: 'Cybersecurity Commands Cheat Sheet' },
      { href: '/resources', label: 'Deep Research & Insights' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/industries', label: 'Industries We Serve' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/careers', label: 'Careers & Internships' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/book-consultation', label: 'Book a Consultation' },
      { href: '/faq', label: 'Frequently Asked Questions (FAQ)' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/sitemap', label: 'Sitemap' }]} />
      <section className="container-x pt-10 pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Directory</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">HTML Sitemap</h1>
          <p className="mt-6 text-mute leading-relaxed">
            Find your way around Zentrion Technologies. Explore our comprehensive suite of cybersecurity solutions, 
            free intelligence tools, and corporate resources.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {SITEMAP_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-semibold text-ink border-b border-line pb-3 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-mute hover:text-accent transition-colors flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent opacity-50" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
