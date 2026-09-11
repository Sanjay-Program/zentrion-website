import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Check DNS Records of Any Domain – dig, nslookup Guide',
  description: 'Complete DNS records guide using dig, nslookup and host commands. Check A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV records and test for zone transfers.',
  keywords: 'check dns records, dig command, nslookup guide, dns lookup, dns record types explained',
};

export default function CheckDNSRecordsPage() {
  return (
    <GuideLayout
      title="How to Check DNS Records of Any Domain"
      description="A complete step-by-step guide using dig, nslookup, host, and whois to check every type of DNS record, trace resolution paths, and detect security issues like zone transfers."
      timeToRead="8 min read"
      lastUpdated="September 2026"
      tags={['DNS', 'dig', 'nslookup', 'DNSSEC']}
      tools={[
        { name: 'DNS Lookup', url: '/tools/dns-lookup' },
        { name: 'DNS Propagation Checker', url: '/tools/dns-propagation' },
        { name: 'Reverse DNS Lookup', url: '/tools/reverse-dns' },
        { name: 'MX Lookup', url: '/tools/mx-lookup' },
      ]}
      relatedGuides={[
        { title: 'How to Check if Your Email Was Leaked', url: '/guides/email-leak-check' },
        { title: 'Nmap Scanning Tutorial', url: '/guides/nmap-scanning-tutorial' },
        { title: 'How to Detect Phishing Emails', url: '/guides/detect-phishing-email' },
      ]}
      headings={[
        { id: 'what-are-dns', label: 'What Are DNS Records?' },
        { id: 'basic', label: 'Basic Lookups (dig)' },
        { id: 'advanced', label: 'Advanced DNS Commands' },
        { id: 'nslookup', label: 'Using nslookup' },
        { id: 'host', label: 'Using host' },
        { id: 'record-types', label: 'DNS Record Types Table' },
        { id: 'security', label: 'Security Checks' },
      ]}
    >
      <div className="callout-tool">
        <strong>🛠 Instant Tool:</strong> <a href="/tools/dns-lookup">DNS Lookup →</a> — Query any DNS record type without installing anything.
      </div>

      <h2 id="what-are-dns">What Are DNS Records?</h2>
      <p>DNS (Domain Name System) records map domain names to IP addresses and configure email, subdomains, and security policies. Think of DNS as the internet's phonebook — it translates <code>example.com</code> into <code>93.184.216.34</code>.</p>

      <h2 id="basic">Basic Lookups with dig</h2>
      <p><code>dig</code> (Domain Information Groper) is the most powerful DNS query tool available. Install it with <code>sudo apt install dnsutils</code> on Linux or <code>brew install bind</code> on macOS.</p>
      <pre><code>{`# A record — IPv4 address for a domain
dig A example.com
dig A example.com +short    # short output, just the IP

# AAAA record — IPv6 address
dig AAAA example.com +short

# MX records — mail servers (with priority)
dig MX example.com

# NS records — authoritative name servers
dig NS example.com +short

# TXT records — SPF, DKIM, verification codes
dig TXT example.com

# CNAME record — canonical name / alias
dig CNAME www.example.com

# SOA record — start of authority (zone info)
dig SOA example.com

# PTR record — reverse DNS (IP → hostname)
dig -x 8.8.8.8 +short

# SRV records — service location
dig SRV _sip._tcp.example.com

# CAA records — which CAs can issue SSL certs
dig CAA example.com

# ALL records (not all servers honour this)
dig ANY example.com`}</code></pre>

      <h2 id="advanced">Advanced DNS Commands</h2>
      <pre><code>{`# Query a specific nameserver directly
dig A example.com @ns1.example.com
dig A example.com @8.8.8.8     # Google DNS
dig A example.com @1.1.1.1     # Cloudflare DNS

# Trace the full resolution path (root → TLD → authoritative)
dig +trace example.com

# Follow CNAME chain and show answer only
dig +noall +answer example.com

# DNSSEC validation — check for RRSIG records
dig +dnssec example.com

# Check for DNS zone transfer (AXFR) — security test
dig AXFR example.com @ns1.example.com
# ⚠️ If this returns data, the nameserver is misconfigured

# DNS over HTTPS (DoH) query via curl
curl -H "accept: application/dns-json" \\
  "https://cloudflare-dns.com/dns-query?name=example.com&type=A"`}</code></pre>

      <h2 id="nslookup">Using nslookup</h2>
      <pre><code>{`# Basic lookup
nslookup example.com

# Specify record type
nslookup -type=MX example.com
nslookup -type=TXT example.com
nslookup -type=NS example.com
nslookup -type=AAAA example.com

# Query specific DNS server
nslookup example.com 8.8.8.8

# Interactive mode
nslookup
> set type=any
> example.com
> set type=MX
> gmail.com`}</code></pre>

      <h2 id="host">Using host</h2>
      <pre><code>{`host example.com              # A record (default)
host -t MX example.com        # MX records
host -t TXT example.com       # TXT records
host -t NS example.com        # NS records
host -t CAA example.com       # CAA records
host -a example.com           # All records
host 8.8.8.8                  # Reverse lookup

# Zone transfer attempt (should fail on secure servers)
host -l example.com ns1.example.com`}</code></pre>

      <h2 id="record-types">DNS Record Types Explained</h2>
      <table>
        <thead><tr><th>Type</th><th>Purpose</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>Domain → IPv4 address</td><td>example.com → 93.184.216.34</td></tr>
          <tr><td>AAAA</td><td>Domain → IPv6 address</td><td>example.com → 2606:2800:220:1::248</td></tr>
          <tr><td>CNAME</td><td>Alias to another domain</td><td>www.example.com → example.com</td></tr>
          <tr><td>MX</td><td>Mail server + priority</td><td>10 mail.example.com</td></tr>
          <tr><td>TXT</td><td>Text data (SPF, DKIM, verification)</td><td>v=spf1 include:_spf.google.com ~all</td></tr>
          <tr><td>NS</td><td>Authoritative nameservers</td><td>ns1.example.com</td></tr>
          <tr><td>SOA</td><td>Zone authority info</td><td>ns1.example.com admin@example.com</td></tr>
          <tr><td>PTR</td><td>Reverse DNS (IP → hostname)</td><td>1.168.192.in-addr.arpa → host1</td></tr>
          <tr><td>CAA</td><td>Allowed SSL certificate authorities</td><td>0 issue "letsencrypt.org"</td></tr>
          <tr><td>SRV</td><td>Service location (port + priority)</td><td>_sip._tcp 10 20 5060 sip.example.com</td></tr>
        </tbody>
      </table>

      <h2 id="security">Security Checks</h2>
      <pre><code>{`# 1. Test for DNS zone transfer vulnerability (should be refused)
dig AXFR example.com @ns1.example.com
# Expected: "Transfer failed" — if it returns records = BAD

# 2. Verify DNSSEC is enabled
dig +dnssec example.com | grep -E "RRSIG|DNSKEY"

# 3. Detect DNS hijacking — compare results from multiple servers
dig A example.com @8.8.8.8 +short
dig A example.com @1.1.1.1 +short
dig A example.com @9.9.9.9 +short
# All should return the same IP

# 4. Check email security records
dig TXT yourdomain.com | grep "v=spf1"       # SPF
dig TXT _dmarc.yourdomain.com | grep "v=DMARC1" # DMARC
dig TXT selector._domainkey.yourdomain.com   # DKIM`}</code></pre>

      <hr />
      <h3>External Resources</h3>
      <ul>
        <li><a href="https://dnsviz.net/" target="_blank" rel="noopener noreferrer">DNSViz — DNSSEC visualisation tool</a></li>
        <li><a href="https://viewdns.info/" target="_blank" rel="noopener noreferrer">ViewDNS.info — Multiple DNS tools</a></li>
        <li><a href="https://mxtoolbox.com/" target="_blank" rel="noopener noreferrer">MxToolbox — Email DNS diagnostics</a></li>
        <li><a href="https://www.dnschecker.org/" target="_blank" rel="noopener noreferrer">DNS Checker — Global propagation check</a></li>
      </ul>
    </GuideLayout>
  );
}
