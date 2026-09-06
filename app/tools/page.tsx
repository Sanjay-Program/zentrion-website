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
    'Use Zentrion networking tools for DNS lookups, IP checks, phone validation, GitHub analysis, and username discovery to speed up security research and diagnostics.',
  keywords: [
    'networking tools',
    'dns lookup tool',
    'ip lookup tool',
    'phone validator',
    'github profile analyzer',
    'username availability checker',
    'online networking utilities',
    'cybersecurity osint tools',
    'domain intelligence tools',
    'free network diagnostic tools',
  ],
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Zentrion Networking Tools',
    description:
      'Fast networking and OSINT-style utilities for DNS, IP, phone, GitHub, and username checks with practical results for security teams.',
    url: 'https://zentriontechnologies.com/tools',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zentrion Networking Tools',
    description:
      'DNS lookup, IP lookup, phone validation, GitHub analyzer, and username finder tools.',
    images: ['/og-image.png'],
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

const faqs = [
  {
    q: 'Are these networking tools free to use?',
    a: 'Yes. The DNS, IP, phone validation, GitHub analyzer, and username finder tools are free to use on the website.',
  },
  {
    q: 'Who should use these tools?',
    a: 'Security teams, developers, students, and IT administrators can use these tools for quick checks, troubleshooting, and basic reconnaissance.',
  },
  {
    q: 'Do I need to install software?',
    a: 'No installation is needed. All tools run directly in your browser through the Zentrion website.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
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
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

      <section className="container-x py-20 border-t border-line">
        <div className="max-w-3xl space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Why use Zentrion networking tools?
          </h2>
          <p className="text-mute leading-relaxed">
            These utilities are designed for real daily workflows: domain DNS troubleshooting, IP
            intelligence checks, phone-number format validation, GitHub profile analysis, and
            username reconnaissance. They help teams move faster when validating infrastructure,
            investigating suspicious activity, or preparing security assessments.
          </p>
          <p className="text-mute leading-relaxed">
            If you work in cybersecurity, cloud operations, DevOps, or digital investigations, this
            tools hub gives you one central place for quick and practical lookups.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Networking tools FAQ</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <GlassCard key={item.q} hover={false}>
                <h3 className="font-display text-xl font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{item.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
