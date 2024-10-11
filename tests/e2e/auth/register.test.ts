/* eslint-disable max-lines */
import { expect, test } from "@playwright/test";
import {
	defaultEmail,
	defaultInbucketEmailUsername,
	defaultPassword,
	defaultUsername,
	inbucketUrl,
} from "../constants";
import {
	deleteDefaultAccount,
	registerThenLogoutWithDefaultAccount,
} from "./utils";

test.describe("Register", () => {
	test.describe("Happy Case", () => {
		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should be able to register then logout", async ({
			page,
			isMobile,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");

			await page.getByLabel("Benutzername").fill(defaultUsername);
			await page.getByLabel("Benutzername").press("Tab");

			await page.getByLabel("Passwort").fill(defaultPassword);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("#register-alert-dialog")).toBeVisible();
			await page.getByRole("button", { name: "OK" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			await page.goto(`${inbucketUrl}/monitor`);

			await page
				.getByRole("cell", { name: defaultInbucketEmailUsername })
				.first()
				.click();
			await page
				.getByRole("link", { name: "Confirm your email address" })
				.click();

			// close splash screen
			if (isMobile) {
				await page.getByTestId("splash-close-button").nth(0).click();
			}

			if (!isMobile) {
				await page.getByTestId("splash-close-button").nth(1).click();
			}

			await page.getByRole("link", { name: "Profil" }).click();
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
		test("should not be able to register with empty e-mail", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(" ");
			await page.getByLabel("E-Mail").press("Backspace");
			await page.getByLabel("E-Mail").press("Tab");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		});

		test("should not be able to register with invalid e-mail format", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await expect(page.locator("input#email:invalid")).toBeVisible();
		});

		test("should not be able to register with empty username", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Benutzername").fill(" ");
			await page.getByLabel("Benutzername").press("Backspace");

			await expect(page.locator("input#username:invalid")).toBeVisible();
		});

		test("should not be able to register with invalid username format", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Benutzername").fill("a"); // too short
			await expect(page.locator("input#username:invalid")).toBeVisible();
			await expect(
				page.getByText("•mindestens 3-50 Zeichen lang sein"),
			).toBeVisible();

			await page.getByLabel("Benutzername").fill("a".repeat(51)); // too long
			await expect(page.locator("input#username:invalid")).toBeVisible();
			await expect(
				page.getByText("•mindestens 3-50 Zeichen lang sein"),
			).toBeVisible();

			await page.getByLabel("Benutzername").fill("invalid-username"); // no special characters
			await expect(page.locator("input#username:invalid")).toBeVisible();
			await expect(
				page.getByText("•und nur aus Buchstaben oder"),
			).toBeVisible();

			await page.getByLabel("Benutzername").fill("validUsername01");
			await expect(page.locator("input#username:invalid")).not.toBeVisible();
			await expect(
				page.getByText("✓mindestens 3-50 Zeichen lang sein"),
			).toBeVisible();
			await expect(
				page.getByText("✓und nur aus Buchstaben oder"),
			).toBeVisible();
		});

		test("should not be able to register with empty password", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Passwort").fill(" ");
			await page.getByLabel("Passwort").press("Backspace");

			await expect(page.locator("input#password:invalid")).toBeVisible();
		});

		test("should not be able to register with invalid password format", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Passwort").fill("a1Q!"); // too short
			await expect(page.locator("input#password:invalid")).toBeVisible();
			await expect(page.getByText("•mindestens 8 Zeichen")).toBeVisible();

			await page.getByLabel("Passwort").fill("1QQQQQQQ!"); // no lower case
			await expect(page.locator("input#password:invalid")).toBeVisible();
			await expect(page.getByText("•Klein- und Großbuchstaben")).toBeVisible();

			await page.getByLabel("Passwort").fill("aaaaaaa1!"); // no upper case
			await expect(page.locator("input#password:invalid")).toBeVisible();
			await expect(page.getByText("•Klein- und Großbuchstaben")).toBeVisible();

			await page.getByLabel("Passwort").fill("a1QQQQQQQ"); // no special characters
			await expect(page.locator("input#password:invalid")).toBeVisible();
			await expect(
				page.getByText("•mindestens ein Sonderzeichen"),
			).toBeVisible();

			await page.getByLabel("Passwort").fill("aQQQQQQQ!"); // no number
			await expect(page.locator("input#password:invalid")).toBeVisible();
			await expect(page.getByText("•mindestens eine Zahl")).toBeVisible();

			await page.getByLabel("Passwort").fill("VALID-password-01");
			await expect(page.locator("input#password:invalid")).not.toBeVisible();
			await expect(page.getByText("✓mindestens 8 Zeichen")).toBeVisible();
			await expect(page.getByText("✓Klein- und Großbuchstaben")).toBeVisible();
			await expect(
				page.getByText("✓mindestens ein Sonderzeichen"),
			).toBeVisible();
			await expect(page.getByText("✓mindestens eine Zahl")).toBeVisible();
		});
	});

	test.describe("Server-Side Validation", () => {
		test.beforeEach(async ({ page, isMobile }) => {
			await registerThenLogoutWithDefaultAccount({ page, isMobile });
		});

		test.afterEach(async () => {
			await deleteDefaultAccount();
		});

		test("should not be able to register with already registered e-mail", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill("username1");
			await page.getByLabel("Benutzername").press("Tab");
			await page.getByLabel("Passwort").fill(defaultPassword);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.getByText("Ein Konto mit dieser E-Mail")).toBeVisible();
		});

		test("should not be able to register with already registered username", async ({
			page,
		}) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill(defaultUsername);
			await page.getByLabel("Benutzername").press("Tab");

			// wait for username is duplicate check debouncing
			await new Promise((resolve) => setTimeout(resolve, 1000));

			await expect(page.getByText("Dieser Benutzername ist")).toBeVisible();
		});
	});

	test.describe("Error Handling", () => {
		test("should show error toast when and unexpected error occurs", async ({
			browser,
		}) => {
			const browserContext = await browser.newContext();
			const page = await browserContext.newPage();

			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(defaultEmail);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill(defaultUsername);
			await page.getByLabel("Benutzername").press("Tab");
			await page.getByLabel("Passwort").fill(defaultPassword);

			await browserContext.setOffline(true);

			await page.getByRole("button", { name: "Registrieren" }).click();

			await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
		});
	});
});
