'use client';

import React from 'react';
import { LabLayout } from '@/components/LabLayout';
import { Terminal, TerminalCommandMap } from '@/components/Terminal';

export default function WebEnumerationRange() {
  const commandMap: TerminalCommandMap = {
    'help': `Zentrion Web Terminal commands:
clear    - Clear the terminal screen
gobuster - Directory/File, DNS and VHost busting tool
ping     - Send ICMP ECHO_REQUEST to network hosts
cat      - Concatenate files and print on the standard output`,
    'ping': 'Usage: ping <destination>',
    'ping target.lab': `PING target.lab (10.10.10.10) 56(84) bytes of data.
64 bytes from 10.10.10.10: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from 10.10.10.10: icmp_seq=2 ttl=64 time=0.039 ms

--- target.lab ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`,
    'cat': 'Usage: cat <file>',
    'cat common.txt': `admin
login
test
backup
api
dev
uploads
.git
config`,
    'gobuster': (args: string[]) => {
      if (args.length < 3) return `Usage: gobuster dir -u <url> -w <wordlist>
Example: gobuster dir -u http://target.lab -w common.txt`;
      
      const isDir = args.includes('dir');
      const uIndex = args.indexOf('-u');
      const wIndex = args.indexOf('-w');
      
      if (!isDir || uIndex === -1 || wIndex === -1) {
        return `Error: Missing required arguments. Use 'gobuster dir -u <url> -w <wordlist>'`;
      }
      
      const url = args[uIndex + 1];
      const wordlist = args[wIndex + 1];
      
      if (url !== 'http://target.lab' && url !== 'target.lab') {
        return `Error: Could not connect to ${url}`;
      }
      
      if (wordlist !== 'common.txt') {
        return `Error: Wordlist ${wordlist} not found. Try 'common.txt'`;
      }
      
      return `===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://target.lab
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/admin                (Status: 301) [Size: 314] [--> /admin/]
/login                (Status: 200) [Size: 1542]
/api                  (Status: 403) [Size: 277]
/uploads              (Status: 301) [Size: 316] [--> /uploads/]
/.git                 (Status: 403) [Size: 277]
/dev                  (Status: 200) [Size: 56]
/backup               (Status: 200) [Size: 21459203]
===============================================================
Finished
===============================================================`;
    }
  };

  return (
    <LabLayout
      labId="web-enumeration"
      xpReward={150}
      title="Web Enumeration & Discovery"
      category="Web Security"
      difficulty="Beginner"
      objective="Use gobuster to discover a sensitive accidentally exposed directory on the web server."
      scope="http://target.lab"
      target="http://target.lab"
      hints={[
        "First, use 'cat common.txt' to see what words you are testing.",
        "The basic syntax is: gobuster dir -u http://target.lab -w common.txt",
        "Look for directories returning HTTP Status 200 (OK). Status 403 means Forbidden, 301 means Redirect.",
        "A large file size (Size: 21459203) usually indicates an archive or database dump."
      ]}
      flag="ZENTRION{unpr0t3ct3d_b4ckup_f0und}"
      explanation={
        <>
          <p className="mb-4">
            Directory enumeration is the process of discovering hidden paths on a web server by rapidly requesting a list of common file and directory names (a wordlist).
          </p>
          <p className="mb-4">
            In this lab, the <code>gobuster</code> tool revealed several paths. While <code>/admin</code> and <code>/api</code> are common, the <code>/backup</code> directory returned a 200 OK status with a massive file size (21MB). 
          </p>
          <p>
            Attackers actively scan the internet for exactly these kinds of exposed backups, which often contain source code, database credentials, and customer PII.
          </p>
        </>
      }
      remediation={
        <p>
          Never store backup archives (`.zip`, `.tar.gz`, `.sql`) in the web root directory (e.g., `/var/www/html`). Backups should be stored offline or in secure, access-controlled cloud storage buckets (like AWS S3 with Block Public Access enabled).
        </p>
      }
      nextLab={{ title: 'Cross-Site Scripting (XSS)', url: '/labs/xss-simulation' }}
    >
      <Terminal 
        commandMap={commandMap} 
        successCommand="gobuster dir -u http://target.lab -w common.txt"
      />
    </LabLayout>
  );
}
