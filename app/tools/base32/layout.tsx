import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base32 | Zentrion Cyber Tools',
  description: 'Free online Base32 tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
