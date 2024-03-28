import React, { useMemo, useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { AdoptButton } from "../buttons/adoptButton";
import { useTreeAdoptStore } from "./hooks/use-adopt-tree";
import { Tooltip as AdoptTreeTooltip } from "./tooltip";
import { TreeAgeClassification, TreeData } from "./tree-types";
import { InfoIcon } from "../icons/info-icon";

interface TreeAdoptCardProps {
	treeData: TreeData;
	treeAgeClassification: TreeAgeClassification;
}

export const TreeAdoptCard: React.FC<TreeAdoptCardProps> = ({
	treeData,
	treeAgeClassification,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const i18n = useI18nStore().i18n();

	const { isAdopted, isLoading, adoptedByOthers } = useTreeAdoptStore();

	const isTreeAdopted = isAdopted(treeData.id);

	const adoptLabel = useMemo(() => {
		if (isLoading) {
			if (isTreeAdopted) {
				return i18n.treeDetail.unadoptLoading;
			}
			return i18n.treeDetail.adoptLoading;
		}
		if (isTreeAdopted) {
			return i18n.treeDetail.isAdopted;
		}
		return i18n.treeDetail.adoptIt;
	}, [isLoading, isTreeAdopted, i18n]);

	return (
		<div className="shadow-gdk-hard flex flex-col gap-4 rounded-lg bg-slate-100 p-4">
			<div className="flex flex-row items-center justify-between text-xl">
				<div className="font-bold">{treeData.artdtsch}</div>

				{treeAgeClassification !== TreeAgeClassification.BABY && (
					<AdoptButton treeId={treeData.id}></AdoptButton>
				)}
			</div>
			{treeAgeClassification === TreeAgeClassification.BABY && (
				<div>{i18n.treeDetail.managedBy}</div>
			)}
			{treeAgeClassification !== TreeAgeClassification.BABY && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-center justify-between">
						<div className="text-slate-500">{adoptLabel}</div>
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
					{adoptedByOthers && !isTreeAdopted && (
						<div className="items-left flex flex-row gap-2">
							<img
								src="/images/hi-there-icon.svg"
								alt="Tree Icon"
								width={24}
								height={24}
							/>
							<div className="italic leading-tight text-slate-500">
								{i18n.treeDetail.exclusivelyAdoptedBy}
							</div>
						</div>
					)}
					{adoptedByOthers && isTreeAdopted && (
						<div className="items-left flex flex-row gap-2">
							<img
								src="/images/hi-there-icon.svg"
								alt="Tree Icon"
								width={24}
								height={24}
							/>
							<div className="italic leading-tight text-slate-500">
								{i18n.treeDetail.alsoAdoptedBy}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
