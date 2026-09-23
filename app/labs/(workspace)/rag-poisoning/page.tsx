'use client';

import { useState } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

type Document = {
  id: string;
  title: string;
  content: string;
  source: 'system' | 'user';
};

const defaultDocs: Document[] = [
  {
    id: 'doc-1',
    title: 'IT Onboarding Policy',
    source: 'system',
    content: 'Welcome to Zentrion. Employees must use the official VPN to access internal resources. The official VPN Portal URL is https://vpn.zentrion.local. Never use third-party VPNs.',
  },
  {
    id: 'doc-2',
    title: 'Expense Guidelines',
    source: 'system',
    content: 'All travel expenses must be submitted within 30 days. Maximum daily food allowance is $50. No alcohol can be expensed.',
  },
];

export default function RagPoisoningLab() {
  const [documents, setDocuments] = useState<Document[]>(defaultDocs);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      source: 'user',
    };

    setDocuments((prev) => [...prev, newDoc]);
    setNewTitle('');
    setNewContent('');
  };

  const handleSimulateColleague = () => {
    setIsSimulating(true);
    setAiOutput(null);

    setTimeout(() => {
      // The simulated query is: "What is the official VPN portal URL?"
      const query = "vpn portal url";
      
      // 1. Simulate Retrieval: find docs that mention 'vpn' or 'portal' or 'url'
      const retrievedDocs = documents.filter(doc => 
        doc.content.toLowerCase().includes('vpn') || 
        doc.content.toLowerCase().includes('portal') ||
        doc.content.toLowerCase().includes('url')
      );

      // 2. Simulate AI Processing the retrieved context
      let finalAnswer = 'Based on the internal documentation, the official VPN Portal URL is https://vpn.zentrion.local.';
      let poisoned = false;

      // Look through user-added docs to see if they successfully injected a new URL
      const userDocs = retrievedDocs.filter(d => d.source === 'user');
      
      for (const doc of userDocs) {
        const lowerContent = doc.content.toLowerCase();
        
        // Simple heuristic for an injection attack:
        // If the document tells the AI to "ignore" or says the "new vpn" or "update vpn"
        // AND it provides an http link that is NOT the official one.
        
        const hasInjectionPhrases = lowerContent.includes('ignore') || 
                                    lowerContent.includes('update') || 
                                    lowerContent.includes('new vpn') || 
                                    lowerContent.includes('important instruction') ||
                                    lowerContent.includes('override');
                                    
        const urlMatch = lowerContent.match(/https?:\/\/[^\s]+/);
        const url = urlMatch ? urlMatch[0] : null;

        if (hasInjectionPhrases && url && !url.includes('vpn.zentrion.local')) {
          finalAnswer = `Based on the latest documentation updates, the new VPN Portal URL is ${url}.`;
          poisoned = true;
          break;
        }
      }

      setAiOutput(finalAnswer);
      if (poisoned) {
        setIsSolved(true);
      }
      setIsSimulating(false);
    }, 1500);
  };

  const resetLab = () => {
    setDocuments(defaultDocs);
    setAiOutput(null);
    setIsSolved(false);
  };

  const missionBriefing = (
    <>
      <p>
        The company uses an Internal AI Assistant powered by <strong>RAG (Retrieval-Augmented Generation)</strong>. When an employee asks a question, the AI searches the company document database, reads the results, and generates an answer.
      </p>
      <p>
        You have access to upload a new document (e.g., a "Project Report") to the database.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-violet block mb-1">Target:</span>
        <span className="text-sm text-white">Upload a poisoned document so that when a colleague asks the AI for the <strong>VPN Portal URL</strong>, the AI provides a malicious URL (e.g., <code>https://attacker.com</code>) instead of the real one.</span>
      </div>
    </>
  );

  const hints = [
    "The AI searches the database for documents mentioning 'vpn', 'portal', or 'url'. Make sure your document contains these keywords to be retrieved.",
    "Try telling the AI to 'ignore' the old instructions.",
    "Tell the AI that there is a 'new vpn' or an 'update vpn'."
  ];

  return (
    <LabWorkspace
      labId="rag-poisoning"
      title="RAG Poisoning"
      category="AI Security"
      difficulty="Intermediate"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{r4g_p01s0n_d4t4b4s3}"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* INSTRUCTIONS & SIMULATION PANEL */}
        <div className="w-full md:w-1/2 flex flex-col h-full border-r border-line bg-surface/10">
          <div className="p-6 flex-1 flex flex-col justify-center">
            <h4 className="font-medium text-white mb-4 text-sm uppercase tracking-wide">Test the Exploit</h4>
            <p className="text-sm text-mute mb-6">
              Click the button below to simulate an unsuspecting colleague asking the AI assistant: <br/><br/><em className="text-white bg-void p-2 rounded block">"What is the official VPN portal URL?"</em>
            </p>
            
            <button 
              onClick={handleSimulateColleague}
              disabled={isSimulating || isSolved}
              className="w-full py-4 text-sm bg-violet text-white rounded-lg font-bold hover:bg-violet/90 disabled:opacity-50 transition-colors"
            >
              {isSimulating ? 'Simulating Colleague Query...' : 'Simulate Colleague Query'}
            </button>

            {aiOutput && (
              <div className="mt-6 p-4 bg-void border border-line rounded-xl">
                <p className="text-xs font-mono text-mute mb-2">AI Assistant Response:</p>
                <p className="text-sm text-white leading-relaxed">{aiOutput}</p>
              </div>
            )}
          </div>
        </div>

        {/* DATABASE INTERFACE */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-void">
          <div className="px-5 py-4 border-b border-line bg-surface/30 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Corporate Knowledge Base
            </h3>
            <span className="text-[10px] text-mute font-mono">2 / 100 Docs Indexed</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-mute font-semibold">Indexed Documents</p>
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-surface/30 border border-line relative overflow-hidden group">
                {doc.source === 'system' && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-white/5 text-mute text-[10px] font-mono rounded-bl-lg">
                    SYSTEM
                  </div>
                )}
                {doc.source === 'user' && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-violet/20 text-violet-300 text-[10px] font-mono rounded-bl-lg">
                    USER UPLOAD
                  </div>
                )}
                <h4 className="font-semibold text-sm text-white mb-2">{doc.title}</h4>
                <p className="text-sm text-mute leading-relaxed">{doc.content}</p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-surface/30 border-t border-line shrink-0">
            <p className="text-xs uppercase tracking-widest text-white font-semibold mb-4">Upload New Document</p>
            <form onSubmit={handleAddDocument} className="space-y-3">
              <input
                type="text"
                placeholder="Document Title (e.g., Weekly Report)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={isSolved || isSimulating}
                className="w-full bg-void border border-line rounded-lg px-3 py-2 text-sm text-white placeholder:text-mute focus:outline-none focus:border-violet transition-colors disabled:opacity-50"
              />
              <textarea
                placeholder="Document Content..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                disabled={isSolved || isSimulating}
                rows={3}
                className="w-full bg-void border border-line rounded-lg px-3 py-2 text-sm text-white placeholder:text-mute focus:outline-none focus:border-violet transition-colors disabled:opacity-50 resize-none"
              />
              <button
                type="submit"
                disabled={!newTitle.trim() || !newContent.trim() || isSolved || isSimulating}
                className="w-full py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 disabled:opacity-50 transition-colors"
              >
                Add Document to Index
              </button>
            </form>
          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
