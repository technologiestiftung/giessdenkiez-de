import React from "react";
import { TreeData } from "./hooks/use-tree-data";
import { useTreeWateringData } from "./hooks/use-tree-watering-data";

interface TreeWaterNeedUnknownProps {
  treeData: TreeData;
  title: string;
  description: string;
}

const TreeWaterNeedUnknown: React.FC<TreeWaterNeedUnknownProps> = ({
  treeData,
  title,
  description,
}) => {
  const { rainSum, wateringSum } = useTreeWateringData(treeData);

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-4">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/images/watering-can.svg"
          alt="Tree Watering Can Icon"
          width={36}
          height={36}
        />
        <div className="text-xl font-bold">{title}</div>
      </div>
      <div>{description}</div>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-5 rounded-full bg-[#1169EE]"></div>
            <div className="">
              Die letzten Tage sind{" "}
              <span className="font-bold">{rainSum} Liter Regen</span> gefallen.
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="h-5 w-5 rounded-full bg-[#3DF99A]"></div>
            <div className="">
              Die letzten Tage wurden{" "}
              <span className="font-bold">{wateringSum} Liter gegossen</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeWaterNeedUnknown;
