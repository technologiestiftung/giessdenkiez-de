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
		expect(process.env.VITE_MAPBOX_API_KEY).toBeDefined();
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

	test.skip("should check if default user account already exists", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/map");
		await page.getByRole("link", { name: "Profil" }).click();
		await page.getByLabel("E-Mail").click();
		await page.getByLabel("E-Mail").fill("user@example.com");
		await page.getByLabel("E-Mail").press("Tab");
		await page.getByLabel("Passwort").fill('123qwe!"§QWE');
		await page.getByRole("button", { name: "Anmelden" }).click();
		await expect(page.getByText("Falsches Passwort oder E-Mail")).toBeVisible();
	});
});
