import { expect, Page } from "@playwright/test";
import {
	changedEmail,
	defaultEmail,
	defaultInbucketEmailUsername,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
	supabaseAnonKey,
	supabaseApiUrl,
	supabaseClient,
} from "./constants";

export async function registerThenLogoutWithDefaultAccount(page: Page) {
	await registerThenLoginWithDefaultAccount(page);

	await page.getByRole("button", { name: "Ausloggen" }).click();
	await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
}

export async function registerThenLoginWithDefaultAccount(page: Page) {
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

	await page
		.getByRole("cell", { name: defaultInbucketEmailUsername })
		.first()
		.click();
	await page.getByRole("link", { name: "Confirm your email address" }).click();

	// close splash screen
	await page.getByRole("button", { name: "Los geht's" }).click();

	await page.getByRole("link", { name: "Profil" }).click();
	await expect(
		page.getByRole("heading", { name: "Dein Profil" }),
	).toBeVisible();
}

export async function deleteDefaultAccount() {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: defaultEmail,
		password: defaultPassword,
	});

	expect(error).toBeNull();
	expect(data.session).toBeDefined();
	expect(data.user).toBeDefined();

	const response = await fetch(`${supabaseApiUrl}/rest/v1/rpc/remove_account`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${data.session?.access_token}`,
			"Content-Type": "application/json",
			apikey: supabaseAnonKey,
		},
	});

	if (!response.ok) {
		console.error(await response.text());
	}

	expect(response.ok).toBeTruthy();
}

export async function deleteChangedEmailAccount() {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: changedEmail,
		password: defaultPassword,
	});

	expect(error).toBeNull();
	expect(data.session).toBeDefined();
	expect(data.user).toBeDefined();

	const response = await fetch(`${supabaseApiUrl}/rest/v1/rpc/remove_account`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${data.session?.access_token}`,
			"Content-Type": "application/json",
			apikey: supabaseAnonKey,
		},
	});

	if (!response.ok) {
		console.error(await response.text());
	}

	expect(response.ok).toBeTruthy();
}
