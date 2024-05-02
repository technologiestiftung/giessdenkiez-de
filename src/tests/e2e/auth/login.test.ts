import { expect, test } from "@playwright/test";
import {
	deleteDefaultAccount,
	registerThenLogoutWithDefaultAccount,
} from "./utils";
import { baseUrl, defaultEmail, defaultPassword } from "./constants";

test.describe("Login", () => {
	test.describe("Happy Case", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLogoutWithDefaultAccount(page);
		});
		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should be able to log-in then log-out", async ({ page }) => {
			await page.goto(`${baseUrl}/map`);

			// Go to profile
			await page.getByRole("link", { name: "Profil" }).click();

			// Login with new account
			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(defaultPassword);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.getByText("Dein ProfilDeine Ü")).toBeVisible();

			// Logout
			await page.getByRole("button", { name: "Ausloggen" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();
		});
	});

	test.describe("Client-Side Validation", () => {
		test("should not be able to log-in with empty email", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(" ");
			await page.getByLabel("E-Mail").press("Backspace");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill("123");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		});

		test("should not be able to log-in with invalid email format", async ({
			page,
		}) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill("123");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		});

		test("should not be able to log-in with empty password", async ({
			page,
		}) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(" ");
			await page.getByLabel("Passwort").press("Backspace");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#password:invalid")).toBeVisible();
		});
	});

	test.describe("Server-Side Validation", () => {
		test("should not be able to log-in with wrong email/password credentials", async ({
			page,
		}) => {
			await page.goto(`${baseUrl}/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("email-with-no-account@example.com");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill("invalid-password");
			await page.getByLabel("Passwort").press("Enter");
			await expect(
				page
					.locator("div")
					.filter({ hasText: /^Falsches Passwort oder E-Mail Adresse$/ })
					.nth(2),
			).toBeVisible();
		});
	});

	test.describe("Error Handling", () => {
		test("should show error toast when and unexpected error occurs", async ({
			browser,
		}) => {
			const browserContext = await browser.newContext();
			const page = await browserContext.newPage();

			await page.goto(`${baseUrl}/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(defaultPassword);

			await browserContext.setOffline(true);

			await page.getByRole("button", { name: "Anmelden" }).click();

			await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
		});
	});
});
