import { Metadata } from 'next';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'LLM Prompt Jailbreak Lab | AI Security | Zentrion',
  description: 'Practice prompt injection and jailbreak techniques against a simulated corporate AI chatbot. Learn how to bypass LLM guardrails and extract restricted information.',
  keywords: ['LLM jailbreak', 'prompt injection', 'AI security', 'ChatGPT jailbreak', 'AI red teaming', 'large language model exploit'],
  openGraph: {
    title: 'LLM Prompt Jailbreak Lab | AI Security | Zentrion',
    description: 'Practice prompt injection against a simulated corporate AI chatbot. Learn to bypass LLM guardrails.',
    url: 'https://zentriontechnologies.com/labs/llm-jailbreak',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/labs/llm-jailbreak',
  },
};

export default function LlmJailbreakPage() {
  return <LabClient />;
}
