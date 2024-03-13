import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { useAdoptTree } from "./hooks/use-adopt-tree";
import { TreeAgeClassification, TreeData } from "./tree-types";
import AdoptTreeTooltip from "./tooltip";

interface TreeAdoptCardProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
}

const TreeAdoptCard: React.FC<TreeAdoptCardProps> = ({
  treeData,
  treeAgeClassification,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [heartHovered, setHeartHovered] = useState(false);
  const i18n = useI18nStore().i18n();

  const { adoptTree, unadoptTree, isAdopted, isLoading, adoptedByOthers } =
    useAdoptTree(treeData.id);

  return (
    <div className="shadow-gdk-hard flex flex-col gap-4 rounded-lg bg-slate-100 p-4">
      <div className="flex flex-row items-center justify-between text-xl">
        <div className="font-bold">{treeData.artdtsch}</div>

        <button
          onClick={async () => {
            if (!isAdopted) {
              await adoptTree();
            } else {
              await unadoptTree();
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
            <div className="text-slate-500">
              {isLoading
                ? isAdopted
                  ? i18n.treeDetail.unadoptLoading
                  : i18n.treeDetail.adoptLoading
                : isAdopted
                  ? i18n.treeDetail.isAdopted
                  : i18n.treeDetail.adoptIt}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setShowTooltip(!showTooltip);
                }}
                onMouseMove={() => setShowTooltip(true)}
                onMouseOut={() => setShowTooltip(false)}
              >
                <img
                  src="/images/info-icon.svg"
                  alt="Tree Icon"
                  width={24}
                  height={24}
                />
              </button>
              {showTooltip && (
                <div className="absolute right-0 top-8">
                  <AdoptTreeTooltip
                    title={i18n.treeDetail.adoptHintTitle}
                    content={i18n.treeDetail.adoptHint}
                  />
                </div>
              )}
            </div>
          </div>
          {adoptedByOthers && !isAdopted && (
            <div className="items-left flex flex-row gap-2">
              <img
                src="/images/hi-there-icon.svg"
                alt="Tree Icon"
                width={24}
                height={24}
              />
              <div className="italic leading-tight text-slate-500">
                {i18n.treeDetail.exclusivelyAdoptedBy}
              </div>
            </div>
          )}
          {adoptedByOthers && isAdopted && (
            <div className="items-left flex flex-row gap-2">
              <img
                src="/images/hi-there-icon.svg"
                alt="Tree Icon"
                width={24}
                height={24}
              />
              <div className="italic leading-tight text-slate-500">
                {i18n.treeDetail.alsoAdoptedBy}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeAdoptCard;
