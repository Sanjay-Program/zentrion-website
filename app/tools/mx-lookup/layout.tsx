import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mx Lookup | Zentrion Cyber Tools',
  description: 'Free online Mx Lookup tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
