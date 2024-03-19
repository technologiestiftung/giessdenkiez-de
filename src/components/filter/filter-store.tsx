import { create } from "zustand";
import { replaceUrlSearchParam } from "../../utils/url-utils";
import { useUrlState } from "../router/store";

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
	toggleTreeAgeInterval: (interval: TreeAgeInterval) => void;
	setShowPumps: (showPumps: boolean) => void;
	setShowWaterNeedTrees: (showWaterNeedTrees: boolean) => void;
	setIsFilterViewVisible: (isFilterViewVisible: boolean) => void;
	resetFilters: () => void;
}

const treeAgeUrlKey = "treeAge";
const isPumpsVisibleUrlKey = "isPumpsVisible";
const isTreeWaterNeedVisibleUrlKey = "isTreeWaterNeedVisible";

const ageIntervalSearch = new URL(window.location.href).searchParams.getAll(
	treeAgeUrlKey,
);

const isPumpsVisibleSearch = new URL(window.location.href).searchParams.get(
	isPumpsVisibleUrlKey,
);

const isTreeWaterNeedVisibleSearch = new URL(
	window.location.href,
).searchParams.get(isTreeWaterNeedVisibleUrlKey);

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
		}
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

	setIsFilterViewVisible: (isFilterViewVisible) => {
		set({ isFilterViewVisible });
	},

	resetFilters: () => {
		useUrlState.getState().removeSearchParam(treeAgeUrlKey);
		useUrlState.getState().removeSearchParam(isPumpsVisibleUrlKey);
		useUrlState.getState().removeSearchParam(isTreeWaterNeedVisibleUrlKey);
		set({
			treeAgeIntervals: [
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
			],
			isPumpsVisible: false,
			isTreeWaterNeedVisible: false,
		});
	},
}));
