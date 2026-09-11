import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'How to Check DNS Records of Any Domain – dig, nslookup, host Guide',
  description: 'Complete guide to checking DNS records using dig, nslookup, and host commands. Covers A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, and SRV records.',
  keywords: 'check dns records, dig command tutorial, nslookup guide, dns lookup tool, dns record types',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
