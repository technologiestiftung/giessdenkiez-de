import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

/**
 * Bypasses RLS. Only for setting up and tearing down test data - never for
 * anything the app itself does.
 */
export const supabaseAdminClient = createClient(
	config.supabaseUrl,
	config.supabaseServiceRoleKey,
	{ auth: { persistSession: false, autoRefreshToken: false } },
);

/**
 * Creates a fresh, unauthenticated anon client. Sign-in flows must use their
 * own instance instead of a shared singleton: under parallel workers,
 * concurrent `signInWithPassword` calls on one client clobber each other's
 * session. `persistSession: false` keeps the returned session in-hand without
 * mutating any shared storage.
 */
export function createAnonClient() {
	return createClient(config.supabaseUrl, config.supabaseAnonKey, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
}
