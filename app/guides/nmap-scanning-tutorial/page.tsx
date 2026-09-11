import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Complete Nmap Scanning Tutorial – 50+ Commands with Examples',
  description: 'Master Nmap with 50+ real commands. Port scanning, OS detection, NSE scripts, stealth scans, output formats, and real-world scenarios explained with examples.',
  keywords: 'nmap tutorial, nmap commands, nmap scanning guide, nmap cheat sheet, nmap examples, nmap port scanner',
};

export default function NmapTutorialPage() {
  return (
    <GuideLayout
      title="Complete Nmap Scanning Tutorial – 50+ Commands with Examples"
      description="Master Nmap from basic host discovery to advanced NSE scripting. Every command explained with real examples and use cases."
      timeToRead="45 min read"
      lastUpdated="September 2026"
      tags={['Nmap', 'Network Scanning', 'Penetration Testing', 'Beginner']}
      tools={[
        { name: 'Port Scanner', url: '/tools/port-scanner' },
        { name: 'DNS Lookup', url: '/tools/dns-lookup' },
        { name: 'Common Ports Reference', url: '/tools/common-ports' },
        { name: 'Subnet Calculator', url: '/tools/subnet-calculator' },
      ]}
      relatedGuides={[
        { title: 'Wireshark Packet Analysis – 30 Exercises', url: '/guides/wireshark-packet-analysis' },
        { title: 'Kali Linux Pentesting from Zero', url: '/guides/kali-linux-pentesting-tutorial' },
        { title: 'How to Find Open Ports', url: '/guides/find-open-ports' },
      ]}
      headings={[
        { id: 'intro', label: 'What is Nmap?' },
        { id: 'install', label: 'Installation' },
        { id: 'host-discovery', label: '1. Host Discovery' },
        { id: 'port-scanning', label: '2. Port Scanning' },
        { id: 'service-detection', label: '3. Service Detection' },
        { id: 'os-detection', label: '4. OS Detection' },
        { id: 'nse-scripts', label: '5. NSE Scripts' },
        { id: 'output', label: '6. Output Formats' },
        { id: 'real-world', label: '7. Real-World Scenarios' },
        { id: 'practice', label: '8. Practice Resources' },
      ]}
    >
      <h2 id="intro">What is Nmap?</h2>
      <p>Nmap (Network Mapper) is the world's most popular free, open-source network scanning tool. It's used by security professionals to discover hosts, open ports, running services, and OS details on any network.</p>
      <p>GitHub: <a href="https://github.com/nmap/nmap" target="_blank" rel="noopener noreferrer">github.com/nmap/nmap</a> · Official: <a href="https://nmap.org/" target="_blank" rel="noopener noreferrer">nmap.org</a></p>
      <div className="callout-warn">
        <strong>⚠️ Legal Warning:</strong> Only scan networks and hosts you own or have explicit written permission to test. Unauthorized scanning is illegal in most jurisdictions.
      </div>
      <div className="callout-tool">
        <strong>🛠 Quick Alternative:</strong> Don't have Nmap installed? <a href="/tools/port-scanner">Try our online Port Scanner →</a>
      </div>

      <h2 id="install">Installation</h2>
      <pre><code>{`# Ubuntu / Debian
sudo apt update && sudo apt install nmap

# macOS (Homebrew)
brew install nmap

# Windows (winget)
winget install Nmap

# Verify installation
nmap --version`}</code></pre>

      <h2 id="host-discovery">1. Host Discovery (Ping Scans)</h2>
      <p>Before scanning ports, identify which hosts are alive on the network:</p>
      <pre><code>{`# Ping a single host (no port scan)
nmap -sn 192.168.1.1

# Ping an entire subnet — discover all live hosts
nmap -sn 192.168.1.0/24

# Ping multiple hosts
nmap -sn 192.168.1.1 192.168.1.2 192.168.1.3

# Ping with custom timeout (5 seconds per host)
nmap -sn --host-timeout 5s 192.168.1.0/24

# ARP ping (faster, local network only)
nmap -sn -PR 192.168.1.0/24

# ICMP ping only
nmap -sn -PE 192.168.1.0/24

# Don't ping — assume host is up (bypass firewalls that block ping)
nmap -Pn 192.168.1.1`}</code></pre>

      <h2 id="port-scanning">2. Port Scanning</h2>
      <pre><code>{`# Scan top 1000 most common ports (default)
nmap 192.168.1.1

# Scan ALL 65535 ports (slow but thorough)
nmap -p- 192.168.1.1

# Scan specific ports
nmap -p 22,80,443,8080 192.168.1.1

# Scan a port range
nmap -p 1-1024 192.168.1.1

# Scan only open ports (skip closed/filtered)
nmap -sS --open 192.168.1.1

# UDP port scan (slower, requires root)
nmap -sU -p 53,123,161,162 192.168.1.1

# Scan a subnet for a specific port
nmap -p 22 192.168.1.0/24

# Stealth SYN scan (half-open, requires root)
sudo nmap -sS 192.168.1.1

# Connect scan (no root needed, but more detectable)
nmap -sT 192.168.1.1

# Scan from a file of targets
nmap -iL targets.txt -p 80,443`}</code></pre>

      <h2 id="service-detection">3. Service &amp; Version Detection</h2>
      <pre><code>{`# Detect service versions on open ports
nmap -sV 192.168.1.1

# More aggressive version detection (intensity 0-9)
nmap -sV --version-intensity 9 192.168.1.1

# Light version detection (faster)
nmap -sV --version-light 192.168.1.1

# Run default scripts + version detection
nmap -sC -sV 192.168.1.1`}</code></pre>

      <h2 id="os-detection">4. OS Detection</h2>
      <pre><code>{`# Detect operating system (requires root)
sudo nmap -O 192.168.1.1

# Aggressive mode: OS + version + scripts + traceroute
nmap -A 192.168.1.1

# Full recon (all detection modes)
nmap -sS -sV -O -A 192.168.1.1`}</code></pre>

      <h2 id="nse-scripts">5. NSE Scripts (Nmap Scripting Engine)</h2>
      <p>NSE scripts extend Nmap with powerful vulnerability detection and enumeration capabilities:</p>
      <pre><code>{`# Run default scripts
nmap --script default 192.168.1.1
# Shorthand:
nmap -sC 192.168.1.1

# Run all safe scripts
nmap --script safe 192.168.1.1

# Run vulnerability detection scripts
nmap --script vuln 192.168.1.1

# Run authentication-related scripts
nmap --script auth 192.168.1.1

# Discovery scripts
nmap --script discovery 192.168.1.1

# --- Specific script examples ---

# EternalBlue (MS17-010) vulnerability check
nmap --script smb-vuln-ms17-010.nse -p 445 192.168.1.1

# SMB share enumeration
nmap --script smb-enum-shares -p 445 192.168.1.1

# SMB user enumeration
nmap --script smb-enum-users -p 445 192.168.1.1

# HTTP server enumeration
nmap --script http-enum -p 80 192.168.1.1

# HTTP headers
nmap --script http-headers -p 80,443 192.168.1.1

# SSL cipher enumeration
nmap --script ssl-enum-ciphers -p 443 192.168.1.1

# DNS zone transfer test (security check)
nmap --script dns-zone-transfer -p 53 192.168.1.1

# FTP anonymous login check
nmap --script ftp-anon -p 21 192.168.1.1

# MySQL info
nmap --script mysql-info -p 3306 192.168.1.1`}</code></pre>

      <h2 id="output">6. Output &amp; Reporting Formats</h2>
      <pre><code>{`# Save to plain text
nmap -oN scan.txt 192.168.1.1

# Save to XML (parseable by tools like Metasploit)
nmap -oX scan.xml 192.168.1.1

# Save to grepable format
nmap -oG scan.gnmap 192.168.1.1

# Save ALL formats at once (creates scan.nmap, scan.xml, scan.gnmap)
nmap -oA scanname 192.168.1.1

# Verbose output
nmap -v 192.168.1.1
nmap -vv 192.168.1.1

# Show progress every 5 seconds
nmap --stats-every 5s -p- 192.168.1.1`}</code></pre>

      <h2 id="real-world">7. Real-World Scan Scenarios</h2>
      <pre><code>{`# Full reconnaissance scan (save all formats)
nmap -sS -sV -O -A --script vuln -oA full-recon 192.168.1.1

# Web server assessment
nmap -p 80,443,8080,8443 -sV --script http-headers,http-enum 192.168.1.1

# Database server check
nmap -p 3306,5432,1433,27017,6379 -sV 192.168.1.1

# SMB security audit
nmap --script smb-security-mode,smb-vuln-ms17-010,smb-enum-shares -p 445 192.168.1.1

# Speed up scan with T4 timing (aggressive, may miss hosts on slow networks)
nmap -T4 --min-rate 1000 -p- 192.168.1.1

# Randomize host order (useful for large subnet scans)
nmap --randomize-hosts 192.168.1.0/24

# Fragment packets to evade simple firewalls
nmap -f 192.168.1.1

# Decoy scan (hide among fake source IPs)
nmap -D ME,192.168.1.5,192.168.1.10 192.168.1.1`}</code></pre>

      <h2 id="practice">8. Practice Resources</h2>
      <div className="callout-info">
        <p><strong>Safe practice target:</strong> <a href="https://scanme.nmap.org/" target="_blank" rel="noopener noreferrer">scanme.nmap.org</a> — Nmap's official test server. You have permission to scan it.</p>
      </div>
      <ul>
        <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a> — Beginner-friendly guided labs</li>
        <li><a href="https://www.hackthebox.com/" target="_blank" rel="noopener noreferrer">HackTheBox</a> — Intermediate/advanced practice machines</li>
        <li><a href="https://github.com/hack4bug/30Days-Nmap" target="_blank" rel="noopener noreferrer">30 Days of Nmap (GitHub)</a> — Daily challenge format</li>
        <li><a href="https://github.com/labex-labs/cybersecurity-free-tutorials" target="_blank" rel="noopener noreferrer">LabEx Cybersecurity Tutorials (GitHub)</a></li>
      </ul>

      <hr />
      <h3>Common Nmap Timing Templates</h3>
      <table>
        <thead><tr><th>Flag</th><th>Name</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>-T0</td><td>Paranoid</td><td>IDS evasion, very slow</td></tr>
          <tr><td>-T1</td><td>Sneaky</td><td>IDS evasion</td></tr>
          <tr><td>-T2</td><td>Polite</td><td>Low bandwidth impact</td></tr>
          <tr><td>-T3</td><td>Normal</td><td>Default</td></tr>
          <tr><td>-T4</td><td>Aggressive</td><td>Fast, reliable networks</td></tr>
          <tr><td>-T5</td><td>Insane</td><td>Very fast, may miss hosts</td></tr>
        </tbody>
      </table>
    </GuideLayout>
  );
}
