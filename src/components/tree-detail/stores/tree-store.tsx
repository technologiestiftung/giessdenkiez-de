import { create } from "zustand";
import { TreeCoreData, TreeWateringData } from "../tree-types";
import { useTreeAdoptStore } from "./adopt-tree-store";

interface TreeStore {
	refreshTreeData: (
		treeId: string,
		abortController: AbortController,
	) => Promise<void>;

	treeCoreData: TreeCoreData | undefined;
	setTreeCoreData: (treeData: TreeCoreData | undefined) => void;
	refreshTreeCoreData: (
		treeId: string,
		abortController: AbortController,
	) => Promise<void>;

	treeWateringData: TreeWateringData[];
	setTreeWateringData: (treeWateringData: TreeWateringData[]) => void;
	refreshTreeWateringData: (
		treeId: string,
		abortController: AbortController,
	) => Promise<void>;

	selectedTreeId: string | undefined;
	setSelectedTreeId: (selectedTreeId: string | undefined) => void;

	hoveredTreeId: string | undefined;
	setHoveredTreeId: (hoveredTreeId: string | undefined) => void;
	isLastWateringsExpanded: boolean;
	setIsLastWateringsExpanded: (isExpanded: boolean) => void;
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
		const geocodingUrl = `${
			import.meta.env.VITE_API_ENDPOINT
		}/get/byid?id=${treeId}`;

		const res = await fetch(geocodingUrl, {
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
}));
