import { Metadata } from 'next';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'Multiplayer Red vs Blue Cybersecurity Lab | Zentrion',
  description: 'Real-time P2P multiplayer hacking simulation. Play as the Red Team attacker or Blue Team defender in a live browser-to-browser cyber exercise powered by Gun.js WebRTC.',
  keywords: ['red team blue team', 'multiplayer hacking', 'P2P cyber range', 'SOC analyst training', 'attack defender simulation'],
  openGraph: {
    title: 'Multiplayer Red vs Blue Cybersecurity Lab | Zentrion',
    description: 'Real-time P2P multiplayer hacking simulation. Red Team attacks, Blue Team defends – live browser-to-browser.',
    url: 'https://zentriontechnologies.com/labs/red-vs-blue',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/labs/red-vs-blue',
  },
};

export default function RedVsBluePage() {
  return <LabClient />;
}
