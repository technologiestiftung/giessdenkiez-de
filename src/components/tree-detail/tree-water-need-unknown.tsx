import React, { useState } from "react";
import Markdown from "react-markdown";
import { useI18nStore } from "../../i18n/i18n-store";
import { useTreeWaterNeedsData } from "./hooks/use-tree-water-needs-data";
import {
  TreeAgeClassification,
  TreeData,
  TreeWateringData,
} from "./tree-types";
import Tooltip from "./tooltip";

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
        <div className="col-start-1 row-start-1 flex w-full flex-row items-center justify-between ">
          <div className="pr-8 text-xl font-bold">
            {i18n.treeDetail.waterNeed.unknownTitle}
          </div>
          <div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
            <div className="relative">
              <button
                onClick={() => {
                  setShowInfoBox(!showInfoBox);
                }}
                onMouseMove={() => setShowInfoBox(true)}
                onMouseOut={() => setShowInfoBox(false)}
              >
                <img
                  src="/images/info-icon.svg"
                  alt="Tree Icon"
                  width={24}
                  height={24}
                />
              </button>
              {showInfoBox && (
                <div className="text-default absolute right-0 top-8">
                  <Tooltip
                    title={i18n.treeDetail.waterNeed.ageAndWaterHintTitle}
                    content={i18n.treeDetail.waterNeed.ageAndWaterHint}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{i18n.treeDetail.waterNeed.unknown}</div>
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
