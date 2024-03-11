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

const TreeDetail: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const url = useUrlState((state) => state.url);
  const setPathname = useUrlState((state) => state.setPathname);

  const treeId = url.searchParams.get("treeId")!;
  const { treeData, treeAge } = useTreeData(treeId);

  const { setTreeData } = useTreeStore();
  const { setSelectedTreeId } = useSelectedTree();

  return (
    <div className={`pointer-events-auto bg-white`}>
      <div className="flex min-h-[100vh] w-[100vw] flex-col gap-4 overflow-hidden p-4 lg:w-[30vw] xl:w-[25vw]">
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
          <div className="flex flex-col gap-10">
            <TreeAdoptCard treeData={treeData} />
            <TreeAge age={treeAge} />
            {treeAge && treeAge <= 40 && <TreeWaterNeed treeData={treeData} />}
            {!treeAge && (
              <TreeWaterNeedUnknown
                title={"Wasserbedarf unbekannt"}
                description={
                  "Das Alter, und dementsprechend der Wasserbedarf, sind leider unbekannt. Eventuell hilft Dir die Infobox für eine eigenständige Einschätzung."
                }
                treeData={treeData}
              />
            )}
            {treeAge && treeAge > 40 && (
              <TreeWaterNeedUnknown
                title={"Braucht nur in trockenen Phasen Wasser"}
                description={
                  "Ältere Bäume können sich in der Regel über das Grundwasser selbst versorgen, aber bei zunehmender Hitze freuen auch sie sich über zusätzliches Wasser."
                }
                treeData={treeData}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetail;
