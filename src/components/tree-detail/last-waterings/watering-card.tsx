import React, { useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useProfileStore } from "../../../shared-stores/profile-store";
import { PrimaryDestructiveButton } from "../../buttons/primary-destructive";
import { TrashIcon } from "../../icons/trash-icon";
import { WateringCanIcon } from "../../icons/watering-can-icon";
import { useMapStore } from "../../map/map-store";
import { removeTodayWatering } from "../hooks/use-update-tree-waterings";
import { useWaterTree } from "../hooks/use-water-tree";
import { TreeWateringData } from "../tree-types";
import { ContactDialog } from "../tree-water-needs/contact-dialog";

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
	const { username } = useProfileStore();
	const { deleteWatering } = useWaterTree();
	const [isDeleteWateringLoading, setIsDeleteWateringLoading] = useState(false);

	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const isWateringByUser = wateringData.username === username;

	const map = useMapStore().map;

	const onClickDelete = async () => {
		setIsDeleteWateringLoading(true);
		await deleteWatering(wateringData.id);

		// Update the map with the new watering amount
		removeTodayWatering(map, wateringData.tree_id, wateringData.amount);

		setIsDeleteWateringLoading(false);
		setIsConfirmDeleteVisible(false);
	};

	return (
		<div
			className={`flex transition ease-in-out delay-100 flex-row justify-between gap-2 ${isConfirmDeleteVisible ? " -translate-x-32 " : ""}`}
		>
			<ContactDialog contactUsername={wateringData.username} />
			<div
				className={`shadow-gdk-hard flex flex-col gap-2 rounded-lg shrink-0 p-4 w-[90%] `}
			>
				<div
					className={`font-bold ${wateringData.username && "underline cursor-pointer"}`}
					onClick={() => {
						(
							document.getElementById("contact-dialog") as HTMLDialogElement
						).showModal();
					}}
				>
					{getDisplayedUsername(wateringData)}
				</div>
				<div className="flex flex-row items-center justify-between">
					<div>{formatDate(new Date(wateringData.timestamp))}</div>
					<div className="flex flex-row items-center justify-between w-[63px]">
						<WateringCanIcon className="h-[21px] text-gdk-watering-blue" />
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
						className={`transition ease-in-out delay-100 ${isConfirmDeleteVisible ? "flex" : "hidden"}`}
					>
						<PrimaryDestructiveButton
							label={"Löschen"}
							onClick={onClickDelete}
							isLoading={isDeleteWateringLoading}
							disabled={isDeleteWateringLoading}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
