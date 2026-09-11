import GuideLayout from '@/components/GuideLayout';
export default function PasswordCrackingPage() {
  return (
    <GuideLayout
      title="Password Cracking with Hashcat & John the Ripper"
      description="Learn ethical password cracking with Hashcat and John the Ripper. Dictionary attacks, brute force, mask attacks, Wi-Fi WPA cracking, and ZIP/RAR cracking."
      timeToRead="50 min read" lastUpdated="September 2026"
      tags={['Hashcat','John the Ripper','Password Security','Intermediate']}
      tools={[{name:'Hash Generator',url:'/tools/hash-generator'},{name:'Password Strength',url:'/tools/password-strength'},{name:'Password Generator',url:'/tools/password-generator'}]}
      relatedGuides={[{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'},{title:'CTF Walkthrough',url:'/guides/ctf-walkthrough-beginner'}]}
      headings={[{id:'ethics',label:'⚠️ Ethics'},{id:'hashcat',label:'Hashcat'},{id:'john',label:'John the Ripper'},{id:'wifi',label:'Wi-Fi WPA Cracking'},{id:'zip',label:'ZIP/RAR Cracking'},{id:'ssh',label:'SSH Brute Force'}]}
    >
      <div className="callout-warn"><strong>⚠️ Ethics:</strong> Only crack password hashes you own or have written permission to test. Unauthorised cracking is a criminal offence in most countries.</div>
      <h2 id="hashcat">Hashcat</h2>
      <p>GitHub: <a href="https://github.com/hashcat/hashcat" target="_blank" rel="noopener noreferrer">github.com/hashcat/hashcat</a></p>
      <pre><code>{`# Install
sudo apt install hashcat        # Kali/Debian
# Windows: download from hashcat.net

# Benchmark your GPU speed
hashcat -b

# Generate a test hash to practice
echo -n "password123" | sha256sum
# Output: ef92b778... (use this as your hash.txt)

# Attack Mode 0: Dictionary (most common)
hashcat -m 1400 -a 0 hash.txt /usr/share/wordlists/rockyou.txt

# Attack Mode 3: Brute Force (all combinations)
hashcat -m 1400 -a 3 hash.txt ?a?a?a?a?a?a?a?a

# Attack Mode 6: Hybrid (dict + mask)
hashcat -m 1400 -a 6 hash.txt rockyou.txt ?d?d?d?d

# Mask characters: ?l=lowercase ?u=uppercase ?d=digit ?s=special ?a=all
# Custom mask: 3 uppercase + 4 digits
hashcat -m 1400 -a 3 hash.txt -1 ?u?u?u?d?d?d?d

# Show cracked passwords
hashcat --show hash.txt

# Resume a paused session
hashcat --restore`}</code></pre>

      <h3>Hash Types Reference</h3>
      <table>
        <thead><tr><th>Mode</th><th>Hash Type</th><th>Common Use</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>MD5</td><td>Old web apps</td></tr>
          <tr><td>100</td><td>SHA-1</td><td>Old systems</td></tr>
          <tr><td>1400</td><td>SHA-256</td><td>Modern apps</td></tr>
          <tr><td>1700</td><td>SHA-512</td><td>Modern apps</td></tr>
          <tr><td>3200</td><td>bcrypt</td><td>Secure web apps</td></tr>
          <tr><td>1000</td><td>NTLM</td><td>Windows</td></tr>
          <tr><td>22000</td><td>WPA-PBKDF2-PMKID+EAPOL</td><td>Wi-Fi WPA2/3</td></tr>
        </tbody>
      </table>

      <h2 id="john">John the Ripper</h2>
      <p>GitHub: <a href="https://github.com/openwall/john" target="_blank" rel="noopener noreferrer">github.com/openwall/john</a></p>
      <pre><code>{`# Install
sudo apt install john

# Basic crack (auto-detects hash type)
john hash.txt

# Use a wordlist
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

# Apply mutation rules (adds numbers, symbols to words)
john --wordlist=rockyou.txt --rules=Best64 hash.txt

# Crack Windows NTLM hashes
john --format=nt hash.txt

# Show cracked passwords
john --show hash.txt

# Use multiple CPU cores
john --fork=4 hash.txt`}</code></pre>

      <h2 id="wifi">Wi-Fi WPA2 Cracking</h2>
      <pre><code>{`# Step 1: Capture WPA handshake (from wireless attack)
sudo airmon-ng start wlan0
sudo airodump-ng -c <CH> --bssid <BSSID> -w capture wlan0mon
sudo aireplay-ng --deauth 5 -a <BSSID> wlan0mon

# Step 2: Convert to hashcat format
hcxpcapngtool capture-01.cap -o hash.hc22000

# Step 3: Crack with hashcat
hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt

# Step 4: Or use aircrack-ng
aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap`}</code></pre>

      <h2 id="zip">ZIP &amp; RAR Password Cracking</h2>
      <pre><code>{`# ZIP with fcrackzip
fcrackzip -v -u -D -p /usr/share/wordlists/rockyou.txt archive.zip

# ZIP with John
zip2john archive.zip > zip_hash.txt
john --wordlist=rockyou.txt zip_hash.txt

# RAR with John
rar2john archive.rar > rar_hash.txt
john --format=rar5 rar_hash.txt`}</code></pre>

      <h2 id="ssh">SSH Brute Force (Authorised Testing Only)</h2>
      <pre><code>{`# With Hydra
hydra -L users.txt -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.1

# With Medusa
medusa -h 192.168.1.1 -U users.txt -P rockyou.txt -M ssh

# With Ncrack
ncrack -U users.txt -P rockyou.txt -T 10 192.168.1.1:22`}</code></pre>

      <div className="callout-info">
        <strong>📚 Wordlist Resources:</strong> <a href="https://github.com/berzerk0/Probable-Wordlists" target="_blank" rel="noopener noreferrer">Probable-Wordlists (GitHub)</a> — Ranked real-world password lists. <code>rockyou.txt</code> on Kali: <code>/usr/share/wordlists/rockyou.txt.gz</code> (unzip first)
      </div>
    </GuideLayout>
  );
}
