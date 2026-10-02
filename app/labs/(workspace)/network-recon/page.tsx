'use client';

import React from 'react';
import { LabLayout } from '@/components/LabLayout';
import { Terminal, TerminalCommandMap } from '@/components/Terminal';

export default function NmapPracticeRange() {
  const commandMap: TerminalCommandMap = {
    'help': `Zentrion Web Terminal commands:
clear    - Clear the terminal screen
nmap     - Network exploration tool and security / port scanner
ping     - Send ICMP ECHO_REQUEST to network hosts
whoami   - Print effective userid`,
    'whoami': 'student',
    'ping target.lab': `PING target.lab (10.10.10.10) 56(84) bytes of data.
64 bytes from 10.10.10.10: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from 10.10.10.10: icmp_seq=2 ttl=64 time=0.039 ms
64 bytes from 10.10.10.10: icmp_seq=3 ttl=64 time=0.041 ms

--- target.lab ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2043ms`,
    'ping': 'Usage: ping <destination>',
    'nmap target.lab': `Starting Nmap 7.93 ( https://nmap.org ) at 2026-10-02
Nmap scan report for target.lab (10.10.10.10)
Host is up (0.000041s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.13 seconds`,
    'nmap -sv target.lab': `Starting Nmap 7.93 ( https://nmap.org ) at 2026-10-02
Nmap scan report for target.lab (10.10.10.10)
Host is up (0.000045s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.4
80/tcp   open  http    Apache httpd 2.4.52 ((Ubuntu))
443/tcp  open  https   Apache httpd 2.4.52 ((Ubuntu))
3306/tcp open  mysql   MySQL 5.7.40-log

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.42 seconds`,
    'nmap -p- target.lab': `Starting Nmap 7.93 ( https://nmap.org ) at 2026-10-02
Nmap scan report for target.lab (10.10.10.10)
Host is up (0.000045s latency).
Not shown: 65530 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 2.11 seconds`,
    'nmap': (args: string[]) => {
      if (args.length === 1) return 'Nmap 7.93\nUsage: nmap [Scan Type(s)] [Options] {target specification}';
      if (args[1] === 'target.lab') return commandMap['nmap target.lab'] as string;
      if (args[1] === '-sV' && args[2] === 'target.lab') return commandMap['nmap -sv target.lab'] as string;
      if (args[1] === '-p-' && args[2] === 'target.lab') return commandMap['nmap -p- target.lab'] as string;
      return `Failed to resolve "${args[args.length - 1]}".`;
    }
  };

  return (
    <LabLayout
      title="Nmap Practice Range"
      category="Reconnaissance"
      difficulty="Beginner"
      objective="Perform a full port scan on the target to discover a hidden administration service."
      scope="target.lab (10.10.10.10)"
      target="target.lab"
      hints={[
        "Use the 'ping' command to verify the host is reachable.",
        "A standard 'nmap target.lab' scan only checks the top 1,000 most common ports.",
        "Try scanning all 65,535 ports using the '-p-' flag to find services running on non-standard ports."
      ]}
      flag="ZT{p0rt_8080_d1sc0v3r3d}"
      explanation={
        <>
          <p className="mb-4">
            By default, Nmap scans the top 1,000 most common TCP ports. Since the hidden administration service was running on port <code>8080</code> (which is not in the top 1000 list by default on some configurations, or was deliberately placed on a high port), a standard scan missed it.
          </p>
          <p>
            Using <code>nmap -p- target.lab</code> forces Nmap to scan all 65,535 TCP ports, revealing the hidden <code>http-proxy</code> service. This illustrates why comprehensive scanning is critical during the reconnaissance phase.
          </p>
        </>
      }
      remediation={
        <p>
          Services should not rely on "security by obscurity" (running on a non-standard port). The hidden administration portal should be protected by a VPN, IP allowlisting, and strong Multi-Factor Authentication (MFA).
        </p>
      }
      relatedGuide={{ title: 'Complete Nmap Scanning Tutorial', url: '/guides/nmap-scanning-tutorial' }}
      nextLab={{ title: 'Web Enumeration & Discovery', url: '/labs/web-enumeration' }}
    >
      <Terminal 
        commandMap={commandMap} 
        successCommand="nmap -p- target.lab"
      />
    </LabLayout>
  );
}
