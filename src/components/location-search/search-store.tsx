import { create } from "zustand";

type SearchStore = {
	isCurrentSearch: string;
	setIsCurrentSearch: (search: string) => void;
	isPickedGeoSearchResult: string;
	setisPickedGeoSearchResult: (search: string) => void;
	isTextInSearchbar: boolean;
	setIsTextInSearchbar: (isTextInSearchbar: boolean) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
	isCurrentSearch: "",
	setIsCurrentSearch: (search) => set({ isCurrentSearch: search }),
	isPickedGeoSearchResult: "",
	setisPickedGeoSearchResult: (search) =>
		set({ isPickedGeoSearchResult: search }),
	isTextInSearchbar: false,
	setIsTextInSearchbar: (isTextInSearchbar) => set({ isTextInSearchbar }),
}));
