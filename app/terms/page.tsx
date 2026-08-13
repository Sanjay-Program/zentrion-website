import type { Metadata } from 'next';
import { CONSULT_EMAIL, HR_EMAIL, COMPANY_ADDRESS } from '@/lib/contact';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions governing the use of the Zentrion Technologies website, services, training programs, courses and internship program.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `These Terms & Conditions ("Terms") govern your access to and use of zentriontechnologies.com and any services, courses, training programs, workshops or internship program described on it (collectively, the "Services"), offered by Zentrion Technologies ("Zentrion", "we", "us", "our"). By accessing this website or engaging any Service, you agree to be bound by these Terms. If you do not agree, please discontinue use of the website and Services.`,
  },
  {
    title: '2. Description of Services',
    body: `Zentrion Technologies provides cybersecurity services (including vulnerability assessment and penetration testing, security audits, security awareness training and consulting), AI & automation solutions, cloud and technology consulting, cybersecurity/AI education programs (courses, bootcamps, certifications, school and college workshops), and an internship program. Service descriptions on this website are for general informational purposes; specific scope, deliverables, pricing, timelines and terms for any paid engagement are set out in a separate signed proposal, quotation, agreement or statement of work, which will take precedence over this website in the event of any conflict.`,
  },
  {
    title: '3. Eligibility',
    body: `Use of this website and application for our courses, training or internship program is intended for individuals who are legally capable of entering into binding agreements, or who have appropriate parental/guardian or institutional consent (for school/college programs involving minors). By submitting an application or enquiry, you confirm that the information you provide is accurate and that you have the authority to provide it.`,
  },
  {
    title: '4. Training, Courses & Certifications',
    body: `Course content, curriculum, batch schedules, formats (online/hybrid/in-person) and certification criteria are subject to change and will be communicated at enrolment. Completion certificates recognize participation and/or satisfactory completion of a course as defined by Zentrion at the time and do not, by themselves, constitute a professional license, degree, or guarantee of employment. All security techniques taught in our bootcamps and workshops are demonstrated strictly within authorized lab environments, intentionally vulnerable test systems, or the participant's own accounts/devices. Using techniques learned through our training against any system without explicit written authorization is illegal and is solely the responsibility of the individual who does so; Zentrion disclaims liability for any such unauthorized use.`,
  },
  {
    title: '5. Internship Program',
    body: `Our internship program is offered at Zentrion's discretion and is subject to the specific terms communicated at the offer stage, including duration, stipend, mentorship structure and expected deliverables. Zentrion does not charge any application, training, certificate or placement fee for its internship program. Submission of an application (including via our internship application form) does not guarantee selection, an offer, or continuation for the full stated duration. References to "future full-time opportunities" or "extended engagement" for high-performing interns are expressions of potential opportunity, not a guarantee of employment, and remain subject to business requirements, available positions and individual performance.`,
  },
  {
    title: '6. Client Engagements & Security Testing',
    body: `Where Zentrion is engaged to perform security testing, assessments, or other technical work for a client, such work will only be performed against systems and within scope explicitly authorized in writing by the client. No security assessment, audit, monitoring service or AI system can guarantee the discovery of all vulnerabilities or the prevention of all incidents. Zentrion's engagements are conducted on a reasonable-efforts, industry-standard-practice basis and do not constitute a warranty that a client's systems are or will remain free of vulnerabilities or secure from compromise.`,
  },
  {
    title: '7. Intellectual Property',
    body: `All content on this website — including text, graphics, logos, product names (such as "Zentrion Compliance", "BehaviourDNA" and related marks), course materials, illustrations and design — is the property of Zentrion Technologies or its licensors and is protected by applicable intellectual property laws. You may view and use this content for personal, non-commercial reference. You may not copy, reproduce, republish, distribute, modify or create derivative works from our content, branding or course materials without our prior written consent.`,
  },
  {
    title: '8. User Conduct',
    body: `You agree not to: use this website or our Services for any unlawful purpose; attempt to gain unauthorized access to our systems, other users' data, or any system referenced in our training environments; misrepresent your identity or affiliation when applying for a role, internship or course; or use content, techniques or materials obtained from Zentrion to test, attack or compromise any system without explicit written authorization from that system's owner.`,
  },
  {
    title: '9. Third-Party Links, Tools & Forms',
    body: `Our website may link to or embed third-party tools, including our internship application form (currently hosted on Google Forms), WhatsApp, and map/location services. These third-party services are governed by their own terms and privacy policies, over which Zentrion has no control. Zentrion is not responsible for the availability, content, or practices of any third-party service.`,
  },
  {
    title: '10. Disclaimers',
    body: `This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including implied warranties of merchantability, fitness for a particular purpose, accuracy or non-infringement. Blog, resource and research content on this website (including summaries of laws such as the DPDP Act and its rules, or industry reports) is provided for general informational and educational purposes only and does not constitute legal, compliance, financial or professional advice. You should seek independent professional advice before relying on such content for compliance or business decisions.`,
  },
  {
    title: '11. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, Zentrion Technologies, its founders, employees, contractors, mentors and affiliates shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of data, revenue, profits, or business opportunity, arising out of or related to your use of this website, our Services, our training programs, or our internship program, even if advised of the possibility of such damages. Where liability cannot be excluded under applicable law, Zentrion's total aggregate liability in respect of any claim arising from the website or a free/no-cost Service shall not exceed INR 5,000; liability for paid engagements is governed exclusively by the applicable signed agreement or statement of work.`,
  },
  {
    title: '12. Indemnification',
    body: `You agree to indemnify and hold harmless Zentrion Technologies and its founders, employees, contractors and mentors from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising out of or in any way connected with: your breach of these Terms; your misuse of any technique, tool or knowledge obtained through our training or internship program; or any content or information you submit to us that infringes the rights of, or causes harm to, a third party.`,
  },
  {
    title: '13. Termination',
    body: `Zentrion may suspend or terminate your access to this website, a course, or the internship/employment relationship at its discretion, including for violation of these Terms, misconduct, unauthorized or unethical use of security techniques, or misrepresentation in an application, subject to any specific terms in a signed offer letter or agreement governing that relationship.`,
  },
  {
    title: '14. Governing Law & Jurisdiction',
    body: `These Terms are governed by the laws of India. Subject to any dispute resolution clause in a specific signed agreement, the courts at Chennai, Tamil Nadu shall have exclusive jurisdiction over any dispute arising out of or relating to these Terms, this website, or our Services.`,
  },
  {
    title: '15. Force Majeure',
    body: `Zentrion shall not be liable for any delay or failure to perform any obligation under these Terms where such delay or failure results from causes beyond its reasonable control, including natural disasters, internet or infrastructure outages, government action, or other events of force majeure.`,
  },
  {
    title: '16. Changes to these Terms',
    body: `We may revise these Terms from time to time. The "Last updated" date below reflects the most recent revision. Continued use of this website or our Services after changes are posted constitutes your acceptance of the revised Terms.`,
  },
  {
    title: '17. Contact',
    body: `Questions about these Terms can be directed to: General & services — ${CONSULT_EMAIL}. Careers, internships & HR matters — ${HR_EMAIL}. Registered address — ${COMPANY_ADDRESS}.`,
  },
];

export default function TermsPage() {
  return (
    <>
    <Breadcrumbs items={[{ href: '/terms', label: 'Terms & Conditions' }]} />
      <section className="container-x pt-10 pb-24 max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Terms &amp; Conditions</h1>
      <p className="mt-4 text-sm text-mute">Last updated: August 2026</p>
      <p className="mt-6 text-mute leading-relaxed">
        Please read these Terms &amp; Conditions carefully before using our website, engaging our
        services, enrolling in a course, or applying to our internship program.
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
        These Terms are provided for general informational purposes and do not constitute legal
        advice. Zentrion Technologies recommends periodic review by qualified legal counsel to ensure
        ongoing compliance with applicable law.
      </p>
    </section>
    </>
  );
}
