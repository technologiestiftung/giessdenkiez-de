import { create } from "zustand";
import { replaceSearchParam } from "../../utils/url-utils";

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
	showPumps: boolean;
	showWaterNeedTrees: boolean;
	toggleTreeAgeInterval: (interval: TreeAgeInterval) => void;
	setShowPumps: (showPumps: boolean) => void;
	setShowWaterNeedTrees: (showWaterNeedTrees: boolean) => void;
}

const treeAgeKey = "treeAge";

const ageIntervalSearch = new URL(window.location.href).searchParams.getAll(
	treeAgeKey,
);

const showPumpsKey = "pumps";
const showPumpsSearch = new URL(window.location.href).searchParams.get(
	showPumpsKey,
);

const showWaterNeedTreesKey = "showWaterNeedTrees";
const showWaterNeedTreesSearch = new URL(window.location.href).searchParams.get(
	showWaterNeedTreesKey,
);

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
	showPumps: showPumpsSearch === "true" ?? false,
	showWaterNeedTrees: showWaterNeedTreesSearch === "true" ?? false,
	setShowPumps: (showPumps) => {
		set({ showPumps });
		const url = new URL(window.location.href);
		const updatedUrl = replaceSearchParam(url, showPumpsKey, [
			showPumps ? "true" : "false",
		]);
		window.history.pushState({}, "", updatedUrl);
	},
	setShowWaterNeedTrees: (showWaterNeedTrees) => {
		set({ showWaterNeedTrees });
		const url = new URL(window.location.href);
		const updatedUrl = replaceSearchParam(url, showWaterNeedTreesKey, [
			showWaterNeedTrees ? "true" : "false",
		]);
		window.history.pushState({}, "", updatedUrl);
	},
	toggleTreeAgeInterval: (interval) => {
		const foundInterval = get().treeAgeIntervals.filter(
			(int) => int.identifier === interval.identifier,
		);
		if (foundInterval.length === 0) {
			set({ treeAgeIntervals: [...get().treeAgeIntervals, interval] });
		} else {
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
			const url = new URL(window.location.href);
			const updatedUrl = replaceSearchParam(
				url,
				treeAgeKey,
				updatedIntervalIdentifiers,
			);

			window.history.pushState({}, "", updatedUrl);
		}
	},
}));
