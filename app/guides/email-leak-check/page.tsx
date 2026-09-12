import GuideLayout from '@/components/GuideLayout';
export default function EmailLeakCheckPage() {
  return (
    <GuideLayout
      title="How to Check if Your Email Has Been in a Data Breach"
      description="Check if your email has been leaked in a data breach using Have I Been Pwned, CLI tools, and email security record verification."
      timeToRead="8 min read" lastUpdated="September 2026"
      tags={['Data Breach', 'Email Security', 'HIBP', 'SPF/DKIM/DMARC']}
      tools={[{name:'SPF Checker',url:'/tools/spf-checker'},{name:'DMARC Checker',url:'/tools/dmarc-checker'},{name:'MX Lookup',url:'/tools/mx-lookup'}]}
      relatedGuides={[{title:'How to Detect Phishing Emails',url:'/guides/detect-phishing-email'},{title:'How to Check DNS Records',url:'/guides/check-dns-records'}]}
      headings={[{id:'why',label:'Why This Matters'},{id:'hibp',label:'1. Check HIBP'},{id:'email-security',label:'2. SPF/DKIM/DMARC'},{id:'headers',label:'3. Analyse Email Headers'},{id:'compromised',label:'4. If Compromised'}]}
    >
      <h2 id="why">Why This Matters</h2>
      <p>Over 10 billion email addresses have been exposed in data breaches since 2013. If your email is in a breach database, attackers may try credential stuffing attacks against your accounts using leaked passwords.</p>
      <h2 id="hibp">Step 1: Check Known Breaches</h2>
      <ul>
        <li><a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">Have I Been Pwned</a> — Enter your email to search 13B+ accounts across 800+ breaches</li>
        <li><a href="https://github.com/khast3x/h8mail" target="_blank" rel="noopener noreferrer">h8mail</a> — 100% Free and Open-Source OSINT CLI tool for finding email leaks</li>
      </ul>
      <pre><code>{`# Install h8mail (Open Source Lab)
pip3 install h8mail

# Run a basic search against an email (no API keys required for basic search)
h8mail -t target@example.com`}</code></pre>
      <pre><code>{`# Check password exposure (k-anonymity, no email needed)
# Hash your password with SHA-1 first, then check first 5 chars:
echo -n "YourPassword" | sha1sum | head -c 5
# Use the first 5 chars in:
curl -s "https://api.pwnedpasswords.com/range/FIRST5CHARS"
# Count occurrences after the colon on matching line

# Using HIBP API (requires free API key from haveibeenpwned.com)
curl -s -H "hibp-api-key: YOUR_API_KEY" \\
  "https://api.haveibeenpwned.com/v3/breachedaccount/YOUR_EMAIL"`}</code></pre>
      <h2 id="email-security">Step 2: Check Your Domain's Email Security</h2>
      <div className="callout-tool"><strong>🛠 Try Our Tools:</strong> <a href="/tools/spf-checker">SPF Checker</a> · <a href="/tools/dmarc-checker">DMARC Checker</a></div>
      <pre><code>{`# Check SPF record (prevents email spoofing)
dig TXT yourdomain.com +short | grep "v=spf1"
nslookup -type=TXT yourdomain.com

# Check DMARC policy
dig TXT _dmarc.yourdomain.com +short

# Check DKIM (replace 'selector' with your actual selector)
dig TXT selector._domainkey.yourdomain.com

# Check MTA-STS (email transport security)
dig TXT _mta-sts.yourdomain.com`}</code></pre>
      <h2 id="headers">Step 3: Analyse Suspicious Email Headers</h2>
      <pre><code>{`# Save email as raw .eml file, then:
grep -i "received:" email_raw.txt | head -20
grep -i "return-path:" email_raw.txt
grep -i "from:" email_raw.txt
grep -i "authentication-results:" email_raw.txt

# Check SPF/DKIM/DMARC alignment in header
grep -i "spf=" email_raw.txt
grep -i "dkim=" email_raw.txt
grep -i "dmarc=" email_raw.txt
# All should show "pass" for legitimate emails`}</code></pre>
      <h2 id="compromised">Step 4: What To Do If You're Compromised</h2>
      <ol>
        <li>Change password immediately on the breached service</li>
        <li>Enable 2FA — generate a TOTP code with our <a href="/tools/otp-generator">OTP Generator</a></li>
        <li>Check bank and financial accounts for suspicious activity</li>
        <li>Report to <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">Cyber Crime Portal India</a> or <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer">FBI IC3 (US)</a></li>
      </ol>
    </GuideLayout>
  );
}
