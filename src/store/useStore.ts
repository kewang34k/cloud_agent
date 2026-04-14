import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  targetLanguage: string;
  currentLevel: string;
  xp: number;
  streak: number;
}

export interface Progress {
  courseId: string;
  completedModules: string[];
  score: number;
}

interface AppState {
  user: User | null;
  progress: Record<string, Progress>;
  achievements: string[];
  login: (user: User) => void;
  logout: () => void;
  setTargetLanguage: (lang: string) => void;
  addXp: (amount: number) => void;
  completeModule: (courseId: string, moduleId: string, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      progress: {},
      achievements: [],
      
      login: (user) => set({ user }),
      logout: () => set({ user: null, progress: {}, achievements: [] }),
      
      setTargetLanguage: (lang) => 
        set((state) => ({
          user: state.user ? { ...state.user, targetLanguage: lang } : null
        })),
        
      addXp: (amount) => 
        set((state) => ({
          user: state.user ? { ...state.user, xp: state.user.xp + amount } : null
        })),
        
      completeModule: (courseId, moduleId, score) =>
        set((state) => {
          const courseProgress = state.progress[courseId] || { courseId, completedModules: [], score: 0 };
          if (!courseProgress.completedModules.includes(moduleId)) {
            courseProgress.completedModules.push(moduleId);
            courseProgress.score += score;
          }
          return {
            progress: {
              ...state.progress,
              [courseId]: courseProgress
            }
          };
        }),
        
      unlockAchievement: (achievementId) =>
        set((state) => {
          if (!state.achievements.includes(achievementId)) {
            return { achievements: [...state.achievements, achievementId] };
          }
          return state;
        }),
    }),
    {
      name: 'language-learning-storage',
    }
  )
);
