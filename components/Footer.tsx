import Link from 'next/link';
import Image from 'next/image';
import { CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS, MAPS_LINK } from '@/lib/contact';

const columns = [
  {
    title: 'Services',
    links: [
      { href: '/cybersecurity', label: 'Cybersecurity' },
      { href: '/ai', label: 'AI Automation' },
      { href: '/cloud', label: 'Cloud Consulting' },
      { href: '/services', label: 'Software Development' },
      { href: '/tools', label: 'Free Security Tools (30+)' },
    ],
  },
  {
    title: 'Learn (Free)',
    links: [
      { href: '/guides', label: 'Security Guides & Tutorials' },
      { href: '/resources/cybersecurity-commands', label: 'Commands Cheat Sheet' },
      { href: '/careers', label: 'Careers' },
      { href: '/sitemap.xml', label: 'Sitemap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/industries', label: 'Industries' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/resources', label: 'Resources' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
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

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white p-1">
              <Image src="/logo-mark.png" alt="" width={32} height={35} className="h-full w-auto object-contain" />
            </span>
            <p className="font-display font-semibold text-lg">
              ZENTR<span className="text-breach">ION</span> Technologies
            </p>
          </div>
          <p className="mt-3 text-sm text-mute max-w-xs">
            Intelligence That Protects. AI-powered cybersecurity, cloud, and automation for
            enterprises, schools, and colleges.
          </p>
          <div className="mt-5 flex gap-4 text-sm text-mute">
            <a href="https://instagram.com/zentriontech" target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/zentriontechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-4 text-sm text-mute space-y-1">
            <p>
              <a href={`mailto:${CONSULT_EMAIL}`} className="hover:text-cyan">
                {CONSULT_EMAIL}
              </a>{' '}
              <span className="text-xs">(services & consultation)</span>
            </p>
            <p>
              <a href={`mailto:${HR_EMAIL}`} className="hover:text-cyan">
                {HR_EMAIL}
              </a>{' '}
              <span className="text-xs">(careers & internships)</span>
            </p>
            <p>+91 73057 71789</p>
            <p>+91 82204 37738</p>
            <p className="pt-2 max-w-xs">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan"
              >
                {COMPANY_ADDRESS}
              </a>
            </p>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-mute">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x py-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-xs text-mute">
        <p>&copy; {new Date().getFullYear()} Zentrion Technologies. All rights reserved.</p>
        <p>Minjur, Chennai, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}
