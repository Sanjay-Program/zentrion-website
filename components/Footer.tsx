'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS, MAPS_LINK } from '@/lib/contact';

const columns = [
  {
    title: 'Learn & Practice',
    links: [
      { href: '/guides', label: 'Guides & Tutorials' },
      { href: '/knowledge', label: 'Knowledge Base' },
      { href: '/labs', label: 'Interactive Labs' },
      { href: '/ctf', label: 'CTF Challenges' },
      { href: '/tools', label: 'Security Tools' },
    ],
  },
  {
    title: 'Career & Community',
    links: [
      { href: '/roadmaps', label: 'Learning Roadmaps' },
      { href: '/my-learning', label: 'My Learning Progress' },
      { href: '/assessments/website-security', label: 'Skills Assessments' },
      { href: '/career-paths', label: 'Career Paths' },
      { href: '/careers', label: 'Zentrion Careers' },
    ],
  },
  {
    title: 'Company & Services',
    links: [
      { href: '/services', label: 'Enterprise Services' },
      { href: '/cybersecurity', label: 'Cybersecurity Testing' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/research', label: 'Security Research' },
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/security', label: 'Responsible Disclosure' },
      { href: '/editorial-policy', label: 'Editorial Policy' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (
    (pathname?.startsWith('/labs/') && pathname !== '/labs' && pathname !== '/labs/') ||
    (pathname?.startsWith('/quizzes/') && pathname !== '/quizzes' && pathname !== '/quizzes/')
  ) {
    return null;
  }

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x pt-16 pb-32 grid grid-cols-2 md:grid-cols-6 gap-10">
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
            Intelligence That Protects. AI-powered
            cybersecurity, cloud, and automation for
            enterprises worldwide.
          </p>
          <div className="mt-5 flex items-center gap-5 text-mute">
            <a href="https://instagram.com/zentriontech" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://linkedin.com/company/zentriontechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
            <p>+91 82204 37738</p>
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
        <p>Chennai, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}
