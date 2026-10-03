import type { Metadata } from 'next';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Responsible Disclosure Policy',
  description: 'Zentrion Technologies responsible disclosure and security research policy.',
};

export default function SecurityPolicy() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Security', href: '/security' }]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Security</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Responsible Disclosure Policy
          </h1>
          <p className="mt-6 text-mute max-w-3xl leading-relaxed">
            At Zentrion Technologies, we take the security of our systems seriously and value the security research community. If you believe you have discovered a vulnerability in our website or systems, we encourage you to disclose it to us responsibly.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="prose dark:prose-invert max-w-4xl prose-headings:text-[rgb(var(--c-ink))] text-[rgb(var(--c-ink))]">
          <h2>Authorization & Safe Harbor</h2>
          <p>
            If you make a good faith effort to comply with this policy during your security research, we will consider your research to be authorized, we will work with you to understand and resolve the issue quickly, and Zentrion will not initiate or recommend legal action related to your research.
          </p>

          <h2>Rules of Engagement</h2>
          <p>Under this policy, "research" means activities in which you:</p>
          <ul>
            <li>Notify us as soon as possible after you discover a real or potential security issue.</li>
            <li>Make every effort to avoid privacy violations, degradation of user experience, disruption to production systems, and destruction or manipulation of data.</li>
            <li>Only use exploits to the extent necessary to confirm a vulnerability's presence. Do not use an exploit to compromise or exfiltrate data, establish command line access and/or persistence, or use the exploit to pivot to other systems.</li>
            <li>Provide us a reasonable amount of time to resolve the issue before you disclose it publicly.</li>
            <li>Do not submit a high volume of low-quality reports.</li>
          </ul>

          <h2>Out of Scope Activities</h2>
          <p>The following testing activities are strictly prohibited:</p>
          <ul>
            <li><strong>Destructive Testing:</strong> Do not intentionally modify or delete data.</li>
            <li><strong>Denial of Service (DoS/DDoS):</strong> Do not execute attacks intended to disrupt services or overwhelm infrastructure.</li>
            <li><strong>Social Engineering:</strong> Do not attempt to socially engineer (e.g., phishing, vishing, spamming) Zentrion employees, contractors, or clients.</li>
            <li><strong>Physical Testing:</strong> Do not attempt physical attacks against our offices or data centers.</li>
            <li><strong>Third-Party Systems:</strong> Do not test third-party applications, websites, or services that integrate with or link to Zentrion.</li>
          </ul>

          <h2>Reporting a Vulnerability</h2>
          <p>
            Please send your report to <a href="mailto:security@zentriontechnologies.com" className="text-cyan hover:underline">security@zentriontechnologies.com</a>.
          </p>
          <p>When reporting, please include:</p>
          <ul>
            <li>A detailed description of the vulnerability, including its location and potential impact.</li>
            <li>Step-by-step instructions to reproduce the issue.</li>
            <li>A Proof of Concept (PoC) if available.</li>
            <li>Any necessary context or environment details.</li>
          </ul>

          <h2>Bug Bounty Program</h2>
          <p>
            Zentrion Technologies currently does not operate a paid public bug bounty program. We deeply appreciate responsible disclosures and will offer public acknowledgment/kudos for valid, critical reports that result in a patch, but we do not promise monetary compensation.
          </p>
        </div>
      </section>
    </>
  );
}
