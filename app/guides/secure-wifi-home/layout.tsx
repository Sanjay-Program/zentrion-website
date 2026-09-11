import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'How to Secure Your Home Wi-Fi in 10 Steps (2026 Guide)',
  description: 'Secure your home WiFi with 10 proven steps. Change default passwords, enable WPA3, disable WPS, detect rogue devices with Nmap, and prevent DNS hijacking.',
  keywords: 'secure home wifi, wifi security guide, wpa3 setup, disable wps, router security',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
