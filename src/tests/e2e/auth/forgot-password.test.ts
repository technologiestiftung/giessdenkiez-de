import { expect, test } from "@playwright/test";
import {
	deleteDefaultAccount,
	registerThenLogoutWithDefaultAccount,
} from "./utils";
import {
	baseUrl,
	defaultEmail,
	defaultInbucketEmailUsername,
	defaultPassword,
	inbucketUrl,
} from "./constants";

test.describe("Forgot password", () => {
	test.describe("Happy Case", () => {
		test.beforeEach(async ({ page }) => {
			await registerThenLogoutWithDefaultAccount(page);
		});
		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should be able to reset password via e-mail", async ({ page }) => {
			await page.goto(`${baseUrl}/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();
			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Enter");

			await page.goto(`${inbucketUrl}/monitor`);

			await page
				.getByRole("cell", { name: defaultInbucketEmailUsername })
				.first()
				.click();
			await page.getByRole("link", { name: "Reset password" }).click();

			await page.getByLabel("Neues Passwort").click();
			await page.getByLabel("Neues Passwort").fill(defaultPassword);

			await page.getByRole("button", { name: "Speichern" }).click();

			await expect(page.locator("#alert-dialog")).toBeVisible();
			await page.getByRole("button", { name: "OK" }).click();

			await expect(
				page.getByRole("heading", { name: "Dein Profil" }),
			).toBeVisible();

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
