import { Metadata } from 'next';
import VerifyClient from './VerifyClient';

export const metadata: Metadata = {
  title: 'Verify Cybersecurity Credentials | Zentrion',
  description: 'Cryptographically verify Zentrion learning achievements. Uses WebCrypto ECDSA digital signatures to prove that a profile was not tampered with.',
  keywords: ['verifiable credentials', 'ECDSA', 'WebCrypto', 'digital signature verification', 'cybersecurity achievement'],
  openGraph: {
    title: 'Verify Cybersecurity Credentials | Zentrion',
    description: 'Cryptographically verify Zentrion learning achievement tokens using ECDSA digital signatures.',
    url: 'https://zentriontechnologies.com/verify',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/verify',
  },
};

export default function VerifyPage() {
  return <VerifyClient />;
}
