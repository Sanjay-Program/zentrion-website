import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'Username Finder Tool',
  description: 'Check whether a username appears available across multiple platforms.',
  keywords: [
    'username finder',
    'username availability checker',
    'social username lookup',
    'networking tools',
  ],
  alternates: { canonical: '/tools/network/username-finder' },
};

export default function UsernameFinderPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/username-finder', label: 'Username Finder' },
        ]}
      />
      <LookupTool
        title="Username Finder"
        description="Check username status across common social and developer platforms."
        endpoint="/api/network/username"
        placeholder="yourname"
        buttonLabel="Check Username"
        inputAriaLabel="Username"
      />
    </>
  );
}
