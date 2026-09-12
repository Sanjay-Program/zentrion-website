import type { Metadata } from 'next';
import { CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS } from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Zentrion Technologies collects, uses, discloses and protects personal information across our website, services, training programs and internship applications.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    title: '1. Scope of this Policy',
    body: `This Privacy Policy applies to personal information collected by Zentrion Technologies ("Zentrion", "we", "us", "our") through zentriontechnologies.com, our client engagements, cybersecurity/AI training programs, internship applications, and any related communication channels (email, WhatsApp, contact and application forms). By using our website or submitting information to us, you agree to the practices described here. If you do not agree, please do not submit personal information to us.`,
  },
  {
    title: '2. Information We Collect',
    body: `We may collect: (a) identity and contact details such as name, email address, phone number, organization name and designation; (b) information submitted through contact forms, consultation requests, internship applications, training enrolments and the internship application form (currently hosted on Google Forms); (c) technical information such as IP address, browser type, device information, pages visited and referring URLs, collected automatically through standard web analytics; (d) communications you send us by email, WhatsApp or through this website; and (e) where relevant to an engagement, limited organizational or system information you choose to share with us for the purpose of scoping or delivering security, AI or consulting services.`,
  },
  {
    title: '3. How We Use Information',
    body: `We use the information we collect to: respond to inquiries and provide requested information; evaluate and process internship and job applications (using hr@zentriontechnologies.com and our internship application form); schedule and deliver consultations, assessments, training sessions and workshops; communicate about our services, courses and internship programs; maintain records required for business, accounting, contractual or legal purposes; improve our website, services and security posture; and comply with applicable law, including the Digital Personal Data Protection Act, 2023 ("DPDP Act") and its rules, to the extent applicable to us as a data fiduciary.`,
  },
  {
    title: '4. Legal Basis and Consent',
    body: `Where the DPDP Act or other applicable law requires consent, we process personal data on the basis of your consent, given when you submit a form, send us an email, or otherwise voluntarily provide information to us, or on the basis of a legitimate use recognized under applicable law (such as responding to a request you initiated). You may withdraw consent at any time by contacting us at the email addresses listed below; withdrawal will not affect the lawfulness of processing carried out before withdrawal, and may affect our ability to continue providing a requested service.`,
  },
  {
    title: '5. Cookies & Website Analytics',
    body: `Our website may use cookies, local storage and similar technologies to remember your theme preference, understand aggregate usage patterns, and improve site performance. You can control or disable cookies through your browser settings; doing so may affect some website functionality. We do not use cookies to sell personal information to third parties.`,
  },
  {
    title: '6. How We Share Information',
    body: `We do not sell, rent or trade personal information. We may share information with: employees, contractors and mentors involved in delivering a service, course or internship you requested, on a need-to-know basis; service providers who help us operate the website, forms, email and communication tools (e.g. Google Forms, email providers, WhatsApp Business), who are only permitted to use the information to provide services to us; professional advisors (legal, accounting) where necessary; and law enforcement, regulators or courts where disclosure is required by applicable law, legal process, or to protect the rights, property or safety of Zentrion, our clients, our students/interns, or the public.`,
  },
  {
    title: '7. Data Retention',
    body: `We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this Policy, comply with our legal, accounting or reporting obligations, resolve disputes, and enforce our agreements. Internship and job application data is generally retained for the duration of the recruitment cycle and a reasonable period thereafter for record-keeping, unless you request earlier deletion and no legal or contractual reason requires us to retain it.`,
  },
  {
    title: '8. Data Security',
    body: `As a cybersecurity company, we take the security of personal information seriously and apply reasonable technical and organizational safeguards — including access controls, encryption in transit, and restricted internal access — appropriate to the sensitivity of the data involved. No method of transmission or storage is 100% secure, and while we work to protect your information, we cannot guarantee absolute security.`,
  },
  {
    title: '9. Your Rights',
    body: `Subject to applicable law (including the DPDP Act, where applicable), you may have the right to: access the personal information we hold about you; request correction of inaccurate or incomplete information; request erasure of your personal information, subject to any legal or contractual retention requirement; withdraw consent to processing; and raise a grievance regarding how we handle your personal information. To exercise any of these rights, write to us at consultancy@zentriontechnologies.com (general/services) or hr@zentriontechnologies.com (careers/internships). We will respond within a reasonable time and in line with applicable law.`,
  },
  {
    title: '10. Children\u2019s Data & Training Programs',
    body: `Some of our training and awareness programs may be delivered to students. Where we collect any personal information relating to a child in connection with such a program, we do so only through or with the involvement of the relevant institution and, where required by applicable law, with appropriate parental/guardian consent, and we limit collection to what is reasonably necessary to deliver the program (such as name for attendance and certificates). We do not knowingly use such information for behavioural monitoring, tracking or targeted advertising directed at children.`,
  },
  {
    title: '11. Third-Party Links',
    body: `Our website may link to third-party sites (such as our internship application form, social media pages, or Google Maps for our office location). We are not responsible for the privacy practices or content of third-party websites. We encourage you to review the privacy policies of any third-party site you visit.`,
  },
  {
    title: '12. International Users',
    body: `Zentrion Technologies is based in Tamil Nadu, India, and primarily serves clients, students and applicants in India. If you access our website or services from outside India, you understand that your information may be processed in India, where data protection laws may differ from those in your jurisdiction.`,
  },
  {
    title: '13. Changes to this Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices, services or applicable law. The "Last updated" date below indicates when this Policy was last revised. Continued use of our website or services after an update constitutes acceptance of the revised Policy.`,
  },
  {
    title: '14. Contact Us',
    body: `For privacy-related questions, requests or grievances: General & services — ${CONSULT_EMAIL}. Careers & internship applications — ${HR_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
    <Breadcrumbs items={[{ href: '/privacy', label: 'Privacy Policy' }]} />
      <section className="container-x pt-10 pb-24 max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-mute">Last updated: August 2026</p>
      <p className="mt-6 text-mute leading-relaxed">
        Zentrion Technologies (&ldquo;Zentrion&rdquo;) respects your privacy. This Privacy Policy
        explains what personal information we collect through our website, services, training
        programs and internship applications, how we use and protect it, and the choices and rights
        available to you.
      </p>

      <div className="mt-10 space-y-8 text-mute leading-relaxed">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
            <p className="mt-3">{s.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-mute">
        This Privacy Policy is provided for general informational purposes and does not constitute
        legal advice. Zentrion Technologies recommends periodic review of this Policy by qualified
        legal counsel to ensure ongoing compliance with applicable law.
      </p>
    </section>
    </>
  );
}
