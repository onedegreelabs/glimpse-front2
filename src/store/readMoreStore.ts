import { create } from 'zustand';

interface ReadMoreStore {
  expandedItems: {
    curations: number[];
    participants: number[];
  };
  setExpandedItems: (items: {
    curations: number[];
    participants: number[];
  }) => void;
}

export const useReadMoreStore = create<ReadMoreStore>((set) => ({
  expandedItems: {
    curations: [],
    participants: [],
  },
  setExpandedItems: (items) =>
    set((state) => ({
      ...state,
      expandedItems: items,
    })),
}));
