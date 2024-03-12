import React from "react";
import CloseIcon from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useTreeData } from "./hooks/use-tree-data";
import TreeAge from "./tree-age";
import TreeAdoptCard from "./tree-adopt-card";
import { useTreeStore } from "./tree-store";
import useSelectedTree from "../map/hooks/use-selected-tree";
import { useI18nStore } from "../../i18n/i18n-store";
import TreeWaterNeed from "./tree-water-needs";
import TreeWaterNeedUnknown from "./tree-water-need-unknown";
import { TreeAgeClassification } from "./tree-types";

const TreeDetail: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const url = useUrlState((state) => state.url);
  const setPathname = useUrlState((state) => state.setPathname);

  const treeId = url.searchParams.get("treeId")!;
  const { treeData, treeAge, treeAgeClassification } = useTreeData(treeId);

  const { setTreeData } = useTreeStore();
  const { setSelectedTreeId } = useSelectedTree();

  return (
    <div className={`pointer-events-auto bg-white`}>
      <div className="flex max-h-[100vh] min-h-[100vh] w-[100vw] flex-col gap-4 overflow-hidden overflow-scroll p-4 lg:w-[400px]">
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
          <div className="text-xl font-bold">{i18n.treeDetail.title}</div>
        </div>
        {treeData && (
          <div className="flex flex-col">
            <TreeAdoptCard treeData={treeData} />
            <TreeAge treeAge={treeAge} />
            {treeAgeClassification !== TreeAgeClassification.UNKNOWN && (
              <TreeWaterNeed
                treeData={treeData}
                treeAgeClassification={treeAgeClassification}
              />
            )}
            {treeAgeClassification === TreeAgeClassification.UNKNOWN && (
              <TreeWaterNeedUnknown
                treeData={treeData}
                treeAgeClassification={treeAgeClassification}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetail;
