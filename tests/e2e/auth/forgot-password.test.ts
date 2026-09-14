import { expect } from "@playwright/test";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";
import { testWithRegisteredUser } from "../fixtures/test-with-registered-user";
import { waitForEmailLink } from "../mailpit";

testWithRegisteredUser.describe("Forgot password - Happy Case", () => {
	testWithRegisteredUser(
		"should be able to reset password via e-mail",
		async ({ page, account }) => {
			await page.goto(`/profile`);
			await page.getByRole("link", { name: "Passwort vergessen?" }).click();
			await page.getByLabel("E-Mail").click();
			await page.getByLabel("E-Mail").fill(account.email);
			await page.getByLabel("E-Mail").press("Enter");

			await page.goto(
				await waitForEmailLink({
					email: account.email,
					subject: "Reset your password",
				}),
			);

			await page.getByLabel("Neues Passwort").click();
			await page.getByLabel("Neues Passwort").fill(account.password);

			await page.getByRole("button", { name: "Speichern" }).click();

			await expect(page.locator("#password-reset-alert-dialog")).toBeVisible();
			await page.getByRole("button", { name: "OK" }).click();

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

testWithoutSplashScreen.describe(
	"Forgot password - Client-Side Validation",
	() => {
		testWithoutSplashScreen(
			"should not be able to reset password with empty email",
			async ({ page }) => {
				await page.goto(`/profile`);
				await page.getByRole("link", { name: "Passwort vergessen?" }).click();

				await page.getByLabel("E-Mail").click();
				await page.getByLabel("E-Mail").fill(" ");
				await page.getByLabel("E-Mail").press("Backspace");

				await expect(page.locator("input#email:invalid")).toBeVisible();
			},
		);

		testWithoutSplashScreen(
			"should not be able to reset password with invalid email format",
			async ({ page }) => {
				await page.goto(`/profile`);
				await page.getByRole("link", { name: "Passwort vergessen?" }).click();

				await page.getByLabel("E-Mail").click();
				await page.getByLabel("E-Mail").fill("invalid-email");

				await expect(page.locator("input#email:invalid")).toBeVisible();
			},
		);

		testWithoutSplashScreen(
			'should not be able to reset password by going on "profile/reset-password" directly',
			async ({ page }) => {
				await page.goto(`/profile/reset-password`);

				await expect(
					page.getByText("Einen Moment Geduld bitte..."),
				).toBeVisible();

				await expect(
					page.getByText("Es ist ein Fehler aufgetreten."),
				).toBeVisible({ timeout: 15000 });
				await expect(
					page.getByText("Hinweis: Diese Seite kann nur"),
				).toBeVisible();
				await page
					.getByRole("button", { name: "Zurück zur Startseite" })
					.click();
				await expect(page).toHaveURL(new RegExp(`/map.*`));
			},
		);
	},
);

testWithoutSplashScreen.describe(
	"Forgot password - Error Handling - Forgot password page",
	() => {
		testWithoutSplashScreen(
			"should show error toast when and unexpected error occurs during forgot-password",
			async ({ page }) => {
				await page.goto(`/profile`);
				await page.getByRole("link", { name: "Passwort vergessen?" }).click();

				await page.getByLabel("E-Mail").click();
				await page.getByLabel("E-Mail").fill("someone@example.com");

				await page.context().setOffline(true);

				await page
					.getByRole("button", { name: "Passwort zurücksetzen" })
					.click();

				await expect(page.getByText("Ups, da ist etwas schief")).toBeVisible();
			},
		);
	},
);

testWithRegisteredUser.describe(
	"Forgot password - Error Handling - Reset password page",
	() => {
		testWithRegisteredUser(
			"should show error toast when and unexpected error occurs during reset password",
			async ({ page, account }) => {
				await page.goto(`/profile`);
				await page.getByRole("link", { name: "Passwort vergessen?" }).click();
				await page.getByLabel("E-Mail").click();
				await page.getByLabel("E-Mail").fill(account.email);
				await page.getByLabel("E-Mail").press("Enter");

				await page.goto(
					await waitForEmailLink({
						email: account.email,
						subject: "Reset your password",
					}),
				);

				await page.getByLabel("Neues Passwort").fill('123qwe!"§QWE');

				await page.context().setOffline(true);

				await page.getByRole("button", { name: "Speichern" }).click();

				await expect(
					page
						.locator("div")
						.filter({
							hasText:
								/^Ups, da ist etwas schief gelaufen\. Bitte versuche es erneut\.$/,
						})
						.nth(2),
				).toBeVisible();
			},
		);
	},
);
