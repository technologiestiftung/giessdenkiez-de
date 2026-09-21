import { expect } from "@playwright/test";
import { babyTreeId, seniorTreeId } from "../constants";
import { testWithLoggedInUser } from "../fixtures/test-with-logged-in-user";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";

// The tree detail panel waits for the map's `load` event.
testWithLoggedInUser.use({ mapMode: "stubbed" });

testWithLoggedInUser.describe("Watering a tree", () => {
	testWithLoggedInUser(
		"should record a watering and count it on the profile",
		async ({ page, account }) => {
			await page.goto(`/map?treeId=${seniorTreeId}`);

			await page.getByTestId("water-tree-button").click();
			await page.getByRole("spinbutton").fill("15");
			await page.getByRole("button", { name: "Speichern" }).click();

			// The watering shows up in the tree's own list ...
			await expect(page.getByText(account.username)).toBeVisible();
			await expect(page.getByText("15l")).toBeVisible();

			// ... and in the profile totals.
			await page.getByRole("link", { name: "Profil" }).click();
			await expect(
				page
					.locator("div")
					.filter({ hasText: /^Liter\d+$/ })
					.first(),
			).toContainText("15");
		},
	);

	testWithLoggedInUser("should delete a watering again", async ({ page }) => {
		await page.goto(`/map?treeId=${seniorTreeId}`);

		await page.getByTestId("water-tree-button").click();
		await page.getByRole("spinbutton").fill("7");
		await page.getByRole("button", { name: "Speichern" }).click();

		await expect(page.getByText("7l")).toBeVisible();

		await page.getByTestId("delete-watering-button").click();
		await page.getByRole("button", { name: "Löschen" }).click();

		// The section collapses itself once the tree has no waterings left, so the
		// disappearing entry is the assertion.
		await expect(page.getByText("7l")).toBeHidden();
	});

	testWithLoggedInUser(
		"should keep the button disabled for baby trees",
		async ({ page }) => {
			await page.goto(`/map?treeId=${babyTreeId}`);

			// Baby trees are supplied by the district, so even a logged-in user
			// cannot water them.
			await expect(page.getByTestId("water-tree-button")).toBeDisabled();
		},
	);
});

testWithoutSplashScreen.describe("Watering a tree - logged out", () => {
	testWithoutSplashScreen.use({ mapMode: "stubbed" });

	testWithoutSplashScreen(
		"should point visitors at the login instead",
		async ({ page }) => {
			await page.goto(`/map?treeId=${seniorTreeId}`);

			await expect(page.getByTestId("water-tree-button")).toBeDisabled();

			// "Logge Dich ein um diesen Baum zu adoptieren" shares the prefix.
			const loginLink = page.getByRole("link", {
				name: "Logge Dich ein",
				exact: true,
			});
			await expect(loginLink).toBeVisible();
			expect(await loginLink.getAttribute("href")).toContain(
				`redirectTo=/map?treeId=${seniorTreeId}`,
			);
		},
	);
});
