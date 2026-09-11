import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cybersecurity Commands Cheat Sheet (100+ Commands) | Zentrion',
  description: 'Complete cybersecurity commands cheat sheet. Nmap, dig, curl, openssl, hashcat, netstat, tcpdump, sqlmap — all in one place.',
  keywords: 'cybersecurity commands cheat sheet, nmap cheat sheet, linux security commands, pentest cheat sheet, dig commands, openssl commands',
};

const sections = [
  {
    id: 'recon',
    title: '🔍 Reconnaissance & DNS',
    commands: [
      { cmd: 'dig A example.com +short', desc: 'IPv4 address' },
      { cmd: 'dig AAAA example.com +short', desc: 'IPv6 address' },
      { cmd: 'dig MX example.com', desc: 'Mail servers' },
      { cmd: 'dig TXT example.com', desc: 'TXT records (SPF, DKIM)' },
      { cmd: 'dig NS example.com +short', desc: 'Name servers' },
      { cmd: 'dig CAA example.com', desc: 'Allowed certificate authorities' },
      { cmd: 'dig +trace example.com', desc: 'Trace full resolution path' },
      { cmd: 'dig -x 8.8.8.8 +short', desc: 'Reverse DNS lookup' },
      { cmd: 'dig AXFR example.com @ns1.example.com', desc: 'Zone transfer test (should fail)' },
      { cmd: 'nslookup -type=MX example.com', desc: 'MX lookup (nslookup)' },
      { cmd: 'host -t TXT example.com', desc: 'TXT records (host)' },
      { cmd: 'whois example.com', desc: 'Domain registration info' },
      { cmd: 'whois 8.8.8.8', desc: 'IP owner/ASN info' },
      { cmd: "curl -s \"https://crt.sh/?q=%25.example.com&output=json\" | jq '.[].name_value'", desc: 'Certificate transparency (subdomains)' },
      { cmd: 'curl -s "https://api.hackertarget.com/hostsearch?q=example.com"', desc: 'Subdomain enumeration (HackerTarget)' },
    ]
  },
  {
    id: 'nmap',
    title: '🗺️ Nmap Port Scanning',
    commands: [
      { cmd: 'nmap -sn 192.168.1.0/24', desc: 'Ping sweep — find live hosts' },
      { cmd: 'nmap 192.168.1.1', desc: 'Scan top 1000 ports' },
      { cmd: 'nmap -p- 192.168.1.1', desc: 'Scan ALL 65535 ports' },
      { cmd: 'nmap -p 22,80,443 192.168.1.1', desc: 'Scan specific ports' },
      { cmd: 'nmap -sV 192.168.1.1', desc: 'Service version detection' },
      { cmd: 'nmap -O 192.168.1.1', desc: 'OS detection' },
      { cmd: 'nmap -A 192.168.1.1', desc: 'Aggressive (OS+version+scripts+traceroute)' },
      { cmd: 'nmap -sU -p 53,123,161 192.168.1.1', desc: 'UDP port scan' },
      { cmd: 'nmap -sS 192.168.1.1', desc: 'Stealth SYN scan (root required)' },
      { cmd: 'nmap -Pn 192.168.1.1', desc: 'Skip ping (assume host is up)' },
      { cmd: 'nmap -T4 192.168.1.1', desc: 'Fast timing (aggressive)' },
      { cmd: 'nmap --script vuln 192.168.1.1', desc: 'Vulnerability scripts' },
      { cmd: 'nmap --script smb-vuln-ms17-010 -p 445', desc: 'EternalBlue check' },
      { cmd: 'nmap -oA scan-results 192.168.1.1', desc: 'Save in all formats' },
      { cmd: 'nmap -iL targets.txt', desc: 'Scan from file' },
    ]
  },
  {
    id: 'web',
    title: '🌐 Web Security',
    commands: [
      { cmd: 'curl -sI https://example.com', desc: 'Check HTTP response headers' },
      { cmd: 'curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame"', desc: 'Security headers check' },
      { cmd: 'curl -s https://example.com/.git/HEAD', desc: 'Check for exposed .git' },
      { cmd: 'curl -s https://example.com/robots.txt', desc: 'View robots.txt' },
      { cmd: 'curl -sI -H "Origin: https://evil.com" https://example.com/api', desc: 'CORS misconfiguration test' },
      { cmd: 'curl -s -X OPTIONS -I https://example.com', desc: 'Check allowed HTTP methods' },
      { cmd: 'curl -s https://example.com | grep -i "iframe\\|eval("', desc: 'Check for injected scripts' },
      { cmd: 'curl -s https://example.com | grep -oP \'src="http://[^"]*"\'', desc: 'Find mixed content' },
      { cmd: 'nikto -h https://example.com', desc: 'Web vulnerability scanner' },
      { cmd: 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt', desc: 'Directory brute force' },
    ]
  },
  {
    id: 'ssl',
    title: '🔒 SSL/TLS',
    commands: [
      { cmd: 'openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -text -noout', desc: 'View full certificate' },
      { cmd: 'openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -issuer -dates -noout', desc: 'Issuer and expiry' },
      { cmd: 'echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -checkend 0', desc: 'Check if cert is expired' },
      { cmd: 'openssl s_client -connect example.com:443 -tls1_2 2>&1 | grep "Cipher"', desc: 'TLS 1.2 cipher used' },
      { cmd: 'openssl s_client -connect example.com:443 -tls1 2>&1 | grep "CONNECTED"', desc: 'Test if TLS 1.0 is accepted (bad)' },
      { cmd: 'openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr', desc: 'Generate CSR' },
      { cmd: 'openssl x509 -in cert.pem -text -noout', desc: 'View certificate file' },
    ]
  },
  {
    id: 'network',
    title: '🔌 Network & Firewall',
    commands: [
      { cmd: 'netstat -tuln', desc: 'Listening TCP/UDP ports' },
      { cmd: 'ss -tuln', desc: 'Listening ports (faster, modern)' },
      { cmd: 'ss -tulnp', desc: 'Listening ports + process names (root)' },
      { cmd: 'netstat -anp | grep ESTABLISHED', desc: 'Active connections' },
      { cmd: 'lsof -i -P | grep LISTEN', desc: 'Listening ports with processes (macOS)' },
      { cmd: 'iptables -L -n -v', desc: 'View firewall rules' },
      { cmd: 'traceroute example.com', desc: 'Trace network path' },
      { cmd: 'mtr example.com', desc: 'Continuous traceroute' },
      { cmd: 'arp -a', desc: 'View ARP table (connected devices)' },
      { cmd: 'ip route show', desc: 'Show routing table' },
      { cmd: 'tcpdump -i eth0 -n port 80', desc: 'Capture HTTP traffic' },
      { cmd: 'tcpdump -i eth0 -w capture.pcap', desc: 'Save to pcap file' },
    ]
  },
  {
    id: 'hashing',
    title: '# Hash & Crypto',
    commands: [
      { cmd: 'echo -n "password" | md5sum', desc: 'MD5 hash' },
      { cmd: 'echo -n "password" | sha1sum', desc: 'SHA-1 hash' },
      { cmd: 'echo -n "password" | sha256sum', desc: 'SHA-256 hash' },
      { cmd: 'echo -n "password" | sha512sum', desc: 'SHA-512 hash' },
      { cmd: 'md5sum file.txt', desc: 'Hash a file (integrity check)' },
      { cmd: 'sha256sum file.txt > file.sha256 && sha256sum -c file.sha256', desc: 'Verify file integrity' },
      { cmd: 'strings suspicious.bin | grep -iE "http|cmd|bash|exec"', desc: 'Strings in binary' },
      { cmd: 'file suspicious.bin', desc: 'Identify file type' },
      { cmd: 'base64 -e <<< "hello world"', desc: 'Base64 encode' },
      { cmd: 'echo "aGVsbG8gd29ybGQ=" | base64 -d', desc: 'Base64 decode' },
    ]
  },
  {
    id: 'hashcat',
    title: '🔓 Password Cracking',
    commands: [
      { cmd: 'hashcat -m 0 -a 0 hash.txt rockyou.txt', desc: 'MD5 dictionary attack' },
      { cmd: 'hashcat -m 1400 -a 0 hash.txt rockyou.txt', desc: 'SHA-256 dictionary attack' },
      { cmd: 'hashcat -m 1800 -a 0 hash.txt rockyou.txt', desc: 'bcrypt dictionary attack' },
      { cmd: 'hashcat -m 22000 hash.hc22000 rockyou.txt', desc: 'WPA2 cracking' },
      { cmd: 'hashcat -m 0 -a 3 hash.txt ?a?a?a?a?a?a', desc: 'Brute force 6-char all' },
      { cmd: 'hashcat --show hash.txt', desc: 'Show cracked passwords' },
      { cmd: 'hashcat -b', desc: 'Benchmark GPU speed' },
      { cmd: 'john --wordlist=rockyou.txt hash.txt', desc: 'John dictionary attack' },
      { cmd: 'john --show hash.txt', desc: 'Show cracked (John)' },
      { cmd: 'hydra -L users.txt -P pass.txt ssh://192.168.1.1', desc: 'SSH brute force (authorised only)' },
    ]
  },
  {
    id: 'packet',
    title: '📡 Packet Analysis (tshark)',
    commands: [
      { cmd: 'tshark -i eth0 -c 100', desc: 'Capture 100 packets' },
      { cmd: 'tshark -i eth0 -f "port 53"', desc: 'Capture DNS only' },
      { cmd: 'tshark -i eth0 -w capture.pcap', desc: 'Save to pcap file' },
      { cmd: 'tshark -r capture.pcap -Y "dns"', desc: 'Read pcap, filter DNS' },
      { cmd: 'tshark -r capture.pcap -Y "http.request" -T fields -e http.request.uri', desc: 'Extract HTTP request URIs' },
      { cmd: 'tshark -r capture.pcap -Y "dns" -T fields -e dns.qry.name', desc: 'Extract DNS queries' },
    ]
  }
];

export default function CybersecurityCommandsPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-32 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-4">📋 Quick Reference</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Cybersecurity Commands Cheat Sheet</h1>
          <p className="text-lg text-[rgb(var(--c-mute))] mb-6">100+ essential commands for Nmap, dig, openssl, curl, hashcat, tshark, and more — all on one page.</p>
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 rounded-lg text-sm bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] transition-colors">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        {sections.map(section => (
          <section key={section.id} id={section.id} className="mb-16">
            <h2 className="text-xl font-black mb-5 flex items-center gap-3">
              {section.title}
            </h2>
            <div className="rounded-2xl overflow-hidden border border-[var(--c-glass-border)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[rgba(255,255,255,0.04)]">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--c-mute))] w-3/5">Command</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--c-mute))]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {section.commands.map((c, i) => (
                    <tr key={i} className="border-t border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono text-green-400 break-all">{c.cmd}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-[rgb(var(--c-mute))]">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* Related guides */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)]">
          <h3 className="font-black text-lg mb-4">📚 Go Deeper</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Nmap Tutorial – 50+ Commands', url: '/guides/nmap-scanning-tutorial' },
              { title: 'Wireshark – 30 Exercises', url: '/guides/wireshark-packet-analysis' },
              { title: 'SQL Injection from A to Z', url: '/guides/sql-injection-tutorial' },
              { title: 'Password Cracking Guide', url: '/guides/password-cracking-tutorial' },
            ].map(g => (
              <a key={g.url} href={g.url} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--c-glass-border)] hover:border-[rgba(47,107,255,0.4)] transition-colors text-sm">
                {g.title} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
