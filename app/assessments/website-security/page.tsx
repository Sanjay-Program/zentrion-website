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
              <p className="text-mute mb-8">We have calculated your security posture based on industry standards.</p>
              
              <div className="p-6 bg-void border border-line rounded-xl mb-8 text-left">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-mute uppercase tracking-widest font-mono">Risk Exposure Level</span>
                  <span className={`text-2xl font-black ${calculateRisk().color}`}>{calculateRisk().level}</span>
                </div>
                
                {/* Visual Risk Meter */}
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden mb-4 relative">
                  <div className={`absolute top-0 left-0 h-full ${calculateRisk().bar} transition-all duration-1000`} style={{ width: `${calculateRisk().pct}%` }} />
                </div>
                
                <p className="text-ink/90 leading-relaxed">
                  {calculateRisk().msg}
                </p>
              </div>

              <div className="space-y-4">
                <Link 
                  href="/book-consultation"
                  className="block w-full py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors shadow-[0_0_20px_rgba(47,107,255,0.3)] hover:shadow-[0_0_30px_rgba(47,107,255,0.5)]"
                >
                  Book a Free Vulnerability Consultation
                </Link>
                <button 
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers([]);
                    setIsComplete(false);
                  }}
                  className="block w-full py-3 bg-transparent text-mute hover:text-ink transition-colors font-medium text-sm"
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
