import { create } from 'zustand';

interface MatchStore {
  isComplete: boolean;
  setIsComplete: (state: boolean) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  isComplete: false,
  setIsComplete: (state) => set({ isComplete: state }),
}));
