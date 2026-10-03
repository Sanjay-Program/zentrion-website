import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface CampaignProgress {
  campaignId: string;
  unlockedStages: string[]; // List of lab IDs unlocked
  completedStages: string[]; // List of lab IDs completed in this campaign
  isCompleted: boolean;
}

export interface RangeState {
  xp: number;
  solvedLabs: string[];
  badges: Badge[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  campaigns: CampaignProgress[];
  addXP: (amount: number) => void;
  markLabSolved: (labId: string, xpReward: number) => void;
  awardBadge: (badge: Badge) => void;
  updateStreak: () => void;
  updateCampaignProgress: (campaignId: string, completedLabId: string, nextLabId?: string) => void;
}

export const useRangeStore = create<RangeState>()(
  persist(
    (set, get) => ({
      xp: 0,
      solvedLabs: [],
      badges: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      campaigns: [],

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      updateCampaignProgress: (campaignId, completedLabId, nextLabId) => {
        const state = get();
        const existingCampaign = state.campaigns.find(c => c.campaignId === campaignId);
        
        let newCampaigns = [...state.campaigns];
        
        if (existingCampaign) {
          const updatedCampaign = { ...existingCampaign };
          if (!updatedCampaign.completedStages.includes(completedLabId)) {
            updatedCampaign.completedStages.push(completedLabId);
            
            // Hardcoded stage unlocks for Operation Neon
            if (campaignId === 'operation-neon') {
              if (completedLabId === 'network-recon') updatedCampaign.unlockedStages.push('web-enumeration');
              if (completedLabId === 'web-enumeration') updatedCampaign.unlockedStages.push('sql-injection');
              if (completedLabId === 'sql-injection') updatedCampaign.unlockedStages.push('forensics-01');
            }
          }
          if (nextLabId && !updatedCampaign.unlockedStages.includes(nextLabId)) {
            updatedCampaign.unlockedStages.push(nextLabId);
          }
          // Mark complete if 4 stages done (for Neon)
          if (updatedCampaign.completedStages.length >= 4) {
             updatedCampaign.isCompleted = true;
          }
          newCampaigns = newCampaigns.map(c => c.campaignId === campaignId ? updatedCampaign : c);
        } else {
          newCampaigns.push({
            campaignId,
            completedStages: [completedLabId],
            unlockedStages: nextLabId ? [completedLabId, nextLabId] : [completedLabId],
            isCompleted: false
          });
        }
        
        set({ campaigns: newCampaigns });

        // Award badge if campaign is newly completed
        const updated = newCampaigns.find(c => c.campaignId === campaignId);
        if (updated && updated.isCompleted && (!existingCampaign || !existingCampaign.isCompleted)) {
           get().awardBadge({
              id: `campaign-${campaignId}`,
              name: 'Campaign Strategist',
              icon: '⚔️',
              description: `Successfully completed the ${campaignId} operation.`,
              earnedAt: new Date().toISOString()
           });
        }
      },

      markLabSolved: (labId, xpReward) => {
        const state = get();
        if (!state.solvedLabs.includes(labId)) {
          const newSolved = [...state.solvedLabs, labId];
          const newXp = state.xp + xpReward;
          
          set({
            solvedLabs: newSolved,
            xp: newXp,
          });

          // Award badge for first lab solved
          if (newSolved.length === 1) {
            get().awardBadge({
              id: 'first-blood',
              name: 'First Blood',
              icon: '🩸',
              description: 'Solved your very first cyber range lab.',
              earnedAt: new Date().toISOString()
            });
          }
          // Award badge for 5 labs
          if (newSolved.length === 5) {
            get().awardBadge({
              id: 'hacker-initiate',
              name: 'Hacker Initiate',
              icon: '💻',
              description: 'Solved 5 cyber range labs.',
              earnedAt: new Date().toISOString()
            });
          }
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
          set({ currentStreak: 1, longestStreak: Math.max(state.longestStreak || 0, 1), lastActiveDate: today });
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastActiveDate === yesterdayStr) {
          // Continuous streak
          const newStreak = state.currentStreak + 1;
          set({ 
            currentStreak: newStreak, 
            longestStreak: Math.max(state.longestStreak || 0, newStreak),
            lastActiveDate: today 
          });

          // Award badge for 7-day streak
          if (newStreak === 7) {
            get().awardBadge({
              id: 'dedicated',
              name: 'Dedicated Hacker',
              icon: '🔥',
              description: 'Maintained a 7-day hacking streak.',
              earnedAt: new Date().toISOString()
            });
          }
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
