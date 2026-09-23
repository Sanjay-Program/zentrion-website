import { Metadata } from 'next';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cybersecurity Encyclopedia & Glossary',
  description: 'A comprehensive dictionary of cybersecurity terms, concepts, and frameworks. Learn the terminology of information security.',
};

const glossary = [
  { term: "Advanced Persistent Threat (APT)", definition: "A prolonged and targeted cyberattack in which an intruder gains access to a network and remains undetected for an extended period, typically to steal data." },
  { term: "Botnet", definition: "A network of private computers infected with malicious software and controlled as a group without the owners' knowledge, e.g., to send spam messages." },
  { term: "Cross-Site Scripting (XSS)", definition: "A vulnerability where attackers inject malicious scripts into web pages viewed by other users. This occurs when an application includes untrusted data in a web page without proper validation or escaping." },
  { term: "Denial-of-Service (DoS)", definition: "An attack meant to shut down a machine or network, making it inaccessible to its intended users, usually by flooding the target with traffic." },
  { term: "Encryption", definition: "The process of converting information or data into a code, especially to prevent unauthorized access. The data can only be read if decrypted with the correct key." },
  { term: "Firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
  { term: "Incident Response (IR)", definition: "An organized approach to addressing and managing the aftermath of a security breach or cyberattack, with the goal of handling the situation in a way that limits damage." },
  { term: "Malware", definition: "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system (e.g., viruses, ransomware, spyware)." },
  { term: "Penetration Testing (Pentesting)", definition: "An authorized simulated cyberattack on a computer system, performed to evaluate the security of the system." },
  { term: "Phishing", definition: "The fraudulent practice of sending emails purporting to be from reputable companies in order to induce individuals to reveal personal information, such as passwords and credit card numbers." },
  { term: "Ransomware", definition: "A type of malicious software designed to block access to a computer system or encrypt its data until a sum of money is paid." },
  { term: "Social Engineering", definition: "The use of deception to manipulate individuals into divulging confidential or personal information that may be used for fraudulent purposes." },
  { term: "SQL Injection (SQLi)", definition: "A code injection technique used to attack data-driven applications, in which malicious SQL statements are inserted into entry fields for execution." },
  { term: "Virtual Private Network (VPN)", definition: "A technology that creates a safe and encrypted connection over a less secure network, such as the internet." },
  { term: "Zero-Day Vulnerability", definition: "A software vulnerability that is discovered by attackers before the vendor has become aware of it. No patch exists, making attacks highly likely to succeed." },
  { term: "Zero Trust Architecture", definition: "A security concept centered on the belief that organizations should not automatically trust anything inside or outside its perimeters and must verify anything trying to connect to its systems before granting access." }
];

export default function Encyclopedia() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Knowledge Base"
          title="Cybersecurity Encyclopedia"
          description="Your authoritative guide to information security terminology. Master the language of cyber defense."
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {glossary.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <GlassCard className="h-full flex flex-col p-6 hover:border-cyan/50 transition-colors">
              <h3 className="text-xl font-bold font-display text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block"></span>
                {item.term}
              </h3>
              <p className="text-mute text-sm leading-relaxed">
                {item.definition}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
