import React, { useState } from "react";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";
import { useTreeWaterNeedsData } from "./hooks/use-tree-water-needs-data";
import TreeWaterNeedHint from "./tree-water-needs-hint";
import { TreeAgeClassification, TreeData } from "./tree-types";
import { useI18nStore } from "../../i18n/i18n-store";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";
import WaterProgressCircle from "./water-progress-circle";

interface TreeWaterNeedProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
}

const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({
  treeData,
  treeAgeClassification,
}) => {
  const i18n = useI18nStore().i18n();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showInfoBox, setShowInfoBox] = useState(false);

  const { treeWateringData } = useFetchTreeWateringData(treeData);

  const {
    rainSum,
    wateringSum,
    referenceWaterAmount,
    stillMissingWater,
    waterParts,
    shouldBeWatered,
  } = useTreeWaterNeedsData(treeData, treeWateringData, treeAgeClassification);

  return (
    <div className="flex flex-col gap-4 border-b-2 py-8">
      <button
        className="flex flex-row items-center justify-between  text-xl font-bold"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/watering-can.svg"
            alt="Tree Watering Can Icon"
            width={36}
            height={36}
          />
          <div className="">{i18n.treeDetail.waterNeed.title}</div>
        </div>
        <div className="text-gdk-blue">
          {isExpanded ? (
            <ChevronDown></ChevronDown>
          ) : (
            <ChevronRight></ChevronRight>
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 grid-rows-1">
            <div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
              <div className="pr-8">{i18n.treeDetail.waterNeed.hint}</div>
              <button
                className="h-8 w-8"
                onClick={() => setShowInfoBox(!showInfoBox)}
              >
                <img src="/images/info-icon.svg" alt="Tree Icon" />
              </button>
            </div>
          </div>
          {showInfoBox && <TreeWaterNeedHint></TreeWaterNeedHint>}

          {treeAgeClassification === TreeAgeClassification.SENIOR && (
            <div className="text-xl font-bold">
              {i18n.treeDetail.waterNeed.needsOnlyOnDryDays}
            </div>
          )}

          {treeAgeClassification === TreeAgeClassification.BABY && (
            <div className="text-xl font-bold">
              {i18n.treeDetail.waterNeed.waterManaged}
            </div>
          )}

          {(treeAgeClassification === TreeAgeClassification.JUNIOR ||
            treeAgeClassification === TreeAgeClassification.GROWNUP) && (
            <div className="text-xl font-bold">
              {i18n.treeDetail.waterNeed.needXLiters(referenceWaterAmount)}
            </div>
          )}

          <div className="flex flex-row items-center justify-start gap-4">
            <WaterProgressCircle
              parts={waterParts}
              needsWaterAmount={stillMissingWater}
              shouldBeWatered={shouldBeWatered}
              treeAgeClassification={treeAgeClassification}
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                <div className="h-5 w-5 rounded-full bg-[#1169EE]"></div>
                <div className="flex flex-col">
                  <div className="font-bold">
                    {rainSum} {i18n.treeDetail.waterNeed.liters}*
                  </div>
                  <div>{i18n.treeDetail.waterNeed.rained}</div>
                </div>
              </div>
              {treeAgeClassification === TreeAgeClassification.BABY && (
                <div className="flex flex-row items-center gap-4">
                  <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
                  <div className="flex flex-col">
                    <div className="font-bold">
                      {i18n.treeDetail.waterNeed.manager}
                    </div>
                    <div>{i18n.treeDetail.waterNeed.watered}</div>
                  </div>
                </div>
              )}
              {treeAgeClassification !== TreeAgeClassification.BABY && (
                <div className="flex flex-row items-center gap-4">
                  <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
                  <div className="flex flex-col">
                    <div className="font-bold">
                      {wateringSum} {i18n.treeDetail.waterNeed.liters}*
                    </div>
                    <div>{i18n.treeDetail.waterNeed.watered}</div>
                  </div>
                </div>
              )}
              {shouldBeWatered &&
                treeAgeClassification !== TreeAgeClassification.SENIOR && (
                  <div className="flex flex-row items-center gap-4">
                    <div className="h-5 w-5 rounded-full bg-[#ddd]"></div>
                    <div className="flex flex-col">
                      <div className="font-bold">
                        {stillMissingWater} {i18n.treeDetail.waterNeed.liters}
                      </div>
                      <div>{i18n.treeDetail.waterNeed.stillMissing}</div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div className="font-bold">
            {i18n.treeDetail.waterNeed.dataOfLastXDays}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeWaterNeed;
