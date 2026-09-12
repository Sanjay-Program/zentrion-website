import { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Secure AI Chatbot Architecture | LLM Guardrails | Zentrion',
  description: 'Learn the architectural principles for building secure AI chatbots. Discover how to implement input/output guardrails, rate limiting, and PII redaction to protect enterprise LLM deployments.',
  keywords: 'secure ai chatbot, llm architecture, llm guardrails, prompt injection defense, pii redaction, ai security architecture',
};

export default function SecureAIChatbotPage() {
  return (
    <GuideLayout
      title="Secure AI Chatbot Architecture – Implementation Guide"
      description="Deploying an LLM directly to users without surrounding security controls is highly dangerous. This guide breaks down the architectural design required to build a secure, enterprise-ready AI chatbot, focusing on layered guardrails and deterministic constraints."
      timeToRead="20 min read"
      lastUpdated="September 2026"
      tags={['AI Security', 'Architecture', 'Software Engineering']}
      tools={[
        { name: 'Website Security Scanner', url: '/tools/website-security-scanner' }
      ]}
      relatedGuides={[
        { title: 'OWASP LLM Top 10', url: '/guides/owasp-llm-top-10-2026' },
        { title: 'LLM Security Evaluation', url: '/guides/llm-security-evaluation' }
      ]}
      headings={[
        { id: 'threat-model', label: 'The Chatbot Threat Model' },
        { id: 'architecture', label: 'Secure-by-Design Architecture' },
        { id: 'input-guardrails', label: 'Input Guardrails' },
        { id: 'system-prompt', label: 'System Prompt Engineering' },
        { id: 'output-guardrails', label: 'Output Guardrails' },
        { id: 'infrastructure', label: 'Infrastructure Controls' }
      ]}
    >
      <div className="callout-note">
        <strong>📚 Educational Purpose:</strong> This guide focuses on the theoretical architecture and defensive design patterns for secure AI applications. It provides conceptual frameworks rather than deployable code blocks.
      </div>

      <h2 id="threat-model">The Chatbot Threat Model</h2>
      <p>When you expose an LLM interface to the internet, you must assume hostile intent. An enterprise chatbot is typically vulnerable to:</p>
      <ul>
        <li><strong>Prompt Injection & Jailbreaks:</strong> Users attempting to override the chatbot's instructions to make it behave inappropriately or violate corporate policy.</li>
        <li><strong>Data Exfiltration:</strong> Users attempting to trick the chatbot into revealing its underlying system prompt, hidden operational logic, or sensitive training data.</li>
        <li><strong>Cost Attacks (Unbounded Consumption):</strong> Malicious actors generating massive prompts designed to exhaust API budgets.</li>
        <li><strong>PII Contamination:</strong> Users inadvertently inputting sensitive Personal Identifiable Information (PII) into the chat, which is then sent to third-party LLM providers, violating compliance (GDPR/HIPAA).</li>
      </ul>

      <h2 id="architecture">Secure-by-Design Architecture</h2>
      
      <p>A secure chatbot architecture never allows the user's input to flow directly to the LLM, nor does it allow the LLM's response to flow directly back to the user. Instead, the architecture utilizes a "sandwich" approach: strict evaluation layers positioned both before the prompt is processed and after the response is generated.</p>

      <pre><code>{`┌─────────────────────────────────────────────────────────┐
│  1. User Input                                          │
│       ↓                                                 │
│  2. [INPUT GUARDRAILS] ← Validation & Redaction        │
│       ↓                                                 │
│  3. [AUTHENTICATION & RBAC] ← Access Control           │
│       ↓                                                 │
│  4. [SYSTEM PROMPT] ← Hardened Instructions            │
│       ↓                                                 │
│  5. [LLM PROCESSING] ← Strict Token/Timeout Limits     │
│       ↓                                                 │
│  6. [OUTPUT GUARDRAILS] ← Sanitization & Policy Check  │
│       ↓                                                 │
│  7. Sanitized Output Returned to User                   │
└─────────────────────────────────────────────────────────┘`}</code></pre>

      <h2 id="input-guardrails">Input Guardrails</h2>
      <p>Before an API call is ever made to the underlying LLM, the user's input must pass through an Input Guardrail layer. This layer typically utilizes fast, specialized secondary models (or robust heuristic engines) to analyze the prompt.</p>
      
      <ul>
        <li><strong>Injection Detection:</strong> The system scans the semantic intent of the input to identify potential jailbreaks or prompt injection attempts (e.g., attempts to assign a new persona or ignore previous instructions). If detected, the request is dropped immediately.</li>
        <li><strong>PII Redaction:</strong> To maintain compliance, the input guard scans for sensitive data formats (Credit Card numbers, SSNs, phone numbers). The system deterministically replaces these with placeholders (e.g., <code>[REDACTED_SSN]</code>) before the prompt is sent to the external LLM provider.</li>
        <li><strong>Topic Restriction:</strong> Ensure the user's input is semantically relevant to the chatbot's intended domain before processing it further.</li>
      </ul>

      <h2 id="system-prompt">System Prompt Engineering (Hardening)</h2>
      <p>The system prompt is the foundation of the chatbot's behavior. A secure system prompt must be explicit, minimal, and devoid of sensitive information.</p>
      <ul>
        <li><strong>Zero Secrets:</strong> Never hardcode API keys, passwords, or internal URLs into the system prompt. Assume that a dedicated attacker will eventually extract the system prompt.</li>
        <li><strong>Explicit Constraints:</strong> Clearly define what the model <em>cannot</em> do. (e.g., "Under no circumstances should you generate executable code," or "You must only answer questions based on the provided RAG context; do not use external knowledge.")</li>
      </ul>

      <h2 id="output-guardrails">Output Guardrails</h2>
      <p>Even with strict input controls and hardened system prompts, LLMs can hallucinate or be manipulated into generating unsafe content. The Output Guardrail acts as the final line of defense.</p>
      
      <ul>
        <li><strong>Toxicity & Policy Adherence:</strong> The output is scanned to ensure it does not contain hate speech, harmful advice, or violate corporate communication policies.</li>
        <li><strong>System Prompt Leakage Prevention:</strong> The output guard uses heuristics to detect if the LLM is attempting to regurgitate its own system instructions. If detected, the output is blocked.</li>
        <li><strong>Output Sanitization:</strong> If the chatbot is not intended to write code, the output guard should strip any Markdown code blocks or executable scripts (e.g., Python, Bash) from the response before displaying it to the user.</li>
        <li><strong>PII Re-insertion:</strong> If PII was redacted at the input layer, the output layer can safely re-map the placeholders back to the original values so the user's experience is seamless, without the PII ever reaching the LLM provider.</li>
      </ul>

      <h2 id="infrastructure">Infrastructure Controls</h2>
      <p>Beyond the application logic, the infrastructure hosting the chatbot must enforce strict limits to prevent DoS and cost exhaustion attacks.</p>
      <ul>
        <li><strong>Strict Token Limits:</strong> Enforce hard <code>max_tokens</code> limits on the LLM API calls to prevent the model from generating infinitely long responses.</li>
        <li><strong>Timeouts:</strong> Ensure the backend terminates LLM connections that take too long to resolve, preventing resource exhaustion from complex reasoning loops.</li>
        <li><strong>Rate Limiting:</strong> Implement user-based rate limiting (e.g., 10 messages per minute) to deter automated fuzzing and budget exhaustion.</li>
      </ul>

    </GuideLayout>
  );
}
