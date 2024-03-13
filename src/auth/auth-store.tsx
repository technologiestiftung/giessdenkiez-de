import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase-client.ts";

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
  login: ({ email, password }: Credentials) => void;
  logout: () => void;
  register: ({ email, username, password }: RegistrationCredentials) => void;
  forgotPassword: (email: string) => void;
  updatePassword: (password: string) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => {
  console.log("initialize auth store");
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

      return !!get().session;
    },

    login: async ({ email, password }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        return;
      }

      if (!data) {
        console.error("data is null");
        return;
      }

      console.log("login success:", data);
      set({ session: data.session });
    },

    logout: async () => {
      console.log("onLogout");

      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        console.error(error);
        return;
      }

      console.log("success logout");
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
        console.error(error);
        return;
      }

      if (!data) {
        console.error("data is null");
        return;
      }

      console.log("login success:", data);
      set({ session: data.session });
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

      if (data) {
        alert("Dein Passwort wurde geändert!");
      }

      console.log("Update password success:", data);
    },
  };
});
