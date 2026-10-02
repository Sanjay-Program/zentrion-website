'use client';

import React from 'react';
import { LabLayout } from '@/components/LabLayout';
import { Terminal, VFSNode } from '@/components/Terminal';

export default function Forensics01Range() {
  const vfs: Record<string, VFSNode> = {
    'var': {
      type: 'dir',
      children: {
        'log': {
          type: 'dir',
          children: {
            'auth.log': {
              type: 'file',
              content: `Oct  2 03:12:01 server sshd[102]: Failed password for root from 185.15.22.1 port 52101 ssh2
Oct  2 03:12:05 server sshd[102]: Failed password for root from 185.15.22.1 port 52102 ssh2
Oct  2 03:12:09 server sshd[102]: Failed password for admin from 185.15.22.1 port 52103 ssh2
Oct  2 03:12:12 server sshd[102]: Accepted password for admin from 185.15.22.1 port 52105 ssh2
Oct  2 03:12:15 server sshd[102]: session opened for user admin by (uid=0)
Oct  2 03:15:00 server sudo:   admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/bash
Oct  2 03:20:45 server sshd[102]: Received disconnect from 185.15.22.1 port 52105:11: disconnected by user
Oct  2 03:20:45 server sshd[102]: Disconnected from user admin 185.15.22.1 port 52105
Oct  2 03:30:10 server sshd[205]: Accepted publickey for webmaster from 10.0.0.5 port 49100 ssh2`
            },
            'access.log': {
              type: 'file',
              content: `185.15.22.1 - - [02/Oct/2026:03:10:15 +0000] "GET / HTTP/1.1" 200 4521 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
185.15.22.1 - - [02/Oct/2026:03:10:18 +0000] "GET /admin HTTP/1.1" 401 312 "-" "Mozilla/5.0"
185.15.22.1 - - [02/Oct/2026:03:10:25 +0000] "POST /api/login HTTP/1.1" 401 54 "-" "Hydra/9.4"
185.15.22.1 - - [02/Oct/2026:03:10:26 +0000] "POST /api/login HTTP/1.1" 401 54 "-" "Hydra/9.4"
185.15.22.1 - - [02/Oct/2026:03:10:27 +0000] "POST /api/login HTTP/1.1" 401 54 "-" "Hydra/9.4"
185.15.22.1 - - [02/Oct/2026:03:10:28 +0000] "POST /api/login HTTP/1.1" 200 128 "-" "Hydra/9.4"
185.15.22.1 - - [02/Oct/2026:03:11:00 +0000] "GET /backup.zip HTTP/1.1" 200 1024523 "-" "curl/7.81.0"
10.0.0.5 - - [02/Oct/2026:03:35:10 +0000] "GET /status HTTP/1.1" 200 15 "-" "Prometheus/2.37"`
            }
          }
        }
      }
    },
    'home': {
      type: 'dir',
      children: {
        'admin': {
          type: 'dir',
          children: {
            'note.txt': {
              type: 'file',
              content: 'Do not forget to rotate the SSH keys on Friday.'
            },
            '.bash_history': {
              type: 'file',
              content: `ls -la
cd /var/www/html
cat config.php
sudo su
exit`
            }
          }
        }
      }
    }
  };

  return (
    <LabLayout
      labId="forensics-01"
      xpReward={250}
      title="Digital Forensics 01"
      category="Forensics"
      difficulty="Beginner"
      objective="Analyze the provided server logs in /var/log to identify the attacker's IP address."
      scope="Local Linux Environment"
      target="Zentrion VFS"
      hints={[
        "Use 'ls' and 'cd' to navigate the virtual filesystem. Logs are usually stored in '/var/log'.",
        "Use 'ls var/log' to list the files in the log directory.",
        "Use 'cat var/log/auth.log' or 'cat var/log/access.log' to read the contents of the files.",
        "Look for multiple 'Failed password' or '401' responses indicating a brute force attack, followed by a success ('Accepted password' or '200').",
        "The flag is ZT{IP_ADDRESS} where IP_ADDRESS is the attacker's IP."
      ]}
      flag="ZT{185.15.22.1}"
      explanation={
        <>
          <p className="mb-4">
            By analyzing <code>/var/log/auth.log</code>, we can see a clear brute-force attack originating from <code>185.15.22.1</code>. The attacker tried to guess the password for <code>root</code>, failed, then tried <code>admin</code> and succeeded at 03:12:12.
          </p>
          <p>
            Correlating this with <code>/var/log/access.log</code>, we see the same IP address using a tool called <strong>Hydra</strong> to brute-force the web login API right before the SSH intrusion. Shortly after, they downloaded <code>backup.zip</code> using curl. 
          </p>
        </>
      }
      remediation={
        <p>
          SSH should never be exposed to the public internet using password authentication. Implement Key-Based Authentication only, disable root login (<code>PermitRootLogin no</code>), and use a tool like <strong>Fail2Ban</strong> to automatically block IP addresses that generate too many failed authentication attempts.
        </p>
      }
    >
      <Terminal 
        welcomeMessage="ZENTRION INCIDENT RESPONSE TERMINAL\nUse 'pwd', 'ls', 'cd', 'cat', and 'grep' to explore the evidence files."
        prompt="investigator@soc"
        vfs={vfs}
      />
    </LabLayout>
  );
}
