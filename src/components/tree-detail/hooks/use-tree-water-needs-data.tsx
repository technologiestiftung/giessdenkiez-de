import {
  TreeAgeClassification,
  TreeData,
  TreeWateringData,
  TreeWateringDataState,
} from "../tree-types.js";

import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useTreeWaterNeedsData(
  treeData: TreeData,
  treeWateringData: TreeWateringData[],
  treeAgeClassification: TreeAgeClassification,
): TreeWateringDataState {
  const YOUNG_TREES_WATERING_AMOUNT = 200;
  const OLD_TREES_WATERING_AMOUNT = 100;
  const NUMBER_OF_DAYS_TO_LOOK_AT = 7;

  const WATERING_COLOR = fullConfig.theme.colors["gdk-neon-green"];
  const RAIN_COLOR = fullConfig.theme.colors["gdk-blue"];

  const referenceWaterAmount = () => {
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
  };

  const rainSum = () => {
    if (treeData && treeData.radolan_days) {
      const rains = [...treeData.radolan_days];
      rains.reverse();
      const lastXDays = rains.slice(0, NUMBER_OF_DAYS_TO_LOOK_AT * 24);
      const sum = lastXDays.reduce((l: number, r: number) => l + r, 0) / 10;
      return sum;
    }
    return 0;
  };

  const wateringSum = () => {
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
  };

  const rainPercentage = () => {
    const wateringRatio = wateringSum() / referenceWaterAmount();
    const ratio = rainSum() / referenceWaterAmount();
    if (ratio >= 1) {
      return 1 - wateringRatio;
    } else {
      return ratio;
    }
  };

  const wateringPercentage = () => {
    if (treeAgeClassification === TreeAgeClassification.BABY) {
      return 1 - rainPercentage();
    }
    const ratio = wateringSum() / referenceWaterAmount();
    if (ratio >= 1) {
      return 1;
    } else {
      return ratio;
    }
  };

  const stillMissingWater = () => {
    return Math.round(
      Math.max(0, referenceWaterAmount() - rainSum() - wateringSum()),
    );
  };

  const shouldBeWatered = () => {
    if (treeAgeClassification === TreeAgeClassification.BABY) {
      return false;
    } else {
      return wateringSum() + rainSum() < referenceWaterAmount();
    }
  };

  const waterParts = () => {
    return [
      {
        color: RAIN_COLOR,
        progress: rainPercentage(),
      },
      {
        color: WATERING_COLOR,
        progress: wateringPercentage(),
      },
    ];
  };

  return {
    rainSum: rainSum(),
    wateringSum: wateringSum(),
    rainPercentage: rainPercentage(),
    wateringPercentage: wateringPercentage(),
    referenceWaterAmount: referenceWaterAmount(),
    stillMissingWater: stillMissingWater(),
    waterParts: waterParts(),
    shouldBeWatered: shouldBeWatered(),
  };
}
