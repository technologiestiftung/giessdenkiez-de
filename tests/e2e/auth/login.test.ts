import { expect } from "@playwright/test";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";
import { testWithRegisteredUser } from "../fixtures/test-with-registered-user";

testWithRegisteredUser.describe("Login - Happy Case", () => {
	testWithRegisteredUser(
		"should be able to log-in then log-out",
		async ({ page, account }) => {
			await page.goto(`/map`);

			// Go to profile
			await page.getByRole("link", { name: "Profil" }).click();

			// Login with the account created by the fixture
			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(account.email);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(account.password);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.getByText("Dein ProfilDeine Ü")).toBeVisible();

			// Logout
			await page.getByRole("button", { name: "Ausloggen" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();
		},
	);
});

testWithoutSplashScreen.describe("Login - Client-Side Validation", () => {
	testWithoutSplashScreen(
		"should not be able to log-in with empty email",
		async ({ page }) => {
			await page.goto(`/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(" ");
			await page.getByLabel("E-Mail").press("Backspace");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill("123");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to log-in with invalid email format",
		async ({ page }) => {
			await page.goto(`/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill("123");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to log-in with empty password",
		async ({ page }) => {
			await page.goto(`/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(" ");
			await page.getByLabel("Passwort").press("Backspace");
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("input#password:invalid")).toBeVisible();
		},
	);
});

testWithoutSplashScreen.describe("Login - Server-Side Validation", () => {
	testWithoutSplashScreen(
		"should not be able to log-in with wrong email/password credentials",
		async ({ page }) => {
			await page.goto(`/profile`);

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
		},
	);
});

testWithRegisteredUser.describe("Login - Error Handling", () => {
	testWithRegisteredUser(
		"should show error toast when and unexpected error occurs",
		async ({ page, account }) => {
			await page.goto(`/profile`);

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(account.email);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Passwort").fill(account.password);

			await page.context().setOffline(true);

			await page.getByRole("button", { name: "Anmelden" }).click();

			await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
		},
	);
});
