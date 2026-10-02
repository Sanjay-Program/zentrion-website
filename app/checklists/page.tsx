import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Security Checklists Library',
  description: 'Downloadable and interactive security checklists for web applications, APIs, cloud infrastructure, and incident response.',
};

const appsecChecklists = [
  { title: 'Web Application Security Checklist', href: '/checklists/web-security' },
  { title: 'API Security Checklist', href: '/checklists/api-security' },
  { title: 'Mobile App Security Checklist', href: '/checklists/mobile-security' },
  { title: 'SaaS Security Checklist', href: '/checklists/saas-security' },
];

const infraChecklists = [
  { title: 'AWS Security Checklist', href: '/checklists/aws-security' },
  { title: 'Azure Security Checklist', href: '/checklists/azure-security' },
  { title: 'Kubernetes Security Checklist', href: '/checklists/kubernetes-security' },
  { title: 'Docker Security Checklist', href: '/checklists/docker-security' },
];

const processChecklists = [
  { title: 'Incident Response Checklist', href: '/checklists/incident-response' },
  { title: 'Secure SDLC Checklist', href: '/checklists/secure-sdlc' },
  { title: 'Pre-Launch Security Checklist', href: '/checklists/pre-launch' },
  { title: 'VAPT Readiness Checklist', href: '/checklists/vapt-readiness' },
];

export default function ChecklistsLibrary() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Checklists', href: '/checklists' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Actionable Guides</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Security Checklists Library
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Operationalize your security. Use these comprehensive checklists to audit your infrastructure, secure your code, and prepare for incident response.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="grid md:grid-cols-3 gap-8">
          
          <Reveal>
            <GlassCard className="p-8 h-full border border-glass-border">
              <h2 className="font-display text-2xl font-semibold mb-6 text-cyan">Application Security</h2>
              <ul className="space-y-4">
                {appsecChecklists.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-mute hover:text-cyan transition-colors flex items-start gap-2 group">
                      <span className="text-cyan opacity-50 group-hover:opacity-100 mt-0.5">→</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-8 h-full border border-glass-border">
              <h2 className="font-display text-2xl font-semibold mb-6 text-violet">Cloud & Infrastructure</h2>
              <ul className="space-y-4">
                {infraChecklists.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-mute hover:text-violet transition-colors flex items-start gap-2 group">
                      <span className="text-violet opacity-50 group-hover:opacity-100 mt-0.5">→</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="p-8 h-full border border-glass-border">
              <h2 className="font-display text-2xl font-semibold mb-6 text-signal">Process & Operations</h2>
              <ul className="space-y-4">
                {processChecklists.map(item => (
                  <li key={item.title}>
                    <Link href={item.href} className="text-mute hover:text-signal transition-colors flex items-start gap-2 group">
                      <span className="text-signal opacity-50 group-hover:opacity-100 mt-0.5">→</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

        </div>
      </section>
    </>
  );
}
