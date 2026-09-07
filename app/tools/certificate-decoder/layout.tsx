import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificate Decoder | Zentrion Cyber Tools',
  description: 'Free online Certificate Decoder tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
