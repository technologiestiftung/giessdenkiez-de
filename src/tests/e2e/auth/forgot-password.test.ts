import { Dialog, expect, test } from "@playwright/test";
import {
	deleteDefaultAccount,
	registerThenLogoutWithDefaultAccount,
} from "./utils";
import {
	baseUrl,
	defaultEmail,
	defaultPassword,
	inbucketUrl,
} from "./constants";

test.describe.skip("Forgot password", () => {
	test.describe("Happy Case", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLogoutWithDefaultAccount(page);
		});
		test.afterEach(async ({ page }) => {
			await deleteDefaultAccount(page);
		});

		test("should be able to reset password via e-mail", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();
			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);

			function handleEmailSentAlert(dialog: Dialog) {
				expect(dialog.message()).toBe(
					"E–Mail gesendet! Wir haben Dir eine E–Mail zum Ändern Deines Passworts gesendet. Checke Dein Postfach!",
				);
				dialog.dismiss().catch(() => {});
			}
			page.once("dialog", handleEmailSentAlert);
			await page.getByLabel("E-Mail").press("Enter");
			page.removeListener("dialog", handleEmailSentAlert);

			await page.goto(inbucketUrl);
			await page.getByPlaceholder("mailbox").click();
			await page.getByPlaceholder("mailbox").fill(defaultEmail);
			await page.getByPlaceholder("mailbox").press("Enter");
			await page.getByText("Reset Your Password").first().click();
			await page.getByRole("link", { name: "Reset password" }).click();

			await page.getByLabel("Neues Passwort").click();
			await page.getByLabel("Neues Passwort").fill(defaultPassword);

			function handlePasswordChangedAlert(dialog: Dialog) {
				expect(dialog.message()).toBe(
					'Dein Passwort wurde geändert. Klicke auf "ok" um zu deinem Profil zu kommen.',
				);
				dialog.accept().catch(() => {});
			}
			page.once("dialog", handlePasswordChangedAlert);
			await page.getByRole("button", { name: "Speichern" }).click();
			page.removeListener("dialog", handlePasswordChangedAlert);

			await page.getByRole("link", { name: "Profil" }).click();

			await expect(page.getByText("Dein ProfilDeine Ü")).toBeVisible();

			// Logout
			await page.getByRole("button", { name: "Ausloggen" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();
		});
	});

	test.describe("Client-Side Validation", () => {
		test("should not be able to reset password with empty email", async ({
			page,
		}) => {
			await page.goto(`${baseUrl}/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(" ");
			await page.getByLabel("E-Mail").press("Backspace");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		});

		test("should not be able to reset password with invalid email format", async ({
			page,
		}) => {
			await page.goto(`${baseUrl}/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		});
	});

	test.describe("Error Handling", () => {
		test("should show error toast when and unexpected error occurs", async ({
			browser,
		}) => {
			const browserContext = await browser.newContext();
			const page = await browserContext.newPage();

			await page.goto(`${baseUrl}/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);

			await browserContext.setOffline(true);

			await page.getByRole("button", { name: "Passwort zurücksetzen" }).click();

			await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
		});
	});
});
