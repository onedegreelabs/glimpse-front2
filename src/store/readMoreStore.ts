import { create } from 'zustand';

interface ReadMoreStore {
  expandedItems: {
    curations: number[];
    participants: number[];
  };
  setExpandedItems: (id: number, isCuration: boolean) => void;
}

export const useReadMoreStore = create<ReadMoreStore>((set, get) => ({
  expandedItems: {
    curations: [],
    participants: [],
  },
  setExpandedItems: (id, isCuration) => {
    const currentExpandedItems = get().expandedItems;

    if (isCuration) {
      set({
        expandedItems: {
          ...currentExpandedItems,
          curations: [...currentExpandedItems.curations, id],
        },
      });
    } else {
      set({
        expandedItems: {
          ...currentExpandedItems,
          participants: [...currentExpandedItems.participants, id],
        },
      });
    }
  },
}));
