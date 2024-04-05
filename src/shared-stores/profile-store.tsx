/* eslint-disable max-lines */
import { create } from "zustand";
import { supabaseClient } from "../auth/supabase-client";
import { useAuthStore } from "../auth/auth-store";
import { useI18nStore } from "../i18n/i18n-store";
import { useErrorStore } from "../error/error-store";
import { useTreeStore } from "../components/tree-detail/stores/tree-store";

interface TreeInfo {
	id: string;
	artdtsch: string;
	trees_watered: Array<{ id: string; amount: number }>;
	totalWateringVolume: number;
	totalWateringCount: number;
}

interface UserWaterings {
	amount: number;
	id: string;
	timestamp: string;
	tree_id: string;
	username: string;
	uuid: string;
}

interface ProfileStore {
	refresh: () => void;

	username: string | null;
	refreshUsername: () => Promise<void>;

	getUserEmail: () => string | undefined;

	adoptedTrees: Array<string>;
	refreshAdoptedTrees: () => Promise<void>;

	adoptedTreesInfo: Array<TreeInfo> | null;
	refreshAdoptedTreesInfo: () => Promise<void>;

	userWaterings: UserWaterings[] | null;
	getUserWateringsOfTree: (treeId: string) => {
		totalWateringVolume: number;
		totalWateringCount: number;
	};
	refreshUserWaterings: () => Promise<void>;

	waterTree: ({
		treeId,
		amount,
		date,
	}: {
		treeId: string;
		amount: number;
		date: Date;
	}) => Promise<void>;
	deleteWatering: ({
		treeId,
		wateringId,
	}: {
		treeId: string;
		wateringId: number;
	}) => Promise<void>;

	updatePassword: (password: string) => Promise<void>;
	updateEmail: (email: string) => Promise<void>;
	updateUsername: (username: string) => Promise<void>;
	deleteUser: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>()((set, get) => ({
	refresh: async () => {
		const promises = [
			get().refreshUsername(),
			get().refreshAdoptedTrees(),
			get().refreshUserWaterings(),
		];

		await Promise.all(promises);
	},

	username: null,
	refreshUsername: async () => {
		const { data, error } = await supabaseClient
			.from("profiles")
			.select("username")
			.eq("id", useAuthStore.getState().session?.user.id);

		if (error) {
			throw error;
		}

		const currentUsername = await data[0].username;
		set({ username: currentUsername });
	},

	getUserEmail: () => {
		const session = useAuthStore.getState().session;

		if (session === undefined) {
			return undefined;
		}

		return session?.user.email;
	},

	adoptedTrees: [],
	refreshAdoptedTrees: async () => {
		const { data, error } = await supabaseClient
			.from("trees_adopted")
			.select("tree_id")
			.eq("uuid", useAuthStore.getState().session?.user.id);

		if (error) {
			throw error;
		}

		if (data === null) {
			throw new Error("No data received");
		}

		const treeIds = data?.flatMap((element) => element.tree_id);

		set({
			adoptedTrees: treeIds,
		});
	},

	adoptedTreesInfo: null,
	refreshAdoptedTreesInfo: async () => {
		await get().refreshAdoptedTrees();

		const { data, error } = await supabaseClient
			.from("trees")
			.select(
				`
					id, 
					artdtsch, 
					trees_watered ( id, amount)
					`,
			)
			.in("id", get().adoptedTrees ?? []);

		if (error) {
			throw error;
		}

		if (data === null) {
			throw new Error("No data received");
		}

		const adoptedTreesInfoWithUserWaterings = data.map((tree) => {
			const { totalWateringVolume, totalWateringCount } =
				get().getUserWateringsOfTree(tree.id);

			return {
				id: tree.id,
				artdtsch: tree.artdtsch,
				trees_watered: tree.trees_watered,
				totalWateringVolume,
				totalWateringCount,
			};
		}, 0);

		set({
			adoptedTreesInfo: adoptedTreesInfoWithUserWaterings,
		});
	},

	userWaterings: null,
	getUserWateringsOfTree: (treeId: string) => {
		const userWaterings = get().userWaterings;

		if (!userWaterings) {
			return { totalWateringVolume: 0, totalWateringCount: 0 };
		}

		const filteredUserWaterings = userWaterings.filter(
			(watering) => watering.tree_id === treeId,
		);

		const totalWateringVolume = filteredUserWaterings.reduce(
			(acc, curr) => acc + curr.amount,
			0,
		);
		const totalWateringCount = filteredUserWaterings.length;

		return { totalWateringVolume, totalWateringCount };
	},
	refreshUserWaterings: async () => {
		if (!useAuthStore.getState().isLoggedIn()) {
			return;
		}

		const userId = useAuthStore.getState().session?.user.id;
		const accessToken = useAuthStore.getState().session?.access_token;

		const wateredByUserUrl = `${
			import.meta.env.VITE_API_ENDPOINT
		}/get/wateredbyuser?uuid=${userId}`;

		const response = await fetch(wateredByUserUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch wateredbyuser data");
		}

		const wateredByUser = (await response.json()).data;

		set({ userWaterings: wateredByUser });

		/**
		 * we also need to refresh the adoptedTreeInfo as they base
		 * the calculated total watering volume and watering count
		 * on the userWaterings.
		 */
		await get().refreshAdoptedTreesInfo();
	},

	waterTree: async ({ treeId, amount, date }) => {
		const user = useAuthStore.getState().session?.user;
		const access_token = useAuthStore.getState().session?.access_token;
		const i18n = useI18nStore.getState().i18n();
		const { handleError } = useErrorStore.getState();
		const { username, refreshUserWaterings } = useProfileStore.getState();
		const { refreshTreeWateringData } = useTreeStore.getState();

		const abortController = new AbortController();

		try {
			const adoptUrl = `${import.meta.env.VITE_API_ENDPOINT}/post/water`;
			const res = await fetch(adoptUrl, {
				method: "POST",
				body: JSON.stringify({
					amount: amount,
					tree_id: treeId,
					uuid: user?.id,
					username,
					timestamp: date.toISOString(),
				}),
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				handleError(i18n.common.defaultErrorMessage);
			}

			await refreshUserWaterings();
			await refreshTreeWateringData(treeId, abortController);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	},
	deleteWatering: async ({ treeId, wateringId }) => {
		const user = useAuthStore.getState().session?.user;
		const access_token = useAuthStore.getState().session?.access_token;
		const i18n = useI18nStore.getState().i18n();
		const { handleError } = useErrorStore.getState();
		const { refreshUserWaterings } = useProfileStore.getState();
		const { refreshTreeWateringData } = useTreeStore.getState();

		const abortController = new AbortController();

		try {
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
				return;
			}

			await refreshUserWaterings();
			await refreshTreeWateringData(treeId, abortController);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	},

	updatePassword: async (password: string) => {
		const { error } = await supabaseClient.auth.updateUser({
			password: password,
		});

		if (error) {
			throw error;
		}
	},

	updateEmail: async (email: string) => {
		const { error } = await supabaseClient.auth.updateUser({
			email: email,
		});

		if (error) {
			throw error;
		}
	},

	updateUsername: async (username: string) => {
		const { error } = await supabaseClient
			.from("profiles")
			.update({ username: username })
			.eq("id", useAuthStore.getState().session?.user?.id ?? "")
			.select();

		if (error) {
			throw error;
		}

		await get().refreshUsername();
	},

	deleteUser: async () => {
		const token = useAuthStore.getState().session?.access_token;
		/**
		 * logout needs to happen before the account is deleted, otherwise supabase
		 * will answer with a 404 error when trying to invalidate existing sessions
		 * https://supabase.com/docs/reference/javascript/auth-signout
		 */
		await useAuthStore.getState().logout();

		const res = await fetch(
			`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/remove_account`,
			{
				mode: "cors",
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
					apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
				},
			},
		);

		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}
	},
}));
