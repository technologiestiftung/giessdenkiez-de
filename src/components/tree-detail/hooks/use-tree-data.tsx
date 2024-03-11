import { useEffect, useMemo, useState } from "react";

export function useTreeData(treeId: string): any {
  const [treeData, setTreeData] = useState<any>([]);

  const treeAge = useMemo(() => {
    return parseInt(treeData.pflanzjahr) === 0
      ? undefined
      : new Date().getFullYear() - parseInt(treeData.pflanzjahr);
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
        setTreeData([]);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [treeId]);

  return { treeData, treeAge };
}
