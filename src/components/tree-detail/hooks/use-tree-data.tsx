import { useEffect, useMemo } from "react";
import { useTreeStore } from "../tree-store";
import { TreeAgeClassification, TreeDataState } from "../tree-types";

export function useTreeData(treeId: string | undefined): TreeDataState {
  const [treeData, setTreeData] = useTreeStore((store) => [
    store.treeData,
    store.setTreeData,
  ]);

  const treeAge = useMemo(() => {
    if (!treeData) return undefined;
    return treeData.pflanzjahr === 0
      ? undefined
      : new Date().getFullYear() - treeData.pflanzjahr;
  }, [treeData]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const geocodingUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/byid?id=${treeId}`;
        const res = await fetch(geocodingUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });
        if (!res.ok) return [];
        const json = await res.json();
        setTreeData(json.data[0]);
      } catch (_) {
        setTreeData(undefined);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [treeId]);

  return { treeData, treeAge };
}
