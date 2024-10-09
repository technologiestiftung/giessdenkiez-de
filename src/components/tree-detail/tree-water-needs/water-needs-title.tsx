import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import Markdown from "react-markdown";
import { TreeAgeClassification } from "../tree-types";
import { useIsInVegetationPeriod } from "../../../utils/use-is-in-vegetation-period";

const isInVegetationPeriod = useIsInVegetationPeriod;

interface WaterNeedsTitleProps {
	treeAgeClassification: TreeAgeClassification;
	referenceWaterAmount: number;
}

export const WaterNeedsTitle: React.FC<WaterNeedsTitleProps> = ({
	treeAgeClassification,
	referenceWaterAmount,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	return (
		<div>
			{!isInVegetationPeriod && (
				<div className="text-xl font-bold ">
					{i18n.treeDetail.waterNeed.winterSleep}
				</div>
			)}

			{isInVegetationPeriod &&
				(treeAgeClassification === TreeAgeClassification.BABY ||
					treeAgeClassification === TreeAgeClassification.SENIOR) && (
					<div className="text-xl font-bold">
						{i18n.treeDetail.waterNeed.waterManaged}
					</div>
				)}

			{isInVegetationPeriod &&
				treeAgeClassification === TreeAgeClassification.JUNIOR && (
					<Markdown className="text-xl font-bold ">
						{i18n.treeDetail.waterNeed.needXLiters(
							formatNumber(referenceWaterAmount, true),
						)}
					</Markdown>
				)}
		</div>
	);
};
