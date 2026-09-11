import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WAF Detector | Zentrion Cyber Tools',
  description: 'Detect Web Application Firewalls (WAF), CDN providers, and server software for any URL using response header fingerprinting.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
