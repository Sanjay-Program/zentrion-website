import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nmap Generator | Zentrion Cyber Tools',
  description: 'Free online Nmap Generator tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
