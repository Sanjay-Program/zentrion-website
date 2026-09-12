import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Bug Bounty Hunting Tutorial | Zero to Report | Zentrion',
  description: 'Complete bug bounty workflow tutorial. Learn reconnaissance with Amass and Subfinder, vulnerability testing, logic bugs, and how to write a professional report.',
  keywords: 'bug bounty tutorial, bug bounty recon, subfinder, amass, find vulnerabilities, bug bounty guide',
};

export default function BugBountyTutorialPage() {
  return (
    <GuideLayout
      title="Bug Bounty from Zero – Complete Workflow (Recon to Report)"
      description="Learn the exact workflow professional bug bounty hunters use. We cover advanced reconnaissance, content discovery, vulnerability exploitation (SQLi, IDOR, Logic bugs), and report writing."
      timeToRead="35 min read"
      lastUpdated="September 2026"
      tags={['Bug Bounty', 'Web Security', 'Reconnaissance']}
      tools={[
        { name: 'Subdomain Finder', url: '/tools/subdomain-finder' },
        { name: 'GitHub Analyzer', url: '/tools/osint/github-analyzer' }
      ]}
      relatedGuides={[
        { title: 'Google Dorking OSINT', url: '/guides/google-dorking-osint' },
        { title: 'Burp Suite Pentesting', url: '/guides/burp-suite-web-pentesting' }
      ]}
      headings={[
        { id: 'platforms', label: 'Bug Bounty Platforms' },
        { id: 'recon', label: 'Step 1: Reconnaissance' },
        { id: 'discovery', label: 'Step 2: Content Discovery' },
        { id: 'testing', label: 'Step 3: Vulnerability Testing' },
        { id: 'logic', label: 'Step 4: Logic Bugs' },
        { id: 'report', label: 'Step 5: Report Writing' },
        { id: 'lab', label: 'Practice Targets' }
      ]}
    >
      <h2 id="platforms">Bug Bounty Platforms</h2>
      <p>Companies pay independent researchers to find security vulnerabilities before malicious hackers do. Top earners make six figures. Start by registering on these free platforms:</p>
      <ul>
        <li><strong>HackerOne</strong>: The largest platform. Start with their Hacker101 CTF to get private invites.</li>
        <li><strong>Bugcrowd</strong>: Excellent platform with diverse targets (Web, IoT, API, Mobile).</li>
        <li><strong>Intigriti</strong>: Rapidly growing European platform with great community support.</li>
      </ul>

      <h2 id="recon">Step 1: Reconnaissance (The Most Important Phase)</h2>
      <p>You cannot hack what you cannot see. Effective recon expands your attack surface, giving you targets other hackers missed.</p>

      <h3>Subdomain Enumeration</h3>
      <p>Combine multiple tools to get a complete picture of the target's infrastructure.</p>
      <pre><code>{`# 1. Passive collection with Subfinder
subfinder -d example.com -all -o subs.txt

# 2. Passive collection with Amass
amass enum -passive -d example.com -o amass_subs.txt

# 3. Combine and deduplicate
cat subs.txt amass_subs.txt | sort -u > all_subs.txt

# 4. Check which subdomains actually resolve/respond using httpx
httpx -l all_subs.txt -o alive_subs.txt`}</code></pre>

      <h3>Wayback Machine (Historical URLs)</h3>
      <p>Old APIs and forgotten endpoints are often highly vulnerable. Scrape historical data.</p>
      <pre><code>{`# Extract URLs using waybackurls
waybackurls example.com | sort -u > wayback_urls.txt

# Extract using gau (Get All URLs)
gau --subs example.com | sort -u > gau_urls.txt`}</code></pre>

      <h2 id="discovery">Step 2: Content Discovery</h2>
      <p>Now that you have alive hosts, you need to find hidden files, directories, and parameters.</p>

      <h3>Directory Brute Force (ffuf)</h3>
      <pre><code>{`# Fuzz directories using ffuf (Fast Web Fuzzer)
# We filter out 404 (Not Found) responses
ffuf -u https://example.com/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -fc 404`}</code></pre>

      <h3>JavaScript Analysis</h3>
      <p>Modern Web Apps (React/Angular/Vue) pack logic and endpoints into JS files. Download them and search for secrets or hidden API routes.</p>
      <pre><code>{`# Use LinkFinder to extract endpoints from JS files
python3 linkfinder.py -i https://example.com`}</code></pre>

      <h2 id="testing">Step 3: Vulnerability Testing</h2>
      
      <h3>IDOR (Insecure Direct Object Reference)</h3>
      <p>The most common high-paying bug. Look for IDs in URLs, POST bodies, and headers.</p>
      <pre><code>{`# Example Target:
GET /api/orders/123

# Testing Methodology (while logged in as User A):
1. Change 123 -> 124 (Access someone else's order)
2. Change to 0 or -1 (Boundary testing)
3. Change to UUID format if predictable
# If you can view/edit User B's data, you found an IDOR.`}</code></pre>

      <h3>Race Conditions</h3>
      <p>Can you redeem a one-time coupon multiple times? Send 50 requests simultaneously.</p>
      <pre><code>{`# Example bash loop for simple Race Condition testing
for i in $(seq 1 50); do
  curl -s -X POST "https://example.com/api/redeem_coupon" \\
    -H "Content-Type: application/json" \\
    -d '{"code":"WELCOME10"}' &
done
wait`}</code></pre>

      <h2 id="logic">Step 4: Logic Bugs</h2>
      <p>These bypass automated scanners entirely and pay the highest bounties. Think about how the application <em>should</em> behave, and do the opposite.</p>
      <ul>
        <li><strong>Price manipulation:</strong> Can you intercept a cart checkout and change the item price to $0.01?</li>
        <li><strong>Quantity manipulation:</strong> What happens if you order <code>-1</code> items? Does it refund your account?</li>
        <li><strong>Coupon stacking:</strong> Apply multiple 10% off coupons until the price is zero.</li>
        <li><strong>Account takeover via OAuth:</strong> What if you register with a victim's email using a different OAuth provider (e.g., Apple Login instead of Google)?</li>
      </ul>

      <h2 id="report">Step 5: Report Writing</h2>
      <p>A bad report means your bug gets closed as "Not Applicable". Always include a clear summary, steps to reproduce, and impact.</p>
      
      <pre><code>{`Title: [Vulnerability Type] in [Component] e.g. IDOR in /api/v1/invoices

Severity: High

Summary:
The /api/v1/invoices endpoint lacks authorization checks. An attacker can view any user's invoice by incrementing the 'invoice_id' parameter.

Steps to Reproduce:
1. Log in as Attacker (User A).
2. Intercept the request to download an invoice: GET /api/v1/invoices?invoice_id=100
3. Modify 'invoice_id' to 101 (belonging to Victim User B).
4. Observe the server returns User B's private invoice PDF.

Impact:
An attacker can script this vulnerability to exfiltrate all financial invoices from the platform, leading to a massive PII data breach.

Proof of Concept:
[Insert Video/Screenshot Link Here]`}</code></pre>

      <h2 id="lab">Practice Targets (Legal Environments)</h2>
      <p>Never test on sites without a bug bounty program or explicit permission. Use these free platforms to practice:</p>
      <ul>
        <li><a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger Academy</a></li>
        <li><a href="https://github.com/OWASP/NodeGoat" target="_blank" rel="noopener noreferrer">OWASP NodeGoat</a></li>
        <li><a href="https://github.com/bkimminich/juice-shop" target="_blank" rel="noopener noreferrer">OWASP Juice Shop</a></li>
      </ul>
    </GuideLayout>
  );
}
