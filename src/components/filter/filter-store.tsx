/* eslint-disable max-lines */
import { create } from "zustand";
import { replaceUrlSearchParam } from "../../utils/url-utils";
import { useUrlState } from "../router/store";
import { useMapConstants } from "../map/hooks/use-map-constants";
import { usePumpStore } from "../map/hooks/use-pump-store";
import { useTreeStore } from "../tree-detail/stores/tree-store";

/* eslint-disable-next-line no-shadow */
export enum TreeAgeIntervalIdentifier {
	Young = "young",
	Medium = "medium",
	Old = "old",
}

export interface TreeAgeInterval {
	min: number;
	max: number;
	identifier: TreeAgeIntervalIdentifier;
	enabled: boolean;
}

export interface FilterState {
	treeAgeIntervals: TreeAgeInterval[];
	isPumpsVisible: boolean;
	isTreeWaterNeedVisible: boolean;
	isFilterViewVisible: boolean;
	isSomeFilterActive: () => boolean;
	lat: number;
	lng: number;
	zoom: number;
	toggleTreeAgeInterval: (interval: TreeAgeInterval) => void;
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

const initialTreeAgeIntervals = [
	{
		min: 0,
		max: 3,
		identifier: TreeAgeIntervalIdentifier.Young,
		enabled: true,
	},
	{
		min: 4,
		max: 40,
		identifier: TreeAgeIntervalIdentifier.Medium,
		enabled: true,
	},
	{
		min: 41,
		max: Infinity,
		identifier: TreeAgeIntervalIdentifier.Old,
		enabled: true,
	},
];

const treeAgeUrlKey = "treeAge";
const isPumpsVisibleUrlKey = "isPumpsVisible";
const isTreeWaterNeedVisibleUrlKey = "isTreeWaterNeedVisible";
const zoomUrlKey = "zoom";
const latUrlKey = "lat";
const lngUrlKey = "lng";

const ageIntervalSearch = new URL(window.location.href).searchParams.getAll(
	treeAgeUrlKey,
);

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
	treeAgeIntervals: [
		{
			min: 0,
			max: 3,
			identifier: TreeAgeIntervalIdentifier.Young,
			enabled:
				ageIntervalSearch.includes(TreeAgeIntervalIdentifier.Young) ||
				ageIntervalSearch.includes("all") ||
				ageIntervalSearch.length === 0,
		},
		{
			min: 4,
			max: 40,
			identifier: TreeAgeIntervalIdentifier.Medium,
			enabled:
				ageIntervalSearch.includes(TreeAgeIntervalIdentifier.Medium) ||
				ageIntervalSearch.includes("all") ||
				ageIntervalSearch.length === 0,
		},
		{
			min: 41,
			max: Infinity,
			identifier: TreeAgeIntervalIdentifier.Old,
			enabled:
				ageIntervalSearch.includes(TreeAgeIntervalIdentifier.Old) ||
				ageIntervalSearch.includes("all") ||
				ageIntervalSearch.length === 0,
		},
	],

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
			get().isPumpsVisible ||
			get().isTreeWaterNeedVisible ||
			get().treeAgeIntervals.some((int) => !int.enabled)
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

		if (showWaterNeedTrees) {
			set({
				treeAgeIntervals: get().treeAgeIntervals.map((int) => {
					return {
						...int,
						enabled: int.identifier === TreeAgeIntervalIdentifier.Medium,
					};
				}),
			});
		} else {
			set({ treeAgeIntervals: initialTreeAgeIntervals });
		}

		const updatedIntervalIdentifiers = get()
			.treeAgeIntervals.filter((int) => int.enabled)
			.map((int) => {
				return int.identifier.toString();
			});
		const updatedTreeIntervalSearchParams = replaceUrlSearchParam(
			new URL(window.location.href),
			treeAgeUrlKey,
			updatedIntervalIdentifiers,
		);
		useUrlState.getState().setSearchParams(updatedTreeIntervalSearchParams);
	},

	toggleTreeAgeInterval: (interval) => {
		const updatedIntervals = get().treeAgeIntervals.map((int) => {
			if (int.identifier === interval.identifier) {
				return { ...int, enabled: !int.enabled };
			}
			return int;
		});
		set({ treeAgeIntervals: updatedIntervals });

		const updatedIntervalIdentifiers = updatedIntervals
			.filter((int) => int.enabled)
			.map((int) => {
				return int.identifier.toString();
			});
		const updatedSearchParams = replaceUrlSearchParam(
			new URL(window.location.href),
			treeAgeUrlKey,
			updatedIntervalIdentifiers,
		);
		useUrlState.getState().setSearchParams(updatedSearchParams);

		if (
			!interval.enabled &&
			(interval.identifier === TreeAgeIntervalIdentifier.Young ||
				interval.identifier === TreeAgeIntervalIdentifier.Old)
		) {
			set({ isTreeWaterNeedVisible: false });
			const updatedTreeWaterNeedSearchParams = replaceUrlSearchParam(
				new URL(window.location.href),
				isTreeWaterNeedVisibleUrlKey,
				["false"],
			);
			useUrlState.getState().setSearchParams(updatedTreeWaterNeedSearchParams);
		}
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
			treeAgeIntervals: initialTreeAgeIntervals,
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

		const updatedTreeIntervalSearchParams = replaceUrlSearchParam(
			new URL(window.location.href),
			treeAgeUrlKey,
			get().treeAgeIntervals.map((int) => {
				return int.identifier.toString();
			}),
		);
		useUrlState.getState().setSearchParams(updatedTreeIntervalSearchParams);

		const treeId = useTreeStore.getState().selectedTreeId;
		if (treeId) {
			useUrlState.getState().addSearchParam("treeId", treeId);
		}
	},
}));
