import { create } from 'zustand';

interface SignupStore {
  userInfo: {
    email: string;
  };
  setUserInfo: (userInfo: { email: string }) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userInfo: {
    email: '',
  },
  setUserInfo: (userInfo) =>
    set((state) => ({
      ...state,
      userInfo,
    })),
}));
