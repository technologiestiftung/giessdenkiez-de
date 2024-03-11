import { useEffect, useMemo } from "react";
import { useTreeStore } from "../tree-store";
import { TreeData } from "./use-tree-data";

export interface TreeWateringData {
  amount: number;
  id: number;
  timestamp: string;
  tree_id: string;
  username: string;
}

interface TreeWateringDataState {
  treeWateringData: TreeWateringData[];
  rainSum: number;
  wateringSum: number;
  rainPercentage: number;
  wateringPercentage: number;
  referenceWaterAmount: number;
  stillMissingWater: number;
}

export function useTreeWateringData(treeData: TreeData): TreeWateringDataState {
  const [treeWateringData, setTreeWateringData] = useTreeStore((store) => [
    store.treeWateringData,
    store.setTreeWateringData,
  ]);

  const referenceWaterAmount = useMemo(() => {
    const age = new Date().getFullYear() - parseInt(treeData.standalter!);
    if (age <= 14) {
      return 200;
    } else {
      return 100;
    }
  }, [treeData]);

  const rainSum = useMemo(() => {
    if (treeData && treeData.radolan_days) {
      const rains = treeData.radolan_days;
      rains.reverse();
      const lastXDays = rains.slice(0, 7 * 24);
      const sum = lastXDays.reduce((l: number, r: number) => l + r, 0) / 10;
      return sum;
    }
    return 0;
  }, [treeData]);

  const wateringSum = useMemo(() => {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 30);
    const wateringsLastXDays = treeWateringData.filter(
      (w) => new Date(w.timestamp).getTime() > daysAgo.getTime(),
    );
    if (treeWateringData) {
      const sum = wateringsLastXDays
        .map((w) => w.amount)
        .reduce((l: number, r: number) => l + r, 0);
      return sum;
    }
    return 0;
  }, [treeWateringData]);

  const rainPercentage = useMemo(() => {
    const ratio = rainSum / referenceWaterAmount;
    const wateringRatio = wateringSum / referenceWaterAmount;
    if (ratio >= 1) {
      return 1 - wateringRatio;
    } else {
      return ratio;
    }
  }, [rainSum, wateringSum]);

  const wateringPercentage = useMemo(() => {
    const ratio = wateringSum / referenceWaterAmount;
    if (ratio >= 1) {
      return 1;
    } else {
      return ratio;
    }
  }, [rainSum, wateringSum]);

  const stillMissingWater = useMemo(() => {
    return referenceWaterAmount - rainSum - wateringSum;
  }, [rainSum, wateringSum, referenceWaterAmount]);

  useEffect(() => {
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
    rainSum,
    wateringSum,
    rainPercentage,
    wateringPercentage,
    referenceWaterAmount,
    stillMissingWater,
  };
}
