import { Metadata } from 'next';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'Web Worker Hash Cracking Lab | Zentrion Cyber Range',
  description: 'Simulate offline password cracking using Web Workers and the browser\'s native crypto.subtle API. Learn how dictionary attacks break SHA-256 hashed passwords without freezing the UI.',
  keywords: ['hashcat', 'password cracking', 'SHA-256', 'web workers', 'dictionary attack', 'offline password cracking lab'],
  openGraph: {
    title: 'Web Worker Hash Cracking Lab | Zentrion Cyber Range',
    description: 'Simulate offline password cracking using Web Workers. Learn dictionary attacks against SHA-256 hashes.',
    url: 'https://zentriontechnologies.com/labs/hash-cracking',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/labs/hash-cracking',
  },
};

export default function HashCrackingPage() {
  return <LabClient />;
}
