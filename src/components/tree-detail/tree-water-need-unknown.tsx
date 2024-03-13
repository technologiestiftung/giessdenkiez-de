import React, { useState } from "react";
import Markdown from "react-markdown";
import { useI18nStore } from "../../i18n/i18n-store";
import { useTreeWaterNeedsData } from "./hooks/use-tree-water-needs-data";
import {
  TreeAgeClassification,
  TreeData,
  TreeWateringData,
} from "./tree-types";
import TreeWaterNeedHint from "./tree-water-needs-hint";

interface TreeWaterNeedUnknownProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
  treeWateringData: TreeWateringData[];
}

const TreeWaterNeedUnknown: React.FC<TreeWaterNeedUnknownProps> = ({
  treeData,
  treeAgeClassification,
  treeWateringData,
}) => {
  const i18n = useI18nStore().i18n();

  const [showInfoBox, setShowInfoBox] = useState(false);

  const { rainSum, wateringSum } = useTreeWaterNeedsData(
    treeData,
    treeWateringData,
    treeAgeClassification,
  );
  return (
    <div className="flex flex-col gap-4 border-b-2 py-8">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/images/watering-can.svg"
          alt="Tree Watering Can Icon"
          width={36}
          height={36}
        />
        <div className="col-start-1 row-start-1 flex w-full flex-row items-center justify-between text-xl font-bold">
          <div className="pr-8">{i18n.treeDetail.waterNeed.unknownTitle}</div>
          <button
            className="h-6 w-6"
            onClick={() => setShowInfoBox(!showInfoBox)}
          >
            <img src="/images/info-icon.svg" alt="Tree Icon" />
          </button>
        </div>
      </div>
      <div>{i18n.treeDetail.waterNeed.unknown}</div>
      {showInfoBox && <TreeWaterNeedHint></TreeWaterNeedHint>}
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-5 rounded-full bg-[#1169EE]"></div>
            <Markdown className="">
              {i18n.treeDetail.waterNeed.lastXDaysYLitersRain(7, rainSum)}
            </Markdown>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
            <Markdown className="">
              {i18n.treeDetail.waterNeed.lastXDaysYLitersWater(7, wateringSum)}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeWaterNeedUnknown;
