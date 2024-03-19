import { expect, test } from "@playwright/test";
import {
	baseUrl,
	defaultEmail,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
	supabaseAnonKey,
	supabaseApiUrl,
} from "./constants";

test.describe("Setup", () => {
	test("should check if all environment/default variables are set", () => {
		expect(baseUrl).toBeDefined();
		expect(supabaseApiUrl).not.toBe("");
		expect(supabaseAnonKey).not.toBe("");
		expect(inbucketUrl).not.toBe("");
		expect(defaultEmail).toBeDefined();
		expect(defaultUsername).toBeDefined();
		expect(defaultPassword).toBeDefined();
	});
	test("should check if supabase API and inbucket are running locally", async ({
		page,
	}) => {
		await page.goto(supabaseApiUrl);
		await expect(page.getByText('{"message":"no Route matched')).toBeVisible();

		await page.goto(inbucketUrl);
		await expect(
			page.getByRole("heading", { name: "Welcome to Inbucket" }),
		).toBeVisible();
	});
});
