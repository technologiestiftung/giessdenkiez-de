import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase-client";
import { useProfileStore } from "../shared-stores/profile-store";

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
	login: ({ email, password }: Credentials) => Promise<void>;
	logout: () => Promise<void>;
	register: ({
		email,
		username,
		password,
	}: RegistrationCredentials) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => {
	supabaseClient.auth.getSession().then(({ data: { session } }) => {
		set({ session });
		useProfileStore.getState().refresh();
	});

	supabaseClient.auth.onAuthStateChange((_event, session) => {
		set({ session });
		useProfileStore.getState().refresh();
	});

	return {
		session: null,

		isLoggedIn: () => {
			if (get().session === undefined) {
				return undefined;
			}

			return get().session !== null && get().session !== undefined;
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
		},

		forgotPassword: async (email: string) => {
			const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
				redirectTo: import.meta.env.VITE_RECOVERY_AUTH_REDIRECT_URL,
			});

			if (error) {
				throw error;
			}
		},
	};
});
