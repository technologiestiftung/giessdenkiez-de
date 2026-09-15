import { Page } from "@playwright/test";

export type MapMode = "blocked" | "stubbed" | "live";

/**
 * A minimal valid Mapbox style. Serving it locally makes mapbox-gl fire its
 * `load` event - which is all the app waits for before rendering the tree
 * detail panel, the filter panel and the legend - without a single request
 * reaching Mapbox.
 */
const emptyStyle = {
	version: 8,
	name: "e2e-empty-style",
	sources: {},
	layers: [
		{
			id: "background",
			type: "background",
			paint: { "background-color": "#e8e8e8" },
		},
	],
};

const pumpsSourceUrl = process.env.VITE_MAP_PUMPS_SOURCE_URL;

const isMapboxRequest = (url: URL) =>
	url.hostname.endsWith("mapbox.com") ||
	(pumpsSourceUrl !== undefined && url.href.startsWith(pumpsSourceUrl));

/**
 * The map is mounted on every route (see `src/app.tsx`), so tests that never
 * look at it still pay for style, tile, font and WebGL work - and every real
 * map initialization is a billable Mapbox map load.
 *
 * - `blocked` (default): nothing reaches Mapbox. `isMapLoaded` stays false, so
 *   anything gated on it (tree detail, filter panel, legend) will not render.
 * - `stubbed`: the style is served locally, so the map "loads" offline and
 *   those views render. Tiles and telemetry stay blocked.
 * - `live`: the real thing. Keep this for tests that are about the map itself.
 */
export async function applyMapMode(page: Page, mode: MapMode) {
	if (mode === "live") {
		return;
	}

	// Playwright matches routes last-registered-first, so the broad abort has to
	// be registered before the narrower style stub.
	await page.route(
		(url) => isMapboxRequest(url),
		(route) => route.abort(),
	);

	if (mode === "stubbed") {
		await page.route("**/api.mapbox.com/styles/v1/**", (route) =>
			route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(emptyStyle),
			}),
		);
	}
}
