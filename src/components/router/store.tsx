import { create } from "zustand";
import { trackPageView } from "../matomo/utils/matomo";
import { URLSearchParams } from "url";

interface SetPathnameOptions {
	hasSameSearchParams?: boolean;
	hasSameHash?: boolean;
}

interface URLState {
	url: URL;
	setPathname: (url: string, options?: SetPathnameOptions) => void;
	setSearchParams: (searchParams: URLSearchParams) => void;
	addSearchParam: (key: string, value: string) => void;
	removeSearchParam: (keyToRemove: string) => void;
}

let debounceTimeoutId: ReturnType<typeof setTimeout>;

export const useUrlState = create<URLState>()((set, get) => ({
	url: new URL(window.location.href),

	setPathname: (
		pathname,
		{ hasSameSearchParams = false, hasSameHash = false } = {},
	) => {
		const url = new URL(pathname, get().url.origin);

		if (hasSameSearchParams) {
			url.search = get().url.search;
		}

		if (hasSameHash) {
			url.hash = get().url.hash;
		}

		set({ url });

		window.history.pushState({}, "", url);
		trackPageView();
	},

	setSearchParams: (searchParams: URLSearchParams) => {
		const url = new URL(get().url);
		url.search = searchParams.toString();

		set({ url });

		clearTimeout(debounceTimeoutId);

		debounceTimeoutId = setTimeout(() => {
			window.history.pushState({}, "", url);
			trackPageView();
		}, 500);
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
