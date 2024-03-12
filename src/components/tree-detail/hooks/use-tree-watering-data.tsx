import { useEffect, useMemo } from "react";
import { TreeAgeClassification, TreeData } from "./use-tree-data";
import { useTreeStore } from "../tree-store";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
import { ProgressPart } from "../partial-progress-circle";
const fullConfig = resolveConfig(tailwindConfig);

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
  waterParts: ProgressPart[];
  treeAgeClassification: TreeAgeClassification;
  shouldBeWatered: boolean;
}

export function useTreeWateringData(
  treeData: TreeData,
  treeAgeClassification: TreeAgeClassification,
): TreeWateringDataState {
  const YOUNG_TREES_WATERING_AMOUNT = 200;
  const OLD_TREES_WATERING_AMOUNT = 100;
  const NUMBER_OF_DAYS_TO_LOOK_AT = 7;

  const WATERING_COLOR = fullConfig.theme.colors["gdk-neon-green"];
  const RAIN_COLOR = fullConfig.theme.colors["gdk-blue"];

  const [treeWateringData, setTreeWateringData] = useTreeStore((store) => [
    store.treeWateringData,
    store.setTreeWateringData,
  ]);

  const referenceWaterAmount = useMemo(() => {
    switch (treeAgeClassification) {
      case TreeAgeClassification.BABY:
        return YOUNG_TREES_WATERING_AMOUNT;
      case TreeAgeClassification.JUNIOR:
        return YOUNG_TREES_WATERING_AMOUNT;
      case TreeAgeClassification.GROWNUP:
        return OLD_TREES_WATERING_AMOUNT;
      case TreeAgeClassification.SENIOR:
        return OLD_TREES_WATERING_AMOUNT;
      default:
        return 0;
    }
  }, [treeData]);

  const rainSum = useMemo(() => {
    if (treeData && treeData.radolan_days) {
      const rains = [...treeData.radolan_days];
      rains.reverse();
      const lastXDays = rains.slice(0, NUMBER_OF_DAYS_TO_LOOK_AT * 24);
      const sum = lastXDays.reduce((l: number, r: number) => l + r, 0) / 10;
      return sum;
    }
    return 0;
  }, [treeData]);

  const wateringSum = useMemo(() => {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - NUMBER_OF_DAYS_TO_LOOK_AT);
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
    if (treeAgeClassification === TreeAgeClassification.BABY) {
      return 1 - rainPercentage;
    }
    const ratio = wateringSum / referenceWaterAmount;
    if (ratio >= 1) {
      return 1;
    } else {
      return ratio;
    }
  }, [rainSum, wateringSum]);

  const stillMissingWater = useMemo(() => {
    return Math.round(
      Math.max(0, referenceWaterAmount - rainSum - wateringSum),
    );
  }, [rainSum, wateringSum, referenceWaterAmount]);

  const shouldBeWatered = useMemo(() => {
    if (treeAgeClassification === TreeAgeClassification.BABY) {
      return false;
    } else {
      return wateringSum + rainSum < referenceWaterAmount;
    }
  }, [wateringSum, rainSum, referenceWaterAmount]);

  const waterParts = useMemo(() => {
    return [
      {
        color: RAIN_COLOR,
        progress: rainPercentage,
      },
      {
        color: WATERING_COLOR,
        progress: wateringPercentage,
      },
    ];
  }, [rainPercentage, wateringPercentage]);

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
    waterParts,
    treeAgeClassification,
    shouldBeWatered,
  };
}
