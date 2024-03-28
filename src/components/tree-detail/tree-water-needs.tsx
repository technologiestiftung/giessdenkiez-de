/* eslint-disable max-lines */
import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { ChevronDown } from "../icons/chevron-down";
import { ChevronRight } from "../icons/chevron-right";
import { useTreeWaterNeedsData } from "./hooks/use-tree-water-needs-data";
import { Tooltip } from "./tooltip";
import {
	TreeAgeClassification,
	TreeData,
	TreeWateringData,
} from "./tree-types";
import { WaterProgressCircle } from "./water-progress-circle";
import { WateringDialog } from "./watering-dialog";
import { WateringCanIcon } from "../icons/watering-can-icon";
import { PrimaryButton } from "../buttons/primary";

interface TreeWaterNeedProps {
	treeData: TreeData;
	treeAgeClassification: TreeAgeClassification;
	treeWateringData: TreeWateringData[];
	onTreeWatered: () => void;
}

export const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({
	treeData,
	treeAgeClassification,
	treeWateringData,
	onTreeWatered,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	const [isExpanded, setIsExpanded] = useState(true);
	const [showInfoBox, setShowInfoBox] = useState(false);

	const {
		rainSum,
		wateringSum,
		referenceWaterAmount,
		stillMissingWater,
		waterParts,
		shouldBeWatered,
		rainColor,
		wateringColor,
	} = useTreeWaterNeedsData(treeData, treeWateringData, treeAgeClassification);

	return (
		<div className="flex flex-col gap-4 border-b-2 py-8">
			<button
				className="flex flex-row items-center justify-between  text-xl font-bold"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="flex flex-row items-center gap-2 pl-1">
					<WateringCanIcon />
					<div className="">{i18n.treeDetail.waterNeed.title}</div>
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
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-1 grid-rows-1">
						<div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
							<div className="pr-8">{i18n.treeDetail.waterNeed.hint}</div>
							<div className="relative">
								<button
									onClick={() => {
										setShowInfoBox(!showInfoBox);
									}}
									onMouseMove={() => setShowInfoBox(true)}
									onMouseOut={() => setShowInfoBox(false)}
								>
									<img
										src="/images/info-icon.svg"
										alt="Tree Icon"
										width={30}
										height={30}
									/>
								</button>
								{showInfoBox && (
									<div className="absolute right-0 top-8">
										<Tooltip
											title={i18n.treeDetail.waterNeed.ageAndWaterHintTitle}
											content={i18n.treeDetail.waterNeed.ageAndWaterHint}
										/>
									</div>
								)}
							</div>
						</div>
					</div>

					{treeAgeClassification === TreeAgeClassification.BABY && (
						<div className="text-xl font-bold">
							{i18n.treeDetail.waterNeed.waterManaged}
						</div>
					)}

					{(treeAgeClassification === TreeAgeClassification.JUNIOR ||
						treeAgeClassification === TreeAgeClassification.GROWNUP) && (
						<div className="text-xl font-bold">
							{i18n.treeDetail.waterNeed.needXLiters(
								formatNumber(referenceWaterAmount),
							)}
						</div>
					)}

					<div className="flex flex-row items-center justify-start gap-4">
						<WaterProgressCircle
							parts={waterParts}
							needsWaterAmount={stillMissingWater}
							shouldBeWatered={shouldBeWatered}
							treeAgeClassification={treeAgeClassification}
							size={200}
						/>
						<div className="flex flex-col gap-3">
							<div className="flex flex-row items-center gap-4">
								<div
									className={`h-5 min-h-5 w-5 min-w-5  rounded-full bg-[${rainColor}]`}
								></div>
								<div className="flex flex-col">
									<div className="font-bold">
										{formatNumber(rainSum)} {i18n.treeDetail.waterNeed.liters}*
									</div>
									<div>{i18n.treeDetail.waterNeed.rained}</div>
								</div>
							</div>
							{treeAgeClassification === TreeAgeClassification.BABY && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-5 min-h-5 w-5 min-w-5  rounded-full bg-[${wateringColor}]`}
									></div>
									<div className="flex flex-col">
										<div className="font-bold">
											{i18n.treeDetail.waterNeed.manager}
										</div>
										<div>{i18n.treeDetail.waterNeed.watered}</div>
									</div>
								</div>
							)}
							{treeAgeClassification !== TreeAgeClassification.BABY && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-5 min-h-5 w-5 min-w-5  rounded-full bg-[${wateringColor}]`}
									></div>
									<div className="flex flex-col">
										<div className="font-bold">
											{formatNumber(wateringSum)}{" "}
											{i18n.treeDetail.waterNeed.liters}*
										</div>
										<div>{i18n.treeDetail.waterNeed.watered}</div>
									</div>
								</div>
							)}
							{shouldBeWatered &&
								treeAgeClassification !== TreeAgeClassification.SENIOR && (
									<div className="flex flex-row items-center gap-4">
										<div
											className={`h-5 min-h-5 w-5 min-w-5 rounded-full bg-[#d3d3d3]`}
										></div>
										<div className="flex flex-col">
											<div className="font-bold">
												{stillMissingWater} {i18n.treeDetail.waterNeed.liters}
											</div>
											<div>{i18n.treeDetail.waterNeed.stillMissing}</div>
										</div>
									</div>
								)}
						</div>
					</div>

					<div className="font-bold">
						{i18n.treeDetail.waterNeed.dataOfLastXDays}
					</div>

					{treeAgeClassification !== TreeAgeClassification.BABY && (
						<div className="flex flex-row justify-center">
							<PrimaryButton
								onClick={async () => {
									(
										document.getElementById("water-dialog") as HTMLDialogElement
									).showModal();
								}}
								label={
									<div className="flex flex-row items-center gap-2">
										<WateringCanIcon />
										<div className="flex flex-row items-center gap-3">
											{i18n.treeDetail.waterNeed.iWatered}
										</div>
									</div>
								}
								disabled={false}
							/>
						</div>
					)}

					<WateringDialog
						treeData={treeData}
						close={() => {
							(
								document.getElementById("water-dialog") as HTMLDialogElement
							).close();
							onTreeWatered();
						}}
					/>
				</div>
			)}
		</div>
	);
};
