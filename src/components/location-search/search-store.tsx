import { create } from "zustand";

type SearchStore = {
	isCurrentSearch: string;
	setIsCurrentSearch: (search: string) => void;
	isPickedGeoSearchResult: string;
	setisPickedGeoSearchResult: (search: string) => void;
	isTextInSearchbar: boolean;
	setIsTextInSearchbar: (isTextInSearchbar: boolean) => void;
	clearSearch: () => void;
};

const initialState = {
	isCurrentSearch: "",
	isPickedGeoSearchResult: "",
	isTextInSearchbar: false,
};

export const useSearchStore = create<SearchStore>()((set) => ({
	...initialState,
	setIsCurrentSearch: (search) => set({ isCurrentSearch: search }),
	setisPickedGeoSearchResult: (search) =>
		set({ isPickedGeoSearchResult: search }),
	setIsTextInSearchbar: (isTextInSearchbar) => set({ isTextInSearchbar }),
	clearSearch: () => {
		set(initialState);
	},
}));
