import React from "react";
import Markdown from "react-markdown";
import { useI18nStore } from "../../i18n/i18n-store";

interface TreeWaterNeedHintProps {}

const TreeWaterNeedHint: React.FC<TreeWaterNeedHintProps> = ({}) => {
  const i18n = useI18nStore().i18n();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">
        {i18n.treeDetail.waterNeed.ageAndWaterHintTitle}
      </h1>
      <Markdown>{i18n.treeDetail.waterNeed.ageAndWaterHint}</Markdown>
    </div>
  );
};

export default TreeWaterNeedHint;
