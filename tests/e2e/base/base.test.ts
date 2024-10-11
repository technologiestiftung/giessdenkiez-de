import { expect, test } from "@playwright/test";

test.describe("Is Alive", () => {
	test.describe("Happy Case", () => {
		test("should be able to open the /map", async ({ page, isMobile }) => {
			await page.goto(`/map`);
			await expect(page.getByText("Die Berliner Stadtbäume")).toBeVisible();

			if (isMobile) {
				await page.getByTestId("splash-close-button").nth(0).click();
			}

			if (!isMobile) {
				await page.getByTestId("splash-close-button").nth(1).click();
			}
		});
	});
});
