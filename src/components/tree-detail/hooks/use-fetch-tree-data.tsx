import { useEffect } from "react";
import { useTreeStore } from "../stores/tree-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";

export function useFetchTreeData(treeId: string | undefined) {
	const i18n = useI18nStore().i18n();
	const handleError = useErrorStore().handleError;
	const { refreshTreeData } = useTreeStore();

	useEffect(() => {
		const abortController = new AbortController();

		refreshTreeData(treeId, abortController).catch((error: unknown) => {
			if (abortController.signal.aborted) {
				return;
			}

			handleError(i18n.common.defaultErrorMessage, error);
		});

		return () => abortController.abort();
	}, [treeId]);

	return undefined;
}
