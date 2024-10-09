import React, { useState } from "react";
import { specialDistrictsBabyAgeLimit } from "../hooks/use-special-districts";
import { TertiaryButton } from "../../buttons/tertiary";
import Markdown from "react-markdown";
import { useI18nStore } from "../../../i18n/i18n-store";
import { TreeCoreData } from "../tree-types";
import { useIsInVegetationPeriod } from "../../../utils/use-is-in-vegetation-period";

const isInVegetationPeriod = useIsInVegetationPeriod;

interface WaterNeedsHintProps {
	treeData: TreeCoreData;
}

export const WaterNeedsHint: React.FC<WaterNeedsHintProps> = ({ treeData }) => {
	const i18n = useI18nStore().i18n();

	const [isInfoboxVisible, setIsInfoboxVisible] = useState(false);

	const ageAndWaterHint = () => {
		const isSpecialDistrict: { [key: string]: number } =
			specialDistrictsBabyAgeLimit;

		if (isSpecialDistrict[treeData.bezirk] === undefined) {
			return i18n.treeDetail.waterNeed.ageAndWaterHint;
		}

		return i18n.treeDetail.waterNeed.ageAndWaterHintSpecialDistrict(
			isSpecialDistrict[treeData.bezirk],
			treeData.bezirk,
		);
	};

	return (
		<div>
			<div className="grid grid-cols-1 grid-rows-1">
				<div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
					<div className="pr-8">
						{isInVegetationPeriod
							? i18n.treeDetail.waterNeed.hint
							: i18n.treeDetail.waterNeed.hintWinter}{" "}
						{!isInfoboxVisible && (
							<button
								className="text-gdk-blue hover:text-gdk-light-blue font-semibold"
								onClick={() => setIsInfoboxVisible(true)}
							>
								{i18n.treeDetail.waterNeed.readMore}
							</button>
						)}
					</div>
				</div>
			</div>

			{isInfoboxVisible && (
				<div className={`flex flex-col gap-y-3 pt-2`}>
					<Markdown>
						{isInVegetationPeriod
							? ""
							: i18n.treeDetail.waterNeed.ageAndWaterHintWinter}
					</Markdown>
					<Markdown>{ageAndWaterHint()}</Markdown>
					<div className="flex w-full justify-center">
						<TertiaryButton
							onClick={() => setIsInfoboxVisible(false)}
							label={i18n.treeDetail.waterNeed.close}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
