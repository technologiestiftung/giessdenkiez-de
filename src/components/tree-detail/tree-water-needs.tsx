import React, { useState } from "react";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";
import { TreeData } from "./hooks/use-tree-data";
import { useTreeWateringData } from "./hooks/use-tree-watering-data";
import PartialProgressCircle from "./partial-progress-circle";

interface TreeWaterNeedProps {
  treeData: TreeData;
}

const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({ treeData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    rainSum,
    wateringSum,
    rainPercentage,
    wateringPercentage,
    referenceWaterAmount,
    stillMissingWater,
  } = useTreeWateringData(treeData);

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-4">
      <div className="flex flex-row items-center justify-between  text-xl font-bold">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/watering-can.svg"
            alt="Tree Watering Can Icon"
            width={36}
            height={36}
          />
          <div className="">Wasserbedarf</div>
        </div>
        <button className="" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <ChevronDown></ChevronDown>
          ) : (
            <ChevronRight></ChevronRight>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="pr-8">
              Je nach Alter des Baumes, unterscheidet sich der Bedarf an Wasser.
            </div>
            <img
              src="/images/info-icon.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          </div>
          <div className="text-xl font-bold">
            Braucht {referenceWaterAmount} Liter pro Woche
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <PartialProgressCircle
              parts={[
                {
                  color: "#1169EE",
                  progress: rainPercentage,
                },
                {
                  color: "#3DF99A",
                  progress: wateringPercentage,
                },
              ]}
              needsWaterAmount={Math.round(
                referenceWaterAmount - rainSum - wateringSum,
              )}
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                <div className="h-5 w-5 rounded-full bg-[#1169EE]"></div>
                <div className="flex flex-col">
                  <div className="font-bold">{rainSum} Liter*</div>
                  <div>Regen</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
                <div className="flex flex-col">
                  <div className="font-bold">{wateringSum} Liter*</div>
                  <div>gegossen</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="h-5 w-5 rounded-full bg-[#ddd]"></div>
                <div className="flex flex-col">
                  <div className="font-bold">{stillMissingWater} Liter*</div>
                  <div>fehlen noch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeWaterNeed;
