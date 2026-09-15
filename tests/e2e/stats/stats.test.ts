import { expect } from "@playwright/test";
import { stubbedGdkStats, stubGdkStats } from "../edge-functions";
import { stubBerlinDistricts } from "../geo-data";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";

testWithoutSplashScreen.describe("Stats page", () => {
	testWithoutSplashScreen(
		"should render the headline numbers and the charts",
		async ({ page }) => {
			await stubGdkStats(page);
			await stubBerlinDistricts(page);

			await page.goto("/stats");

			await expect(
				page.getByRole("heading", { name: "Statistiken Berlin" }),
			).toBeVisible();
			await expect(page.getByText("Stadtbäume").first()).toBeVisible();
			await expect(
				page.getByText(stubbedGdkStats.numTrees.toLocaleString("de-DE")),
			).toBeVisible();
			await expect(page.getByText("Öffentliche Pumpen").first()).toBeVisible();
			await expect(page.getByText("Aktive Gießer:innen").first()).toBeVisible();

			// The charts are d3-rendered SVGs; if d3 or the data hook breaks, the
			// page still renders but the charts do not.
			await expect(page.locator("svg").first()).toBeVisible();
			expect(await page.locator("svg").count()).toBeGreaterThan(3);
		},
	);

	testWithoutSplashScreen(
		"should flip a chart card to its explanation and back",
		async ({ page }) => {
			await stubGdkStats(page);
			await stubBerlinDistricts(page);

			await page.goto("/stats");

			// Both faces stay in the DOM, so the flip shows up in which one is
			// taken out of the flow rather than in text visibility.
			const back = page.getByTestId("card-flip-back").first();
			await expect(back).toHaveCSS("position", "absolute");

			await page.getByTestId("chart-card-info-button").first().click();
			await expect(back).toHaveCSS("position", "relative");

			await page.getByTestId("chart-card-back-button").first().click();
			await expect(back).toHaveCSS("position", "absolute");
		},
	);
});
