import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cybersecurity Master Academy',
  description: 'Structured cybersecurity learning tracks from absolute beginner to security architecture. Choose your track and start learning.',
};

const beginnerTrack = [
  { title: 'What is Cybersecurity?', href: '/guides/what-is-cybersecurity' },
  { title: 'CIA Triad', href: '/guides/cia-triad' },
  { title: 'Threats & Vulnerabilities', href: '/guides/threats-and-vulnerabilities' },
  { title: 'Risk & Assets', href: '/guides/risk-and-assets' },
  { title: 'Authentication & Authorization', href: '/guides/authentication' },
  { title: 'Networking Basics', href: '/guides/networking-basics' },
  { title: 'Linux Basics', href: '/guides/linux-basics' },
];

const intermediateTrack = [
  { title: 'Web Security', href: '/guides/web-security' },
  { title: 'API Security', href: '/guides/api-security' },
  { title: 'Network Security', href: '/guides/network-security' },
  { title: 'Cloud Security', href: '/guides/cloud-security' },
  { title: 'SOC Fundamentals', href: '/guides/soc' },
  { title: 'Malware Analysis', href: '/guides/malware-analysis-tutorial' },
  { title: 'OSINT', href: '/guides/osint' },
];

const advancedTrack = [
  { title: 'Red Team Operations', href: '/guides/red-team' },
  { title: 'Blue Team Operations', href: '/guides/blue-team' },
  { title: 'Detection Engineering', href: '/guides/detection-engineering' },
  { title: 'Threat Hunting', href: '/guides/threat-hunting' },
  { title: 'Reverse Engineering', href: '/guides/reverse-engineering' },
  { title: 'AI Security', href: '/guides/ai-security' },
  { title: 'Cloud Detection', href: '/guides/cloud-detection' },
];

export default function CybersecurityAcademy() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Academy', href: '/academy' },
        { label: 'Cybersecurity Master Academy', href: '/academy/cybersecurity' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Training Tracks</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Cybersecurity Master Academy
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Follow our structured curriculum to build your cybersecurity expertise. Start from the absolute fundamentals or jump directly into advanced defensive engineering.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="space-y-24">
          
          <Reveal>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="sticky top-24">
                  <h2 className="font-display text-3xl font-semibold mb-3">Beginner Track</h2>
                  <p className="text-mute mb-6">Build a strong foundation. Understand how systems communicate, how they are secured, and how attackers view them.</p>
                </div>
              </div>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-4">
                {beginnerTrack.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-cyan transition-colors">
                      <div className="font-medium group-hover:text-cyan transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="sticky top-24">
                  <h2 className="font-display text-3xl font-semibold mb-3">Intermediate Track</h2>
                  <p className="text-mute mb-6">Dive into specific domains. Learn how to secure modern infrastructure and hunt for adversaries.</p>
                </div>
              </div>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-4">
                {intermediateTrack.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-violet transition-colors">
                      <div className="font-medium group-hover:text-violet transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="sticky top-24">
                  <h2 className="font-display text-3xl font-semibold mb-3">Advanced Track</h2>
                  <p className="text-mute mb-6">Master offensive and defensive engineering. Learn advanced methodologies for cloud and AI security.</p>
                </div>
              </div>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-4">
                {advancedTrack.map(item => (
                  <Link key={item.title} href={item.href} className="block group">
                    <div className="p-4 rounded-xl border border-glass-border bg-surface/30 hover:bg-surface/80 hover:border-signal transition-colors">
                      <div className="font-medium group-hover:text-signal transition-colors">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          
        </div>
      </section>
    </>
  );
}
