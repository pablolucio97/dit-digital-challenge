import { create } from "zustand";

type State = {
  loading: boolean;
};

type Actions = {
  setLoading: (loading: boolean) => void;
};

export const useLoading = create<State & Actions>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
