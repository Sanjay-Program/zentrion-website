import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'Phone Validator Tool',
  description: 'Validate phone numbers and normalize them to E.164 format.',
  keywords: ['phone validator', 'e164 validator', 'phone number checker', 'networking tools'],
  alternates: { canonical: '/tools/network/phone-validator' },
};

export default function PhoneValidatorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/phone-validator', label: 'Phone Validator' },
        ]}
      />
      <LookupTool
        title="Phone Validator"
        description="Validate number syntax, normalize format, and inspect number traits."
        endpoint="/api/network/phone"
        placeholder="+14155552671"
        buttonLabel="Validate"
        inputAriaLabel="Phone number"
      />
    </>
  );
}
