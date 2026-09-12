import type { Metadata } from 'next';
import { Eyebrow, Reveal, CTASection } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Website Security Audit Service | Zentrion Technologies',
  description: 'Comprehensive website security audits for Indian businesses. We check SSL, headers, DNS, and known vulnerabilities to secure your infrastructure.',
  alternates: { canonical: '/services/website-security-audit' },
};

export default function WebsiteSecurityAuditPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/website-security-audit', label: 'Website Security Audit' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Security Services</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl">
            Website Security Audit
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Identify critical misconfigurations, exposed services, and vulnerabilities in your web infrastructure before attackers exploit them.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6">What's Included in the Audit</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-mute">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Full SSL/TLS configuration check:</strong> Ensure your encryption meets modern standards (TLS 1.2+).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Security headers audit:</strong> Verification of CSP, HSTS, X-Frame-Options, and more.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>DNS security:</strong> Validation of SPF, DKIM, DMARC, and MTA-STS records to prevent email spoofing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Open port scan:</strong> Comprehensive scanning of the top 1000 ports to find exposed services.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Subdomain enumeration:</strong> Discovery of forgotten or vulnerable subdomains connected to your organization.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Known vulnerability check:</strong> Matching your technology stack against the latest CVE databases.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>Actionable PDF report:</strong> Prioritized fix recommendations for your engineering team.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>30-day re-scan:</strong> A free follow-up scan to verify that all vulnerabilities have been successfully remediated.</span>
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <Reveal>
          <div className="p-8 rounded-2xl bg-void border border-line">
            <h2 className="text-2xl font-semibold mb-4">Recent Results</h2>
            <p className="text-mute italic">
              "We found 12 critical issues on a client's e-commerce site during a routine audit, including exposed database ports and missing DMARC enforcement. Our team remediated the vulnerabilities and secured the infrastructure within 48 hours."
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Ready to secure your web infrastructure?"
        description="Get a comprehensive view of your security posture today."
        primary={{ href: '/tools/website-security-scanner', label: 'Get Free Initial Scan' }}
        secondary={{ href: '/contact', label: 'Book Full Audit' }}
      />
    </>
  );
}
