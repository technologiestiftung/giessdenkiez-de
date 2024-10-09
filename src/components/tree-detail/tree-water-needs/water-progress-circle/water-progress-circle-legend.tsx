import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { TreeAgeClassification } from "../../tree-types";

interface WaterCircleLegendProps {
	needsWaterAmount: number;
	shouldBeWatered: boolean;
	treeAgeClassification: TreeAgeClassification;
	rainSum: number;
	wateringSum: number;
}

export const WaterProgressCircleLegend: React.FC<WaterCircleLegendProps> = ({
	needsWaterAmount,
	shouldBeWatered,
	treeAgeClassification,
	rainSum,
	wateringSum,
}) => {
	const { formatNumber } = useI18nStore();
	const i18n = useI18nStore().i18n();

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-row items-center gap-4">
				<div
					className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-gdk-rain-blue`}
				/>
				<div className="flex flex-col">
					<div className="font-bold">
						{formatNumber(rainSum, true)} {i18n.treeDetail.waterNeed.liters}*
					</div>
					<div>{i18n.treeDetail.waterNeed.rained}</div>
				</div>
			</div>

			<div className="flex flex-row items-center gap-4">
				<div
					className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-gdk-watering-blue`}
				/>
				<div className="flex flex-col">
					<div className="font-bold">
						{formatNumber(wateringSum, true)} {i18n.treeDetail.waterNeed.liters}
						*
					</div>
					<div>{i18n.treeDetail.waterNeed.watered}</div>
				</div>
			</div>

			{treeAgeClassification === TreeAgeClassification.BABY && (
				<div className="flex flex-row items-center gap-4">
					<div
						className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-gdk-distric-watering-green self-start translate-y-3`}
					/>
					<div className="flex flex-col">
						<div className="font-bold">{i18n.treeDetail.waterNeed.manager}</div>
						<div>{i18n.treeDetail.waterNeed.watered}</div>
					</div>
				</div>
			)}

			{treeAgeClassification === TreeAgeClassification.SENIOR && (
				<div className="flex flex-row items-center gap-4">
					<div
						className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-gdk-groundwater-blue`}
					/>
					<div className="flex flex-col">
						<div className="font-bold">
							{i18n.treeDetail.waterNeed.managedByGroundwater}
						</div>
						<div>{i18n.treeDetail.waterNeed.covered}</div>
					</div>
				</div>
			)}

			{shouldBeWatered &&
				treeAgeClassification === TreeAgeClassification.JUNIOR && (
					<div className="flex flex-row items-center gap-4">
						<div
							className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-[#d3d3d3]`}
						/>
						<div className="flex flex-col">
							<div className="font-bold">
								{needsWaterAmount} {i18n.treeDetail.waterNeed.liters}
							</div>
							<div>{i18n.treeDetail.waterNeed.stillMissing}</div>
						</div>
					</div>
				)}

			{treeAgeClassification === TreeAgeClassification.UNKNOWN && (
				<div className="flex flex-row items-center gap-4">
					<div
						className={`h-8 min-h-8 w-3 min-w-3 rounded-full bg-[#d3d3d3]`}
					/>
					<div className="flex flex-col">
						<div className="font-bold">
							{i18n.treeDetail.waterNeed.unknownShort}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
