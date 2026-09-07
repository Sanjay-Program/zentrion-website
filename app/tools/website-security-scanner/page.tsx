import React from 'react';
import LookupTool from '@/components/tools/LookupTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Security Scanner | Zentrion',
  description: 'Instantly scan any website for security headers, DNS configuration, and obtain a unified security score.',
};

export default function WebsiteScannerPage() {
  return (
    <LookupTool
      title="Website Security Scanner"
      description="Run a rapid edge-based audit checking DNS status and security headers to generate a unified security score for any domain."
      endpoint="/api/network/website-scanner?url="
      placeholder="e.g. google.com"
      inputAriaLabel="Target Website"
      buttonLabel="Scan Website"
    />
  );
}
