import GuideLayout from '@/components/GuideLayout';
export default function FindOpenPortsPage() {
  return (
    <GuideLayout
      title="How to Find Open Ports on Your Network"
      description="Find open ports on any host using Nmap, netstat, ss, and online tools. Understand what open ports mean for your security."
      timeToRead="12 min read" lastUpdated="September 2026"
      tags={['Nmap', 'Port Scanning', 'Network Security']}
      tools={[{name:'Port Scanner',url:'/tools/port-scanner'},{name:'Common Ports Reference',url:'/tools/common-ports'},{name:'Subnet Calculator',url:'/tools/subnet-calculator'}]}
      relatedGuides={[{title:'Nmap Scanning Tutorial – 50+ Commands',url:'/guides/nmap-scanning-tutorial'},{title:'How to Check DNS Records',url:'/guides/check-dns-records'}]}
      headings={[{id:'why',label:'Why Check Open Ports?'},{id:'online',label:'Online Tool'},{id:'nmap',label:'Using Nmap'},{id:'local',label:'Check Local Ports'},{id:'ports-table',label:'Common Ports Table'}]}
    >
      <div className="callout-tool"><strong>🛠 Fastest Option:</strong> <a href="/tools/port-scanner">Use our Port Scanner →</a> — no installation needed.</div>
      <h2 id="why">Why Check Open Ports?</h2>
      <p>Every open port is a potential entry point for attackers. Open ports run services — and those services can have vulnerabilities. Regularly auditing your open ports is a fundamental security practice.</p>
      <h2 id="online">Method 1: Online Port Scanner</h2>
      <p>Use our <a href="/tools/port-scanner">free Port Scanner</a> to scan common ports on any public IP or hostname without installing anything.</p>
      <h2 id="nmap">Method 2: Nmap</h2>
      <pre><code>{`# Install Nmap
sudo apt install nmap       # Ubuntu/Debian
brew install nmap           # macOS
winget install Nmap         # Windows

# Scan top 1000 ports (default)
nmap 192.168.1.1

# Scan ALL 65535 ports
nmap -p- 192.168.1.1

# Scan specific ports
nmap -p 22,80,443,3389 192.168.1.1

# Detect service versions
nmap -sV 192.168.1.1

# Aggressive scan (OS + version + scripts)
nmap -A 192.168.1.1

# UDP scan (DNS=53, SNMP=161, NTP=123)
nmap -sU -p 53,123,161 192.168.1.1

# Scan entire subnet
nmap 192.168.1.0/24

# Fast scan with service detection
nmap -T4 -sV --open 192.168.1.1

# Run vulnerability scripts
nmap --script vuln 192.168.1.1

# Save results
nmap -oA scan-results 192.168.1.1`}</code></pre>
      <h2 id="local">Method 3: Check Your Own Local Ports</h2>
      <pre><code>{`# Linux — show all listening ports
netstat -tuln
ss -tuln

# macOS
lsof -i -P | grep LISTEN

# Windows
netstat -an | find "LISTENING"

# Show process using each port (Linux, requires root)
sudo ss -tulnp
sudo netstat -tulnp`}</code></pre>
      <h2 id="ports-table">Common Ports Security Reference</h2>
      <table>
        <thead><tr><th>Port</th><th>Service</th><th>Risk if Exposed</th></tr></thead>
        <tbody>
          <tr><td>21</td><td>FTP</td><td>High — use SFTP instead</td></tr>
          <tr><td>22</td><td>SSH</td><td>Medium — disable password auth, use keys</td></tr>
          <tr><td>23</td><td>Telnet</td><td>Critical — disable completely</td></tr>
          <tr><td>25</td><td>SMTP</td><td>Medium — restrict to mail servers</td></tr>
          <tr><td>3389</td><td>RDP</td><td>High — use VPN, enable NLA</td></tr>
          <tr><td>445</td><td>SMB</td><td>High — block at firewall (EternalBlue)</td></tr>
          <tr><td>3306</td><td>MySQL</td><td>Critical — never expose to internet</td></tr>
          <tr><td>5432</td><td>PostgreSQL</td><td>Critical — never expose to internet</td></tr>
          <tr><td>6379</td><td>Redis</td><td>Critical — no auth by default</td></tr>
          <tr><td>27017</td><td>MongoDB</td><td>Critical — no auth by default</td></tr>
        </tbody>
      </table>
    </GuideLayout>
  );
}
