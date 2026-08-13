import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import { CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS, MAPS_LINK } from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Zentrion Technologies for cybersecurity, AI, cloud, and training inquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
    <Breadcrumbs items={[{ href: '/contact', label: 'Contact' }]} />
      <section className="container-x pt-10 pb-24">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
          Let’s talk about what you’re building.
        </h1>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 gap-10">
        <Reveal>
          <ContactForm context="Contact form message" />
        </Reveal>

        <Reveal delay={0.08} className="space-y-5">
          <GlassCard hover={false}>
            <p className="eyebrow">Email</p>
            <p className="mt-2">
              <a href={`mailto:${CONSULT_EMAIL}`} className="text-cyan hover:underline">
                {CONSULT_EMAIL}
              </a>
              <span className="block text-xs text-mute mt-0.5">Services &amp; consultation</span>
            </p>
            <p className="mt-3">
              <a href={`mailto:${HR_EMAIL}`} className="text-cyan hover:underline">
                {HR_EMAIL}
              </a>
              <span className="block text-xs text-mute mt-0.5">Careers &amp; internships</span>
            </p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="eyebrow">Phone</p>
            <p className="mt-2 text-lg">+91 73057 71789</p>
            <p className="mt-1 text-lg">+91 82204 37738</p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="eyebrow">Social</p>
            <p className="mt-2">
              <a
                href="https://instagram.com/zentriontech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                Instagram &mdash; @zentriontech
              </a>
            </p>
            <p className="mt-1">
              <a
                href="https://linkedin.com/company/zentriontechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                LinkedIn &mdash; Zentrion Technologies
              </a>
            </p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="eyebrow">Based in</p>
            <p className="mt-2 text-mute">
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
                {COMPANY_ADDRESS}
              </a>
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
    </>
  );
}
