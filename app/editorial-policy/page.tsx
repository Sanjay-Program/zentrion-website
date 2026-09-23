import { Metadata } from 'next';
import { SectionHeading, Reveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Editorial & Content Policy',
  description: 'How Zentrion Technologies builds practical, safe, and accurate cybersecurity guides.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="pt-32 pb-24 container-x max-w-4xl min-h-screen">
      <Reveal>
        <div className="mb-12">
          <SectionHeading
            eyebrow="Trust & Accuracy"
            title="Editorial & Content Policy"
            description="Our commitment to building safe, practical, and highly accurate cybersecurity resources."
          />
        </div>
      </Reveal>

      <div className="prose prose-invert prose-cyan max-w-none space-y-8">
        <Reveal delay={0.1}>
          <section className="p-8 rounded-2xl glass-card border border-line">
            <h2 className="text-2xl font-display font-semibold mb-4 text-ink">1. Educational Purpose & Safety</h2>
            <p className="text-mute leading-relaxed">
              Zentrion Technologies is an enterprise cybersecurity firm. The resources, tools, and guides provided on this platform are built strictly for <strong>educational and defensive purposes</strong>. 
            </p>
            <p className="text-mute leading-relaxed mt-4">
              All offensive security materials (e.g., penetration testing guides, exploit explanations) are framed for use in authorized labs, Capture The Flag (CTF) events, local isolated environments, and systems explicitly owned by the learner. We do not provide instructions intended to facilitate unauthorized compromise of external systems.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="p-8 rounded-2xl glass-card border border-line">
            <h2 className="text-2xl font-display font-semibold mb-4 text-ink">2. Technical Accuracy & Originality</h2>
            <p className="text-mute leading-relaxed">
              Every guide, tutorial, and tool is written and reviewed by practicing cybersecurity engineers. We do not mass-produce shallow, AI-generated placeholder content. 
            </p>
            <ul className="list-disc pl-5 mt-4 text-mute space-y-2">
              <li>Commands and code examples are tested in real environments.</li>
              <li>Statistics, threat data, and research results are never fabricated.</li>
              <li>When citing external frameworks (like OWASP or MITRE ATT&CK), we provide proper attribution and add original, educational context.</li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.3}>
          <section className="p-8 rounded-2xl glass-card border border-line">
            <h2 className="text-2xl font-display font-semibold mb-4 text-ink">3. Browser-First Privacy</h2>
            <p className="text-mute leading-relaxed">
              Our free tools are designed to operate entirely in your browser whenever technically possible. Tools like encoders, hash generators, and JWT decoders process data locally without sending it to our servers. Tools that require external lookups (like DNS checks or Port Scans) clearly state their behavior.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.4}>
          <section className="p-8 rounded-2xl glass-card border border-line">
            <h2 className="text-2xl font-display font-semibold mb-4 text-ink">4. Independence</h2>
            <p className="text-mute leading-relaxed">
              The Zentrion Academy platform operates independently from our enterprise consulting sales. While we offer enterprise services, our educational materials are designed to provide genuine standalone value without acting merely as "doorway" pages or sales pitches.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
