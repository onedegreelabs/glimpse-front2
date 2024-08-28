import { create } from 'zustand';

interface TermsModalStore {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export const useTermsModalStore = create<TermsModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
}));
