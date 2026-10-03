'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { buildMailtoLink, buildWhatsAppLink } from '@/lib/contact';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  company: z.string().min(2, 'Company name is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(20, 'Please provide more detail about your project (at least 20 characters)'),
});

type FormData = z.infer<typeof formSchema>;

function ProjectForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [waLink, setWaLink] = useState('');
  const [mailLink, setMailLink] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      description: '',
    }
  });

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
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
        setValue('projectType', mapping[service]);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const body = `New Project Inquiry:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nProject Type: ${data.projectType}\n\nDescription:\n${data.description}`;
    const subject = `Project Inquiry: ${data.projectType} (${data.company})`;

    const wa = buildWhatsAppLink(body);
    const mail = buildMailtoLink(subject, body);
    
    setWaLink(wa);
    setMailLink(mail);
    setSubmitStatus('success');
    setIsSubmitting(false);

    window.open(wa, '_blank', 'noopener,noreferrer');
  };

  if (submitStatus === 'success') {
    return (
      <div className="mt-8 bg-surface/50 p-12 rounded-2xl border border-line text-center border-t-4 border-t-cyan">
        <div className="w-16 h-16 bg-cyan/10 border border-cyan/20 text-cyan rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-ink mb-2">Message ready to send</h3>
        <p className="text-mute mb-8">We opened WhatsApp with your project details filled in — just hit send. If it didn’t open, use the buttons below.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Continue on WhatsApp
          </a>
          <a href={mailLink} className="btn-ghost">
            Send via Email Instead
          </a>
        </div>
        
        <button onClick={() => setSubmitStatus('idle')} className="text-sm text-mute hover:text-ink transition-colors">Start a new request</button>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6 bg-surface/50 p-8 rounded-2xl border border-line" onSubmit={handleSubmit(onSubmit)}>
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-200">
          There was an error submitting your request. Please try again or email us directly.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Name</label>
          <input 
            {...register('name')}
            type="text" 
            className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
            placeholder="John Doe" 
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Work Email</label>
          <input 
            {...register('email')}
            type="email" 
            className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
            placeholder="john@company.com" 
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Company</label>
          <input 
            {...register('company')}
            type="text" 
            className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none transition-colors ${errors.company ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
            placeholder="Company Name" 
          />
          {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Project Type</label>
          <select 
            {...register('projectType')}
            className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none transition-colors appearance-none ${errors.projectType ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`}
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
          {errors.projectType && <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Project Description</label>
        <textarea 
          {...register('description')}
          className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none transition-colors min-h-[120px] resize-y ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
          placeholder="Briefly describe what you are looking to build, secure, or automate..." 
        />
        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
      </div>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-sm text-red-200">
        <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <p>Please do not submit passwords, API keys, private keys or other sensitive credentials.</p>
      </div>

      <button 
        type="submit" 
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Request Project Discussion'}
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
