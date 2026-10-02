import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface RangeState {
  xp: number;
  solvedLabs: string[];
  badges: Badge[];
  currentStreak: number;
  lastActiveDate: string | null;
  addXP: (amount: number) => void;
  markLabSolved: (labId: string, xpReward: number) => void;
  awardBadge: (badge: Badge) => void;
  updateStreak: () => void;
}

export const useRangeStore = create<RangeState>()(
  persist(
    (set, get) => ({
      xp: 0,
      solvedLabs: [],
      badges: [],
      currentStreak: 0,
      lastActiveDate: null,

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      markLabSolved: (labId, xpReward) => {
        const state = get();
        if (!state.solvedLabs.includes(labId)) {
          set({
            solvedLabs: [...state.solvedLabs, labId],
            xp: state.xp + xpReward,
          });
        }
      },

      awardBadge: (badge) => {
        const state = get();
        if (!state.badges.find((b) => b.id === badge.id)) {
          set({ badges: [...state.badges, badge] });
        }
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const state = get();

        if (state.lastActiveDate === today) {
          return; // Already active today
        }

        if (!state.lastActiveDate) {
          // First time
          set({ currentStreak: 1, lastActiveDate: today });
          return;
        }

        const lastActive = new Date(state.lastActiveDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastActiveDate === yesterdayStr) {
          // Continuous streak
          set({ currentStreak: state.currentStreak + 1, lastActiveDate: today });
        } else {
          // Streak broken
          set({ currentStreak: 1, lastActiveDate: today });
        }
      },
    }),
    {
      name: 'zentrion-cyber-range-storage', // key in localStorage
    }
  )
);
