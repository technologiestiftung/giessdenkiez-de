import { expect } from "@playwright/test";
import { testWithLoggedInUser } from "../fixtures/test-with-logged-in-user";
import { testWithAdoptedTree } from "../fixtures/test-with-adopted-tree";
import { waterTree } from "../fixtures/tree-data";

testWithLoggedInUser.describe("Profile of a logged-in user", () => {
	testWithLoggedInUser(
		"should show the profile with an empty overview",
		async ({ page, account }) => {
			await page.goto("/profile");

			await expect(
				page.getByRole("heading", { name: "Dein Profil" }),
			).toBeVisible();
			await expect(page.getByText(account.username)).toBeVisible();
			await expect(page.getByText(account.email)).toBeVisible();
			await expect(
				page.getByText(
					"Wenn Du einen Baum regelmäßig gießt, kannst Du ihn adoptieren.",
				),
			).toBeVisible();
		},
	);

	testWithLoggedInUser(
		"should count the waterings of the user",
		async ({ page, account }) => {
			await waterTree({ account, treeId: "00008100:002faeaf", amount: 12 });

			await page.goto("/profile");

			// The overview tiles have no test ids, so scope by the tile's label.
			const literTile = page
				.locator("div")
				.filter({ hasText: /^Liter\d+$/ })
				.first();
			await expect(literTile).toContainText("12");
		},
	);
});

testWithAdoptedTree.describe("Profile with an adopted tree", () => {
	testWithAdoptedTree(
		"should list the adopted tree",
		async ({ page, adoptedTreeId }) => {
			await page.goto("/profile");

			const treeLink = page.getByRole("link", {
				name: "Resista Ulme 'Rebona'",
			});
			await expect(treeLink).toBeVisible();
			expect(await treeLink.getAttribute("href")).toBe(
				`/map?treeId=${adoptedTreeId}&zoom=20`,
			);
		},
	);
});
