import { Metadata } from 'next';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'Smart Contract Reentrancy Attack Lab | Web3 Security | Zentrion',
  description: 'Learn to exploit Ethereum smart contract reentrancy vulnerabilities. Simulate a DAO-style vault drain attack against a vulnerable Solidity withdraw() function in a browser-native EVM.',
  keywords: ['smart contract reentrancy', 'Web3 security', 'Ethereum exploit', 'Solidity vulnerability', 'DeFi hacking', 'blockchain security lab'],
  openGraph: {
    title: 'Smart Contract Reentrancy Attack Lab | Web3 Security | Zentrion',
    description: 'Exploit Ethereum smart contract reentrancy vulnerabilities. Simulate a DAO-style vault drain attack in a browser-native EVM.',
    url: 'https://zentriontechnologies.com/labs/smart-contract-reentrancy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zentriontechnologies.com/labs/smart-contract-reentrancy',
  },
};

export default function SmartContractReentrancyPage() {
  return <LabClient />;
}
