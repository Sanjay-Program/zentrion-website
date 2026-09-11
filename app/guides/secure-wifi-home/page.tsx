import GuideLayout from '@/components/GuideLayout';
export default function SecureWifiHomePage() {
  return (
    <GuideLayout
      title="How to Secure Your Home Wi-Fi Network (10 Steps)"
      description="Protect your home WiFi with 10 proven security steps. Change default passwords, enable WPA3, disable WPS, detect rogue devices, and prevent DNS hijacking."
      timeToRead="8 min read" lastUpdated="September 2026"
      tags={['WiFi Security', 'WPA3', 'Home Network', 'Router']}
      tools={[{name:'DNS Lookup',url:'/tools/dns-lookup'},{name:'Password Generator',url:'/tools/password-generator'},{name:'IP Classifier',url:'/tools/ip-classifier'}]}
      relatedGuides={[{title:'How to Find Open Ports',url:'/guides/find-open-ports'},{title:'How to Check DNS Records',url:'/guides/check-dns-records'}]}
      headings={[{id:'s1',label:'1. Change Router Password'},{id:'s2',label:'2. Use WPA3'},{id:'s3',label:'3. Change SSID'},{id:'s4',label:'4. Disable WPS'},{id:'s5',label:'5. Update Firmware'},{id:'s6',label:'6. Find Rogue Devices'},{id:'s7',label:'7. Enable Firewall'},{id:'s8',label:'8. Disable Remote Mgmt'},{id:'s9',label:'9. Guest Network'},{id:'s10',label:'10. Check DNS Hijacking'}]}
    >
      <h2 id="s1">Step 1: Change Default Router Admin Password</h2>
      <p>Log in to your router at <code>192.168.0.1</code> or <code>192.168.1.1</code> (check the sticker on your router). Change the <strong>admin password</strong> — not the Wi-Fi password. Use our <a href="/tools/password-generator">Password Generator</a> to create a strong one.</p>
      <h2 id="s2">Step 2: Use WPA3 Encryption (or WPA2-AES)</h2>
      <ul>
        <li>Go to Wireless → Security in your router settings</li>
        <li>Select <strong>WPA3</strong> if available, or WPA2-AES as minimum</li>
        <li>Never use WEP (cracked in minutes) or plain WPA (deprecated)</li>
        <li>Wi-Fi password: 12+ random characters — <a href="/tools/password-generator">generate one →</a></li>
      </ul>
      <h2 id="s3">Step 3: Change Your SSID (Network Name)</h2>
      <ul>
        <li>Don't use your name, address, or router brand as the SSID</li>
        <li>These reveal information to attackers wardriving your neighbourhood</li>
        <li>Optionally disable SSID broadcast (adds friction, not full protection)</li>
      </ul>
      <h2 id="s4">Step 4: Disable WPS</h2>
      <p>WPS (Wi-Fi Protected Setup) has a known brute-force vulnerability (Pixie Dust attack) that can recover your Wi-Fi PIN in minutes. Disable it in your router settings → Advanced Wireless → WPS.</p>
      <h2 id="s5">Step 5: Update Router Firmware</h2>
      <pre><code>{`# Check if your router's web interface is exposed
curl -I http://192.168.1.1 | grep -i "server"

# Most routers: Settings → Administration → Firmware Update
# Enable auto-update if available`}</code></pre>
      <h2 id="s6">Step 6: Detect Rogue Devices on Your Network</h2>
      <div className="callout-tool"><strong>🛠 Try:</strong> <a href="/tools/port-scanner">Port Scanner →</a> to probe devices on your network.</div>
      <pre><code>{`# Linux — scan your subnet for all connected devices
nmap -sn 192.168.1.0/24

# View ARP table (shows MAC addresses of connected devices)
arp -a        # Linux / macOS / Windows
arp -an       # Numeric output on Windows

# macOS
arp -a | grep -v incomplete`}</code></pre>
      <h2 id="s7">Step 7: Enable Router Firewall</h2>
      <p>Most modern routers have a built-in firewall. Verify it's enabled under Security → Firewall. Enable SPI (Stateful Packet Inspection) if available.</p>
      <h2 id="s8">Step 8: Disable Remote Management</h2>
      <p>Turn off "Remote Management", "WAN Admin Access", or "Remote Web Access" in your router settings. This prevents anyone on the internet from accessing your router's admin panel.</p>
      <h2 id="s9">Step 9: Set Up a Guest Network for IoT Devices</h2>
      <p>Keep smart TVs, cameras, and IoT devices on a separate guest network, isolated from your computers. Most modern routers support this under Wireless → Guest Network.</p>
      <h2 id="s10">Step 10: Check for DNS Hijacking</h2>
      <pre><code>{`# Check what DNS your device is actually using
cat /etc/resolv.conf                        # Linux
scutil --dns | grep "nameserver"            # macOS
ipconfig /all | findstr "DNS Servers"       # Windows

# Verify DNS isn't hijacked — compare results across servers
dig A google.com @8.8.8.8 +short    # Google DNS
dig A google.com @1.1.1.1 +short    # Cloudflare DNS
# Results should match your router's DNS result

# Check your router's DNS settings haven't been changed
curl -s http://192.168.1.1 | grep -i "dns"  # Very basic check`}</code></pre>
    </GuideLayout>
  );
}
