import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, ArrowIcon } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import { 
  CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS, MAPS_LINK, 
  CONTACT_WHATSAPP, buildWhatsAppLink, INTERNSHIP_APPLICATION_FORM 
} from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us – Cybersecurity, AI & Internship Enquiries | Zentrion',
  description: 'Contact Zentrion Technologies. Reach us via WhatsApp, email or form for cybersecurity services, AI automation, cloud security, internship applications and general enquiries. Chennai, India.',
  keywords: [
    'contact Zentrion Technologies',
    'cybersecurity company contact',
    'internship apply Zentrion',
    'Zentrion WhatsApp',
    'hr@zentriontechnologies.com',
    'cybersecurity internship contact',
    'Chennai cybersecurity company',
  ],
  openGraph: {
    title: 'Contact Zentrion Technologies',
    description: 'Reach us for cybersecurity, AI automation, internship applications and enterprise services.',
    url: 'https://zentriontechnologies.com/contact',
    type: 'website',
  },
  alternates: { canonical: '/contact' },
};

const whatsappGeneral = buildWhatsAppLink("Hi Zentrion! I'd like to enquire about your services.");
const whatsappInternship = buildWhatsAppLink("Hi Zentrion! I'd like to apply for an internship. My name is ");

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Zentrion Technologies',
  url: 'https://zentriontechnologies.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Zentrion Technologies',
    telephone: '+91-8220437738',
    email: 'consultancy@zentriontechnologies.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8220437738',
        contactType: 'customer service',
        availableLanguage: ['English', 'Tamil'],
      },
      {
        '@type': 'ContactPoint',
        email: 'hr@zentriontechnologies.com',
        contactType: 'human resources',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Breadcrumbs items={[{ href: '/contact', label: 'Contact' }]} />
      <section className="container-x pt-10 pb-24">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="mt-4 text-mute max-w-xl">
            Whether you need a cybersecurity audit, AI automation, an internship, or just want to say hello — we're a message away.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <Reveal>
            <ContactForm context="Contact form message" />
          </Reveal>

          <Reveal delay={0.08} className="space-y-5">

            {/* WhatsApp — Most Prominent */}
            <GlassCard hover={false} className="border-emerald-500/30 bg-emerald-500/5">
              <p className="eyebrow text-emerald-400">WhatsApp</p>
              <p className="mt-2 font-bold text-xl text-white">+91 82204 37738</p>
              <p className="text-xs text-mute mt-1 mb-4">Fastest way to reach us — usually replies within hours</p>
              <a
                id="contact-whatsapp-general"
                href={whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                aria-label="Chat with Zentrion on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </GlassCard>

            {/* Email */}
            <GlassCard hover={false}>
              <p className="eyebrow">Email</p>
              <div className="mt-3 space-y-3">
                <div>
                  <a href={`mailto:${CONSULT_EMAIL}`} className="text-cyan hover:underline font-medium">
                    {CONSULT_EMAIL}
                  </a>
                  <span className="block text-xs text-mute mt-0.5">Services, audits &amp; consultation</span>
                </div>
                <div>
                  <a href={`mailto:${HR_EMAIL}`} className="text-cyan hover:underline font-medium">
                    {HR_EMAIL}
                  </a>
                  <span className="block text-xs text-mute mt-0.5">Internship &amp; HR applications</span>
                </div>
              </div>
            </GlassCard>

            {/* Internship Quick Apply */}
            <GlassCard hover={false} className="border-violet/30 bg-violet/5">
              <p className="eyebrow text-violet-400">Internship Applications</p>
              <p className="mt-2 text-sm text-mute">Apply for cybersecurity, AI, or engineering internships at Zentrion.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  id="contact-internship-form"
                  href={INTERNSHIP_APPLICATION_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm !py-2 !px-4"
                >
                  Apply via Form <ArrowIcon />
                </a>
                <a
                  id="contact-internship-whatsapp"
                  href={whatsappInternship}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-semibold px-4 py-2 rounded-lg border border-emerald-500/30 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  id="contact-internship-email"
                  href={`mailto:${HR_EMAIL}?subject=Internship Application&body=Hi Zentrion HR team,%0A%0AI am interested in applying for an internship.%0A%0AName: %0ATrack: (Cybersecurity / AI / Dev / Other)%0ALinkedIn / GitHub / Portfolio: %0A%0AThank you.`}
                  className="inline-flex items-center gap-2 bg-cyan/10 hover:bg-cyan/20 text-cyan text-sm font-semibold px-4 py-2 rounded-lg border border-cyan/30 transition-colors"
                >
                  Email HR
                </a>
              </div>
            </GlassCard>

            {/* Social */}
            <GlassCard hover={false}>
              <p className="eyebrow">Social &amp; Location</p>
              <div className="mt-3 space-y-2">
                <a
                  href="https://instagram.com/zentriontech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline block text-sm"
                >
                  Instagram — @zentriontech
                </a>
                <a
                  href="https://linkedin.com/company/zentriontechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline block text-sm"
                >
                  LinkedIn — Zentrion Technologies
                </a>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mute hover:text-cyan block text-sm transition-colors"
                >
                  📍 {COMPANY_ADDRESS}
                </a>
              </div>
            </GlassCard>

          </Reveal>
        </div>
      </section>
    </>
  );
}
