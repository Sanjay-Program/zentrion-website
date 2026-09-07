import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unix Timestamp | Zentrion Cyber Tools',
  description: 'Free online Unix Timestamp tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
