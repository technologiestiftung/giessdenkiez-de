import { create } from "zustand";
import { useAuthStore } from "../../../auth/auth-store";
import { useErrorStore } from "../../../error/error-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useProfileStore } from "../../../shared-stores/profile-store";

interface TreeAdoptStore {
	isLoading: boolean;
	isAdopted: (treeId: string) => boolean;
	adoptedByOthers: boolean;
	adoptTree: (treeId: string) => Promise<void>;
	unadoptTree: (treeId: string) => Promise<void>;
	refreshIsTreeAdoptedByOthers: (
		treeId: string | undefined,
		abortController: AbortController,
	) => Promise<void>;
}

const { refreshAdoptedTreesInfo } = useProfileStore.getState();
const { handleError } = useErrorStore.getState();

export const useTreeAdoptStore = create<TreeAdoptStore>()((set, get) => ({
	isLoading: false,
	isAdopted: (treeId) => {
		return useProfileStore.getState().adoptedTrees.includes(treeId);
	},
	adoptedByOthers: false,
	adoptTree: async (treeId) => {
		const abortController = new AbortController();
		const access_token = useAuthStore.getState().session?.access_token;
		const user = useAuthStore.getState().session?.user;
		const i18n = useI18nStore.getState().i18n();

		if (!user?.id) {
			return;
		}
		try {
			set({ isLoading: true });
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/post/adopt`;
			const res = await fetch(adoptUrl, {
				method: "POST",
				body: JSON.stringify({ uuid: user?.id, tree_id: treeId }),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});
			if (!res.ok) {
				handleError(i18n.treeDetail.adoptErrorMessage);
				set({ isLoading: false });
				return;
			}
			set({ isLoading: false });
			await refreshAdoptedTreesInfo();
			await get().refreshIsTreeAdoptedByOthers(treeId, abortController);
		} catch (error) {
			handleError(i18n.treeDetail.adoptErrorMessage, error);
			set({ isLoading: false });
		}
	},
	unadoptTree: async (treeId) => {
		const abortController = new AbortController();
		const access_token = useAuthStore.getState().session?.access_token;
		const user = useAuthStore.getState().session?.user;
		const i18n = useI18nStore.getState().i18n();

		if (!user?.id) {
			return;
		}
		try {
			set({ isLoading: true });
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/delete/unadopt`;
			const res = await fetch(adoptUrl, {
				method: "DELETE",
				body: JSON.stringify({ uuid: user?.id, tree_id: treeId }),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});
			if (!res.ok) {
				set({ isLoading: false });
				handleError(i18n.treeDetail.adoptErrorMessage);
				return;
			}
			set({ isLoading: false });
			await refreshAdoptedTreesInfo();
			await get().refreshIsTreeAdoptedByOthers(treeId, abortController);
		} catch (error) {
			handleError(i18n.treeDetail.adoptErrorMessage, error);
			set({ isLoading: false });
		}
	},

	refreshIsTreeAdoptedByOthers: async (treeId, abortController) => {
		set({ adoptedByOthers: false });

		if (!treeId) {
			return;
		}

		try {
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/get/wateredandadopted`;
			const response = await fetch(adoptUrl, {
				headers: {
					"Content-Type": "application/json",
				},
				signal: abortController.signal,
			});

			if (!response.ok) {
				throw new Error(
					"Failed to fetch data watered and adopted (community data)",
				);
			}

			const json = await response.json();

			const isTreeAdoptedByOthers = json.data.some(
				({ tree_id, adopted }: { tree_id: string; adopted: number }) =>
					tree_id === treeId && adopted > 0,
			);

			set({ adoptedByOthers: isTreeAdoptedByOthers });
		} catch (error) {
			if (abortController.signal.aborted) {
				return;
			}
			const i18n = useI18nStore.getState().i18n();
			handleError(i18n.common.defaultErrorMessage, error);
			return;
		}
	},
}));
