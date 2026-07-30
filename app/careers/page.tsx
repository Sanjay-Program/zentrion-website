import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading, ArrowIcon } from '@/components/ui';
import { buildMailtoLink, buildWhatsAppLink } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Current openings and life at Zentrion Technologies.',
  alternates: { canonical: '/careers' },
};

const openings = [
  { title: 'Security Engineer', type: 'Full-time', location: 'Chennai / Hybrid' },
  { title: 'AI/ML Engineer', type: 'Full-time', location: 'Chennai / Hybrid' },
  { title: 'Full Stack Developer', type: 'Full-time', location: 'Remote' },
  { title: 'Cybersecurity Trainer', type: 'Contract', location: 'Chennai' },
];

export default function CareersPage() {
  return (
    <>
      <section className="container-x pt-36 pb-16">
        <Reveal>
          <Eyebrow>Careers</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Build the defense, not just describe it.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            We’re a small, hands-on team. Everyone here ships code, runs assessments, or
            teaches &mdash; often all three in the same week.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Current openings" title="Roles we’re hiring for" />
        <div className="mt-12 space-y-4">
          {openings.map((o) => {
            const message = `Hi Zentrion Technologies, I\u2019d like to apply for the ${o.title} role (${o.type} \u00b7 ${o.location}). Here\u2019s a bit about me and my resume:`;
            const waLink = buildWhatsAppLink(message);
            const mailLink = buildMailtoLink(`Application: ${o.title}`, message);
            return (
              <Reveal key={o.title}>
                <GlassCard hover={false} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{o.title}</h3>
                    <p className="mt-1 text-sm text-mute">
                      {o.type} &middot; {o.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={mailLink}
                      className="text-mute hover:text-cyan transition-colors text-sm"
                      aria-label={`Email your application for ${o.title}`}
                      title="Apply via email"
                    >
                      Email
                    </a>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm !px-4 !py-2"
                    >
                      Apply <ArrowIcon />
                    </a>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Life at Zentrion" title="What working here actually looks like" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Small team, real ownership', text: 'No layers between you and the client or the codebase.' },
            { title: 'Learn by shipping', text: 'You’ll work across security, AI, and product in your first month.' },
            { title: 'Teaching is part of the job', text: 'Engineers here also mentor interns and teach courses.' },
          ].map((v) => (
            <Reveal key={v.title}>
              <GlassCard>
                <h3 className="font-display font-semibold text-lg">{v.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Don't see the right role?"
        description="Send us your resume anyway &mdash; we’re growing quickly."
        primary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
