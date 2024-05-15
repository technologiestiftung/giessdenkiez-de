/* eslint-disable max-lines */
import { create } from "zustand";
import {
	AccumulatedTreeWateringData,
	TreeCoreData,
	TreeWateringData,
} from "../tree-types";
import { useTreeAdoptStore } from "./adopt-tree-store";
import { supabaseClient } from "../../../auth/supabase-client";

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
	refreshTreeCoreData: async (treeId) => {
		get().setTreeCoreData(undefined);

		if (!treeId) {
			return;
		}

		const { data, error } = await supabaseClient
			.from("trees")
			.select("*")
			.eq("id", treeId);

		if (error) {
			throw new Error("Failed to fetch tree core data");
		}

		const treeCoreData = data[0];
		get().setTreeCoreData(treeCoreData);
	},

	treeWateringData: [],
	setTreeWateringData: (treeWateringData) => {
		set({ treeWateringData });
	},
	refreshTreeWateringData: async (treeId) => {
		get().setTreeWateringData([]);

		if (!treeId) {
			return;
		}

		const { data, error } = await supabaseClient
			.from("trees_watered")
			.select("*")
			.eq("tree_id", treeId)
			.order("id", { ascending: false });

		if (error) {
			throw new Error("Failed to fetch tree watering data");
		}

		const treeWateringData: TreeWateringData[] = data;
		// Workaround to sort the data by id, because timestamps do not have a time value set
		// e.g. 2024-04-25 00:00:00+00
		const sortedTreeWateringData = treeWateringData.sort((a, b) => b.id - a.id);
		get().setTreeWateringData(sortedTreeWateringData);
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

		const { data: waterings, error: wateringsError } = await supabaseClient
			.from("trees_watered")
			.select("*")
			.gte("timestamp", todayAtMidnight.toISOString());

		if (wateringsError) {
			throw new Error("Failed to fetch today's waterings");
		}

		const groupedByTreeId = (waterings ?? []).reduce((acc, watering) => {
			const { tree_id, amount } = watering;
			acc[tree_id] = (acc[tree_id] || 0) + amount;
			return acc;
		}, {});

		set({ todaysWaterings: groupedByTreeId });
	},
}));
