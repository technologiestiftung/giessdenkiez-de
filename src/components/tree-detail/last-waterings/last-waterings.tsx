import { subDays } from "date-fns";
import React, { useEffect, useMemo } from "react";
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
	const { isLastWateringsExpanded, setIsLastWateringsExpanded } =
		useTreeStore();

	useEffect(() => {
		const hasTreeWateringData = treeWateringData.length > 0;

		setIsLastWateringsExpanded(hasTreeWateringData);
	}, [treeWateringData]);

	const wateringsLast30Days = useMemo(() => {
		const thirtyDaysAgo = subDays(new Date(), 30);
		return treeWateringData.filter(
			(watering) => new Date(watering.timestamp) >= thirtyDaysAgo,
		);
	}, [treeWateringData]);

	const previousWaterings = useMemo(() => {
		return treeWateringData.filter(
			(watering) => !wateringsLast30Days.includes(watering),
		);
	}, [treeWateringData]);

	return (
		<div className="flex flex-col gap-4 border-b-2 py-8">
			<button
				className="flex flex-row items-center justify-between  text-xl font-bold"
				onClick={() => setIsLastWateringsExpanded(!isLastWateringsExpanded)}
			>
				<div className="flex flex-row items-center gap-1">
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
						waterings={wateringsLast30Days}
						title={i18n.treeDetail.lastWaterings.last30Days}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingLast30Days}
					/>
					<WateringSection
						waterings={previousWaterings}
						title={i18n.treeDetail.lastWaterings.before}
						noWateringsHint={i18n.treeDetail.lastWaterings.nothingBefore}
					/>
				</div>
			)}
		</div>
	);
};
