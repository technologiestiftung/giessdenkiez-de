import React, { useMemo } from "react";
import CloseIcon from "../icons/close-icon";
import { useUrlState } from "../router/store";
import { useFetchTreeData } from "./hooks/use-fetch-tree-data";
import TreeAge from "./tree-age";
import TreeAdoptCard from "./tree-adopt-card";
import { useTreeStore } from "./tree-store";
import useSelectedTree from "../map/hooks/use-selected-tree";
import { useI18nStore } from "../../i18n/i18n-store";
import TreeWaterNeed from "./tree-water-needs";
import TreeWaterNeedUnknown from "./tree-water-need-unknown";
import { TreeAgeClassification } from "./tree-types";
import { useTreeAgeClassification } from "./hooks/use-tree-age-classification";
import LastWaterings from "./last-waterings";
import ProblemCard from "./problem-card";
import TreeFlier from "./tree-flier";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";

const TreeDetail: React.FC = () => {
  const i18n = useI18nStore().i18n();

  const [url, setPathname] = useUrlState((state) => [
    state.url,
    state.setPathname,
  ]);
  const treeId = url.searchParams.get("treeId")!;

  const { setTreeData } = useTreeStore();
  const { setSelectedTreeId } = useSelectedTree();
  const { treeData } = useFetchTreeData(treeId);
  const { treeWateringData } = useFetchTreeWateringData(treeData);

  const { treeAge, treeAgeClassification } = useTreeAgeClassification(treeData);
  const treeTypeInfo = useMemo(() => {
    return i18n.treeDetail.treeTypeInfos.find(
      (treeType) => treeType.id === treeData?.gattungdeutsch,
    );
  }, [treeData]);

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
            <TreeAdoptCard
              treeData={treeData}
              treeAgeClassification={treeAgeClassification}
            />
            {treeTypeInfo && (
              <TreeFlier info={treeTypeInfo.description}></TreeFlier>
            )}
            <TreeAge treeAge={treeAge} />
            {treeAgeClassification !== TreeAgeClassification.UNKNOWN && (
              <TreeWaterNeed
                treeData={treeData}
                treeAgeClassification={treeAgeClassification}
                treeWateringData={treeWateringData}
              />
            )}
            {treeAgeClassification === TreeAgeClassification.UNKNOWN && (
              <TreeWaterNeedUnknown
                treeData={treeData}
                treeAgeClassification={treeAgeClassification}
                treeWateringData={treeWateringData}
              />
            )}
            {treeData && <LastWaterings treeWateringData={treeWateringData} />}
            <ProblemCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetail;
