import type { Metadata } from 'next';
import { SectionHeading, Reveal, GlassCard, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions governing the use of Zentrion Technologies website, tools, and services.',
};

export default function TermsAndConditions() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Terms and Conditions', href: '/terms' }]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Terms and Conditions
          </h1>
          <p className="mt-6 text-mute">
            <strong>Last Updated:</strong> October 2026<br/>
            <strong>Version:</strong> 2.0
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="prose dark:prose-invert max-w-4xl prose-headings:text-[rgb(var(--c-ink))] text-[rgb(var(--c-ink))]">
          <h2>1. Introduction & Acceptance</h2>
          <p>
            Welcome to Zentrion Technologies ("Zentrion," "we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of our website (zentriontechnologies.com), educational resources, browser-based tools, cyber range laboratories, and related free services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Services.
          </p>
          <p>
            Please note that professional consulting engagements, software development, and formal client services are governed by separate, signed agreements.
          </p>

          <h2>2. Cybersecurity Protection & Authorized Testing Only</h2>
          <p>
            <strong>CRITICAL NOTICE:</strong> Zentrion provides cybersecurity educational materials, browser-native tools, demonstrations, and simulated labs strictly for lawful education, defensive testing, authorized security assessment, and academic research. 
          </p>
          <p>
            By using our security tools or educational materials, you agree that you will <strong>only</strong> test:
          </p>
          <ul>
            <li>Systems, networks, and applications that you own.</li>
            <li>Systems for which you have explicit, written authorization to test.</li>
            <li>Intentionally vulnerable laboratory environments provided by Zentrion or third parties specifically for testing.</li>
          </ul>
          <p>You must <strong>NOT</strong> use Zentrion resources or tools to:</p>
          <ul>
            <li>Attack, exploit, or scan third-party systems without authorization.</li>
            <li>Bypass authentication mechanisms on systems you do not control.</li>
            <li>Deploy malware, steal credentials, or exfiltrate data.</li>
            <li>Conduct Denial-of-Service (DoS) attacks.</li>
            <li>Evade security controls or perform unauthorized persistence.</li>
            <li>Conduct destructive testing or violate any applicable laws.</li>
          </ul>
          <p>
            You are solely responsible for obtaining necessary authorizations. Zentrion does not authorize attacks against any third-party infrastructure. The existence of a technique in our guides does not constitute permission to use it against unauthorized targets.
          </p>

          <h2>3. Free Tools & Cyber Labs Disclaimer</h2>
          <p>
            Our interactive cyber labs are educational simulations. Some environments intentionally reproduce vulnerabilities. Behavior in a lab does not authorize testing against real systems. Users must follow lab instructions and must not modify or attack infrastructure outside the permitted environment. We may modify, suspend, or remove labs at any time without notice. Completion of a lab does not constitute professional certification, and scores do not constitute proof of real-world security competence.
          </p>
          <p>
            Similarly, our browser-native Free Tools are provided for diagnostic and authorized security purposes. Output may be incomplete or inaccurate, and you must independently verify the results. Zentrion does not guarantee tool accuracy or availability. The use of our free tools does not constitute a professional security audit.
          </p>

          <h2>4. Client Services & Statements of Work</h2>
          <p>
            For paid client engagements (including Vulnerability Assessments, Penetration Testing, Software Development, Cloud Consulting, and AI/Automation engagements), the relationship is strictly governed by a signed Statement of Work (SOW), Master Services Agreement (MSA), or formal Proposal. 
          </p>
          <p>
            <strong>Security Engagements:</strong> Security testing occurs only after written authorization and agreed scope. No penetration test, automated scanner, or security review can guarantee the discovery of every vulnerability. The client is responsible for identifying prohibited systems, ensuring backups, and obtaining third-party permissions. Zentrion is not responsible for vulnerabilities outside the agreed scope, pre-existing vulnerabilities, undocumented dependencies, or outages caused by third parties.
          </p>
          <p>
            <strong>Software Development:</strong> Development engagements are governed by the signed project agreement. Zentrion does not promise that delivered software is entirely vulnerability-free, as software security is a continuous process.
          </p>

          <h2>5. AI & Automation Disclaimer</h2>
          <p>
            Zentrion provides content and services related to Generative AI, Large Language Models (LLMs), AI Agents, and automated workflows. AI outputs may be inaccurate, incomplete, outdated, misleading, or non-deterministic. Users and clients must independently validate important AI outputs. 
          </p>
          <p>
            You must not rely solely on AI-generated output for legal, medical, financial, security-critical, employment, or compliance decisions. AI systems are not infallible.
          </p>

          <h2>6. Educational Content & Assessments</h2>
          <p>
            Our guides, tutorials, cheatsheets, research articles, encyclopedia entries, videos, and examples are strictly educational resources. They are <strong>not</strong> legal advice, compliance certification, professional advice, or a substitute for an independent professional assessment. 
          </p>
          <p>
            Security examples may become outdated. Users must verify current vendor documentation and applicable laws. Furthermore, any security readiness assessment or "score" provided by our free tools is merely an informational risk indicator. It is NOT a compliance certification, security guarantee, audit opinion, or regulatory approval.
          </p>

          <h2>7. Intellectual Property Rights</h2>
          <p>
            Zentrion retains all rights, title, and interest in and to the Zentrion name, logos, website design, proprietary software, original documentation, guides, diagrams, labs, quizzes, and assessment methodologies. You may not reproduce or distribute these materials without explicit written permission.
          </p>
          <p>
            We do not claim ownership over third-party materials, open-source software, or client-owned data.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            The Services may utilize or link to third-party APIs, hosting providers, or external resources. Third-party services have their own availability, security, privacy policies, terms, and data-processing practices. Zentrion cannot guarantee third-party availability or behavior.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable mandatory law, Zentrion provides the free website resources "as is" and without guarantees of accuracy, availability, or fitness for a particular purpose. Zentrion shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the free website resources.
          </p>
          <p>
            For paid client engagements, the applicable signed agreement controls the allocation of risk, warranties, liability, confidentiality, indemnity, and remedies.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold Zentrion harmless from any claims, damages, liabilities, and expenses arising from your unauthorized security testing, unlawful use of the Services, misuse of tools, breach of these Terms, or harmful content submitted by you.
          </p>

          <h2>11. Website Availability & Force Majeure</h2>
          <p>
            We do not promise uninterrupted service or error-free operation. The website may be modified or become temporarily unavailable. Zentrion is not liable for failure or delay in performance caused by circumstances beyond our reasonable control, including natural disasters, infrastructure outages, telecommunications failures, cloud-provider outages, cyber incidents affecting upstream infrastructure, government actions, or civil unrest.
          </p>

          <h2>12. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, subject to review and final determination by legal counsel.
          </p>

          <h2>13. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes, we will update the "Last Updated" date at the top of this page. Your continued use of the Services following the posting of changes constitutes your acceptance of such changes.
          </p>
          
          <div className="mt-12 p-6 bg-surface/30 border border-glass-border rounded-xl">
            <h3 className="text-xl font-semibold mt-0">Contact Us</h3>
            <p className="mb-0">
              If you have any questions regarding these Terms, please contact us at <a href="mailto:info@zentriontechnologies.com" className="text-cyan hover:underline">info@zentriontechnologies.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
