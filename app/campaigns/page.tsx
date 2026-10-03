import { Metadata } from 'next';
import CampaignsClient from './CampaignsClient';

export const metadata: Metadata = {
  title: 'Cyber Campaigns – Multi-Stage Attack Simulations | Zentrion',
  description: 'Engage in multi-stage cybersecurity kill chain simulations. Complete recon, exploitation, and forensics stages in Operation Neon and earn the Campaign Strategist badge.',
  keywords: ['cyber kill chain', 'hacking campaigns', 'attack simulation', 'cybersecurity training', 'CTF campaign', 'Operation Neon'],
  openGraph: {
    title: 'Cyber Campaigns – Multi-Stage Attack Simulations | Zentrion',
    description: 'Engage in multi-stage cybersecurity kill chain simulations. Complete recon, exploitation, and forensics stages.',
    url: 'https://zentriontechnologies.com/campaigns',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/campaigns',
  },
};

export default function CampaignsPage() {
  return <CampaignsClient />;
}
