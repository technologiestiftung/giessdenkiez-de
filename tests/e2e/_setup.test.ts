import { expect, test } from "@playwright/test";
import {
	defaultEmail,
	defaultInbucketEmailUsername,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
	supabaseAnonKey,
	supabaseApiUrl,
	supabaseClient,
} from "./constants";

test.describe("Setup", () => {
	test("should check if all environment/default variables are set", () => {
		expect(supabaseApiUrl).not.toBe("");
		expect(supabaseAnonKey).not.toBe("");
		expect(inbucketUrl).not.toBe("");
		expect(defaultEmail).toBeDefined();
		expect(defaultInbucketEmailUsername).toBeDefined();
		expect(defaultUsername).toBeDefined();
		expect(defaultPassword).toBeDefined();
		expect(process.env.VITE_MAPBOX_API_KEY).toBeDefined();
	});

	test("should check if supabase API and inbucket are running locally", async () => {
		const apiResponse = await fetch(`${supabaseApiUrl}/rest/v1/`, {
			method: "OPTIONS",
		});
		expect(apiResponse.status).toBe(200);

		const inbucketResponse = await fetch(inbucketUrl, { method: "OPTIONS" });
		expect(inbucketResponse.status).toBe(200);
	});

	test("should check if default user account already exists", async () => {
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: defaultEmail,
			password: defaultPassword,
		});

		expect(error?.message).toBe("Invalid login credentials");
		expect(data.session).toBeNull();
		expect(data.user).toBeNull();
	});
});
