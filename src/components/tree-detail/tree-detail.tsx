import React from "react";
import CloseIcon from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useTreeData } from "./hooks/use-tree-data";
import TreeAge from "./tree-age";
import TreeCard from "./tree-card";

const TreeDetail: React.FC = () => {
  const url = useUrlState((state) => state.url);
  const setSearchParams = useUrlState((state) => state.setSearchParams);
  const treeId = url.searchParams.get("treeId");
  const { treeData, treeAge } = useTreeData(treeId!);

  return (
    <div className={`pointer-events-auto bg-white`}>
      <div className="flex min-h-[100vh] w-[100vw] flex-col gap-4 overflow-hidden p-4 lg:w-[30vw] xl:w-[20vw]">
        <a
          href="/map"
          className="flex flex-row justify-end"
          onClick={(e) => {
            e.preventDefault();
            setSearchParams(new URLSearchParams());
          }}
        >
          <CloseIcon />
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
          {treeData && <TreeCard treeData={treeData} />}
          {treeAge && <TreeAge age={treeAge} />}
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;
