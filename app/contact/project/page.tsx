'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ProjectForm() {
  const searchParams = useSearchParams();
  const [projectType, setProjectType] = useState('');

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      // Map URL parameter to dropdown value
      const mapping: Record<string, string> = {
        'web-development': 'Web Development',
        'full-stack': 'Full-Stack Development',
        'saas-development': 'SaaS Development',
        'crm-development': 'CRM Development',
        'erp-development': 'ERP Development',
        'generative-ai': 'Generative AI',
        'agentic-ai': 'Agentic AI',
        'cloud-solutions': 'Cloud Solutions',
      };
      if (mapping[service]) {
        setProjectType(mapping[service]);
      }
    }
  }, [searchParams]);

  return (
    <form className="mt-8 space-y-6 bg-surface/50 p-8 rounded-2xl border border-line" onSubmit={(e) => e.preventDefault()}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Name</label>
          <input type="text" className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:border-cyan focus:outline-none transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Work Email</label>
          <input type="email" className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:border-cyan focus:outline-none transition-colors" placeholder="john@company.com" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Company</label>
          <input type="text" className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:border-cyan focus:outline-none transition-colors" placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Project Type</label>
          <select 
            className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:border-cyan focus:outline-none transition-colors appearance-none"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select a project type...</option>
            <option value="Web Development">Web Development</option>
            <option value="Full-Stack Development">Full-Stack Development</option>
            <option value="SaaS Development">SaaS Development</option>
            <option value="CRM Development">CRM Development</option>
            <option value="ERP Development">ERP Development</option>
            <option value="Generative AI">Generative AI / LLMs</option>
            <option value="Agentic AI">Agentic AI</option>
            <option value="Cloud Solutions">Cloud Solutions & DevOps</option>
            <option value="Cybersecurity">Cybersecurity / VAPT</option>
            <option value="Other">Other Custom Software</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Project Description</label>
        <textarea 
          className="w-full bg-void border border-line rounded-lg px-4 py-3 text-ink focus:border-cyan focus:outline-none transition-colors min-h-[120px] resize-y" 
          placeholder="Briefly describe what you are looking to build, secure, or automate..." 
        />
      </div>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-sm text-red-200">
        <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <p>Please do not submit passwords, API keys, private keys or other sensitive credentials.</p>
      </div>

      <button type="button" className="btn-primary w-full justify-center">
        Request Project Discussion
      </button>
    </form>
  );
}

export default function ProjectClientPage() {
  return (
    <div className="container-x pt-10 pb-24 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
          Tell Us About <span className="text-cyan">Your Project</span>
        </h1>
        <p className="text-mute text-lg">
          We build, secure, and automate business systems. Let's discuss your requirements and architecture.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-mute">Loading form...</div>}>
        <ProjectForm />
      </Suspense>
    </div>
  );
}
