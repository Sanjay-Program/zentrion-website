import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Base64 | Zentrion Cyber Tools',
  description: 'Free online Image Base64 tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
