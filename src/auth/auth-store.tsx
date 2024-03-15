import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase-client";
import { useUrlState } from "../components/router/store";

interface Credentials {
	email: string;
	password: string;
}

interface RegistrationCredentials extends Credentials {
	username: string;
}

interface AuthState {
	session: Session | null | undefined;
	isLoggedIn: () => boolean | undefined;
	getUserData: () => User | undefined;
	login: ({ email, password }: Credentials) => void;
	logout: () => void;
	register: ({
		email,
		username,
		password,
	}: RegistrationCredentials) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	updatePassword: (password: string) => Promise<void>;
	updateEmail: (email: string) => Promise<void>;
	updateUsername: (username: string) => Promise<void>;
	deleteUser: (userID: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => {
	supabaseClient.auth.getSession().then(({ data: { session } }) => {
		set({ session });
	});

	supabaseClient.auth.onAuthStateChange((_event, session) => {
		set({ session });
	});

	return {
		session: null,

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

		login: async ({ email, password }) => {
			const { data, error } = await supabaseClient.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				throw error;
			}

			if (!data) {
				throw new Error("data is null");
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
			const { data, error } = await supabaseClient.auth.signUp({
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

			if (!data) {
				throw new Error("data is null");
			}

			set({ session: data.session });
		},

		deleteUser: async (userID: string) => {
			const { data, error } =
				await supabaseClient.auth.admin.deleteUser(userID);

			if (error) {
				alert(error.message);
				throw error;
			}

			if (!data) {
				throw new Error("data is null");
			}
		},

		forgotPassword: async (email: string) => {
			const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
				email,
				{
					redirectTo: import.meta.env.VITE_RECOVERY_AUTH_REDIRECT_URL,
				},
			);

			if (error) {
				alert(error.message);

				throw error;
			}

			if (data) {
				alert(
					"E–Mail gesendet! Wir haben Dir eine E–Mail zum Ändern Deines Passworts gesendet. Checke Dein Postfach!",
				);
			}
		},

		updatePassword: async (password: string) => {
			const { data, error } = await supabaseClient.auth.updateUser({
				password: password,
			});

			if (error) {
				alert(error.message);

				throw error;
			}

			if (!data) {
				throw new Error("data is null");
			}

			if (
				!window.confirm(
					'Dein Passwort wurde geändert. Klicke auf "ok" um zu deinem Profil zu kommen.',
				)
			) {
				return;
			}

			useUrlState.getState().setPathname("/profile");
		},

		updateEmail: async (email: string) => {
			const { data, error } = await supabaseClient.auth.updateUser({
				email: email,
			});

			if (error) {
				alert(error.message);
				throw error;
			}

			if (!data) {
				throw new Error("data is null");
			}

			alert(
				"Wir haben an Deine alte und neue E–Mail einen Bestätigungslink zum Ändern Deiner Email gesendet. Checke Deine Postfächer und logge Dich neu ein!",
			);
		},

		updateUsername: async (username: string) => {
			const { data, error } = await supabaseClient.auth.updateUser({
				data: {
					signup_username: username,
				},
			});

			if (error) {
				alert(error.message);

				throw error;
			}

			if (!data) {
				throw new Error("data is null");
			}
		},
	};
});
