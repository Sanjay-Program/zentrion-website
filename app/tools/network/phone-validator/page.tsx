import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'Phone Number \u0026 SIM Intelligence',
  description: 'Validate phone numbers, determine line type (Mobile/SIM), carrier network, and location context.',
  keywords: ['phone validator', 'sim checker', 'carrier lookup', 'mobile number intelligence'],
  alternates: { canonical: '/tools/network/phone-validator' },
};

export default function PhoneValidatorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/phone-validator', label: 'Phone & SIM Intelligence' },
        ]}
      />
      <LookupTool
        title="Phone & SIM Intelligence"
        description="Validate phone number format, verify E.164 syntax, identify line type (Mobile/SIM or Fixed), and lookup estimated carrier networks globally."
        endpoint="/api/network/phone?number="
        placeholder="+919876543210 or +14155552671"
        buttonLabel="Analyze Number"
        inputAriaLabel="Phone number"
      />
    </>
  );
}
