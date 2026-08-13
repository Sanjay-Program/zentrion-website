import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading, ArrowIcon } from '@/components/ui';
import Accordion, { AccordionItem } from '@/components/Accordion';
import Link from 'next/link';
import { buildWhatsAppLink, INTERNSHIP_APPLICATION_FORM, HR_EMAIL } from '@/lib/contact';
import TrainingIllustration from '@/components/TrainingIllustration';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Training, Courses & Internships',
  description:
    'Cybersecurity awareness training, online courses, summer courses, certifications, internships, and placement training from Zentrion Technologies — including our hands-on Practical Ethical Hacking & Cybersecurity Bootcamp.',
  alternates: { canonical: '/training' },
};

const courses = [
  { title: 'Cybersecurity Fundamentals', level: 'Beginner', duration: '6 weeks', tag: 'Certification' },
  {
    title: 'Practical Ethical Hacking & Cybersecurity Bootcamp',
    level: 'Intermediate',
    duration: '12 modules · hands-on',
    tag: 'Flagship Program',
    href: '#bootcamp-curriculum',
  },
  { title: 'AI & Machine Learning Foundations', level: 'Beginner', duration: '6 weeks', tag: 'Certification' },
  { title: 'Cloud Security Essentials', level: 'Intermediate', duration: '5 weeks', tag: 'Certification' },
  { title: 'Summer Bootcamp: Security + AI', level: 'All levels', duration: '4 weeks', tag: 'Summer Course' },
  { title: 'Placement & Interview Readiness', level: 'All levels', duration: '3 weeks', tag: 'Career Prep' },
];

const bootcampModules: AccordionItem[] = [
  {
    title: 'Lab Setup',
    meta: 'VirtualBox · Kali Linux',
    content:
      'Install VirtualBox and configure a Kali Linux virtual machine as your personal, isolated lab — the same environment used throughout the rest of the bootcamp.',
  },
  {
    title: 'Linux Command Line Crash Course',
    meta: 'Navigation · Permissions',
    content:
      'Get comfortable at the terminal: filesystem navigation, file permissions, process management, and the core commands every security tool in this course assumes you already know.',
  },
  {
    title: 'OSINT & Recon in Action',
    meta: 'Whois · theHarvester',
    content:
      'Practice open-source intelligence gathering with Whois lookups, Google dorking, and theHarvester to map a target’s public footprint before any technical testing begins.',
  },
  {
    title: 'Phishing Attack Simulation',
    meta: 'GoPhish / SET',
    content:
      'Build a fake login page using GoPhish or the Social-Engineering Toolkit in a controlled lab, then walk through the technical and behavioral red flags that reveal a phishing attempt in the wild.',
  },
  {
    title: 'Brute Force Attacks',
    meta: 'Hydra · John the Ripper',
    content:
      'Run Hydra against sample login forms and John the Ripper against sample password hashes to understand exactly why weak and reused passwords fail so quickly under attack.',
  },
  {
    title: 'Social Media Account Security Demo',
    meta: 'Your own test account',
    content:
      'Using a dedicated test account, see how weak passwords and phishing links can compromise a social account — then harden that same account with two-factor authentication and lock down the gaps.',
  },
  {
    title: 'Exploiting a Vulnerable Machine',
    meta: 'Metasploit · Metasploitable',
    content:
      'Use the Metasploit Framework against the intentionally vulnerable Metasploitable virtual machine to see the full path from open service to shell access, step by step.',
  },
  {
    title: 'SQL Injection Live Demo',
    meta: 'DVWA',
    content:
      'Attack the Damn Vulnerable Web Application (DVWA) to extract data through SQL injection, then review exactly what parameterized queries and input validation would have stopped.',
  },
  {
    title: 'XSS Attack Demo',
    meta: 'Cross-Site Scripting',
    content:
      'Inject and execute script in a deliberately vulnerable web app to see how stored and reflected XSS actually work, and what output-encoding fixes close the hole.',
  },
  {
    title: 'Wi-Fi Hacking Demo',
    meta: 'Aircrack-ng',
    content:
      'On your own router only, capture a WPA2 handshake and attempt to crack it with Aircrack-ng — then apply the same technique in reverse to audit and harden your own network.',
  },
  {
    title: 'Android Security Basics',
    meta: 'APK Analysis',
    content:
      'Explore app permissions, basic APK analysis, and mobile malware awareness on a test or emulated device, building the instincts to spot a risky app before installing it.',
  },
  {
    title: 'Setting Up Defenses',
    meta: 'Snort / Suricata',
    content:
      'Close the loop by configuring firewall rules and standing up intrusion detection with Snort or Suricata — turning everything learned on offense into a working defensive setup.',
  },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Practical Ethical Hacking & Cybersecurity Bootcamp',
  description:
    'A hands-on, lab-first cybersecurity curriculum covering Linux fundamentals, OSINT, phishing simulation, brute force attacks, exploitation, web app attacks, Wi-Fi security, mobile security basics, and defensive tooling.',
  provider: {
    '@type': 'Organization',
    name: 'Zentrion Technologies',
    sameAs: 'https://zentriontechnologies.com',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Blended',
    location: {
      '@type': 'Place',
      name: 'Chennai, Tamil Nadu, India',
    },
  },
};

export default function TrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Breadcrumbs items={[{ href: '/training', label: 'Training' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Training & Learning</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Learn from the team doing the work.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Cybersecurity awareness training, certification courses, summer bootcamps, and
            structured internships &mdash; taught by engineers actively running security and AI
            engagements.
          </p>
        </Reveal>
      </section>

      {/* AWARENESS TRAINING ILLUSTRATION */}
      <section className="container-x pb-4">
        <Reveal>
          <div className="glass-card rounded-2xl p-6 md:p-10 grid md:grid-cols-[1.1fr,1fr] gap-8 items-center">
            <div>
              <Eyebrow>Security Awareness & Training</Eyebrow>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-tight">
                We run in-person and virtual awareness sessions, not just self-paced videos.
              </h2>
              <p className="mt-4 text-mute leading-relaxed text-sm">
                From school-level Internet Safety sessions to enterprise phishing-awareness workshops,
                every Zentrion training program is delivered by engineers who run real security
                assessments &mdash; so what you learn maps directly to the threats organizations
                actually face today.
              </p>
            </div>
            <TrainingIllustration className="w-full h-auto text-ink/70" />
          </div>
        </Reveal>
      </section>

      {/* COURSES */}
      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Courses & certifications" title="Upcoming batches" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {courses.map((c, i) => {
            const enrollLink = buildWhatsAppLink(
              `Hi Zentrion Technologies, I\u2019d like to enroll in "${c.title}" (${c.duration}). Could you share the next available batch?`,
            );
            return (
              <Reveal key={c.title} delay={i * 0.04}>
                <GlassCard className={c.tag === 'Flagship Program' ? 'border-cyan/30 relative overflow-hidden' : ''}>
                  {c.tag === 'Flagship Program' && (
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan/20 rounded-full blur-3xl pointer-events-none" />
                  )}
                  <span className={`eyebrow relative ${c.tag === 'Flagship Program' ? 'text-cyan' : ''}`}>{c.tag}</span>
                  <h3 className="mt-3 font-display font-semibold text-lg relative">{c.title}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm text-mute relative">
                    <span>{c.level}</span>
                    <span>{c.duration}</span>
                  </div>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="mt-5 relative inline-flex items-center gap-1.5 text-sm font-medium text-cyan"
                    >
                      View Curriculum <ArrowIcon />
                    </Link>
                  ) : (
                    <a
                      href={enrollLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 relative inline-flex items-center gap-1.5 text-sm font-medium text-cyan"
                    >
                      Enroll Now <ArrowIcon />
                    </a>
                  )}
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FLAGSHIP BOOTCAMP CURRICULUM */}
      <section id="bootcamp-curriculum" className="container-x py-20 border-t border-line scroll-mt-24">
        <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12">
          <Reveal>
            <Eyebrow>Flagship Program</Eyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight">
              Practical Ethical Hacking &amp; Cybersecurity Bootcamp
            </h2>
            <p className="mt-5 text-mute leading-relaxed">
              A hands-on, lab-first curriculum that takes you from a clean VirtualBox install to
              running your own attacks and defenses &mdash; every technique demonstrated on
              intentionally vulnerable machines, test accounts, or your own hardware.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5 max-w-sm">
              <div>
                <p className="font-display text-2xl font-semibold text-gradient">12</p>
                <p className="text-sm text-mute mt-1">Hands-on modules</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-gradient">100%</p>
                <p className="text-sm text-mute mt-1">Lab-based learning</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={buildWhatsAppLink(
                  'Hi Zentrion Technologies, I\u2019d like to enroll in the Practical Ethical Hacking & Cybersecurity Bootcamp. Could you share the next available batch?',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enroll in This Bootcamp <ArrowIcon />
              </a>
            </div>
            <GlassCard hover={false} className="mt-8">
              <p className="text-xs uppercase tracking-wide text-mute mb-2">Ethics &amp; scope</p>
              <p className="text-sm text-mute leading-relaxed">
                Every offensive technique in this program is practiced only against systems built
                for that purpose &mdash; your own lab VMs, Metasploitable, DVWA, and your own
                accounts or router. Using these techniques against systems you don&apos;t own or
                have written permission to test is illegal, and staying inside that boundary is
                treated as a core part of the curriculum, not an afterthought.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion items={bootcampModules} />
          </Reveal>
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section id="internships" className="container-x py-20 border-t border-line">
        <SectionHeading
          eyebrow="Internships"
          title="Work on real security and AI engagements"
          description="Our internship program pairs you with a mentor on a live project &mdash; not a simulated one."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Mentorship', text: 'Direct guidance from the engineers running client engagements.' },
              { title: 'Real Projects', text: 'Work on live cybersecurity, AI, or development projects.' },
              { title: 'Paid Stipend', text: 'Every internship carries a performance-based stipend, plus a completion certificate.' },
              { title: 'Technologies', text: 'Exposure to modern security tooling, cloud platforms, and AI stacks.' },
            ].map((v) => (
              <Reveal key={v.title}>
                <GlassCard hover={false}>
                  <h3 className="font-display font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-mute leading-relaxed">{v.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="glass-card rounded-xl p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg">Apply for a Zentrion internship</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">
                  See open internship tracks &mdash; Cybersecurity, AI/ML, Full Stack, Product, Design,
                  Data and more &mdash; and apply directly through our internship application form. Our
                  HR team reviews every application personally.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={INTERNSHIP_APPLICATION_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Apply for an Internship <ArrowIcon />
                </a>
                <Link href="/careers#internships" className="btn-ghost">
                  View All Tracks
                </Link>
              </div>
              <p className="mt-4 text-xs text-mute">
                Prefer email? Reach our HR team directly at{' '}
                <a href={`mailto:${HR_EMAIL}`} className="text-cyan hover:underline">
                  {HR_EMAIL}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <p className="eyebrow">FAQs</p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {[
              { q: 'Is the internship paid?', a: 'Yes — every Zentrion internship carries a performance-based stipend, confirmed at offer stage based on track and duration.' },
              { q: 'Is it remote or in-person?', a: 'Both, depending on the project. Most cohorts run hybrid out of Chennai.' },
              { q: 'What background do I need?', a: 'Basic programming or networking fundamentals. We’ll teach the rest.' },
              { q: 'Do I get a certificate either way?', a: 'Yes, all interns who complete the program receive a certificate.' },
            ].map((f) => (
              <GlassCard key={f.q} hover={false}>
                <p className="font-medium">{f.q}</p>
                <p className="mt-2 text-sm text-mute">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to bring this training to your school or college?"
        description="We run cybersecurity awareness workshops and curriculum partnerships for institutions."
        primary={{ href: '/contact', label: 'Partner With Us' }}
      />
    </>
  );
}
