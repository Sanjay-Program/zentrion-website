import { Metadata } from 'next';
import CTFClient from './CTFClient';

export const metadata: Metadata = {
  title: 'CTF Capture the Flag Challenges | Zentrion Cyber Range',
  description: 'Practice real-world hacking skills with Zentrion\'s Capture the Flag challenges. Solve XSS, SQL injection, network recon, Web3 smart contract exploits, and AI jailbreak labs.',
  keywords: ['CTF', 'capture the flag', 'cybersecurity challenges', 'hacking practice', 'web security', 'SQL injection lab', 'XSS challenge'],
  openGraph: {
    title: 'CTF Capture the Flag Challenges | Zentrion Cyber Range',
    description: 'Practice real-world hacking with CTF challenges. XSS, SQLi, AI jailbreak, smart contract exploits and more.',
    url: 'https://zentriontechnologies.com/ctf',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/ctf',
  },
};

export default function CTFPage() {
  return <CTFClient />;
}
