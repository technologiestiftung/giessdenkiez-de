import { expect, test } from "@playwright/test";
import { baseUrl } from "./constants";

test.describe.skip("Tree detail view", () => {
	test("should show tree info for baby tree", async ({ page }) => {
		await page.goto(`${baseUrl}/map?treeId=_23002dc7a1`);

		await expect(page.getByText("Bauminformationen")).toBeVisible();
		await expect(page.getByText("Zier-Feld-Ahorn 'Red Shine'")).toBeVisible();
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

		// Baby trees should not have a water button
		await expect(page.getByTestId("water-tree-button")).not.toBeVisible();

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
			(2 + new Date().getFullYear() - 2024).toString(),
		);

		await expect(
			page.getByText("Vom Bezirksamt versorgt", { exact: true }),
		).toBeVisible();
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
