/* eslint-disable max-lines */
import { create } from "zustand";
import {
	GdkStats,
	Monthly,
	MonthlyWeather,
	TreeSpecies,
	Yearly,
} from "./types";
import { supabaseClient } from "../../../auth/supabase-client";

interface StatsStore {
	refreshStats: () => void;
	gdkStats: GdkStats | null;

	orderedMonthlyWaterings: Monthly[];
	refreshOrderedMonthlyWaterings: () => void;

	monthlyWeather: MonthlyWeather[];
	refreshMonthlyWeather: () => void;

	totalWateringAmount: number;
	refreshTotalWateringAmount: () => void;

	yearlyAverageAmountPerWatering: Yearly[];
	refreshYearlyAverageAmountPerWatering: () => void;

	averageAmountPerWateringThisYear: number;
	refreshAverageAmountPerWateringThisYear: () => void;

	orderedTreeSpecies: TreeSpecies[];
	refreshOrderedTreeSpecies: () => void;

	chartWidth: number;
	chartHeight: number;
	onResize: () => void;

	loading: boolean;
}

export const useStatsStore = create<StatsStore>()((set, get) => {
	return {
		refreshStats: async () => {
			set({ loading: true });

			const data = await supabaseClient.functions.invoke("gdk_stats");
			set({ gdkStats: data.data });

			get().refreshOrderedMonthlyWaterings();
			get().refreshMonthlyWeather();
			get().refreshTotalWateringAmount();
			get().refreshYearlyAverageAmountPerWatering();
			get().refreshAverageAmountPerWateringThisYear();
			get().refreshOrderedTreeSpecies();
			get().onResize();

			set({ loading: false });
		},

		gdkStats: null,

		orderedMonthlyWaterings: [],
		refreshOrderedMonthlyWaterings: () => {
			const stats = get().gdkStats;

			const orderedMonthly = (stats?.monthlyWaterings ?? []).sort((a, b) => {
				return new Date(a.month).getTime() - new Date(b.month).getTime();
			});

			set({ orderedMonthlyWaterings: orderedMonthly });
		},

		monthlyWeather: [],
		refreshMonthlyWeather: () => {
			const stats = get().gdkStats;

			const orderedMonthlyWeather = (stats?.monthlyWeather ?? []).sort(
				(a, b) => {
					return new Date(a.month).getTime() - new Date(b.month).getTime();
				},
			);

			set({ monthlyWeather: orderedMonthlyWeather });
		},
		totalWateringAmount: 0,
		refreshTotalWateringAmount: () => {
			const total = get().orderedMonthlyWaterings.reduce(
				(accumulation, { totalSum }) => accumulation + totalSum,
				0,
			);
			set({ totalWateringAmount: total });
		},

		yearlyAverageAmountPerWatering: [],
		refreshYearlyAverageAmountPerWatering: () => {
			const years = new Map<string, number[]>();

			for (const month of get().orderedMonthlyWaterings) {
				const year = new Date(month.month).getFullYear().toString();
				const data = years.get(year) || [];
				data.push(month.averageAmountPerWatering);
				years.set(year, data);
			}

			const averageOnYears = Array.from(years.entries()).map(([year, data]) => {
				return {
					year,
					averageAmountPerWatering:
						data.reduce((acc, v) => acc + v, 0) / data.length,
				};
			});

			set({ yearlyAverageAmountPerWatering: averageOnYears });
		},

		averageAmountPerWateringThisYear: 0,
		refreshAverageAmountPerWateringThisYear: () => {
			const average =
				get().yearlyAverageAmountPerWatering.length > 0
					? Math.round(
							get().yearlyAverageAmountPerWatering.slice(-1)[0]
								.averageAmountPerWatering,
						)
					: 0;
			set({ averageAmountPerWateringThisYear: average });
		},

		orderedTreeSpecies: [],
		refreshOrderedTreeSpecies: () => {
			const speciesWithoutUnknown =
				get().gdkStats?.mostFrequentTreeSpecies.filter(
					({ speciesName }) => speciesName !== undefined,
				) ?? [];

			const totalPercentage = speciesWithoutUnknown.reduce(
				(accumulation, { percentage }) => accumulation + percentage,
				0,
			);

			const cleanSpecies = speciesWithoutUnknown.concat({
				speciesName: undefined,
				percentage: 100 - totalPercentage,
			});

			set({ orderedTreeSpecies: cleanSpecies });
		},

		chartWidth: 0,
		chartHeight: 300,

		onResize: () => {
			const container = document.getElementById("stats-card-container");
			if (!container) {
				// if the container is not added to the dom yet, retry in 50
				setTimeout(() => get().onResize(), 50);
				return;
			}

			set({ chartWidth: container.offsetWidth });
		},

		loading: true,
	};
});
