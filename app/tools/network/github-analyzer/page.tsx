import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LookupTool from '@/components/tools/LookupTool';

export const metadata: Metadata = {
  title: 'GitHub Analyzer Tool',
  description: 'Analyze public GitHub profile and repository activity by username.',
  keywords: ['github analyzer', 'github profile checker', 'repo activity', 'networking tools'],
  alternates: { canonical: '/tools/network/github-analyzer' },
};

export default function GitHubAnalyzerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/tools', label: 'Tools' },
          { href: '/tools/network/github-analyzer', label: 'GitHub Analyzer' },
        ]}
      />
      <LookupTool
        title="GitHub Analyzer"
        description="Pull public GitHub stats and repositories for a username."
        endpoint="/api/network/github"
        placeholder="octocat"
        buttonLabel="Analyze"
        inputAriaLabel="GitHub username"
      />
    </>
  );
}
