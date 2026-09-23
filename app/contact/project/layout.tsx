import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discuss Your Project',
  description: 'Tell us about your technology requirements. We build, secure, and automate business systems.',
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
