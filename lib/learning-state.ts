'use client';

// Client-side only storage utility for tracking learning progress

export interface LearningState {
  completedGuides: string[];
  completedLabs: string[];
  completedQuizzes: { id: string, score: number, total: number }[];
  bookmarks: string[];
  recentlyViewed: { url: string; title: string; timestamp: number }[];
}

const STORAGE_KEY = 'zentrion_learning_state';

const defaultState: LearningState = {
  completedGuides: [],
  completedLabs: [],
  completedQuizzes: [],
  bookmarks: [],
  recentlyViewed: [],
};

// Internal helper to get/set state
function getState(): LearningState {
  if (typeof window === 'undefined') return defaultState;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to parse learning state', err);
    return defaultState;
  }
}

function saveState(state: LearningState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch a custom event so UI can re-render if listening
    window.dispatchEvent(new CustomEvent('zentrion-learning-updated'));
  } catch (err) {
    console.error('Failed to save learning state', err);
  }
}

export const learningManager = {
  get: getState,

  markGuideCompleted: (slug: string) => {
    const state = getState();
    if (!state.completedGuides.includes(slug)) {
      state.completedGuides.push(slug);
      saveState(state);
    }
  },

  markLabCompleted: (slug: string) => {
    const state = getState();
    if (!state.completedLabs.includes(slug)) {
      state.completedLabs.push(slug);
      saveState(state);
    }
  },

  markQuizCompleted: (id: string, score: number, total: number) => {
    const state = getState();
    const existing = state.completedQuizzes.findIndex(q => q.id === id);
    if (existing !== -1) {
      if (score > state.completedQuizzes[existing].score) {
        state.completedQuizzes[existing] = { id, score, total };
        saveState(state);
      }
    } else {
      state.completedQuizzes.push({ id, score, total });
      saveState(state);
    }
  },

  toggleBookmark: (url: string) => {
    const state = getState();
    if (state.bookmarks.includes(url)) {
      state.bookmarks = state.bookmarks.filter((b) => b !== url);
    } else {
      state.bookmarks.push(url);
    }
    saveState(state);
  },

  addRecentlyViewed: (url: string, title: string) => {
    const state = getState();
    // Remove if it exists
    state.recentlyViewed = state.recentlyViewed.filter((item) => item.url !== url);
    // Add to front
    state.recentlyViewed.unshift({ url, title, timestamp: Date.now() });
    // Keep only last 10
    if (state.recentlyViewed.length > 10) {
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
    }
    saveState(state);
  },
  
  isCompleted: (type: 'guide' | 'lab', slug: string) => {
    const state = getState();
    if (type === 'guide') return state.completedGuides.includes(slug);
    return state.completedLabs.includes(slug);
  },
  
  isBookmarked: (url: string) => {
    const state = getState();
    return state.bookmarks.includes(url);
  },
  
  clearData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('zentrion-learning-updated'));
    }
  }
};
