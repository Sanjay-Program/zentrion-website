import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'How to Detect Phishing Emails – 5-Step Detection Guide',
  description: 'Learn to detect phishing emails by analyzing headers, checking links, and verifying SPF/DKIM/DMARC records. Includes CLI commands and automated detection tools.',
  keywords: 'detect phishing email, phishing email check, email header analysis, spf dkim dmarc check',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
