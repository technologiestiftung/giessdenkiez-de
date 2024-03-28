import { useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { useErrorStore } from "../../../error/error-store";
import { useI18nStore } from "../../../i18n/i18n-store";

export interface WaterTreeState {
	isLoading: boolean;
	waterTree: (amount: number, date: Date) => Promise<void>;
}

export function useWaterTree(treeId: string): WaterTreeState {
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;

	const access_token = useAuthStore((store) => store).session?.access_token;
	const user = useAuthStore((store) => store).session?.user;
	const { refreshAdoptedTreesInfo } = useAuthStore();

	const abortController = new AbortController();
	const [wateringLoading, setWateringLoading] = useState(false);

	const waterTree = async (amount: number, date: Date) => {
		if (!user?.id) {
			return;
		}

		try {
			setWateringLoading(true);
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/post/water`;
			const res = await fetch(adoptUrl, {
				method: "POST",
				body: JSON.stringify({
					amount: amount,
					tree_id: treeId,
					uuid: user?.id,
					username: user?.user_metadata.signup_username,
					timestamp: date.toISOString(),
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
			}
			setWateringLoading(false);
			await refreshAdoptedTreesInfo();
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
			setWateringLoading(false);
		}
	};

	return {
		isLoading: wateringLoading,
		waterTree,
	};
}
