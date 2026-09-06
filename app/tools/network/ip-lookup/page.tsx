import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'IP Lookup Tool',
  description: 'Inspect public metadata for IPv4 and IPv6 addresses.',
  keywords: ['ip lookup', 'ip intelligence', 'geolocation ip', 'networking tools'],
  alternates: { canonical: '/tools/network/ip-lookup' },
};

export default function IPLookupPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/ip-lookup', label: 'IP Lookup' },
        ]}
      />
      <LookupTool
        title="IP Lookup"
        description="Get information and provider data for an IP address."
        endpoint="/api/network/ip"
        placeholder="8.8.8.8"
        buttonLabel="Lookup IP"
        inputAriaLabel="IP address"
      />
    </>
  );
}
