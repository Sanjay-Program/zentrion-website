import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'DNS Lookup Tool',
  description: 'Query DNS records (A, AAAA, MX, NS, TXT, CNAME) for any domain.',
  keywords: ['dns lookup', 'dns records', 'mx lookup', 'txt lookup', 'networking tools'],
  alternates: { canonical: '/tools/network/dns-lookup' },
};

export default function DNSLookupPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/dns-lookup', label: 'DNS Lookup' },
        ]}
      />
      <LookupTool
        title="DNS Lookup"
        description="Look up DNS records for a domain in real time."
        endpoint="/api/network/dns"
        placeholder="example.com"
        buttonLabel="Lookup DNS"
        inputAriaLabel="Domain name"
      />
    </>
  );
}
