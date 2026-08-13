import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading, ArrowIcon } from '@/components/ui';
import { buildMailtoLink, buildWhatsAppLink, HR_EMAIL, INTERNSHIP_APPLICATION_FORM } from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Careers & Internships',
  description:
    'Explore full-time careers and paid internships at Zentrion Technologies across Cybersecurity, AI/ML, Full Stack Development, Product, Design and Business Development.',
  alternates: { canonical: '/careers' },
};

const openings = [
  { title: 'Security Engineer', type: 'Full-time', location: 'Chennai / Hybrid' },
  { title: 'AI/ML Engineer', type: 'Full-time', location: 'Chennai / Hybrid' },
  { title: 'Full Stack Developer', type: 'Full-time', location: 'Remote' },
  { title: 'Cybersecurity Trainer', type: 'Contract', location: 'Chennai' },
];

const internships = [
  {
    title: 'Cybersecurity & Privacy Engineering Intern',
    tags: ['VAPT', 'Application Security', 'Cloud Security', 'Privacy Engineering'],
    text: 'Work on web/API security, vulnerability assessment, security automation and privacy-engineering support for real client and product work.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Full Stack Developer Intern',
    tags: ['React.js', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL'],
    text: 'Ship real product features across our AI and security dashboards — frontend, backend, APIs and databases.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'AI/ML Intern',
    tags: ['LLMs', 'RAG', 'NLP', 'AI Agents', 'Python'],
    text: 'Build LLM applications, RAG pipelines and intelligent automation that power our AI Compliance & Security Copilots.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Backend Developer Intern',
    tags: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'REST APIs'],
    text: 'Design and build the backend services, authentication and data pipelines behind our security and compliance platform.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Frontend Developer Intern',
    tags: ['React.js', 'Next.js', 'TypeScript', 'UI Engineering'],
    text: 'Turn requirements into fast, accessible interfaces for security dashboards and AI product experiences.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'QA Automation Intern',
    tags: ['Selenium', 'Playwright', 'Postman', 'API Testing'],
    text: 'Design and automate test coverage across our web, API and security-critical product surfaces.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Product & Privacy Research Intern',
    tags: ['DPDP', 'Product Research', 'Competitive Intelligence'],
    text: 'Research privacy regulation, competitive products and user workflows to shape our product roadmap.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'UI/UX Design Intern',
    tags: ['Figma', 'Product Design', 'Design Systems'],
    text: 'Design dashboards, onboarding flows and data visualizations that make complex security data simple.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Data Analyst Intern',
    tags: ['SQL', 'Python', 'Power BI', 'Data Visualization'],
    text: 'Turn raw product, security and business data into dashboards and decisions.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Technical Content & Developer Relations Intern',
    tags: ['Technical Writing', 'DevRel', 'Documentation'],
    text: 'Research and write technical articles, documentation and explainers across AI and cybersecurity.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Business Development & Growth Intern',
    tags: ['B2B SaaS', 'Lead Generation', 'CRM'],
    text: 'Build our early customer pipeline across schools, colleges and B2B security/AI customers.',
    stipend: 'Performance-based stipend + certificate',
  },
  {
    title: 'Talent Acquisition / HR Intern',
    tags: ['Sourcing', 'Technical Recruitment', 'ATS'],
    text: 'Help recruit across cybersecurity, AI, engineering, product and design roles at an early-stage company.',
    stipend: 'Performance-based stipend + certificate',
  },
];

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/careers', label: 'Careers' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Careers & Internships</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Build the defense, not just describe it.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            We&rsquo;re a small, hands-on team working across cybersecurity, AI and cloud. Everyone here
            ships code, runs assessments, or teaches &mdash; often all three in the same week. Our
            internship program pairs you with a mentor on a live client or product engagement, not a
            simulated one, and rewards real contribution with a performance-based stipend.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Current openings" title="Full-time roles we're hiring for" />
        <div className="mt-12 space-y-4">
          {openings.map((o) => {
            const message = `Hi Zentrion Technologies, I\u2019d like to apply for the ${o.title} role (${o.type} \u00b7 ${o.location}). Here\u2019s a bit about me and my resume:`;
            const waLink = buildWhatsAppLink(message);
            const mailLink = buildMailtoLink(`Application: ${o.title}`, message, HR_EMAIL);
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
                      Email HR
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

      {/* INTERNSHIPS */}
      <section id="internships" className="container-x py-20 border-t border-line">
        <SectionHeading
          eyebrow="Internships"
          title="Paid internships across Cybersecurity, AI, Engineering, Product & Growth"
          description="Every internship comes with real mentorship, a live project, a performance-based stipend, and a completion certificate — projects matter more to us than certificates alone."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {internships.map((i) => (
            <Reveal key={i.title}>
              <GlassCard className="h-full flex flex-col">
                <h3 className="font-display font-semibold text-lg">{i.title}</h3>
                <p className="mt-2 text-xs font-medium text-cyan">{i.stipend}</p>
                <p className="mt-3 text-sm text-mute leading-relaxed flex-1">{i.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {i.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-full border border-line text-mute"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 glass-card rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow">Ready to apply?</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                Apply to any Zentrion internship in one form
              </h3>
              <p className="mt-2 text-sm text-mute max-w-xl">
                Tell us which track you&rsquo;re interested in, share your GitHub / portfolio / project
                links, and our HR team will get back to you. Projects and demonstrated skill matter far
                more to us than certificates alone.
              </p>
            </div>
            <a
              href={INTERNSHIP_APPLICATION_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Apply for an Internship <ArrowIcon />
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          <p className="eyebrow">FAQs</p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {[
              {
                q: 'Is the internship paid?',
                a: 'Yes. Zentrion internships carry a performance-based stipend that is confirmed at offer stage based on the track, duration and your contribution.',
              },
              { q: 'Is it remote or in-person?', a: 'Both, depending on the project. Most cohorts run hybrid out of Chennai, with remote options for several tracks.' },
              { q: 'What background do I need?', a: 'Basic programming, networking or design fundamentals depending on the track. Projects and demonstrated skill matter more than certificates.' },
              { q: 'Do I get a certificate either way?', a: 'Yes, all interns who complete the program receive a certificate of completion, and high performers may be considered for extended or full-time roles.' },
              { q: 'How do I apply?', a: 'Use the internship application form above, or email your resume and portfolio links directly to hr@zentriontechnologies.com.' },
              { q: 'Is there a fee to apply or to receive a certificate?', a: 'No. Zentrion never charges an application, training, certificate or placement fee for any internship.' },
            ].map((f) => (
              <GlassCard key={f.q} hover={false}>
                <p className="font-medium">{f.q}</p>
                <p className="mt-2 text-sm text-mute">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Life at Zentrion" title="What working here actually looks like" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Small team, real ownership', text: 'No layers between you and the client or the codebase.' },
            { title: 'Learn by shipping', text: 'You\u2019ll work across security, AI, and product in your first month.' },
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
        description="Send your resume and portfolio to hr@zentriontechnologies.com anyway — we're growing quickly."
        primary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
