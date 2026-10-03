'use client';

import React, { useState } from 'react';
import LabWorkspace from '@/components/LabWorkspace';
import { Eyebrow } from '@/components/ui';

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  content: React.ReactNode;
  isPhishing: boolean;
  isRead: boolean;
  headers: Record<string, string>;
}

const EMAILS: Email[] = [
  {
    id: '1',
    sender: 'IT Support',
    senderEmail: 'support@zentriontechnologies.com',
    subject: 'Scheduled Maintenance',
    date: '10:00 AM',
    isPhishing: false,
    isRead: false,
    headers: {
      'Return-Path': '<support@zentriontechnologies.com>',
      'Received': 'from mail.zentriontechnologies.com (10.0.0.5)',
      'DKIM-Signature': 'v=1; a=rsa-sha256; d=zentriontechnologies.com; s=selector1;',
      'Authentication-Results': 'spf=pass (sender IP is 10.0.0.5) smtp.mailfrom=support@zentriontechnologies.com; dkim=pass (signature was verified) header.d=zentriontechnologies.com;'
    },
    content: (
      <div className="space-y-4">
        <p>Hello Team,</p>
        <p>Please be advised that we will be performing scheduled maintenance on the internal VPN gateway tonight from 2:00 AM to 4:00 AM EST.</p>
        <p>During this window, remote access may be temporarily unavailable.</p>
        <p>Best regards,<br/>Zentrion IT Operations</p>
      </div>
    )
  },
  {
    id: '2',
    sender: 'HR Department',
    senderEmail: 'hr@zentrion-technologies.net', // Look-alike domain
    subject: 'URGENT: Mandatory Compliance Update',
    date: '11:23 AM',
    isPhishing: true,
    isRead: false,
    headers: {
      'Return-Path': '<bounce@evil-phish-mailer.ru>',
      'Received': 'from mta-1.evil-phish-mailer.ru (198.51.100.22)',
      'X-Mailer': 'BulkSender Pro 9.0',
      'Authentication-Results': 'spf=fail (sender IP is 198.51.100.22) smtp.mailfrom=hr@zentrion-technologies.net; dkim=none;'
    },
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Dear Employee,</p>
        <p>Our records indicate that you have not completed the mandatory Q3 Security Compliance Acknowledgment.</p>
        <p className="text-red-600 font-bold">Failure to complete this by EOD will result in immediate suspension of network access.</p>
        <p>Please log in immediately to the secure portal to acknowledge the updated policies:</p>
        <div className="p-4 bg-gray-100 border border-gray-300 rounded text-center">
          <a href="#" className="text-blue-600 underline font-semibold group relative">
            https://secure-auth.zentriontechnologies.com/login
            <span className="absolute -bottom-8 left-0 bg-black text-white text-xs p-1 rounded hidden group-hover:block whitespace-nowrap z-50">
              Actual destination: http://198.51.100.22/auth/login.php
            </span>
          </a>
        </div>
        <p>Thank you,<br/>Human Resources</p>
      </div>
    )
  },
  {
    id: '3',
    sender: 'Sarah Jenkins',
    senderEmail: 's.jenkins@zentriontechnologies.com',
    subject: 'Project Alpha Assets',
    date: '1:15 PM',
    isPhishing: false,
    isRead: false,
    headers: {
      'Return-Path': '<s.jenkins@zentriontechnologies.com>',
      'Received': 'from client-auth.zentriontechnologies.com (10.0.0.12)',
      'DKIM-Signature': 'v=1; a=rsa-sha256; d=zentriontechnologies.com; s=selector1;'
    },
    content: (
      <div className="space-y-4">
        <p>Hey,</p>
        <p>I attached the design assets for Project Alpha to the shared drive. Let me know if you need anything else for the presentation tomorrow.</p>
        <p>- Sarah</p>
      </div>
    )
  }
];

export default function PhishingSimulationLab() {
  const [emails, setEmails] = useState(EMAILS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const selectedEmail = emails.find(e => e.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setEmails(emails.map(e => e.id === id ? { ...e, isRead: true } : e));
    setShowHeaders(false);
  };

  const handleReport = () => {
    if (selectedEmail?.isPhishing) {
      setShowFlag(true);
    } else {
      alert("Incorrect. That email appears to be legitimate.");
    }
  };

  return (
    <LabWorkspace
      labId="phishing-simulation"
      title="Spear Phishing Simulation"
      missionBriefing="Analyze the emails in the inbox. Identify the spear-phishing attempt by inspecting the sender, links, and email headers. Click 'Report Phish' when you find it."
      difficulty="Beginner"
      category="Social Engineering"
      hints={[
        "Look at the sender domain carefully. Is it the real domain?",
        "Check the email headers for SPF and DKIM validation failures.",
        "Hover over links to see where they really direct to."
      ]}
      isSolved={showFlag}
      flagId="ZENTRION{ph1sh1ng_c4mp41gn_d3f34t3d}"
    >
      <div className="grid md:grid-cols-[300px,1fr] h-[600px] border border-line rounded-xl overflow-hidden bg-white text-black font-sans">
        
        {/* Inbox Sidebar */}
        <div className="border-r border-gray-200 bg-gray-50 flex flex-col h-full overflow-y-auto">
          <div className="p-4 bg-gray-200 border-b border-gray-300 font-bold text-gray-700 flex items-center justify-between">
            <span>Inbox</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{emails.filter(e => !e.isRead).length}</span>
          </div>
          {emails.map(email => (
            <div 
              key={email.id}
              onClick={() => handleSelect(email.id)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${selectedId === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className={`text-sm truncate pr-2 ${!email.isRead ? 'font-bold' : 'font-medium'}`}>{email.sender}</span>
                <span className="text-xs text-gray-500">{email.date}</span>
              </div>
              <div className={`text-sm truncate ${!email.isRead ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                {email.subject}
              </div>
            </div>
          ))}
        </div>

        {/* Email Content Area */}
        <div className="flex flex-col h-full bg-white relative">
          {selectedEmail ? (
            <>
              {/* Email Toolbar */}
              <div className="p-3 border-b border-gray-200 bg-white flex gap-2 justify-end">
                <button 
                  onClick={() => setShowHeaders(!showHeaders)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors text-gray-700"
                >
                  {showHeaders ? 'Hide Headers' : 'View Headers'}
                </button>
                <button 
                  onClick={handleReport}
                  className="px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded transition-colors flex items-center gap-1 font-semibold"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Report Phish
                </button>
              </div>

              {/* Email Headers View */}
              {showHeaders && (
                <div className="p-4 bg-gray-900 text-gray-300 font-mono text-xs border-b border-gray-700 max-h-48 overflow-y-auto">
                  <div className="mb-2 text-gray-500">// RAW HEADERS</div>
                  {Object.entries(selectedEmail.headers).map(([key, value]) => (
                    <div key={key} className="break-all">
                      <span className="text-blue-400 font-bold">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              )}

              {/* Email View */}
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedEmail.sender}</div>
                    <div className="text-sm text-gray-500">&lt;{selectedEmail.senderEmail}&gt;</div>
                  </div>
                </div>
                <div className="text-gray-800 leading-relaxed">
                  {selectedEmail.content}
                </div>
              </div>

              {/* Flag Modal */}
              {showFlag && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                  <div className="bg-void border border-emerald-500/50 p-8 rounded-xl max-w-md w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Threat Neutralized!</h3>
                    <p className="text-mute text-sm mb-6">
                      Excellent analysis. You identified the spoofed domain `zentrion-technologies.net`, noticed the SPF validation failure in the headers, and spotted the mismatched URL destination.
                    </p>
                    <div className="bg-black/50 p-4 rounded border border-line mb-6">
                      <div className="text-xs text-mute uppercase tracking-wider mb-2">Capture The Flag</div>
                      <code className="text-emerald-400 font-bold font-mono">ZENTRION{'{'}ph1sh1ng_c4mp41gn_d3f34t3d{'}'}</code>
                    </div>
                    <button onClick={() => setShowFlag(false)} className="btn-secondary w-full py-2">
                      Close Simulation
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <p>Select an email to read</p>
            </div>
          )}
        </div>
      </div>
    </LabWorkspace>
  );
}
