import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store.ts";
import TertiaryButton from "../buttons/tertiary.tsx";
import TreeCard from "./tree-card.tsx";

const AdoptedTrees: React.FC = () => {
  const i18n = useI18nStore().i18n();
  const [showAllTrees, setshowAllTrees] = useState(false);

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
    <div className="mb-3 md:rounded-2xl md:border-2 md:p-7 md:shadow-sm">
      <h2 className="text-2xl font-semibold">
        {i18n.navbar.profile.overview.adoptedTrees}
      </h2>

      <div className="mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {!showAllTrees &&
          adoptedTrees
            .slice(0, 4)
            .map((tree) => (
              <TreeCard
                id={tree.id}
                name={tree.name}
                irrigationAmount={tree.irrigationAmount}
                irrigationTimes={tree.irrigationTimes}
                key={tree.id}
              />
            ))}
        {showAllTrees &&
          adoptedTrees.map((tree) => (
            <TreeCard
              id={tree.id}
              name={tree.name}
              irrigationAmount={tree.irrigationAmount}
              irrigationTimes={tree.irrigationTimes}
              key={tree.id}
            />
          ))}
      </div>
      <div className=" pointer-events-auto flex justify-center pt-8">
        <TertiaryButton
          onClick={() => setshowAllTrees(!showAllTrees)}
          label={
            showAllTrees
              ? i18n.navbar.profile.adoptedTrees.showLess
              : i18n.navbar.profile.adoptedTrees.showAll
          }
        />
      </div>
    </div>
  );
};

export default AdoptedTrees;
