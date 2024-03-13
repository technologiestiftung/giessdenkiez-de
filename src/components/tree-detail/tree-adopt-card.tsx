import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { TreeAgeClassification, TreeData } from "./tree-types";
import { useAdoptTree } from "./hooks/use-adopt-tree";

interface TreeAdoptCardProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
}

const TreeAdoptCard: React.FC<TreeAdoptCardProps> = ({
  treeData,
  treeAgeClassification,
}) => {
  const [heartHovered, setHeartHovered] = useState(false);
  const i18n = useI18nStore().i18n();

  // TODO: replace with actual userId
  const userId = "cc8f3c60-3b2c-46f6-b1b7-2453478d77ee";
  const token = "TODO";

  const { adoptTree, unadoptTree, isAdopted } = useAdoptTree();
  console.log(isAdopted);

  return (
    <div className="shadow-gdk-hard flex flex-col gap-4 rounded-lg bg-slate-100 p-4">
      <div className="flex flex-row items-center justify-between text-xl">
        <div className="font-bold">{treeData.artdtsch}</div>

        <button
          onClick={async () => {
            if (!isAdopted) {
              await adoptTree(userId, treeData.id, token);
            } else {
              await unadoptTree(userId, treeData.id, token);
            }
          }}
          onMouseEnter={() => setHeartHovered(true)}
          onMouseLeave={() => setHeartHovered(false)}
        >
          {heartHovered ? (
            <img
              src="/images/heart-icon-hover.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          ) : isAdopted ? (
            <img
              src="/images/heart-icon-filled.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          ) : (
            <img
              src="/images/heart-icon.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
      {treeAgeClassification === TreeAgeClassification.BABY && (
        <div>{i18n.treeDetail.managedBy}</div>
      )}
      {treeAgeClassification !== TreeAgeClassification.BABY && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <div className="text-slate-500">{i18n.treeDetail.adoptIt}</div>
            <img
              src="/images/info-icon.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          </div>
          <div className="items-left flex flex-row gap-2">
            <img
              src="/images/hi-there-icon.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
            <div className="italic leading-tight text-slate-500">
              {i18n.treeDetail.alreadyAdoptedBy}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeAdoptCard;
