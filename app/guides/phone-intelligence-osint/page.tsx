import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Phone Number Intelligence & OSINT Guide | Zentrion',
  description: 'Learn how to perform Phone Intelligence and OSINT. Validate E.164 formats, identify carrier networks (Jio, Airtel, Vi, BSNL), detect line types, and perform advanced reconnaissance.',
  keywords: 'phone osint, phone intelligence, carrier detection, E164 format, phone validation, telecom osint',
};

export default function PhoneIntelligenceGuidePage() {
  return (
    <GuideLayout
      title="Phone Intelligence & OSINT: The Complete Guide"
      description="A deep-dive tutorial on Telecom Intelligence. Learn how to validate E.164 formats, algorithmically detect carrier networks, identify line types, and perform advanced OSINT on phone numbers."
      timeToRead="15 min read"
      lastUpdated="September 2026"
      tags={['OSINT', 'Telecom', 'Intelligence']}
      tools={[
        { name: 'Phone & SIM Intelligence', url: '/tools/network/phone-validator' },
      ]}
      relatedGuides={[
        { title: 'How to Check if Your Email Was Leaked', url: '/guides/email-leak-check' },
        { title: 'Detect Phishing Emails', url: '/guides/detect-phishing-email' },
      ]}
      headings={[
        { id: 'introduction', label: 'What is Phone OSINT?' },
        { id: 'e164', label: 'Understanding E.164 Formatting' },
        { id: 'carrier-detection', label: 'Carrier Detection & Line Types' },
        { id: 'indian-carriers', label: 'Deep Dive: Indian Telecom Networks' },
        { id: 'osint-techniques', label: 'Advanced OSINT Techniques' },
      ]}
    >
      <div className="callout-tool">
        <strong>🛠 Try it now:</strong> <a href="/tools/network/phone-validator">Phone & SIM Intelligence Tool →</a> — Analyze any phone number instantly.
      </div>

      <h2 id="introduction">What is Phone OSINT?</h2>
      <p>Phone Number Open-Source Intelligence (OSINT) is the process of gathering publicly available information connected to a specific phone number. By analyzing a number's structure, routing data, and digital footprint, you can determine:</p>
      <ul>
        <li>Whether the number is valid and currently active.</li>
        <li>The country and specific region of origin.</li>
        <li>The line type (Mobile, Fixed Line, VoIP, Toll-Free).</li>
        <li>The original carrier network (e.g., Vodafone Idea (Vi), Jio, Airtel).</li>
      </ul>

      <h2 id="e164">Understanding E.164 Formatting</h2>
      <p>Before conducting any phone OSINT, you must standardise the number. The global standard is <strong>E.164</strong>.</p>
      <p>E.164 defines a general format for international telephone numbers. The format must include:</p>
      <pre><code>{`+ [Country Code] [National Destination Code] [Subscriber Number]`}</code></pre>
      <p>For example, a US number might look like <code>+14155552671</code>, and an Indian number might look like <code>+919876543210</code>.</p>
      <p>By forcing numbers into E.164 format, OSINT tools can accurately parse the prefix to determine the country and region without ambiguity.</p>

      <h2 id="carrier-detection">Carrier Detection & Line Types</h2>
      <p>Every country allocates blocks of numbers to specific telecom operators. By matching the prefix of a number against international numbering plans (like the ITU-T), we can detect the carrier.</p>
      
      <h3>Line Types</h3>
      <p>Not all numbers are the same. A key part of intelligence is identifying the line type:</p>
      <ul>
        <li><strong>Mobile/SIM:</strong> Standard cellular phones. High value for OSINT because they are often tied directly to a single individual and their 2FA accounts.</li>
        <li><strong>Fixed Line / Landline:</strong> Tied to a physical location (home or business).</li>
        <li><strong>VoIP:</strong> Voice over IP (e.g., Google Voice, Skype). Often used by scammers to mask their true location.</li>
        <li><strong>Toll-Free / Premium:</strong> Corporate or business numbers.</li>
      </ul>

      <div className="callout-warning">
        <strong>⚠️ Note on Mobile Number Portability (MNP):</strong> Carrier detection algorithms identify the <i>original</i> carrier that was allocated the number block. If a user has ported their number to a different network (e.g., from Airtel to Jio), offline algorithms will still show the original network. Live HLR (Home Location Register) lookups are required to detect ported numbers.
      </div>

      <h2 id="indian-carriers">Deep Dive: Indian Telecom Networks</h2>
      <p>India uses the <code>+91</code> country code. Mobile numbers are exactly 10 digits long (excluding the country code). The telecom market is primarily dominated by four major players, and specific prefixes (the first 4 digits) are allocated to them across different telecom circles (states/regions).</p>
      
      <p>Our Phone Intelligence tool can algorithmically identify these networks:</p>
      <ul>
        <li><strong>Reliance Jio:</strong> Typically dominates newer 6xxx, 7xxx, and 8xxx series prefixes.</li>
        <li><strong>Bharti Airtel:</strong> A massive allocation spanning 9xxx, 8xxx, and 7xxx series.</li>
        <li><strong>Vodafone Idea (Vi):</strong> Formed by the merger of Vodafone India and Idea Cellular. Common prefixes include 98xx, 99xx, 89xx, and 77xx.</li>
        <li><strong>BSNL / MTNL:</strong> The state-owned provider. Common prefixes include 94xx (BSNL) and 986x (MTNL).</li>
      </ul>

      <p>If you encounter a number starting with <code>+91 94...</code>, there is a high statistical probability it originated on the BSNL network.</p>

      <h2 id="osint-techniques">Advanced OSINT Techniques</h2>
      <p>Once you have validated a number and identified its carrier and region, you can expand your intelligence gathering:</p>
      
      <h3>1. Social Media Discovery</h3>
      <p>Many users link their phone numbers to their social media accounts for recovery or 2FA. While Facebook and Twitter have restricted direct phone number searches, you can often find connections by:</p>
      <ul>
        <li>Adding the number to your phone's contacts and checking "Sync Contacts" on apps like WhatsApp, Telegram, Snapchat, or Instagram.</li>
        <li>Checking Truecaller or similar caller ID databases.</li>
      </ul>

      <h3>2. Data Breach Lookups</h3>
      <p>Phone numbers are frequently leaked in data breaches (e.g., the 2021 Facebook leak). By querying breach databases, you can often correlate a phone number to an email address, name, or physical address.</p>

      <h3>3. Search Engine Dorking</h3>
      <p>Search for the number using various formats to see if it's listed on public forums, classifieds, or business directories.</p>
      <pre><code>{`# Google Dorks for phone numbers
"9876543210"
"98765 43210"
"987-654-3210"
"+91-9876543210"
intext:"9876543210"`}</code></pre>

      <hr />
      <h3>Practice Lab</h3>
      <p>Use our <a href="/tools/network/phone-validator">Phone & SIM Intelligence Tool</a> to analyze your own phone number. See if the algorithmic detection correctly identifies your carrier and region based on your E.164 prefix!</p>
    </GuideLayout>
  );
}
