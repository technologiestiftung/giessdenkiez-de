import { expect } from "@playwright/test";
import { visible } from "./locators";
import { testWithoutSplashScreen } from "./fixtures/test-without-splash-screen";

testWithoutSplashScreen.describe("Language toggle", () => {
	testWithoutSplashScreen(
		"should switch to English and keep it across pages",
		async ({ page }) => {
			await page.goto("/profile");
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			await visible(page.getByRole("button", { name: "EN" }).first()).click();

			await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
			await expect(page).toHaveURL(/lang=en/);

			// The choice survives navigating to another page.
			await visible(page.getByRole("link", { name: "Info" })).click();
			await expect(
				visible(page.getByRole("button", { name: "DE" }).first()),
			).toBeVisible();
		},
	);
});
