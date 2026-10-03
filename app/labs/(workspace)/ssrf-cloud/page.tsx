'use client';

import React, { useState } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function SsrfCloudLab() {
  const [url, setUrl] = useState('https://example.com/image.png');
  const [responseHtml, setResponseHtml] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const handleFetchUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSimulating(true);
    setResponseHtml(null);

    // Simulate backend SSRF logic
    setTimeout(() => {
      const lowerUrl = url.toLowerCase();
      
      // Basic Blacklist Filter on the backend
      if (lowerUrl.includes('169.254.169.254') || lowerUrl.includes('localhost') || lowerUrl.includes('127.0.0.1')) {
        setResponseHtml('🚨 [WAF BLOCK] Access to internal IPs or metadata endpoints is strictly forbidden.');
        setIsSimulating(false);
        return;
      }

      // Check for bypasses to AWS Metadata
      // e.g. 2852039166 is integer encoding of 169.254.169.254
      // or custom local domain pointing to 169.254.169.254 like metadata.aws.local (simulated)
      if (
        lowerUrl.includes('2852039166') || 
        lowerUrl.includes('169.254.43454') || // octal/hex mixed bypass
        lowerUrl.includes('0xa9fea9fe') || // hex bypass
        lowerUrl.includes('aws-metadata.local') // DNS rebinding/CNAME bypass simulation
      ) {
        
        // Simulating the AWS Metadata Directory Structure
        if (lowerUrl.endsWith('/latest/meta-data/') || lowerUrl.endsWith('/latest/meta-data')) {
          setResponseHtml('iam/\nmac\nprofile\nsecurity-credentials/');
        } else if (lowerUrl.endsWith('/security-credentials/') || lowerUrl.endsWith('/security-credentials')) {
          setResponseHtml('ec2-admin-role');
        } else if (lowerUrl.endsWith('/ec2-admin-role')) {
          setResponseHtml(JSON.stringify({
            "Code" : "Success",
            "LastUpdated" : "2026-10-03T12:00:00Z",
            "Type" : "AWS-HMAC",
            "AccessKeyId" : "AKIAIOSFODNN7EXAMPLE",
            "SecretAccessKey" : "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
            "Token" : "ZENTRION{c10ud_m3t4d4t4_st0l3n}",
            "Expiration" : "2026-10-04T12:00:00Z"
          }, null, 2));
          setIsSolved(true);
        } else {
          // If they just bypass the filter but don't hit a valid endpoint
          setResponseHtml('HTTP 404 - Not Found\n(You bypassed the WAF, but the endpoint does not exist. Keep exploring the AWS metadata tree: /latest/meta-data/)');
        }
      } else if (lowerUrl.startsWith('http://') || lowerUrl.startsWith('https://')) {
        setResponseHtml(`[OK] Successfully fetched remote resource from ${url}\n\n<!DOCTYPE html>\n<html>\n<head><title>External Site</title></head>\n<body><h1>Remote Content</h1></body>\n</html>`);
      } else {
        setResponseHtml(`[ERROR] Invalid URL scheme. Only HTTP and HTTPS are allowed.`);
      }
      
      setIsSimulating(false);
    }, 1000);
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        You've discovered a "Website Preview" utility on a corporate server hosted on AWS EC2. 
        The server fetches the URL you provide and displays the HTML. This is a classic setup for <strong>Server-Side Request Forgery (SSRF)</strong>.
      </p>
      <p className="mb-3">
        The AWS Instance Metadata Service (IMDSv1) is available at <code>169.254.169.254</code>. However, the developers added a Web Application Firewall (WAF) that blocks the string <code>169.254.169.254</code>.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan block mb-1">Target:</span>
        <span className="text-sm text-white">Bypass the WAF filter and extract the AWS IAM Security Credentials for the EC2 instance role.</span>
      </div>
    </>
  );

  const hints = [
    "To bypass a string blacklist on IP addresses, you can encode the IP. For example, IPv4 addresses can be represented as a single 32-bit integer.",
    "The integer representation of 169.254.169.254 is 2852039166. Try fetching http://2852039166/",
    "Once you bypass the WAF, you need to traverse the AWS IMDS directory. Start at /latest/meta-data/iam/security-credentials/",
    "Find the name of the role in the directory, then fetch that specific role to get the AccessKey and Token."
  ];

  return (
    <LabWorkspace
      labId="ssrf-cloud"
      title="Cloud SSRF (AWS IMDS)"
      category="Cloud Security"
      difficulty="Advanced"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{c10ud_m3t4d4t4_st0l3n}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Corporate Web Previewer
          </h3>
          <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-mono rounded">
            Hosted on AWS EC2 (us-east-1)
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col md:flex-row gap-6">
          
          {/* Input Panel */}
          <div className="w-full md:w-1/3 flex flex-col h-full border border-line bg-surface/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-line bg-void">
              <h4 className="text-sm uppercase tracking-widest text-mute font-bold">Preview Target</h4>
            </div>
            
            <form onSubmit={handleFetchUrl} className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-white/80 mb-6">
                Enter a URL below. Our server will fetch the remote webpage and generate a secure preview.
              </p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-orange-400 uppercase mb-2">Remote URL</label>
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://..."
                  className="w-full bg-void border border-orange-900/50 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={isSimulating}
                className="btn-primary w-full py-3 bg-orange-600 hover:bg-orange-500 text-white border-none disabled:opacity-50 mt-auto flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Fetching...
                  </>
                ) : (
                  'Fetch URL via Backend'
                )}
              </button>
            </form>
          </div>

          {/* Response Panel */}
          <div className="w-full md:w-2/3 flex flex-col h-full border border-line rounded-xl overflow-hidden bg-void">
            <div className="p-4 border-b border-line flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h4 className="text-xs uppercase tracking-widest text-mute font-bold ml-4">Server Response (cURL)</h4>
            </div>

            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm">
              {responseHtml === null && !isSimulating && (
                <div className="text-mute/50 flex h-full items-center justify-center">
                  Awaiting request...
                </div>
              )}
              
              {isSimulating && (
                <div className="text-cyan animate-pulse">
                  $ curl -sL {url} ...
                </div>
              )}

              {responseHtml !== null && (
                <div className={
                  responseHtml.includes('[WAF BLOCK]') 
                    ? 'text-red-400' 
                    : responseHtml.includes('Success') && responseHtml.includes('AccessKeyId')
                      ? 'text-green-400'
                      : 'text-gray-300'
                }>
                  <pre className="whitespace-pre-wrap">{responseHtml}</pre>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
