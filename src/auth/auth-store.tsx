/* eslint-disable max-lines */
import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase-client";
import { useI18nStore } from "../i18n/i18n-store";

interface Credentials {
	email: string;
	password: string;
}

interface RegistrationCredentials extends Credentials {
	username: string;
}

interface TreeInfo {
	id: string;
	artdtsch: string;
	trees_watered: Array<{ id: string; amount: number }>;
	reducedWateringAmount: number;
	wateringCount: number;
}

interface AuthState {
	session: Session | null | undefined;
	username: string | null;
	isLoggedIn: () => boolean | undefined;
	getUserData: () => User | undefined;
	refreshUsername: () => Promise<void>;
	login: ({ email, password }: Credentials) => Promise<void>;
	logout: () => Promise<void>;
	register: ({
		email,
		username,
		password,
	}: RegistrationCredentials) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	updatePassword: (password: string) => Promise<void>;
	updateEmail: (email: string) => Promise<void>;
	updateUsername: (username: string) => Promise<void>;
	deleteUser: () => Promise<void>;
	adoptedTrees: Array<string>;
	adoptedTreesInfo: Array<TreeInfo>;
	refreshAdoptedTrees: () => Promise<void>;
	refreshAdoptedTreesInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => {
	supabaseClient.auth.getSession().then(({ data: { session } }) => {
		set({ session });
		get().refreshUsername();
		get().refreshAdoptedTreesInfo();
		get().refreshUsername().catch(console.error);
	});

	supabaseClient.auth.onAuthStateChange((_event, session) => {
		set({ session });
		get().refreshAdoptedTreesInfo();
		get().refreshUsername().catch(console.error);
	});

	return {
		session: null,
		username: null,
		adoptedTrees: [],
		adoptedTreesInfo: [],

		isLoggedIn: () => {
			if (get().session === undefined) {
				return undefined;
			}

			return get().session !== null && get().session !== undefined;
		},

		getUserData: () => {
			if (get().session === undefined) {
				return undefined;
			}

			return get().session?.user;
		},

		refreshAdoptedTrees: async () => {
			const { data, error } = await supabaseClient
				.from("trees_adopted")
				.select("tree_id")
				.eq("uuid", get().session?.user?.id);

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

		refreshAdoptedTreesInfo: async () => {
			if (!get().session) {
				return;
			}

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

			const reducedWateringAmountperTree = data.map((tree) => {
				const reducedWateringAmount = tree.trees_watered.reduce(
					(acc: number, curr: { amount: number }) => acc + Number(curr.amount),
					0,
				);
				const wateringCount = tree.trees_watered.length;
				return {
					id: tree.id,
					artdtsch: tree.artdtsch,
					trees_watered: tree.trees_watered,
					reducedWateringAmount,
					wateringCount,
				};
			}, 0);

			set({
				adoptedTreesInfo: reducedWateringAmountperTree,
			});
		},

		refreshUsername: async () => {
			if (!get().session) {
				return;
			}

			const { data, error } = await supabaseClient
				.from("profiles")
				.select("username")
				.eq("id", get().session?.user?.id);

			if (error) {
				throw error;
			}

			const currentUsername = await data[0].username;
			set({ username: currentUsername });
		},

		login: async ({ email, password }) => {
			const { data, error } = await supabaseClient.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				throw error;
			}

			set({ session: data.session });
		},

		logout: async () => {
			const { error } = await supabaseClient.auth.signOut();

			if (error) {
				throw error;
			}

			set({ session: null });
		},

		register: async ({ email, username, password }) => {
			const { error } = await supabaseClient.auth.signUp({
				email,
				password,
				options: {
					data: {
						signup_username: username,
					},
				},
			});

			if (error) {
				throw error;
			}

			(
				document.getElementById("alert-dialog") as HTMLDialogElement
			).showModal();
		},

		deleteUser: async () => {
			const token = get().session?.access_token;
			/**
			 * logout needs to happen before the account is deleted, otherwise supabase
			 * will answer with a 404 error when trying to invalidate existing sessions
			 * https://supabase.com/docs/reference/javascript/auth-signout
			 */
			await get().logout();

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

		forgotPassword: async (email: string) => {
			const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
				redirectTo: import.meta.env.VITE_RECOVERY_AUTH_REDIRECT_URL,
			});

			if (error) {
				throw error;
			}

			(
				document.getElementById("alert-dialog") as HTMLDialogElement
			).showModal();
		},

		updatePassword: async (password: string) => {
			const { error } = await supabaseClient.auth.updateUser({
				password: password,
			});

			if (error) {
				throw error;
			}

			(
				document.getElementById("alert-dialog") as HTMLDialogElement
			).showModal();
		},

		updateEmail: async (email: string) => {
			const { error } = await supabaseClient.auth.updateUser({
				email: email,
			});

			if (error) {
				throw error;
			}

			alert(
				useI18nStore.getState().i18n().navbar.profile.settings
					.updateEmailEmailSent,
			);
		},

		updateUsername: async (username: string) => {
			const { error } = await supabaseClient
				.from("profiles")
				.update({ username: username })
				.eq("id", get().session?.user?.id ?? "")
				.select();

			if (error) {
				throw error;
			}

			await get().refreshUsername();
		},
	};
});
