// @ts-nocheck
import Gun from 'gun';

// Use public relays to allow peers to connect without our own server
const peers = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://relay.peer.ooo/gun'
];

let gunInstance;

if (typeof window !== 'undefined') {
  gunInstance = Gun({ peers });
}

export const gun = gunInstance;

export const generateGunAlias = () => {
  // Generates a random anonymous handle
  const adjectives = ['Cyber', 'Neon', 'Void', 'Null', 'Ghost', 'Zero', 'Dark', 'Quantum', 'Glitch', 'Shadow'];
  const nouns = ['Hacker', 'Byte', 'Phantom', 'Runner', 'Sec', 'Node', 'Protocol', 'Root', 'Daemon', 'Hex'];
  const num = Math.floor(Math.random() * 9999);
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}_${num}`;
};
