import { test as baseTest } from "@playwright/test";
import { splashStoreKey } from "../constants";

type SplashScreenFixtures = {
	/**
	 * Whether to block Mapbox and the pumps GeoJSON. The map is mounted on every
	 * route (see `src/app.tsx`), so tests that never look at it still pay for
	 * style, tile and WebGL work. Opt back in with
	 * `testWithoutSplashScreen.use({ isMapBlocked: false })`.
	 */
	isMapBlocked: boolean;
};

const pumpsSourceUrl = process.env.VITE_MAP_PUMPS_SOURCE_URL;

/**
 * Base test for everything that is not about the splash screen or the map.
 *
 * The splash screen is shown whenever today is past the persisted expiration
 * date (see `src/components/splash/splash-store.tsx`). Seeding a far future
 * date keeps it closed, so tests don't have to click it away - and don't have
 * to branch on mobile vs. desktop to do so.
 */
export const testWithoutSplashScreen = baseTest.extend<SplashScreenFixtures>({
	isMapBlocked: [true, { option: true }],

	page: async ({ page, isMapBlocked }, use) => {
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

		if (isMapBlocked) {
			// The app keeps rendering: everything outside the map (navbar, profile,
			// auth forms) does not wait for `isMapLoaded`.
			await page.route(
				(url) =>
					url.hostname.endsWith("mapbox.com") ||
					(pumpsSourceUrl !== undefined && url.href.startsWith(pumpsSourceUrl)),
				(route) => route.abort(),
			);
		}

		await use(page);
	},
});
