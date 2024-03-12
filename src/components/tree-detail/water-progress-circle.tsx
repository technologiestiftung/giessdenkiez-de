import React, { useMemo } from "react";
import { TreeAgeClassification, WaterCircleProps } from "./tree-types";
import { useI18nStore } from "../../i18n/i18n-store";
import PartialProgressCircle from "./partial-progress-circle";

const WaterProgressCircle: React.FC<WaterCircleProps> = ({
  parts,
  needsWaterAmount,
  shouldBeWatered,
  treeAgeClassification,
}) => {
  const i18n = useI18nStore().i18n();

  const circleTitle = useMemo(() => {
    if (treeAgeClassification === TreeAgeClassification.BABY) {
      return i18n.treeDetail.waterNeed.alreadyWateredByManager;
    }
    if (
      shouldBeWatered &&
      (treeAgeClassification === TreeAgeClassification.JUNIOR ||
        treeAgeClassification === TreeAgeClassification.GROWNUP)
    ) {
      return i18n.treeDetail.waterNeed.stillWaterXLiters(needsWaterAmount);
    }

    if (
      shouldBeWatered &&
      treeAgeClassification === TreeAgeClassification.SENIOR
    ) {
      return i18n.treeDetail.waterNeed.shouldBeWatered;
    }

    return i18n.treeDetail.waterNeed.sufficientlyWatered;
  }, [treeAgeClassification]);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <PartialProgressCircle parts={parts} title={circleTitle} />
    </div>
  );
};

export default WaterProgressCircle;
