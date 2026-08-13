import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Cybersecurity, AI and cloud solutions tailored for education, healthcare, fintech, SaaS, e-commerce, manufacturing and HR-driven organizations.',
  alternates: { canonical: '/industries' },
};

const industries = [
  {
    title: 'Education (Schools & Colleges)',
    text: 'Cybersecurity awareness workshops, DPDP-aligned data privacy support, and structured internship/training pipelines for CBSE, ICSE, matriculation and international schools, plus engineering and arts & science colleges.',
    points: ['Student data protection', 'CyberSafe Student workshops', 'Faculty & admin awareness', 'Campus network security review'],
  },
  {
    title: 'Healthcare',
    text: 'Security and privacy engineering for patient data, diagnostics, appointment and billing systems, aligned to sensitive-health-data obligations under the DPDP Act.',
    points: ['Patient data classification', 'Access control review', 'Vendor/processor risk', 'Incident response readiness'],
  },
  {
    title: 'Fintech & BFSI',
    text: 'Security assessments and privacy engineering for KYC, payments, credit and transaction systems handling high-sensitivity financial data.',
    points: ['API & application security', 'Fraud-relevant access review', 'Vendor risk scoring', 'Regulatory-aligned controls'],
  },
  {
    title: 'SaaS & Technology Companies',
    text: 'Application security, cloud security posture, and AI-product security for growing SaaS companies that need to move fast without shipping vulnerabilities.',
    points: ['VAPT & secure SDLC', 'Cloud configuration review', 'AI/LLM security', 'Customer data governance'],
  },
  {
    title: 'E-commerce',
    text: 'Security for storefronts, payment flows and customer data across web and mobile commerce platforms.',
    points: ['Checkout & payment security', 'Customer PII protection', 'Bot & fraud-adjacent risk', 'Third-party script review'],
  },
  {
    title: 'HR-Driven & BPO Organizations',
    text: 'Privacy and security controls for employee, candidate and payroll data across HRMS, ATS and outsourced operations.',
    points: ['Employee data classification', 'Access & identity review', 'Vendor/processor governance', 'Awareness training for staff'],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/industries', label: 'Industries' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Industries</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Built for how each industry actually handles risk.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Every sector has a different data-risk profile. We tailor our cybersecurity, AI and
            privacy engineering work to the systems, data and regulatory context specific to your
            industry.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Where we work" title="Industries we serve" />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <Reveal key={ind.title}>
              <GlassCard className="h-full flex flex-col">
                <h3 className="font-display font-semibold text-lg">{ind.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed flex-1">{ind.text}</p>
                <ul className="mt-4 space-y-2">
                  {ind.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-mute">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Don't see your industry?"
        description="Tell us about your data, systems and risk — we'll scope the right engagement."
        primary={{ href: '/contact', label: 'Talk to Us' }}
        secondary={{ href: '/case-studies', label: 'See Case Studies' }}
      />
    </>
  );
}
