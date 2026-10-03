import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';
import SecurityMeshIllustration from '@/components/SecurityMeshIllustration';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Resources | Cybersecurity Deep Research',
  description:
    'Zentrion Technologies\u2019 cybersecurity research hub — deep-dive analysis on vulnerability management, AI security, identity, cloud security and the future of continuous cyber defense.',
  keywords: [
    'cybersecurity research 2026',
    'AI cybersecurity trends',
    'vulnerability management best practices',
    'identity security zero trust',
    'cloud security posture management',
    'OWASP Top 10 2025',
    'NIST Cybersecurity Framework 2.0',
    'DPDP Act compliance research',
  ],
  alternates: { canonical: '/resources' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cybersecurity in 2026: Why Vulnerability Management, AI Security and Identity Are Becoming One Problem',
  description:
    'A deep-research analysis on how the expanding attack surface, generative-AI-driven threats, and identity-centric architectures are converging into a single, continuous cybersecurity discipline.',
  author: { '@type': 'Organization', name: 'Zentrion Technologies' },
  publisher: { '@type': 'Organization', name: 'Zentrion Technologies' },
  datePublished: '2026-08-01',
  dateModified: '2026-08-13',
  mainEntityOfPage: 'https://zentriontechnologies.com/resources',
};

const sections = [
  {
    id: 'attack-surface',
    title: '1. The attack surface is expanding faster than most security programs',
    body: [
      'Security teams used to answer a narrow set of questions: is the firewall configured correctly, are passwords strong, is antivirus running, are critical systems patched. Those questions still matter — but modern organizations now run across cloud infrastructure, APIs, SaaS platforms, remote endpoints, third-party services, AI systems and increasingly autonomous software agents.',
      'A typical organization today may have cloud workloads, web and mobile applications, APIs, employee devices, customer portals, SaaS tools, third-party integrations, databases, identity providers, AI models, AI agents, and a growing number of machine identities and service accounts. Every one of these can introduce a new identity, permission, configuration, dependency or connection that has to be secured.',
      'The real challenge is rarely "we need more tools." It is knowing what exists, how everything connects, what is exposed, and which weaknesses actually matter — which is why asset discovery and attack-surface visibility have become foundational to any modern security program. An organization cannot protect what it cannot see.',
    ],
  },
  {
    id: 'vuln-management',
    title: '2. Vulnerability management is a prioritization problem, not a counting problem',
    body: [
      'Not every vulnerability carries the same risk. An organization can carry hundreds or thousands of open findings, but a vulnerability becomes materially more dangerous when it is exposed to the internet, practically exploitable, reachable from an attacker\u2019s position, tied to valuable data, and actively being targeted in the wild.',
      'Public research from Verizon\u2019s annual Data Breach Investigations Report has repeatedly identified vulnerability exploitation as one of the leading initial-access vectors in confirmed breaches, and highlights how generative AI is accelerating attacker tooling and speed. Meanwhile, agencies such as CISA maintain a continuously updated catalog of vulnerabilities with confirmed real-world exploitation, and recommend organizations weight remediation toward that evidence rather than CVSS scores alone.',
      'A mature vulnerability-management process should connect asset discovery, vulnerability detection, exposure analysis, threat intelligence, risk prioritization, remediation and verification into a single loop — so the operative question shifts from "how many vulnerabilities do we have" to "which vulnerabilities could realistically become tomorrow\u2019s incident."',
    ],
  },
  {
    id: 'appsec',
    title: '3. Application security is moving earlier in the lifecycle',
    body: [
      'Modern applications depend heavily on APIs, authentication systems, third-party packages and cloud infrastructure — any one of which can become an entry point. The current OWASP Top 10 categories span broken access control, security misconfiguration, software-supply-chain failures, cryptographic failures, injection, insecure design, authentication failures, integrity failures, logging/alerting gaps, and mishandling of exceptional conditions.',
      'That list makes one thing clear: application security is no longer just about catching SQL injection or cross-site scripting at the end of a build. It depends on architecture, identity, dependency management, supply-chain hygiene, cryptography, logging and secure design choices made throughout development — which is why security increasingly has to be built into the software development lifecycle rather than bolted on immediately before release.',
    ],
  },
  {
    id: 'ai-security',
    title: '4. AI changes both sides of the equation',
    body: [
      'AI creates a genuine paradox for defenders. On one hand, AI can help security teams analyze events, summarize alerts, correlate logs, prioritize vulnerabilities, automate repetitive workflows and accelerate investigations. On the other hand, attackers are using the same category of tools to increase the speed, scale and personalization of their campaigns — a trend independently observed in recent breach-investigation research.',
      'This creates a new requirement: AI systems themselves need security controls. Organizations should be able to answer who can access a given AI system, what data it can reach, which tools or actions it can trigger, whether its outputs can cause real-world changes, whether its instructions can be manipulated (prompt injection and similar attacks), and whether its activity is logged and auditable. Agencies including CISA have pushed secure-by-design principles for AI development specifically because these questions are easiest to answer when security is designed in from the start, not retrofitted later.',
    ],
  },
  {
    id: 'identity',
    title: '5. Identity is becoming the real security boundary',
    body: [
      'Traditional security architecture leaned heavily on network perimeters. Modern environments instead contain a mix of human identities, application identities, machine identities, service accounts, API keys, cloud roles and AI agents — and a single compromised identity can sometimes bypass network-level defenses entirely.',
      'A resilient architecture continuously evaluates who is requesting access, from what device or workload, to which resource, with what permissions, and whether the behavior looks normal for that identity — the core idea behind zero-trust thinking: access is evaluated on identity, context and risk rather than assumed safe because a request came from inside a trusted network.',
    ],
  },
  {
    id: 'cloud',
    title: '6. Cloud security is an identity and configuration problem as much as a technical one',
    body: [
      'Cloud platforms make it easy to scale infrastructure — and just as easy to scale mistakes. Common failure patterns include excessive permissions, publicly exposed storage, weak identity policies, exposed credentials, insecure network configuration, unmonitored workloads, unpatched services, overprivileged service accounts and unmanaged development environments.',
      'Effective cloud security therefore requires continuous visibility across identity, configuration, workload, network, data and logging together — knowing what resources exist, who can reach them, what is exposed externally, which identities carry privileged access, what changes over time, and whether controls are actually working, rather than a one-time audit.',
    ],
  },
  {
    id: 'correlation',
    title: '7. Detection alone is not security — correlation and context are what change outcomes',
    body: [
      'Many organizations already run a stack of point solutions — EDR, SIEM, vulnerability scanners, firewalls, cloud security tools, IAM and email security — yet still struggle to answer a simple question: what is actually happening across the environment right now. The gap is usually fragmentation: one tool sees the endpoint, another the network, another cloud activity, another identity.',
      'Compare two outputs. A scanner reporting "critical vulnerability detected" is useful but incomplete. A platform that instead reports "this vulnerability sits on an internet-facing asset that handles sensitive data, exploitation has been observed in the wild, the service is externally reachable, and the associated identity has elevated privileges" gives a security team something they can act on immediately. The direction of the industry is detection, then context, then correlation, then prioritization, then action — the goal is fewer, better decisions, not more alerts.',
    ],
  },
  {
    id: 'continuous-cycle',
    title: '8. Security works best as a continuous cycle, not a one-time audit',
    body: [
      'Frameworks such as NIST\u2019s Cybersecurity Framework 2.0 give organizations a flexible structure for understanding, assessing, prioritizing and communicating cyber risk. In practice, that structure plays out as a repeating cycle: discover assets, identities and data; assess vulnerabilities and misconfigurations; prioritize by combining technical severity with exposure and business impact; remediate; detect abnormal activity; respond to and contain incidents; verify that fixes actually hold; and use the lessons learned to improve the next cycle.',
    ],
  },
  {
    id: 'checklist',
    title: '9. A practical starting checklist',
    body: [],
    checklist: [
      'Know your attack surface — maintain an accurate inventory of internet-facing assets, applications, APIs, endpoints and cloud resources.',
      'Prioritize exploitable vulnerabilities — weight remediation by exposure and active-exploitation intelligence, not severity score alone.',
      'Strengthen identity — apply least privilege, strong authentication, and monitoring for privileged activity.',
      'Secure your APIs — review authentication, authorization, rate limiting, input validation and data exposure.',
      'Build security into software — integrate it into architecture, development, testing and deployment, not just pre-release scanning.',
      'Govern AI adoption — know which AI systems your teams and applications use, what data they touch, and what actions they can take.',
      'Centralize meaningful signals — correlate identity, endpoint, application, cloud and network data wherever possible.',
      'Test your defenses — validate controls through authorized assessments and continuous improvement, not assumption.',
      'Prepare for failure — maintain tested backups, incident-response plans and communication procedures.',
      'Measure improvement — track outcomes, not just the number of tools deployed.',
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs items={[{ href: '/resources', label: 'Resources' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Resources Hub</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Knowledge is the strongest defense.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Access our free interactive labs, open-source security tools, training guides, and deep-dive research to strengthen your cybersecurity posture.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal delay={0.1}>
            <Link href="/labs" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Zentrion Cyber Range</h3>
                <p className="text-mute text-sm flex-1 mb-4">Hands-on, browser-native CTF platform. Practice SQLi, XSS, Forensics, and network analysis safely.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Start Hacking <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.2}>
            <Link href="/tools" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Security Tools Library</h3>
                <p className="text-mute text-sm flex-1 mb-4">30+ free tools for IP analysis, subnet calculation, hashing, DNS lookup, and password strength testing.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore Tools <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.3}>
            <Link href="/guides" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Guides & Tutorials</h3>
                <p className="text-mute text-sm flex-1 mb-4">Comprehensive guides on Nmap, Wireshark, AI Security, and Web Vulnerability mitigation.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Read Guides <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </GlassCard>
            </Link>
          </Reveal>
          
          <Reveal delay={0.4}>
            <Link href="/quizzes" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Knowledge Quizzes</h3>
                <p className="text-mute text-sm flex-1 mb-4">Test your knowledge on phishing, password security, OWASP Top 10, and cloud misconfigurations.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Take a Quiz <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.5}>
            <Link href="/resources/cybersecurity-commands" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-line">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Commands Cheat Sheet</h3>
                <p className="text-mute text-sm flex-1 mb-4">Quick reference for essential Nmap, Netcat, Hashcat, and Linux privilege escalation commands.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">View Cheat Sheet <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <Reveal>
            <Eyebrow>Deep Research</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold max-w-2xl leading-tight">
              Explore our library of independent research publications.
            </h2>
            <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
              Our security team publishes deep-dive analysis on vulnerability management, AI security, identity, cloud security, and the future of continuous cyber defense.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="shrink-0 pt-4 md:pt-14">
            <Link href="/resources/research" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Browse All Research
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want a risk picture like this for your organization?"
        description="We run vulnerability, identity, cloud and AI-security assessments mapped to exactly this framework."
        primary={{ href: '/book-consultation', label: 'Book a Consultation' }}
        secondary={{ href: '/cybersecurity', label: 'Explore Cybersecurity Services' }}
      />
    </>
  );
}
