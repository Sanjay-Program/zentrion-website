'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { GlassCard, Reveal } from '@/components/ui';
import { Terminal } from '@/components/Terminal';

const TARGET_HASH = '1d8ab4d31481eb0db0b4d4b3b24f5a34ec8b615ef8826723b7e71da051ffae28'; // SHA-256 for 'cyberpunk2026'
const MOCK_DICTIONARY = Array.from({ length: 5000 }, (_, i) => `password${i}`).concat([
  'admin123', 'qwerty', 'cyberpunk2026', 'hacker'
]).sort(() => Math.random() - 0.5);

export default function LabClient() {
  const [status, setStatus] = useState<string>('Idle');
  const [attempts, setAttempts] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [foundPassword, setFoundPassword] = useState('');
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleCommand = (args: string[]) => {
    if (args[0] === 'hashcat') {
      if (args[1] === '-m' && args[2] === '1400' && args.length >= 4) {
        startCracking();
        return `Starting hashcat dictionary attack against ${TARGET_HASH}...`;
      }
      return 'Usage: hashcat -m 1400 <hash> dictionary.txt\n(Hint: we only support attacking the target hash for this lab)';
    }
    return `bash: ${args[0] || ''}: command not found`;
  };

  const startCracking = () => {
    if (workerRef.current) workerRef.current.terminate();
    
    setStatus('Initializing Web Worker...');
    setAttempts(0);
    setCurrentWord('');
    setFoundPassword('');

    workerRef.current = new Worker('/workers/hash-worker.js');
    
    workerRef.current.onmessage = (e) => {
      const { type } = e.data;
      if (type === 'status') {
        setStatus(e.data.message);
      } else if (type === 'progress') {
        setAttempts(e.data.attempts);
        setCurrentWord(e.data.currentWord);
      } else if (type === 'success') {
        setStatus('CRACKED!');
        setAttempts(e.data.attempts);
        setFoundPassword(e.data.match);
        workerRef.current?.terminate();
      } else if (type === 'complete') {
        setStatus('Exhausted dictionary. Hash not found.');
        workerRef.current?.terminate();
      }
    };

    workerRef.current.postMessage({
      targetHash: TARGET_HASH,
      dictionary: MOCK_DICTIONARY
    });
  };

  return (
    <LabLayout
      labId="hash-cracking"
      xpReward={250}
      title="Web-Worker Password Cracking"
      category="Cryptography"
      difficulty="Intermediate"
      objective="Use a Web Worker to simulate hashcat running in a background thread to crack a SHA-256 hash."
      scope="Local Browser Engine"
      target={TARGET_HASH}
      hints={[
        "Type `hashcat -m 1400 <hash> dictionary.txt` in the terminal to begin.",
        "Notice how the UI remains smooth (60fps) because the heavy cryptography math is being handled by a Web Worker background thread!"
      ]}
      flag={foundPassword ? `ZENTRION{w3b_w0rk3rs_cr4ck3d_1t}` : "Awaiting hashcat... "}
      explanation={
        <>
          <p className="mb-4">
            This lab demonstrates how heavy computational tasks (like brute-forcing cryptography hashes) can freeze a browser if run on the main UI thread.
          </p>
          <p>
            By offloading the <code>crypto.subtle.digest</code> calculations to a <strong>Web Worker</strong>, we achieve massive performance gains and preserve a smooth user experience.
          </p>
        </>
      }
      remediation={
        <p>
          To prevent dictionary attacks, systems should use slow hashing algorithms (like Argon2 or bcrypt) and enforce strong password policies.
        </p>
      }
    >
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="p-0 overflow-hidden border-orange-500/30">
           <div className="bg-orange-500/20 p-3 border-b border-orange-500/30">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Terminal (Main Thread)</span>
          </div>
          <Terminal 
            prompt="hacker@zentrion"
            welcomeMessage="Hashcat v2026.1 loaded.\nTarget Hash: 1d8ab4d31481eb0db0b4d4b3b24f5a34ec8b615ef8826723b7e71da051ffae28"
            commandMap={{
              'hashcat': handleCommand
            }}
            className="!h-[400px] border-none crt-terminal"
          />
        </GlassCard>

        <div className="space-y-6">
          <Reveal>
            <GlassCard className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-white">Web Worker Status</h3>
              
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <span className="text-mute block text-xs uppercase mb-1">State:</span>
                  <span className={`px-2 py-1 rounded text-xs ${status === 'CRACKED!' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan/10 text-cyan'}`}>
                    {status}
                  </span>
                </div>
                
                <div>
                  <span className="text-mute block text-xs uppercase mb-1">Hashes Computed:</span>
                  <span className="text-yellow-400 font-bold text-xl">{attempts.toLocaleString()}</span>
                </div>

                <div>
                  <span className="text-mute block text-xs uppercase mb-1">Current Word:</span>
                  <span className="text-red-400 truncate block w-full bg-black/40 p-2 rounded">{currentWord || '...'}</span>
                </div>

                {foundPassword && (
                  <div className="mt-6 p-4 border border-emerald-500/50 bg-emerald-500/10 rounded">
                    <span className="text-emerald-400 block text-xs uppercase mb-1">Password Found:</span>
                    <span className="text-white text-2xl font-bold">{foundPassword}</span>
                  </div>
                )}
              </div>
            </GlassCard>
          </Reveal>
          
          <Reveal delay={0.1}>
            <GlassCard className="p-6 bg-cyan/5 border-cyan/20">
               <h3 className="font-semibold text-sm mb-2 text-cyan">Thread Performance Test</h3>
               <p className="text-xs text-mute mb-4">Try highlighting text or scrolling the page while hashcat is running. Notice it doesn't freeze? That's the power of Web Workers.</p>
               <input type="text" placeholder="Type here to test UI responsiveness..." className="w-full bg-[#05070d] border border-line rounded px-3 py-2 text-xs text-white" />
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </LabLayout>
  );
}
