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
import { useI18nStore } from "../../i18n/i18n-store";
import Markdown from "react-markdown";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";
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

	const i18n = useI18nStore().i18n();

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

	const totalWateringAmountAllMonths = useMemo(() => {
		return monthly.reduce((acc, curr) => acc + curr.totalSum, 0);
	}, [monthly]);

	const yearlyAverageAmountPerWatering = useMemo(() => {
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

	const averageAmountPerWateringThisYear =
		yearlyAverageAmountPerWatering.length > 0
			? Math.round(
					yearlyAverageAmountPerWatering.slice(-1)[0].averageAmountPerWatering,
				)
			: 0;

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
				<div className="flex w-[100%] flex-col md:gap-4 px-1 py-8 md:py-16 md:w-[90%] md:px-4 lg:w-[800px] xl:w-[800px] 2xl:w-[1000px] relative">
					<div className="lg:hidden absolute top-6 md:top-14 mt-1 right-0 pr-5">
						<LanguageToggle />
					</div>
					<div className="flex flex-row">
						<h1 className="px-4 md:px-0 text-4xl font-semibold pb-2 md:pb-4">
							{i18n.stats.title}
						</h1>
					</div>
					<div className="flex flex-col rounded-2xl px-4 pb-4 md:border-2 md:p-8 gap-8">
						<div className="text-2xl font-semibold">{i18n.stats.subtitle}</div>
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<SimpleStatsCard
									title={i18n.stats.streetTrees}
									stat={stats?.numTrees || 0}
									loading={loading}
								/>
								<SimpleStatsCard
									title={i18n.stats.publicPumps}
									stat={stats?.numPumps || 0}
									loading={loading}
								/>
								<SimpleStatsCard
									title={i18n.stats.activeUsers}
									stat={stats?.numActiveUsers || 0}
									loading={loading}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<StatsCard
									title={i18n.stats.wateringsStat.title}
									hint={i18n.stats.wateringsStat.hint(
										new Date().getFullYear().toString(),
									)}
									stat={stats?.waterings.length || 0}
									unit={i18n.stats.wateringsStat.unit}
									titleColor="text-gdk-dark-blue"
									icon={
										<div
											className={`flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full `}
										>
											<WateringCanIcon className="translate-x-1 p-0.5" />
										</div>
									}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
									backContent={i18n.stats.wateringsStat.backContent}
									legend={i18n.stats.wateringsStat.legend}
								>
									<DensityMap
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
										wateringData={stats?.waterings || []}
									/>
								</StatsCard>
								<StatsCard
									title={i18n.stats.wateringBehaviorStat.title}
									hint={i18n.stats.wateringBehaviorStat.hint(
										new Date().getFullYear().toString(),
									)}
									stat={totalWateringAmountAllMonths}
									unit={i18n.stats.wateringBehaviorStat.unit}
									titleColor="text-gdk-dark-blue"
									icon={
										<div
											className={`flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full `}
										>
											<DropIcon className="p-0.5" />
										</div>
									}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
									backContent={i18n.stats.wateringBehaviorStat.backContent}
									legend={i18n.stats.wateringBehaviorStat.legend}
								>
									<BarChart
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
										monthlyData={monthly}
										weatherData={monthlyWeater}
									/>
								</StatsCard>

								<StatsCard
									title={i18n.stats.wateringAmountStat.title}
									hint={i18n.stats.wateringAmountStat.hint(
										new Date().getFullYear().toString(),
									)}
									stat={averageAmountPerWateringThisYear}
									unit={i18n.stats.wateringAmountStat.unit}
									titleColor="text-gdk-dark-blue"
									icon={
										<div
											className={`flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full `}
										>
											<DropIcon className="p-0.5" />
										</div>
									}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
									backContent={i18n.stats.wateringAmountStat.backContent}
									legend={i18n.stats.wateringAmountStat.legend}
								>
									<LineChart
										yearlyData={yearlyAverageAmountPerWatering}
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
									/>
								</StatsCard>

								<StatsCard
									title={i18n.stats.treeSpeciesStat.title}
									hint={i18n.stats.treeSpeciesStat.hint(
										new Date().getFullYear().toString(),
									)}
									stat={stats?.totalTreeSpeciesCount ?? 0}
									unit={i18n.stats.treeSpeciesStat.unit}
									titleColor="text-gdk-dark-green"
									icon={
										<div
											className={`flex h-9 w-9 items-center justify-center bg-gdk-dark-green bg-opacity-20 rounded-full `}
										>
											<TreeIcon className="p-0.5 translate-x-[3px]" />
										</div>
									}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
									backContent={i18n.stats.treeSpeciesStat.backContent}
									legend={i18n.stats.treeSpeciesStat.legend}
								>
									<DonutChart
										treeSpecies={orderedTreeSpecies ?? []}
										width={dynamicChartWidth}
										height={CHART_HEIGHT}
									/>
								</StatsCard>
								<StatsCard
									title={i18n.stats.adoptionStat.title}
									hint={i18n.stats.adoptionStat.hint(
										new Date().getFullYear().toString(),
									)}
									stat={stats?.treeAdoptions.count ?? 0}
									unit={i18n.stats.adoptionStat.unit}
									titleColor="text-gdk-purple"
									icon={
										<div
											className={`flex h-9 w-9 items-center justify-center bg-gdk-purple bg-opacity-20 rounded-full `}
										>
											<HeartIcon className="p-0.5" isAdopted={true}></HeartIcon>
										</div>
									}
									onResize={(width) => {
										setDynamicChartWidth(width);
									}}
									loading={loading}
									backContent={i18n.stats.adoptionStat.backContent}
								>
									<AdoptionsChart
										veryThirstyAdoptionsRate={veryThirstyAdoptionsRate}
										legend={i18n.stats.adoptionStat.legend}
									/>
								</StatsCard>
								<div className="px-4 flex flex-col md:self-end md:text-end">
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 pt-2 md:pt-4"}
									>
										{i18n.info.about.head.feedback}
									</Markdown>
									<Markdown
										// @ts-expect-error typing too complex
										components={{ a: ExternalAnchorLink }}
										className={"[&>p]:pt-1 py-4"}
									>
										{i18n.stats.gdKSalesPitch}
									</Markdown>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
