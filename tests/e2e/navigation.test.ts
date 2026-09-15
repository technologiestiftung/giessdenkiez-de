import { expect } from "@playwright/test";
import { stubGdkStats } from "./edge-functions";
import { stubBerlinDistricts } from "./geo-data";
import { visible } from "./locators";
import { testWithoutSplashScreen } from "./fixtures/test-without-splash-screen";

testWithoutSplashScreen.describe("Navigation", () => {
	testWithoutSplashScreen("should redirect / to the map", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveURL(/\/map/);
	});

	testWithoutSplashScreen(
		"should reach every page from the navbar",
		async ({ page }) => {
			await stubGdkStats(page);
			await stubBerlinDistricts(page);

			await page.goto("/map");
			// Scope to the navbar: the about page has links with the same names.
			const navbar = visible(page.getByRole("navigation"));

			await navbar.getByRole("link", { name: "Stats" }).click();
			await expect(
				page.getByRole("heading", { name: "Statistiken Berlin" }),
			).toBeVisible();

			await navbar.getByRole("link", { name: "Profil" }).click();
			await expect(
				page.getByRole("heading", { name: "Anmelden" }),
			).toBeVisible();

			await navbar.getByRole("link", { name: "Info" }).click();
			await expect(page).toHaveURL(/\/about/);

			await navbar.getByRole("link", { name: "Karte" }).click();
			await expect(page).toHaveURL(/\/map/);
		},
	);

	testWithoutSplashScreen(
		"should show a 404 page for unknown routes",
		async ({ page }) => {
			await page.goto("/does-not-exist");

			await expect(
				page.getByText("404 - Seite wurde nicht gefunden"),
			).toBeVisible();
		},
	);
});
