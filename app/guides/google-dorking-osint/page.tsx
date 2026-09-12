import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Google Dorking & OSINT Tutorial | Zentrion',
  description: 'Learn Google Dorking with 100+ advanced search operators. Find exposed credentials, open directories, and vulnerable admin panels using free OSINT tools.',
  keywords: 'google dorking tutorial, osint tutorial, open source intelligence, google dorks list, find exposed files',
};

export default function GoogleDorkingPage() {
  return (
    <GuideLayout
      title="Google Dorking & OSINT – 100+ Dorks That Expose Everything"
      description="A massive masterclass on Google Dorking and Open Source Intelligence (OSINT). Learn to uncover hidden admin panels, exposed credentials, and sensitive files using advanced search operators and free CLI tools."
      timeToRead="25 min read"
      lastUpdated="September 2026"
      tags={['OSINT', 'Reconnaissance', 'Beginner']}
      tools={[
        { name: 'Username Finder', url: '/tools/osint/username-finder' },
        { name: 'GitHub Analyzer', url: '/tools/osint/github-analyzer' }
      ]}
      relatedGuides={[
        { title: 'Bug Bounty from Zero', url: '/guides/bug-bounty-tutorial' },
        { title: 'Phone OSINT & Intelligence', url: '/guides/phone-intelligence-osint' }
      ]}
      headings={[
        { id: 'what-is-dorking', label: 'What is Google Dorking?' },
        { id: 'operators', label: 'Basic Operators' },
        { id: '100-dorks', label: '100+ Dorks by Category' },
        { id: 'tools', label: 'Free OSINT CLI Tools' },
        { id: 'lab', label: 'Hands-On OSINT Lab' }
      ]}
    >
      <h2 id="what-is-dorking">What is Google Dorking?</h2>
      <p>Google Dorking (also known as Google Hacking) is the practice of using advanced search engine operators to uncover sensitive information that was unintentionally exposed on the public internet. Because Google’s crawlers index nearly everything, they often capture backup files, database dumps, passwords, and hidden administrative portals.</p>

      <h2 id="operators">Basic Operators (Learn These First)</h2>
      <p>Before diving into the massive list of dorks, you must understand the basic building blocks:</p>
      <pre><code>{`# Search for an exact phrase
"site:example.com"

# Restrict search to a specific domain or TLD
site:example.com
site:.gov

# Restrict search to a specific file extension
site:example.com filetype:pdf

# Search for keywords within the URL itself
intitle:"login"
inurl:admin

# Exclude a specific term (using the minus sign)
site:example.com -login

# Search for sites related to a specific domain
related:example.com

# Time-bound searches
site:example.com after:2025-01-01 before:2025-06-01`}</code></pre>

      <h2 id="100-dorks">100+ Dorks by Category</h2>
      
      <h3>🔓 Exposed Login/Admin Panels (High Risk)</h3>
      <pre><code>{`site:example.com inurl:admin
site:example.com inurl:login
site:example.com inurl:admin.php
site:example.com "admin panel"
site:example.com inurl:wp-admin
site:example.com inurl:administrator
site:example.com inurl:console
site:example.com inurl:dashboard
site:example.com inurl:manager
site:example.com inurl:control-panel
site:example.com intitle:"index of" admin
site:example.com inurl:phpmyadmin
site:example.com inurl:adminer
site:example.com inurl:webadmin
site:example.com inurl:backdoor`}</code></pre>

      <h3>📄 Exposed Sensitive Files</h3>
      <pre><code>{`site:example.com filetype:pdf "confidential"
site:example.com filetype:doc "password"
site:example.com filetype:xls "credentials"
site:example.com filetype:csv "password"
site:example.com filetype:txt "config"
site:example.com filetype:log
site:example.com filetype:sql
site:example.com filetype:zip "backup"
site:example.com filetype:bak
site:example.com filetype:old
site:example.com filetype:cfg
site:example.com filetype:conf
site:example.com filetype:ini
site:example.com filetype:env
site:example.com filetype:json "password"
site:example.com filetype:xml "password"
site:example.com filetype:yml "secret"
site:example.com filetype:properties "password"
site:example.com "wp-config.php"
site:example.com ".env"
site:example.com "config.php"
site:example.com "database.yml"
site:example.com "settings.py"`}</code></pre>

      <h3>🔑 Exposed Credentials & Keys</h3>
      <pre><code>{`site:example.com "api_key"
site:example.com "secret_key"
site:example.com "password" "admin"
site:example.com "root" "password"
site:example.com "AWS_ACCESS_KEY"
site:example.com "AKIA"
site:example.com "private_key"
site:example.com "BEGIN RSA PRIVATE KEY"
site:example.com "BEGIN OPENSSH PRIVATE KEY"
site:example.com "password=" "user="
site:example.com intitle:"index of" .env
site:example.com "DB_PASSWORD"`}</code></pre>

      <h3>🌐 Exposed Databases & APIs</h3>
      <pre><code>{`site:example.com inurl:phpmyadmin
site:example.com inurl:adminer
site:example.com inurl:api
site:example.com inurl:swagger
site:example.com inurl:graphql
site:example.com inurl:actuator
site:example.com inurl:debug
site:example.com inurl:trace
site:example.com inurl:metrics
site:example.com inurl:health`}</code></pre>

      <h3>📁 Directory Traversal / Index of</h3>
      <pre><code>{`site:example.com intitle:"index of"
site:example.com intitle:"index of" .git
site:example.com intitle:"index of" backup
site:example.com intitle:"index of" old
site:example.com intitle:"index of" temp
site:example.com intitle:"index of" upload
site:example.com intitle:"index of" files
site:example.com intitle:"index of" data
site:example.com intitle:"index of" private
site:example.com intitle:"index of" internal`}</code></pre>

      <h3>🏢 Corporate Recon</h3>
      <pre><code>{`site:example.com "network" "diagram"
site:example.com "architecture" "design"
site:example.com "internal" "documentation"
site:example.com "meeting" "minutes"
site:example.com "password" "reset"
site:example.com "vpn" "login"
site:example.com "sso" "login"
site:example.com "oauth" "callback"
site:example.com "saml" "metadata"
site:example.com "ldap" "directory"`}</code></pre>

      <h2 id="tools">Free OSINT CLI Tools</h2>
      <p>Manual Google searching is just the start. Advanced analysts use automated CLI tools to scrape data in bulk. Here are the industry standards (all 100% free):</p>

      <h3>1. theHarvester (Emails, Subdomains, IPs)</h3>
      <p>theHarvester is a simple yet powerful tool designed to gather emails, subdomains, hosts, employee names, open ports, and banners from different public sources like search engines, PGP key servers and SHODAN computer database.</p>
      <pre><code>{`# Install on Debian/Ubuntu
sudo apt install theharvester

# Basic harvest from multiple search engines
theHarvester -d example.com -b google,bing,duckduckgo

# Target LinkedIn specifically to find employee names
theHarvester -d example.com -b linkedin

# Save results to an HTML file for reporting
theHarvester -d example.com -b all -f report.html`}</code></pre>

      <h3>2. Subfinder (Subdomain Enumeration)</h3>
      <p>Subfinder is a subdomain discovery tool that discovers valid subdomains for websites by using passive online sources. It has a simple architecture and is optimized for speed.</p>
      <pre><code>{`# Install via Go
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Basic enumeration
subfinder -d example.com

# Aggressive mode querying all available APIs and outputting to file
subfinder -d example.com -all -recursive -o subs.txt`}</code></pre>

      <h3>3. Amass (Advanced Network Recon)</h3>
      <p>The OWASP Amass Project performs network mapping of attack surfaces and external asset discovery using open source information gathering and active reconnaissance techniques.</p>
      <pre><code>{`# Install via Go
go install -v github.com/owasp-amass/amass/v4/...

# Passive enumeration (no direct traffic to target)
amass enum -passive -d example.com

# Active enumeration (will send traffic to target)
amass enum -active -d example.com

# Attempt DNS brute forcing
amass enum -d example.com -brute`}</code></pre>

      <h2 id="lab">Hands-On OSINT Lab</h2>
      <p>Time to put this into practice legally. Use the following resources to test your Dorking skills safely.</p>
      <ul>
        <li><strong>Practice on yourself:</strong> Search for your own name, phone number, or handle using quotes (e.g. <code>"John Doe" "City"</code>) to see what public footprint you leave behind.</li>
        <li><strong>Analyze Open Repositories:</strong> Use the <a href="https://github.com/djadmin/o-dork" target="_blank" rel="noopener noreferrer">O-Dork Repository</a> which contains curated lists of working dorks.</li>
        <li><strong>Explore the GHDB:</strong> The <a href="https://www.exploit-db.com/google-hacking-database" target="_blank" rel="noopener noreferrer">Google Hacking Database (GHDB)</a> is the authoritative source for new dorks.</li>
        <li><strong>Visual Link Analysis:</strong> Download the free <a href="https://www.maltego.com/download/" target="_blank" rel="noopener noreferrer">Maltego Community Edition</a> to graph relationships between domains, IPs, and people visually.</li>
      </ul>

    </GuideLayout>
  );
}
