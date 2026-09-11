import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AES Encrypt / Decrypt | Zentrion Cyber Tools',
  description:
    'Free online AES-GCM 256-bit encryption and decryption tool. PBKDF2 key derivation, client-side only — your data never leaves the browser. By Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
