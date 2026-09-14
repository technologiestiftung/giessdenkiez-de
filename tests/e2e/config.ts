import "dotenv/config";

type Config = {
	supabaseUrl: string;
	supabaseAnonKey: string;
	supabaseServiceRoleKey: string;
	mailpitUrl: string;
};

export const config: Config = {
	supabaseUrl: process.env.VITE_SUPABASE_URL ?? "",
	supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY ?? "",
	/**
	 * Never prefixed with `VITE_`: a service role key in a `VITE_` variable
	 * would be inlined into the client bundle by Vite.
	 */
	supabaseServiceRoleKey: process.env.TEST_SUPABASE_SERVICE_ROLE_KEY ?? "",
	/**
	 * Supabase replaced Inbucket with Mailpit; the port (54324) stayed the same,
	 * so the old variable name is still accepted.
	 */
	mailpitUrl:
		process.env.TEST_SUPABASE_MAILPIT_URL ??
		process.env.TEST_SUPABASE_INBUCKET_URL ??
		"",
};

export function verifyConfig() {
	if (!config.supabaseUrl) {
		throw new Error("VITE_SUPABASE_URL must be defined");
	}
	if (!config.supabaseAnonKey) {
		throw new Error("VITE_SUPABASE_ANON_KEY must be defined");
	}
	if (!config.supabaseServiceRoleKey) {
		throw new Error("TEST_SUPABASE_SERVICE_ROLE_KEY must be defined");
	}

	assertLocalTarget();
}

/**
 * The fixtures create and delete users and write waterings/adoptions with a
 * service role key, so they must never point at staging or production.
 */
function assertLocalTarget() {
	let host: string;
	try {
		host = new URL(config.supabaseUrl).hostname;
	} catch {
		throw new Error(
			`VITE_SUPABASE_URL is not a valid URL: "${config.supabaseUrl}"`,
		);
	}

	const localHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
	if (!localHosts.includes(host)) {
		throw new Error(
			`Refusing to run e2e tests: VITE_SUPABASE_URL points to a non-local target ("${config.supabaseUrl}"). ` +
				"These tests seed and mutate data and are only meant to run against a local Supabase instance. " +
				"Check your environment variables - they may be pointing at staging/production.",
		);
	}
}

/**
 * The localStorage key supabase-js uses to persist the session. It is derived
 * from the Supabase URL the app is built with, so the fixtures compute it the
 * same way instead of hardcoding it (see SupabaseClient: `sb-${hostname
 * .split(".")[0]}-auth-token`).
 */
export function getAuthStorageKey() {
	return `sb-${new URL(config.supabaseUrl).hostname.split(".")[0]}-auth-token`;
}
