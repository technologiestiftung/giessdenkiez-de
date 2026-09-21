import { Page } from "@playwright/test";
import { FeatureCollection } from "geojson";

/**
 * One coarse polygon around Berlin. The density map only runs it through
 * `d3.geoPath`, so the shape does not have to be accurate - it just has to be
 * valid GeoJSON with at least one feature.
 */
const berlinDistricts: FeatureCollection = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			properties: { Gemeinde_name: "Teststadt" },
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[13.1, 52.35],
						[13.76, 52.35],
						[13.76, 52.68],
						[13.1, 52.68],
						[13.1, 52.35],
					],
				],
			},
		},
	],
};

/**
 * Serves a mock districts GeoJSON instead of using the real GeoJSON.
 */
export async function stubBerlinDistricts(
	page: Page,
	districts: FeatureCollection = berlinDistricts,
) {
	const districtsUrl = process.env.VITE_BEZIRKE_URL;

	await page.route(
		(url) =>
			(districtsUrl !== undefined && url.href === districtsUrl) ||
			url.pathname.endsWith("/berlin_bezirke.geojson"),
		(route) =>
			route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(districts),
			}),
	);
}
