import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OTP / TOTP Generator | Zentrion Cyber Tools',
  description:
    'Free online TOTP (Time-Based One-Time Password) and Static OTP generator. RFC 6238 compliant, client-side only — your secrets never leave the browser. By Zentrion.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
