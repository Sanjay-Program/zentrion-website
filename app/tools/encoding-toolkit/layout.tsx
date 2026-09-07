import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encoding Toolkit | Zentrion Cyber Tools',
  description: 'Free online Encoding Toolkit tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
