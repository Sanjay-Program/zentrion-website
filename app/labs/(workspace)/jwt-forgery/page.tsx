'use client';

import React, { useState, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function JwtForgeryLab() {
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payload, setPayload] = useState('{"sub":"1234567890","name":"Guest User","role":"guest"}');
  const [signature, setSignature] = useState('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [encodedToken, setEncodedToken] = useState('');
  
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // Helper to base64url encode a string
  const base64urlEncode = (str: string) => {
    try {
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) {
      return '';
    }
  };

  useEffect(() => {
    const encHeader = base64urlEncode(header);
    const encPayload = base64urlEncode(payload);
    
    // If the alg is "none", a signature shouldn't be included in the token (just ends with a dot)
    // However, we'll let the user construct the token string.
    let token = `${encHeader}.${encPayload}`;
    if (signature) {
      token += `.${signature}`;
    }
    
    setEncodedToken(token);
  }, [header, payload, signature]);

  const handleSubmitToken = () => {
    setServerResponse(null);
    
    // Validate the forged token
    // The vulnerability requires: alg set to 'none', role set to 'admin', and NO signature.
    
    try {
      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);
      
      const parts = encodedToken.split('.');
      
      if (parsedHeader.alg && parsedHeader.alg.toLowerCase() === 'none') {
        if (parts.length === 2 || (parts.length === 3 && parts[2] === '')) {
          if (parsedPayload.role === 'admin') {
            setServerResponse('✅ AUTHENTICATION SUCCESS: Welcome, Administrator. Flag retrieved.');
            setIsSolved(true);
            return;
          } else {
            setServerResponse('⚠️ AUTHENTICATED: But you lack administrator privileges. Role is: ' + parsedPayload.role);
            return;
          }
        } else {
          setServerResponse('❌ ERROR: When alg is "none", the signature must be completely empty.');
          return;
        }
      } else {
        // If not 'none', simulate a signature validation failure
        if (parsedPayload.role === 'admin') {
           setServerResponse('❌ SIGNATURE VERIFICATION FAILED: Invalid signature for the provided payload.');
           return;
        }
        setServerResponse('⚠️ AUTHENTICATED: Valid signature for guest token.');
      }
    } catch (e) {
      setServerResponse('❌ ERROR: Invalid JSON format in Header or Payload.');
    }
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        The target application uses <strong>JSON Web Tokens (JWT)</strong> for authentication. You are currently logged in with a <code>guest</code> token.
      </p>
      <p className="mb-3">
        A critical vulnerability exists in the backend JWT library: it implicitly trusts the <code>alg</code> header defined by the user. 
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-violet block mb-1">Target:</span>
        <span className="text-sm text-white">Forge a JWT token to escalate your privileges to <code>admin</code>. Submit the token to bypass authentication and capture the flag.</span>
      </div>
    </>
  );

  const hints = [
    "A JWT has three parts separated by dots: Header, Payload, and Signature.",
    "If you change the payload role to 'admin', the original signature becomes invalid.",
    "Try changing the 'alg' in the header to 'none'.",
    "If the algorithm is 'none', there is no signature. Make sure you clear the signature field completely so the token ends with a dot."
  ];

  return (
    <LabWorkspace
      labId="jwt-forgery"
      title="JWT Signature Forgery"
      category="API Security"
      difficulty="Advanced"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{jwt_4lg_n0n3_byp4ss}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Secure API Gateway
          </h3>
          <span className="px-3 py-1 bg-violet/20 border border-violet/30 text-violet-300 text-xs font-mono rounded">
            Endpoint: /api/v1/admin/dashboard
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* JWT Editor */}
          <div className="w-full md:w-1/2 p-6 flex flex-col h-full overflow-y-auto border-r border-line bg-surface/10">
            <h4 className="text-sm uppercase tracking-widest text-mute font-bold mb-6">JWT Debugger & Forger</h4>
            
            <div className="space-y-6 flex-1">
              {/* Header */}
              <div>
                <label className="block text-xs font-bold text-red-400 uppercase mb-2">Header (Algorithm & Type)</label>
                <textarea 
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  className="w-full h-24 bg-void border border-red-900/50 rounded-lg p-3 text-red-300 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              {/* Payload */}
              <div>
                <label className="block text-xs font-bold text-purple-400 uppercase mb-2">Payload (Data)</label>
                <textarea 
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="w-full h-32 bg-void border border-purple-900/50 rounded-lg p-3 text-purple-300 font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Signature */}
              <div>
                <label className="block text-xs font-bold text-cyan uppercase mb-2">Verify Signature</label>
                <textarea 
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full h-20 bg-void border border-cyan/30 rounded-lg p-3 text-cyan font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="w-full md:w-1/2 flex flex-col h-full bg-void">
            
            <div className="p-6 border-b border-line">
              <h4 className="text-sm uppercase tracking-widest text-white font-bold mb-4">Encoded Token</h4>
              <div className="w-full bg-surface/50 border border-line rounded-lg p-4 font-mono text-sm break-all leading-relaxed">
                <span className="text-red-400">{encodedToken.split('.')[0]}</span>
                <span className="text-white">.</span>
                <span className="text-purple-400">{encodedToken.split('.')[1]}</span>
                {encodedToken.split('.')[2] !== undefined && (
                  <>
                    <span className="text-white">.</span>
                    <span className="text-cyan">{encodedToken.split('.')[2]}</span>
                  </>
                )}
              </div>
              <button 
                onClick={handleSubmitToken}
                disabled={isSolved}
                className="btn-primary w-full mt-4 py-3 bg-violet text-white hover:bg-violet/80 border-none disabled:opacity-50"
              >
                Send Request to API
              </button>
            </div>

            <div className="p-6 flex-1 bg-black">
              <h4 className="text-sm uppercase tracking-widest text-mute font-bold mb-4">Server Console</h4>
              {serverResponse ? (
                <div className={`p-4 font-mono text-sm rounded border ${
                  serverResponse.includes('✅') 
                    ? 'bg-green-900/20 text-green-400 border-green-500/30' 
                    : serverResponse.includes('❌') 
                      ? 'bg-red-900/20 text-red-400 border-red-500/30'
                      : 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {serverResponse}
                </div>
              ) : (
                <div className="text-mute font-mono text-sm">
                  Waiting for API request...
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
