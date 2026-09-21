import { test as baseTest } from "@playwright/test";
import { splashStoreKey } from "../constants";
import { applyMapMode, MapMode } from "../map";
import { watchForPageErrors } from "../page-errors";

type SplashScreenFixtures = {
	/**
	 * How much of Mapbox this test needs - see `applyMapMode`. Override with
	 * `testWithoutSplashScreen.use({ mapMode: "stubbed" })`.
	 */
	mapMode: MapMode;
};

/**
 * Base test for everything that is not about the splash screen or the map.
 *
 * The splash screen is shown whenever today is past the persisted expiration
 * date (see `src/components/splash/splash-store.tsx`). Seeding a far future
 * date keeps it closed, so tests don't have to click it away - and don't have
 * to branch on mobile vs. desktop to do so.
 */
export const testWithoutSplashScreen = baseTest.extend<SplashScreenFixtures>({
	mapMode: ["blocked", { option: true }],

	page: async ({ page, mapMode }, use) => {
		await page.addInitScript(
			({ storageKey, expirationDate }) => {
				window.localStorage.setItem(
					storageKey,
					JSON.stringify({ state: { expirationDate }, version: 0 }),
				);
			},
			{
				storageKey: splashStoreKey,
				expirationDate: new Date(
					Date.now() + 365 * 24 * 60 * 60 * 1000,
				).toISOString(),
			},
		);

		await applyMapMode(page, mapMode);
		const assertNoPageErrors = watchForPageErrors(page);

		await use(page);

		await assertNoPageErrors();
	},
});
