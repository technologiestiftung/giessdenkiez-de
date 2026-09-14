import { expect } from "@playwright/test";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";
import { testWithRegisteredUser } from "../fixtures/test-with-registered-user";
import { testWithUnregisteredAccount } from "../fixtures/test-with-unregistered-account";
import { waitForEmailLink } from "../mailpit";
import { waitForStoredSession } from "../session";

testWithUnregisteredAccount.describe("Register - Happy Case", () => {
	testWithUnregisteredAccount(
		"should be able to register then logout",
		async ({ page, newAccount }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(newAccount.email);
			await page.getByLabel("E-Mail").press("Tab");

			await page.getByLabel("Benutzername").fill(newAccount.username);
			await page.getByLabel("Benutzername").press("Tab");

			await page.getByLabel("Passwort").fill(newAccount.password);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.locator("#register-alert-dialog")).toBeVisible();
			await page.getByRole("button", { name: "OK" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			// Confirm the address by following the link from the mail sent to this
			// account, read through the Mailpit API.
			await page.goto(
				await waitForEmailLink({
					email: newAccount.email,
					subject: "Confirm your email address",
				}),
			);

			// The app writes the session from the URL hash asynchronously.
			await waitForStoredSession(page, { email: newAccount.email });

			await page.goto(`/profile`);
			await expect(
				page.getByRole("heading", { name: "Dein Profil" }),
			).toBeVisible();

			await page.getByRole("button", { name: "Ausloggen" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();
		},
	);
});

testWithoutSplashScreen.describe("Register - Client-Side Validation", () => {
	testWithoutSplashScreen(
		"should not be able to register with empty e-mail",
		async ({ page }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(" ");
			await page.getByLabel("E-Mail").press("Backspace");
			await page.getByLabel("E-Mail").press("Tab");

			await expect(page.locator("input#email:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to register with invalid e-mail format",
		async ({ page }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill("invalid-email");
			await expect(page.locator("input#email:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to register with empty username",
		async ({ page }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Benutzername").fill(" ");
			await page.getByLabel("Benutzername").press("Backspace");

			await expect(page.locator("input#username:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to register with invalid username format",
		async ({ page }) => {
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
		},
	);

	testWithoutSplashScreen(
		"should not be able to register with empty password",
		async ({ page }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("Passwort").fill(" ");
			await page.getByLabel("Passwort").press("Backspace");

			await expect(page.locator("input#password:invalid")).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should not be able to register with invalid password format",
		async ({ page }) => {
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
		},
	);
});

testWithRegisteredUser.describe("Register - Server-Side Validation", () => {
	testWithRegisteredUser(
		"should not be able to register with already registered e-mail",
		async ({ page, account }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(account.email);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill(`${account.username}other`);
			await page.getByLabel("Benutzername").press("Tab");
			await page.getByLabel("Passwort").fill(account.password);
			await page.getByLabel("Passwort").press("Enter");

			await expect(page.getByText("Ein Konto mit dieser E-Mail")).toBeVisible();
		},
	);

	testWithRegisteredUser(
		"should not be able to register with already registered username",
		async ({ page, account }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(account.email);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill(account.username);
			await page.getByLabel("Benutzername").press("Tab");

			await expect(page.getByText("Dieser Benutzername ist")).toBeVisible();
		},
	);
});

testWithUnregisteredAccount.describe("Register - Error Handling", () => {
	testWithUnregisteredAccount(
		"should show error toast when and unexpected error occurs",
		async ({ page, newAccount }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Registriere Dich" }).click();

			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(newAccount.email);
			await page.getByLabel("E-Mail").press("Tab");
			await page.getByLabel("Benutzername").fill(newAccount.username);
			await page.getByLabel("Benutzername").press("Tab");
			await page.getByLabel("Passwort").fill(newAccount.password);

			await page.context().setOffline(true);

			await page.getByRole("button", { name: "Registrieren" }).click();

			await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
		},
	);
});
