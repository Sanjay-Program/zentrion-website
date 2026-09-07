import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chmod Calculator | Zentrion Cyber Tools',
  description: 'Free online Chmod Calculator tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
