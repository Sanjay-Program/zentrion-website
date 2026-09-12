import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'MCP Security Guide | Model Context Protocol Defenses | Zentrion',
  description: 'Understand the theoretical security risks associated with the Model Context Protocol (MCP). Learn defensive architectural strategies for securing MCP servers against unauthorized access and tool abuse.',
  keywords: 'mcp security, model context protocol security, mcp vulnerabilities, secure ai tools, ai agent security',
};

export default function MCPSecurityGuidePage() {
  return (
    <GuideLayout
      title="MCP (Model Context Protocol) Security – Defensive Guidelines"
      description="The Model Context Protocol (MCP) standardizes how AI agents connect to external tools and datasets. This guide explores the theoretical attack surfaces introduced by MCP and outlines critical defensive practices to secure these deployments."
      timeToRead="15 min read"
      lastUpdated="September 2026"
      tags={['AI Security', 'MCP', 'Defensive Architecture']}
      tools={[
        { name: 'Website Security Scanner', url: '/tools/website-security-scanner' }
      ]}
      relatedGuides={[
        { title: 'OWASP Agentic Top 10', url: '/guides/owasp-agentic-top-10-2026' },
        { title: 'OWASP LLM Top 10', url: '/guides/owasp-llm-top-10-2026' }
      ]}
      headings={[
        { id: 'what-is-mcp', label: 'What is MCP?' },
        { id: 'attack-surfaces', label: 'Theoretical Attack Surfaces' },
        { id: 'defensive-checklist', label: 'MCP Security Checklist' }
      ]}
    >
      <div className="callout-note">
        <strong>📚 Educational Purpose:</strong> This guide focuses purely on the theoretical mechanisms of AI vulnerabilities and the architectural defensive strategies to mitigate them.
      </div>

      <h2 id="what-is-mcp">What is MCP?</h2>
      <p>The Model Context Protocol (MCP) acts as a universal bridge, allowing AI models and agents to securely read data from local or remote sources and execute specific tools. While MCP standardizes connectivity, it also inherently exposes local file systems, databases, and APIs to an intelligent agent. If the agent's intent is manipulated (e.g., via Prompt Injection), the MCP server becomes the vehicle for executing that malicious intent.</p>

      <h2 id="attack-surfaces">Theoretical Attack Surfaces</h2>
      
      <h3>1. Unauthorized Server Exposure</h3>
      <p>If an MCP server is deployed without proper authentication or is inadvertently exposed to the public internet, any external actor can connect an agent to it and begin calling the exposed tools. This bypasses the need to compromise the agent itself.</p>

      <h3>2. Tool Parameter Exploitation</h3>
      <p>Even if an MCP server requires authentication, a compromised agent can still pass malicious parameters to the tools. If a tool executes shell commands or database queries based on agent input without strict input validation, the underlying infrastructure is at risk of command injection or SQL injection.</p>

      <h3>3. Tool Poisoning and Supply Chain</h3>
      <p>Agents rely on the tool descriptions provided by the MCP server to understand how to use them. If an attacker compromises an MCP package in the supply chain, they can alter the tool descriptions to mislead the agent (e.g., describing an exfiltration tool as a "secure logging" tool), causing the agent to unwittingly execute malicious actions.</p>

      <h3>4. Context Manipulation</h3>
      <p>When an agent queries an MCP server for data, a compromised server could return maliciously crafted context (Indirect Prompt Injection). When the agent processes this context, its behavior is hijacked by the attacker.</p>

      <h2 id="defensive-checklist">MCP Security Checklist</h2>
      
      <p>Securing an MCP deployment requires treating the MCP server as a highly sensitive internal API endpoint.</p>

      <ul>
        <li><strong>Network Isolation:</strong> Ensure MCP servers are never exposed to the public internet. They should reside in isolated Virtual Local Area Networks (VLANs) or behind strict firewalls, accessible only by the specific IP addresses of the authorized agents.</li>
        <li><strong>Strong Authentication:</strong> Implement robust mutual authentication (mTLS) or OAuth 2.0. Never rely solely on obscure URLs or internal network placement for security.</li>
        <li><strong>Per-Tool Permission Scoping:</strong> Implement granular access controls. An agent should only have access to the specific MCP tools required for its task, rather than all tools hosted on the server.</li>
        <li><strong>Input Validation:</strong> The MCP server must treat all parameters received from the agent as untrusted input. Implement strict type checking, regex validation, and sanitization before passing parameters to underlying systems.</li>
        <li><strong>Human-in-the-Loop (HITL):</strong> For MCP tools that modify data or execute irreversible actions, enforce a human approval workflow before the tool executes the request.</li>
        <li><strong>Comprehensive Logging:</strong> Log every tool call, including the initiating agent ID, the parameters passed, and the outcome, to facilitate anomaly detection and incident response.</li>
        <li><strong>Supply Chain Vetting:</strong> Only utilize MCP packages from trusted, verified registries. Regularly audit dependencies for known vulnerabilities.</li>
      </ul>

    </GuideLayout>
  );
}
