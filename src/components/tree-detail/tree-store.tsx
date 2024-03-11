import { create } from "zustand";
import { TreeData } from "./hooks/use-tree-data";
import { TreeWateringData } from "./hooks/use-tree-watering-data";

interface TreeStore {
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
}));
