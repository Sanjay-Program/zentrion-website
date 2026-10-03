import { Metadata } from 'next';
import ThreatMapClient from './ThreatMapClient';

export const metadata: Metadata = {
  title: 'Live Threat Map | Zentrion Technologies',
  description: 'Visualize global cyber threats and simulated attacks in real-time on the Zentrion Threat Map.',
};

export default function ThreatMapPage() {
  return <ThreatMapClient />;
}
