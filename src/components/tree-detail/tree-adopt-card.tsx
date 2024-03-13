import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { TreeAgeClassification, TreeData } from "./tree-types";

interface TreeAdoptCardProps {
  treeData: TreeData;
  treeAgeClassification: TreeAgeClassification;
}

const TreeAdoptCard: React.FC<TreeAdoptCardProps> = ({
  treeData,
  treeAgeClassification,
}) => {
  const i18n = useI18nStore().i18n();
  return (
    <div className="shadow-gdk-hard flex flex-col gap-4 rounded-lg bg-slate-100 p-4">
      <div className="flex flex-row items-center justify-between text-xl">
        <div className="font-bold">{treeData.artdtsch}</div>
        <img
          src="/images/heart-icon.svg"
          alt="Tree Icon"
          width={24}
          height={24}
        />
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