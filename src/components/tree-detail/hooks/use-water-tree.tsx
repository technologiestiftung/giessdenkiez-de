import { useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { useErrorStore } from "../../../error/error-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useTreeStore } from "../stores/tree-store";
import { useProfileStore } from "../../../shared-stores/profile-store";
import { supabaseClient } from "../../../auth/supabase-client";

export interface WaterTreeState {
	isLoading: boolean;
	waterTree: (amount: number, date: Date) => Promise<void>;
	deleteWatering: (wateringId: number) => Promise<void>;
}

export function useWaterTree(): WaterTreeState {
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;

	const access_token = useAuthStore((store) => store).session?.access_token;
	const user = useAuthStore((store) => store).session?.user;
	const { refreshUserWaterings } = useProfileStore();
	const { refreshTreeWateringData } = useTreeStore();

	const abortController = new AbortController();
	const [wateringLoading, setWateringLoading] = useState(false);

	const waterTree = async (amount: number, date: Date) => {
		if (!user?.id) {
			return;
		}

		const treeId = useTreeStore.getState().selectedTreeId;
		const username = useProfileStore.getState().username;

		if (!treeId) {
			return;
		}

		setWateringLoading(true);

		const { error } = await supabaseClient
			.from("trees_watered")
			.insert({
				amount: amount,
				tree_id: treeId,
				uuid: user?.id,
				username,
				timestamp: date.toISOString(),
			})
			.select("*");

		if (error) {
			handleError(i18n.common.defaultErrorMessage);
			setWateringLoading(false);
		}
		setWateringLoading(false);
		await refreshUserWaterings();
		await refreshTreeWateringData(treeId, abortController);
	};

	const deleteWatering = async (wateringId: number) => {
		if (!user?.id) {
			return;
		}

		const treeId = useTreeStore.getState().selectedTreeId;

		if (!treeId) {
			return;
		}

		try {
			setWateringLoading(true);

			const deleteWateringUrl = `${import.meta.env.VITE_API_ENDPOINT}/delete/unwater`;
			const res = await fetch(deleteWateringUrl, {
				method: "DELETE",
				body: JSON.stringify({
					tree_id: treeId,
					watering_id: wateringId,
					uuid: user?.id,
				}),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});
			if (!res.ok) {
				handleError(i18n.common.defaultErrorMessage);
				setWateringLoading(false);
				return;
			}
			setWateringLoading(false);
			await refreshUserWaterings();
			await refreshTreeWateringData(treeId, abortController);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
			setWateringLoading(false);
		}
	};

	return {
		isLoading: wateringLoading,
		waterTree,
		deleteWatering,
	};
}
