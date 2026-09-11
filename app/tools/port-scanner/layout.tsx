import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Port Scanner | Zentrion Cyber Tools',
  description:
    'Free online Port Scanner tool. Check open ports on any host with service detection. A privacy-focused network utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
