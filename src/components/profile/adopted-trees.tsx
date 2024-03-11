import React from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";
import TertiaryButton from "../buttons/tertiary.tsx";

const AdoptedTrees: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const { formatNumber } = useI18nStore();

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
        {i18n.navbar.profile.overview.adoptedTrees}
      </h2>

      <div className="mt-7 grid grid-cols-2 gap-2 xl:grid-cols-4">
        {adoptedTrees.slice(0, 4).map((tree) => (
          <div
            key={tree.id}
            className="flex flex-col gap-3 rounded-2xl border px-4 pb-4 pt-1.5"
          >
            <a
              className="py-2 font-semibold text-blue-600"
              href={`/map?treeId=${tree.id}`}
            >
              {tree.name}
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
                  {formatNumber(tree.irrigationTimes)}{" "}
                  {i18n.navbar.profile.adoptedTrees.irrigationTimes}
                </span>
                <span>
                  {formatNumber(tree.irrigationAmount)}{" "}
                  {i18n.navbar.profile.adoptedTrees.irrigationAmount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" pointer-events-auto flex justify-center pt-8">
        <TertiaryButton
          onClick={() => console.log("You clicked alle anzeigen")}
          label={i18n.navbar.profile.adoptedTrees.showAll}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default AdoptedTrees;
