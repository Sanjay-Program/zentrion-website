import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dns Propagation | Zentrion Cyber Tools',
  description: 'Free online Dns Propagation tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
