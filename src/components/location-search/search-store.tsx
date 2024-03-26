import { create } from "zustand";

type SearchStore = {
	currentSearch: string;
	pickedGeoCodingSearchResults: string;
	setCurrentSearch: (search: string) => void;
	setPickedGeoCodingSearchResults: (search: string) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
	currentSearch: "",
	setCurrentSearch: (search) => set({ currentSearch: search }),
	pickedGeoCodingSearchResults: "",
	setPickedGeoCodingSearchResults: (search) =>
		set({ pickedGeoCodingSearchResults: search }),
}));
