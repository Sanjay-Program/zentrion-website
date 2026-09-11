import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Check if Your Website Has Been Hacked (2026)',
  description: 'Step-by-step guide to check if your website is hacked. Find malicious redirects, web shells, suspicious PHP functions, and outbound connections with CLI commands.',
  keywords: 'website hacked check, how to check if website is hacked, malicious redirect check, web shell detection',
};

export default function CheckIfWebsiteHackedPage() {
  return (
    <GuideLayout
      title="How to Check if Your Website Has Been Hacked (2026)"
      description="A complete step-by-step guide to detecting website compromises — from checking for malicious redirects to finding web shells and suspicious outbound connections."
      timeToRead="10 min read"
      lastUpdated="September 2026"
      tags={['Website Security', 'Malware Detection', 'Incident Response']}
      tools={[
        { name: 'URL Safety Checker', url: '/tools/url-safety' },
        { name: 'WAF Detector', url: '/tools/waf-detector' },
        { name: 'HTTP Headers Checker', url: '/tools/http-headers' },
        { name: 'Certificate Decoder', url: '/tools/certificate-decoder' },
      ]}
      relatedGuides={[
        { title: 'How to Check if a Website is Safe', url: '/guides/check-website-safe' },
        { title: 'How to Detect Phishing Emails', url: '/guides/detect-phishing-email' },
        { title: 'Nmap Scanning Tutorial', url: '/guides/nmap-scanning-tutorial' },
      ]}
      headings={[
        { id: 'signs', label: '⚠️ Warning Signs' },
        { id: 'check-redirects', label: '1. Check for Redirects' },
        { id: 'web-shells', label: '2. Find Web Shells' },
        { id: 'safe-browsing', label: '3. Google Safe Browsing' },
        { id: 'ssl-check', label: '4. Check SSL Certificate' },
        { id: 'outbound', label: '5. Outbound Connections' },
        { id: 'prevention', label: '✅ Prevention Checklist' },
      ]}
    >
      <h2 id="signs">⚠️ Warning Signs Your Site May Be Compromised</h2>
      <ul>
        <li>Unexpected redirects to spam or malware sites</li>
        <li>New admin accounts you didn't create</li>
        <li>Google Search Console showing "Site has been hacked"</li>
        <li>Unusual traffic spikes or server CPU usage</li>
        <li>New <code>&lt;iframe&gt;</code> tags or <code>eval()</code> calls injected in HTML</li>
        <li>Modified files with recent timestamps you didn't edit</li>
        <li>Visitors reporting antivirus warnings when visiting your site</li>
      </ul>

      <h2 id="check-redirects">Step 1: Check for Malicious Redirects</h2>
      <div className="callout-tool">
        <strong>🛠 Try Our Tool:</strong> <a href="/tools/url-safety">URL Safety Checker →</a> — Checks your URL against URLhaus and PhishTank instantly.
      </div>
      <p>Run these commands from your terminal to check for suspicious HTTP redirects:</p>
      <pre><code>{`# Check HTTP response headers for redirects
curl -I https://yourdomain.com
curl -I https://www.yourdomain.com

# Follow redirects and show each hop
curl -L -v https://yourdomain.com 2>&1 | grep "Location:"

# Check for injected iframes (common malware payload)
curl -s https://yourdomain.com | grep -i "iframe"

# Check for obfuscated JavaScript
curl -s https://yourdomain.com | grep -i "eval("
curl -s https://yourdomain.com | grep -i "document.write"

# Check for suspicious base64 encoding (common in PHP malware)
curl -s https://yourdomain.com | grep -oP "base64_decode\\(|atob\\("`}</code></pre>

      <h2 id="web-shells">Step 2: Find Web Shells on Your Server</h2>
      <div className="callout-warn">
        <strong>⚠️ Note:</strong> Run these commands on your server via SSH or in your hosting control panel's terminal.
      </div>
      <pre><code>{`# Find PHP files modified more recently than your index file
find /var/www -name "*.php" -newer /var/www/index.html 2>/dev/null

# Look for common web shell filenames
find /var/www -name "shell.php" -o -name "cmd.php" -o -name "backdoor.php" -o -name "c99.php"

# Search for suspicious PHP functions in all files
grep -rl "eval(" /var/www/ 2>/dev/null
grep -rl "base64_decode" /var/www/ 2>/dev/null
grep -rl "system(" /var/www/ 2>/dev/null
grep -rl "exec(" /var/www/ 2>/dev/null
grep -rl "passthru(" /var/www/ 2>/dev/null

# Find recently modified files (last 7 days)
find /var/www -name "*.php" -mtime -7 2>/dev/null`}</code></pre>

      <h2 id="safe-browsing">Step 3: Check Google Safe Browsing Status</h2>
      <p>Google flags websites known to distribute malware. Check your site's status:</p>
      <ul>
        <li>Visit <a href="https://transparencyreport.google.com/safe-browsing/search" target="_blank" rel="noopener noreferrer">Google Transparency Report</a> and enter your domain</li>
        <li>Check <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Google Search Console → Security Issues</a></li>
        <li>Use <a href="https://sitecheck.sucuri.net/" target="_blank" rel="noopener noreferrer">Sucuri SiteCheck</a> for a free malware scan</li>
      </ul>
      <pre><code>{`# API check (requires a free Google API key)
curl -s "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"threatTypes":["MALWARE","SOCIAL_ENGINEERING"],"platformTypes":["ANY_PLATFORM"],"threatEntryTypes":["URL"],"threatEntries":[{"url":"https://yourdomain.com"}]}'`}</code></pre>

      <h2 id="ssl-check">Step 4: Check Your SSL Certificate</h2>
      <div className="callout-tool">
        <strong>🛠 Try Our Tool:</strong> <a href="/tools/certificate-decoder">Certificate Decoder →</a>
      </div>
      <pre><code>{`# View full certificate details
openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -text -noout

# Check certificate expiry (exit 0 = valid, exit 1 = expires within 24h)
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -checkend 86400

# Check who issued the certificate
openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -issuer -noout

# Check the certificate's Subject (should match your domain)
openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -subject -noout`}</code></pre>

      <h2 id="outbound">Step 5: Check for Suspicious Outbound Connections</h2>
      <p>Malware often establishes reverse shells or C2 (command-and-control) connections to attacker servers:</p>
      <pre><code>{`# See all established outbound connections from your server
netstat -anp | grep ESTABLISHED
ss -tnp | grep ESTABLISHED

# Look for reverse shells (common attacker ports)
netstat -anp | grep -E ":(4444|31337|1337|6666|9001|8888)"

# Check which processes are making network connections
lsof -i -n -P | grep ESTABLISHED

# Look for unusual listening ports
netstat -tlnp | grep -v -E "(80|443|22|25|3306)"
ss -tlnp | grep -v -E "(80|443|22|25|3306)"`}</code></pre>

      <h2 id="prevention">✅ Prevention Checklist</h2>
      <ul>
        <li>Keep your CMS (WordPress, Drupal, etc.) and all plugins updated</li>
        <li>Use strong unique passwords — generate one: <a href="/tools/password-generator">Password Generator →</a></li>
        <li>Enable 2FA on all admin accounts using <a href="/tools/otp-generator">our TOTP Generator</a></li>
        <li>Use a Web Application Firewall (WAF) — check yours with our <a href="/tools/waf-detector">WAF Detector</a></li>
        <li>Set up file integrity monitoring (inotifywait, OSSEC, or Wordfence)</li>
        <li>Take daily automated off-site backups</li>
        <li>Run <code>find /var/www -name "*.php" -mtime -1</code> daily via cron</li>
        <li>Review your <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Google Search Console</a> weekly</li>
      </ul>

      <hr />
      <h3>External Resources</h3>
      <ul>
        <li><a href="https://transparencyreport.google.com/safe-browsing/search" target="_blank" rel="noopener noreferrer">Google Safe Browsing Transparency Report</a></li>
        <li><a href="https://www.virustotal.com/gui/home/url" target="_blank" rel="noopener noreferrer">VirusTotal URL Scanner</a></li>
        <li><a href="https://sitecheck.sucuri.net/" target="_blank" rel="noopener noreferrer">Sucuri SiteCheck (free malware scanner)</a></li>
        <li><a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener noreferrer">Qualys SSL Labs Test</a></li>
      </ul>
    </GuideLayout>
  );
}
