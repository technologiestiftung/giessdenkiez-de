import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";

export interface TreeCardProps {
  id: number;
  name: string;
  irrigationAmount: number;
  irrigationTimes: number;
}

const TreeCard: React.FC<TreeCardProps> = ({
  id,
  name,
  irrigationAmount,
  irrigationTimes,
}) => {
  const i18n = useI18nStore().i18n();
  const { formatNumber } = useI18nStore();

  return (
    <div
      key={id}
      className="flex flex-col gap-3 rounded-2xl border px-4 pb-4 pt-1.5 shadow-sm"
    >
      <a
        className="py-2 font-semibold text-blue-600"
        href={`/map?treeId=${id}`}
      >
        {name}
      </a>
      <button className="-mt-4 self-end">
        <img src="/images/icon-filled-heart.svg" alt="" />
      </button>
      <hr />
      <div className="flex gap-2 font-medium">
        <div className="flex flex-col gap-3">
          <img src="images/icon-watering-can.svg" alt="" className="" />
          <img src="images/icon-drop.svg" alt="" className="ml-1 w-5" />
        </div>

        <div className="mt-1 flex flex-col gap-3">
          <span>
            {formatNumber(irrigationTimes)}{" "}
            {i18n.navbar.profile.adoptedTrees.irrigationTimes}
          </span>
          <span>
            {formatNumber(irrigationAmount)}{" "}
            {i18n.navbar.profile.adoptedTrees.irrigationAmount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TreeCard;
