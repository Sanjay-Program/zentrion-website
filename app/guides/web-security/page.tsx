import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Web Security Master Hub',
  description: 'The ultimate knowledge hub for web security. Explore web fundamentals, authentication mechanisms, common vulnerabilities, tools, and interactive labs.',
};

const fundamentals = [
  { title: 'HTTP & HTTPS', href: '/guides/web-security/http' },
  { title: 'HTTP Methods & Headers', href: '/guides/web-security/http-headers' },
  { title: 'Cookies & Sessions', href: '/guides/web-security/cookies' },
  { title: 'CORS & CSP', href: '/guides/web-security/cors' },
];

const authentication = [
  { title: 'Password Security & MFA', href: '/guides/web-security/authentication' },
  { title: 'OAuth & OIDC', href: '/guides/web-security/oauth' },
  { title: 'JWT Security', href: '/guides/web-security/jwt' },
  { title: 'Account Recovery', href: '/guides/web-security/account-recovery' },
];

const vulnerabilities = [
  { title: 'XSS (Cross-Site Scripting)', href: '/guides/web-security/xss' },
  { title: 'SQL Injection (SQLi)', href: '/guides/web-security/sqli' },
  { title: 'CSRF & SSRF', href: '/guides/web-security/csrf-ssrf' },
  { title: 'IDOR / BOLA', href: '/guides/web-security/idor' },
  { title: 'Command Injection', href: '/guides/web-security/command-injection' },
  { title: 'Path Traversal', href: '/guides/web-security/path-traversal' },
];

export default function WebSecurityHub() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Guides', href: '/guides' },
        { label: 'Web Security', href: '/guides/web-security' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Knowledge Hub</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Web Security Master Hub
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Master the foundations of web application security. From core HTTP mechanics to advanced vulnerabilities and defensive architecture.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold mb-6">Web Fundamentals</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {fundamentals.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-cyan transition-colors">
                      <div className="font-medium group-hover:text-cyan transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-3xl font-semibold mb-6">Authentication & Identity</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {authentication.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-violet transition-colors">
                      <div className="font-medium group-hover:text-violet transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-3xl font-semibold mb-6">Vulnerabilities & Exploitation</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {vulnerabilities.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-signal transition-colors">
                      <div className="font-medium group-hover:text-signal transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar / Ecosystem Map */}
          <div className="lg:col-span-1 space-y-8">
            <Reveal delay={0.1}>
              <GlassCard className="p-6 border border-glass-border sticky top-24">
                <h3 className="font-display text-xl font-semibold mb-6">Explore the Ecosystem</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Practice</h4>
                    <ul className="space-y-2">
                      <li><Link href="/labs/sql-injection" className="text-sm text-mute hover:text-emerald-400">SQL Injection Lab</Link></li>
                      <li><Link href="/labs/xss" className="text-sm text-mute hover:text-emerald-400">XSS Lab</Link></li>
                      <li><Link href="/ctf" className="text-sm text-mute hover:text-emerald-400">Web CTF Challenges</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-violet mb-3">Use</h4>
                    <ul className="space-y-2">
                      <li><Link href="/tools/http-headers" className="text-sm text-mute hover:text-violet">HTTP Header Analyzer</Link></li>
                      <li><Link href="/tools/jwt-decoder" className="text-sm text-mute hover:text-violet">JWT Decoder</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-3">Reference</h4>
                    <ul className="space-y-2">
                      <li><Link href="/checklists/web-security" className="text-sm text-mute hover:text-yellow-500">Web Security Checklist</Link></li>
                      <li><Link href="/cheatsheets/http" className="text-sm text-mute hover:text-yellow-500">HTTP Status Codes</Link></li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-glass-border">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-signal mb-3">Need Help?</h4>
                    <Link href="/services/vapt" className="text-sm text-mute hover:text-signal">Web Application VAPT Service →</Link>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
