import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Safety Checker | Zentrion Cyber Tools',
  description: 'Check if a URL is safe, malicious, or a phishing site using URLhaus and PhishTank threat intelligence databases.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
