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

	testWithoutSplashScreen(
		"should survive hovering a month that has no weather data",
		async ({ page }) => {
			// Waterings and weather come from two independent queries, so the
			// watering series can reach further back than the weather series.
			await stubGdkStats(page, {
				...stubbedGdkStats,
				monthlyWaterings: [
					{
						month: "2023-07",
						wateringCount: 5,
						averageAmountPerWatering: 10,
						totalSum: 50,
					},
					{
						month: "2023-08",
						wateringCount: 8,
						averageAmountPerWatering: 10,
						totalSum: 80,
					},
				],
				monthlyWeather: [
					{
						month: "2023-08",
						averageTemperatureCelsius: 20,
						maximumTemperatureCelsius: 29,
						totalRainfallLiters: 25,
					},
				],
			});
			await stubBerlinDistricts(page);
			await page.goto("/stats");

			// The chart re-renders once it has been measured, which moves the bars
			// around; dispatching the event React listens for hits the intended
			// month regardless of where the bar currently sits.
			const bar = page.locator('rect.barHover[data-month="2023-07"]').first();
			await expect(bar).toBeAttached();
			await bar.dispatchEvent("mouseover");

			// The watered amount is known even when the weather is not, so the
			// tooltip shows it and simply leaves out rain and temperature.
			const tooltip = page.locator("div.absolute.left-0").first();
			await expect(tooltip).toContainText("07.2023");
			await expect(tooltip).toContainText("gegossen");
			await expect(tooltip).not.toContainText("Regen");
		},
	);

	testWithoutSplashScreen(
		"should show the leaf image of the most frequent species",
		async ({ page }) => {
			// The file names follow the normalized species names of the API, and
			// production serves them from a case-sensitive filesystem.
			await stubGdkStats(page, {
				...stubbedGdkStats,
				mostFrequentTreeSpecies: [
					{ speciesName: "Linde", percentage: 0.5 },
					{ speciesName: "Götterbaum", percentage: 0.2 },
				],
				totalTreeSpeciesCount: 2,
			});
			await stubBerlinDistricts(page);

			const missingImages: string[] = [];
			page.on("response", (response) => {
				if (response.url().includes("/leafs/") && !response.ok()) {
					missingImages.push(`${response.status()} ${response.url()}`);
				}
			});

			await page.goto("/stats");

			await expect(page.locator("image.leaf-image").first()).toHaveAttribute(
				"xlink:href",
				"images/leafs/linde.png",
			);
			expect(missingImages).toEqual([]);
		},
	);
});
