import { useEffect, useMemo } from "react";
import { useTreeStore } from "../tree-store";

export enum TreeAgeClassification {
  BABY = "BABY",
  JUNIOR = "JUNIOR",
  GROWNUP = "GROWNUP",
  SENIOR = "SENIOR",
  UNKNOWN = "UNKNOWN",
}

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

interface TreeDataState {
  treeData: TreeData | undefined;
  treeAge: number | undefined;
  treeAgeClassification: TreeAgeClassification;
}

export function useTreeData(treeId: string | undefined): TreeDataState {
  const BABY_AGE_LIMIT = 4;
  const JUNIOR_TREES_AGE_LIMIT = 14;
  const SENIOR_TREES_AGE_LIMIT = 40;

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

  const treeAgeClassification = useMemo(() => {
    if (
      !treeData ||
      !treeData.standalter ||
      treeData.standalter === "undefined"
    ) {
      return TreeAgeClassification.UNKNOWN;
    }
    const age = parseInt(treeData.standalter);
    if (age <= BABY_AGE_LIMIT) {
      return TreeAgeClassification.BABY;
    }
    if (age <= JUNIOR_TREES_AGE_LIMIT) {
      return TreeAgeClassification.JUNIOR;
    }
    if (age <= SENIOR_TREES_AGE_LIMIT) {
      return TreeAgeClassification.GROWNUP;
    }
    return TreeAgeClassification.SENIOR;
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

  return { treeData, treeAge, treeAgeClassification };
}
