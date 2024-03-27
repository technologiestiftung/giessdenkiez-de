import { create } from "zustand";
import { TreeData, TreeWateringData } from "./tree-types";

interface TreeStore {
	selectedTreeId: string | undefined;
	setSelectedTreeId: (selectedTreeId: string | undefined) => void;

	hoveredTreeId: string | undefined;
	setHoveredTreeId: (hoveredTreeId: string | undefined) => void;

	treeData: TreeData | undefined;
	setTreeData: (treeData: TreeData | undefined) => void;

	treeWateringData: TreeWateringData[];
	setTreeWateringData: (treeWateringData: TreeWateringData[]) => void;
}

export const useTreeStore = create<TreeStore>()((set) => ({
	treeData: undefined,
	setTreeData: (treeData) => {
		set({ treeData });
	},
	treeWateringData: [],
	setTreeWateringData: (treeWateringData) => {
		set({ treeWateringData });
	},
	selectedTreeId: undefined,
	setSelectedTreeId: (selectedTreeId) => {
		set({ selectedTreeId });
	},
	hoveredTreeId: undefined,
	setHoveredTreeId: (hoveredTreeId) => {
		set({ hoveredTreeId });
	},
}));
