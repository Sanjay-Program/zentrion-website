import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'Username Finder | Zentrion Cyber Tools',
  description: 'Search for usernames across 50+ social platforms instantly.',
  keywords: ['username finder', 'osint username', 'social media search', 'osint tools'],
  alternates: { canonical: '/tools/osint/username-finder' },
};

export default function UsernameFinderPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/osint/username-finder', label: 'Username Finder' },
        ]}
      />
      <LookupTool
        title="Username Finder"
        description="Search for a specific username across 50+ social networks, developer platforms, and forums. Results include direct profile links for instant OSINT verification."
        endpoint="/api/osint/username"
        placeholder="e.g. john_doe"
        buttonLabel="Find Username"
        inputAriaLabel="Username"
      />
    </>
  );
}
