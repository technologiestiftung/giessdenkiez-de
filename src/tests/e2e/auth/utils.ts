import { expect, Page } from "@playwright/test";
import {
	baseUrl,
	defaultEmail,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
	supabaseClient,
} from "./constants";

export async function registerThenLogoutWithDefaultAccount(page: Page) {
	const { error } = await supabaseClient.auth.signUp({
		email: defaultEmail,
		password: defaultPassword,
		options: {
			data: {
				signup_username: defaultUsername,
			},
		},
	});

	if (error) {
		throw error;
	}

	await page.goto(`${inbucketUrl}/monitor`);

	await page.getByRole("cell", { name: "<admin@email.com>" }).first().click();
	await page.getByRole("link", { name: "Confirm your email address" }).click();

	await page.getByRole("link", { name: "Profil" }).click();
	await expect(
		page.getByRole("heading", { name: "Dein Profil" }),
	).toBeVisible();

	await page.getByRole("button", { name: "Ausloggen" }).click();
	await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
}

export async function deleteDefaultAccount(page: Page) {
	await page.goto(`${baseUrl}/map`);
	await page.getByRole("link", { name: "Profil" }).click();
	await page.getByLabel("E-Mail").click();
	await page.getByLabel("E-Mail").fill(defaultEmail);
	await page.getByLabel("E-Mail").press("Tab");
	await page.getByLabel("Passwort").fill(defaultPassword);

	await page.getByRole("button", { name: "Anmelden" }).click();
	await page.getByRole("button", { name: "Account löschen" }).click();
	await page.getByRole("button", { name: "Löschen", exact: true }).click();

	await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
}
