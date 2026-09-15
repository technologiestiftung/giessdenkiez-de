import { expect } from "@playwright/test";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";

// The filter panel only renders once the map has loaded.
testWithoutSplashScreen.use({ mapMode: "stubbed" });

/**
 * The router renders the filter panel twice - once for mobile, once for
 * desktop - and hides one of them with CSS, so scope everything to the panel
 * that is actually on screen.
 */
const visibleFilterPanel = (page: import("@playwright/test").Page) =>
	page.locator('[data-testid="filter-panel"]:visible');

testWithoutSplashScreen.describe("Filters", () => {
	testWithoutSplashScreen(
		"should write every filter into the URL and reset them again",
		async ({ page }) => {
			await page.goto("/map");
			await page.getByTestId("filter-button").click();

			const panel = visibleFilterPanel(page);
			await expect(panel).toBeVisible();

			await panel.getByTestId("filter-switch-pumps").click();
			await expect(page).toHaveURL(/isPumpsVisible=true/);

			await panel.getByTestId("filter-switch-adopted").click();
			await expect(page).toHaveURL(/areOnlyAllAdoptedTreesVisible=true/);

			// The two are mutually exclusive: switching "last watered" on has to
			// turn "adopted" off in the URL too, otherwise a reload brings it back.
			await panel.getByTestId("filter-switch-last-watered").click();
			await expect(page).toHaveURL(/isLastWateredTreesVisible=true/);
			await expect(page).toHaveURL(/areOnlyAllAdoptedTreesVisible=false/);

			await panel.getByRole("button", { name: "Zurücksetzen" }).click();
			await expect(page).not.toHaveURL(/isPumpsVisible=true/);
			await expect(page).not.toHaveURL(/areOnlyAllAdoptedTreesVisible=true/);
		},
	);

	testWithoutSplashScreen(
		"should restore filters from the URL after a reload",
		async ({ page }) => {
			await page.goto("/map?isPumpsVisible=true&treeAgeMin=30&treeAgeMax=90");
			await page.getByTestId("filter-button").click();

			const panel = visibleFilterPanel(page);
			await expect(panel.getByText("30-90 Jahre")).toBeVisible();

			// The pumps switch reflects the URL, so toggling it turns the filter off.
			await panel.getByTestId("filter-switch-pumps").click();
			await expect(page).toHaveURL(/isPumpsVisible=false/);
		},
	);

	testWithoutSplashScreen(
		"should show how many filters are active",
		async ({ page }) => {
			await page.goto(
				"/map?isPumpsVisible=true&areOnlyAllAdoptedTreesVisible=true",
			);

			await expect(page.getByTestId("filter-button")).toContainText("2");
		},
	);

	testWithoutSplashScreen(
		"should keep both ends of the age range in the URL",
		async ({ page }) => {
			await page.goto("/map");
			await page.getByTestId("filter-button").click();

			const panel = visibleFilterPanel(page);
			await panel.locator('input[type="range"]').first().fill("40");

			// Both params are written back-to-back; the second must not drop the
			// first (the URL update is debounced, the store is not).
			await expect(page).toHaveURL(/treeAgeMin=40/);
			await expect(page).toHaveURL(/treeAgeMax=200/);

			await page.reload();
			await page.getByTestId("filter-button").click();
			await expect(
				visibleFilterPanel(page).getByText("40-200+ Jahre"),
			).toBeVisible();
		},
	);

	testWithoutSplashScreen(
		"should clear the age range on reset as well",
		async ({ page }) => {
			await page.goto("/map?treeAgeMin=30&treeAgeMax=90");
			await page.getByTestId("filter-button").click();

			await visibleFilterPanel(page)
				.getByRole("button", { name: "Zurücksetzen" })
				.click();

			await expect(page).not.toHaveURL(/treeAgeMin=/);
			await expect(page).not.toHaveURL(/treeAgeMax=/);
		},
	);
});
