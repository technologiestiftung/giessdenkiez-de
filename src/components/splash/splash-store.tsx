import { create } from "zustand";
import { addDays, compareAsc } from "date-fns";
import { persist } from "zustand/middleware";

interface SplashState {
	expirationDate: Date;
	isSplashScreenVisible: () => boolean;
	hideSplashScreen: () => void;
}

export const useSplashStore = create<SplashState>()(
	persist(
		(set, get) => ({
			expirationDate: new Date(),

			isSplashScreenVisible: () => {
				const date = new Date(get().expirationDate);
				const today = new Date();

				const hasExpired = compareAsc(today, date) === 1;
				return hasExpired;
			},

			hideSplashScreen: () => {
				set({ expirationDate: addDays(new Date(), 1) });
			},
		}),
		{ name: "splash-store" },
	),
);
