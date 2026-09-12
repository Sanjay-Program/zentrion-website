import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Phishing Attack Lab | Gophish & SET Tutorial | Zentrion',
  description: 'Learn how to build a complete phishing attack lab using Gophish and the Social-Engineer Toolkit (SET) for security awareness training and credential harvesting.',
  keywords: 'phishing attack tutorial, gophish guide, social engineer toolkit, setoolkit, credential harvesting, phishing simulation',
};

export default function PhishingAttackLabPage() {
  return (
    <GuideLayout
      title="Phishing Attack Lab – Gophish + SET (Complete Guide)"
      description="Learn how to build, launch, and analyze a complete phishing campaign. We use Gophish for email delivery and tracking, and the Social-Engineer Toolkit (SET) for cloning login portals to harvest credentials."
      timeToRead="25 min read"
      lastUpdated="September 2026"
      tags={['Social Engineering', 'Red Teaming', 'Phishing']}
      tools={[
        { name: 'SPF Checker', url: '/tools/spf-checker' },
        { name: 'DMARC Checker', url: '/tools/dmarc-checker' }
      ]}
      relatedGuides={[
        { title: 'Detect Phishing Emails', url: '/guides/detect-phishing-email' },
        { title: 'Email Leak Check', url: '/guides/email-leak-check' }
      ]}
      headings={[
        { id: 'ethics', label: 'Ethics Warning' },
        { id: 'gophish', label: 'Part 1: Gophish (Email Delivery)' },
        { id: 'setoolkit', label: 'Part 2: SET (Site Cloning)' },
        { id: 'analysis', label: 'Part 3: Monitoring & Analysis' },
        { id: 'prevention', label: 'Defending Against Phishing' }
      ]}
    >
      <div className="callout-warning">
        <strong>⚠️ STRICT ETHICS WARNING:</strong> This guide is for educational purposes, security awareness training, and authorized Red Team engagements ONLY. Conducting phishing campaigns against individuals or organizations without explicit, written consent is illegal.
      </div>

      <h2 id="ethics">What You'll Build</h2>
      <p>A complete, end-to-end phishing campaign simulation:</p>
      <ul>
        <li><strong>Gophish:</strong> To manage target lists, send the emails, and track open/click rates.</li>
        <li><strong>SET (Social-Engineer Toolkit):</strong> To instantly clone a legitimate website (e.g., Microsoft Login) and capture submitted credentials.</li>
      </ul>

      <h2 id="gophish">Part 1: Gophish (Email Delivery & Tracking)</h2>
      <p>Gophish is an open-source phishing framework designed for businesses and penetration testers.</p>

      <h3>1. Installation</h3>
      <pre><code>{`# Download and run Gophish on a Linux server
wget https://github.com/gophish/gophish/releases/download/v0.12.1/gophish-v0.12.1-linux-64bit.zip
unzip gophish-v0.12.1-linux-64bit.zip
chmod +x gophish
sudo ./gophish

# Access the admin dashboard at: https://localhost:3333
# (Check the terminal output for the default admin password)`}</code></pre>

      <h3>2. Campaign Setup</h3>
      <ol>
        <li><strong>Sending Profile:</strong> Configure your SMTP server. Use a realistic "From" address (e.g., <code>IT Support &lt;it@company-portal.com&gt;</code>).</li>
        <li><strong>Audience:</strong> Upload a CSV of your target users (Name, Email).</li>
        <li><strong>Landing Page:</strong> This is where users are directed when they click the link. You can import a site directly or write custom HTML. Ensure you include the Gophish tracking tag: <code>{'{{.URL}}'}</code>.</li>
        <li><strong>Email Template:</strong> Draft the phishing email. Create a sense of urgency (e.g., "Password Expiry in 24 Hours"). Use variables like <code>{'{{.FirstName}}'}</code> to personalize the attack.</li>
      </ol>

      <h2 id="setoolkit">Part 2: SET (Site Cloning & Credential Harvesting)</h2>
      <p>While Gophish handles the emails, the Social-Engineer Toolkit (SET) excels at cloning websites perfectly to trick users into entering their passwords.</p>

      <h3>1. Installation & Launch</h3>
      <pre><code>{`# Install SET (Pre-installed on Kali Linux)
sudo apt install setoolkit

# Launch the toolkit
sudo setoolkit`}</code></pre>

      <h3>2. The Credential Harvester Attack</h3>
      <p>Follow the interactive menu in SET to clone a target site:</p>
      <pre><code>{`# Menu Selection Sequence:
Select: (1) Social-Engineering Attacks
Select: (2) Website Attack Vectors
Select: (3) Credential Harvester Attack Method
Select: (2) Site Cloner

# Configuration:
IP address for the POST back in Harvester/Tabnabbing: [Enter your attacking IP]
Enter the url to clone: https://login.microsoftonline.com`}</code></pre>
      <p>SET will now download the HTML, CSS, and JS of the Microsoft login page, modify the forms to point back to your server, and start an Apache web server on port 80. Anyone visiting your IP will see a perfect clone of Microsoft.</p>
      <p><em>Integration: Point your Gophish email links to this SET server IP.</em></p>

      <h2 id="analysis">Part 3: Monitoring & Analysis</h2>
      <p>Once the campaign is launched, monitor the Gophish dashboard. It will track the funnel in real-time:</p>
      <ul>
        <li><strong>Email Sent:</strong> Successfully delivered via SMTP.</li>
        <li><strong>Email Opened:</strong> Triggered via a 1x1 invisible tracking pixel.</li>
        <li><strong>Link Clicked:</strong> The user clicked the malicious URL.</li>
        <li><strong>Submitted Data (SET):</strong> If the user entered their password on the cloned site, SET will log the credentials in <code>/var/log/setoolkit/</code> (or displayed directly in the terminal).</li>
      </ul>

      <h2 id="prevention">Defending Against Phishing</h2>
      <p>As a defender, use this knowledge to implement technical controls:</p>
      <ul>
        <li><strong>FIDO2 / Hardware Security Keys (YubiKey):</strong> The only phishing-proof MFA. Standard TOTP (Google Authenticator) can easily be stolen using proxy tools like Evilginx2.</li>
        <li><strong>Email Authentication:</strong> Ensure your domain has strict SPF, DKIM, and DMARC policies (<code>p=reject</code>) to prevent attackers from spoofing your internal emails. Check your domain with our <a href="/tools/dmarc-checker">DMARC Checker</a>.</li>
        <li><strong>Endpoint Detection:</strong> Implement EDR to block execution of malicious payloads if the user downloads an attachment instead of a credential harvester.</li>
      </ul>
    </GuideLayout>
  );
}
