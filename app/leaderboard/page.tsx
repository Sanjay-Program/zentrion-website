import { Metadata } from 'next';
import LeaderboardClient from './LeaderboardClient';

export const metadata: Metadata = {
  title: 'World Cyber Range Leaderboard | Zentrion',
  description: 'Compete with hackers worldwide on the Zentrion decentralized P2P leaderboard. See rankings for all users in the world.',
  keywords: ['cybersecurity leaderboard', 'CTF competition', 'hacker ranking', 'cyber range XP', 'Zentrion ranking', 'world leaderboard'],
  openGraph: {
    title: 'World Cyber Range Leaderboard | Zentrion',
    description: 'Compete with hackers worldwide on the Zentrion decentralized P2P leaderboard. See rankings for all users in the world.',
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
