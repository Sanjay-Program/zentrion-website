'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { learningManager } from '@/lib/learning-state';
import Breadcrumbs from '@/components/Breadcrumbs';

// The pre-computed SHA-256 hashes of the valid flags. 
// This ensures that looking at the client-side code doesn't reveal the flags directly.
const CTF_CHALLENGES = [
  {
    id: 'metasploit-eternalblue',
    title: 'Exploitation (Metasploit)',
    points: 700,
    difficulty: 'Advanced',
    hash: 'e70704cb0374b6fdfbe6ccd0ef86a0d87d54199e5cfe196891c2abffc6b432bd', // ZENTRION{3t3rn4lblu3_pwn3d}
    labPath: '/labs/metasploit-eternalblue'
  },
  {
    id: 'hydra-brute-force',
    title: 'Password Cracking (Hydra)',
    points: 300,
    difficulty: 'Intermediate',
    hash: 'cc6685f27365475d6ae5ee7c66c665bb8f8f60ab35a3589adc5acd32443bf47a', // ZENTRION{hydr4_brut3_f0rc3d}
    labPath: '/labs/hydra-brute-force'
  },
  {
    id: 'docker-escape',
    title: 'Container Escape (Privileged)',
    points: 600,
    difficulty: 'Expert',
    hash: '395e5c709942824295959b6bea8b89afe875a9a3adb9bb303df219c0f818dc9a', // ZENTRION{d0ck3r_3sc4p3_m0unt3d}
    labPath: '/labs/docker-escape'
  },
  {
    id: 'ssrf-cloud',
    title: 'Cloud SSRF (AWS IMDS)',
    points: 400,
    difficulty: 'Advanced',
    hash: 'be4346ba6e0bf5404c0a94010452ad878721e42b9c0c180459fbef0234444174', // ZENTRION{c10ud_m3t4d4t4_st0l3n}
    labPath: '/labs/ssrf-cloud'
  },
  {
    id: 'jwt-forgery',
    title: 'JWT Signature Forgery',
    points: 400,
    difficulty: 'Advanced',
    hash: '2528eba3d022df6d9585c3fdb7ea8a700dfa7b543eb3b076fa94909c916bdf65', // ZENTRION{jwt_4lg_n0n3_byp4ss}
    labPath: '/labs/jwt-forgery'
  },
  {
    id: 'xss-simulation',
    title: 'Cross-Site Scripting (XSS)',
    points: 100,
    difficulty: 'Beginner',
    hash: '6766d64ff7acbaf09a37587338301148a556aa59ee0345e18ff2671b43056d63', // ZENTRION{xss_p4yl04d_f1r3d}
    labPath: '/labs/xss-simulation'
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection (SQLi)',
    points: 150,
    difficulty: 'Intermediate',
    hash: '4e1c831b087fb7181209b6970d25141180694bda6656ddc9a7c02e467e2e7e4d', // ZENTRION{sqli_l0g1n_byp4ss}
    labPath: '/labs/sql-injection'
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst: Log Parsing',
    points: 200,
    difficulty: 'Advanced',
    hash: 'd6abe41d371d5d55a74259b38996da08ef1004288c2aea8a6c443fb21531b67d', // ZENTRION{203.0.113.45}
    labPath: '/labs/soc-analyst'
  },
  {
    id: 'prompt-injection',
    title: 'LLM Prompt Injection',
    points: 100,
    difficulty: 'Beginner',
    hash: 'acd1d9de6ab2a90ae6b60447e862c27059431488e577526420824e66525b5c82', // ZENTRION{pr0mpt_inj3ct10n_m4st3r}
    labPath: '/labs/prompt-injection'
  },
  {
    id: 'http-cookies',
    title: 'HTTP Cookie Manipulation',
    points: 100,
    difficulty: 'Beginner',
    hash: '0604243dfb6f82f16580c192c5ca73312b9ab4724cc3a1657bf85cae07828985', // ZENTRION{c00k13_m4n1pul4t10n_ftw}
    labPath: '/labs/http-cookies'
  },
  {
    id: 'network-recon',
    title: 'Network Recon (Nmap)',
    points: 150,
    difficulty: 'Beginner',
    hash: '7d6bddd7d42a916c532447383ed79c9731a334229fdf83e493e6e9da0cd726f9', // ZENTRION{p0rt_8080_d1sc0v3r3d}
    labPath: '/labs/network-recon'
  },
  {
    id: 'web-enumeration',
    title: 'Web Enumeration',
    points: 150,
    difficulty: 'Intermediate',
    hash: '5c56d402d4df2e7e6ab1e75cdf774acc03821518d43f7da97c46fb0b74205f19', // ZENTRION{unpr0t3ct3d_b4ckup_f0und}
    labPath: '/labs/web-enumeration'
  },
  {
    id: 'dns-recon',
    title: 'DNS Reconnaissance',
    points: 200,
    difficulty: 'Intermediate',
    hash: '27ff9b00bcff86b72d9d75fd827c1f2c01a3ed9ff3512b9b90107ecb2fa4595f', // ZENTRION{dn5_z0n3_tr4nsf3r}
    labPath: '/labs/dns-recon'
  },
  {
    id: 'forensics-01',
    title: 'Digital Forensics 01',
    points: 250,
    difficulty: 'Beginner',
    hash: '3ccc83bd3e5f2cd0dee8bd39946ec172eff86aaa88c90b104f49ec804217d1d9', // ZENTRION{185.15.22.1}
    labPath: '/labs/forensics-01'
  },
  {
    id: 'rag-poisoning',
    title: 'RAG Poisoning',
    points: 300,
    difficulty: 'Intermediate',
    hash: '1eb147ecddb656a22d55f0379ce13714f4b8a7a28e4a3e8d428534663a66fa49', // ZENTRION{r4g_p01s0n_d4t4b4s3}
    labPath: '/labs/rag-poisoning'
  },
  {
    id: 'wireshark-analysis',
    title: 'Packet Analysis (Wireshark)',
    points: 300,
    difficulty: 'Beginner',
    hash: '8905e085750e7ad6ccd846f18159e2aab6b015e6d87f734859219885c513644a', // ZENTRION{ftp_cl34rt3xt_sn1ff3d}
    labPath: '/labs/wireshark-analysis'
  },
  {
    id: 'smart-contract-reentrancy',
    title: 'Smart Contract Reentrancy',
    points: 350,
    difficulty: 'Advanced',
    hash: '7b34afdea9a9809031afdd9644a7056d549d365814a4a6e7e2f3cf91b3d0925e', // ZENTRION{r33ntr4ncy_dr41n3d_v4ult}
    labPath: '/labs/smart-contract-reentrancy'
  },
  {
    id: 'llm-jailbreak',
    title: 'LLM Prompt Jailbreak',
    points: 200,
    difficulty: 'Beginner',
    hash: 'e39f11f05f3898a3cfad37da340f74a8b2c482824885bc5e79ca569c47cf4be9', // ZENTRION{1gn0r3_4ll_pr3v10us_1nstruct10ns}
    labPath: '/labs/llm-jailbreak'
  },
  {
    id: 'red-vs-blue',
    title: 'Multiplayer: Red vs Blue',
    points: 500,
    difficulty: 'Advanced',
    hash: '8ae8e171534cdeb5d130ced8358ff48c34af6e06e64d7c274f6d56b8fc77768c', // ZENTRION{p2p_f1r3w4ll_d3pl0y3d}
    labPath: '/labs/red-vs-blue'
  },
  {
    id: 'hash-cracking',
    title: 'Web-Worker Hash Cracking',
    points: 250,
    difficulty: 'Intermediate',
    hash: 'fb1da68a89c5012aba930870c9a00abc1393b7ff6e3b6ded2eb8e95cd0dfb1a5', // ZENTRION{w3b_w0rk3rs_cr4ck3d_1t}
    labPath: '/labs/hash-cracking'
  },
  {
    id: 'crypto-basics',
    title: 'Cryptography Basics',
    points: 150,
    difficulty: 'Beginner',
    hash: '76bc0f0d066688cae124859871100e19d1d5a246a12690bf12eb003f130ce400', // ZENTRION{b4s364_1s_n0t_3ncrypt10n}
    labPath: '/labs/crypto-basics'
  },
  {
    id: 'idor-vulnerability',
    title: 'IDOR Vulnerability',
    points: 250,
    difficulty: 'Intermediate',
    hash: '087aff048c97fde86fc3e955fca03d04665383899f2e44b9bc00c33a6e490765', // ZENTRION{1d0r_4dm1n_4cc3ss_gr4nt3d}
    labPath: '/labs/idor-vulnerability'
  },
  {
    id: 'phishing-simulation',
    title: 'Spear Phishing Simulation',
    points: 150,
    difficulty: 'Beginner',
    hash: '7e9e4076da4487998585b5f92fcf615d92c1fef7c975c8678328fb4acd68441c', // ZENTRION{ph1sh1ng_c4mp41gn_d3f34t3d}
    labPath: '/labs/phishing-simulation'
  },
  {
    id: 'steganography-101',
    title: 'Steganography 101',
    points: 200,
    difficulty: 'Beginner',
    hash: '283b3aeea030a37938e2e5a0f7369e0f1582bc4952f07972dc4aa3534104abf5', // ZENTRION{h1dd3n_1n_pl41n_s1ght}
    labPath: '/labs/steganography-101'
  }
];

async function hashString(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function CTFClient() {
  const [score, setScore] = useState(0);
  const [captured, setCaptured] = useState<string[]>([]);
  const [inputFlag, setInputFlag] = useState('');
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const update = () => {
      const state = learningManager.get();
      setScore(state.ctfScore || 0);
      setCaptured(state.capturedFlags || []);
    };
    update();
    window.addEventListener('zentrion-learning-updated', update);
    return () => window.removeEventListener('zentrion-learning-updated', update);
  }, []);

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFlag.trim()) return;

    setStatus('idle');
    const hash = await hashString(inputFlag.trim());

    const challenge = CTF_CHALLENGES.find(c => c.hash === hash);

    if (challenge) {
      if (captured.includes(challenge.id)) {
        setStatus('error');
        setStatusMsg('Flag already captured!');
      } else {
        learningManager.captureFlag(challenge.id, challenge.points);
        setStatus('success');
        setStatusMsg(`Success! You earned ${challenge.points} points.`);
        setInputFlag('');
      }
    } else {
      setStatus('error');
      setStatusMsg('Invalid flag. Keep trying!');
    }
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen">
        <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-[rgb(var(--c-ink))]">
              Capture The Flag
            </h1>
            <p className="text-lg text-[rgb(var(--c-mute))] max-w-2xl">
              Solve browser-based security labs and submit flags here to earn points and track your progress.
            </p>
          </div>
          <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-4 bg-cyan/10 border-cyan/30">
            <div className="text-cyan text-4xl font-bold font-mono">{score}</div>
            <div className="text-sm font-semibold uppercase tracking-wider text-cyan/80">Total<br/>Points</div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Active Challenges</h2>
            <div className="grid gap-4">
              {CTF_CHALLENGES.map(challenge => {
                const isCaptured = captured.includes(challenge.id);
                return (
                  <div key={challenge.id} className={`glass-card p-6 rounded-2xl border transition-colors ${isCaptured ? 'bg-green-500/5 border-green-500/20' : 'border-line'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{challenge.title}</h3>
                        <div className="flex gap-3 text-xs mt-2 font-mono">
                          <span className={`${
                            challenge.difficulty === 'Beginner' ? 'text-green-400' :
                            challenge.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                          }`}>{challenge.difficulty}</span>
                          <span className="text-cyan">{challenge.points} pts</span>
                        </div>
                      </div>
                      {isCaptured ? (
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider border border-green-500/30 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Captured
                        </div>
                      ) : (
                        <Link href={challenge.labPath} className="btn-secondary text-sm py-1.5 px-4">
                          Enter Lab
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="sticky top-24">
            <div className="glass-card p-6 rounded-2xl border border-cyan/30 bg-surface/50">
              <h3 className="font-bold text-xl mb-4 text-cyan">Submit Flag</h3>
              <p className="text-sm text-mute mb-6">
                Found a flag in one of our labs? Submit it here to claim your points. Flags format: <code>ZENTRION&#123;...&#125;</code>
              </p>
              
              <form onSubmit={handleFlagSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="ZENTRION{...}"
                  value={inputFlag}
                  onChange={e => setInputFlag(e.target.value)}
                  className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-cyan font-mono"
                  required
                />
                <button type="submit" className="btn-primary w-full py-3">
                  Verify Flag
                </button>
              </form>
              
              {status !== 'idle' && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-semibold text-center border ${
                  status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {statusMsg}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
