import { expect, test } from "@playwright/test";
import {
	deleteChangedEmailAccount,
	deleteDefaultAccount,
	registerThenLoginWithDefaultAccount,
} from "./utils.ts";
import {
	baseUrl,
	changedEmail,
	changedInbucketEmailUsername,
	defaultEmail,
	defaultInbucketEmailUsername,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
	supabaseClient,
} from "./constants.ts";

test.describe("Edit user", () => {
	test.describe("Edit Username", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLoginWithDefaultAccount(page);
		});

		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should be able to edit username", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);

			await page
				.locator("div")
				.filter({ hasText: new RegExp(`^${defaultUsername}$`) })
				.getByRole("button")
				.click();

			const newUsername = `${defaultUsername}1`;

			await page.getByLabel("Neuer Benutzername").fill(newUsername);
			await page.getByLabel("Neuer Benutzername").press("Enter");

			await expect(
				page.locator("div").filter({ hasText: new RegExp(`^${newUsername}$`) }),
			).toBeVisible();
		});
	});

	test.describe("Edit Email", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLoginWithDefaultAccount(page);
		});

		test.afterEach(async () => {
			await deleteChangedEmailAccount();
		});

		test("should be able to edit e-mail", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);

			await page
				.locator("div")
				.filter({ hasText: new RegExp(`^${defaultEmail}$`) })
				.getByRole("button")
				.click();

			await page.getByLabel("Passwort").fill(changedEmail);
			await page.getByLabel("Passwort").press("Enter");
			await page.getByRole("button", { name: "OK" }).click();

			await page.goto(`${inbucketUrl}/monitor`);

			await page
				.getByRole("cell", { name: changedInbucketEmailUsername })
				.first()
				.click();
			await page.getByRole("link", { name: "Change email address" }).click();

			// close splash screen
			await page.getByRole("button", { name: "Los geht's" }).click();

			await page.getByRole("link", { name: "Profil" }).click();

			await expect(
				page
					.locator("div")
					.filter({ hasText: new RegExp(`^${changedEmail}$`) }),
			).toBeVisible();
		});
	});

	test.describe("Edit password", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLoginWithDefaultAccount(page);
		});

		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should be able to edit password", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByRole("button", { name: "Passwort ändern" }).click();
			await page.getByRole("button", { name: "OK" }).click();

			await page.goto(`${inbucketUrl}/monitor`);

			await page
				.getByRole("cell", { name: defaultInbucketEmailUsername })
				.first()
				.click();
			await page.getByRole("link", { name: "Reset password" }).click();

			await expect(page.getByText("Passwort ändern")).toBeVisible();
		});
	});

	test.describe("Delete account", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLoginWithDefaultAccount(page);
		});

		test("should be able to delete account", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByRole("button", { name: "Account löschen" }).click();
			await page.getByRole("button", { name: "Löschen", exact: true }).click();

			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			const { error } = await supabaseClient.auth.signInWithPassword({
				email: defaultEmail,
				password: defaultPassword,
			});

			expect(error?.message).toBe("Invalid login credentials");
		});
	});
});
