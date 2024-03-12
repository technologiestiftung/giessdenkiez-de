import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

interface TreeAgeProps {
  treeAge: number | undefined;
}

const TreeAge: React.FC<TreeAgeProps> = ({ treeAge }) => {
  const i18n = useI18nStore().i18n();
  return (
    <div className="flex flex-row items-center justify-between border-b-2 pb-4 text-xl font-bold">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/images/tree-age-icon.svg"
          alt="Tree Age Icon"
          width={36}
          height={36}
        />
        <div className="">{i18n.treeDetail.ageTitle}</div>
      </div>
      {treeAge ? (
        <div>{i18n.treeDetail.age(treeAge)}</div>
      ) : (
        <div>{i18n.treeDetail.ageUnknown}</div>
      )}
    </div>
  );
};

export default TreeAge;
