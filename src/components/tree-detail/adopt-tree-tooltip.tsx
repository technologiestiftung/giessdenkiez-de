import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

const AdoptTreeTooltip: React.FC = () => {
  const i18n = useI18nStore().i18n();

  return (
    <div
      className="shadow-gdk-hard flex w-[300px] flex-col gap-2 rounded-lg bg-gdk-white p-4"
      id="adopt-tree-dialog"
    >
      <div className="font-bold">{i18n.treeDetail.adoptHintTitle}</div>
      <p>{i18n.treeDetail.adoptHint}</p>
    </div>
  );
};

export default AdoptTreeTooltip;
