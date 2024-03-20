import { useEffect } from "react";
import { useTreeStore } from "../tree-store";
import { TreeData, TreeWateringData } from "../tree-types";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";

export interface TreeFetchWateringDataState {
	treeWateringData: TreeWateringData[];
	fetchWateringData: () => Promise<void>;
}

export function useFetchTreeWateringData(
	treeData?: TreeData,
): TreeFetchWateringDataState {
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;

	const [treeWateringData, setTreeWateringData] = useTreeStore((store) => [
		store.treeWateringData,
		store.setTreeWateringData,
	]);

	const fetchData = async () => {
		if (!treeData) {
			return;
		}
		try {
			const geocodingUrl = `${
				import.meta.env.VITE_API_ENDPOINT
			}/get/lastwatered?id=${treeData.id}`;
			const res = await fetch(geocodingUrl, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				handleError(i18n.common.defaultErrorMessage);
				return;
			}
			const json = await res.json();
			setTreeWateringData(json.data);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [treeData]);

	return {
		treeWateringData,
		fetchWateringData: fetchData,
	};
}
