/* eslint-disable max-lines */
import { create } from "zustand";
import {
	AccumulatedTreeWateringData,
	TreeCoreData,
	TreeWateringData,
} from "../tree-types";
import { useTreeAdoptStore } from "./adopt-tree-store";

interface TreeStore {
	refreshTreeData: (
		treeId: string | undefined,
		abortController: AbortController,
	) => Promise<void>;

	treeCoreData: TreeCoreData | undefined;
	setTreeCoreData: (treeData: TreeCoreData | undefined) => void;
	refreshTreeCoreData: (
		treeId: string | undefined,
		abortController: AbortController,
	) => Promise<void>;

	treeWateringData: TreeWateringData[];
	setTreeWateringData: (treeWateringData: TreeWateringData[]) => void;
	refreshTreeWateringData: (
		treeId: string | undefined,
		abortController: AbortController,
	) => Promise<void>;

	selectedTreeId: string | undefined;
	setSelectedTreeId: (selectedTreeId: string | undefined) => void;

	hoveredTreeId: string | undefined;
	setHoveredTreeId: (hoveredTreeId: string | undefined) => void;
	isWateringLoading: boolean;
	setIsWateringLoading: (isWateringLoading: boolean) => void;
	isLastWateringsExpanded: boolean;
	setIsLastWateringsExpanded: (isExpanded: boolean) => void;

	todaysWaterings: AccumulatedTreeWateringData;
	loadTodaysWaterings: () => Promise<void>;
}
export const useTreeStore = create<TreeStore>()((set, get) => ({
	refreshTreeData: async (treeId, abortController) => {
		const promises = [
			get().refreshTreeCoreData(treeId, abortController),
			get().refreshTreeWateringData(treeId, abortController),
			useTreeAdoptStore
				.getState()
				.refreshIsTreeAdoptedByOthers(treeId, abortController),
		];

		await Promise.all(promises);
	},

	treeCoreData: undefined,
	setTreeCoreData: (treeCoreData) => {
		set({ treeCoreData });
	},
	refreshTreeCoreData: async (treeId, abortController) => {
		get().setTreeCoreData(undefined);

		if (!treeId) {
			return;
		}

		const getTreeByIdUrl = `${
			import.meta.env.VITE_API_ENDPOINT
		}/get/byid?id=${treeId}`;

		const res = await fetch(getTreeByIdUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
				"Content-Type": "application/json",
			},
			signal: abortController.signal,
		});

		if (!res.ok) {
			throw new Error("Failed to fetch tree core data");
		}

		const treeCoreData = (await res.json()).data[0];
		get().setTreeCoreData(treeCoreData);
	},

	treeWateringData: [],
	setTreeWateringData: (treeWateringData) => {
		set({ treeWateringData });
	},
	refreshTreeWateringData: async (treeId, abortController) => {
		get().setTreeWateringData([]);

		if (!treeId) {
			return;
		}

		const lastWateredUrl = `${
			import.meta.env.VITE_API_ENDPOINT
		}/get/lastwatered?id=${treeId}`;

		const res = await fetch(lastWateredUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
				"Content-Type": "application/json",
			},
			signal: abortController.signal,
		});

		if (!res.ok) {
			throw new Error("Failed to fetch tree watering data");
		}

		const treeWateringData = (await res.json()).data;
		get().setTreeWateringData(treeWateringData);
	},

	selectedTreeId: undefined,
	setSelectedTreeId: (selectedTreeId) => {
		set({ selectedTreeId });
	},

	hoveredTreeId: undefined,
	setHoveredTreeId: (hoveredTreeId) => {
		set({ hoveredTreeId });
	},
	isLastWateringsExpanded: false,
	setIsLastWateringsExpanded: (isLastWateringsExpanded) => {
		set({ isLastWateringsExpanded });
	},
	isWateringLoading: false,
	setIsWateringLoading: (isWateringLoading) => {
		set({ isWateringLoading });
	},
	todaysWaterings: {},
	loadTodaysWaterings: async () => {
		const todayAtMidnight = new Date();
		todayAtMidnight.setHours(0, 0, 0, 0);

		const wateredTodayUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/wateredtoday`;
		const response = await fetch(wateredTodayUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const wateringsTodayGroupedByTree = await response.json();

		set({ todaysWaterings: wateringsTodayGroupedByTree });
	},
}));
