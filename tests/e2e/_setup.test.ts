import { expect, test } from "@playwright/test";
import { config } from "./config";
import { supabaseAdminClient } from "./supabase";

test.describe("Setup", () => {
	test("should check if all environment variables are set", () => {
		// `verifyConfig` in the global setup already fails the run on missing
		// values; this asserts the same from inside the report.
		expect(config.supabaseUrl).not.toBe("");
		expect(config.supabaseAnonKey).not.toBe("");
		expect(config.supabaseServiceRoleKey).not.toBe("");
		expect(config.mailpitUrl).not.toBe("");
		expect(process.env.VITE_MAPBOX_API_KEY).toBeDefined();
	});

	test("should check if supabase API and mailpit are running locally", async () => {
		const apiResponse = await fetch(`${config.supabaseUrl}/rest/v1/`, {
			method: "OPTIONS",
		});
		expect(apiResponse.status).toBe(200);

		// Mailpit answers OPTIONS with 405, so probe it with a GET.
		const mailpitResponse = await fetch(`${config.mailpitUrl}/api/v1/info`);
		expect(mailpitResponse.status).toBe(200);
	});

	test("should be able to reach the database with the service role key", async () => {
		const { error } = await supabaseAdminClient
			.from("profiles")
			.select("id", { count: "exact", head: true });

		expect(error).toBeNull();
	});
});
