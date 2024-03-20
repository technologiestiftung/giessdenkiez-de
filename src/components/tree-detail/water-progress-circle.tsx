import React, { useMemo } from "react";
import { TreeAgeClassification, WaterCircleProps } from "./tree-types";
import { useI18nStore } from "../../i18n/i18n-store";
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
		if (
			shouldBeWatered &&
			(treeAgeClassification === TreeAgeClassification.JUNIOR ||
				treeAgeClassification === TreeAgeClassification.GROWNUP)
		) {
			return i18n.treeDetail.waterNeed.stillWaterXLiters(
				formatNumber(needsWaterAmount),
			);
		}

		if (
			shouldBeWatered &&
			treeAgeClassification === TreeAgeClassification.SENIOR
		) {
			return i18n.treeDetail.waterNeed.shouldBeWatered;
		}

		return i18n.treeDetail.waterNeed.sufficientlyWatered;
	}, [treeAgeClassification, needsWaterAmount, shouldBeWatered]);

	return (
		<div className={`grid w-[${size}px] grid-cols-1 grid-rows-1`}>
			<PartialProgressCircle
				parts={parts}
				title={circleTitle}
				size={size * 0.9}
			/>
		</div>
	);
};
