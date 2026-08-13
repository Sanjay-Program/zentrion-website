import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'How Zentrion Technologies approaches real cybersecurity, AI and privacy engagements — representative case studies across education, SaaS and enterprise clients.',
  alternates: { canonical: '/case-studies' },
};

const cases = [
  {
    tag: 'Education · Awareness Training',
    title: 'CyberSafe Student rollout across a 1,200-student CBSE campus',
    problem:
      'A private CBSE school wanted practical cyber-safety and AI-awareness education for Classes 8–10 but had no prior technology-partner relationship.',
    approach:
      'We ran a 2-hour CyberSafe Student workshop covering phishing, password hygiene, social media privacy and AI/deepfake awareness, followed by an assessment and certificate for participating students.',
    outcome:
      'High engagement across three batches, positive feedback from the computer science department, and a follow-on FutureTech (AI + Cybersecurity + Careers) session booked for Classes 11–12.',
  },
  {
    tag: 'SaaS · Application Security',
    title: 'Application & API security review for a growing SaaS platform',
    problem:
      'A SaaS company preparing for an enterprise sales cycle needed an independent security review of its customer-facing APIs and authentication flow.',
    approach:
      'We performed a structured VAPT engagement mapped to OWASP Top 10:2025 categories — access control, authentication, injection, and security misconfiguration — with a prioritized, evidence-backed findings report.',
    outcome:
      'Findings were triaged into critical/high/medium/low, remediated by the client engineering team, and re-verified — giving the client a clean security summary to share with enterprise prospects.',
  },
  {
    tag: 'Privacy Engineering · DPDP Readiness',
    title: 'DPDP readiness assessment for a data-processing organization',
    problem:
      'An organization processing customer and employee personal data needed to understand its DPDP Act exposure ahead of the Rules coming into force.',
    approach:
      'We mapped data flows, processing activities, vendor/processor relationships and consent practices against DPDP Act obligations — notice, consent, security safeguards, and data-principal rights — to produce a gap analysis and prioritized remediation plan.',
    outcome:
      'The client received a clear, evidence-backed readiness score and a phased remediation roadmap rather than a generic compliance checklist.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/case-studies', label: 'Case Studies' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            How we actually work with clients.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Representative examples of the problems we&rsquo;re engaged to solve — security testing,
            privacy engineering and awareness training — and how we approach them. Details are
            generalized to protect client confidentiality.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <div className="space-y-8">
          {cases.map((c) => (
            <Reveal key={c.title}>
              <GlassCard hover={false} className="grid md:grid-cols-[220px,1fr] gap-8">
                <div>
                  <span className="eyebrow text-cyan">{c.tag}</span>
                  <h3 className="mt-3 font-display font-semibold text-lg leading-snug">{c.title}</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-mute mb-2">Challenge</p>
                    <p className="text-mute leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-mute mb-2">Approach</p>
                    <p className="text-mute leading-relaxed">{c.approach}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-mute mb-2">Outcome</p>
                    <p className="text-mute leading-relaxed">{c.outcome}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Want a similar outcome?"
        description="Tell us what you're trying to protect or build — we'll scope an engagement that fits."
        primary={{ href: '/book-consultation', label: 'Book a Consultation' }}
        secondary={{ href: '/services', label: 'View Services' }}
      />
    </>
  );
}
