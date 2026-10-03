'use client';

import React, { useState } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function BurpSuiteRepeaterLab() {
  const initialRequest = `POST /api/v1/profile/update HTTP/1.1
Host: secure-portal.zentrion.local
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Content-Length: 43
Cookie: session=eyJhbGciOiJIUzI1NiIsIn...

username=hacker&email=hacker@zentrion.local&role=user`;

  const [requestContent, setRequestContent] = useState(initialRequest);
  const [responseContent, setResponseContent] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const handleSendRequest = () => {
    setIsSimulating(true);
    setResponseContent(null);

    setTimeout(() => {
      let output = '';
      
      try {
        // Very basic parser for simulation purposes
        const parts = requestContent.split('\n\n');
        const headers = parts[0];
        const body = parts.length > 1 ? parts[1] : '';
        
        if (!headers.includes('POST /api/v1/profile/update')) {
          output = `HTTP/1.1 404 Not Found\nDate: Sat, 03 Oct 2026 14:45:00 GMT\nContent-Length: 13\n\n404 Not Found`;
        } else if (!headers.includes('Host: secure-portal.zentrion.local')) {
          output = `HTTP/1.1 403 Forbidden\nDate: Sat, 03 Oct 2026 14:45:00 GMT\nContent-Length: 17\n\nInvalid Hostname`;
        } else if (body.includes('role=admin')) {
          output = `HTTP/1.1 200 OK\nDate: Sat, 03 Oct 2026 14:45:01 GMT\nContent-Type: application/json\nContent-Length: 125\n\n{\n  "status": "success",\n  "message": "Profile updated. Administrator access granted.",\n  "flag": "ZENTRION{m4ss_4ss1gnm3nt_0p3n3d}"\n}`;
          setIsSolved(true);
        } else if (body.includes('role=user')) {
          output = `HTTP/1.1 200 OK\nDate: Sat, 03 Oct 2026 14:45:01 GMT\nContent-Type: application/json\nContent-Length: 75\n\n{\n  "status": "success",\n  "message": "Standard user profile updated."\n}`;
        } else {
          output = `HTTP/1.1 400 Bad Request\nDate: Sat, 03 Oct 2026 14:45:00 GMT\nContent-Length: 21\n\nMissing or invalid body parameters.`;
        }
      } catch (e) {
        output = `HTTP/1.1 400 Bad Request\nDate: Sat, 03 Oct 2026 14:45:00 GMT\nContent-Length: 21\n\nMalformed HTTP Request.`;
      }
      
      setResponseContent(output);
      setIsSimulating(false);
    }, 600);
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        When testing web applications, <strong>Burp Suite</strong> is the gold standard tool. Its <strong>Repeater</strong> tab allows you to intercept a raw HTTP request, manually modify headers or body parameters, and send it to the server.
      </p>
      <p className="mb-3">
        You have intercepted a POST request used to update a user's profile on a secure portal.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-orange-500 block mb-1">Target:</span>
        <span className="text-sm text-white">This API suffers from a <strong>Mass Assignment</strong> vulnerability. It blindly accepts parameters sent in the body. Modify the raw HTTP POST body to escalate your privileges to <code>admin</code> and capture the flag.</span>
      </div>
    </>
  );

  const hints = [
    "Look at the bottom of the HTTP Request. Notice the parameters: username=..., email=..., and role=user.",
    "The application expects you to be a 'user'. What happens if you change that parameter to 'admin'?",
    "Modify the text directly in the Request window, then click Send!"
  ];

  return (
    <LabWorkspace
      labId="burp-suite-repeater"
      title="HTTP Manipulation (Repeater)"
      category="Web Security"
      difficulty="Intermediate"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{m4ss_4ss1gnm3nt_0p3n3d}"
    >
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-2 border-b border-[#333333] bg-[#2d2d2d] flex items-center justify-between">
          <h3 className="text-[#e0e0e0] font-bold text-sm flex items-center gap-2">
            <span className="text-orange-500 font-extrabold text-lg">B</span>
            Burp Suite Professional - Repeater
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#3c3f41] border border-[#555] text-xs text-gray-300 rounded hover:bg-[#4c5052]">Proxy</button>
            <button className="px-3 py-1 bg-[#d05c2a] border border-[#d05c2a] text-xs text-white font-bold rounded">Repeater</button>
            <button className="px-3 py-1 bg-[#3c3f41] border border-[#555] text-xs text-gray-300 rounded hover:bg-[#4c5052]">Intruder</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 bg-[#3c3f41] border-b border-[#222] flex items-center gap-4">
          <button 
            onClick={handleSendRequest}
            disabled={isSimulating}
            className="px-4 py-1 bg-gradient-to-b from-[#e3e3e3] to-[#c4c4c4] border border-[#8a8a8a] text-black text-xs font-bold rounded shadow-sm hover:from-[#f0f0f0] hover:to-[#d0d0d0] disabled:opacity-50"
          >
            Send
          </button>
          <button 
            onClick={() => { setRequestContent(initialRequest); setResponseContent(null); setIsSolved(false); }}
            className="px-4 py-1 bg-gradient-to-b from-[#e3e3e3] to-[#c4c4c4] border border-[#8a8a8a] text-black text-xs rounded shadow-sm hover:from-[#f0f0f0] hover:to-[#d0d0d0]"
          >
            Reset
          </button>
          <span className="text-xs font-mono text-[#a9b7c6] ml-auto">Target: https://secure-portal.zentrion.local</span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Request Panel */}
          <div className="w-full md:w-1/2 flex flex-col h-full border-r border-[#222]">
            <div className="bg-[#4c5052] border-b border-[#222] px-3 py-1 flex items-center">
              <span className="text-[#e0e0e0] text-xs font-bold">Request</span>
            </div>
            
            <textarea 
              value={requestContent}
              onChange={(e) => setRequestContent(e.target.value)}
              className="flex-1 w-full bg-[#2b2b2b] text-[#a9b7c6] font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Response Panel */}
          <div className="w-full md:w-1/2 flex flex-col h-full bg-[#2b2b2b]">
            <div className="bg-[#4c5052] border-b border-[#222] px-3 py-1 flex items-center">
              <span className="text-[#e0e0e0] text-xs font-bold">Response</span>
              {isSimulating && <span className="ml-4 text-xs text-orange-400 animate-pulse">Waiting for response...</span>}
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-[#a9b7c6] whitespace-pre-wrap leading-relaxed">
              {responseContent === null && !isSimulating && (
                <div className="text-[#606366] flex h-full items-center justify-center">
                  Click 'Send' to forward the request to the server...
                </div>
              )}

              {responseContent !== null && (
                <div dangerouslySetInnerHTML={{ __html: responseContent.replace(/ZENTRION\{[^}]+\}/g, '<span class="text-green-500 font-bold bg-[#1e1e1e] px-1">$&</span>') }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
