import React from "react";
import CloseIcon from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useTreeData } from "./hooks/use-tree-data";
import TreeAge from "./tree-age";
import TreeCard from "./tree-card";
import { useTreeStore } from "./tree-store";
import useSelectedTree from "../map/hooks/use-selected-tree";

const TreeDetail: React.FC = () => {
  const url = useUrlState((state) => state.url);
  const setPathname = useUrlState((state) => state.setPathname);
  const treeId = url.searchParams.get("treeId");
  const { treeData, treeAge } = useTreeData(treeId!);
  const { setTreeData } = useTreeStore();
  const { setSelectedTreeId } = useSelectedTree();

  return (
    <div className={`pointer-events-auto bg-white`}>
      <div className="flex min-h-[100vh] w-[100vw] flex-col gap-4 overflow-hidden p-4 lg:w-[30vw] xl:w-[20vw]">
        <a
          href="/map"
          className="flex flex-row justify-end"
          onClick={(e) => {
            e.preventDefault();
            setPathname("/map");
            setTreeData(undefined);
            setSelectedTreeId(undefined);
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
