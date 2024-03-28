import React from "react";
import { TreeWateringData } from "./tree-types";
import { useI18nStore } from "../../i18n/i18n-store";

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

export const LastWaterings: React.FC<WateringCardProps> = ({
	wateringData,
}) => {
	const formatDate = useI18nStore().formatDate;

	return (
		<div className="shadow-gdk-hard flex flex-col gap-2 rounded-lg p-4">
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
	);
};
