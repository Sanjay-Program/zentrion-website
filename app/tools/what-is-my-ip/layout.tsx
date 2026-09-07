import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is My Ip | Zentrion Cyber Tools',
  description: 'Free online What Is My Ip tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
