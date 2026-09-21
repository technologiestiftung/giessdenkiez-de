import { expect } from "@playwright/test";
import { useIsInVegetationPeriod } from "../../../src/utils/use-is-in-vegetation-period";
import { babyTreeId } from "../constants";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";

const isInVegetationPeriod = useIsInVegetationPeriod();

// The tree detail panel only renders once the map has loaded; the stubbed style
// gets it there without talking to Mapbox.
testWithoutSplashScreen.use({ mapMode: "stubbed" });

testWithoutSplashScreen.describe("Tree detail view", () => {
	testWithoutSplashScreen(
		"should show tree info for baby tree",
		async ({ page }) => {
			await page.goto(`/map?&treeId=${babyTreeId}`);

			await expect(
				page.getByText("Bauminformationen", { exact: true }),
			).toBeVisible();
			await expect(page.getByText("Resista Ulme 'Rebona'")).toBeVisible();
			await expect(
				page.getByText(
					"Dieser Baum wird bereits vom Bezirksamt versorgt und muss nicht gegossen werden.",
				),
			).toBeVisible();

			// Baby trees should not have an adopt button
			await expect(
				page.getByRole("button", { name: "Heart Icon" }),
			).not.toBeVisible();
			await expect(page.getByText("Diesen Baum adoptieren")).not.toBeVisible();

			// Baby trees are watered by the district: the button is shown, but
			// cannot be used (it is disabled for logged-out visitors anyway).
			await expect(page.getByTestId("water-tree-button")).toBeDisabled();

			await page.getByRole("button", { name: "Baumsteckbrief" }).click();
			await expect(
				page.getByText("Der Anteil der Ulmen (Ulmus)"),
			).toBeVisible();
			await page.getByRole("button", { name: "Baumsteckbrief" }).click();
			await expect(
				page.getByText("Der Anteil der Ulmen (Ulmus)"),
			).not.toBeVisible();

			// Check for exact age
			await expect(page.getByText("Standalter")).toBeVisible();
			const calculatedAge = await page.getByTestId("age").textContent();
			expect(calculatedAge).toBe(
				// At the year of writing this test, the tree was 1 year old.
				// Every year, the tree gets one year older, as we all do - time is merciless.
				(1 + new Date().getFullYear() - 2024).toString(),
			);

			if (isInVegetationPeriod) {
				await expect(
					page.getByText("Bereits vom Bezirksamt versorgt", { exact: true }),
				).toBeVisible();
				await expect(page.getByTestId("water-progress-circle")).toBeVisible();
			}

			await expect(page.getByText("Problem melden")).toBeVisible();
			const link = page.getByRole("link", {
				name: "Zum offiziellen Formular",
			});
			const hrefAttributeValue = await link.getAttribute("href");
			expect(hrefAttributeValue).toBe(
				"https://ordnungsamt.berlin.de/frontend/meldungNeu/wo",
			);
		},
	);
});
