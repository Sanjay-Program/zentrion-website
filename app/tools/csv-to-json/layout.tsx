import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Csv To Json | Zentrion Cyber Tools',
  description: 'Free online Csv To Json tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
