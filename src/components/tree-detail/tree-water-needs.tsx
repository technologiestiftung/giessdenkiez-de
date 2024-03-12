import React, { useState } from "react";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";
import { useTreeWateringData } from "./hooks/use-tree-watering-data";
import PartialProgressCircle from "./partial-progress-circle";
import TreeWaterNeedHint from "./tree-water-needs-hint";
import { TreeAgeClassification, TreeData } from "./tree-types";

interface TreeWaterNeedProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
}

const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({
  treeData,
  treeAgeClassification,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);

  const {
    rainSum,
    wateringSum,
    referenceWaterAmount,
    stillMissingWater,
    waterParts,
    shouldBeWatered,
  } = useTreeWateringData(treeData, treeAgeClassification);

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
          <div className="">Wasserbedarf</div>
        </div>
        {isExpanded ? (
          <ChevronDown></ChevronDown>
        ) : (
          <ChevronRight></ChevronRight>
        )}
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 grid-rows-1">
            <div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
              <div className="pr-8">
                Je nach Baumalter unterscheidet sich der Bedarf an Wasser.
              </div>
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
              Braucht nur an trockenen Tagen Wasser
            </div>
          )}

          {treeAgeClassification === TreeAgeClassification.BABY && (
            <div className="text-xl font-bold">Vom Bezirksamt versorgt</div>
          )}

          {(treeAgeClassification === TreeAgeClassification.JUNIOR ||
            treeAgeClassification === TreeAgeClassification.GROWNUP) && (
            <div className="text-xl font-bold">
              Braucht {referenceWaterAmount} Liter pro Woche
            </div>
          )}

          <div className="flex flex-row items-center justify-start gap-4">
            <PartialProgressCircle
              parts={waterParts}
              needsWaterAmount={stillMissingWater}
              shouldBeWatered={shouldBeWatered}
              treeAgeClassification={treeAgeClassification}
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                <div className="h-5 w-5 rounded-full bg-[#1169EE]"></div>
                <div className="flex flex-col">
                  <div className="font-bold">{rainSum} Liter*</div>
                  <div>Regen</div>
                </div>
              </div>
              {treeAgeClassification === TreeAgeClassification.BABY && (
                <div className="flex flex-row items-center gap-4">
                  <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
                  <div className="flex flex-col">
                    <div className="font-bold">vom Bezirksamt</div>
                    <div>gegossen</div>
                  </div>
                </div>
              )}
              {treeAgeClassification !== TreeAgeClassification.BABY && (
                <div className="flex flex-row items-center gap-4">
                  <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
                  <div className="flex flex-col">
                    <div className="font-bold">{wateringSum} Liter*</div>
                    <div>gegossen</div>
                  </div>
                </div>
              )}
              {shouldBeWatered &&
                treeAgeClassification !== TreeAgeClassification.SENIOR && (
                  <div className="flex flex-row items-center gap-4">
                    <div className="h-5 w-5 rounded-full bg-[#ddd]"></div>
                    <div className="flex flex-col">
                      <div className="font-bold">{stillMissingWater} Liter</div>
                      <div>fehlen noch</div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div className="font-bold">* Daten der letzen 7 Tage</div>
        </div>
      )}
    </div>
  );
};

export default TreeWaterNeed;
