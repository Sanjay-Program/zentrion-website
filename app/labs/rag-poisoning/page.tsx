'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';

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

  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/labs" className="text-cyan text-sm font-medium hover:underline inline-flex items-center gap-1">
          &larr; Back to Labs
        </Link>
        <button onClick={resetLab} className="text-sm text-mute hover:text-ink flex items-center gap-2 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset Lab
        </button>
      </div>

      <Reveal>
        <SectionHeading
          eyebrow="Interactive Lab"
          title="RAG Poisoning (Indirect Prompt Injection)"
          description="Learn how attackers can hijack AI assistants by injecting malicious instructions into the documents the AI reads."
        />
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-[1fr,1.5fr] gap-10">
        {/* INSTRUCTIONS & SIMULATION PANEL */}
        <div className="space-y-6 flex flex-col h-full">
          <GlassCard className="border-violet/30 bg-violet/5">
            <h3 className="font-display font-semibold text-lg text-violet mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Mission Briefing
            </h3>
            <p className="text-sm text-ink leading-relaxed mb-4">
              The company uses an Internal AI Assistant powered by <strong>RAG (Retrieval-Augmented Generation)</strong>. When an employee asks a question, the AI searches the company document database, reads the results, and generates an answer.
            </p>
            <p className="text-sm text-ink leading-relaxed mb-4">
              You have access to upload a new document (e.g., a "Project Report") to the database.
            </p>
            <div className="p-3 bg-void rounded border border-line">
              <span className="text-xs font-mono text-violet block mb-1">Target:</span>
              <span className="text-sm text-ink">Upload a poisoned document so that when a colleague asks the AI for the <strong>VPN Portal URL</strong>, the AI provides a malicious URL (e.g., <code>https://attacker.com</code>) instead of the real one.</span>
            </div>
          </GlassCard>

          <GlassCard className="flex-1 flex flex-col justify-center">
            <h4 className="font-medium text-ink mb-4 text-sm uppercase tracking-wide">Test the Exploit</h4>
            <p className="text-sm text-mute mb-6">
              Click the button below to simulate an unsuspecting colleague asking the AI assistant: <em>"What is the official VPN portal URL?"</em>
            </p>
            
            <button 
              onClick={handleSimulateColleague}
              disabled={isSimulating || isSolved}
              className="w-full btn-primary !bg-violet !border-violet !text-white disabled:opacity-50 justify-center py-4 text-sm"
            >
              {isSimulating ? 'Simulating Colleague Query...' : 'Simulate Colleague Query'}
            </button>

            {aiOutput && (
              <div className="mt-6 p-4 bg-void border border-line rounded-xl">
                <p className="text-xs font-mono text-mute mb-2">AI Assistant Response:</p>
                <p className="text-sm text-ink leading-relaxed">{aiOutput}</p>
              </div>
            )}

            {isSolved && (
              <div className="mt-6 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 animate-fade-in">
                <h4 className="font-display font-semibold text-emerald-400 text-lg flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Lab Completed!
                </h4>
                <p className="text-sm text-emerald-100/80 mt-2">
                  You successfully executed an Indirect Prompt Injection! By poisoning the data retrieved by the AI, you manipulated its output without directly interacting with the prompt interface.
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* DATABASE INTERFACE */}
        <div className="flex flex-col border border-line rounded-2xl bg-surface/30 overflow-hidden shadow-2xl">
          <div className="px-5 py-4 border-b border-line bg-void flex items-center justify-between shrink-0">
            <h3 className="text-sm font-medium text-ink flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Corporate Knowledge Base
            </h3>
            <span className="text-[10px] text-mute font-mono">2 / 100 Docs Indexed</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-mute font-semibold">Indexed Documents</p>
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-void border border-line relative overflow-hidden group">
                {doc.source === 'system' && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-ink/5 text-mute text-[10px] font-mono rounded-bl-lg">
                    SYSTEM
                  </div>
                )}
                {doc.source === 'user' && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-violet/10 text-violet text-[10px] font-mono rounded-bl-lg">
                    USER UPLOAD
                  </div>
                )}
                <h4 className="font-semibold text-sm text-ink mb-2">{doc.title}</h4>
                <p className="text-sm text-mute leading-relaxed">{doc.content}</p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-void border-t border-line shrink-0">
            <p className="text-xs uppercase tracking-widest text-mute font-semibold mb-4">Upload New Document</p>
            <form onSubmit={handleAddDocument} className="space-y-3">
              <input
                type="text"
                placeholder="Document Title (e.g., Weekly Report)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={isSolved || isSimulating}
                className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-violet transition-colors disabled:opacity-50"
              />
              <textarea
                placeholder="Document Content..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                disabled={isSolved || isSimulating}
                rows={3}
                className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-violet transition-colors disabled:opacity-50 resize-none"
              />
              <button
                type="submit"
                disabled={!newTitle.trim() || !newContent.trim() || isSolved || isSimulating}
                className="w-full py-2 bg-ink/10 text-ink text-sm font-medium rounded-lg hover:bg-ink/20 disabled:opacity-50 transition-colors"
              >
                Add Document to Index
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
