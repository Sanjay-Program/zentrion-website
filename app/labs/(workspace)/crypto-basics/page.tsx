'use client';

import React, { useState, useEffect } from 'react';
import { learningManager } from '@/lib/learning-state';

export default function CryptoBasicsLab() {
  const [decoded, setDecoded] = useState('');
  const [success, setSuccess] = useState(false);
  const ciphertext = "WkVOVFJJT057YjRzMzY0XzFzX24wdF8zbmNyeXB0MTBufQ==";

  useEffect(() => {
    learningManager.markLabCompleted('crypto-basics');
  }, []);

  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault();
    if (decoded === 'ZENTRION{b4s364_1s_n0t_3ncrypt10n}') {
      setSuccess(true);
    }
  };

  return (
    <div className="flex-1 p-6 font-mono text-sm">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="border border-cyan/30 bg-cyan/5 p-4 rounded-lg">
          <h2 className="text-cyan font-bold text-lg mb-2">Lab Brief: Cryptography Basics</h2>
          <p className="text-mute mb-2">
            You've intercepted a secure transmission from an adversary server. The encryption appears to be incredibly weak — in fact, it looks like it isn't encrypted at all, merely encoded.
          </p>
          <p className="text-mute">
            Decode the ciphertext below to reveal the flag.
          </p>
        </div>

        <div className="border border-line bg-surface/50 p-6 rounded-lg">
          <div className="mb-4">
            <span className="text-mute text-xs uppercase tracking-wider block mb-2">Intercepted Ciphertext</span>
            <div className="p-4 bg-void border border-line rounded font-bold text-red-400 break-all select-all">
              {ciphertext}
            </div>
          </div>

          <form onSubmit={handleDecode} className="space-y-4">
            <div>
              <label className="text-mute text-xs uppercase tracking-wider block mb-2">Decoded Result</label>
              <input
                type="text"
                value={decoded}
                onChange={e => setDecoded(e.target.value)}
                placeholder="Enter decoded text..."
                className="w-full bg-void border border-line rounded px-4 py-2 text-ink focus:outline-none focus:border-cyan"
              />
            </div>
            <button type="submit" className="btn-primary py-2 px-6">Submit Decoding</button>
          </form>

          {success && (
            <div className="mt-6 p-4 border border-green-500/30 bg-green-500/10 rounded text-green-400">
              <span className="font-bold">✓ Success!</span> You've successfully decoded the flag. Submit it on the CTF page to claim your points.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
