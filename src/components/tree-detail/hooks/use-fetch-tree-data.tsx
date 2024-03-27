import { useEffect } from "react";
import { useTreeStore } from "../tree-store";
import { TreeDataState } from "../tree-types";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";
import { useTreeAdoptStore } from "./use-adopt-tree";

export function useFetchTreeData(treeId: string | undefined): TreeDataState {
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;
	const { isTreeAdoptedByOthers } = useTreeAdoptStore();

	const [treeData, setTreeData] = useTreeStore((store) => [
		store.treeData,
		store.setTreeData,
	]);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			if (!treeId) {
				return;
			}
			try {
				const geocodingUrl = `${
					import.meta.env.VITE_API_ENDPOINT
				}/get/byid?id=${treeId}`;
				const res = await fetch(geocodingUrl, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
						"Content-Type": "application/json",
					},
					signal: abortController.signal,
				});
				if (!res.ok) {
					handleError(i18n.common.defaultErrorMessage);
					return;
				}
				const json = await res.json();
				setTreeData(json.data[0]);
				await isTreeAdoptedByOthers(treeId);
			} catch (error) {
				handleError(i18n.common.defaultErrorMessage, error);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [treeId]);

	return { treeData };
}
