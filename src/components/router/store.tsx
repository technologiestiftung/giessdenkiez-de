import { create } from "zustand";
import { trackPageView } from "../matomo/utils/matomo";
import { URLSearchParams } from "url";

interface URLState {
	url: URL;
	setPathname: (url: string) => void;
	setSearchParams: (searchParams: URLSearchParams) => void;
	addSearchParam: (key: string, value: string) => void;
	removeSearchParam: (keyToRemove: string) => void;
}

export const useUrlState = create<URLState>()((set, get) => ({
	url: new URL(window.location.href),

	setPathname: (pathname) => {
		const url = new URL(get().url);
		url.pathname = pathname;

		set({ url });

		window.history.pushState({}, "", url);
		trackPageView();
	},

	setSearchParams: (searchParams: URLSearchParams) => {
		const url = new URL(get().url);
		url.search = searchParams.toString();

		set({ url });

		window.history.pushState({}, "", url);
		trackPageView();
	},

	addSearchParam: (key: string, value: string) => {
		const url = new URL(get().url);
		url.searchParams.set(key, value);
		const updatedSearchParams = url.searchParams;
		get().setSearchParams(updatedSearchParams);
	},

	removeSearchParam: (keyToRemove) => {
		const url = new URL(get().url);
		url.searchParams.delete(keyToRemove);
		const updatedSearchParams = url.searchParams;
		get().setSearchParams(updatedSearchParams);
	},
}));
