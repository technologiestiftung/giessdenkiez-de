import { expect } from "@playwright/test";
import { seniorTreeId, seniorTreeName } from "../constants";
import { testWithLoggedInUser } from "../fixtures/test-with-logged-in-user";
import { testWithoutSplashScreen } from "../fixtures/test-without-splash-screen";

// The tree detail panel waits for the map's `load` event.
testWithLoggedInUser.use({ mapMode: "stubbed" });

testWithLoggedInUser.describe("Adopting a tree", () => {
	testWithLoggedInUser(
		"should adopt a tree and list it on the profile",
		async ({ page }) => {
			await page.goto(`/map?treeId=${seniorTreeId}`);
			await expect(page.getByText("Diesen Baum adoptieren")).toBeVisible();

			await page.getByTestId("adopt-button").click();
			await expect(
				page.getByText("Du hast diesen Baum adoptiert"),
			).toBeVisible();

			await page.getByRole("link", { name: "Profil" }).click();
			await expect(
				page.getByRole("link", { name: seniorTreeName }),
			).toBeVisible();
		},
	);

	testWithLoggedInUser("should unadopt a tree again", async ({ page }) => {
		await page.goto(`/map?treeId=${seniorTreeId}`);

		await page.getByTestId("adopt-button").click();
		await expect(page.getByText("Du hast diesen Baum adoptiert")).toBeVisible();

		await page.getByTestId("adopt-button").click();
		await expect(page.getByText("Diesen Baum adoptieren")).toBeVisible();

		await page.getByRole("link", { name: "Profil" }).click();
		await expect(
			page.getByText("Wenn Du einen Baum regelmäßig gießt"),
		).toBeVisible();
	});
});

testWithoutSplashScreen.describe("Adopting a tree - logged out", () => {
	testWithoutSplashScreen.use({ mapMode: "stubbed" });

	testWithoutSplashScreen(
		"should point visitors at the login instead",
		async ({ page }) => {
			await page.goto(`/map?treeId=${seniorTreeId}`);

			const loginLink = page.getByRole("link", {
				name: "Logge Dich ein um diesen Baum zu adoptieren",
			});
			await expect(loginLink).toBeVisible();
			expect(await loginLink.getAttribute("href")).toContain(
				`redirectTo=/map?treeId=${seniorTreeId}`,
			);
		},
	);
});
