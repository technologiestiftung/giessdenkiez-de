import { isSameMonth, isSameWeek, isSameYear } from "date-fns";
import React, { useMemo } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { ChevronDown } from "../../icons/chevron-down";
import { ChevronRight } from "../../icons/chevron-right";
import { TreeWateringData } from "../tree-types";
import { WateringSection } from "./watering-section";
import { CalenderIcon } from "../../icons/calender-icon";
import { useTreeStore } from "../stores/tree-store";

interface LastWateringsProps {
	treeWateringData: TreeWateringData[];
}

export const LastWaterings: React.FC<LastWateringsProps> = ({
	treeWateringData,
}) => {
	const i18n = useI18nStore().i18n();
	const now = new Date();
	const { isLastWateringsExpanded, setIsLastWateringsExpanded } =
		useTreeStore();

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

	const hasRecentWateringsThisMonth =
		wateringsThisWeek.length > 0 || wateringsThisMonth.length > 0;

	return (
		<div className="flex flex-col gap-4 border-b-2 py-8">
			<button
				className="flex flex-row items-center justify-between  text-xl font-bold"
				onClick={() => setIsLastWateringsExpanded(!isLastWateringsExpanded)}
			>
				<div className="flex flex-row items-center gap-2">
					<CalenderIcon />
					<div>{i18n.treeDetail.lastWaterings.title}</div>
				</div>
				<div className="text-gdk-blue">
					{isLastWateringsExpanded ? (
						<ChevronDown></ChevronDown>
					) : (
						<ChevronRight></ChevronRight>
					)}
				</div>
			</button>
			{isLastWateringsExpanded && (
				<div className="flex flex-col gap-8">
					<WateringSection
						waterings={wateringsThisWeek}
						title={i18n.treeDetail.lastWaterings.thisWeek}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingThisWeek}
					/>
					<WateringSection
						waterings={wateringsThisMonth}
						title={i18n.treeDetail.lastWaterings.thisMonth}
						noWateringsHint={
							wateringsThisWeek.length > 0
								? i18n.treeDetail.lastWaterings.nothingMoreThisMonth
								: i18n.treeDetail.lastWaterings.nothingThisMonth
						}
					/>
					<WateringSection
						waterings={wateringsThisYear}
						title={i18n.treeDetail.lastWaterings.thisYear}
						noWateringsHint={
							hasRecentWateringsThisMonth
								? i18n.treeDetail.lastWaterings.nothingMoreThisYear
								: i18n.treeDetail.lastWaterings.nothingThisYear
						}
					/>
				</div>
			)}
		</div>
	);
};
