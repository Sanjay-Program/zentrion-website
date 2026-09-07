import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ipv4 Subnet Calculator | Zentrion Cyber Tools',
  description: 'Free online Ipv4 Subnet Calculator tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
