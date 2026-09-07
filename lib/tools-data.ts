export const CATEGORIES = [
  {
    name: '🤖 Zentrion Intelligence (AI)',
    description: 'AI-powered security audits and threat analysis',
    tools: [
      { name: 'AI Website Security Scanner', url: '/tools/website-security-scanner', priority: true },
      { name: 'AI Domain Security Audit', url: '/tools/domain-security-audit' },
      { name: 'AI Email Security Audit', url: '/tools/email-security-audit' },
      { name: 'AI SSL/TLS Analysis', url: '/tools/ssl-tls-analysis' },
      { name: 'AI DNS Analysis', url: '/tools/dns-analysis' },
      { name: 'AI IP Intelligence', url: '/tools/ip-intelligence' },
      { name: 'AI IOC Analysis', url: '/tools/ioc-analysis' },
    ]
  },
  {
    name: '🌐 Network',
    description: 'Routing, IP intelligence, and connectivity tools',
    tools: [
      { name: 'What Is My IP', url: '/tools/what-is-my-ip', priority: true },
      { name: 'IP Lookup', url: '/tools/ip-lookup', priority: true },
      { name: 'Reverse IP', url: '/tools/reverse-ip' },
      { name: 'ASN Lookup', url: '/tools/asn-lookup' },
      { name: 'Ping Test', url: '/tools/ping' },
      { name: 'Traceroute', url: '/tools/traceroute' },
      { name: 'Port Checker', url: '/tools/port-checker', priority: true },
      { name: 'Subnet Calculator', url: '/tools/subnet-calculator' },
      { name: 'IP Classifier (IPv4/v6)', url: '/tools/ip-classifier' },
      { name: 'MAC Vendor Lookup', url: '/tools/mac-vendor' },
      { name: 'Common Ports', url: '/tools/common-ports' },
    ]
  },
  {
    name: '🌎 DNS & Domains',
    description: 'Domain records, propagation, and DNSSEC',
    tools: [
      { name: 'DNS Lookup', url: '/tools/dns-lookup', priority: true },
      { name: 'DNS Propagation Checker', url: '/tools/dns-propagation', priority: true },
      { name: 'Reverse DNS', url: '/tools/reverse-dns' },
      { name: 'WHOIS / RDAP Lookup', url: '/tools/whois-lookup', priority: true },
      { name: 'DNSSEC Checker', url: '/tools/dnssec-checker' },
      { name: 'CAA Checker', url: '/tools/caa-checker' },
      { name: 'Domain Age Checker', url: '/tools/domain-age' },
      { name: 'Domain Expiry Checker', url: '/tools/domain-expiry' },
      { name: 'Nameserver Checker', url: '/tools/nameserver-checker' },
      { name: 'DNS Record Analyzer', url: '/tools/dns-record-analyzer' },
    ]
  },
  {
    name: '🔒 Web Security',
    description: 'TLS, Headers, and Web vulnerability tools',
    tools: [
      { name: 'SSL Certificate Checker', url: '/tools/ssl-checker', priority: true },
      { name: 'TLS Version Checker', url: '/tools/tls-checker' },
      { name: 'Certificate Decoder', url: '/tools/certificate-decoder' },
      { name: 'Certificate Chain Analyzer', url: '/tools/certificate-chain' },
      { name: 'HTTP Headers Checker', url: '/tools/http-headers' },
      { name: 'Security Headers Checker', url: '/tools/security-headers', priority: true },
      { name: 'Redirect Checker', url: '/tools/redirect-checker' },
      { name: 'Website Technology Detector', url: '/tools/technology-detector' },
    ]
  },
  {
    name: '📧 Email Security',
    description: 'SPF, DKIM, DMARC, and email health',
    tools: [
      { name: 'MX Lookup', url: '/tools/mx-lookup' },
      { name: 'SPF Checker', url: '/tools/spf-checker', priority: true },
      { name: 'DKIM Checker', url: '/tools/dkim-checker', priority: true },
      { name: 'DMARC Checker', url: '/tools/dmarc-checker', priority: true },
      { name: 'MTA-STS Checker', url: '/tools/mta-sts' },
      { name: 'TLS-RPT Checker', url: '/tools/tls-rpt' },
      { name: 'Email Security Score', url: '/tools/email-security-score' },
    ]
  },
  {
    name: '🛡️ Threat Intelligence',
    description: 'Reputation, Blacklists, and IOCs',
    tools: [
      { name: 'IP Reputation', url: '/tools/ip-reputation' },
      { name: 'Domain Reputation', url: '/tools/domain-reputation' },
      { name: 'URL Reputation', url: '/tools/url-reputation' },
      { name: 'IP Blacklist Checker', url: '/tools/ip-blacklist', priority: true },
      { name: 'Domain Blacklist Checker', url: '/tools/domain-blacklist' },
      { name: 'Hash Reputation', url: '/tools/hash-reputation' },
      { name: 'IOC Lookup', url: '/tools/ioc-lookup' },
      { name: 'ASN Reputation', url: '/tools/asn-reputation' },
    ]
  },
  {
    name: '🕵️ OSINT',
    description: 'Open-source intelligence and reconnaissance',
    tools: [
      { name: 'Username Finder', url: '/tools/username-finder' },
      { name: 'GitHub Analyzer', url: '/tools/github-analyzer' },
      { name: 'Subdomain Finder', url: '/tools/subdomain-finder', priority: true },
      { name: 'Certificate Transparency', url: '/tools/certificate-transparency' },
      { name: 'URL Analyzer', url: '/tools/url-analyzer' },
      { name: 'Robots.txt Analyzer', url: '/tools/robots-analyzer' },
      { name: 'Sitemap Analyzer', url: '/tools/sitemap-analyzer' },
      { name: 'Domain Intelligence', url: '/tools/domain-intelligence' },
    ]
  },
  {
    name: '🔐 Developer Security',
    description: 'Crypto, Encoding, JWT, and offline utilities',
    tools: [
      { name: 'Password Strength', url: '/tools/password-strength' },
      { name: 'Password Generator', url: '/tools/password-generator' },
      { name: 'Password Breach Check', url: '/tools/password-breach' },
      { name: 'JWT Inspector', url: '/tools/jwt-inspector' },
      { name: 'Hash Generator', url: '/tools/hash-generator' },
      { name: 'HMAC Generator', url: '/tools/hmac-generator' },
      { name: 'Encoding Toolkit', url: '/tools/encoding-toolkit' },
      { name: 'Regex Tester', url: '/tools/regex-tester' },
      { name: 'UUID Generator', url: '/tools/uuid-generator' },
      { name: 'HTTP Status Lookup', url: '/tools/http-status' },
    ]
  },
  {
    name: '🛠️ Content & Design Utilities',
    description: 'Formatters, Converters, and Generators',
    tools: [
      { name: 'Text Analyzer', url: '/tools/text-analyzer' },
      { name: 'Color Converter', url: '/tools/color-converter' },
      { name: 'Lorem Ipsum Generator', url: '/tools/lorem-ipsum' },
      { name: 'Base32 Encoder', url: '/tools/base32' },
      { name: 'URL Parser', url: '/tools/url-parser' },
      { name: 'JSON Formatter', url: '/tools/json-formatter' },
      { name: 'Image to Base64', url: '/tools/image-base64' },
      { name: 'Unix Timestamp', url: '/tools/unix-timestamp' },
    ]
  },
  {
    name: '⚙️ System Utilities',
    description: 'Calculators, permissions, and schedulers',
    tools: [
      { name: 'Chmod Calculator', url: '/tools/chmod-calculator' },
      { name: 'HTML Entities', url: '/tools/html-entities' },
      { name: 'Cron Generator', url: '/tools/cron-generator' },
      { name: 'MAC Generator', url: '/tools/mac-generator' },
      { name: 'Text Hasher', url: '/tools/text-hasher' },
      { name: 'API Key Generator', url: '/tools/token-generator' },
      { name: 'HTTP Status Codes', url: '/tools/http-status-codes' },
    ]
  },
];
