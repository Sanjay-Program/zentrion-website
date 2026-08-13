import type { Metadata } from 'next';
import { Eyebrow, Reveal, CTASection, SectionHeading } from '@/components/ui';
import Accordion, { AccordionItem } from '@/components/Accordion';
import { CONSULT_EMAIL, HR_EMAIL } from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Zentrion Technologies\u2019 cybersecurity, AI, cloud, training and internship services.',
  alternates: { canonical: '/faq' },
};

const generalFaqs: AccordionItem[] = [
  {
    title: 'What does Zentrion Technologies actually do?',
    meta: 'Services',
    content:
      'We deliver AI-powered cybersecurity (VAPT, security audits, monitoring), AI & automation solutions, cloud & technology consulting, cybersecurity/AI education programs, and a structured internship program — for enterprises, schools and colleges.',
  },
  {
    title: 'Which industries do you work with?',
    meta: 'Industries',
    content:
      'Education, healthcare, fintech/BFSI, SaaS & technology companies, e-commerce, and HR-driven/BPO organizations. See our Industries page for details on each.',
  },
  {
    title: 'How do I start a project or request a security assessment?',
    meta: 'Getting started',
    content:
      `Email us at ${CONSULT_EMAIL}, use our Contact page, or book a consultation directly. We'll scope the engagement, share a proposal, and only begin testing systems that are explicitly authorized in writing.`,
  },
  {
    title: 'Is a security assessment or DPDP readiness score a legal guarantee of compliance?',
    meta: 'Compliance',
    content:
      'No. Our assessments and readiness scores give you an evidence-backed picture of your current posture and gaps — they are not a legal certification of compliance and should be reviewed alongside your own legal counsel.',
  },
  {
    title: 'Do you offer cybersecurity awareness training for schools and colleges?',
    meta: 'Training',
    content:
      'Yes. Our workshops range from Internet Safety for younger students to Cybersecurity & AI Awareness and Future Careers sessions for higher-secondary and college students. See our Training page for the full curriculum.',
  },
];

const internshipFaqs: AccordionItem[] = [
  {
    title: 'Are Zentrion internships paid?',
    meta: 'Internships',
    content:
      'Yes — every internship carries a performance-based stipend, confirmed at offer stage, along with a completion certificate.',
  },
  {
    title: 'How do I apply for an internship?',
    meta: 'Internships',
    content:
      `Use the internship application form linked on our Careers and Training pages, or email your resume and portfolio/GitHub links directly to ${HR_EMAIL}.`,
  },
  {
    title: 'Is there any fee to apply, train, or receive a certificate?',
    meta: 'Internships',
    content:
      'No. Zentrion never charges an application, training, certificate or placement fee for any internship or job opening.',
  },
  {
    title: 'Do you offer remote internships?',
    meta: 'Internships',
    content:
      'Most tracks are hybrid out of Chennai, with several engineering, AI, content and research tracks available fully remote.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [...generalFaqs, ...internshipFaqs].map((f) => ({
    '@type': 'Question',
    name: f.title,
    acceptedAnswer: { '@type': 'Answer', text: f.content },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ href: '/faq', label: 'FAQ' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Frequently asked questions.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Answers to common questions about our services, training programs and internships.
            Can&rsquo;t find what you&rsquo;re looking for? Reach out on our Contact page.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <SectionHeading eyebrow="Services & engagements" title="General questions" />
        <div className="mt-10">
          <Accordion items={generalFaqs} />
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <SectionHeading eyebrow="Careers" title="Internship & careers questions" />
        <div className="mt-10">
          <Accordion items={internshipFaqs} />
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        description="Send us a message and we'll get back to you shortly."
        primary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
