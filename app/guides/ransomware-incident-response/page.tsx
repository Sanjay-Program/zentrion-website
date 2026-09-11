import GuideLayout from '@/components/GuideLayout';
export default function RansomwareIRPage() {
  return (
    <GuideLayout
      title="Ransomware Incident Response Playbook"
      description="Step-by-step ransomware incident response guide. Identify infection, isolate systems, preserve forensic evidence, remove malware, and restore from backup."
      timeToRead="25 min read" lastUpdated="September 2026"
      tags={['Ransomware','Incident Response','IR Playbook','Advanced']}
      tools={[{name:'Hash Generator',url:'/tools/hash-generator'},{name:'URL Safety Checker',url:'/tools/url-safety'},{name:'CVE Lookup',url:'/tools/cve-lookup'}]}
      relatedGuides={[{title:'Home SOC Setup',url:'/guides/home-soc-setup'},{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'}]}
      headings={[{id:'identify',label:'1. Identify Infection'},{id:'isolate',label:'2. Isolate System'},{id:'evidence',label:'3. Preserve Evidence'},{id:'family',label:'4. Identify Ransomware'},{id:'persist',label:'5. Find Persistence'},{id:'network',label:'6. Network Investigation'},{id:'restore',label:'7. Restore'},{id:'prevent',label:'Prevention'}]}
    >
      <div className="callout-warn"><strong>⚠️ Critical First Step:</strong> Do NOT pay the ransom. There is no guarantee of data recovery, and payment funds criminal operations.</div>

      <h2 id="identify">Step 1: Identify the Infection</h2>
      <pre><code>{`# Look for suspicious processes
ps auxf | grep -iE "encrypt|ransom|lock|crypt"

# Find recently modified/encrypted files
find / -name "*.locked" -o -name "*.encrypted" -o -name "*.crypt" 2>/dev/null
find / -name "*DECRYPT*" -o -name "*ransom*" -newer /tmp -mmin -60 2>/dev/null

# Find ransom notes
find / -name "README.txt" -newer /var/log/syslog -mmin -120 2>/dev/null
find / -name "*HELP*" -mmin -60 2>/dev/null

# Check recently created files
find /home /var/www /tmp -mmin -60 -type f 2>/dev/null | head -30`}</code></pre>

      <h2 id="isolate">Step 2: Isolate the Infected System</h2>
      <pre><code>{`# Disable all network interfaces immediately
sudo ip link set eth0 down
sudo ip link set wlan0 down

# Or disable NetworkManager
sudo systemctl stop NetworkManager

# Block all outbound traffic via firewall
sudo iptables -P OUTPUT DROP
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP

# On Windows:
# netsh advfirewall set allprofiles state on
# netsh advfirewall firewall add rule name="BLOCK_ALL" dir=out action=block`}</code></pre>

      <h2 id="evidence">Step 3: Preserve Forensic Evidence</h2>
      <pre><code>{`# Take a RAM dump (before rebooting — encryption keys may be in memory)
sudo lime-forensics -o /evidence/memory.lime -f lime

# Or use avml
sudo avml /evidence/memory.avml

# Create a bit-for-bit disk image
sudo dd if=/dev/sda of=/evidence/disk.img bs=4M status=progress

# Calculate hash to verify integrity
sha256sum /evidence/disk.img > /evidence/disk.img.sha256

# List all running processes (snapshot)
ps auxf > /evidence/processes.txt
netstat -tlnp > /evidence/network.txt
lsof -i > /evidence/open_files.txt`}</code></pre>

      <h2 id="family">Step 4: Identify the Ransomware Family</h2>
      <pre><code>{`# Check file extensions being used
ls -la /home/user/Documents/ | grep -E "\.(locked|encrypted|crypt|ransom)"

# Submit ransom note/sample to ID Ransomware:
# https://id-ransomware.malwarehunterteam.com/

# Check file hash against VirusTotal
sha256sum /path/to/suspicious_binary
# Submit hash to virustotal.com

# Check known CVEs related to the ransomware variant:
# https://zentriontechnologies.com/tools/cve-lookup`}</code></pre>

      <h2 id="persist">Step 5: Find Persistence Mechanisms</h2>
      <pre><code>{`# Cron jobs
crontab -l
cat /etc/crontab
ls -la /etc/cron.{d,daily,hourly,monthly,weekly}/

# Startup scripts
cat /etc/rc.local
ls /etc/systemd/system/*.service

# Check recently added systemd services
systemctl list-units --type=service --state=running
systemctl list-units --type=service | grep -v "(generated)"

# Bash history
cat ~/.bash_history | tail -50`}</code></pre>

      <h2 id="network">Step 6: Network Investigation</h2>
      <pre><code>{`# Check established connections at time of infection
netstat -tlnp
ss -tlnp

# Look for unusual outbound connections
netstat -anp | grep ESTABLISHED | grep -v "127.0.0.1\|::1"

# Check DNS resolution logs (C2 domains)
journalctl -u systemd-resolved | grep -i "query\|response"

# Check for lateral movement
grep -i "ssh\|rdp\|smb" /var/log/auth.log | tail -50`}</code></pre>

      <h2 id="restore">Step 7: Restore from Backup</h2>
      <pre><code>{`# Verify backup integrity before restoring
sha256sum /backup/clean-backup.tar.gz
cat /backup/clean-backup.tar.gz.sha256   # Compare

# Restore (wipe infected system first)
tar -xzf /backup/clean-backup-2026-09-10.tar.gz -C /restore/

# Restore from snapshot (if using ZFS/LVM/btrfs)
# ZFS: zfs rollback tank/data@clean-snapshot
# LVM: lvconvert --merge /dev/vg0/data_snapshot`}</code></pre>

      <h2 id="prevent">Prevention Checklist</h2>
      <ul>
        <li><strong>3-2-1 Backup Rule:</strong> 3 copies, 2 media types, 1 offsite</li>
        <li>Apply security patches within 24h of release — check for CVEs: <a href="/tools/cve-lookup">CVE Lookup →</a></li>
        <li>Deploy EDR (Endpoint Detection & Response) software</li>
        <li>Restrict RDP/SMB — never expose to internet</li>
        <li>Use strong, unique passwords — <a href="/tools/password-generator">Generator →</a></li>
        <li>Enable DMARC/SPF to prevent phishing emails: <a href="/tools/spf-checker">SPF Checker →</a></li>
        <li>Segment network — isolate critical systems</li>
        <li>Train staff to recognise phishing</li>
      </ul>
    </GuideLayout>
  );
}
