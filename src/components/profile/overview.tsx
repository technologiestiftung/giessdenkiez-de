import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";

const Overview: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const { formatNumber } = useI18nStore();

  const totalIrrigationAmount = 1246;
  const totalIrrigationTimes = 25;

  const adoptedTrees = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    (id) => ({
      id,
      name: "Ahornblättrige Platane",
      irrigationAmount: 87,
      irrigationTimes: 9,
    }),
  );

  return (
    <div className="mb-3 md:rounded-2xl md:border md:p-7 md:shadow-sm">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.overview.subtitle}
      </h2>

      <div className="mt-7 flex flex-col gap-3 rounded-2xl border pb-4 pl-3.5 pt-1.5 font-semibold">
        {i18n.navbar.profile.overview.liter}
        <span className="flex items-baseline gap-x-5 text-5xl font-medium">
          <img src="images/icon-drop.svg" alt="" className="w-5" />
          {formatNumber(totalIrrigationAmount)}
        </span>
      </div>

      <div className="mt-3 flex w-full gap-3">
        <div className="flex w-full flex-col gap-3 rounded-2xl border pb-4 pl-3.5 pt-1.5 font-semibold">
          {i18n.navbar.profile.overview.adoptedTrees}
          <span className="flex items-baseline gap-x-5 text-5xl font-medium">
            <img src="images/icon-tree.svg" alt="" className="w-[1.625rem]" />
            {formatNumber(adoptedTrees.length)}
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-2xl border pb-4 pl-3.5 pt-1.5 font-semibold">
          {i18n.navbar.profile.overview.irrigations}
          <span className="flex items-baseline gap-x-5 text-5xl font-medium">
            <img src="images/icon-watering-can.svg" alt="" className="" />
            {formatNumber(totalIrrigationTimes)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
