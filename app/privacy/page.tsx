import type { Metadata } from 'next';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Zentrion Technologies processes, stores, and protects your information.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-mute">
            <strong>Last Updated:</strong> October 2026<br/>
            <strong>Version:</strong> 2.0
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="prose dark:prose-invert max-w-4xl prose-headings:text-[rgb(var(--c-ink))] text-[rgb(var(--c-ink))]">
          <h2>1. Who We Are & Scope</h2>
          <p>
            Zentrion Technologies ("we," "us," or "our") respects your privacy. This Privacy Policy describes how we process, store, and protect information when you use our website (zentriontechnologies.com), educational tools, cyber range labs, and associated free services. 
          </p>

          <h2>2. Information We Collect (Actual Data Flows)</h2>
          <p>
            We strongly believe in collecting only the information necessary for the operation of our services. The following outlines our factual data-handling practices:
          </p>
          
          <h3>Forms and Enquiries</h3>
          <p>
            Our website utilizes client-side form processing. When you fill out a "Contact Us," "Project Inquiry," or "Request Demo" form, the data is <strong>not stored in a backend database by the website</strong>. Instead, it generates a pre-formatted `mailto:` or `whatsapp:` link, opening your local email client or WhatsApp application. Any information you voluntarily submit (name, email, organization, message) is processed directly through standard email or messaging protocols.
          </p>

          <h3>Learning Progress & Local Storage</h3>
          <p>
            Our "My Learning" features, completed labs, guides, and quiz results are stored entirely locally in your browser using <code>localStorage</code>. <strong>Zentrion does not track or store your learning progress on our servers.</strong> Please note that clearing your browser cache or local storage will remove your local learning progress. Locally stored information is not equivalent to an account record.
          </p>

          <h3>Automatically Collected Information (Cookies)</h3>
          <p>
            We use a first-party tracking script that sets a simple <code>visitorId</code> cookie to analyze basic website performance and traffic. We currently do not use pervasive third-party analytics networks (such as Google Analytics or Facebook Pixel) to track you across the internet.
          </p>

          <h3>Security Tools & Labs</h3>
          <p>
            When you use our free browser-native security tools (e.g., DNS Lookups, Port Scanners, OSINT tools), your query (e.g., domain names, IP addresses) may be routed through our server-side proxies or directly to third-party APIs (such as HackerTarget, Cloudflare DNS, GitHub API). We do not attach your personal identity to these queries, but the target strings are processed by those third-party providers to return the results.
          </p>

          <h2>3. Client Engagement Information</h2>
          <p>
            Information shared during formal consulting engagements (such as Vulnerability Assessments or Software Development) is governed by a separate, signed Master Services Agreement (MSA) or Non-Disclosure Agreement (NDA).
          </p>

          <h2>4. Internships & Careers</h2>
          <p>
            If you apply for an internship or employment, we may collect your name, email, phone, CV/resume, education details, GitHub/LinkedIn links, and interview information. This information is processed for recruitment purposes and is subject to the specific offer or contract terms. Application submission does not guarantee employment.
          </p>

          <h2>5. Children & Educational Institutions</h2>
          <p>
            When working with schools and colleges, we collect only the information necessary to facilitate the program. We work through the educational institution to obtain required permissions where applicable. We do not use student data for advertising, we do not sell student information, and we restrict internal access.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain information for as long as reasonably necessary for the purpose for which it was collected, including providing services, communicating with you via email, maintaining business records, meeting legal obligations, and resolving disputes. Because we do not store website form submissions in a central database, we do not have a universal automated deletion mechanism for website visitors.
          </p>

          <h2>7. Security Safeguards</h2>
          <p>
            We use reasonable technical and organizational safeguards appropriate to the nature of the information. However, no system can be guaranteed to be absolutely impervious to compromise.
          </p>

          <h2>8. International Processing</h2>
          <p>
            Zentrion is based in Tamil Nadu, India. If you access our website from outside India, please note that your information may be processed across borders in accordance with this policy.
          </p>

          <h2>9. User Rights</h2>
          <p>
            Depending on applicable law (such as the DPDP Act), you may have rights relating to access, correction, erasure, withdrawal of consent, and grievance redressal. Since the website does not maintain central user accounts, any data requests should be directed to us via email.
          </p>

          <div className="mt-12 p-6 bg-surface/30 border border-glass-border rounded-xl">
            <h3 className="text-xl font-semibold mt-0">Contact & Privacy Requests</h3>
            <p className="mb-0">
              For privacy-related inquiries or to exercise your rights, please contact us at <a href="mailto:privacy@zentriontechnologies.com" className="text-cyan hover:underline">privacy@zentriontechnologies.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
