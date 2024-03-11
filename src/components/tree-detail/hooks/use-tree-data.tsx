import { useEffect, useMemo, useState } from "react";

export interface TreeData {
  artbot: string;
  artdtsch: string;
  baumhoehe: string;
  bezirk: string;
  caretaker: string | null;
  eigentuemer: string | null;
  gattung: string;
  gattungdeutsch: string;
  id: string;
  lat: string;
  lng: string;
  pflanzjahr: number;
  radolan_days: number[];
  radolan_sum: number;
  standalter: string | null;
}

export function useTreeData(treeId: string): any {
  const [treeData, setTreeData] = useState<TreeData>();

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
