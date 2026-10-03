import { Metadata } from 'next';
import MyLearningClient from './MyLearningClient';

export const metadata: Metadata = {
  title: 'My Learning Dashboard | Zentrion Academy',
  description: 'Track your cybersecurity learning progress. View completed labs, captured CTF flags, earned badges, and streaks. Export cryptographically signed verifiable credentials.',
  keywords: ['cybersecurity learning', 'learning dashboard', 'CTF progress', 'hacking badges', 'verifiable credentials', 'cyber range progress'],
  openGraph: {
    title: 'My Learning Dashboard | Zentrion Academy',
    description: 'Track your cybersecurity learning progress. View completed labs, captured CTF flags, and earned badges.',
    url: 'https://zentriontechnologies.com/my-learning',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/my-learning',
  },
};

export default function MyLearningPage() {
  return <MyLearningClient />;
}
