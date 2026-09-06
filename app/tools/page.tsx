import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';

const tools = [
  {
    name: 'DNS Lookup',
    description: 'Look up DNS records for a domain.',
    href: '/tools/network/dns-lookup',
    icon: '🌐',
  },
  {
    name: 'IP Lookup',
    description: 'Get intelligence and location hints for an IP address.',
    href: '/tools/network/ip-lookup',
    icon: '📍',
  },
  {
    name: 'Phone Validator',
    description: 'Validate and inspect phone numbers in E.164 format.',
    href: '/tools/network/phone-validator',
    icon: '📱',
  },
  {
    name: 'GitHub Analyzer',
    description: 'Analyze GitHub profile stats and public repositories.',
    href: '/tools/network/github-analyzer',
    icon: '🐙',
  },
  {
    name: 'Username Finder',
    description: 'Check username availability across major platforms.',
    href: '/tools/network/username-finder',
    icon: '🔎',
  },
];

export const metadata: Metadata = {
  title: 'Tools | Networking Tools',
  description:
    'Use Zentrion networking tools for DNS lookups, IP checks, phone validation, GitHub analysis, and username discovery.',
  keywords: [
    'networking tools',
    'dns lookup tool',
    'ip lookup tool',
    'phone validator',
    'github profile analyzer',
    'username availability checker',
  ],
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Zentrion Networking Tools',
    description:
      'Fast networking and OSINT-style utilities for DNS, IP, phone, GitHub, and username checks.',
    url: 'https://zentriontechnologies.com/tools',
    type: 'website',
  },
};

const toolsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Networking Tools',
  description:
    'Useful tools for DNS, IP intelligence, phone validation, GitHub analysis, and username discovery.',
  url: 'https://zentriontechnologies.com/tools',
  hasPart: tools.map((tool) => ({
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'NetworkingApplication',
    url: `https://zentriontechnologies.com${tool.href}`,
    description: tool.description,
  })),
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <Breadcrumbs items={[{ href: '/tools', label: 'Tools' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Tools</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl">
            Networking Tools
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Useful tools for DNS, IP intelligence, phone validation, GitHub analysis, and username
            discovery.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Reveal key={tool.href} delay={i * 0.05}>
              <Link href={tool.href} className="group block h-full">
                <GlassCard className="h-full">
                  <div className="text-3xl">{tool.icon}</div>
                  <h2 className="mt-4 text-xl font-display font-semibold group-hover:underline">
                    {tool.name}
                  </h2>
                  <p className="mt-3 text-sm text-mute leading-relaxed">{tool.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan group-hover:gap-2.5 transition-all">
                    Open tool →
                  </span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
