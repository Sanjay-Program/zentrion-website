import { Metadata } from 'next';
import LeaderboardClient from './LeaderboardClient';

export const metadata: Metadata = {
  title: 'Global Cyber Range Leaderboard | Zentrion',
  description: 'Compete with hackers worldwide on the Zentrion decentralized P2P leaderboard. Earn XP by solving CTF challenges and completing cyber security labs.',
  keywords: ['cybersecurity leaderboard', 'CTF competition', 'hacker ranking', 'cyber range XP', 'Zentrion ranking'],
  openGraph: {
    title: 'Global Cyber Range Leaderboard | Zentrion',
    description: 'Compete with hackers worldwide on the Zentrion decentralized P2P leaderboard. Earn XP by solving CTF challenges.',
    url: 'https://zentriontechnologies.com/leaderboard',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/leaderboard',
  },
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
