import React, { useState } from "react";
import { supabaseClient } from "../../../auth/supabase-client";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useProfileStore } from "../../../shared-stores/profile-store";
import { useSelectedContactRecipientUsernameStore } from "../../../shared-stores/selected-contact-recipient-store";
import { PrimaryDestructiveButton } from "../../buttons/primary-destructive";
import { MailIcon } from "../../icons/mail-icon";
import { SpinnerIcon } from "../../icons/spinner-icon";
import { TrashIcon } from "../../icons/trash-icon";
import { WateringCanIcon } from "../../icons/watering-can-icon";
import { useMapStore } from "../../map/map-store";
import { removeTodayWatering } from "../hooks/use-update-tree-waterings";
import { useWaterTree } from "../hooks/use-water-tree";
import { TreeWateringData } from "../tree-types";

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
	return <div>{wateringData.username}</div>;
}

export const WateringCard: React.FC<WateringCardProps> = ({ wateringData }) => {
	const formatDate = useI18nStore().formatDate;
	const { username } = useProfileStore();
	const { deleteWatering } = useWaterTree();
	const [isDeleteWateringLoading, setIsDeleteWateringLoading] = useState(false);

	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const isWateringByUser = wateringData.username === username;

	const [isContactRequestLoading, setIsContactRequestLoading] = useState(false);

	const map = useMapStore().map;
	const setSelectedContactRecipientUsername =
		useSelectedContactRecipientUsernameStore()
			.setSelectedContactRecipientUsername;

	const onClickDelete = async () => {
		setIsDeleteWateringLoading(true);
		await deleteWatering(wateringData.id);

		// Update the map with the new watering amount
		removeTodayWatering(map, wateringData.tree_id, wateringData.amount);

		setIsDeleteWateringLoading(false);
		setIsConfirmDeleteVisible(false);
	};

	const checkForContactRequestAllowed = async () => {
		if (isWateringByUser) {
			return;
		}

		if (!username) {
			(
				document.getElementById("login-first-alert") as HTMLDialogElement
			).showModal();
			return;
		}

		setIsContactRequestLoading(true);

		let data;
		try {
			data = await supabaseClient.functions.invoke("check_contact_request", {
				body: {
					recipientContactName: wateringData.username,
				},
			});
		} catch (e) {
			console.error(e);
			(
				document.getElementById(
					"generic-contact-error-alert",
				) as HTMLDialogElement
			).showModal();
			return;
		} finally {
			setIsContactRequestLoading(false);
		}

		if (!data || data.error || !data.data) {
			(
				document.getElementById(
					"generic-contact-error-alert",
				) as HTMLDialogElement
			).showModal();
			return;
		}

		setSelectedContactRecipientUsername(wateringData.username);

		if (data.data.isContactRequestAllowed) {
			(
				document.getElementById("contact-dialog") as HTMLDialogElement
			).showModal();
			return;
		}

		if (data.data.reason === "already_contacted_the_recipient_before") {
			(
				document.getElementById("already-contacted-alert") as HTMLDialogElement
			).showModal();
			return;
		}

		if (data.data.reason === "already_sent_more_than_3_contact_requests") {
			(
				document.getElementById("daily-limit-alert") as HTMLDialogElement
			).showModal();
			return;
		}
	};

	return (
		<div
			className={`flex transition ease-in-out delay-100 flex-row justify-between gap-2 ${
				isConfirmDeleteVisible ? " -translate-x-32 " : ""
			}`}
		>
			<div
				className={`shadow-gdk-hard flex flex-col gap-2 rounded-lg shrink-0 p-4 w-[90%] `}
			>
				<div
					className={`font-bold ${wateringData.username && !isWateringByUser && "cursor-pointer"} flex flex-row items-center gap-2`}
					onClick={() => {
						checkForContactRequestAllowed();
					}}
				>
					<div>{getDisplayedUsername(wateringData)}</div>
					{!isWateringByUser && (
						<div>
							{isContactRequestLoading ? (
								<SpinnerIcon text="text-gdk-light-blue" fill="fill-gdk-blue" />
							) : (
								<div className={`scale-75`}>
									<MailIcon
										color={username ? "gdk-blue" : "gdk-gray"}
										hoverColor={username ? "gdk-light-blue" : "gdk-light-gray"}
									/>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex flex-row items-center justify-between">
					<div>{formatDate(new Date(wateringData.timestamp))}</div>
					<div className="flex flex-row items-center justify-between w-[63px]">
						<WateringCanIcon className="h-[21px]" />
						<div>{wateringData.amount}l</div>
					</div>
				</div>
			</div>
			{isWateringByUser && (
				<div
					className={`flex flex-row self-center gap-2 ${
						isConfirmDeleteVisible ? "grow" : ""
					}`}
				>
					<button
						onClick={() => setIsConfirmDeleteVisible(!isConfirmDeleteVisible)}
						className={`self-center  text-gdk-dark-red hover:text-gdk-light-red p-1 rounded-sm ${
							isConfirmDeleteVisible ? "outline outline-2" : ""
						}`}
					>
						<TrashIcon />
					</button>
					<div
						className={`transition ease-in-out delay-100 ${
							isConfirmDeleteVisible ? "flex" : "hidden"
						}`}
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
