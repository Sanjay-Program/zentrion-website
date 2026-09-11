import GuideLayout from '@/components/GuideLayout';
export default function CheckWebsiteSafePage() {
  return (
    <GuideLayout
      title="How to Check if a Website is Safe Before You Click"
      description="Verify website safety before clicking by checking SSL, security headers, domain age, and threat feeds using CLI commands and free online tools."
      timeToRead="7 min read" lastUpdated="September 2026"
      tags={['URL Safety', 'SSL', 'Phishing Prevention', 'Security Headers']}
      tools={[{name:'URL Safety Checker',url:'/tools/url-safety'},{name:'WAF Detector',url:'/tools/waf-detector'},{name:'HTTP Headers Checker',url:'/tools/http-headers'},{name:'Certificate Decoder',url:'/tools/certificate-decoder'}]}
      relatedGuides={[{title:'How to Detect Phishing Emails',url:'/guides/detect-phishing-email'},{title:'How to Check if Website is Hacked',url:'/guides/check-if-website-hacked'}]}
      headings={[{id:'url-check',label:'1. Inspect the URL'},{id:'ssl',label:'2. Check SSL Certificate'},{id:'headers',label:'3. Security Headers'},{id:'threat-feed',label:'4. Threat Feed Check'},{id:'mixed',label:'5. Mixed Content'}]}
    >
      <div className="callout-tool"><strong>🛠 30-Second Check:</strong> <a href="/tools/url-safety">URL Safety Checker →</a> — Checks URLhaus + PhishTank instantly.</div>
      <h2 id="url-check">1. Inspect the URL Carefully</h2>
      <ul>
        <li>Is it HTTPS? (padlock icon in browser)</li>
        <li>Does the domain match exactly? <code>paypa1.com</code> ≠ <code>paypal.com</code></li>
        <li>Suspicious TLDs: <code>.tk</code>, <code>.ml</code>, <code>.gq</code>, <code>.cf</code> are frequently used for phishing</li>
        <li>Unusually long domains: <code>paypal-secure-login-verify.malicious.com</code></li>
      </ul>
      <h2 id="ssl">2. Check the SSL Certificate</h2>
      <pre><code>{`# View certificate details from command line
openssl s_client -connect suspicious-site.com:443 2>/dev/null \\
  | openssl x509 -text -noout

# Quick check — issuer and expiry
openssl s_client -connect suspicious-site.com:443 2>/dev/null \\
  | openssl x509 -issuer -dates -noout

# Is the cert still valid?
echo | openssl s_client -connect suspicious-site.com:443 2>/dev/null \\
  | openssl x509 -checkend 0
# Exit code 0 = valid, 1 = expired`}</code></pre>
      <h2 id="headers">3. Check Security Headers</h2>
      <div className="callout-tool"><strong>🛠 Try:</strong> <a href="/tools/http-headers">HTTP Headers Checker →</a></div>
      <pre><code>{`# Check all security-relevant headers
curl -sI https://suspicious-site.com | grep -iE \\
  "strict-transport|content-security|x-frame|x-content-type|referrer-policy"

# What good headers look like:
# Strict-Transport-Security: max-age=31536000; includeSubDomains
# Content-Security-Policy: default-src 'self'
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin`}</code></pre>
      <h2 id="threat-feed">4. Check Against Threat Feeds</h2>
      <pre><code>{`# URLhaus (malware URL database)
curl -s "https://urlhaus-api.abuse.ch/v1/url/" \\
  -d "url=https://suspicious-site.com"

# Check domain age (recently registered = red flag)
whois suspicious-site.com | grep -iE "creation date|registered"

# Check if domain is in Spamhaus DNSBL
host suspicious-site.com zen.spamhaus.org`}</code></pre>
      <h2 id="mixed">5. Check for Mixed Content</h2>
      <pre><code>{`# Find HTTP resources on an HTTPS page (security risk)
curl -s https://suspicious-site.com | grep -oP 'src="http://[^"]*"'
curl -s https://suspicious-site.com | grep -oP 'href="http://[^"]*"'`}</code></pre>
      <hr />
      <h3>External Resources</h3>
      <ul>
        <li><a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener noreferrer">Qualys SSL Labs — Deep SSL/TLS analysis</a></li>
        <li><a href="https://observatory.mozilla.org/" target="_blank" rel="noopener noreferrer">Mozilla Observatory — Security headers scanner</a></li>
        <li><a href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer">SecurityHeaders.com</a></li>
        <li><a href="https://www.virustotal.com/" target="_blank" rel="noopener noreferrer">VirusTotal — Multi-engine URL scanner</a></li>
      </ul>
    </GuideLayout>
  );
}
