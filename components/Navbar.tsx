'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

type NavLink = { href: string; label: string; blurb?: string };
type NavItem = { label: string; href?: string; items?: NavLink[] };

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    items: [
      { href: '/services', label: 'All Services', blurb: 'Full overview of what we offer' },
      { href: '/cybersecurity', label: 'Cybersecurity', blurb: 'VAPT, audits, monitoring' },
      { href: '/ai', label: 'AI & Automation', blurb: 'LLMs, agents, workflow automation' },
      { href: '/cloud', label: 'Technology Consulting', blurb: 'Cloud & infrastructure' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Free Guides', href: '/guides' },
  {
    label: 'Resources',
    items: [
      { href: '/resources', label: 'Deep Research', blurb: 'Cybersecurity research & insights' },
      { href: '/tools', label: 'Networking Tools', blurb: 'DNS, IP, phone, GitHub, username checks' },
      { href: '/guides', label: 'Security Guides', blurb: '17 free tutorials with real commands' },
      { href: '/resources/cybersecurity-commands', label: 'Commands Cheat Sheet', blurb: '100+ Nmap, dig, openssl commands' },
      { href: '/case-studies', label: 'Case Studies', blurb: 'How we work with clients' },
      { href: '/faq', label: 'FAQ', blurb: 'Common questions answered' },
    ],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className="flex items-center gap-1 hover:text-ink transition-colors py-2"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50">
          <div className="glass-card rounded-xl p-2 shadow-xl">
            {item.items!.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="block text-sm font-medium text-ink">{l.label}</span>
                {l.blurb && <span className="block text-xs text-mute mt-0.5">{l.blurb}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
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
      <nav className="container-x flex items-center justify-between h-[72px] gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white p-1 shadow-[0_0_16px_rgba(0,212,255,0.25)] shrink-0">
            <Image src="/logo-mark.png" alt="" width={32} height={35} className="h-full w-auto object-contain" priority />
          </span>
          <span className="font-display font-semibold text-lg leading-none whitespace-nowrap">
            ZENTR<span className="text-breach">ION</span>
            <span className="block text-mute font-body font-normal text-[11px] tracking-wide -mt-0.5">
              Technologies
            </span>
          </span>
        </Link>

        <ul className="hidden xl:flex items-center gap-5 text-sm text-mute shrink-0">
          {navItems.map((item) =>
            item.items ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <li key={item.href}>
                <Link href={item.href!} className="hover:text-ink transition-colors py-2 block">
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link href="/book-consultation" className="btn-primary text-sm !px-4 !py-2 whitespace-nowrap">
            Book Consultation
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
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
        <div className="xl:hidden bg-void border-t border-line max-h-[calc(100vh-72px)] overflow-y-auto">
          <ul className="container-x py-4 flex flex-col gap-1 text-sm text-mute">
            {navItems.map((item) =>
              item.items ? (
                <li key={item.label} className="border-b border-line/60 last:border-0">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3 text-left"
                    onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                    aria-expanded={openGroup === item.label}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${openGroup === item.label ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openGroup === item.label && (
                    <ul className="pb-3 pl-3 flex flex-col gap-1">
                      {item.items.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={() => setOpen(false)} className="block py-2 hover:text-ink">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className="border-b border-line/60 last:border-0">
                  <Link href={item.href!} onClick={() => setOpen(false)} className="block py-3 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li className="pt-4">
              <Link href="/book-consultation" onClick={() => setOpen(false)} className="btn-primary text-sm !px-4 !py-2.5 w-full text-center block">
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
