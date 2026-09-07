import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Converter | Zentrion Cyber Tools',
  description: 'Free online Base64 Converter tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
