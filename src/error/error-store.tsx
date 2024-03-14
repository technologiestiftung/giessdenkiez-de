import { create } from "zustand";

interface ErrorStore {
  error?: string;
  handleError: (userFacingErrorMessage: string, thrownError?: any) => void;
  clearErrors: () => void;
}

const errorShowTimeMs = 5000;

export const useErrorStore = create<ErrorStore>()((set) => ({
  error: undefined,
  handleError: (userFacingErrorMessage: string, thrownError?: any) => {
    console.log(thrownError);
    set({ error: userFacingErrorMessage });
    setTimeout(() => {
      set({ error: undefined });
    }, errorShowTimeMs);
  },
  clearErrors: () => set({ error: undefined }),
}));
