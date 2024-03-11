import { create } from "zustand";
import { TreeData } from "./hooks/use-tree-data";

interface TreeStore {
  treeData: TreeData | undefined;
  setTreeData: (treeData: TreeData | undefined) => void;
}

export const useTreeStore = create<TreeStore>()((set) => ({
  treeData: undefined,
  setTreeData: (treeData) => {
    set({ treeData });
  },
}));
