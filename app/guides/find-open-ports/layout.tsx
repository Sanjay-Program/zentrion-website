import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'How to Find Open Ports on Your Network – Nmap & Online Tools',
  description: 'Step-by-step guide to finding open ports using Nmap, netstat, ss, and online port scanners. Includes common ports reference table and security risk guide.',
  keywords: 'find open ports, nmap port scan, port scanner, netstat, open ports check',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
