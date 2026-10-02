import { Metadata } from 'next';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'Cybersecurity Encyclopedia & Glossary',
  description: 'A comprehensive dictionary of cybersecurity terms, concepts, and frameworks. Learn the terminology of information security.',
};

const glossary = [
  {
    "term": "Access Control",
    "definition": "The selective restriction of access to a place or other resource, often involving authentication and authorization."
  },
  {
    "term": "Advanced Persistent Threat (APT)",
    "definition": "A prolonged and targeted cyberattack in which an intruder gains access to a network and remains undetected."
  },
  {
    "term": "Adversary-in-the-Middle (AiTM)",
    "definition": "An attack where the attacker secretly relays and possibly alters the communications between two parties."
  },
  {
    "term": "Air Gap",
    "definition": "A security measure that involves isolating a computer or network and preventing it from establishing an external connection."
  },
  {
    "term": "Antivirus (AV)",
    "definition": "Software designed to detect, stop and remove viruses and other kinds of malicious software."
  },
  {
    "term": "Artificial Intelligence (AI) Security",
    "definition": "The practice of securing AI models from attacks like prompt injection, model inversion, and data poisoning."
  },
  {
    "term": "Asymmetric Cryptography",
    "definition": "A cryptographic system that uses pairs of keys: public keys which may be disseminated widely, and private keys which are known only to the owner."
  },
  {
    "term": "Attack Surface",
    "definition": "The total sum of vulnerabilities that can be exploited to carry out a security attack."
  },
  {
    "term": "Authentication",
    "definition": "The process of verifying the identity of a user, device, or system."
  },
  {
    "term": "Authorization",
    "definition": "The function of specifying access rights/privileges to resources."
  },
  {
    "term": "Backdoor",
    "definition": "A hidden method of bypassing normal authentication or encryption in a computer system, a product, or an embedded device."
  },
  {
    "term": "Blue Team",
    "definition": "The internal security team that defends against both real attackers and Red Teams."
  },
  {
    "term": "Botnet",
    "definition": "A network of private computers infected with malicious software and controlled as a group."
  },
  {
    "term": "Brute Force Attack",
    "definition": "A trial-and-error method used to obtain information such as a user password or personal identification number (PIN)."
  },
  {
    "term": "Buffer Overflow",
    "definition": "An anomaly where a program, while writing data to a buffer, overruns the buffer's boundary and overwrites adjacent memory locations."
  },
  {
    "term": "Bug Bounty",
    "definition": "A deal offered by many websites, organizations and software developers by which individuals can receive recognition and compensation for reporting bugs."
  },
  {
    "term": "Certificate Authority (CA)",
    "definition": "An entity that issues digital certificates."
  },
  {
    "term": "CIA Triad",
    "definition": "A model designed to guide policies for information security within an organization: Confidentiality, Integrity, and Availability."
  },
  {
    "term": "Ciphertext",
    "definition": "The result of encryption performed on plaintext using an algorithm, called a cipher."
  },
  {
    "term": "Cloud Security Posture Management (CSPM)",
    "definition": "Tools that help automate security and provide compliance visibility across public cloud infrastructure."
  },
  {
    "term": "Command and Control (C2)",
    "definition": "The influence an attacker has over a compromised computer system that they control."
  },
  {
    "term": "Common Vulnerabilities and Exposures (CVE)",
    "definition": "A list of publicly disclosed cybersecurity vulnerabilities. Look up known vulnerabilities using our [CVE Lookup](/tools/cve-lookup) tool."
  },
  {
    "term": "Common Vulnerability Scoring System (CVSS)",
    "definition": "A free and open industry standard for assessing the severity of computer system security vulnerabilities."
  },
  {
    "term": "Cross-Site Request Forgery (CSRF)",
    "definition": "An attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated."
  },
  {
    "term": "Cross-Site Scripting (XSS)",
    "definition": "A vulnerability where attackers inject malicious scripts into web pages. See also our [URL Safety Checker](/tools/url-safety)."
  },
  {
    "term": "Cryptojacking",
    "definition": "The unauthorized use of someone else's computer to mine cryptocurrency."
  },
  {
    "term": "Dark Web",
    "definition": "A part of the World Wide Web that is only accessible by means of special software, allowing users and website operators to remain anonymous."
  },
  {
    "term": "Data Breach",
    "definition": "A security incident in which sensitive, protected or confidential data is copied, transmitted, viewed, stolen or used by an individual unauthorized to do so."
  },
  {
    "term": "Data Loss Prevention (DLP)",
    "definition": "A set of tools and processes used to ensure that sensitive data is not lost, misused, or accessed by unauthorized users."
  },
  {
    "term": "Data Privacy",
    "definition": "The proper handling of data – focusing on compliance with data protection regulations."
  },
  {
    "term": "Data Protection Officer (DPO)",
    "definition": "An enterprise security leadership role required by the General Data Protection Regulation (GDPR)."
  },
  {
    "term": "DDoS (Distributed Denial of Service)",
    "definition": "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic."
  },
  {
    "term": "Deepfake",
    "definition": "Synthetic media in which a person in an existing image or video is replaced with someone else's likeness."
  },
  {
    "term": "DevSecOps",
    "definition": "An approach to culture, automation, and platform design that integrates security as a shared responsibility throughout the entire IT lifecycle."
  },
  {
    "term": "Digital Forensics",
    "definition": "The recovery and investigation of material found in digital devices, often in relation to computer crime."
  },
  {
    "term": "Domain Name System (DNS)",
    "definition": "The phonebook of the Internet. Use our [DNS Lookup](/tools/dns-lookup) or [DNS Propagation Checker](/tools/dns-propagation) tools to investigate records."
  },
  {
    "term": "Dynamic Application Security Testing (DAST)",
    "definition": "A process of testing an application from the outside to find security vulnerabilities while it is running."
  },
  {
    "term": "Encryption",
    "definition": "The process of encoding a message or information in such a way that only authorized parties can access it."
  },
  {
    "term": "Endpoint Detection and Response (EDR)",
    "definition": "An integrated endpoint security solution that combines real-time continuous monitoring and collection of endpoint data with rules-based automated response."
  },
  {
    "term": "Ethical Hacking",
    "definition": "The practice of testing a computer system, network or web application to find security vulnerabilities that an attacker could exploit."
  },
  {
    "term": "Exploit",
    "definition": "A piece of software, a chunk of data, or a sequence of commands that takes advantage of a bug or vulnerability."
  },
  {
    "term": "Firewall",
    "definition": "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules."
  },
  {
    "term": "General Data Protection Regulation (GDPR)",
    "definition": "A regulation in EU law on data protection and privacy in the European Union and the European Economic Area."
  },
  {
    "term": "Honeypot",
    "definition": "A computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems."
  },
  {
    "term": "Identity and Access Management (IAM)",
    "definition": "A framework of policies and technologies to ensure that the right users have the appropriate access to technology resources."
  },
  {
    "term": "Incident Response (IR)",
    "definition": "An organized approach to addressing and managing the aftermath of a security breach or cyberattack."
  },
  {
    "term": "Indicators of Compromise (IoC)",
    "definition": "Pieces of forensic data, such as data found in system log entries or files, that identify potentially malicious activity on a system or network."
  },
  {
    "term": "Insider Threat",
    "definition": "A malicious threat to an organization that comes from people within the organization, such as employees, former employees, contractors or business associates."
  },
  {
    "term": "Insecure Direct Object Reference (IDOR)",
    "definition": "A type of access control vulnerability that arises when an application uses user-supplied input to access objects directly."
  },
  {
    "term": "Intrusion Detection System (IDS)",
    "definition": "A device or software application that monitors a network or systems for malicious activity or policy violations."
  },
  {
    "term": "Intrusion Prevention System (IPS)",
    "definition": "A network security/threat prevention technology that examines network traffic flows to detect and prevent vulnerability exploits."
  },
  {
    "term": "ISO/IEC 27001",
    "definition": "An international standard on how to manage information security."
  },
  {
    "term": "JSON Web Token (JWT)",
    "definition": "An open standard that defines a compact and self-contained way for securely transmitting information. Analyze tokens using our [JWT Inspector](/tools/jwt-inspector)."
  },
  {
    "term": "Keylogger",
    "definition": "A type of surveillance software that has the capability to record every keystroke made to a log file."
  },
  {
    "term": "Malware",
    "definition": "Software that is intentionally designed to cause damage to a computer, server, client, or computer network."
  },
  {
    "term": "Man-in-the-Middle (MitM)",
    "definition": "See Adversary-in-the-Middle (AiTM)."
  },
  {
    "term": "MITRE ATT&CK",
    "definition": "A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations."
  },
  {
    "term": "Multi-Factor Authentication (MFA)",
    "definition": "An authentication method that requires the user to provide two or more verification factors to gain access to a resource."
  },
  {
    "term": "Network Security",
    "definition": "Policies and practices adopted to prevent and monitor unauthorized access, misuse, modification, or denial of a computer network."
  },
  {
    "term": "OAuth",
    "definition": "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites without giving them the passwords."
  },
  {
    "term": "Open Source Intelligence (OSINT)",
    "definition": "Data collected from publicly available sources to be used in an intelligence context."
  },
  {
    "term": "OWASP Top 10",
    "definition": "A standard awareness document for developers and web application security representing a broad consensus about the most critical security risks to web applications."
  },
  {
    "term": "Packet Sniffing",
    "definition": "The practice of gathering, collecting, and logging some or all packets that pass through a computer network."
  },
  {
    "term": "Patch Management",
    "definition": "The process of distributing and applying updates to software."
  },
  {
    "term": "Payload",
    "definition": "The part of transmitted data that is the actual intended message, or in security, the part of the malware that performs a malicious action."
  },
  {
    "term": "Penetration Testing (Pentesting)",
    "definition": "An authorized simulated cyberattack on a computer system, performed to evaluate the security of the system."
  },
  {
    "term": "Phishing",
    "definition": "The fraudulent practice of sending emails purporting to be from reputable companies. Learn more in our [Phishing Attack Lab](/guides/phishing-attack-lab)."
  },
  {
    "term": "Principle of Least Privilege (PoLP)",
    "definition": "The practice of limiting access rights for users to the bare minimum permissions they need to perform their work."
  },
  {
    "term": "Prompt Injection",
    "definition": "A vulnerability in Large Language Models (LLMs) where malicious input manipulates the model into executing unintended instructions."
  },
  {
    "term": "Public Key Infrastructure (PKI)",
    "definition": "A set of roles, policies, hardware, software and procedures needed to create, manage, distribute, use, store and revoke digital certificates."
  },
  {
    "term": "Ransomware",
    "definition": "A type of malware from cryptovirology that threatens to publish the victim's personal data or perpetually block access to it unless a ransom is paid."
  },
  {
    "term": "Red Team",
    "definition": "An independent group that challenges an organization to improve its effectiveness by assuming an adversarial role or point of view."
  },
  {
    "term": "Retrieval-Augmented Generation (RAG)",
    "definition": "An AI framework that improves the quality of LLM responses by grounding the model on external sources of knowledge. RAG pipelines can be vulnerable to data poisoning."
  },
  {
    "term": "Rootkit",
    "definition": "A collection of computer software, typically malicious, designed to enable access to a computer or an area of its software that is not otherwise allowed."
  },
  {
    "term": "Security Information and Event Management (SIEM)",
    "definition": "A solution that provides real-time analysis of security alerts generated by applications and network hardware."
  },
  {
    "term": "Security Operations Center (SOC)",
    "definition": "A centralized unit that deals with security issues on an organizational and technical level."
  },
  {
    "term": "Server-Side Request Forgery (SSRF)",
    "definition": "A web security vulnerability that allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing."
  },
  {
    "term": "Social Engineering",
    "definition": "The psychological manipulation of people into performing actions or divulging confidential information."
  },
  {
    "term": "Spear Phishing",
    "definition": "An email or electronic communications scam targeted towards a specific individual, organization or business."
  },
  {
    "term": "Spoofing",
    "definition": "A situation in which a person or program successfully identifies as another by falsifying data, to gain an illegitimate advantage."
  },
  {
    "term": "SQL Injection (SQLi)",
    "definition": "A code injection technique used to attack data-driven applications. Learn more in our [SQL Injection Tutorial](/guides/sql-injection-tutorial)."
  },
  {
    "term": "Static Application Security Testing (SAST)",
    "definition": "A set of technologies designed to analyze application source code, byte code and binaries for coding and design conditions that are indicative of security vulnerabilities."
  },
  {
    "term": "Symmetric Cryptography",
    "definition": "Algorithms for cryptography that use the same cryptographic keys for both encryption of plaintext and decryption of ciphertext."
  },
  {
    "term": "Threat Hunting",
    "definition": "The proactive search for cyber threats that are lurking undetected in a network."
  },
  {
    "term": "Threat Intelligence",
    "definition": "Information that allows you to understand the threats that have, will, or are currently targeting your organization."
  },
  {
    "term": "Transport Layer Security (TLS)",
    "definition": "A cryptographic protocol designed to provide communications security over a computer network."
  },
  {
    "term": "Trojan Horse",
    "definition": "Any malware which misleads users of its true intent."
  },
  {
    "term": "Virtual Private Network (VPN)",
    "definition": "A mechanism for creating a secure connection to another network over the Internet."
  },
  {
    "term": "Vulnerability Assessment",
    "definition": "The process of identifying, quantifying, and prioritizing (or ranking) the vulnerabilities in a system."
  },
  {
    "term": "Web Application Firewall (WAF)",
    "definition": "A specific form of application firewall that filters, monitors, and blocks HTTP traffic to and from a web service. Detect WAFs using our [WAF Detector](/tools/waf-detector)."
  },
  {
    "term": "Whaling",
    "definition": "A specific kind of malicious hacking within the more general category of phishing, which targets high-profile employees, such as the CEO or CFO."
  },
  {
    "term": "White Hat Hacker",
    "definition": "An ethical computer hacker, or a computer security expert, who specializes in penetration testing and in other testing methodologies."
  },
  {
    "term": "Zero Trust Architecture (ZTA)",
    "definition": "A security concept centered on the belief that organizations should not automatically trust anything inside or outside its perimeters."
  },
  {
    "term": "Zero-Day Vulnerability",
    "definition": "A computer-software vulnerability that is unknown to, or unaddressed by, those who should be interested in mitigating the vulnerability."
  }
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
              <h3 className="text-xl font-bold font-display text-ink mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block"></span>
                {item.term}
              </h3>
              <div className="text-mute text-sm leading-relaxed prose dark:prose-invert prose-cyan prose-p:my-0 prose-a:text-cyan prose-a:no-underline hover:prose-a:underline max-w-none">
                <ReactMarkdown>{item.definition}</ReactMarkdown>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
