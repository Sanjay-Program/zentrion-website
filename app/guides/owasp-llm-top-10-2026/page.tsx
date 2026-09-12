import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'OWASP LLM Top 10 (2026) | AI Security Defenses | Zentrion',
  description: 'A theoretical breakdown of the 2026 OWASP Top 10 for LLM Applications. Learn the architectural mechanisms behind prompt injection, excessive agency, and data leakage, along with defensive strategies.',
  keywords: 'owasp llm top 10 2026, ai security tutorial, prompt injection defense, llm vulnerability mitigation, secure ai architecture, data leakage prevention',
};

export default function OwaspLLMGuidePage() {
  return (
    <GuideLayout
      title="OWASP Top 10 for LLM Applications (2026) – Defensive Architecture"
      description="A theoretical breakdown of the OWASP Top 10 for LLM Applications. Understand the architectural mechanisms behind modern AI risks and learn the organizational strategies to mitigate them."
      timeToRead="20 min read"
      lastUpdated="September 2026"
      tags={['AI Security', 'OWASP', 'Defensive Architecture']}
      tools={[
        { name: 'Website Security Scanner', url: '/tools/website-security-scanner' }
      ]}
      relatedGuides={[
        { title: 'OWASP Agentic Top 10', url: '/guides/owasp-agentic-top-10-2026' },
        { title: 'Secure AI Chatbot Architecture', url: '/guides/secure-ai-chatbot' }
      ]}
      headings={[
        { id: 'overview', label: 'The 2026 Landscape' },
        { id: 'llm01', label: 'LLM01: Prompt Injection' },
        { id: 'llm02', label: 'LLM02: Sensitive Information Disclosure' },
        { id: 'llm03', label: 'LLM03: Excessive Agency' },
        { id: 'llm06', label: 'LLM06: Unbounded Consumption' },
        { id: 'llm08', label: 'LLM08: Hidden Context Exposure' },
        { id: 'defenses', label: 'Core Mitigation Strategies' }
      ]}
    >
      <div className="callout-note">
        <strong>📚 Educational Purpose:</strong> This guide focuses purely on the theoretical mechanisms of AI vulnerabilities and the architectural defensive strategies to mitigate them. It does not provide actionable exploits.
      </div>

      <h2 id="overview">The 2026 Landscape</h2>
      <p>The OWASP Top 10 for Large Language Model (LLM) Applications provides a critical framework for understanding the unique risks introduced by generative AI. As models have evolved from simple chatbots to complex systems interacting with external data and tools, the threat landscape has shifted significantly.</p>
      
      <h3>Key Changes in 2026</h3>
      <ul>
        <li><strong>Prompt Injection (LLM01)</strong> remains the top threat, expanding to cover multi-modal inputs (images, audio) and persistent memory poisoning.</li>
        <li><strong>Excessive Agency (LLM03)</strong> has jumped significantly in priority, reflecting the rise of tool-calling capabilities and autonomous actions.</li>
        <li><strong>Hidden Context Exposure (LLM08)</strong> emphasizes that developers can no longer rely on system prompts or RAG context remaining secret from the user.</li>
      </ul>

      <h2 id="llm01">LLM01: Prompt Injection</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Prompt injection occurs when an attacker crafts an input designed to alter the LLM's intended behavior, effectively bypassing the developer's system instructions. Because LLMs process instructions and data within the same context window, the model can mistake malicious user input for authoritative commands.</p>
      <ul>
        <li><strong>Direct Injection:</strong> The user explicitly attempts to override the system prompt (e.g., "Ignore previous instructions").</li>
        <li><strong>Indirect Injection:</strong> The malicious instruction is hidden within external data that the LLM processes, such as a summarized webpage or an analyzed document. When the LLM reads the document, it executes the hidden command.</li>
      </ul>

      <h2 id="llm02">LLM02: Sensitive Information Disclosure</h2>
      <h3>Theoretical Mechanism</h3>
      <p>This risk involves the LLM inadvertently revealing confidential data, proprietary algorithms, or Personally Identifiable Information (PII) to unauthorized users. This can occur through:</p>
      <ul>
        <li><strong>Training Data Memorization:</strong> The model regurgitates sensitive data it was trained or fine-tuned on.</li>
        <li><strong>RAG Over-Exposure:</strong> Retrieval-Augmented Generation (RAG) systems that lack proper access controls, allowing a user to retrieve documents they do not have permission to view.</li>
      </ul>

      <h2 id="llm03">LLM03: Excessive Agency</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Excessive Agency occurs when an LLM is granted unnecessary functionality, excessive privileges, or excessive autonomy. It is the AI equivalent of the Principle of Least Privilege violation.</p>
      <ul>
        <li><strong>Excessive Functionality:</strong> Providing the LLM access to tools it doesn't strictly need (e.g., granting shell execution capabilities to a customer support bot).</li>
        <li><strong>Excessive Privilege:</strong> A tool used by the LLM runs with administrative rights rather than restricted, specific database permissions.</li>
        <li><strong>Excessive Autonomy:</strong> Allowing the LLM to execute destructive actions (like deleting data or sending emails) without a human-in-the-loop for approval.</li>
      </ul>

      <h2 id="llm06">LLM06: Unbounded Consumption</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Also known as "Denial of Wallet," this is an availability and financial risk. Attackers craft queries designed to force the LLM into generating massive outputs, engaging in infinite reasoning loops, or calling excessive downstream tools, rapidly draining API credits and computing resources.</p>

      <h2 id="llm08">LLM08: Hidden Context Exposure</h2>
      <h3>Theoretical Mechanism</h3>
      <p>Formerly known as "System Prompt Leakage," this covers the exposure of any non-user-visible context. Developers often assume that system prompts, RAG database schemas, or backend API keys injected into the context window will remain secret. However, through clever conversational engineering, attackers can trick the model into outputting this hidden context.</p>

      <h2 id="defenses">Core Mitigation Strategies (Defense-in-Depth)</h2>
      
      <p>Securing LLM applications requires a layered, architectural approach rather than relying solely on prompt engineering.</p>

      <h3>1. Input and Output Guardrails</h3>
      <p>Implement distinct filtering layers before the prompt reaches the LLM and before the response reaches the user. These guardrails utilize semantic analysis (often secondary classification models) rather than simple regex matching to detect malicious intent or redact PII.</p>

      <h3>2. The Principle of Least Privilege (PoLP)</h3>
      <p>When connecting LLMs to external tools or databases (APIs, RAG), strictly limit permissions. If an LLM needs to query a database to answer customer questions, the connection should use a read-only account scoped exclusively to the necessary tables.</p>

      <h3>3. Human-in-the-Loop (HITL)</h3>
      <p>For any action that modifies state, affects infrastructure, or sends communications on behalf of a user, require explicit human confirmation before the LLM can execute the tool.</p>

      <h3>4. Trust Boundaries and Sandboxing</h3>
      <p>Treat all LLM output as untrusted data. If an LLM generates code or markup to be executed, it must be run within a tightly controlled, isolated sandbox (e.g., Docker container without network access) to prevent systemic compromise if the output was maliciously influenced.</p>
      
      <h3>5. Rate Limiting and Cost Controls</h3>
      <p>Implement strict API quotas, token generation limits, and timeouts to mitigate Unbounded Consumption attacks at the infrastructure level.</p>

    </GuideLayout>
  );
}
