import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ip Converter | Zentrion Cyber Tools',
  description: 'Free online Ip Converter tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
