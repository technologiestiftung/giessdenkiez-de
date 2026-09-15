import { Page } from "@playwright/test";
import { GdkStats } from "../../src/components/stats/store/types";

/**
 * Fixed stats so the page has something deterministic to render. The real
 * numbers come from the `gdk_stats` edge function, which CI does not start at
 * all (`supabase start --exclude ... edge-runtime`).
 */
export const stubbedGdkStats: GdkStats = {
	numTrees: 12780,
	numPumps: 42,
	numActiveUsers: 7,
	numWateringsThisYear: 123,
	monthlyWaterings: [
		{
			month: "2026-05",
			wateringCount: 10,
			averageAmountPerWatering: 12,
			totalSum: 120,
		},
		{
			month: "2026-06",
			wateringCount: 20,
			averageAmountPerWatering: 15,
			totalSum: 300,
		},
	],
	treeAdoptions: { count: 5, veryThirstyCount: 2 },
	mostFrequentTreeSpecies: [
		{ speciesName: "Linde", percentage: 0.4 },
		{ speciesName: "Ahorn", percentage: 0.3 },
	],
	totalTreeSpeciesCount: 2,
	waterings: [
		{
			id: "1",
			lat: 52.5,
			lng: 13.4,
			amount: 10,
			timestamp: "2026-06-01T10:00:00.000Z",
		},
	],
	monthlyWeather: [
		{
			month: "2026-05",
			averageTemperatureCelsius: 18,
			maximumTemperatureCelsius: 27,
			totalRainfallLiters: 30,
		},
		{
			month: "2026-06",
			averageTemperatureCelsius: 21,
			maximumTemperatureCelsius: 31,
			totalRainfallLiters: 15,
		},
	],
};

export async function stubGdkStats(
	page: Page,
	stats: GdkStats = stubbedGdkStats,
) {
	await page.route("**/functions/v1/gdk_stats", (route) =>
		route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify(stats),
		}),
	);
}
