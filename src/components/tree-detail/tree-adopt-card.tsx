import React, { useMemo, useState } from "react";
import { useAuthStore } from "../../auth/auth-store";
import { useI18nStore } from "../../i18n/i18n-store";
import { AdoptButton } from "../buttons/adopt-button";
import { useTreeAdoptStore } from "./stores/adopt-tree-store";
import { Tooltip as AdoptTreeTooltip } from "./tree-water-needs/tooltip";
import { TreeAgeClassification, TreeCoreData } from "./tree-types";
import { InternalAnchorLink } from "../anchor-link/internal-anchor-link";
import { InfoIcon } from "../icons/info-icon";

interface TreeAdoptCardProps {
	treeData: TreeCoreData;
	treeAgeClassification: TreeAgeClassification;
}

export const TreeAdoptCard: React.FC<TreeAdoptCardProps> = ({
	treeData,
	treeAgeClassification,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const i18n = useI18nStore().i18n();

	const { isAdopted, isLoading, amountOfAdoptions } = useTreeAdoptStore();

	const isTreeAdoptedByUser = isAdopted(treeData.id);

	const isLoggedIn = useAuthStore().isLoggedIn();

	const adoptLabel = useMemo(() => {
		if (!isLoggedIn) {
			return i18n.treeDetail.adoptLoginFirst;
		}

		if (isLoading) {
			if (isTreeAdoptedByUser) {
				return i18n.treeDetail.unadoptLoading;
			}
			return i18n.treeDetail.adoptLoading;
		}

		if (isTreeAdoptedByUser) {
			return i18n.treeDetail.isAdopted;
		}
		return i18n.treeDetail.adoptIt;
	}, [isLoading, isTreeAdoptedByUser, i18n]);

	const isTreeAlsoAdoptedByOthers =
		amountOfAdoptions > 1 && isTreeAdoptedByUser;
	const isTreeOnlyAdoptedByOthers =
		amountOfAdoptions > 0 && !isTreeAdoptedByUser;

	return (
		<div className="shadow-gdk-hard flex flex-col gap-4 rounded-lg bg-slate-100 p-4">
			<div className="flex flex-row items-center justify-between text-xl">
				<div className="font-bold">
					{treeData.art_dtsch || i18n.treeDetail.treeTypeUnknown}
				</div>
				<AdoptButton treeId={treeData.id}></AdoptButton>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between">
					{isLoggedIn ? (
						<div className="text-slate-500">{adoptLabel}</div>
					) : (
						<InternalAnchorLink
							href={`/profile?redirectTo=/map?treeId=${treeData.id}&zoom=20`}
							label={adoptLabel}
						/>
					)}

					<div className="relative">
						<button
							onClick={() => {
								setShowTooltip(!showTooltip);
							}}
							onMouseMove={() => setShowTooltip(true)}
							onMouseOut={() => setShowTooltip(false)}
						>
							<div className="text-gdk-blue">
								<InfoIcon />
							</div>
						</button>
						{showTooltip && (
							<div className="absolute right-0 top-8">
								<AdoptTreeTooltip
									title={i18n.treeDetail.adoptHintTitle}
									content={i18n.treeDetail.adoptHint}
								/>
							</div>
						)}
					</div>
				</div>
				{isTreeOnlyAdoptedByOthers && (
					<div className="items-left flex flex-row gap-2">
						<img
							src="/images/hi-there-icon.svg"
							alt="Tree Icon"
							width={24}
							height={24}
						/>
						<div className="italic leading-tight text-slate-500">
							{i18n.treeDetail.onlyAdoptedByOtherUsers}
						</div>
					</div>
				)}
				{isTreeAlsoAdoptedByOthers && (
					<div className="items-left flex flex-row gap-2">
						<img
							src="/images/hi-there-icon.svg"
							alt="Tree Icon"
							width={24}
							height={24}
						/>
						<div className="italic leading-tight text-slate-500">
							{i18n.treeDetail.alsoAdoptedByOtherUsers}
						</div>
					</div>
				)}

				{treeAgeClassification === TreeAgeClassification.BABY && (
					<div>{i18n.treeDetail.managedBy}</div>
				)}
			</div>
		</div>
	);
};
