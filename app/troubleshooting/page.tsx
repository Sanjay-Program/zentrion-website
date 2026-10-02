import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Troubleshooting Center',
  description: 'Solutions for common cybersecurity, networking, and developer errors. Fast, accurate fixes for Nmap, Wireshark, Burp Suite, Docker, and API errors.',
};

const networkIssues = [
  { title: 'Nmap not detecting ports', href: '/troubleshooting/nmap-not-detecting-ports' },
  { title: 'Wireshark not capturing traffic', href: '/troubleshooting/wireshark-no-traffic' },
  { title: 'DNS not resolving', href: '/troubleshooting/dns-not-resolving' },
  { title: 'SSH connection refused', href: '/troubleshooting/ssh-connection-refused' },
];

const webIssues = [
  { title: 'Burp Suite proxy not working', href: '/troubleshooting/burp-proxy-not-working' },
  { title: 'SSL/TLS certificate error', href: '/troubleshooting/ssl-certificate-error' },
  { title: 'CORS policy blocked by browser', href: '/troubleshooting/cors-error' },
  { title: 'JWT authentication failure', href: '/troubleshooting/jwt-auth-failure' },
];

const devOpsIssues = [
  { title: 'Docker container ports not accessible', href: '/troubleshooting/docker-ports-not-accessible' },
  { title: 'Kubernetes pod cannot connect', href: '/troubleshooting/kubernetes-pod-connection' },
  { title: 'Git authentication fails', href: '/troubleshooting/git-auth-fails' },
  { title: 'Database connection refused', href: '/troubleshooting/database-connection-refused' },
];

export default function TroubleshootingCenter() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Troubleshooting', href: '/troubleshooting' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Developer & Security Fixes</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Troubleshooting Center
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Find immediate, accurate solutions for common technical errors. Stop guessing and understand exactly why your tools or code are failing.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="grid md:grid-cols-3 gap-8">
          
          <Reveal>
            <GlassCard className="p-8 h-full border border-glass-border">
              <h2 className="font-display text-2xl font-semibold mb-6">Networking & Infrastructure</h2>
              <ul className="space-y-4">
                {networkIssues.map(item => (
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
              <h2 className="font-display text-2xl font-semibold mb-6">Web & Application Security</h2>
              <ul className="space-y-4">
                {webIssues.map(item => (
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
              <h2 className="font-display text-2xl font-semibold mb-6">DevOps & Cloud</h2>
              <ul className="space-y-4">
                {devOpsIssues.map(item => (
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
