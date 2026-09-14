import { expect } from "@playwright/test";
import { createAccountCredentials } from "../fixtures/account";
import { testWithLoggedInUser } from "../fixtures/test-with-logged-in-user";
import { createAnonClient } from "../supabase";
import { deleteMessagesTo, waitForEmailLink } from "../mailpit";
import { waitForStoredSession } from "../session";

/**
 * Adds a second, unused address the e-mail-change test can move the account to.
 * The account itself is cleaned up by id, so the change does not escape the
 * registered-user fixture's cleanup.
 */
const testWithChangedEmail = testWithLoggedInUser.extend<{
	changedEmail: string;
}>({
	changedEmail: [
		// eslint-disable-next-line no-empty-pattern
		async ({}, use) => {
			const { email } = createAccountCredentials("e2e-changed");

			await use(email);

			await deleteMessagesTo(email);
		},
		{ scope: "test" },
	],
});

testWithLoggedInUser.describe("Edit user - Edit Username", () => {
	testWithLoggedInUser(
		"should be able to edit username",
		async ({ page, account }) => {
			await page.goto(`/profile`);

			await page
				.locator("div")
				.filter({ hasText: new RegExp(`^${account.username}$`) })
				.getByRole("button")
				.click();

			const newUsername = `${account.username}1`;

			await page.getByLabel("Neuer Benutzername").fill(newUsername);
			await page.getByLabel("Neuer Benutzername").press("Enter");

			await expect(
				page.locator("div").filter({ hasText: new RegExp(`^${newUsername}$`) }),
			).toBeVisible();
		},
	);
});

testWithChangedEmail.describe("Edit user - Edit Email", () => {
	testWithChangedEmail(
		"should be able to edit e-mail",
		async ({ page, account, changedEmail }) => {
			await page.goto(`/profile`);

			await page
				.locator("div")
				.filter({ hasText: new RegExp(`^${account.email}$`) })
				.getByRole("button")
				.click();

			await page.getByLabel("Passwort").fill(changedEmail);
			await page.getByLabel("Passwort").press("Enter");
			await page.getByRole("button", { name: "OK" }).click();

			await page.goto(
				await waitForEmailLink({
					email: changedEmail,
					subject: "Confirm your new email address",
				}),
			);

			// The confirmation hands the app a new session carrying the new
			// address; it is stored asynchronously.
			await waitForStoredSession(page, { email: changedEmail });

			// Navigate inside the app: a full page load would re-run the fixture's
			// init script and put the original session back.
			await page.getByRole("link", { name: "Profil" }).click();

			await expect(
				page
					.locator("div")
					.filter({ hasText: new RegExp(`^${changedEmail}$`) }),
			).toBeVisible();
		},
	);
});

testWithLoggedInUser.describe("Edit user - Edit password", () => {
	testWithLoggedInUser(
		"should be able to edit password",
		async ({ page, account }) => {
			await page.goto(`/profile`);

			await page.getByRole("button", { name: "Passwort ändern" }).click();
			await page.getByRole("button", { name: "OK" }).click();

			await page.goto(
				await waitForEmailLink({
					email: account.email,
					subject: "Reset your password",
				}),
			);

			await expect(page.getByText("Passwort ändern")).toBeVisible();
		},
	);
});

testWithLoggedInUser.describe("Edit user - Delete account", () => {
	testWithLoggedInUser(
		"should be able to delete account",
		async ({ page, account }) => {
			await page.goto(`/profile`);

			await page.getByRole("button", { name: "Account löschen" }).click();
			await page.getByRole("button", { name: "Löschen", exact: true }).click();

			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			// Poll: the deletion is confirmed in the UI slightly before GoTrue
			// stops accepting the credentials.
			await expect
				.poll(async () => {
					const { error } = await createAnonClient().auth.signInWithPassword({
						email: account.email,
						password: account.password,
					});
					return error?.message;
				})
				.toBe("Invalid login credentials");
		},
	);
});
