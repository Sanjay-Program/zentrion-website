'use client';

import { useState } from 'react';
import { useProgress } from '@/lib/hooks/useProgress';

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizProps {
  quizId: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function QuizEngine({ quizId, title, description, questions }: QuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { progress, markGuideComplete, isLoaded } = useProgress();

  const currentQuestion = questions[currentQuestionIdx];

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;

    if (!isAnswered) {
      setIsAnswered(true);
      if (selectedOptionId === currentQuestion.correctOptionId) {
        setScore((s) => s + 1);
      }
    } else {
      // Move to next
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx((i) => i + 1);
        setSelectedOptionId(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        // Save progress if passed
        const finalScore = score + (selectedOptionId === currentQuestion.correctOptionId ? 1 : 0);
        const passThreshold = Math.ceil(questions.length * 0.7); // 70% to pass
        if (finalScore >= passThreshold) {
          markGuideComplete(`quiz_${quizId}`);
        }
      }
    }
  };

  if (isFinished) {
    const passed = score >= Math.ceil(questions.length * 0.7);
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <h2 className="text-3xl font-display font-semibold mb-4 text-ink">Quiz Complete</h2>
        <div className="text-5xl font-black font-mono tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan to-violet">
          {Math.round((score / questions.length) * 100)}%
        </div>
        <p className="text-mute mb-8 text-lg">
          You scored {score} out of {questions.length}.
        </p>
        
        {passed ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-8">
            <h3 className="text-emerald-400 font-semibold flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              Passed!
            </h3>
            <p className="text-sm text-emerald-400/80 mt-1">This quiz has been saved to your local progress.</p>
          </div>
        ) : (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-8">
            <h3 className="text-red-400 font-semibold flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6"/></svg>
              Not quite there
            </h3>
            <p className="text-sm text-red-400/80 mt-1">Review the material and try again. You need 70% to pass.</p>
          </div>
        )}

        <button 
          onClick={() => {
            setCurrentQuestionIdx(0);
            setSelectedOptionId(null);
            setIsAnswered(false);
            setScore(0);
            setIsFinished(false);
          }}
          className="btn-primary"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-ink">{title}</h1>
        <p className="text-mute mt-2">{description}</p>
        
        {/* Progress bar */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan transition-all duration-300"
              style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-mute uppercase tracking-widest">
            {currentQuestionIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl">
        <h2 className="text-xl font-medium text-ink mb-6 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentQuestion.correctOptionId;
            
            let stateClass = "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-cyan/50 hover:bg-cyan/5";
            
            if (isAnswered) {
              if (isCorrect) {
                stateClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
              } else if (isSelected && !isCorrect) {
                stateClass = "border-red-500/50 bg-red-500/10 text-red-400";
              } else {
                stateClass = "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] opacity-50";
              }
            } else if (isSelected) {
              stateClass = "border-cyan bg-cyan/10 text-cyan";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${stateClass}`}
              >
                <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center
                  ${isAnswered && isCorrect ? 'border-emerald-500 bg-emerald-500 text-void' : 
                    isAnswered && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-void' :
                    isSelected ? 'border-cyan bg-cyan text-void' : 'border-mute/30'}`}
                >
                  {isAnswered && isCorrect && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                  {isAnswered && isSelected && !isCorrect && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
                </div>
                <span className="leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mt-6 p-4 rounded-xl border ${selectedOptionId === currentQuestion.correctOptionId ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              {selectedOptionId === currentQuestion.correctOptionId ? (
                <span className="text-emerald-400">Correct</span>
              ) : (
                <span className="text-red-400">Incorrect</span>
              )}
            </h4>
            <p className="text-mute text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              !selectedOptionId 
                ? 'bg-white/5 text-mute cursor-not-allowed' 
                : 'bg-cyan text-void hover:bg-cyan-light'
            }`}
          >
            {!isAnswered ? 'Check Answer' : currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}
