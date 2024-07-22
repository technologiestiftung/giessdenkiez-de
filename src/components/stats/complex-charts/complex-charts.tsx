import React from "react";
import { WateringCanIcon } from "../../icons/watering-can-icon";
import { DropIcon } from "../../icons/drop-icon";
import { TreeIcon } from "../../icons/tree-icon";
import { HeartIcon } from "../../icons/heart-icon";
import { ComplexChartCard } from "./complex-chart-card";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useStatsStore } from "../store/stats-store";
import { DensityMap } from "./charts/density-map/density-map";
import { BarChart } from "./charts/bar-chart/bar-chart";
import { LineChart } from "./charts/line-chart/line-chart";
import { DonutChart } from "./charts/donut-chart/donut-chart";
import { AdoptionsChart } from "./charts/adoptions-chart";

export const ComplexCharts: React.FC = () => {
	const i18n = useI18nStore().i18n();

	const { gdkStats, totalWateringAmount, averageAmountPerWateringThisYear } =
		useStatsStore();

	const chartCards = [
		{
			title: i18n.stats.wateringsStat.title,
			hint: i18n.stats.wateringsStat.hint(new Date().getFullYear().toString()),
			stat: gdkStats?.waterings.length || 0,
			unit: i18n.stats.wateringsStat.unit,
			titleColor: "text-gdk-dark-blue",
			icon: (
				<div className="flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full">
					<WateringCanIcon className="translate-x-1 p-0.5" />
				</div>
			),
			backContent: i18n.stats.wateringsStat.backContent,
			legend: i18n.stats.wateringsStat.legend,
			chart: <DensityMap />,
		},
		{
			title: i18n.stats.wateringBehaviorStat.title,
			hint: i18n.stats.wateringBehaviorStat.hint(
				new Date().getFullYear().toString(),
			),
			stat: totalWateringAmount,
			unit: i18n.stats.wateringBehaviorStat.unit,
			titleColor: "text-gdk-dark-blue",
			icon: (
				<div className="flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full">
					<DropIcon className="p-0.5" />
				</div>
			),
			backContent: i18n.stats.wateringBehaviorStat.backContent,
			legend: i18n.stats.wateringBehaviorStat.legend,
			chart: <BarChart />,
		},
		{
			title: i18n.stats.wateringAmountStat.title,
			hint: i18n.stats.wateringAmountStat.hint(
				new Date().getFullYear().toString(),
			),
			stat: averageAmountPerWateringThisYear,
			unit: i18n.stats.wateringAmountStat.unit,
			titleColor: "text-gdk-dark-blue",
			icon: (
				<div className="flex h-9 w-9 items-center justify-center bg-gdk-dark-blue bg-opacity-20 rounded-full">
					<DropIcon className="p-0.5" />
				</div>
			),
			backContent: i18n.stats.wateringAmountStat.backContent,
			legend: i18n.stats.wateringAmountStat.legend,
			chart: <LineChart />,
		},
		{
			title: i18n.stats.treeSpeciesStat.title,
			hint: i18n.stats.treeSpeciesStat.hint(
				new Date().getFullYear().toString(),
			),
			stat: gdkStats?.totalTreeSpeciesCount ?? 0,
			unit: i18n.stats.treeSpeciesStat.unit,
			titleColor: "text-gdk-dark-green",
			icon: (
				<div className="flex h-9 w-9 items-center justify-center bg-gdk-dark-green bg-opacity-20 rounded-full">
					<TreeIcon className="p-0.5 translate-x-[3px]" />
				</div>
			),
			backContent: i18n.stats.treeSpeciesStat.backContent,
			legend: i18n.stats.treeSpeciesStat.legend,
			chart: <DonutChart />,
		},
		{
			title: i18n.stats.adoptionStat.title,
			hint: i18n.stats.adoptionStat.hint(new Date().getFullYear().toString()),
			stat: gdkStats?.treeAdoptions.count ?? 0,
			unit: i18n.stats.adoptionStat.unit,
			titleColor: "text-gdk-purple",
			icon: (
				<div className="flex h-9 w-9 items-center justify-center bg-gdk-purple bg-opacity-20 rounded-full">
					<HeartIcon className="p-0.5" isAdopted={true}></HeartIcon>
				</div>
			),
			backContent: i18n.stats.adoptionStat.backContent,
			chart: <AdoptionsChart />,
		},
	];

	return (
		<>
			{chartCards.map(
				({
					title,
					hint,
					stat,
					unit,
					titleColor,
					icon,
					backContent,
					legend,
					chart,
				}) => (
					<ComplexChartCard
						key={title}
						title={title}
						hint={hint}
						stat={stat}
						unit={unit}
						titleColor={titleColor}
						icon={icon}
						backContent={backContent}
						legend={legend}
					>
						{chart}
					</ComplexChartCard>
				),
			)}
		</>
	);
};
