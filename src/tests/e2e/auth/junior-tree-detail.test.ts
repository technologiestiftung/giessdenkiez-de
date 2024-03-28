import { expect, test } from "@playwright/test";
import { baseUrl } from "./constants";

test.describe("Tree detail view", () => {
	test("should show tree info for junior tree", async ({ page }) => {
		await page.goto(`${baseUrl}/map?treeId=_210024d68d`);

		await expect(page.getByText("Bauminformationen")).toBeVisible();
		await expect(page.getByText("Herbst-Flammen-Ahorn")).toBeVisible();
		await expect(
			page.getByText(
				"Dieser Baum wird bereits vom Bezirksamt versorgt und muss nicht gegossen werden.",
			),
		).toBeVisible();

		// Junior trees must have an adopt button
		await expect(page.getByTestId("adopt-button")).toBeVisible();
		await expect(page.getByText("Diesen Baum adoptieren")).toBeVisible();

		// Junior trees must have a water button
		await expect(page.getByTestId("water-tree-button")).toBeVisible();

		await page.getByRole("button", { name: "Baumsteckbrief" }).click();
		await expect(page.getByText("Die Gattung der Ahorne")).toBeVisible();
		await page.getByRole("button", { name: "Baumsteckbrief" }).click();
		await expect(page.getByText("Die Gattung der Ahorne")).not.toBeVisible();

		// Check for exact age
		await expect(page.getByText("Standalter")).toBeVisible();
		const calculatedAge = await page.getByTestId("age").textContent();
		expect(calculatedAge).toBe(
			// At the year of writing this test, the tree was 2 years old.
			// Every year, the tree gets one year older, as we all do - time is merciless.
			(6 + new Date().getFullYear() - 2024).toString(),
		);

		// Junior trees are not covered by Bezirksamt
		await expect(
			page.getByText("Vom Bezirksamt versorgt", { exact: true }),
		).not.toBeVisible();
		await expect(page.getByTestId("water-progress-circle")).toBeVisible();
		await expect(page.getByText("Problem melden")).toBeVisible();
		const link = page.getByRole("link", {
			name: "Zum offiziellen Formular",
		});
		const hrefAttributeValue = await link.getAttribute("href");
		expect(hrefAttributeValue).toBe(
			"https://ordnungsamt.berlin.de/frontend/meldungNeu/wo",
		);
	});
});
