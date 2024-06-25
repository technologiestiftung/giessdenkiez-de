/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { supabaseClient } from "../../auth/supabase-client";
import { DropIcon } from "../icons/drop-icon";
import { HeartIcon } from "../icons/heart-icon";
import { TreeIcon } from "../icons/tree-icon";
import { WateringCanIcon } from "../icons/watering-can-icon";
import { LanguageToggle } from "../router/languageToggle";
import { SimpleStatsCard } from "./simple-stats-card";
import { StatsCard } from "./stats-card";
import { BarChart } from "./bar-chart";
import { LineChart } from "./line-chart";
import { DonutChart } from "./pie-chart";
import { DensityMap } from "./density-map";

interface TreeSpecies {
	speciesName?: string;
	percentage: number;
}

interface Monthly {
	month: string;
	wateringCount: number;
	averageAmountPerWatering: number;
}

interface GdkStats {
	numTrees: number;
	numPumps: number;
	numActiveUsers: number;
	numWateringsThisYear: number;
	monthlyWaterings: Monthly[];
	numTreeAdoptions: number;
	mostFrequentTreeSpecies: TreeSpecies[];
}

export const Stats: React.FC = () => {
	const [stats, setStats] = useState<GdkStats>();
	const [monthly, setMonthly] = useState<Monthly[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await supabaseClient.functions.invoke("gdk_stats");
			setStats(data.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log(stats);
		const orderedMonthly = (stats?.monthlyWaterings ?? [])
			.sort((a, b) => {
				return new Date(a.month).getTime() - new Date(b.month).getTime();
			})
			.filter(
				(s) =>
					s.month.includes("2024") ||
					s.month.includes("2023") ||
					s.month.includes("2022"),
			);
		setMonthly(orderedMonthly);
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
						{stats && (
							<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
								<SimpleStatsCard title="Straßenbäume" stat={stats.numTrees} />
								<SimpleStatsCard title="Öffentliche Pumpen" stat={2125} />
								<SimpleStatsCard title="Aktive Gießer:innen" stat={3774} />
								<StatsCard
									title="Gießungen"
									hint="wurde im Jahr 2024 gegossen"
									stat={stats.waterings.length}
									unit="mal"
									titleColor="text-gdk-blue"
									icon={<WateringCanIcon></WateringCanIcon>}
								>
									<div>
										<DensityMap
											width={260}
											height={200}
											data={stats.waterings}
										></DensityMap>
									</div>
								</StatsCard>
								<StatsCard
									title="Gießverhalten"
									hint="werden durchschnittlich pro Monat gegossen"
									stat={33899}
									unit="Liter"
									titleColor="text-gdk-blue"
									icon={<DropIcon></DropIcon>}
								>
									<div>
										<BarChart
											data={monthly.map((m) => {
												return {
													label: m.month,
													value: m.wateringCount,
												};
											})}
										></BarChart>
									</div>
								</StatsCard>
								<StatsCard
									title="Gießvolumen"
									hint="werden 2024 durchschnittlich pro Gießung eingetragen"
									stat={55}
									unit="Liter"
									titleColor="text-gdk-blue"
									icon={<DropIcon></DropIcon>}
								>
									<div>
										<LineChart
											data={monthly.map((m) => {
												return {
													date: new Date(m.month),
													value: m.wateringCount,
												};
											})}
											width={260}
											height={200}
										></LineChart>
									</div>
								</StatsCard>
								<StatsCard
									title="Baumadoptionen"
									hint="wurden adoptiert"
									stat={stats.numTreeAdoptions}
									unit="Bäume"
									titleColor="text-gdk-purple"
									icon={<HeartIcon isAdopted={true}></HeartIcon>}
								>
									<div>Hallo</div>
								</StatsCard>
								<StatsCard
									title="Baumarten"
									hint="stehen in Berlin"
									stat={97}
									unit="Baumarten"
									titleColor="text-gdk-dark-green"
									icon={<TreeIcon></TreeIcon>}
								>
									<div>
										<DonutChart
											data={stats.mostFrequentTreeSpecies
												.slice(0, 10)
												.map((t) => {
													return {
														label: t.speciesName ?? "",
														value: t.percentage,
													};
												})}
											width={260}
											height={200}
											innerRadiusRatio={0.65}
										></DonutChart>
									</div>
								</StatsCard>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
