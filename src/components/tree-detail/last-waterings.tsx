import React, { useMemo, useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import {
  isDateInCurrentMonth,
  isDateInCurrentWeek,
  isDateInCurrentYear,
} from "../../utils/date-utils";
import ChevronDown from "../icons/chevron-down";
import ChevronRight from "../icons/chevron-right";
import { useFetchTreeWateringData } from "./hooks/use-fetch-tree-watering-data";
import { TreeData } from "./tree-types";
import WateringSection from "./watering-section";

interface LastWateringsProps {
  treeData: TreeData;
}

const LastWaterings: React.FC<LastWateringsProps> = ({ treeData }) => {
  const i18n = useI18nStore().i18n();
  const [isExpanded, setIsExpanded] = useState(true);

  const { treeWateringData } = useFetchTreeWateringData(treeData);

  const wateringsThisWeek = useMemo(() => {
    return treeWateringData.filter((watering) => {
      return isDateInCurrentWeek(new Date(watering.timestamp));
    });
  }, [treeWateringData]);

  const wateringsThisMonth = useMemo(() => {
    return treeWateringData.filter((watering) => {
      return isDateInCurrentMonth(new Date(watering.timestamp));
    });
  }, [treeWateringData]);

  const wateringsThisYear = useMemo(() => {
    return treeWateringData.filter((watering) => {
      return isDateInCurrentYear(new Date(watering.timestamp));
    });
  }, [treeWateringData]);

  return (
    <div className="flex flex-col gap-4 border-b-2 py-8">
      <button
        className="flex flex-row items-center justify-between  text-xl font-bold"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            src="/images/calendar-icon.svg"
            alt="Calendar Icon"
            width={30}
            height={30}
          />
          <div className="">Letzte Gießungen</div>
        </div>
        {isExpanded ? (
          <ChevronDown></ChevronDown>
        ) : (
          <ChevronRight></ChevronRight>
        )}
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-2">
          <WateringSection
            waterings={wateringsThisWeek}
            title="Diese Woche"
            noWateringsHint="Keine Gießungen diese Woche"
          />
          <WateringSection
            waterings={wateringsThisMonth}
            title="Dieser Monat"
            noWateringsHint="Keine Gießungen diesen Monat"
          />
          <WateringSection
            waterings={wateringsThisYear}
            title="Dieses Jahr"
            noWateringsHint="Keine Gießungen dieses Jahr"
          />
        </div>
      )}
    </div>
  );
};

export default LastWaterings;
