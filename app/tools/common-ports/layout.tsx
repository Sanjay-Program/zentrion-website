import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Common Ports | Zentrion Cyber Tools',
  description: 'Free online Common Ports tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
