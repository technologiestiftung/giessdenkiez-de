import React from "react";
import ClearIcon from "../icons/clear-icon";
import { useUrlState } from "../router/store";
import { useTreeData } from "./hooks/use-tree-data";
import TreeCard from "./tree-card";
import TreeAge from "./tree-age";
import TreeWaterNeed from "./tree-water-need";
import { useWateringData } from "./hooks/use-watering-data";

const TreeDetail: React.FC = () => {
  const url = useUrlState((state) => state.url);
  const setSearchParams = useUrlState((state) => state.setSearchParams);
  const treeId = url.searchParams.get("treeId");
  const treeData = useTreeData(treeId!).data;
  const wateringData = useWateringData(treeId!).data;
  console.log(treeData);
  return (
    <div className={`pointer-events-auto bg-white`}>
      <div className="flex w-[100vw] flex-col gap-4 overflow-hidden p-4 md:w-[40vw] lg:w-[30vw] xl:w-[15vw]">
        <a
          href="/map"
          className="flex flex-row justify-end"
          onClick={(e) => {
            e.preventDefault();
            setSearchParams(new URLSearchParams());
          }}
        >
          <ClearIcon></ClearIcon>
        </a>

        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/tree-icon.svg"
            alt="Tree Icon"
            width={36}
            height={36}
          />
          <div className="text-xl font-bold">Bauminformationen</div>
        </div>
        <div className="flex flex-col gap-10">
          <TreeCard data={treeData} />
          <TreeAge
            age={
              parseInt(treeData.pflanzjahr) === 0
                ? undefined
                : new Date().getFullYear() - parseInt(treeData.pflanzjahr)
            }
          />
          <TreeWaterNeed
            tree={treeData}
            waterings={wateringData}
          ></TreeWaterNeed>
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;
