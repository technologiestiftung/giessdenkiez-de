/* eslint-disable max-lines */
import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { ChevronDown } from "../../icons/chevron-down";
import { ChevronRight } from "../../icons/chevron-right";
import { useTreeWaterNeedsData } from "../hooks/use-tree-water-needs-data";
import {
	TreeAgeClassification,
	TreeCoreData,
	TreeWateringData,
} from "../tree-types";
import { WaterProgressCircle } from "./water-progress-circle/water-progress-circle";
import { WateringDialog } from "./watering-dialog";
import { WateringCanIcon } from "../../icons/watering-can-icon";
import { PrimaryButton } from "../../buttons/primary";
import { useAuthStore } from "../../../auth/auth-store";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import Markdown from "react-markdown";
import { TertiaryButton } from "../../buttons/tertiary";

interface TreeWaterNeedProps {
	treeData: TreeCoreData;
	treeAgeClassification: TreeAgeClassification;
	treeWateringData: TreeWateringData[];
}

export const TreeWaterNeed: React.FC<TreeWaterNeedProps> = ({
	treeData,
	treeAgeClassification,
	treeWateringData,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	const [isExpanded, setIsExpanded] = useState(true);

	const [isInfoboxVisible, setIsInfoboxVisible] = useState(false);

	const {
		rainSum,
		wateringSum,
		referenceWaterAmount,
		stillMissingWater,
		waterParts,
		shouldBeWatered,
	} = useTreeWaterNeedsData(treeData, treeWateringData, treeAgeClassification);

	const { isLoggedIn } = useAuthStore();

	return (
		<div className="flex flex-col gap-4 border-b-2 py-8">
			<button
				className="flex flex-row items-center justify-between  text-xl font-bold"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className="flex flex-row items-center gap-1">
					<WateringCanIcon />
					<div className="">{i18n.treeDetail.waterNeed.title}</div>
				</div>
				<div className="text-gdk-blue">
					{isExpanded ? <ChevronDown /> : <ChevronRight />}
				</div>
			</button>
			{isExpanded && (
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-1 grid-rows-1">
						<div className="relative col-start-1 row-start-1 flex flex-row items-center justify-between">
							<div className="pr-8">
								{i18n.treeDetail.waterNeed.hint}{" "}
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
							<Markdown>{i18n.treeDetail.waterNeed.ageAndWaterHint}</Markdown>
							<div className="flex w-full justify-center">
								<TertiaryButton
									onClick={() => setIsInfoboxVisible(false)}
									label={i18n.treeDetail.waterNeed.close}
								/>
							</div>
						</div>
					)}

					{(treeAgeClassification === TreeAgeClassification.BABY ||
						treeAgeClassification === TreeAgeClassification.SENIOR) && (
						<div className="text-xl font-bold">
							{i18n.treeDetail.waterNeed.waterManaged}
						</div>
					)}

					{treeAgeClassification === TreeAgeClassification.JUNIOR && (
						<Markdown className="text-xl font-bold">
							{i18n.treeDetail.waterNeed.needXLiters(
								formatNumber(referenceWaterAmount, true),
							)}
						</Markdown>
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
									className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-gdk-rain-blue`}
								/>
								<div className="flex flex-col">
									<div className="font-bold">
										{formatNumber(rainSum, true)}{" "}
										{i18n.treeDetail.waterNeed.liters}*
									</div>
									<div>{i18n.treeDetail.waterNeed.rained}</div>
								</div>
							</div>
							{treeAgeClassification === TreeAgeClassification.BABY && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-gdk-water-blue`}
									/>
									<div className="flex flex-col">
										<div className="font-bold">
											{i18n.treeDetail.waterNeed.manager}
										</div>
										<div>{i18n.treeDetail.waterNeed.watered}</div>
									</div>
								</div>
							)}

							{(treeAgeClassification === TreeAgeClassification.UNKNOWN ||
								treeAgeClassification === TreeAgeClassification.JUNIOR) && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-gdk-water-blue`}
									/>
									<div className="flex flex-col">
										<div className="font-bold">
											{formatNumber(wateringSum, true)}{" "}
											{i18n.treeDetail.waterNeed.liters}*
										</div>
										<div>{i18n.treeDetail.waterNeed.watered}</div>
									</div>
								</div>
							)}

							{treeAgeClassification === TreeAgeClassification.SENIOR && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-gdk-water-blue`}
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
											className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-[#d3d3d3]`}
										/>
										<div className="flex flex-col">
											<div className="font-bold">
												{stillMissingWater} {i18n.treeDetail.waterNeed.liters}
											</div>
											<div>{i18n.treeDetail.waterNeed.stillMissing}</div>
										</div>
									</div>
								)}

							{treeAgeClassification === TreeAgeClassification.UNKNOWN && (
								<div className="flex flex-row items-center gap-4">
									<div
										className={`h-8 min-h-8 w-5 min-w-5 rounded-full bg-[#d3d3d3]`}
									/>
									<div className="flex flex-col">
										<div className="font-bold">
											{i18n.treeDetail.waterNeed.unknownShort}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="font-bold">
						{i18n.treeDetail.waterNeed.dataOfLastXDays}
					</div>

					<div className="flex flex-col items-center">
						<PrimaryButton
							data-testid="water-tree-button"
							onClick={() => {
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
							disabled={!isLoggedIn()}
						/>

						{!isLoggedIn() && (
							<p>
								<InternalAnchorLink
									href={`/profile?redirectTo=/map?treeId=${treeData.id}&zoom=20`}
									label={i18n.treeDetail.waterNeed.loginToWater.login}
								/>{" "}
								{i18n.treeDetail.waterNeed.loginToWater.toWater}
							</p>
						)}
					</div>

					<WateringDialog />
				</div>
			)}
		</div>
	);
};
