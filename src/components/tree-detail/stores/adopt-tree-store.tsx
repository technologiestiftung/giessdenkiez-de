import { create } from "zustand";
import { useAuthStore } from "../../../auth/auth-store";
import { supabaseClient } from "../../../auth/supabase-client";
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
		treeId: string,
		abortController: AbortController,
	) => Promise<void>;
}

const { refreshAdoptedTreesInfo } = useProfileStore.getState();
const { handleError } = useErrorStore.getState();
const i18n = useI18nStore.getState().i18n();

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
		const user = useAuthStore.getState().session?.user;
		set({ adoptedByOthers: false });
		try {
			const { data, error } = await supabaseClient
				.from("trees_adopted")
				.select(`id, uuid, tree_id`)
				.eq("tree_id", treeId)
				.neq("uuid", user?.id)
				.abortSignal(abortController.signal);

			if (error) {
				throw error;
			}

			set({ adoptedByOthers: (data ?? []).length > 0 });
		} catch (error) {
			if (abortController.signal.aborted) {
				return;
			}

			handleError(i18n.common.defaultErrorMessage, error);
			return;
		}
	},
}));
