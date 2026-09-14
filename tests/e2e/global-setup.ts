import { verifyConfig } from "./config";

/**
 * Runs once before the whole test run: fails fast on missing environment
 * variables and refuses to run against anything but a local Supabase instance.
 */
export default function globalSetup() {
	verifyConfig();
}
