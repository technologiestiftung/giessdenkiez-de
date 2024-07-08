/* eslint-disable max-lines */
import React, { useEffect, useMemo, useState } from "react";
import { supabaseClient } from "../../auth/supabase-client";
import { DropIcon } from "../icons/drop-icon";
import { HeartIcon } from "../icons/heart-icon";
import { TreeIcon } from "../icons/tree-icon";
import { WateringCanIcon } from "../icons/watering-can-icon";
import { LanguageToggle } from "../router/languageToggle";
import { BarChart } from "./bar-chart";
import { DensityMap } from "./density-map";
import { DonutChart } from "./donut-chart";
import { LineChart } from "./line-chart";
import { SimpleStatsCard } from "./simple-stats-card";
import { StatsCard } from "./stats-card";
import { AdoptionsChart } from "./adoptions-chart";

export interface TreeSpecies {
	speciesName?: string;
	percentage: number;
}

export interface Yearly {
	year: string;
	averageAmountPerWatering: number;
}

export interface Monthly {
	month: string;
	wateringCount: number;
	averageAmountPerWatering: number;
	totalSum: number;
}

interface Watering {
	id: string;
	lat: number;
	lng: number;
	amount: number;
	timestamp: string;
}

interface TreeAdoptions {
	count: number;
	veryThirstyCount: number;
}

export interface MonthlyWeather {
	month: string;
	averageTemperatureCelsius: number;
	maximumTemperatureCelsius: number;
	totalRainfallLiters: number;
}

interface GdkStats {
	numTrees: number;
	numPumps: number;
	numActiveUsers: number;
	numWateringsThisYear: number;
	monthlyWaterings: Monthly[];
	treeAdoptions: TreeAdoptions;
	mostFrequentTreeSpecies: TreeSpecies[];
	totalTreeSpeciesCount: number;
	waterings: Watering[];
	monthlyWeather: MonthlyWeather[];
}

export const Stats: React.FC = () => {
	const [stats, setStats] = useState<GdkStats>();
	const [monthly, setMonthly] = useState<Monthly[]>([]);
	const [monthlyWeater, setMonthlyWeather] = useState<MonthlyWeather[]>([]);

	const [dynamicChartWidth, setDynamicChartWidth] = useState(0);
	const CHART_HEIGHT = 300;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const data = await supabaseClient.functions.invoke("gdk_stats");
			setStats(data.data);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const orderedMonthly = (stats?.monthlyWaterings ?? []).sort((a, b) => {
			return new Date(a.month).getTime() - new Date(b.month).getTime();
		});
		setMonthly(orderedMonthly);

		const orderedMonthlyWeather = (stats?.monthlyWeather ?? []).sort((a, b) => {
			return new Date(a.month).getTime() - new Date(b.month).getTime();
		});
		setMonthlyWeather(orderedMonthlyWeather);
	}, [stats]);

	const veryThirstyAdoptionsRate = useMemo(() => {
		if (!stats) {
			return 0;
		}
		return Math.round(
			(stats.treeAdoptions.veryThirstyCount / stats.treeAdoptions.count) * 100,
		);
	}, [stats]);

	const averageNumWateringsPerMonth = useMemo(() => {
		return Math.round(
			monthly.reduce((acc, m) => acc + m.totalSum, 0) / monthly.length,
		);
	}, [monthly]);

	const averageAmountPerWatering = useMemo(() => {
		return Math.round(
			monthly.reduce((acc, m) => acc + m.averageAmountPerWatering, 0) /
				monthly.length,
		);
	}, [monthly]);

	const yearlyAverageData = useMemo(() => {
		const years = new Map<string, number[]>();
		for (const month of monthly) {
			const year = new Date(month.month).getFullYear().toString();
			const data = years.get(year) || [];
			data.push(month.averageAmountPerWatering);
			years.set(year, data);
		}
		const averageOnYears: Yearly[] = Array.from(years.entries()).map(
			([year, data]) => {
				return {
					year,
					averageAmountPerWatering:
						data.reduce((acc, v) => acc + v, 0) / data.length,
				} as Yearly;
			},
		);
		return averageOnYears;
	}, [monthly]);

	const orderedTreeSpecies = useMemo(() => {
		const speciesWithoutUnknown =
			stats?.mostFrequentTreeSpecies.filter(
				(s) => s.speciesName !== undefined,
			) ?? [];

		const totalPercentage = speciesWithoutUnknown.reduce(
			(acc, s) => acc + s.percentage,
			0,
		);

		const cleanSpecies = speciesWithoutUnknown.concat({
			speciesName: undefined,
			percentage: 100 - totalPercentage,
		});
		return cleanSpecies;
	}, [stats]);

	return (
		<div className="pointer-events-auto w-full overflow-auto">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col md:gap-4 px-1 py-8 md:py-16 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%] relative">
					<div className="lg:hidden absolute top-6 md:top-14 mt-1 right-0 pr-5">
						<LanguageToggle />
					</div>
					<div className="flex flex-row">
						<h1 className="px-4 md:px-0 text-4xl font-semibold pb-2 md:pb-4">
							Statistiken
						</h1>
					</div>
					<div className="flex flex-col rounded-2xl px-4 pb-4 md:border-2 md:p-8 gap-8">
						<div className="text-2xl font-semibold">
							Gieß den Kiez in Zahlen
						</div>
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<SimpleStatsCard
									title="Straßenbäume"
									stat={stats?.numTrees || 0}
									loading={loading}
								/>
								<SimpleStatsCard
									title="Öffentliche Pumpen"
									stat={stats?.numPumps || 0}
									loading={loading}
								/>
								<SimpleStatsCard
									title="Aktive Gießer:innen"
									stat={stats?.numActiveUsers || 0}
									loading={loading}
								/>
							</div>
							<div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
								<StatsCard
									title="Gießungen"
									hint="wurde im Jahr 2024 gegossen"
									stat={stats?.waterings.length || 0}
									unit="mal"
									titleColor="text-gdk-dark-blue"
									icon={<WateringCanIcon></WateringCanIcon>}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
								>
									<DensityMap
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
										data={stats?.waterings || []}
									/>
								</StatsCard>
								<StatsCard
									title="Gießverhalten"
									hint="werden durchschnittlich pro Monat gegossen"
									stat={averageNumWateringsPerMonth}
									unit="Liter"
									titleColor="text-gdk-dark-blue"
									icon={<DropIcon></DropIcon>}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
								>
									<div>
										<BarChart
											width={dynamicChartWidth}
											height={CHART_HEIGHT}
											monthlyData={monthly}
											weatherData={monthlyWeater}
										/>
									</div>
								</StatsCard>

								<StatsCard
									title="Gießvolumen"
									hint="werden 2024 durchschnittlich pro Gießung eingetragen"
									stat={averageAmountPerWatering}
									unit="Liter"
									titleColor="text-gdk-dark-blue"
									icon={<DropIcon></DropIcon>}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
								>
									<LineChart
										yearlyData={yearlyAverageData}
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
									/>
								</StatsCard>

								<StatsCard
									title="Baumarten"
									hint="stehen in Berlin"
									stat={stats?.totalTreeSpeciesCount ?? 0}
									unit="Baumarten"
									titleColor="text-gdk-dark-green"
									icon={<TreeIcon></TreeIcon>}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
								>
									<DonutChart
										treeSpecies={orderedTreeSpecies ?? []}
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
									/>
								</StatsCard>
								<StatsCard
									title="Baumadoptionen"
									hint="wurden adoptiert"
									stat={stats?.treeAdoptions.count ?? 0}
									unit="Bäume"
									titleColor="text-gdk-purple"
									icon={<HeartIcon isAdopted={true}></HeartIcon>}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
								>
									<AdoptionsChart
										veryThirstyAdoptionsRate={veryThirstyAdoptionsRate}
									/>
								</StatsCard>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
