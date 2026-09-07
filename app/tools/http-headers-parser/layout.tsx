import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Http Headers Parser | Zentrion Cyber Tools',
  description: 'Free online Http Headers Parser tool. Fast, secure, and privacy-focused client-side utility by Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
