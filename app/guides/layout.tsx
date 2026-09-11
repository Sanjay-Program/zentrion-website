import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Zentrion Security Guides',
    default: 'Security Guides & Tutorials | Zentrion',
  },
  description: 'In-depth cybersecurity guides with real commands, code examples, and hands-on tutorials. Master Nmap, Wireshark, Kali Linux, SQL injection, and more.',
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
