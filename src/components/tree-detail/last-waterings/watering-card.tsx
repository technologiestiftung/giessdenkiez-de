import React, { useState } from "react";
import { TreeWateringData } from "../tree-types";
import { useI18nStore } from "../../../i18n/i18n-store";
import { TrashIcon } from "../../icons/trash-icon";
import { PrimaryDestructiveButton } from "../../buttons/primary-destructive";
import { useAuthStore } from "../../../auth/auth-store";
import { useWaterTree } from "../hooks/use-water-tree";

interface WateringCardProps {
	wateringData: TreeWateringData;
}

function getDisplayedUsername(wateringData: TreeWateringData) {
	if (wateringData.username === null) {
		return (
			<span className="font-normal italic">
				{useI18nStore.getState().i18n().treeDetail.lastWaterings.deletedAccount}
			</span>
		);
	}
	return wateringData.username;
}

export const WateringCard: React.FC<WateringCardProps> = ({ wateringData }) => {
	const formatDate = useI18nStore().formatDate;
	const { username } = useAuthStore();
	const { deleteWatering } = useWaterTree(wateringData.tree_id);

	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const isWateringByUser = wateringData.username === username;

	const onClickDelete = async () => {
		await deleteWatering(wateringData.id);
		setIsConfirmDeleteVisible(false);
	};

	return (
		<div
			className={`flex transition ease-in-out delay-100 flex-row justify-between gap-2 ${isConfirmDeleteVisible ? " -translate-x-32 " : ""}`}
		>
			<div
				className={`shadow-gdk-hard flex flex-col gap-2 rounded-lg shrink-0 p-4 w-[90%] `}
			>
				<div className="font-bold">{getDisplayedUsername(wateringData)}</div>
				<div className="flex flex-row items-center justify-between">
					<div>{formatDate(new Date(wateringData.timestamp))}</div>
					<div className="flex flex-row items-center gap-2">
						<img
							src="/images/drop-icon.svg"
							alt="Drop Icon"
							width={15}
							height={15}
						/>
						<div>{wateringData.amount}l</div>
					</div>
				</div>
			</div>
			{isWateringByUser && (
				<div
					className={`flex flex-row self-center gap-2 ${isConfirmDeleteVisible ? "grow" : ""}`}
				>
					<button
						onClick={() => setIsConfirmDeleteVisible(!isConfirmDeleteVisible)}
						className={`self-center  text-gdk-dark-red hover:text-gdk-light-red p-1 rounded-sm ${isConfirmDeleteVisible ? "outline outline-2" : ""}`}
					>
						<TrashIcon />
					</button>
					<div
						className={`transition ease-in-out delay-100 ${isConfirmDeleteVisible ? "opacity-1" : "opacity-0"}`}
					>
						<PrimaryDestructiveButton
							label={"Löschen"}
							onClick={onClickDelete}
						></PrimaryDestructiveButton>
					</div>
				</div>
			)}
		</div>
	);
};
