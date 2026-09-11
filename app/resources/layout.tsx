import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Cybersecurity Resources & Tools | Zentrion',
  description: 'Free cybersecurity resources, cheat sheets, and reference guides from Zentrion Security.',
};
export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
