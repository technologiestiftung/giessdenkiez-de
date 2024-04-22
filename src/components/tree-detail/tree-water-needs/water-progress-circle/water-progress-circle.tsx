import React, { useMemo } from "react";
import { TreeAgeClassification, WaterCircleProps } from "../../tree-types";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { PartialProgressCircle } from "./partial-progress-circle";

export const WaterProgressCircle: React.FC<WaterCircleProps> = ({
	parts,
	needsWaterAmount,
	shouldBeWatered,
	treeAgeClassification,
	size,
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
		if (
			shouldBeWatered &&
			treeAgeClassification === TreeAgeClassification.JUNIOR
		) {
			return i18n.treeDetail.waterNeed.stillWaterXLiters(
				formatNumber(needsWaterAmount),
			);
		}

		return i18n.treeDetail.waterNeed.sufficientlyWatered;
	}, [treeAgeClassification, needsWaterAmount, shouldBeWatered, i18n]);

	return (
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
	);
};
