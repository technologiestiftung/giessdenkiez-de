import { isSameMonth, isSameWeek, isSameYear } from "date-fns";
import React, { useMemo, useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronRight } from "../icons/chevron-right";
import { TreeWateringData } from "./tree-types";
import { WateringSection } from "./watering-section";

interface LastWateringsProps {
	treeWateringData: TreeWateringData[];
}

export const LastWaterings: React.FC<LastWateringsProps> = ({
	treeWateringData,
}) => {
	const i18n = useI18nStore().i18n();
	const [isExpanded, setIsExpanded] = useState(false);
	const now = new Date();

	const wateringsThisWeek = useMemo(() => {
		return treeWateringData.filter((watering) => {
			return isSameWeek(new Date(watering.timestamp), now, { weekStartsOn: 1 });
		});
	}, [treeWateringData]);

	const wateringsThisMonth = useMemo(() => {
		return treeWateringData.filter((watering) => {
			return (
				isSameMonth(new Date(watering.timestamp), now) &&
				!isSameWeek(new Date(watering.timestamp), now, { weekStartsOn: 1 })
			);
		});
	}, [treeWateringData]);

	const wateringsThisYear = useMemo(() => {
		return treeWateringData.filter((watering) => {
			return (
				isSameYear(new Date(watering.timestamp), now) &&
				!isSameMonth(new Date(watering.timestamp), now) &&
				!isSameWeek(new Date(watering.timestamp), now, { weekStartsOn: 1 })
			);
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
					<div>{i18n.treeDetail.lastWaterings.title}</div>
				</div>
				<div className="text-gdk-blue">
					{isExpanded ? (
						<ChevronDown></ChevronDown>
					) : (
						<ChevronRight></ChevronRight>
					)}
				</div>
			</button>
			{isExpanded && (
				<div className="flex flex-col gap-8">
					<WateringSection
						waterings={wateringsThisWeek}
						title={i18n.treeDetail.lastWaterings.thisWeek}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingThisWeek}
					/>
					<WateringSection
						waterings={wateringsThisMonth}
						title={i18n.treeDetail.lastWaterings.thisMonth}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingThisMonth}
					/>
					<WateringSection
						waterings={wateringsThisYear}
						title={i18n.treeDetail.lastWaterings.thisYear}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingThisYear}
					/>
				</div>
			)}
		</div>
	);
};
