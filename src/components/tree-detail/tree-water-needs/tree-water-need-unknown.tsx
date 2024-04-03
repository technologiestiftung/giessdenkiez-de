/* eslint-disable max-lines */
import React, { useState } from "react";
import Markdown from "react-markdown";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useTreeWaterNeedsData } from "../hooks/use-tree-water-needs-data";
import {
	TreeAgeClassification,
	TreeData,
	TreeWateringData,
} from "./../tree-types";
import { WateringDialog } from "./watering-dialog";
import { WateringCanIcon } from "../../icons/watering-can-icon";
import { PrimaryButton } from "../../buttons/primary";
import { useAuthStore } from "../../../auth/auth-store";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import { TertiaryButton } from "../../buttons/tertiary";

interface TreeWaterNeedUnknownProps {
	treeData: TreeData;
	treeAgeClassification: TreeAgeClassification;
	treeWateringData: TreeWateringData[];
	onTreeWatered: () => void;
}

export const TreeWaterNeedUnknown: React.FC<TreeWaterNeedUnknownProps> = ({
	treeData,
	treeAgeClassification,
	treeWateringData,
	onTreeWatered,
}) => {
	const i18n = useI18nStore().i18n();
	const { formatNumber } = useI18nStore();

	const [isInfoboxVisible, setIsInfoboxVisible] = useState(false);

	const { rainSum, wateringSum } = useTreeWaterNeedsData(
		treeData,
		treeWateringData,
		treeAgeClassification,
	);

	const { isLoggedIn } = useAuthStore();

	return (
		<div className="flex flex-col gap-4 border-b-2 py-8">
			<div className="flex flex-row items-center gap-2">
				<div>
					<WateringCanIcon />
				</div>
				<div className="col-start-1 row-start-1 flex w-full flex-row items-center justify-between ">
					<div className="pr-8 text-xl font-bold">
						{treeAgeClassification === TreeAgeClassification.SENIOR
							? i18n.treeDetail.waterNeed.seniorTitle
							: i18n.treeDetail.waterNeed.unknownTitle}
					</div>
				</div>
			</div>
			<div>
				{treeAgeClassification === TreeAgeClassification.SENIOR
					? i18n.treeDetail.waterNeed.seniorExplanation
					: i18n.treeDetail.waterNeed.unknown}{" "}
				{!isInfoboxVisible && (
					<button
						className="text-gdk-blue hover:text-gdk-light-blue font-semibold"
						onClick={() => setIsInfoboxVisible(true)}
					>
						{i18n.treeDetail.waterNeed.readMore}
					</button>
				)}
			</div>

			{isInfoboxVisible && (
				<div className={`flex flex-col gap-y-3 pt-2`}>
					<Markdown>{i18n.treeDetail.waterNeed.ageAndWaterHint}</Markdown>
					<div className="flex w-full justify-center">
						<TertiaryButton
							onClick={() => setIsInfoboxVisible(false)}
							label={i18n.treeDetail.waterNeed.close}
						></TertiaryButton>
					</div>
				</div>
			)}

			<div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-row items-center gap-4">
						<div className="h-5 w-5 min-h-5 min-w-5 rounded-full bg-[#1169EE]"></div>
						<Markdown className="">
							{i18n.treeDetail.waterNeed.lastXDaysYLitersRain(
								7,
								formatNumber(rainSum),
							)}
						</Markdown>
					</div>
					<div className="flex flex-row items-center gap-4">
						<div className="h-5 w-5 min-h-5 min-w-5 rounded-full bg-[#3DF99A]"></div>
						<Markdown className="">
							{i18n.treeDetail.waterNeed.lastXDaysYLitersWater(
								7,
								formatNumber(wateringSum),
							)}
						</Markdown>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<PrimaryButton
					data-testid="water-tree-button"
					label={
						<div className="flex flex-row items-center gap-2">
							<img
								src="images/watering-can-white.svg"
								alt="Icon Watering Can White"
							/>
							<div className="flex flex-row items-center gap-3">
								{i18n.treeDetail.waterNeed.iWatered}
							</div>
						</div>
					}
					onClick={() => {
						(
							document.getElementById("water-dialog") as HTMLDialogElement
						).showModal();
					}}
					disabled={!isLoggedIn()}
				/>
				{!isLoggedIn() && (
					<p>
						<InternalAnchorLink
							href={"/profile"}
							label={i18n.treeDetail.waterNeed.loginToWater.login}
						/>{" "}
						{i18n.treeDetail.waterNeed.loginToWater.toWater}
					</p>
				)}
			</div>

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
	);
};
