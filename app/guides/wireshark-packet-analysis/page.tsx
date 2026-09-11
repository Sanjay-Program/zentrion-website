import GuideLayout from '@/components/GuideLayout';

export default function WiresharkTutorialPage() {
  return (
    <GuideLayout
      title="Wireshark Packet Analysis – 30 Real-World Exercises"
      description="Learn Wireshark with 30 hands-on exercises. Detect ARP spoofing, port scans, C2 beacons, plaintext credentials, DNS tunneling, and more."
      timeToRead="60 min read"
      lastUpdated="September 2026"
      tags={['Wireshark', 'Packet Analysis', 'Network Forensics', 'Intermediate']}
      tools={[
        { name: 'DNS Lookup', url: '/tools/dns-lookup' },
        { name: 'Speed Test', url: '/tools/network/speed-test' },
      ]}
      relatedGuides={[
        { title: 'Nmap Scanning Tutorial', url: '/guides/nmap-scanning-tutorial' },
        { title: 'Kali Linux Pentesting', url: '/guides/kali-linux-pentesting-tutorial' },
        { title: 'Home Lab Setup', url: '/guides/home-lab-cybersecurity' },
      ]}
      headings={[
        { id: 'intro', label: 'What is Wireshark?' },
        { id: 'install', label: 'Install & Capture' },
        { id: 'exercises', label: '30 Exercises' },
        { id: 'filters', label: 'Filters Cheat Sheet' },
        { id: 'tshark', label: 'tshark (CLI)' },
        { id: 'practice', label: 'PCAP Practice Files' },
      ]}
    >
      <p>GitHub: <a href="https://github.com/wireshark/wireshark" target="_blank" rel="noopener noreferrer">github.com/wireshark/wireshark</a></p>

      <h2 id="install">Install &amp; Start Capturing</h2>
      <pre><code>{`# Ubuntu/Debian
sudo apt install wireshark

# macOS
brew install --cask wireshark

# Start Wireshark, select your interface (eth0 / wlan0 / Wi-Fi)
# Click the blue shark fin to start capturing
# Apply filters in the filter bar (green = valid, red = invalid)`}</code></pre>

      <h2 id="exercises">30 Real-World Exercises</h2>

      <h3>Exercise 1: Capture Your Own Traffic</h3>
      <pre><code>{`Filter: http
# Visit any HTTP site, stop capture, apply filter
# Look at the GET request and 200 OK response`}</code></pre>

      <h3>Exercise 2: Filter by IP Address</h3>
      <pre><code>{`Filter: ip.addr == 8.8.8.8
# Shows all traffic to/from Google DNS`}</code></pre>

      <h3>Exercise 3: Filter by Port</h3>
      <pre><code>{`Filter: tcp.port == 443   # HTTPS traffic
Filter: udp.port == 53    # DNS queries`}</code></pre>

      <h3>Exercise 4: Identify DNS Queries</h3>
      <pre><code>{`Filter: dns
# See every domain your device resolves
# Look at "Questions" in packet details panel`}</code></pre>

      <h3>Exercise 5: Detect Cleartext Passwords ⚠️</h3>
      <pre><code>{`Filter: http.request.method == "POST"
# Expand HTTP → HTML Form URL Encoded Data
# Username/password visible in plaintext — why HTTPS matters!`}</code></pre>

      <h3>Exercise 6: Analyse TCP Handshake</h3>
      <pre><code>{`Filter: tcp.flags.syn == 1 && tcp.flags.ack == 0
# See SYN → SYN-ACK → ACK sequence
# Note sequence numbers and window sizes`}</code></pre>

      <h3>Exercise 7: Detect ARP Spoofing (MITM Attack)</h3>
      <pre><code>{`Filter: arp
# Look for: multiple MAC addresses claiming the same IP
# Or: gratuitous ARP (IP in both sender/target fields)
# One IP → two MACs = man-in-the-middle attack in progress`}</code></pre>

      <h3>Exercise 8: Identify C2 Beacon Traffic</h3>
      <pre><code>{`Filter: tcp && ip.dst != 192.168.1.0/24
# Look for: regular-interval connections to external IPs
# Connection every 60 seconds exactly = C2 beacon pattern`}</code></pre>

      <h3>Exercise 9: Analyse TLS Handshake</h3>
      <pre><code>{`Filter: tls.handshake.type == 1   # Client Hello
Filter: tls.handshake.type == 11  # Certificate
# Inspect Server Certificate → Common Name, Issuer, Validity`}</code></pre>

      <h3>Exercise 10: Detect Port Scanning</h3>
      <pre><code>{`Filter: tcp.flags.syn == 1 && tcp.flags.ack == 0
# Look for: one source IP hitting many different destination ports
Filter: tcp.flags.reset == 1
# Many RSTs from one destination = closed ports being scanned`}</code></pre>

      <h3>Exercise 11: Extract Files from Traffic</h3>
      <pre><code>{`Filter: http
# File → Export Objects → HTTP
# Select files to extract (images, PDFs, executables)`}</code></pre>

      <h3>Exercise 12: Analyse DHCP Process</h3>
      <pre><code>{`Filter: dhcp
# See: Discover → Offer → Request → Acknowledge
# Note assigned IP, gateway, DNS server, lease time`}</code></pre>

      <h3>Exercise 13: Detect DNS Tunneling</h3>
      <pre><code>{`Filter: dns
# Look for: abnormally long domain names (50+ characters)
# e.g., aGVsbG8gd29ybGQ.data.attacker.com
# Base64-encoded data embedded in DNS queries = DNS tunneling`}</code></pre>

      <h3>Exercises 14–30 (Quick Reference)</h3>
      <table>
        <thead><tr><th>#</th><th>Filter</th><th>What to Find</th></tr></thead>
        <tbody>
          <tr><td>14</td><td>smb2</td><td>Windows file sharing, null sessions</td></tr>
          <tr><td>15</td><td>ssh</td><td>Brute-force patterns (many short connections)</td></tr>
          <tr><td>16</td><td>icmp.type == 8</td><td>ICMP ping sweep (sequential IPs)</td></tr>
          <tr><td>17</td><td>http.request</td><td>User-Agent, Referer, Cookie headers</td></tr>
          <tr><td>18</td><td>ftp</td><td>Cleartext FTP credentials (USER/PASS)</td></tr>
          <tr><td>19</td><td>http.request.uri contains "'"</td><td>SQL injection attempts in URLs</td></tr>
          <tr><td>20</td><td>rdp</td><td>RDP connection requests, encryption level</td></tr>
          <tr><td>21</td><td>websocket</td><td>WebSocket Upgrade, real-time frames</td></tr>
          <tr><td>22</td><td>ssh {"&&"} frame.time_delta {"<"} 0.1</td><td>SSH brute-force (fast reconnects)</td></tr>
          <tr><td>23</td><td>ntp</td><td>NTP amplification attack (huge responses)</td></tr>
          <tr><td>24</td><td>smtp</td><td>MAIL FROM, RCPT TO, cleartext email</td></tr>
          <tr><td>25</td><td>dns {"&&"} dns.qry.type == 255</td><td>DNS ANY queries (amplification)</td></tr>
          <tr><td>26</td><td>quic</td><td>HTTP/3 traffic analysis</td></tr>
          <tr><td>27</td><td>mdns</td><td>mDNS/Bonjour Apple/IoT announcements</td></tr>
          <tr><td>28</td><td>arp.opcode == 2 {"&&"} arp.src.hw_mac</td><td>Gratuitous ARP (poisoning)</td></tr>
          <tr><td>29</td><td>krb5</td><td>Kerberos auth, RC4 vs AES encryption</td></tr>
          <tr><td>30</td><td>(open pcap from GitHub)</td><td>Full incident investigation</td></tr>
        </tbody>
      </table>

      <h2 id="filters">Display Filters Cheat Sheet</h2>
      <table>
        <thead><tr><th>Filter</th><th>Shows</th></tr></thead>
        <tbody>
          <tr><td>http</td><td>All HTTP traffic</td></tr>
          <tr><td>dns</td><td>All DNS queries/responses</td></tr>
          <tr><td>tcp.port == 22</td><td>SSH traffic</td></tr>
          <tr><td>udp.port == 53</td><td>DNS over UDP</td></tr>
          <tr><td>ip.addr == 1.2.3.4</td><td>All traffic to/from IP</td></tr>
          <tr><td>tcp.flags.syn == 1</td><td>TCP connection initiations</td></tr>
          <tr><td>icmp.type == 8</td><td>Ping (echo request)</td></tr>
          <tr><td>arp</td><td>ARP requests/replies</td></tr>
          <tr><td>tls</td><td>All TLS/SSL traffic</td></tr>
          <tr><td>!(arp or dns or icmp)</td><td>Exclude noise</td></tr>
        </tbody>
      </table>

      <h2 id="tshark">tshark — Command-Line Wireshark</h2>
      <pre><code>{`# Capture 100 packets on eth0
tshark -i eth0 -c 100

# Filter DNS only (live)
tshark -i eth0 -f "port 53"

# Save to pcap file
tshark -i eth0 -w capture.pcap

# Read a pcap and filter
tshark -r capture.pcap -Y "dns"

# Show HTTP GET requests
tshark -r capture.pcap -Y "http.request.method == GET"

# Extract field values
tshark -r capture.pcap -Y dns -T fields -e dns.qry.name`}</code></pre>

      <h2 id="practice">Practice PCAP Files</h2>
      <ul>
        <li><a href="https://github.com/cyberwithprapti/wireshark" target="_blank" rel="noopener noreferrer">60+ Wireshark Exercises (GitHub)</a></li>
        <li><a href="https://github.com/labex-labs/wireshark-free-tutorials" target="_blank" rel="noopener noreferrer">LabEx Wireshark Free Tutorials</a></li>
        <li><a href="https://github.com/0xrajneesh/Wireshark-Home-Lab" target="_blank" rel="noopener noreferrer">Wireshark Home Lab Setup</a></li>
        <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe — Wireshark rooms</a></li>
      </ul>
    </GuideLayout>
  );
}
