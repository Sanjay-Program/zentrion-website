'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/cybersecurity', label: 'Cybersecurity' },
  { href: '/ai', label: 'AI' },
  { href: '/cloud', label: 'Cloud' },
  { href: '/products', label: 'Products' },
  { href: '/training', label: 'Training & Internships' },
  { href: '/careers', label: 'Careers' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Only the Home hero has the always-dark WebGL shader behind it, so only
  // there does the transparent navbar need to be forced onto the dark
  // palette. Every other page's top section already matches the active
  // theme, so the navbar should too.
  const overDarkHero = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/85 backdrop-blur-md border-b border-line'
          : `bg-transparent ${overDarkHero ? 'force-dark' : ''}`
      }`}
    >
      <nav className="container-x flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white p-1 shadow-[0_0_16px_rgba(0,212,255,0.25)]">
            <Image src="/logo-mark.png" alt="" width={32} height={35} className="h-full w-auto object-contain" priority />
          </span>
          <span className="font-display font-semibold text-lg leading-none">
            ZENTR<span className="text-breach">ION</span>
            <span className="block text-mute font-body font-normal text-[11px] tracking-wide -mt-0.5">
              Technologies
            </span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-mute">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="btn-ghost text-sm !px-4 !py-2">
            Contact Sales
          </Link>
          <Link href="/book-consultation" className="btn-primary text-sm !px-4 !py-2">
            Book Consultation
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="text-ink"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-void border-t border-line">
          <ul className="container-x py-4 flex flex-col gap-4 text-sm text-mute">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 pt-2">
              <Link href="/contact" className="btn-ghost text-sm !px-4 !py-2">
                Contact Sales
              </Link>
              <Link href="/book-consultation" className="btn-primary text-sm !px-4 !py-2">
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
