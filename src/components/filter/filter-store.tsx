/* eslint-disable max-lines */
import { create } from "zustand";
import { replaceUrlSearchParam } from "../../utils/url-utils";
import { useUrlState } from "../router/store";
import { useMapConstants } from "../map/hooks/use-map-constants";
import { usePumpStore } from "../map/hooks/use-pump-store";
import { useTreeStore } from "../tree-detail/stores/tree-store";

export interface TreeAgeRange {
	min: number;
	max: number;
}

export interface FilterState {
	isPumpsVisible: boolean;
	isTreeWaterNeedVisible: boolean;
	isFilterViewVisible: boolean;
	isSomeFilterActive: () => boolean;
	lat: number;
	lng: number;
	zoom: number;
	treeAgeRange: TreeAgeRange;
	setTreeAgeRange: (min: number, max: number) => void;
	setShowPumps: (showPumps: boolean) => void;
	setShowWaterNeedTrees: (showWaterNeedTrees: boolean) => void;
	showFilterView: () => void;
	hideFilterView: () => void;
	toggleFilterView: () => void;
	resetFilters: () => void;
	setLat: (lat: number) => void;
	setLng: (lng: number) => void;
	setZoom: (zoom: number) => void;
	recoverUrlParams: () => void;
}

const initialTreeAgeRange = {
	min: 0,
	max: 200,
};

const treeAgeUrlKey = "treeAge";
const isPumpsVisibleUrlKey = "isPumpsVisible";
const isTreeWaterNeedVisibleUrlKey = "isTreeWaterNeedVisible";
const zoomUrlKey = "zoom";
const latUrlKey = "lat";
const lngUrlKey = "lng";

const isPumpsVisibleSearch = new URL(window.location.href).searchParams.get(
	isPumpsVisibleUrlKey,
);

const isTreeWaterNeedVisibleSearch = new URL(
	window.location.href,
).searchParams.get(isTreeWaterNeedVisibleUrlKey);

const zoomSearch = new URL(window.location.href).searchParams.get(zoomUrlKey);
const latSearch = new URL(window.location.href).searchParams.get(latUrlKey);
const lngSearch = new URL(window.location.href).searchParams.get(lngUrlKey);

export const useFilterStore = create<FilterState>()((set, get) => ({
	treeAgeRange: initialTreeAgeRange,

	isPumpsVisible: isPumpsVisibleSearch === "true",

	isTreeWaterNeedVisible: isTreeWaterNeedVisibleSearch === "true",

	isFilterViewVisible: false,

	lat: latSearch ? parseFloat(latSearch) : useMapConstants().MAP_CENTER_LAT,
	lng: lngSearch ? parseFloat(lngSearch) : useMapConstants().MAP_CENTER_LNG,
	zoom: zoomSearch
		? parseFloat(zoomSearch)
		: useMapConstants().MAP_INITIAL_ZOOM_LEVEL,
	isSomeFilterActive: () => {
		return (
			get().treeAgeRange.min !== initialTreeAgeRange.min ||
			get().treeAgeRange.max !== initialTreeAgeRange.max ||
			get().isPumpsVisible ||
			get().isTreeWaterNeedVisible
		);
	},
	setShowPumps: (showPumps) => {
		set({ isPumpsVisible: showPumps });
		const url = new URL(window.location.href);
		const updatedSearchParams = replaceUrlSearchParam(
			url,
			isPumpsVisibleUrlKey,
			[showPumps ? "true" : "false"],
		);
		useUrlState.getState().setSearchParams(updatedSearchParams);
	},

	setShowWaterNeedTrees: (showWaterNeedTrees) => {
		set({ isTreeWaterNeedVisible: showWaterNeedTrees });

		const url = new URL(window.location.href);
		const updatedSearchParams = replaceUrlSearchParam(
			url,
			isTreeWaterNeedVisibleUrlKey,
			[showWaterNeedTrees ? "true" : "false"],
		);
		useUrlState.getState().setSearchParams(updatedSearchParams);
	},

	setTreeAgeRange: (min, max) => {
		set({ treeAgeRange: { min, max } });

		const updatedRangeIdentifiers = [
			get().treeAgeRange.min.toString() +
				"-" +
				get().treeAgeRange.max.toString(),
		];

		// Update search params in URL
		const updatedSearchParams = replaceUrlSearchParam(
			new URL(window.location.href),
			treeAgeUrlKey,
			updatedRangeIdentifiers,
		);
		useUrlState.getState().setSearchParams(updatedSearchParams);
	},

	toggleFilterView: () => {
		const shouldShow = !get().isFilterViewVisible;
		set({ isFilterViewVisible: shouldShow });
		if (shouldShow) {
			usePumpStore.getState().setHoveredPump(undefined);
			usePumpStore.getState().setSelectedPump(undefined);
		}
	},

	showFilterView: () => {
		usePumpStore.getState().setHoveredPump(undefined);
		usePumpStore.getState().setSelectedPump(undefined);
		set({ isFilterViewVisible: true });
	},

	hideFilterView: () => {
		set({ isFilterViewVisible: false });
	},

	resetFilters: () => {
		useUrlState.getState().removeSearchParam(treeAgeUrlKey);
		useUrlState.getState().removeSearchParam(isPumpsVisibleUrlKey);
		useUrlState.getState().removeSearchParam(isTreeWaterNeedVisibleUrlKey);
		set({
			treeAgeRange: initialTreeAgeRange,
			isPumpsVisible: false,
			isTreeWaterNeedVisible: false,
		});
	},

	setLat: (lat) => {
		useUrlState.getState().addSearchParam("lat", lat.toString());
		set({ lat });
	},

	setLng: (lng) => {
		useUrlState.getState().addSearchParam("lng", lng.toString());
		set({ lng });
	},

	setZoom: (zoom) => {
		useUrlState.getState().addSearchParam("zoom", zoom.toString());
		set({ zoom });
	},

	recoverUrlParams: () => {
		useUrlState.getState().addSearchParam("lat", get().lat.toString());
		useUrlState.getState().addSearchParam("lng", get().lng.toString());
		useUrlState.getState().addSearchParam("zoom", get().zoom.toString());
		useUrlState
			.getState()
			.addSearchParam("isPumpsVisible", get().isPumpsVisible.toString());
		useUrlState
			.getState()
			.addSearchParam("isPumpsVisible", get().isPumpsVisible.toString());

		const updatedRangeIdentifiers = [
			get().treeAgeRange.min.toString() +
				"-" +
				get().treeAgeRange.max.toString(),
		];

		const updatedAgeRangeSearchParams = replaceUrlSearchParam(
			new URL(window.location.href),
			treeAgeUrlKey,
			updatedRangeIdentifiers,
		);
		useUrlState.getState().setSearchParams(updatedAgeRangeSearchParams);

		const treeId = useTreeStore.getState().selectedTreeId;
		if (treeId) {
			useUrlState.getState().addSearchParam("treeId", treeId);
		}
	},
}));
