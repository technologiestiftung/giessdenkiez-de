import React, { useState, useEffect } from "react";
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

	const [isDeleteVisible, setIsDeleteVisible] = useState(false);
	const [isWateringByUser, setIsWateringByUser] = useState(false);

	useEffect(() => {
		setIsWateringByUser(wateringData.username === username);
	}, [wateringData, isDeleteVisible]);

	const onClickDelete = async () => {
		await deleteWatering(wateringData.id);
		setIsDeleteVisible(false);
	};

	return (
		<div
			className={`flex transition ease-in-out delay-100 flex-row justify-between gap-2 ${isDeleteVisible ? " -translate-x-32 " : ""}`}
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
					className={`flex flex-row self-center gap-2 ${isDeleteVisible ? "grow" : ""}`}
				>
					<button
						onClick={() => setIsDeleteVisible(!isDeleteVisible)}
						className={`self-center  text-gdk-dark-red hover:text-gdk-light-red p-1 rounded-sm ${isDeleteVisible ? "outline outline-2" : ""}`}
					>
						<TrashIcon />
					</button>
					<div
						className={`transition ease-in-out delay-100 ${isDeleteVisible ? "opacity-1" : "opacity-0"}`}
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
