import { useEffect } from "react";
import { useTreeStore } from "../tree-store.js";
import { TreeData, TreeFetchWateringDataState } from "../tree-types";

export function useFetchTreeWateringData(
  treeData?: TreeData,
): TreeFetchWateringDataState {
  const [treeWateringData, setTreeWateringData] = useTreeStore((store) => [
    store.treeWateringData,
    store.setTreeWateringData,
  ]);

  useEffect(() => {
    if (!treeData) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const geocodingUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/lastwatered?id=${treeData.id}`;
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
        setTreeWateringData(json.data);
      } catch (_) {
        setTreeWateringData([]);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [treeData]);

  return {
    treeWateringData,
  };
}
