import { create } from "zustand";

interface ErrorStore {
	error?: string;
	handleError: (userFacingErrorMessage: string, thrownError?: any) => void;
	clearErrors: () => void;
}

const errorShowTimeMs = 5000;

export const useErrorStore = create<ErrorStore>()((set, get) => ({
	error: undefined,

	clearErrors: () => set({ error: undefined }),

	handleError: (userFacingErrorMessage: string, thrownError?: any) => {
		console.error(thrownError);
		set({ error: userFacingErrorMessage });
		setTimeout(() => {
			get().clearErrors();
		}, errorShowTimeMs);
	},
}));
