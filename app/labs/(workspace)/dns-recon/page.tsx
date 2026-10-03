'use client';

import React from 'react';
import { LabLayout } from '@/components/LabLayout';
import { Terminal, TerminalCommandMap } from '@/components/Terminal';

export default function DNSReconRange() {
  const commandMap: TerminalCommandMap = {
    'help': `Zentrion Web Terminal commands:
clear    - Clear the terminal screen
dig      - DNS lookup utility
host     - DNS lookup utility
whois    - client for the whois directory service`,
    'dig-help': 'Usage: dig [@server] [-b address] [-c class] [-f filename] [-k filename] [-m] [-p port#] [-q name] [-t type] [-v] [-x addr] [-y [hmac:]name:key] [-4] [-6] [name] [type] [class] [queryopt...]',
    'dig target.lab': `; <<>> DiG 9.18.1-1ubuntu1.2 <<>> target.lab
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 38291
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;target.lab.			IN	A

;; ANSWER SECTION:
target.lab.		300	IN	A	10.10.10.10

;; Query time: 4 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Fri Oct 02 23:20:15 UTC 2026
;; MSG SIZE  rcvd: 55`,
    'dig target.lab any': `; <<>> DiG 9.18.1-1ubuntu1.2 <<>> target.lab any
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 49102
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;target.lab.			IN	ANY

;; ANSWER SECTION:
target.lab.		300	IN	A	10.10.10.10
target.lab.		300	IN	MX	10 mail.target.lab.
target.lab.		300	IN	TXT	"v=spf1 include:_spf.target.lab ~all"
target.lab.		300	IN	TXT	"zentrion-verification=ZT{dn5_z0n3_tr4nsf3r}"

;; Query time: 2 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Fri Oct 02 23:20:25 UTC 2026
;; MSG SIZE  rcvd: 162`,
    'dig any target.lab': (args: string[]) => commandMap['dig target.lab any'] as string,
    'dig target.lab txt': `; <<>> DiG 9.18.1-1ubuntu1.2 <<>> target.lab txt
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18492
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;target.lab.			IN	TXT

;; ANSWER SECTION:
target.lab.		300	IN	TXT	"v=spf1 include:_spf.target.lab ~all"
target.lab.		300	IN	TXT	"zentrion-verification=ZT{dn5_z0n3_tr4nsf3r}"

;; Query time: 3 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Fri Oct 02 23:20:30 UTC 2026
;; MSG SIZE  rcvd: 128`,
    'dig txt target.lab': (args: string[]) => commandMap['dig target.lab txt'] as string,
    'dig': (args: string[]) => {
      if (args.length === 1) return commandMap['dig-help'] as string;
      const cmdStr = args.join(' ');
      if (cmdStr.includes('target.lab') && (cmdStr.includes('txt') || cmdStr.includes('any') || cmdStr.includes('TXT') || cmdStr.includes('ANY'))) {
         return commandMap['dig target.lab txt'] as string;
      }
      if (args[1] === 'target.lab' && args.length === 2) return commandMap['dig target.lab'] as string;
      return 'Command parsed, but specific record type not supported in this simulation environment. Try querying target.lab, or checking TXT or ANY records.';
    },
    'whois target.lab': `Domain Name: target.lab
Registry Domain ID: 123456789_DOMAIN_LAB-VRSN
Registrar WHOIS Server: whois.fake-registrar.com
Registrar URL: http://www.fake-registrar.com
Updated Date: 2026-01-01T00:00:00Z
Creation Date: 2025-01-01T00:00:00Z
Registrar Registration Expiration Date: 2027-01-01T00:00:00Z
Registrar: Fake Registrar LLC
Registrant Name: IT Admin
Registrant Email: admin@target.lab
Name Server: ns1.target.lab
Name Server: ns2.target.lab
DNSSEC: unsigned`
  };

  return (
    <LabLayout
      labId="dns-recon"
      xpReward={100}
      title="DNS Reconnaissance"
      category="Reconnaissance"
      difficulty="Beginner"
      objective="Query the DNS records of the target domain to uncover a hidden verification token left in a text record."
      scope="target.lab"
      target="target.lab"
      hints={[
        "The 'dig' command is used to query DNS nameservers.",
        "A basic 'dig target.lab' only returns the 'A' record (IP address).",
        "Organizations often hide verification tokens, SPF rules, and third-party integrations in 'TXT' records.",
        "Try running 'dig target.lab txt' or 'dig target.lab any'."
      ]}
      flag="ZENTRION{dn5_z0n3_tr4nsf3r}"
      explanation={
        <>
          <p className="mb-4">
            DNS (Domain Name System) holds much more than just IP addresses. When attackers perform reconnaissance, they query DNS for <code>TXT</code> records, <code>MX</code> (Mail Exchange) records, and <code>CNAME</code> records.
          </p>
          <p>
            In this lab, querying the <code>TXT</code> records revealed an SPF email security policy, but it also revealed a custom verification token (<code>zentrion-verification=...</code>). Developers frequently use DNS TXT records to prove domain ownership to third-party SaaS applications, which can inadvertently leak information about the organization's technology stack or internal naming conventions.
          </p>
        </>
      }
      remediation={
        <p>
          While TXT records are required for SPF/DMARC (email security) and initial domain verification, stale or unnecessary verification tokens should be removed once domain ownership is established. Never store sensitive credentials, internal IPs, or organizational secrets in public DNS records.
        </p>
      }
      nextLab={{ title: 'Nmap Practice Range', url: '/labs/network-recon' }}
    >
      <Terminal 
        commandMap={commandMap} 
        successCommand="dig target.lab txt"
      />
    </LabLayout>
  );
}
