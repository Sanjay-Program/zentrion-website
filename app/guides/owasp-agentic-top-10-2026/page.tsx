import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'OWASP Agentic Top 10 (2026) | AI Agent Security | Zentrion',
  description: 'A theoretical breakdown of the 2026 OWASP Top 10 for Agentic Applications. Understand the architectural risks of autonomous AI agents, including Goal Hijacking and Cascading Failures.',
  keywords: 'owasp agentic top 10, ai agent security, autonomous ai risks, agent goal hijacking, ai security framework',
};

export default function OwaspAgenticGuidePage() {
  return (
    <GuideLayout
      title="OWASP Top 10 for Agentic Applications (2026) – Defensive Architecture"
      description="While the LLM Top 10 focuses on models that 'answer', the Agentic Top 10 focuses on AI that 'acts'. This guide breaks down the theoretical risks of autonomous AI agents and the architectural strategies needed to secure them."
      timeToRead="20 min read"
      lastUpdated="September 2026"
      tags={['AI Security', 'OWASP', 'Agentic Systems']}
      tools={[
        { name: 'Website Security Scanner', url: '/tools/website-security-scanner' }
      ]}
      relatedGuides={[
        { title: 'OWASP LLM Top 10', url: '/guides/owasp-llm-top-10-2026' },
        { title: 'MCP Security Guide', url: '/guides/mcp-security-tutorial' }
      ]}
      headings={[
        { id: 'overview', label: 'LLMs vs. Agents' },
        { id: 'asi01', label: 'ASI01: Agent Goal Hijack' },
        { id: 'asi02', label: 'ASI02: Tool Misuse' },
        { id: 'asi05', label: 'ASI05: Unexpected Code Execution' },
        { id: 'asi07', label: 'ASI07: Insecure Inter-Agent Communication' },
        { id: 'defenses', label: 'Architecting Secure Agents' }
      ]}
    >
      <div className="callout-note">
        <strong>📚 Educational Purpose:</strong> This guide focuses purely on the theoretical mechanisms of AI agent vulnerabilities and the architectural defensive strategies to mitigate them. It does not provide actionable exploits.
      </div>

      <h2 id="overview">LLMs vs. Agents: The Security Shift</h2>
      <p>A standard LLM application takes an input and generates text. The primary risk is what the model says. An Agentic application takes a high-level goal, reasons through a plan, and autonomously uses tools (APIs, databases, web browsers) to achieve that goal. The primary risk shifts from what the model <em>says</em> to what the model <em>does</em>.</p>
      
      <p>The OWASP Agentic Top 10 addresses the unique systemic risks that arise when you grant autonomy and agency to non-deterministic models.</p>

      <h2 id="asi01">ASI01: Agent Goal Hijack</h2>
      <h3>Theoretical Mechanism</h3>
      <p>This is the agentic equivalent of prompt injection, but significantly more dangerous. Instead of just altering a single response, Goal Hijacking redirects the agent's multi-step objective. Because agents autonomously plan and execute steps, an attacker can insert a secondary objective into the data the agent processes. The agent will continue working, but it will now execute steps to fulfill the attacker's hidden goal alongside, or instead of, the user's original goal.</p>

      <h2 id="asi02">ASI02: Tool Misuse</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Agentic workflows often involve chaining multiple tools together. Tool Misuse occurs when an agent uses a legitimate tool in an unsafe, unexpected, or destructive manner. This can happen due to hallucinations (the agent misunderstands the tool's purpose) or due to malicious manipulation of the agent's reasoning process. The risk is amplified when tools are overly permissive or lack intrinsic safety constraints.</p>

      <h2 id="asi05">ASI05: Unexpected Code Execution</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Advanced agents often write and execute their own code (e.g., Python scripts) to solve complex analytical problems or parse data. If an attacker can influence the code generation process—either through prompt injection or by manipulating the data the agent is analyzing—they can force the agent to generate and execute malicious code, leading to Remote Code Execution (RCE) on the agent's host infrastructure.</p>

      <h2 id="asi07">ASI07: Insecure Inter-Agent Communication</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Modern architectures often utilize multi-agent systems, where specialized agents communicate to solve larger tasks. If one agent in the swarm is compromised (e.g., a web-browsing agent encounters a malicious webpage), it can pass manipulated instructions to other internal agents (e.g., the database agent). Without strict authentication and message validation between agents, a single compromised node can cause cascading failures across the entire system.</p>

      <h2 id="defenses">Architecting Secure Agents (Defense-in-Depth)</h2>
      
      <p>Securing autonomous agents requires shifting from reactive filtering to proactive, stateful constraints.</p>

      <h3>1. Immutable Goal Specification</h3>
      <p>The agent's primary objective must be cryptographically signed or stored in a tamper-proof state mechanism. Before executing any major tool or progressing to a new planning phase, the agent framework must cryptographically verify that the current action aligns with the original, immutable goal, preventing Goal Hijacking.</p>

      <h3>2. Isolated Execution Environments (Sandboxing)</h3>
      <p>To mitigate Unexpected Code Execution (ASI05), any code generated by the agent must be executed in a tightly restricted, ephemeral sandbox (such as a gVisor container or WebAssembly runtime). This environment must have zero network access (unless explicitly required and allowlisted) and no access to the host filesystem.</p>

      <h3>3. Cryptographic Agent Identity</h3>
      <p>In multi-agent systems, agents must authenticate each other. Implement mutual TLS (mTLS) or JWT-based identity verification for all inter-agent communication to ensure that commands are originating from trusted peers, mitigating ASI07.</p>

      <h3>4. Human-in-the-Loop (HITL) Checkpoints</h3>
      <p>Complete autonomy is dangerous. Implement deterministic state machines that pause the agent's execution and require human authorization before any "high-stakes" action is taken (e.g., modifying database records, executing financial transactions, or sending external emails).</p>
      
      <h3>5. Behavioral Anomaly Detection</h3>
      <p>Monitor the agent's telemetry—how many tools it calls, the sequence of operations, and the time taken for reasoning. If an agent suddenly deviates from its baseline behavior (e.g., attempting to call an export tool 50 times in a row), the framework should trip a circuit breaker and halt execution.</p>

    </GuideLayout>
  );
}
