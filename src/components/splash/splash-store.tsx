import { create } from "zustand";
import { addDays, compareAsc } from "date-fns";

interface SplashState {
	isSplashScreenVisible: boolean;
	hideSplashScreen: () => void;
}

const hideSplashScreenUntilKey = "hide-splash-screen-until";

export const useSplashStore = create<SplashState>((set) => ({
	isSplashScreenVisible: hasHideSplashScreenExpired(),
	hideSplashScreen: () => {
		set({ isSplashScreenVisible: false });
		updateExpirationDate();
	},
}));

function hasHideSplashScreenExpired() {
	const expirationDate = localStorage.getItem(hideSplashScreenUntilKey);

	updateExpirationDate();

	if (expirationDate === null) {
		return true;
	}

	const date = new Date(expirationDate);
	const today = new Date();

	const hasExpired = compareAsc(today, date) === 1;
	return hasExpired;
}

function updateExpirationDate() {
	const newExpirationDate = addDays(new Date(), 7);

	localStorage.setItem(hideSplashScreenUntilKey, newExpirationDate.toString());
}
