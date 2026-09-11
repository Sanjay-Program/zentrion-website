import GuideLayout from '@/components/GuideLayout';
export default function DetectPhishingEmailPage() {
  return (
    <GuideLayout
      title="How to Detect Phishing Emails – 5-Step Guide"
      description="Learn to spot phishing emails by checking sender addresses, analysing headers, verifying URLs, and testing SPF/DKIM/DMARC alignment with CLI commands."
      timeToRead="10 min read" lastUpdated="September 2026"
      tags={['Phishing', 'Email Security', 'Social Engineering']}
      tools={[{name:'URL Safety Checker',url:'/tools/url-safety'},{name:'SPF Checker',url:'/tools/spf-checker'},{name:'DMARC Checker',url:'/tools/dmarc-checker'},{name:'DNS Lookup',url:'/tools/dns-lookup'}]}
      relatedGuides={[{title:'How to Check Email Breach',url:'/guides/email-leak-check'},{title:'How to Check DNS Records',url:'/guides/check-dns-records'}]}
      headings={[{id:'flag1',label:'1. Sender Address'},{id:'flag2',label:'2. Check Links'},{id:'flag3',label:'3. Urgency/Fear Language'},{id:'flag4',label:'4. Grammar Errors'},{id:'flag5',label:'5. Email Headers'},{id:'clicked',label:'If You Clicked'}]}
    >
      <div className="callout-warn"><strong>⚠️ Key Rule:</strong> Never click suspicious links. Copy the URL and check it with our <a href="/tools/url-safety">URL Safety Checker →</a></div>
      <h2 id="flag1">Red Flag 1: Suspicious Sender Address</h2>
      <p>The display name can be anything — always check the actual email address in angle brackets.</p>
      <pre><code>{`# Open Gmail: Click the three dots → "Show original"
# Look for Return-Path and Received headers

# Key checks:
# ✅ From: support@paypal.com       ← legitimate
# ❌ From: support@paypa1.com       ← phishing (1 not l)
# ❌ From: paypal@gmail.com         ← never a company email
# ❌ Return-Path: bounce@randomdomain.xyz  ← mismatch = suspicious`}</code></pre>
      <h2 id="flag2">Red Flag 2: Suspicious Links</h2>
      <pre><code>{`# Check domain age (newly registered = suspicious)
whois suspicious-domain.com | grep -i "creation date"

# Check if domain resolves unexpectedly
dig A suspicious-domain.com +short

# Check against URLhaus threat database
curl -s "https://urlhaus-api.abuse.ch/v1/url/" \\
  -d "url=https://suspicious-domain.com"

# Check SSL issuer (legitimate banks don't use free CAs on login pages... usually)
openssl s_client -connect suspicious-domain.com:443 2>/dev/null \\
  | openssl x509 -issuer -noout`}</code></pre>
      <h2 id="flag3">Red Flag 3: Urgency &amp; Fear Language</h2>
      <ul>
        <li>"Your account will be suspended in 24 hours"</li>
        <li>"Immediate action required"</li>
        <li>"Verify your identity now or lose access"</li>
        <li>"Unusual sign-in activity detected"</li>
      </ul>
      <p>Legitimate companies give you time. Artificial urgency is a hallmark of phishing.</p>
      <h2 id="flag4">Red Flag 4: Grammar &amp; Spelling Errors</h2>
      <p>Enterprise companies have dedicated copy teams. Multiple grammar or spelling errors, unusual capitalisation, or awkward phrasing are strong indicators of phishing.</p>
      <h2 id="flag5">Red Flag 5: Analyse Email Headers</h2>
      <pre><code>{`# Save the raw email as email.eml, then:
grep -i "received:" email.eml | head -10
grep -i "authentication-results:" email.eml
grep -i "x-originating-ip:" email.eml

# Check SPF/DKIM/DMARC authentication results
grep -i "spf=" email.eml    # should be "pass"
grep -i "dkim=" email.eml   # should be "pass"
grep -i "dmarc=" email.eml  # should be "pass"

# Automated check — URLhaus
curl -s "https://urlhaus-api.abuse.ch/v1/url/" -d "url=https://suspicious.com"

# Check domain age
whois suspicious.com | grep "Creation Date"`}</code></pre>
      <h2 id="clicked">What To Do If You Clicked a Phishing Link</h2>
      <ol>
        <li><strong>Don&apos;t enter any credentials</strong> — close the tab immediately</li>
        <li>Clear browser cache and cookies</li>
        <li>Change password for that service from a different, clean device</li>
        <li>Enable 2FA using our <a href="/tools/otp-generator">TOTP Generator</a></li>
        <li>Report to: <a href="https://apwg.org/report-phishing/" target="_blank" rel="noopener noreferrer">APWG</a>, <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer">FBI IC3</a>, <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">Cyber Crime Portal India</a></li>
      </ol>
    </GuideLayout>
  );
}
