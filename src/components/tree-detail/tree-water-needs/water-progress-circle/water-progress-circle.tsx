import React, { useMemo } from "react";
import { TreeAgeClassification, WaterCircleProps } from "../../tree-types";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { PartialProgressCircle } from "./partial-progress-circle";
import { WaterProgressCircleLegend } from "./water-progress-circle-legend";

export const WaterProgressCircle: React.FC<WaterCircleProps> = ({
	parts,
	needsWaterAmount,
	shouldBeWatered,
	treeAgeClassification,
	size,
	rainSum,
	wateringSum,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	const circleTitle = useMemo(() => {
		if (treeAgeClassification === TreeAgeClassification.BABY) {
			return i18n.treeDetail.waterNeed.alreadyWateredByManager;
		}
		if (treeAgeClassification === TreeAgeClassification.SENIOR) {
			return i18n.treeDetail.waterNeed.alreadyWateredByGroundwater;
		}
		if (treeAgeClassification === TreeAgeClassification.JUNIOR) {
			if (shouldBeWatered) {
				return i18n.treeDetail.waterNeed.stillWaterXLiters(
					formatNumber(needsWaterAmount),
				);
			}
			return i18n.treeDetail.waterNeed.sufficientlyWatered;
		}
		return i18n.treeDetail.waterNeed.unknownTitle;
	}, [treeAgeClassification, needsWaterAmount, shouldBeWatered, i18n]);

	return (
		<div className="flex flex-row items-center justify-start gap-4">
			<div
				className={`grid w-[${size}px] grid-cols-1 grid-rows-1`}
				data-testid="water-progress-circle"
			>
				<PartialProgressCircle
					parts={parts}
					title={circleTitle}
					size={size * 0.9}
				/>
			</div>
			<WaterProgressCircleLegend
				needsWaterAmount={needsWaterAmount}
				shouldBeWatered={shouldBeWatered}
				treeAgeClassification={treeAgeClassification}
				rainSum={rainSum}
				wateringSum={wateringSum}
			/>
		</div>
	);
};
