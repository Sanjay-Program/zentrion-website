import GuideLayout from '@/components/GuideLayout';
export default function HomeSOCPage() {
  return (
    <GuideLayout
      title="Home SOC Setup with Wazuh + Suricata (Free)"
      description="Build a free home Security Operations Center using Wazuh SIEM, Suricata IDS, and Snort. Complete installation and configuration guide with alert testing."
      timeToRead="40 min read" lastUpdated="September 2026"
      tags={['SOC','Wazuh','Suricata','SIEM','Advanced']}
      tools={[{name:'DNS Lookup',url:'/tools/dns-lookup'},{name:'IP Blacklist',url:'/tools/ip-blacklist'},{name:'CVE Lookup',url:'/tools/cve-lookup'}]}
      relatedGuides={[{title:'Ransomware Incident Response',url:'/guides/ransomware-incident-response'},{title:'Home Lab Setup',url:'/guides/home-lab-cybersecurity'},{title:'Wireshark Analysis',url:'/guides/wireshark-packet-analysis'}]}
      headings={[{id:'overview',label:'What is a SOC?'},{id:'wazuh',label:'Wazuh SIEM'},{id:'suricata',label:'Suricata IDS'},{id:'snort',label:'Snort 3'},{id:'logging',label:'Centralise Logs'},{id:'testing',label:'Test Alerts'},{id:'next',label:'Next Steps'}]}
    >
      <h2 id="overview">What is a Home SOC?</h2>
      <p>A Security Operations Center (SOC) monitors your systems for threats 24/7. A home SOC uses free, open-source tools to achieve what enterprise teams pay millions for:</p>
      <ul>
        <li><strong>Wazuh</strong> — SIEM + HIDS (Host Intrusion Detection) — <a href="https://github.com/wazuh/wazuh" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><strong>Suricata</strong> — Network IDS/IPS</li>
        <li><strong>Snort 3</strong> — Network intrusion detection</li>
      </ul>

      <h2 id="wazuh">Install Wazuh (SIEM + HIDS)</h2>
      <pre><code>{`# Add Wazuh repository
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" \\
  | tee /etc/apt/sources.list.d/wazuh.list

# Install Wazuh agent (on monitored machine)
sudo apt update && sudo apt install wazuh-agent

# Configure manager IP
sudo sed -i 's/MANAGER_IP/your-wazuh-server-ip/' /var/ossec/etc/ossec.conf

# Start agent
sudo systemctl start wazuh-agent
sudo systemctl enable wazuh-agent

# Install Wazuh manager + indexer + dashboard (on server VM)
# Full guide: https://documentation.wazuh.com/current/quickstart.html
curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh
sudo bash wazuh-install.sh -a

# Access dashboard
# https://your-server-ip:443
# Default: admin / (shown at end of install)`}</code></pre>

      <h2 id="suricata">Install Suricata IDS</h2>
      <pre><code>{`# Install Suricata
sudo apt install suricata

# Update rule sets
sudo suricata-update

# Configure network interface
sudo nano /etc/suricata/suricata.yaml
# Find "af-packet" section, set interface: eth0

# Start Suricata
sudo systemctl start suricata
sudo systemctl enable suricata

# Watch alerts in real-time
sudo tail -f /var/log/suricata/fast.log

# Test with a known-bad request
curl http://testmynids.org/uid/index.html
# Should generate an alert in fast.log`}</code></pre>

      <h2 id="snort">Install Snort 3</h2>
      <pre><code>{`# Install Snort 3
sudo apt install snort3

# Verify install
snort3 -V

# Test configuration
sudo snort3 -T -c /etc/snort3/snort3.lua

# Start monitoring on eth0
sudo snort3 -i eth0 -c /etc/snort3/snort3.lua -A alert_fast

# View alerts
sudo tail -f /var/log/snort/alert_fast.txt`}</code></pre>

      <h2 id="logging">Centralise Logs with rsyslog</h2>
      <pre><code>{`# On monitored machines — send logs to Wazuh server
# Create /etc/rsyslog.d/10-wazuh.conf:
cat > /etc/rsyslog.d/10-wazuh.conf << 'RSYSLOG'
*.* @wazuh-server-ip:514
RSYSLOG

sudo systemctl restart rsyslog

# Verify logs are arriving on Wazuh server
sudo tail -f /var/ossec/logs/alerts/alerts.log`}</code></pre>

      <h2 id="testing">Test Your SOC Alerts</h2>
      <pre><code>{`# Trigger an authentication failure alert
ssh invaliduser@localhost

# Trigger a web attack alert (SQLi)
curl "http://localhost/?id=1' OR 1=1--"

# Trigger a port scan alert
nmap -sS 127.0.0.1

# Check Wazuh dashboard within 30 seconds for alerts
# Navigate to: Threat Detection → Events

# Test file integrity monitoring
echo "test" > /etc/testfile
# Wazuh should alert on unexpected file creation in /etc`}</code></pre>

      <h2 id="next">Next Steps</h2>
      <ul>
        <li>Integrate <a href="https://thehive-project.org/" target="_blank" rel="noopener noreferrer">TheHive</a> for incident management</li>
        <li>Add <a href="https://www.elastic.co/elk-stack" target="_blank" rel="noopener noreferrer">Elastic Stack</a> for advanced log analytics</li>
        <li>Connect <a href="https://www.misp-project.org/" target="_blank" rel="noopener noreferrer">MISP</a> for threat intelligence sharing</li>
        <li>Check IPs in our <a href="/tools/ip-blacklist">IP Blacklist Checker</a></li>
        <li>Look up CVEs in our <a href="/tools/cve-lookup">CVE Lookup</a></li>
      </ul>
    </GuideLayout>
  );
}
