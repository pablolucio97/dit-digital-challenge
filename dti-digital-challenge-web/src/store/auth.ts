import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  email: string;
};

type State = {
  isAuthenticated: boolean;
  user: User;
};

type Actions = {
  signIn: (user: User) => void;
  signOut: () => void;
};

const STORAGE_KEY = "auth-storage";

export const useAuthenticationStore = create(
  persist<State & Actions>(
    (set) => ({
      isAuthenticated: false,
      user: null as never,
      signIn: (user: User) => {
        set({ isAuthenticated: true, user });
      },
      signOut: () => {
        set({ isAuthenticated: false });
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
