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
import { LineChart } from "./line-chart";
import { DonutChart } from "./pie-chart";
import { DensityMap } from "./density-map";
import { BarChart } from "./bar-chart";

interface TreeSpecies {
	speciesName?: string;
	percentage: number;
}

interface Monthly {
	month: string;
	wateringCount: number;
	averageAmountPerWatering: number;
}

interface Watering {
	id: string;
	lat: number;
	lng: number;
	amount: number;
	timestamp: string;
}

interface GdkStats {
	numTrees: number;
	numPumps: number;
	numActiveUsers: number;
	numWateringsThisYear: number;
	monthlyWaterings: Monthly[];
	numTreeAdoptions: number;
	mostFrequentTreeSpecies: TreeSpecies[];
	waterings: Watering[];
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
		const orderedMonthly = (stats?.monthlyWaterings ?? []).sort((a, b) => {
			return new Date(a.month).getTime() - new Date(b.month).getTime();
		});
		setMonthly(orderedMonthly);
		console.log(orderedMonthly);
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
							<div className="flex flex-col gap-4">
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									<SimpleStatsCard title="Straßenbäume" stat={stats.numTrees} />
									<SimpleStatsCard
										title="Öffentliche Pumpen"
										stat={stats.numPumps}
									/>
									<SimpleStatsCard
										title="Aktive Gießer:innen"
										stat={stats.numActiveUsers}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<StatsCard
										title="Gießungen"
										hint="wurde im Jahr 2024 gegossen"
										stat={stats.waterings.length}
										unit="mal"
										titleColor="text-gdk-dark-blue"
										icon={<WateringCanIcon></WateringCanIcon>}
									>
										<DensityMap
											width={300}
											height={200}
											data={stats.waterings}
										></DensityMap>
									</StatsCard>
									<StatsCard
										title="Gießverhalten"
										hint="werden durchschnittlich pro Monat gegossen"
										stat={Math.round(
											monthly.reduce((acc, m) => acc + m.totalSum, 0) /
												monthly.length,
										)}
										unit="Liter"
										titleColor="text-gdk-dark-blue"
										icon={<DropIcon></DropIcon>}
									>
										<div>
											<BarChart
												width={300}
												height={200}
												data={monthly.map((m) => {
													return {
														name: m.month,
														value: m.wateringCount,
													};
												})}
												xLabel="Monat"
												yLabel="Anzahl Gießungen"
												xTickFrequency={10}
											></BarChart>
										</div>
									</StatsCard>
									<StatsCard
										title="Gießvolumen"
										hint="werden 2024 durchschnittlich pro Gießung eingetragen"
										stat={Math.round(
											monthly.reduce(
												(acc, m) => acc + m.averageAmountPerWatering,
												0,
											) / monthly.length,
										)}
										unit="Liter"
										titleColor="text-gdk-dark-blue"
										icon={<DropIcon></DropIcon>}
									>
										<div>
											<LineChart
												data={monthly.map((m) => {
													return {
														date: new Date(m.month),
														value: m.averageAmountPerWatering,
													};
												})}
												width={300}
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
										<div className="w-full">
											<div className="w-full grid grid-cols-1 grid-rows-">
												<div className="w-full h-7 bg-[#660A9C] opacity-[30%] rounded-full row-start-1 col-start-1"></div>
												<div className="w-[30%] h-7 bg-[#660A9C] rounded-full row-start-1 col-start-1"></div>
												<div className="text-[#660A9C] text-4xl pt-2">↑</div>
												<div className="text-[#660A9C] text-xl pt-2">
													<span className="font-bold">12%</span> der adoptierten
													Bäume sind besonders durstig.
												</div>
											</div>
										</div>
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
												width={300}
												height={200}
												innerRadiusRatio={0.65}
											></DonutChart>
										</div>
									</StatsCard>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
