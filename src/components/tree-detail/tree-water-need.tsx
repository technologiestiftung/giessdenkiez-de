import React, { useMemo, useState } from "react";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";
import PartialProgressCircle from "./partial-progress-circle";

interface TreeWaterNeedProps {
  tree: any;
  waterings: any[];
}

const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({ tree, waterings }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const referenceWaterAmount = useMemo(() => {
    const age = new Date().getFullYear() - parseInt(tree.standalter);
    if (age <= 14) {
      return 200;
    } else {
      return 100;
    }
  }, [tree]);

  const rainSum = useMemo(() => {
    if (tree && tree.radolan_days) {
      const rains = tree.radolan_days;
      rains.reverse();
      const lastXDays = rains.slice(0, 7 * 24);
      const sum = lastXDays.reduce((l: number, r: number) => l + r, 0) / 10;
      return sum;
    }
    return 0;
  }, [tree]);

  const wateringSum = useMemo(() => {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 30);
    const wateringsLastXDays = waterings.filter(
      (w) => new Date(w.timestamp).getTime() > daysAgo.getTime(),
    );
    if (waterings) {
      const sum = wateringsLastXDays
        .map((w) => w.amount)
        .reduce((l: number, r: number) => l + r, 0);
      return sum;
    }
    return 0;
  }, [waterings]);

  const rainPercentage = useMemo(() => {
    const ratio = rainSum / referenceWaterAmount;
    const wateringRatio = wateringSum / referenceWaterAmount;
    if (ratio >= 1) {
      return 1 - wateringRatio;
    } else {
      return ratio;
    }
  }, [rainSum, wateringSum]);

  const wateringPercentage = useMemo(() => {
    const ratio = wateringSum / referenceWaterAmount;
    if (ratio >= 1) {
      return 1;
    } else {
      return ratio;
    }
  }, [rainSum, wateringSum]);

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-4">
      <div className="flex flex-row items-center justify-between  text-xl font-bold">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/watering-can.svg"
            alt="Tree Watering Can Icon"
            width={36}
            height={36}
          />
          <div className="">Wasserbedarf</div>
        </div>
        <button className="" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <ChevronDown></ChevronDown>
          ) : (
            <ChevronRight></ChevronRight>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <div className="pr-8">
              Je nach Alter des Baumes, unterscheidet sich der Bedarf an Wasser.
            </div>
            <img
              src="/images/info-icon.svg"
              alt="Tree Icon"
              width={24}
              height={24}
            />
          </div>
          <div className="text-xl font-bold">
            Braucht {referenceWaterAmount} Liter pro Woche
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <PartialProgressCircle
              parts={[
                {
                  color: "#1169EE",
                  progress: rainPercentage,
                },
                {
                  color: "#3DF99A",
                  progress: wateringPercentage,
                },
              ]}
              needsWaterAmount={Math.round(
                referenceWaterAmount - rainSum - wateringSum,
              )}
            ></PartialProgressCircle>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeWaterNeed;
