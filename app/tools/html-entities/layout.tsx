import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Html Entities | Zentrion Cyber Tools',
  description: 'Free online Html Entities tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
