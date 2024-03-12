import React from "react";
import { PartialCircleProps, TreeAgeClassification } from "./tree-types";
import { useI18nStore } from "../../i18n/i18n-store";

const PartialProgressCircle: React.FC<PartialCircleProps> = ({
  parts,
  needsWaterAmount,
  shouldBeWatered,
  treeAgeClassification,
}) => {
  const i18n = useI18nStore().i18n();

  const size = 200;
  const dasharray = 2 * Math.PI * 80;
  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="col-start-1 row-start-1 flex items-center justify-center">
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size * 0.4}
            fill="none"
            stroke="#ddd"
            strokeWidth="15"
            strokeDasharray={dasharray.toString()}
            transform="rotate(-90 100 100)"
          ></circle>
        </svg>
      </div>

      {parts.map((part, idx) => {
        const previousParts = parts.slice(0, idx);
        const previousPartsProgressSum = previousParts
          .map((p) => p.progress)
          .reduce((l, r) => l + r, 0);
        const rotate = Math.round(previousPartsProgressSum * 360);

        return (
          <div
            className="col-start-1 row-start-1 flex items-center justify-center"
            key={`part-${idx}`}
          >
            <svg width={size} height={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={size * 0.4}
                fill="none"
                stroke={part.color}
                strokeWidth="15"
                strokeDasharray={dasharray.toString()}
                strokeDashoffset={((1 - part.progress) * dasharray).toString()}
                transform={`rotate(${-90 + rotate} 100 100)`}
              ></circle>
            </svg>
          </div>
        );
      })}
      {treeAgeClassification === TreeAgeClassification.BABY && (
        <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="m-12">
              {i18n.treeDetail.waterNeed.alreadyWateredByManager}
            </div>
          </div>
        </div>
      )}
      {shouldBeWatered &&
        (treeAgeClassification === TreeAgeClassification.JUNIOR ||
          treeAgeClassification === TreeAgeClassification.GROWNUP) && (
          <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="m-12">
                {i18n.treeDetail.waterNeed.stillWaterXLiters(needsWaterAmount)}
              </div>
            </div>
          </div>
        )}
      {shouldBeWatered &&
        treeAgeClassification === TreeAgeClassification.SENIOR && (
          <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="m-12">
                {i18n.treeDetail.waterNeed.shouldBeWatered}
              </div>
            </div>
          </div>
        )}
      {!shouldBeWatered &&
        treeAgeClassification !== TreeAgeClassification.BABY && (
          <div className="col-start-1 row-start-1 flex items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="m-12">
                {i18n.treeDetail.waterNeed.sufficientlyWatered}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default PartialProgressCircle;
