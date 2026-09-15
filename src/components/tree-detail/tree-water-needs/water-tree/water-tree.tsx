import React from "react";
import { PrimaryButton } from "../../../buttons/primary";
import { WateringCanIcon } from "../../../icons/watering-can-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { InternalAnchorLink } from "../../../anchor-link/internal-anchor-link";
import { WateringDialog } from "./watering-dialog";
import { TreeAgeClassification, TreeCoreData } from "../../tree-types";

interface WaterTreeProps {
	treeData: TreeCoreData;
	treeAgeClassification: TreeAgeClassification;
}

export const WaterTree: React.FC<WaterTreeProps> = ({
	treeData,
	treeAgeClassification,
}) => {
	const i18n = useI18nStore().i18n();
	const { isLoggedIn } = useAuthStore();

	/**
	 * Baby trees are watered by the district (see the hint above the button), so
	 * the button is shown but cannot be used.
	 */
	const isBabyTree = treeAgeClassification === TreeAgeClassification.BABY;

	return (
		<div>
			<div className="flex flex-col items-center">
				<PrimaryButton
					testId="water-tree-button"
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
					disabled={!isLoggedIn() || isBabyTree}
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
	);
};
