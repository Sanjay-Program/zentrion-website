import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Http Status Codes | Zentrion Cyber Tools',
  description: 'Free online Http Status Codes tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
