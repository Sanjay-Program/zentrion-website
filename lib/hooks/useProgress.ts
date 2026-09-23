'use client';

import { useState, useEffect } from 'react';

type ProgressData = {
  completedGuides: string[];
  completedLabs: string[];
  completedChallenges: string[];
  quizScores: Record<string, number>;
};

const DEFAULT_PROGRESS: ProgressData = {
  completedGuides: [],
  completedLabs: [],
  completedChallenges: [],
  quizScores: {},
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zentrion_progress');
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newData: ProgressData) => {
    setProgress(newData);
    try {
      localStorage.setItem('zentrion_progress', JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  };

  const markGuideComplete = (guideId: string) => {
    if (progress.completedGuides.includes(guideId)) return;
    saveProgress({
      ...progress,
      completedGuides: [...progress.completedGuides, guideId],
    });
  };

  const markLabComplete = (labId: string) => {
    if (progress.completedLabs.includes(labId)) return;
    saveProgress({
      ...progress,
      completedLabs: [...progress.completedLabs, labId],
    });
  };

  return {
    progress,
    isLoaded,
    markGuideComplete,
    markLabComplete,
  };
}
