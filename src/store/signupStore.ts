import { create } from 'zustand';

interface SignupStore {
  userInfo: {
    email: string;
    eventId: string;
  };
  setUserInfo: (userInfo: { email: string; eventId: string }) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userInfo: {
    email: '',
    eventId: '',
  },
  setUserInfo: (userInfo) =>
    set((state) => ({
      ...state,
      userInfo,
    })),
}));
