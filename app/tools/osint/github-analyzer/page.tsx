import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'GitHub Analyzer | Zentrion Cyber Tools',
  description: 'Analyze GitHub profiles, fetch user data, and view repository statistics instantly.',
  keywords: ['github analyzer', 'github osint', 'github profile viewer', 'osint tools'],
  alternates: { canonical: '/tools/osint/github-analyzer' },
};

export default function GithubAnalyzerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/osint/github-analyzer', label: 'GitHub Analyzer' },
        ]}
      />
      <LookupTool
        title="GitHub Analyzer"
        description="Search for a GitHub username to extract public profile intelligence, follower statistics, and repository metrics."
        endpoint="/api/osint/github"
        placeholder="e.g. torvalds"
        buttonLabel="Analyze Profile"
        inputAriaLabel="GitHub username"
      />
    </>
  );
}
