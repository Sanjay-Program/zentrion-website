'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';

const questions = [
  {
    id: 1,
    question: "Do you collect or process sensitive user data (e.g., passwords, credit cards, PII)?",
    options: [
      { text: "Yes, we process payment and personal data", score: 30 },
      { text: "Only basic info like names and emails", score: 15 },
      { text: "No, we don't collect user data", score: 0 }
    ]
  },
  {
    id: 2,
    question: "When was the last time your application underwent a professional penetration test?",
    options: [
      { text: "Never", score: 30 },
      { text: "More than a year ago", score: 20 },
      { text: "Within the last 12 months", score: 0 }
    ]
  },
  {
    id: 3,
    question: "How do you handle software updates and patch management for your web servers?",
    options: [
      { text: "Manual updates when we remember", score: 25 },
      { text: "Automated updates but no formal testing", score: 10 },
      { text: "Strict dev/staging/prod deployment pipeline", score: 0 }
    ]
  },
  {
    id: 4,
    question: "Are your employees required to use Multi-Factor Authentication (MFA) for internal tools?",
    options: [
      { text: "No, passwords only", score: 25 },
      { text: "Only for administrators", score: 10 },
      { text: "Yes, mandated across the company", score: 0 }
    ]
  },
  {
    id: 5,
    question: "Do you have a Web Application Firewall (WAF) actively blocking malicious traffic?",
    options: [
      { text: "No / Not sure", score: 20 },
      { text: "Yes, but in 'Log Only' mode", score: 10 },
      { text: "Yes, actively blocking threats", score: 0 }
    ]
  }
];

export default function SecurityAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelectOption = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = score;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateRisk = () => {
    const totalScore = answers.reduce((a, b) => a + b, 0);
    if (totalScore >= 80) return { level: 'CRITICAL', color: 'text-red-500', bar: 'bg-red-500', pct: 90, msg: "Immediate action required. Your infrastructure is highly vulnerable to modern cyber attacks." };
    if (totalScore >= 40) return { level: 'HIGH', color: 'text-orange-500', bar: 'bg-orange-500', pct: 60, msg: "Significant vulnerabilities exist. A targeted penetration test is strongly recommended." };
    if (totalScore >= 15) return { level: 'MEDIUM', color: 'text-yellow-500', bar: 'bg-yellow-500', pct: 30, msg: "Your posture is average, but there are clear gaps that could be exploited." };
    return { level: 'LOW', color: 'text-emerald-500', bar: 'bg-emerald-500', pct: 10, msg: "Good baseline security, but continuous monitoring is still necessary." };
  };

  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Free Assessment"
          title="Website Security Readiness"
          description="Evaluate your organization's exposure to cyber threats in less than 2 minutes. Get instant, actionable insights."
        />
      </Reveal>

      <div className="max-w-2xl mx-auto mt-12">
        {!isComplete ? (
          <GlassCard className="p-8 md:p-12 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-surface">
              <div 
                className="h-full bg-cyan transition-all duration-300"
                style={{ width: `${((currentStep) / questions.length) * 100}%` }}
              />
            </div>
            
            <div className="text-sm font-mono text-cyan mb-6">
              Question {currentStep + 1} of {questions.length}
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-8 leading-relaxed">
              {questions[currentStep].question}
            </h3>

            <div className="space-y-4">
              {questions[currentStep].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left p-4 rounded-xl border border-line bg-surface/50 hover:bg-surface hover:border-cyan/50 hover:shadow-[0_0_15px_rgba(47,107,255,0.1)] transition-all group flex items-center justify-between"
                >
                  <span className="text-ink/90 font-medium group-hover:text-ink">{option.text}</span>
                  <div className="w-5 h-5 rounded-full border border-line group-hover:border-cyan flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
            
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-8 text-sm text-mute hover:text-ink transition-colors"
              >
                ← Back to previous question
              </button>
            )}
          </GlassCard>
        ) : (
          <Reveal>
            <GlassCard className="p-8 md:p-12 text-center border-t-4 border-t-cyan">
              <div className="w-20 h-20 mx-auto bg-surface border border-line rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Assessment Complete</h3>
              <p className="text-mute mb-8 print:hidden">We have calculated your security posture based on industry standards.</p>
              
              <div id="scorecard" className="p-6 md:p-10 bg-void border border-line rounded-xl mb-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                
                <div className="border-b border-line pb-6 mb-6">
                  <h4 className="text-lg font-display text-white mb-1">Zentrion Security Scorecard</h4>
                  <p className="text-sm text-mute font-mono">{new Date().toLocaleDateString()} - Client-Side Assessment</p>
                </div>

                <div className="flex justify-between items-end mb-2 relative z-10">
                  <span className="text-sm text-mute uppercase tracking-widest font-mono">Risk Exposure Level</span>
                  <span className={`text-3xl font-black ${calculateRisk().color}`}>{calculateRisk().level}</span>
                </div>
                
                {/* Visual Risk Meter */}
                <div className="w-full h-4 bg-surface rounded-full overflow-hidden mb-6 relative z-10">
                  <div className={`absolute top-0 left-0 h-full ${calculateRisk().bar} transition-all duration-1000`} style={{ width: `${calculateRisk().pct}%` }} />
                </div>
                
                <div className="bg-surface/30 p-4 rounded-lg border border-[rgba(255,255,255,0.05)] mb-6 relative z-10">
                  <h5 className="text-white font-semibold mb-2">Diagnostic Summary</h5>
                  <p className="text-ink/90 leading-relaxed text-sm">
                    {calculateRisk().msg}
                  </p>
                </div>

                <div className="space-y-3 relative z-10">
                  <h5 className="text-white font-semibold mb-2">Key Action Items</h5>
                  {answers.reduce((a, b) => a + b, 0) >= 40 && (
                    <div className="flex items-start gap-3 text-sm text-mute">
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      <span>Your application is currently at high risk for exploitation. Immediate remediation of patch management and external testing is required.</span>
                    </div>
                  )}
                  {answers[1] > 0 && (
                    <div className="flex items-start gap-3 text-sm text-mute">
                      <svg className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      <span>Schedule a penetration test immediately. Stale application code is a primary vector for breaches.</span>
                    </div>
                  )}
                  {answers[4] > 0 && (
                    <div className="flex items-start gap-3 text-sm text-mute">
                      <svg className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span>Deploy an active Web Application Firewall (WAF) to block automated exploitation attempts.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 print:hidden">
                {answers.reduce((a, b) => a + b, 0) >= 40 && (
                  <p className="text-red-400 font-semibold mb-4">
                    Exposure Score Critical. Schedule a free consultation with our security engineers.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact/project"
                    className="flex-1 py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors shadow-[0_0_20px_rgba(47,107,255,0.3)] hover:shadow-[0_0_30px_rgba(47,107,255,0.5)]"
                  >
                    Discuss Remediation
                  </Link>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-4 bg-surface text-white font-bold rounded-xl border border-line hover:bg-surface/80 transition-colors"
                  >
                    Print Scorecard
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers([]);
                    setIsComplete(false);
                  }}
                  className="block w-full py-4 bg-transparent text-mute hover:text-ink transition-colors font-medium text-sm mt-4"
                >
                  Retake Assessment
                </button>
              </div>
            </GlassCard>
          </Reveal>
        )}
      </div>
    </div>
  );
}
